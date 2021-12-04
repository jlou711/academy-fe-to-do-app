import { useState } from "react";

interface CreateNoteProps {
  handleCreate: (createNote: string) => void;
}

export function CreateNote(props: CreateNoteProps): JSX.Element {
  const [note, setNote] = useState("");

  return (
    <div className="create-note">
      <div className="create-note-body">
        <textarea
          autoFocus
          placeholder="Write a note.."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <div className="create-note-footer">
        <input placeholder="Date due" type="date"></input>
        <button
          onClick={() => {
            props.handleCreate(note);
            setNote("");
          }}
        >
          Create Note
        </button>
      </div>
    </div>
  );
}
