import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";
import styles from "./ConnectionDashboard.module.css";

export interface PeopleToConnect {
  name: string;
  title: string;
  tags: string[];
  memberId: string; // Add memberId
}

interface ConnectionDashboardProps {
  peopleToConnect: PeopleToConnect[];
}

const ConnectionDashboard: React.FC<ConnectionDashboardProps> = ({
  peopleToConnect,
}) => {
  return (
    <Box>
      <Flex justify="space-between" m={6}>
        <Box
          className={styles.connectionBox}
          sx={{ bg: "#121212", borderRadius: "12px", p: "24px", w: "48%" }}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Text className={styles.connectionTitle} sx={{ fontSize: "18px" }}>
              Connections by location{" "}
              <span role="img" aria-label="location">
                📍
              </span>
            </Text>
            <Link to="/members">
              <Text className={styles.connectionSeeAll}>See all</Text>
            </Link>
          </Flex>
          {peopleToConnect.map((person, index) => (
            <Flex
              key={index}
              align="center"
              className={styles.connectionItem}
              sx={{
                borderBottom: "1px solid #333",
                py: "12px",
                _last: { borderBottom: "none" },
              }}
            >
              <VStack align="start" spacing={1} flex="1">
                <Text
                  className={styles.connectionName}
                  sx={{
                    color: "#F7F7F7",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {person.name}
                </Text>
                <Text
                  className={styles.connectionItemTitle}
                  sx={{
                    color: "#CBCBCB",
                    fontFamily: "monospace",
                    fontSize: "14px",
                  }}
                >
                  {person.title}
                </Text>
                <HStack spacing={2}>
                  {person.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className={styles.connectionTag}
                      sx={{
                        bg: "#313F72",
                        color: "#FFF",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        padding: "6px 16px",
                        borderRadius: "100px",
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
              <Link to={`/members/${person.memberId}`}>
                <Button
                  className={styles.connectionButton}
                  sx={{
                    bg: "#FFA300",
                    color: "black",
                    fontSize: "14px",
                    borderRadius: "10px",
                    p: "12px 24px",
                  }}
                >
                  See Details
                </Button>
              </Link>
            </Flex>
          ))}
        </Box>
        <Box
          className={styles.connectionBox}
          sx={{ bg: "#121212", borderRadius: "12px", p: "24px", w: "48%" }}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Text className={styles.connectionTitle} sx={{ fontSize: "18px" }}>
              Connections by interests{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </Text>
            <Link to="/members">
              <Text className={styles.connectionSeeAll}>See all</Text>
            </Link>
          </Flex>
          {peopleToConnect.map((person, index) => (
            <Flex
              key={index}
              align="center"
              className={styles.connectionItem}
              sx={{
                borderBottom: "1px solid #333",
                py: "12px",
                _last: { borderBottom: "none" },
              }}
            >
              <VStack align="start" spacing={1} flex="1">
                <Text
                  className={styles.connectionName}
                  sx={{
                    color: "#F7F7F7",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {person.name}
                </Text>
                <Text
                  className={styles.connectionItemTitle}
                  sx={{
                    color: "#CBCBCB",
                    fontFamily: "monospace",
                    fontSize: "14px",
                  }}
                >
                  {person.title}
                </Text>
                <HStack spacing={2}>
                  {person.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className={styles.connectionTag}
                      sx={{
                        bg: "#313F72",
                        color: "#FFF",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        padding: "6px 16px",
                        borderRadius: "100px",
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
              <Link to={`/members/${person.memberId}`}>
                <Button
                  className={styles.connectionButton}
                  sx={{
                    bg: "#FFA300",
                    color: "black",
                    fontSize: "14px",
                    borderRadius: "10px",
                    p: "12px 24px",
                  }}
                >
                  See Details
                </Button>
              </Link>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default ConnectionDashboard;
