import "./NoteList.css";

export default function NoteList({ notes, onDelete }) {
  return (
    <ul className="noteList">
      {notes.map((n) => (
        <li key={n.id} className="noteItem">
          <span className="noteText">{n.text}</span>
          <button
            className="deleteBtn"
            aria-label={`Delete note ${n.id}`}
            title="Löschen"
            onClick={() => onDelete(n.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
