"use client";

import { TrackSelect } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select an F1 Track</h2>
          <p className="mt-2 text-sm text-gray-500 secondary-text-color">Choose a circuit from the list below to view its layout and details.</p>
        </div>
        <TrackSelect />
        <p className="mt-8 text-xs text-center text-gray-400">
          Can&apos;t find a track? <a className="font-medium text-[#e92933] hover:text-red-700" href="#">Suggest it here</a>.
        </p>
      </div>
    </main>
  );
}
