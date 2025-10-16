import { Note, NoteUpdate } from '@/app/types/note';

export function createNote(): Note {
  return {
    id: `note-${Date.now()}`,
    title: '',
    content: '',
    updatedAt: new Date().toISOString(),
    tags: [],
  };
}

export function updateNote(note: Note, updates: NoteUpdate): Note {
  return {
    ...note,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}
