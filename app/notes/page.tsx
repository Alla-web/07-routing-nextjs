import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NotesPage from "@/app/notes/Notes.client";

interface NotesProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function Notes({ searchParams }: NotesProps) {
  const sp = (await searchParams) ?? {};
  const page = Number(sp.page ?? "1") || 1;
  const search = sp.search ?? "";

  console.log(page);
  console.log(search);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage />
    </HydrationBoundary>
  );
}
