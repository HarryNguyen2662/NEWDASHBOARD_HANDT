import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Button,
  HStack,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar/SearchBar";
import HocVienTable from "../../components/HocVienTable/HocVienTable";
import { TrungTamAPI, HocVienAPI } from "../../lib/API/API";
import HocVienForm from "../../components/UpdateFormHocVien/UpdateFormHocVien";
import { Pagination } from "../../components/Pagination/Pagination";

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
  ma_don_vi: string;
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
  if (searching_data && searching_data.length > 0) return searching_data;
  else {
    const id = localStorage.getItem("Main_Id") || "";
    const result = await TrungTamAPI.getTrungTamLISTHS(id, 1, 10);
    return result;
  }
};

const AllProjectsPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [selectedHocVien, setSelectedHocVien] = useState<HocVien | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [members, setMembers] = useState<HocVien[]>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan1900] = useMediaQuery("(min-width: 1900px)");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembers = async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("Main_Id") || "";
      const response = await TrungTamAPI.getTrungTamLISTHS(id, page, limit);

      if (response && "paginatedHocVienArray" in response) {
        setMembers(response.paginatedHocVienArray);
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
      const response = await HocVienAPI.searchingHocVien(query, madonvi ?? "");

      if (response && "paginatedHocVienArray" in response) {
        setMembers(response.paginatedHocVienArray);
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

  const handleAddHocVien = () => {
    setSelectedHocVien({
      da_tot_nghiep: false,
      du_lieu_hoc_tap: { du_lieu: "" },
      email: "",
      id: "",
      kich_hoat: false,
      ma_giao_vien_quan_ly: "",
      ma_hoc_vien: "",
      ma_don_vi: localStorage.getItem("Matrungtam") || "",
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
      madonvi: hocVien.ma_don_vi,
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
      ref={parentRef}
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
          <Button onClick={handleAddHocVien}>Thêm học viên</Button>
        </HStack>

        <HocVienTable data={members} setData={setMembers} />

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
        />
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
