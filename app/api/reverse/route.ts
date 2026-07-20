import { NextResponse } from "next/server";
import { PlaceType } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Lat and Lon required" },
      { status: 400 },
    );
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Wayn/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
    }

    const data = await response.json();
    if (data.error) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 },
      );
    }
    const result: PlaceType = {
      place_id: data.place_id,
      lat: Number(data.lat),
      lon: Number(data.lon),
      display_name: data.display_name,
    };
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
