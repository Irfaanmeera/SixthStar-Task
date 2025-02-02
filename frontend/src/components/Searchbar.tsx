import React from "react";
// import SearchIcon from "@mui/icons-material/Search"; // Importing the search icon from Material UI

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  return (
    <div className="relative w-full max-w-xs mb-5">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-3 py-2 w-full"
        onChange={onChange}
      />
      {/* <SearchIcon
        className="absolute right-0 p-1  rounded-lg top-1/2 transform -translate-y-1/2 text-gray cursor-pointer"
        style={{ fontSize: "2.4rem", backgroundColor: "#043B64" }}
      /> */}
    </div>
  );
};

export default SearchBar;
