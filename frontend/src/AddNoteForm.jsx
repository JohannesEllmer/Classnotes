import { useState } from "react";
import "./AddNoteForm.css";

export default function AddNoteForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
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
