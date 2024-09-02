import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Button,
  HStack,
  Collapse,
  useMediaQuery,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterSection from "./FilterSection";
// import QuickFilterBar from "../../components/QuickFilterBar/QuickFilterBar";
import MemberCard from "../../components/MemberCard/MemberCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { faker } from "@faker-js/faker";
import searchingfunction from "../../services/searching";

import { Databases, Query } from "appwrite";
import { account, client, database } from "../../lib/appwrite";

interface Option {
  value: string;
  label: string;
}

const interestsList = [
  "Cryptocurrency",
  "NFTs",
  "DeFi",
  "DAOs",
  "DeSci",
  "Education",
  "Security & Privacy",
];

const generateMembers = async (userdata?: any[]) => {
  let users;

  if (userdata && userdata.length > 0) {
    users = userdata;
  } else {
    const response = await database.listDocuments(
      process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
      process.env.REACT_APP_APPWRITE_USER_PROFILE_COLLECTION as string,
      [
        Query.select([
          "UserID",
          "FirstName",
          "LastName",
          "Country",
          "State",
          "E-mail",
        ]),
      ]
    );
    users = response.documents;
  }

  const memberPromises = users.map(async (user) => {
    const name = `${user.FirstName} ${user.LastName}`;
    const memberId = user.UserID;
    const location = `${user.State}, ${user.Country}`;

    const titledata = await database.listDocuments(
      process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
      process.env.REACT_APP_APPWRITE_ANSWER_COLLECTION as string,
      [
        Query.and([
          Query.equal("UserID", memberId),
          Query.equal("QuestionID", "role"),
        ]),
      ]
    );
    const title = titledata.documents[0]?.Answer || "Unknown Title";

    const interestdata = await database.listDocuments(
      process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
      process.env.REACT_APP_APPWRITE_ANSWER_COLLECTION as string,
      [
        Query.and([
          Query.equal("UserID", memberId),
          Query.equal("QuestionID", "interests"),
        ]),
      ]
    );
    const interests = interestdata.documents[0]?.Answer || "[]";
    let interestsArray;
    try {
      interestsArray = JSON.parse(interests);
    } catch (e) {
      interestsArray = [];
    }
    return {
      name,
      memberId,
      title,
      location,
      interests: interestsArray,
    };
  });

  return await Promise.all(memberPromises);
};

//const members = await generateMembers();
//console.log(members);

const MemberSearchPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [members, setMembers] = useState<any[]>([]); // Add state for members
  const parentRef = useRef<HTMLDivElement | null>(null);

  const [isLargerThan1900] = useMediaQuery("(min-width: 1900px)");

  useLayoutEffect(() => {
    parentRef.current?.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const fetchMembers = async () => {
      const members = await generateMembers();
      setMembers(members);
    };
    fetchMembers();
  }, []);

  const cardWidth = isLargerThan1900
    ? isFilterOpen
      ? "25%"
      : "20%"
    : isFilterOpen
    ? "31.46%"
    : "23.63%";

  const cardHeight = "auto";
  const rowGap = 20;

  const cardsPerRow = isLargerThan1900
    ? isFilterOpen
      ? 4
      : 5
    : isFilterOpen
    ? 3
    : 4;

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(members.length / cardsPerRow),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380 + rowGap,
    overscan: 5,
  });

  const handleSearch = async (query: string) => {
    console.log("Search query:", query);
    console.log("Selected Filters:", selectedFilters);
    const result = await searchingfunction.search(query.trim());
    console.log(result);
    const searcheddata = await generateMembers(result);
    setMembers(searcheddata);
    setIsFilterOpen(false);
    return result;
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  // const handleTabChange = (id: number) => {
  //   console.log("Selected tab index:", id - 1, interestsList);
  //   setSelectedInterest(interestsList[id - 1] || null);
  // };

  const groupedOptions = [
    {
      label: "Country",
      options: [
        { value: "united-states", label: "United States" },
        { value: "singapore", label: "Singapore" },
        { value: "canada", label: "Canada" },
        { value: "france", label: "France" },
      ],
    },
    {
      label: "Interests",
      options: [
        { value: "cryptocurrency", label: "Cryptocurrency" },
        { value: "nfts", label: "NFTs" },
        { value: "defi", label: "DeFi" },
        { value: "daos", label: "DAOs" },
        { value: "desci", label: "DeSci" },
        { value: "education", label: "Education" },
        { value: "security-privacy", label: "Security & Privacy" },
      ],
    },
    {
      label: "Role",
      options: [
        { value: "software-engineer", label: "Software Engineer" },
        { value: "product-manager", label: "Product Manager" },
        { value: "designer", label: "Designer" },
      ],
    },
    {
      label: "Service Area",
      options: [{ value: "service", label: "Service" }],
    },
    {
      label: "Skill",
      options: [{ value: "skill", label: "Skill" }],
    },
    {
      label: "Language",
      options: [
        { value: "english", label: "English" },
        { value: "french", label: "French" },
        { value: "mandarin", label: "Mandarin" },
        { value: "korean", label: "Korean" },
      ],
    },
  ];

  const filteredMembers = selectedInterest
    ? members.filter((member) => member.interests.includes(selectedInterest))
    : members;

  return (
    <Box
      display="flex"
      flexDirection="row"
      padding="4"
      margin="0 auto"
      textAlign="left"
      height="102vh"
    >
      <Box flex="1" display="flex" flexDirection="column" height="100%">
        <Heading as="h1" size="xl" marginBottom="6">
          Explore Our Community
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
          {!isFilterOpen && (
            <Button
              variant="outline"
              color="#FFA300"
              _hover={{ bg: "#262626" }}
              onClick={() => setIsFilterOpen(true)}
              sx={{
                fontSize: "14px",
                borderRadius: "14px",
                borderColor: "#4C4C4C",
                p: "27px 30px",
              }}
            >
              Filters
            </Button>
          )}
        </HStack>
        {/* 
        <Box overflowX="auto" mb="4">
          <QuickFilterBar onTabChange={handleTabChange} />
        </Box> */}

        <Box ref={parentRef} flex="1" overflow="auto" width="100%">
          <Box
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * cardsPerRow;
              const endIndex = Math.min(
                startIndex + cardsPerRow,
                filteredMembers.length
              );

              return (
                <Box
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingBottom: `${rowGap}px`,
                  }}
                >
                  {filteredMembers
                    .slice(startIndex, endIndex)
                    .map((member, index) => (
                      <Box
                        key={index}
                        width={cardWidth}
                        height={cardHeight}
                        marginX="2"
                      >
                        <MemberCard
                          name={member.name}
                          title={member.title}
                          location={member.location}
                          interests={member.interests}
                          memberId={member.memberId}
                        />
                      </Box>
                    ))}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Collapse in={isFilterOpen} animateOpacity>
        <Box
          width="300px"
          padding="4"
          backgroundColor="#121212"
          borderRadius="md"
          marginLeft="4"
          borderColor="gray.300"
          position="relative"
          height="100%"
          overflowY="auto"
        >
          <Box display="flex" flexDirection="row" margin="0" marginBottom="4">
            <Button
              onClick={() => setIsFilterOpen(false)}
              colorScheme="white"
              aria-label="Close Filters"
              margin="0"
              padding="0"
              leftIcon={<ChevronLeftIcon boxSize={6} />}
            ></Button>
            <Heading as="h3" fontSize="24px">
              Filters
            </Heading>
          </Box>

          {selectedFilters.length > 0 && (
            <Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Heading as="h4" fontSize="sm">
                  Selected Filters
                </Heading>
                <Button
                  size="extrasm"
                  onClick={clearFilters}
                  sx={{
                    bg: "transparent",
                    color: "red",
                    border: "none",
                    padding: 0,
                    _hover: {
                      backgroundColor: "transparent",
                      color: "red",
                    },
                    fontSize: "10px",
                  }}
                >
                  Clear All
                </Button>
              </Box>
              <HStack spacing="2" wrap="wrap" align="start" margin="2">
                {selectedFilters.map((filter, index) => (
                  <Tag
                    key={index}
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    bg="#4C4C4C"
                    color="white"
                    position="relative"
                  >
                    <TagLabel
                      fontFamily="monospace"
                      fontSize="sm"
                      padding="0 4px"
                    >
                      {filter.label}
                    </TagLabel>
                    <TagCloseButton
                      onClick={() =>
                        setSelectedFilters((filters) =>
                          filters.filter((f) => f.value !== filter.value)
                        )
                      }
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(50%, -50%)"
                      borderRadius="full"
                      backgroundColor="red"
                      color="black"
                      _hover={{ backgroundColor: "darkred" }}
                      width="12px"
                      height="12px"
                      fontSize="8px"
                      padding="0"
                    />
                  </Tag>
                ))}
              </HStack>
            </Box>
          )}
          {groupedOptions.map((group) => (
            <FilterSection
              key={group.label}
              label={group.label}
              options={group.options}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          ))}
          <Box display="flex" justifyContent="center" marginTop="12">
            <Button
              sx={{
                bg: "#FFA300",
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "10px",
                p: "24px 30px",
              }}
              onClick={() => handleSearch("")}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MemberSearchPage;
