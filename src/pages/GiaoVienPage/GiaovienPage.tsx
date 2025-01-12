import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Button,
  HStack,
  Select,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import GiaoVienTable from "../../components/GiaoVienTable/GiaoVienTable";
import { TrungTamAPI, GiaoVienAPI } from "../../lib/API/API";
import GiaoVienForm from "../../components/UpdateFormGiaoVien/UpdateFormGiaoVien";
import { Pagination } from "../../components/Pagination/Pagination";

// Types
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

// Helper function
const generateMembers = async (searching_data?: any[]) => {
  if (searching_data && searching_data.length > 0) return searching_data;
  else {
    const id = localStorage.getItem("Main_Id") || "";
    const result = await TrungTamAPI.getTrungTamLISTGV(id, 1, 10);
    return result;
  }
};

// Main Component
const GiaovienPage: React.FC = () => {
  const [members, setMembers] = useState<GiaoVien[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGiaoVien, setSelectedGiaoVien] = useState<GiaoVien | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan1900] = useMediaQuery("(min-width: 1900px)");

  const fetchMembers = async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("Main_Id") || "";
      const response = await TrungTamAPI.getTrungTamLISTGV(id, page, limit);

      if (response && "paginatedGiaoVienArray" in response) {
        setMembers(response.paginatedGiaoVienArray);
        setTotalItems(response.totalitems);
      } else {
        setMembers([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTo(0, 0);
    }
  }, []);

  useLayoutEffect(() => {
    fetchMembers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const madonvi = localStorage.getItem("Matrungtam");
      const response = await GiaoVienAPI.searchingGiaoVien(
        query,
        madonvi ?? ""
      );
      if (response && "paginatedGiaoVienArray" in response) {
        setMembers(response.paginatedGiaoVienArray);
        setTotalItems(response.totalitems);
      } else {
        setMembers([]);
        setTotalItems(0);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching:", error);
      setMembers([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
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
    try {
      const updateBody = {
        madonvi: giaoVien.ma_don_vi,
        magiaovien: giaoVien.ma_giao_vien,
        tengiaovien: giaoVien.ten_giao_vien,
        sodienthoai: giaoVien.so_dien_thoai,
        ghichu: giaoVien.ghi_chu,
      };

      await GiaoVienAPI.createGiaoVien(updateBody);
      await fetchMembers(currentPage, itemsPerPage);
      onClose();
    } catch (error) {
      console.error("Error adding GiaoVien:", error);
    }
  };

  return (
    <Box
      ref={parentRef}
      display="flex"
      flexDirection="row"
      padding="4"
      margin="0 auto"
      textAlign="left"
      height="102vh"
      bg="#EAE7D6" /* Pale cyan background */
      color="#0C5776" /* Rich teal blue text */
    >
      <Box flex="1" display="flex" flexDirection="column" height="100%">
        <Heading as="h1" size="xl" marginBottom="6" color="#0C5776">
          Danh sách giáo viên
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Button colorScheme="orange" onClick={handleAddGiaoVien}>
            Thêm Giáo Viên
          </Button>
        </HStack>

        <GiaoVienTable data={members} setData={setMembers} />

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
        />
      </Box>

      {selectedGiaoVien && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="white" color="#0C5776" maxWidth="50%" width="50%">
            <ModalHeader>Thêm giáo viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GiaoVienForm
                giaoVien={selectedGiaoVien}
                onSave={setSelectedGiaoVien}
              />
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

export default GiaovienPage;
