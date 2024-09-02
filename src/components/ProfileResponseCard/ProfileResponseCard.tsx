import React from "react";
import { Box, Badge, Text, VStack, Stack } from "@chakra-ui/react";

interface ResponseData {
  title?: string;
  selectionPrompts?: string[];
  selectionResponses?: string[][];
  openShortPrompts?: string[];
  openShortResponses?: string[];
  openLongPrompts?: string[];
  openLongResponses?: string[];
}

interface ProfileResponseCardProps {
  responseData: ResponseData;
}

const ProfileResponseCard: React.FC<ProfileResponseCardProps> = ({
  responseData,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px",
        gap: "16px",
        width: "100%",
        borderStyle: "solid",
        borderRadius: "8px",
        borderWidth: "2px",
        borderColor: "#4C4C4C",
        bgColor: "#080808",

        marginBottom: "1rem",
      }}
    >
      {responseData.title && (
        <Text
          sx={{
            fontFamily: '"PP Fraktion Mono", monospace',
            fontSize: "24px",
            lineHeight: "36px",
            margin: 0,
            fontWeight: 600,
            color: "#CBCBCB",
          }}
        >
          {responseData.title}
        </Text>
      )}
      <VStack align="start" spacing={4} width={"100%"}>
        {responseData.selectionPrompts &&
          responseData.selectionPrompts.map((prompt, index) => (
            <Box key={index}>
              <Text
                sx={{
                  fontFamily: '"PP Fraktion Mono", monospace',
                  display: "flex",
                  fontSize: "16px",
                  fontWeight: "400px",
                  lineHeight: "24px",
                  color: "#989898",
                  marginBottom: "0px",
                  marginLeft: 0,
                }}
              >
                {prompt}
              </Text>
            </Box>
          ))}
          {responseData.selectionResponses &&
            responseData.selectionResponses.map((prompt, index) => (
              <Box key={index}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                  direction="column"
                >
                  {responseData.selectionResponses &&
                    responseData.selectionResponses[index]?.map((response, i) => (
                      <Badge
                        key={i}
                        sx={{
                          fontFamily: '"PP Fraktion Mono", monospace',
                          background: "#4C4C4C",
                          color: "#F7F7F7",
                          width: "auto",
                          textTransform: "none",
                          padding: "8px 16px",
                          borderRadius: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {response}
                      </Badge>
                    ))}
                </Stack>
              </Box>
            ))}
        {responseData.openShortPrompts &&
          responseData.openShortResponses &&
          responseData.openShortPrompts.map((prompt, index) => (
            <Box key={index} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Text
                sx={{
                  fontFamily: '"PP Fraktion Mono", monospace',
                  display: "flex",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: "#989898",
                  marginBottom: "10px",
                  marginLeft: 0,
                }}
              >
                {prompt}
              </Text>
              <Text
                sx={{
                  fontFamily: '"PP Fraktion Mono", monospace',
                  display: "flex",
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "24px",
                  color: "#e6e6e6",
                  marginLeft: "16px",
                  marginBottom: "10px",
                }}
              >
                {responseData.openShortResponses &&
                  responseData.openShortResponses[index]}
              </Text>
            </Box>
          ))}
          {responseData.openLongPrompts &&
            responseData.openLongResponses &&
            responseData.openLongPrompts.map((prompt, index) => (
              <Box key={index} width={"100%"}>
                <Text
                  sx={{
                    fontFamily: '"PP Fraktion Mono", monospace',
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: "#989898",
                    marginBottom: "10px",
                    marginLeft: 0,
                  }}
                >
                  {prompt}
                </Text>
                <Box backgroundColor={"#121212"} borderRadius={"14px"} padding={"16px"} width={"100%"}>
                <Text
                  sx={{
                    fontFamily: '"PP Fraktion Mono", monospace',
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "#e6e6e6",
                    marginLeft: 0,
                    marginBottom: "10px",
                  }}
                >
                  {responseData.openLongResponses &&
                    responseData.openLongResponses[index]}
                </Text>
              </Box>
                </Box>
            ))}
      </VStack>
    </Box>
  );
};

export default ProfileResponseCard;
