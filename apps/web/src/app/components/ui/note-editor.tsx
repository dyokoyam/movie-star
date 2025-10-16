"use client";

import { useState } from "react";
import { Note } from "@/app/types/note";

type NoteEditorProps = {
  note: Note | null;
  onUpdateNote: (noteId: string, updates: Partial<Note>) => void;
};

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  if (!note) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-12 text-center">
        <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-700">ノートを選択してください</h3>
        <p className="mt-2 text-sm text-gray-500">
          左側のリストからノートを選択するか、新しいノートを作成してください。
        </p>
      </div>
    );
  }

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const handleSave = () => {
    onUpdateNote(note.id, {
      title: editedTitle,
      content: editedContent,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                保存
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                キャンセル
              </button>
            </>
          ) : (
            <button
              onClick={handleStartEdit}
              className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-accent/90"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              編集
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(note.updatedAt).toLocaleString("ja-JP", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="ノートのタイトルを入力..."
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-base font-semibold text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="ノートの内容を入力..."
              className="h-80 w-full resize-none rounded-md border border-border bg-white p-3 text-sm text-gray-800 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        ) : (
          <div className="prose prose-gray max-w-none">
            <h1 className="mb-4 text-xl font-bold text-gray-900">
              {note.title || "無題のノート"}
            </h1>
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {note.content || "このノートにはまだ内容がありません。"}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      {note.tags.length > 0 && !isEditing && (
        <div className="border-t border-border p-3">
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
