"use client"
import React, { useState, useEffect, useRef } from "react";
const SearchInput = ({ onSearch, placeholder = "Search by name...", debounceTime = 500, className = "" }) => {
  const [value, setValue] = useState("");
  const debRef = useRef(null);

  // call onSearch with debounce
  useEffect(() => {
    if (!onSearch) return;

    if (debRef.current) clearTimeout(debRef.current);

    debRef.current = setTimeout(() => {
      onSearch(value.trim() === "" ? undefined : value.trim());
    }, debounceTime);

    return () => {
      if (debRef.current) clearTimeout(debRef.current);
    };
  }, [value, onSearch, debounceTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debRef.current) clearTimeout(debRef.current);
    onSearch(value.trim() === "" ? undefined : value.trim());
  };

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-56"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="px-2 py-2 border rounded-md text-sm hover:bg-gray-100"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchInput;
