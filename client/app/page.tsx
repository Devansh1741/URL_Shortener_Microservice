"use client";
import { useState } from "react";

export default function Home() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [generatedShortURL, setgeneratedShortURL] = useState("");
  const [retreviedLongURL, setRetreviedLongURL] = useState("");
  const [error, setError] = useState<any>("");

  const handleGenerateShortURL = async () => {
    try {
      const response = await fetch("http://localhost:3001/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl: longURL }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Not generated");

      setgeneratedShortURL(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  const handleRetrevieLongURL = async () => {
    try {
      const response = await fetch(`http://localhost:3001/get/${shortURL}`);

      const data = await response.json();
      if (!response.ok) throw new Error("Not Fetched");

      setRetreviedLongURL(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Welcome to Sankshipt Saas
      </h1>

      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 m-6">
        <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

        <input
          type="text"
          placeholder="Enter Long URL"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-8 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
          onClick={handleGenerateShortURL}
        >
          Generate Short URL
        </button>

        {generatedShortURL && (
          <p className="mt-4 text-green-400">
            Short URL:{" "}
            <a
              href={`http://localhost:3001/${generatedShortURL}`}
              target="_blank"
            >{`http://localhost:3001/${generatedShortURL}`}</a>
          </p>
        )}
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 m-6">
        <h2 className="text-xl font-semibold mb-4">Get Long URL</h2>

        <input
          type="text"
          placeholder="Enter Short URL"
          value={shortURL}
          onChange={(e) => setShortURL(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-8 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
          onClick={handleRetrevieLongURL}
        >
          Get Long URL
        </button>

        {retreviedLongURL && (
          <p className="mt-4 text-green-400">
            Short URL:{" "}
            <a href={retreviedLongURL} target="_blank">
              {retreviedLongURL}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
