import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  borderRadius: "4px",
  fontWeight: "normal",
  fontFamily: "monospace",
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: "primary",
  },
});
