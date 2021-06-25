import React, { useState, useEffect, FormEvent } from "react";
import Card from "./components/Card";
import api from "./services/api";
import { Tool } from "./types";
import { Main } from "./styles";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [tagsOnly, setTagsOnly] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [tagError, setTagError] = useState<string>("");

  useEffect(() => {
    const data = async () => {
      return await api
        .get("tools")
        .then((res) => {
          setTools([...res.data.data]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };

    data();
  }, []);

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
        console.log(err.response.data);
        if (err.response.data.message_raw.slice(0, 13) === "Tag not found") {
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
        console.log(err.response);
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

  return (
    <Main>
      <h1>VUTTR</h1>
      <h2>Very Useful Tools to Remember</h2>
      <nav>
        <div>
          <input
            type="text"
            name="Search"
            id="search"
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="search"
          />
          <div id="checkbox">
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
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add modal"
        className="modal"
        overlayClassName="overlay"
      >
        <form onSubmit={handleAddTool}>
          <h4>+ Add new tool</h4>
          <div className="input-group">
            <label htmlFor="toolName">
              Tool name <span className="required">*</span>
            </label>
            <input
              onChange={(evt) => setName(evt.target.value)}
              type="text"
              name="tool name"
              id="toolName"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="toolLink">
              Tool link <span className="required">*</span>
            </label>
            <input
              onChange={(evt) => setLink(evt.target.value)}
              type="text"
              name="tool link"
              id="toolLink"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="toolName">
              Tool description <span className="required">*</span>
            </label>
            <textarea
              onChange={(evt) => setDescription(evt.target.value)}
              rows={4}
              name="tool description"
              id="toolDescription"
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="tags">
              Tags <span className="required">*</span>
            </label>
            <input
              onChange={(evt) => setTags(evt.target.value)}
              type="text"
              name="tags"
              id="tags"
              className={tagError && "error-input"}
              required
            />
            {tagError && <p className="error">{tagError}</p>}
          </div>
          <button type="submit">Add tool</button>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        contentLabel="Delete modal"
        className="modal"
        overlayClassName="overlay"
      >
        <form onSubmit={(evt) => handleDeleteTool(evt, id)}>
          <h4>x Remove tool</h4>
          <p>Are you sure you want to remove {name}</p>
          <button className="danger" type="submit">
            Yes, remove
          </button>
          <button className="secondary" type="button">
            Cancel
          </button>
        </form>
      </Modal>
    </Main>
  );
}

export default App;
