'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTrackList, TrackInfo } from '@/utils/api';

export default function TrackSelect() {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await getTrackList();
        setTracks(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = Number(formData.get('track-select'));
    if (!isNaN(id) && id > 0) {
      router.push(`/draw/${id}`);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="track-select" className="block text-sm font-medium text-gray-700 mb-1">
          Track Selection
        </label>
        <select
          id="track-select"
          name="track-select"
          className="form-select block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-[#e92933] focus:outline-none focus:ring-2 focus:ring-[#e92933]/50 sm:text-sm transition-all"
          style={{
            backgroundImage: 'var(--select-button-svg)',
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
        >
          <option value="">Select a track...</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="flex w-full justify-center rounded-lg primary-bg-color px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
        >
          View Track
        </button>
      </div>
    </form>
  );
}

