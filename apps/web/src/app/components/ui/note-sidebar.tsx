"use client";

import { Note } from "@/app/types/note";

type NoteSidebarProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
};

export function NoteSidebar({ notes, selectedNoteId, onSelectNote, onCreateNote }: NoteSidebarProps) {
  return (
    <div className="flex h-screen w-56 flex-col border-r border-border bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-3">
        <h2 className="text-base font-semibold text-gray-900">ノート</h2>
        <button
          onClick={onCreateNote}
          className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-accent/90"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新規
        </button>
      </div>

      {/* Notes List - Fixed height, no scroll */}
      <div className="flex-1 p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xs text-gray-500">ノートなし</p>
          </div>
        ) : (
          <>
            {notes.slice(0, 8).map((note) => ( // 最大8個まで表示
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`w-full rounded-md p-2 text-left transition-colors hover:bg-gray-100 ${
                  selectedNoteId === note.id ? "bg-accent/10 border border-accent/20" : ""
                }`}
              >
                <h3 className="truncate text-sm font-medium text-gray-800 leading-tight">
                  {note.title || "無題のノート"}
                </h3>
                {note.content && (
                  <p className="mt-1 line-clamp-1 text-xs text-gray-600 leading-tight">
                    {note.content}
                  </p>
                )}
              </button>
            ))}
            {notes.length > 8 && (
              <div className="text-xs text-gray-500 text-center py-1">
                他 {notes.length - 8} 件
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
