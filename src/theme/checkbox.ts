import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "var(--primary-black)",
    padding: "1rem 1.5rem",
    minHeight: "74px",
    borderRadius: "4px",
    border: "solid 1px var(--secondary-mono-1)",
    margin: "0px",
    _checked: {
      borderColor: "var(--primary)",
    },
    _invalid: {
      borderColor: "var(--chakra-colors-red-500)",
    },
  },
  control: {
    width: "1.5rem",
    height: "1.5rem",
    _checked: {
      backgroundColor: "var(--primary)",
      borderColor: "var(--primary)",
    },
    _focus: {
      borderColor: "var(--primary)",
    },
  },
  label: {
    marginInlineStart: "1rem",
    textAlign: "left",
    fontSize: "1rem",
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
