import React, { useState } from "react";
import {
  Box,
  Button,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ProfileIntroCard from "../../components/ProfileIntroCard/ProfileIntroCard";
import ProfileResponseCard from "../../components/ProfileResponseCard/ProfileResponseCard";
import { useNavigate } from "react-router-dom";

// Define the type for project data
interface ProfileData {
  name: string;
  location: string;
  role: string;
}

interface ResponseData {
  title?: string;
  selectionPrompts?: string[];
  selectionResponses?: string[][];
  openShortPrompts?: string[];
  openShortResponses?: string[];
  openLongPrompts?: string[];
  openLongResponses?: string[];
}

const profileDummyDataFull: ProfileData[] = [
  {
    name: "Jane Doe",
    location: "Los Angeles, CA",
    role: "Senior Response Strategist",
  },
];

const introDummyData: ResponseData[] = [
  {
    title: "Contact info",
    openShortPrompts: ["Email", "Phone"],
    openShortResponses: ["janedoe@cw3.org", "111-111-1111"],
  },
  {
    title: "Social media",
    openShortPrompts: ["Twitter", "LinkedIn"],
    openShortResponses: ["@jane_doe", "linkedin.com/in/janedoe"],
  },
];

const interestsDummyData = [
  {
    title: "Areas of interest",
    selectionResponses: [["Cryptocurrency", "NFTs"]],
  },
  {
    title: "Skills on offer",
    selectionPrompts: [
      "Skills or expertise you are open to providing to people in CW3?",
    ],
    selectionResponses: [["Mentorship", "Coding"]],
  },
  {
    title: "Interest in Web3",
    openLongPrompts: [
      "How do you see faith integrating/intersecting in the Web3 space?",
    ],
    openLongResponses: ["My interest in Web3..."],
  },
];

const communityDummyData = [
  {
    title: "Participation interests",
    selectionPrompts: ["What would you like to participate in?"],
    selectionResponses: [["Mentorship", "Prayer"]],
  },
  {
    title: "Communications",
    openLongPrompts: ["Preferred communication channel(s)", "Preferred video conference platform(s)"],
    openLongResponses: ["Discord, WhatsApp", "Zoom"],
  },
  {
    title: "Volunteer interests",
    selectionPrompts: ["What would you like to help with?"],
    selectionResponses: [["Community management", "Hosting gatherings"]],
  },
];

const professionalDummyData = [
  {
    title: "Business/organization info",
    openShortPrompts: ["Organization", "Service Area", "Role"],
    openShortResponses: ["Christians in Web3", "Investment Prep", "Senior Response Strategist"],
  },
  {
    title: "Collaboration interests",
    openLongPrompts: [
      "Do you have a current business that may need assistance?",
      "Do you have a startup project that may need assistance?",
      "Do you formally provide services to businesses or organizations?",
    ],
    openLongResponses: ["Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar.", "Yes. I have...", "Nope."],
  },
];

const ProfilePage = () => {
  // Use state to manage project data
  const [projects, setProjects] = useState<ProfileData[]>(profileDummyDataFull);
  const [introResponses, setIntroResponses] =
    useState<ResponseData[]>(introDummyData);
  const [ineterestsResponses, setInterestsResponses] =
    useState<ResponseData[]>(interestsDummyData);
  const [communityResponses, setCommunityResponses] =
    useState<ResponseData[]>(communityDummyData);
  const [professionalResponses, setProfessionalResponses] = useState<
    ResponseData[]
  >(professionalDummyData);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box p={4} minHeight="100vh">
      <Box ml={4} mt={3}>
        <Button
          variant="link"
          color="#a0a0a0"
          fontSize="18px"
          fontWeight="400"
          leftIcon={<ChevronLeftIcon />}
          onClick={handleBackClick}
          sx={{
            textDecoration: "none",
            _hover: {
              textDecoration: "none",
            },
          }}
        >
          Back
        </Button>
      </Box>
      <Box>
        {projects.map((project, index) => (
          <ProfileIntroCard key={index} profileData={project} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "8px",
          marginTop: "20px",
          padding: "20px",
          background: "#121212",
        }}
      >
        <Tabs
          orientation="vertical"
          width="100%"
          sx={{
            display: "flex",
          }}
        >
          <TabList
            sx={{
              fontFamily: '"PP Fraktion Mono", monospace',
              width: "240px",
              paddingRight: "15px",
              borderRight: "2px solid #4C4C4C",
              borderLeft: "0px",
              gap: "6px",
            }}
          >
            <Tab
              sx={{
                padding: "16px",
                borderRadius: "8px",
                width: "100%",
                height: "64px",
                _selected: { bg: "#4900BC" },
              }}
            >
              Overview
            </Tab>
            <Tab
              sx={{
                padding: "16px",
                borderRadius: "8px",
                width: "100%",
                height: "64px",
                _selected: { bg: "#4900BC" },
              }}
            >
              Interests and expertise
            </Tab>
            <Tab
              sx={{
                padding: "16px",
                borderRadius: "8px",
                width: "100%",
                height: "64px",
                _selected: { bg: "#4900BC" },
              }}
            >
              Community engagement
            </Tab>
            <Tab
              sx={{
                padding: "16px",
                borderRadius: "8px",
                width: "100%",
                height: "64px",
                _selected: { bg: "#4900BC" },
              }}
            >
              Professional activity
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div>
                {introResponses.map((response, index) => (
                  <ProfileResponseCard key={index} responseData={response} />
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              {ineterestsResponses.map((response, index) => (
                <ProfileResponseCard key={index} responseData={response} />
              ))}
            </TabPanel>

            <TabPanel>
              {communityResponses.map((response, index) => (
                <ProfileResponseCard key={index} responseData={response} />
              ))}
            </TabPanel>

            <TabPanel>
              {professionalResponses.map((response, index) => (
                <ProfileResponseCard key={index} responseData={response} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfilePage;
