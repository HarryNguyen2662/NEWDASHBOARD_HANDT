import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    height: "56px",
    backgroundColor: "var(--primary-black)!important",
    _focus: {
      borderColor: "#4900BC!important",
    },
    _focusVisible: {
      borderColor: "#4900BC!important",
    },
    color: "white",
    fontFamily: "monospace",
  },
});

const variantOutline = definePartsStyle((props) => {
  return {
    field: {
      padding: "1rem",
      border: "solid 1px var(--secondary-mono-1)!important",
    },
  };
});

const variants = {
  outline: variantOutline,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "outline",
  },
});
