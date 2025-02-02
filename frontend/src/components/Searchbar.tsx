import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  placeholder,
}) => {
  return (
    <div className="relative w-full max-w-xs mb-5">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
