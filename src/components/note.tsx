import { Notes } from "../Interfaces/DbItem";

interface DbItemWithClicks extends Notes {
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, note?: string, completed?: boolean) => void;
}

export function Note(props: DbItemWithClicks): JSX.Element {
  return (
    <div className="note-container">
      <div className="note-body">{props.note}</div>
      <div className="note-footer">
        <p>Date created: {new Date(props.created).toLocaleDateString()}</p>
        <p>Date due: {new Date(props.due).toLocaleDateString()}</p>
        <p>Days until due: 0</p>
        <p>Completed? : {props.completed.toString()}</p>
        <button onClick={() => props.handleUpdate(props.id.toString(), "123")}>
          Update note with 123
        </button>
        <button onClick={() => props.handleDelete(props.id.toString())}>
          Delete
        </button>
        <button
          onClick={() =>
            props.handleUpdate(props.id.toString(), undefined, true)
          }
        >
          Mark as complete
        </button>
      </div>
    </div>
  );
}
