import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TokenClient from "./TokenClient";
import React, { Suspense } from "react";

export default function TokenSystemPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; hospital?: string; id?: string; address?: string }>
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="max-w-2xl mx-auto">Loading…</div>}>
          {/* unwrap the searchParams in a client boundary */}
          <ClientParams searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function ClientParams({ searchParams }: { searchParams: Promise<{ name?: string; hospital?: string; id?: string; address?: string }>}) {
  const p = React.use(searchParams as any) as { name?: string; hospital?: string; id?: string; address?: string };
  const name = p.name || p.hospital || "Unknown Hospital";
  const id = p.id;
  const address = p.address;
  return <TokenClient name={name} id={id} address={address} />;
}
