import { useState, useEffect } from "react";
import { DbItem } from "./Interfaces/DbItem";
import { Note } from "./components/note";
import "./App.css";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://to-do-backend-jamiel.herokuapp.com/"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [data, setData] = useState<DbItem[]>();

  const getNote = async () => {
    fetch(baseUrl.concat("/notes"))
      .then((resp) => resp.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getNote();
  }, []);

  async function handleDelete(id: string) {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    };
    fetch(baseUrl.concat(`/notes/${id}`), requestOptions).then((resp) =>
      resp.json()
    );
    getNote();
  }

  return (
    <div className="app">
      {data
        ? data.map((note, i) => {
            return (
              <>
                <Note {...note} handleDelete={handleDelete} key={i} />
              </>
            );
          })
        : null}
    </div>
  );
}

export default App;
