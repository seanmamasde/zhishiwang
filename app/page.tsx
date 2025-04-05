"use client";

import { useState } from "react";
import { SignIn } from "@/components/SignIn";
import Game from "@/components/Game/modules/Game";

export default function Home() {
  const [session, setSession] = useState(null);
  const handleSessionChange = (newSession: any) => {
    setSession(newSession);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <div
        className={`${!session ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "fixed top-4 right-4"}`}
      >
        <SignIn onSessionChange={handleSessionChange} />
      </div>
      {session && <Game />}
    </main>
  );
}
