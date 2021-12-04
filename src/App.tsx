import { useState, useEffect } from "react";
import { DbItem, Notes } from "./Interfaces/DbItem";
import { Note } from "./components/note";
import { CreateNote } from "./components/createNote";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "./App.css";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://to-do-backend-jamiel.herokuapp.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [result, setResult] = useState<DbItem>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getNote = async () => {
    fetch(baseUrl.concat("/notes"))
      .then((resp) => resp.json())
      .then((data) => setResult(data));
  };

  useEffect(() => {
    getNote();
  }, []);

  async function handleCreate(note: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note: note,
        // due: Date.now(),
        completed: false,
      }),
    };
    fetch(baseUrl.concat("/notes"), requestOptions).then((resp) => resp.json());
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

  async function handleDelete(id: string) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(baseUrl.concat(`/notes/${id}`), requestOptions).then((resp) =>
      resp.json()
    );
    getNote();
  }

  return (
    <div className="app">
      <div className="toDoTitle">
        📝 To Do's{" "}
        <AddBoxIcon className="addBoxIconStyled" onClick={handleOpen} />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              background: "#05445e",
              border: "1px solid #fff",
              borderRadius: "5px",
              boxShadow: "5px 10px 10px #06222f",
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a note:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <CreateNote handleCreate={handleCreate} />
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="note-container">
        {result
          ? result.data.notes
              .sort((a, b) => a.id - b.id)
              .map((note: Notes) => {
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
    </div>
  );
}

export default App;
