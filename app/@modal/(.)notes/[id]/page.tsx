import { fetchSingleNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { updateTag } from "next/cache";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;

  const note = await fetchSingleNoteById(id);

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
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        {note.updatedAt
          ? formatDate(note.updatedAt)
          : formatDate(note.createdAt)}
      </p>
    </Modal>
  );
}
