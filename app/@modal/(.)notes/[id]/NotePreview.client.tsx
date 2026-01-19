"use client";

import { Note } from "@/types/note";

import css from "./NotePreview.module.css";

interface NotesPreviewProps {
  note: Note;
}

export default function NotesPreview({ note }: NotesPreviewProps) {
  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  }

  return (
    <div className={css.notePreviewContainer}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p className={css.noteDate}>
        {note.updatedAt
          ? formatDate(note.updatedAt)
          : formatDate(note.createdAt)}
      </p>
    </div>
  );
}
