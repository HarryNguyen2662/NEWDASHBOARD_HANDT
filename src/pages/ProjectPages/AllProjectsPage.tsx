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
import FilterSection from "../../components/Filter/MultiSelectFilter";
import MemberCard from "../../components/MemberCard/MemberCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import HocVienTable from "../../components/HocVienTable/HocVienTable";
import { TrungTamAPI, HocVienAPI } from "../../lib/API/API";
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
import HocVienForm from "../../components/UpdateFormHocVien/UpdateFormHocVien";

//import { supabase } from "@/lib/supabase";
//import searchingfunction from "../../services/searching";

import { createClient } from "@supabase/supabase-js";

interface HocVien {
  da_tot_nghiep: boolean;
  du_lieu_hoc_tap: {
    du_lieu: string;
  };
  email: string;
  id: string;
  kich_hoat: boolean;
  ma_giao_vien_quan_ly: string;
  ma_hoc_vien: string;
  ma_trung_tam: string;
  ngay_gio_cap_nhat: string;
  ngay_tao: string;
  password: string;
  so_dien_thoai: string;
  ten_hoc_vien: string;
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
    const result = await TrungTamAPI.getTrungTamLISTHS(id);
    return result;
  }
};

const AllProjectsPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedHocVien, setSelectedHocVien] = useState<HocVien | null>(null);
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
    const matrungtam = localStorage.getItem("Matrungtam");
    console.log(matrungtam);
    const result = await HocVienAPI.searchingHocVien(query, matrungtam ?? "");
    console.log(result);
    const searcheddata = await generateMembers(result);
    setMembers(searcheddata);
    setIsFilterOpen(false);
    return result;
  };

  const handleAddHocVien = () => {
    setSelectedHocVien({
      da_tot_nghiep: false,
      du_lieu_hoc_tap: { du_lieu: "" },
      email: "",
      id: "",
      kich_hoat: false,
      ma_giao_vien_quan_ly: "",
      ma_hoc_vien: "",
      ma_trung_tam: localStorage.getItem("Matrungtam") || "",
      ngay_gio_cap_nhat: "",
      ngay_tao: "",
      password: "",
      so_dien_thoai: "",
      ten_hoc_vien: "",
    });
    onOpen();
  };

  const handleSaveHocVien = async (hocVien: HocVien) => {
    const updateBody = {
      matrungtam: hocVien.ma_trung_tam,
      mahocvien: hocVien.ma_hoc_vien,
      magiaovienquanly: hocVien.ma_giao_vien_quan_ly,
      tenhocvien: hocVien.ten_hoc_vien,
      sodienthoai: hocVien.so_dien_thoai,
      email: hocVien.email,
      kichhoat: hocVien.kich_hoat,
      dulieuhoctap: hocVien.du_lieu_hoc_tap,
      datotnghiep: hocVien.da_tot_nghiep,
    };

    try {
      const newHocVien = await HocVienAPI.createHocVien(updateBody);
      setMembers([...members, ...newHocVien]);
      onClose();
    } catch (error) {
      console.error("Error adding HocVien:", error);
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
          Danh sách học viên
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Button onClick={handleAddHocVien}>Thêm Học Viên</Button>
        </HStack>
        <HocVienTable data={members} setData={setMembers} />
      </Box>
      {selectedHocVien && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Thêm học viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedHocVien && (
                <HocVienForm
                  hocVien={selectedHocVien}
                  onSave={setSelectedHocVien}
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
                  if (selectedHocVien) {
                    handleSaveHocVien(selectedHocVien);
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

export default AllProjectsPage;
