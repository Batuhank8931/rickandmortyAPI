"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

const LocationDetailPage = ({ params }: { params: { id: string } }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get<Location>(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        setLocation(response.data);

        const residentPromises = response.data.residents.map((url) =>
          axios.get<Character>(url)
        );
        const residentResponses = await Promise.all(residentPromises);
        setResidents(residentResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching the location data:", error);
      }
    };

    fetchLocation();
  }, [id]);

  const handleCardClick = (id: number) => {
    router.push(`/characters/${id}`);
  };

  const handleLocationClick = async (url: string) => {
    try {
      if (!url || url.includes("null")) {
        alert("Location data not available.");
        return;
      }
      const locationId = url.split("/").pop();
      const response = await axios.get(url);

      if (response.data.error) {
        alert("Location data not available.");
      } else {
        router.push(`/locations/${locationId}`);
      }
    } catch (error) {
      alert("Error fetching location data.");
      console.error("Error fetching the location data:", error);
    }
  };

  if (!location) {
    return (
      <div className="p-8 bg-gray-900 text-white min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <button
        className="absolute top-8 right-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-all duration-300"
        onClick={() => router.push("/")}
      >
        Home
      </button>
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            {location.name}
          </h1>
          <div className="text-center">
            <p className="text-lg">
              <strong>Type:</strong> {location.type}
            </p>
            <p className="text-lg mt-2">
              <strong>Dimension:</strong> {location.dimension}
            </p>
            <p className="text-lg mt-2">
              <strong>Number of Residents:</strong> {location.residents.length}
            </p>
            <p className="text-lg mt-2">
              <strong>Created on:</strong>{" "}
              {new Date(location.created).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Residents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {residents.map((character) => (
            <div
              key={character.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex cursor-pointer hover:bg-gray-700 transition-all duration-300"
              onClick={() => handleCardClick(character.id)}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-48 h-auto object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        character.status === "Alive"
                          ? "bg-green-500"
                          : character.status === "Dead"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      } mr-2`}
                    />
                    <h2 className="text-2xl font-bold">{character.name}</h2>
                  </div>
                  <p className="text-sm text-gray-300">
                    <strong>{character.status}</strong> - {character.species}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    <strong>Last known location:</strong>{" "}
                    <span
                      className="underline cursor-pointer hover:text-blue-400"
                      onClick={() =>
                        handleLocationClick(character.location.url)
                      }
                    >
                      {character.location.name}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    <strong>First seen in:</strong>{" "}
                    <span
                      className="underline cursor-pointer hover:text-blue-400"
                      onClick={() => handleLocationClick(character.origin.url)}
                    >
                      {character.origin.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
