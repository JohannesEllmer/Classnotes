export type Note = { id: number; text: string };

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
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
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
