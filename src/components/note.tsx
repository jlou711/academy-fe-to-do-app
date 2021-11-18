import { DbItem } from "../Interfaces/DbItem";

interface DbItemWithClicks extends DbItem {
  handleDelete: (value: string) => void;
}

export function Note(props: DbItemWithClicks): JSX.Element {
  return (
    <div className="note-container">
      <div className="note-body">{props.note}</div>
      <div className="note-footer">
        <p>Date created: {new Date(props.created).toLocaleDateString()}</p>
        <p>Date due: {new Date(props.due).toLocaleDateString()}</p>
        <p>Days until due: 0</p>
        <button onClick={() => props.handleDelete(props.id.toString())}>
          I will delete something eventually
        </button>
        <button>I will mark as complete eventually</button>
      </div>
    </div>
  );
}
