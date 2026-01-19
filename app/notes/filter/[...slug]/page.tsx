import NotesPage from "../../Notes.client";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  return (
    <div>
      <NotesPage tag={tag} />
    </div>
  );
}
