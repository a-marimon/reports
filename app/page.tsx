'use client'
import {useSession} from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return <div>Unauthenticated</div>
  }

  return (
    <>hello</>
  );
}
