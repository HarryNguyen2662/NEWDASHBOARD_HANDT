import React from 'react';
import { Tabs, TabList, Tab, Icon, Flex, Text } from '@chakra-ui/react';
import { FaGlobe, FaWindowMaximize } from 'react-icons/fa';

interface FilterNavProps {
  onTabChange: (id: number) => void;
}

const FilterNav: React.FC<FilterNavProps> = ({ onTabChange }) => {
  return (
    <Tabs variant="unstyled" width="100%" onChange={onTabChange}>
      <TabList display="flex" justifyContent="space-evenly" width="100%">
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaGlobe} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>All</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>Cryptocurrency</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>NFTs</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>DeFi</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>DAOs</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>DeSci</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>Education</Text>
          </Flex>
        </Tab>
        <Tab _selected={{ color: '#FFA300', bg: 'none' }} flex="1">
          <Flex direction="column" alignItems="center" justifyContent="start" height="100%">
            <Icon as={FaWindowMaximize} boxSize={6} />
            <Text fontSize="12px" lineHeight="short" mt={1}>Security & Privacy</Text>
          </Flex>
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default FilterNav;