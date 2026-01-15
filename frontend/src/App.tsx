import { useEffect, useState } from "react";
import "./App.css";
import AddNoteForm from "../src/AddNoteForm";
import NoteList from "../src/NoteList";
import { getNotes, addNote, deleteNote } from "./Api";


type Note = { id: number; text: string };

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((data: Note[]) => setNotes(data));
  }, []);

  async function handleAdd(text: string) {
    const newNote: Note = await addNote(text);
    setNotes((prev) => [...prev, newNote]);
  }

  async function handleDelete(id: number) {
    const ok: boolean = await deleteNote(id);
    if (ok) setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">ClassNotes</h1>
        <p className="subtitle">Moderne Notizenverwaltung im Business-Look</p>
      </header>

      <section className="shell">
        <div className="shell-top">
          <AddNoteForm onAdd={handleAdd} />
        </div>

        <div className="shell-body">
          <NoteList notes={notes} onDelete={handleDelete} />
          <div className="meta">
            Gesamt: {notes.length} Notiz{notes.length === 1 ? "" : "en"}
          </div>
        </div>
      </section>
    </div>
  );
}
