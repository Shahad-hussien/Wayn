"use client";
import { useState, useRef } from "react";
import { PlaceType } from "@/types";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchProps {
  onPlaceSelected: (place: PlaceType) => void;
}

const Search = ({ onPlaceSelected }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceType[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchPlaces = async (q: string) => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timerRef.current) {
      clearTimeout(timerRef.current); // نصفّر الوقت لمّا المستخدم يضغط حرف آخر
    }
    timerRef.current = setTimeout(() => {
      searchPlaces(e.target.value);
    }, 500);
  };

  return (
    <div className="absolute inset-x-0 top-4 mx-auto px-4 max-w-md w-full z-1000">
      <div className="flex items-center w-full bg-white rounded-full shadow-lg ring-1 ring-black/5 px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <SearchIcon className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="ابحث عن مكان... / Search a place..."
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 px-3 text-sm sm:text-base leading-relaxed"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {results.length > 0 && (
        <div className="mt-2 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden max-h-72 overflow-y-auto divide-y divide-gray-100">
          {results.map((result) => (
            <div
              key={result.place_id}
              onClick={() => {
                onPlaceSelected(result);
                setResults([]);
              }}
              className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors leading-snug"
            >
              {result.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
