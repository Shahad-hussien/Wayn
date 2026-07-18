import { NextResponse } from "next/server";
import { PlaceType } from "@/types";
import { NominatimResult } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Wayn/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Nominatim" },
        { status: 500 },
      );
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const results = data.map((result: NominatimResult): PlaceType => {
        return {
          place_id: result.place_id,
          lat: Number(result.lat),
          lon: Number(result.lon),
          display_name: result.display_name,
        };
      });

      return NextResponse.json(results);
    } else {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
