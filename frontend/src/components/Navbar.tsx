'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-6 sm:px-10 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 text-gray-800">
        <div className="size-6 text-[#e92933]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_319)">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
            </defs>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-800">TrackCompare</h1>
      </div>
      <nav className="flex items-center gap-6">
        <Link className="text-sm font-medium text-gray-600 hover:text-[#e92933] transition-colors" href="#">Home</Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-[#e92933] transition-colors" href="#">Tracks</Link>
        <Link className="text-sm font-semibold text-[#e92933]" href="#">Compare</Link>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#e92933]">
          <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
            <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-gray-200 hover:border-[#e92933] transition-all" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVnJsn56QFeNK6mLbZOzu1lmx3wbrjwmR9W_I70v6MrGLANJtbOl-ixuEP2JXzPldGqd6J6-kowysdr4bCCUtSC8PVINFGiX2R9Oxa_hlMlyPORTd53IGH2npeuoetBYphaeVtMpvu-axkPbWlP7wBTz6V3FGiwljJ_ktId5F0aVowLSxrkrHyjGxjJ7X-NXva2lSYgBQxPFmhZMzUp6jSHxbiipRWvW0YeQb5xsFcIpZrDNfmNbh7N8dRnxZqceU7jbwcR_QQSW_O")'}}></div>
      </nav>
    </header>
  );
}

