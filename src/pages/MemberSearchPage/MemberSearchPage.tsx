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
import MemberCard from "../../components/MemberCard/MemberCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import GiaoVienTable from "../../components/GiaoVienTable/GiaoVienTable";
import { TrungTamAPI } from "../../lib/API/API";
import { globalStore } from "../../globalsvar";

//import { supabase } from "@/lib/supabase";
//import searchingfunction from "../../services/searching";

import { createClient } from "@supabase/supabase-js";

interface Option {
  value: string;
  label: string;
}

interface GiaoVien {
  id: string;
  maGiaoVien: string;
  maTrungTam: string;
  tenGiaoVien: string;
  soDienThoai: string;
  ghiChu?: string;
  ngayTao?: string;
  ngayCapNhat?: string;
  password?: string;
}

const fakeData: GiaoVien[] = [
  {
    id: "1",
    maGiaoVien: "GV001",
    maTrungTam: "TT001",
    tenGiaoVien: "John Doe",
    soDienThoai: "123-456-7890",
    ghiChu: "Math teacher",
  },
  {
    id: "2",
    maGiaoVien: "GV002",
    maTrungTam: "TT002",
    tenGiaoVien: "Jane Smith",
    soDienThoai: "098-765-4321",
    ghiChu: "Science teacher",
  },
  {
    id: "3",
    maGiaoVien: "GV003",
    maTrungTam: "TT003",
    tenGiaoVien: "Alice Johnson",
    soDienThoai: "555-555-5555",
    ghiChu: "History teacher",
  },
  {
    id: "4",
    maGiaoVien: "GV004",
    maTrungTam: "TT004",
    tenGiaoVien: "Bob Brown",
    soDienThoai: "444-444-4444",
    ghiChu: "English teacher",
  },
];

const generateMembers = async () => {
  console.log(globalStore.get<string>("Main_Email"));
  return TrungTamAPI.getTrungTamByEmail(
    globalStore.get<string>("Main_Email") || ""
  );
};

const MemberSearchPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [members, setMembers] = useState<any[]>([]);
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
    /*const result = await searchingfunction.search(query.trim());
    console.log(result);
    const searcheddata = await generateMembers(result);
    setMembers(searcheddata);
    setIsFilterOpen(false);
    return result;*/
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

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
          Danh sách giáo viên
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
        </HStack>
        <GiaoVienTable data={fakeData} />
      </Box>
    </Box>
  );
};

export default MemberSearchPage;