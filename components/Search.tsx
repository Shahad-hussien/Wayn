"use client";
import { useState, useRef } from "react";
import { PlaceType } from "@/types";
export default function Search() {
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
    <div>
      <input value={query} onChange={handleChange} placeholder="Type here..." />
      {results.map((result) => (
        <div key={result.place_id}>{result.display_name}</div>
      ))}
    </div>
  );
}
