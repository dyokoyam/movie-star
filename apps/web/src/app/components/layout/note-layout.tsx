"use client";

import { useState } from "react";
import { NoteSidebar } from "@/app/components/ui/note-sidebar";
import { NoteEditor } from "@/app/components/ui/note-editor";
import { Note } from "@/app/types/note";
import { createNote, updateNote } from "@/app/lib/notes";
import { getMockNotes, getMockNoteById } from "@/app/constants/mock-data";

export function NoteLayout() {
  const [notes] = useState<Note[]>(getMockNotes());
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [notesData, setNotesData] = useState<Note[]>(notes);

  const selectedNote = selectedNoteId
    ? getMockNoteById(selectedNoteId) || notesData.find(n => n.id === selectedNoteId)
    : null;

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleCreateNote = () => {
    const newNote = createNote();
    setNotesData(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNote = (noteId: string, updates: Partial<Note>) => {
    setNotesData(prev => prev.map(note =>
      note.id === noteId
        ? updateNote(note, updates)
        : note
    ));
  };

  return (
    <div className="flex h-screen bg-white">
      <NoteSidebar
        notes={notesData}
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
      />
      <div className="flex-1 min-w-0">
        <NoteEditor
          note={selectedNote}
          onUpdateNote={handleUpdateNote}
        />
      </div>
    </div>
  );
}
