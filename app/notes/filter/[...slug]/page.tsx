import NotesPage from "../../Notes.client";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = (await params) ?? {};
  const first = slug?.[0] ?? "all";
  const tag = first === "all" ? undefined : first;

  return (
    <div>
      <NotesPage tag={tag} />
    </div>
  );
}
