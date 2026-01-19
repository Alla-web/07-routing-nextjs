import { fetchSingleNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotesPreview from "./NotePreview.client";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;

  const note = await fetchSingleNoteById(id);

  return (
    <Modal>
      <NotesPreview note={note} />
    </Modal>
  );
}
