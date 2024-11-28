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
import { TrungTamAPI, GiaoVienAPI } from "../../lib/API/API";
import { globalStore } from "../../globalsvar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import GiaoVienForm from "../../components/UpdateFormGiaoVien/UpdateFormGiaoVien";

//import { supabase } from "@/lib/supabase";
//import searchingfunction from "../../services/searching";

import { createClient } from "@supabase/supabase-js";

interface GiaoVien {
  ghi_chu: string;
  id: string;
  ma_giao_vien: string;
  ma_don_vi: string;
  ngay_cap_nhat: string;
  ngay_tao: string;
  password: string;
  so_dien_thoai: string;
  ten_giao_vien: string;
}

interface Option {
  value: string;
  label: string;
}

const generateMembers = async (searching_data?: any[]) => {
  //let email = globalStore.get<string>("Main_Email");
  if (searching_data && searching_data.length > 0) return searching_data;
  // biome-ignore lint/style/noUselessElse: <explanation>
  else {
    const id = localStorage.getItem("Main_Id") || "";
    const result = await TrungTamAPI.getTrungTamLISTGV(id);
    return result;
  }
};

const MemberSearchPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedGiaoVien, setSelectedGiaoVien] = useState<GiaoVien | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    const madonvi = localStorage.getItem("Matrungtam");
    console.log(madonvi);
    const result = await GiaoVienAPI.searchingGiaoVien(query, madonvi ?? "");
    console.log(result);
    const searcheddata = await generateMembers(result);
    setMembers(searcheddata);
    setIsFilterOpen(false);
    return result;
  };

  const handleAddGiaoVien = () => {
    setSelectedGiaoVien({
      ghi_chu: "",
      id: "",
      ma_giao_vien: "",
      ma_don_vi: localStorage.getItem("Matrungtam") || "",
      ngay_cap_nhat: "",
      ngay_tao: "",
      password: "",
      so_dien_thoai: "",
      ten_giao_vien: "",
    });
    onOpen();
  };

  const handleSaveGiaoVien = async (giaoVien: GiaoVien) => {
    const updateBody = {
      madonvi: giaoVien.ma_don_vi,
      magiaovien: giaoVien.ma_giao_vien,
      tengiaovien: giaoVien.ten_giao_vien,
      sodienthoai: giaoVien.so_dien_thoai,
      ghichu: giaoVien.ghi_chu,
    };

    try {
      const newGiaoVien = await GiaoVienAPI.createGiaoVien(updateBody);
      setMembers([...members, ...newGiaoVien]);
      onClose();
    } catch (error) {
      console.error("Error adding GiaoVien:", error);
    }
  };

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
          <Button onClick={handleAddGiaoVien}>Thêm Giáo Viên</Button>
        </HStack>
        <GiaoVienTable data={members} setData={setMembers} />
      </Box>
      {selectedGiaoVien && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Thêm giáo viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedGiaoVien && (
                <GiaoVienForm
                  giaoVien={selectedGiaoVien}
                  onSave={setSelectedGiaoVien}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  if (selectedGiaoVien) {
                    console.log(123123123);
                    handleSaveGiaoVien(selectedGiaoVien);
                  }
                }}
              >
                Lưu thông tin
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default MemberSearchPage;
