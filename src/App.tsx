import { useState, useEffect, FormEvent } from "react";
import Modal from "react-modal";

import api from "./services/api";

import Card from "./components/Card";
import CreateToolModal from "./components/Modals/CreateToolModal";
import RemoveToolModal from "./components/Modals/RemoveToolModal";

import { ReactComponent as Search } from "./assets/img/icon-search.svg";

import { Tool } from "./types";
import { Main } from "./styles";

Modal.setAppElement(document?.getElementById("root")!);

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [tagsOnly, setTagsOnly] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [tagError, setTagError] = useState<string>("");

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    return await api
      .get("tools")
      .then((res) => {
        setTools([...res.data.data]);
      })
      .catch((err) => {
        //
      });
  };

  const handleAddTool = (evt: FormEvent) => {
    evt.preventDefault();

    api
      .post("tools", {
        title: name,
        description: description,
        link: link,
        tags: tags.split(" "),
      })
      .then((res) => {
        setTools([...tools, res.data]);
        setModalOpen(false);
        setName("");
        setDescription("");
        setLink("");
        setTags("");
        setTagError("");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.message_raw.slice(0, 13) === "Tag not found"
        ) {
          setTagError(err.response.data.message_raw);
        }
      });
  };

  const handleDeleteTool = (evt: FormEvent, id: number) => {
    evt.preventDefault();
    api
      .delete("tools/" + id)
      .then((res) => {
        if (res.status === 204) {
          setTools(
            tools.filter((tool) => {
              return tool.id !== id;
            })
          );
          setDeleteModalOpen(false);
          setName("");
          setId(0);
        }
      })
      .catch((err) => {
        //
      });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (id: number, name: string) => {
    setId(id);
    setName(name);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setName("");
    setDescription("");
    setLink("");
    setTags("");
    setTagError("");
  };

  const handleSearch = (search: string) => {
    if (!search) {
      loadTools();
    }

    if (tagsOnly) {
      setTools(
        tools.filter((obj: { [key: string]: any }) => {
          return obj.tags.some((val: string) => {
            return val.includes(search);
          });
        })
      );
    } else {
      setTools(
        tools.filter((obj: { [key: string]: any }) => {
          return Object.keys(obj).some(function (key) {
            return typeof obj[key] === "object"
              ? obj[key].some((val: string) => {
                  return val.includes(search);
                })
              : obj[key].toString().includes(search);
          });
        })
      );
    }
  };

  return (
    <Main>
      <h1>VUTTR</h1>
      <h2>Very Useful Tools to Remember</h2>
      <nav>
        <div>
          <div id="search-container">
            <Search />
            <input
              type="text"
              name="Search"
              id="search"
              onChange={(evt) => handleSearch(evt.target.value)}
              placeholder="Digite o que está procurando..."
              autoComplete="off"
            />
          </div>
          <div id="checkbox-container">
            <input
              type="checkbox"
              name="Tag only"
              id="tag-only"
              checked={tagsOnly}
              onChange={(evt) => setTagsOnly(evt.target.checked)}
            />
            <label htmlFor="tag-only">search in tags only</label>
          </div>
        </div>
        <button onClick={handleOpenModal}>+ Add</button>
      </nav>
      {tools.map((tool, index) => (
        <Card
          key={index}
          tool={tool}
          handleDeleteTool={() => handleOpenDeleteModal(tool.id, tool.title)}
        />
      ))}
      <CreateToolModal
        props={{
          modalOpen,
          handleCloseModal,
          handleAddTool,
          setName,
          setDescription,
          setLink,
          setTags,
          tagError,
        }}
      />
      <RemoveToolModal
        props={{
          deleteModalOpen,
          handleCloseDeleteModal,
          handleDeleteTool,
          id,
          name,
        }}
      />
    </Main>
  );
}

export default App;
