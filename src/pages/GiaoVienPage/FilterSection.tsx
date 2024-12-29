import React, { useState } from "react";
import {
  Box,
  Heading,
  Checkbox,
  HStack,
  VStack,
  Collapse,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface Option {
  value: string;
  label: string;
}

interface FilterSectionProps {
  label: string;
  options: Option[];
  selectedFilters: Option[];
  setSelectedFilters: (filters: Option[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  label,
  options,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (option: Option, isChecked: boolean) => {
    setSelectedFilters(
      isChecked
        ? [...selectedFilters, option]
        : selectedFilters.filter((filter) => filter.value !== option.value)
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box marginBottom="4">
      <HStack justifyContent="space-between" width="102%">
        <Heading as="h4" size="sm" marginBottom="2">
          {label}
        </Heading>
        <IconButton
          icon={
            isOpen ? (
              <ChevronUpIcon boxSize={6} />
            ) : (
              <ChevronDownIcon boxSize={6} />
            )
          }
          colorScheme="white"
          aria-label={`Toggle ${label}`}
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
        />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" maxHeight="300px" minHeight="150px" overflowY="auto">
        <Box
            position="sticky"
            top="0"
            zIndex="1"
            width="100%"
            backgroundColor="#2A2A2A"
            borderRadius='md'
          >
            <Input
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              margin="2px"
              size="sm"
              border="none"
              focusBorderColor="transparent"
              backgroundColor="#2A2A2A"
              color="white"
              borderRadius="md"
              height="20px"
              fontSize="sm"
            />
          </Box>
          {filteredOptions.map((option) => (
            <Box key={option.value} height="40px">
              <Checkbox
                key={option.value}
                isChecked={selectedFilters.some(
                  (filter) => filter.value === option.value
                )}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                border="none"
              >
                {option.label}
              </Checkbox>
            </Box>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default FilterSection;