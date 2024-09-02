import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Checkbox,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

interface Option {
  value: string;
  label: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

interface MultiSelectFilterMenuProps {
  groupedOptions: GroupedOption[];
  selectedOptions: Option[];
  onChange: (selectedOptions: Option[]) => void;
}

const MultiSelectFilterMenu: React.FC<MultiSelectFilterMenuProps> = ({
  groupedOptions,
  selectedOptions,
  onChange,
}) => {
  const handleCheckboxChange = (option: Option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    onChange(newSelectedOptions);
  };

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        Filter
      </MenuButton>
      <MenuList p={4} minWidth="300px" backgroundColor="gray.800">
        {groupedOptions.map((group) => (
          <Box key={group.label} mb={4}>
            <Text fontWeight="bold" mb={2} color="white">
              {group.label}
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {group.options.map((option) => (
                <Checkbox
                  key={option.value}
                  isChecked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  colorScheme="teal"
                >
                  <Text color="white">{option.label}</Text>
                </Checkbox>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MultiSelectFilterMenu;
