import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    background: "var(--primary-black)",
  },
});

const primary = definePartsStyle({
  field: {
    background: "var(--primary-black)",
    border: "1px solid",
    borderColor: "var(--secondary-mono-1)",
    padding: "1rem",
    height: "56px",
    cursor: "pointer",
    color: "#898886",
    _focus: {
      borderColor: "#4900BC!important",
    },
    _focusVisible: {
      borderColor: "#4900BC!important",
    },
    _invalid: {
      borderColor: "red",
    },
    _disabled: {
      opacity: "0.7",
    },
  },
});

export const selectTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { primary },
});
