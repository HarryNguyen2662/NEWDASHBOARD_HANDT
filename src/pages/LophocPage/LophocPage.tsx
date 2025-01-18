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
import LopHocTable from "../../components/LopHocTable/LopHocTable";
import { TrungTamAPI, LopHocAPI } from "../../lib/API/API";
import LopHocForm from "../../components/UpdateFormLopHoc/UpdateFormLopHoc";
import { Pagination } from "../../components/Pagination/Pagination";

// Types
interface LopHoc {
  id: string;
  ma_don_vi: string;
  ma_khoa_hoc: string;
  ma_lop_hoc: string;
  thong_tin_lop_hoc: string;
  thoi_gian_bat_dau: string;
  ngay_tao: string;
  ngay_gio_cap_nhat: string;
  kich_hoat: boolean;
}

interface Option {
  value: string;
  label: string;
}

// Helper function
const generateClasses = async (searching_data?: any[]) => {
  if (searching_data && searching_data.length > 0) return searching_data;
  else {
    const id = localStorage.getItem("Main_Id") || "";
    const result = await TrungTamAPI.getTrungTamLISTLH(id, 1, 10);
    return result;
  }
};

// Main Component
const LophocPage: React.FC = () => {
  const [classes, setClasses] = useState<LopHoc[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLopHoc, setSelectedLopHoc] = useState<LopHoc | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan1900] = useMediaQuery("(min-width: 1900px)");

  const fetchClasses = async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("Main_Id") || "";
      const response = await TrungTamAPI.getTrungTamLISTLH(id, page, limit);

      if (response && "paginatedLopHocArray" in response) {
        setClasses(response.paginatedLopHocArray);
        setTotalItems(response.totalitems);
      } else {
        setClasses([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setClasses([]);
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
    fetchClasses(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const madonvi = localStorage.getItem("Matrungtam");
      const response = await LopHocAPI.searchingLopHoc(query, madonvi ?? "");
      if (response && "paginatedLophocArray" in response) {
        setClasses(response.paginatedLophocArray);
        setTotalItems(response.totalitems);
      } else {
        setClasses([]);
        setTotalItems(0);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching:", error);
      setClasses([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLopHoc = () => {
    setSelectedLopHoc({
      id: "",
      ma_don_vi: localStorage.getItem("Matrungtam") || "",
      ma_khoa_hoc: "",
      ma_lop_hoc: "",
      thong_tin_lop_hoc: "",
      thoi_gian_bat_dau: "",
      ngay_tao: "",
      ngay_gio_cap_nhat: "",
      kich_hoat: true,
    });
    onOpen();
  };

  const handleSaveLopHoc = async (lopHoc: LopHoc) => {
    try {
      const updateBody = {
        madonvi: lopHoc.ma_don_vi,
        makhoahoc: lopHoc.ma_khoa_hoc,
        malophoc: lopHoc.ma_lop_hoc,
        thongtinlophoc: lopHoc.thong_tin_lop_hoc,
        thoigianbatdau: lopHoc.thoi_gian_bat_dau,
      };
      console.log(updateBody);
      await LopHocAPI.createLopHoc(updateBody);
      await fetchClasses(currentPage, itemsPerPage);
      onClose();
    } catch (error) {
      console.error("Error adding LopHoc:", error);
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
      background="linear-gradient(135deg, #2D99AE, #0C5776)"
      color="#0C5776" /* Rich teal blue text */
    >
      <Box flex="1" display="flex" flexDirection="column" height="100%">
        <Heading as="h1" size="xl" marginBottom="6" color="#000000">
          Danh sách lớp học
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Button colorScheme="orange" onClick={handleAddLopHoc}>
            Thêm Lớp Học
          </Button>
        </HStack>

        <LopHocTable data={classes} setData={setClasses} />

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
        />
      </Box>

      {selectedLopHoc && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="white" color="#0C5776" maxWidth="50%" width="50%">
            <ModalHeader>Thêm lớp học</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LopHocForm lopHoc={selectedLopHoc} onSave={setSelectedLopHoc} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  if (selectedLopHoc) {
                    handleSaveLopHoc(selectedLopHoc);
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

export default LophocPage;
