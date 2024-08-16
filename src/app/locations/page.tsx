"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
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
  results: Location[];
}

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [pageInfo, setPageInfo] = useState<APIResponse["info"] | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://rickandmortyapi.com/api/location"
  );
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    dimension: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<APIResponse>(currentPageUrl);
        setLocations(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching the location data:", error);
      }
    };

    fetchLocations();
  }, [currentPageUrl]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setCurrentPageUrl(`https://rickandmortyapi.com/api/location${filterQuery}`);
  };

  const handleCardClick = (id: number) => {
    router.push(`/locations/${id}`);
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <button
        className="absolute top-8 right-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-all duration-300"
        onClick={() => router.push("/")}
      >
        Home
      </button>
      <h1 className="text-4xl font-bold mb-8">Locations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="text"
          name="dimension"
          placeholder="Dimension"
          value={filters.dimension}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 cursor-pointer hover:bg-gray-700 transition-all duration-300"
            onClick={() => handleCardClick(location.id)}
          >
            <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
            <p className="text-sm text-gray-300">
              <strong>Type:</strong> {location.type}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Dimension:</strong> {location.dimension}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <strong>Residents:</strong> {location.residents.length}{" "}
              resident(s)
            </p>
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

export default LocationsPage;
