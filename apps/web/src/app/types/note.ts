export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  tags: string[];
};

export type NoteUpdate = Partial<Pick<Note, 'title' | 'content' | 'tags'>>;
