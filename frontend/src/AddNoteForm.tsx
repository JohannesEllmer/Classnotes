import { useState } from "react";
import "./AddNoteForm.css";

interface AddNoteFormProps {
  onAdd: (text: string) => void;
}

export default function AddNoteForm({ onAdd }: AddNoteFormProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Neue Notiz..."
      />
      <button className="btn" type="submit">Hinzufügen</button>
    </form>
  );
}
