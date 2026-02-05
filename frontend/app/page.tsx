'use client'

import { Navbar } from "@/components/landingpage/navbar";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { loading } = useAuth({ redirectIfAuthed: true });

  if (loading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
    </div>
  );
}
