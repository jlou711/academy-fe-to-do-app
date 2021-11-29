import { useState, useEffect } from "react";
import { DbItem, Notes } from "./Interfaces/DbItem";
import { Note } from "./components/note";
import "./App.css";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://to-do-backend-jamiel.herokuapp.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [result, setResult] = useState<DbItem>();

  const getNote = async () => {
    fetch(baseUrl.concat("/notes"))
      .then((resp) => resp.json())
      .then((data) => setResult(data));
  };

  useEffect(() => {
    getNote();
  }, []);

  async function handleDelete(id: string) {
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

  async function handleUpdate(id: string, note?: string, completed?: boolean) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note: note,
        completed: completed,
      }),
    };
    fetch(baseUrl.concat(`/notes/${id}`), requestOptions).then((resp) =>
      resp.json()
    );
    getNote();
  }

  return (
    <div className="app">
      {result
        ? result.data.notes.map((note: Notes) => {
            return (
              <Note
                key={note.id}
                {...note}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            );
          })
        : null}
    </div>
  );
}

export default App;
