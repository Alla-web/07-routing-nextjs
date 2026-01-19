import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NotesPage from "@/app/notes/Notes.client";

interface NotesProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function Notes({ params, searchParams }: NotesProps) {
  const { slug } = (await params) ?? {};
  const first = slug?.[0] ?? "all";
  const tag = first === "all" ? undefined : first;

  const sp = (await searchParams) ?? {};
  const page = Number(sp.page ?? "1") || 1;
  const search = sp.search ?? "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage />
    </HydrationBoundary>
  );
}
