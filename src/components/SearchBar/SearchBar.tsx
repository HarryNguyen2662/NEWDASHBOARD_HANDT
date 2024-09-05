import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <InputGroup width="100%">
      <Input
        type="text"
        placeholder="Tìm kiếm theo tên, mã giáo viên, hoặc các thông tin khác.."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        borderRadius="14px"
      />
      <InputRightElement>
        <IconButton
          aria-label="Clear search"
          icon={<CloseIcon />}
          size="sm"
          onClick={handleClear}
          variant="unstyled"
          display={query ? "flex" : "none"}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
