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

interface APIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageInfo, setPageInfo] = useState<APIResponse["info"] | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://rickandmortyapi.com/api/character"
  );
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get<APIResponse>(currentPageUrl);
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching the character data:", error);
      }
    };

    fetchCharacters();
  }, [currentPageUrl]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleCardClick = (id: number) => {
    router.push(`/characters/${id}`);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filterQuery = "?";
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof typeof filters]) {
        filterQuery += `${key}=${filters[key as keyof typeof filters]}&`;
      }
    });
    setCurrentPageUrl(
      `https://rickandmortyapi.com/api/character${filterQuery}`
    );
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

  return (
    <div className="relative p-8 bg-gray-900 text-white min-h-screen">
      <button
        className="absolute top-8 right-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-all duration-300"
        onClick={() => router.push("/")}
      >
        Home
      </button>

      <h1 className="text-4xl font-bold mb-8">Characters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name of character"
          value={filters.name}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Select a Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          name="species"
          placeholder="Species of character"
          value={filters.species}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="text"
          name="type"
          placeholder="Type of character"
          value={filters.type}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Select a Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {characters.map((character) => (
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
                    className={`h-3 w-3 rounded-full ${getStatusColor(
                      character.status
                    )} mr-2`}
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
                    onClick={() => handleLocationClick(character.location.url)}
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

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded ${
            !pageInfo?.prev
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 transition-all duration-300"
          }`}
          onClick={() => pageInfo?.prev && setCurrentPageUrl(pageInfo.prev!)}
          disabled={!pageInfo?.prev}
        >
          Previous
        </button>
        <button
          className={`px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded ${
            !pageInfo?.next
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 transition-all duration-300"
          }`}
          onClick={() => pageInfo?.next && setCurrentPageUrl(pageInfo.next!)}
          disabled={!pageInfo?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
