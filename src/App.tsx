import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import api from "./services/api";
import { Tool } from "./types";
import { Main } from "./styles";
import Modal from "react-modal";

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [tagsOnly, setTagsOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

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

  const handleAddTool = () => {
    api
      .post("tools", {
        title: "Caio Domingues",
        description: "Lorem ipsum dolor sit amet.",
        link: "https://caiodomingues.com",
        tags: ["php"],
      })
      .then((res) => {
        setTools([...tools, res.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleDeleteTool = (id: number) => {
    api
      .delete("tools/" + id)
      .then((res) => {
        if (res.status === 204) {
          setTools(
            tools.filter((tool) => {
              return tool.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
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
        <button onClick={handleAddTool}>+ Add</button>
      </nav>
      {tools.map((tool, index) => (
        <Card
          key={index}
          tool={tool}
          handleDeleteTool={() => handleDeleteTool(tool.id)}
        />
      ))}
    </Main>
  );
}

export default App;
