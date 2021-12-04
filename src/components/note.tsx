import { useState } from "react";
import { Notes } from "../Interfaces/DbItem";
//import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

interface NotesWithClicks extends Notes {
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, note?: string, completed?: boolean) => void;
}

export function Note(props: NotesWithClicks): JSX.Element {
  const [note, setNote] = useState(props.note);
  const [completed, setCompleted] = useState(props.completed);
  const [edit, setEdit] = useState(false);
  return (
    <div className="note">
      <input
        aria-label="completed"
        type="checkbox"
        checked={props.completed}
        onChange={() => {
          props.handleUpdate(props.id.toString(), props.note, !completed);
          setCompleted(!completed);
        }}
      />
      <div className="note-body">
        {edit ? (
          <div className="note-edit">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <div className="note-date">
              <input
                type="date"
                id="due"
                value={new Date(props.due).toISOString().split("T")[0]}
              />
              <p>Tomorrow</p>
            </div>
          </div>
        ) : (
          <div className="note-body">
            {props.note}
            <div className="note-date">
              <input
                type="date"
                id="due"
                value={new Date(props.due).toISOString().split("T")[0]}
              />
              <p>Tomorrow</p>
            </div>
          </div>
        )}
      </div>
      <div className="note-footer">
        {edit ? (
          <>
            <CheckCircleIcon
              className="checkCircleIconStyled"
              onClick={() => {
                props.handleUpdate(props.id.toString(), note, props.completed);
                setEdit(!edit);
              }}
            ></CheckCircleIcon>
            <CancelIcon
              className="cancelIconStyled"
              onClick={() => setEdit(!edit)}
            ></CancelIcon>
          </>
        ) : (
          <>
            <EditIcon
              className="editIconStyled"
              onClick={() => {
                setEdit(!edit);
              }}
            />
            <DeleteIcon
              className="deleteIconStyled"
              onClick={() => props.handleDelete(props.id.toString())}
            />
          </>
        )}
      </div>
    </div>
  );
}
