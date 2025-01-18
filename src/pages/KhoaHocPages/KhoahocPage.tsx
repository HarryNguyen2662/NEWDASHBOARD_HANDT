import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Button,
  HStack,
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
import SearchBar from "../../components/SearchBar/SearchBar";
import KhoaHocTable from "../../components/KhoaHocTable/KhoaHocTable";
import { TrungTamAPI, KhoaHocAPI } from "../../lib/API/API";
import KhoaHocForm from "../../components/UpdateFormKhoaHoc/UpdateFormKhoaHoc";
import { Pagination } from "../../components/Pagination/Pagination";

// Types
interface KhoaHoc {
  id: string;
  ma_don_vi: string;
  ma_khoa_hoc: string;
  thong_tin_khoa_hoc: string;
  thoi_gian_bat_dau: string;
  ngay_tao: string;
  ngay_gio_cap_nhat: string;
  kich_hoat: boolean;
}

// Helper function
const generateCourses = async (searching_data?: any[]) => {
  if (searching_data && searching_data.length > 0) return searching_data;
  else {
    const id = localStorage.getItem("Main_Id") || "";
    const result = await TrungTamAPI.getTrungTamLISTKH(id, 1, 10);
    return result;
  }
};

// Main Component
const KhoaHocPage: React.FC = () => {
  const [courses, setCourses] = useState<KhoaHoc[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState<KhoaHoc | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan1900] = useMediaQuery("(min-width: 1900px)");

  const fetchCourses = async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("Main_Id") || "";
      const response = await TrungTamAPI.getTrungTamLISTKH(id, page, limit);

      if (response && "paginatedKhoaHocArray" in response) {
        setCourses(response.paginatedKhoaHocArray);
        setTotalItems(response.totalitems);
      } else {
        setCourses([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
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
    fetchCourses(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const madonvi = localStorage.getItem("Matrungtam");
      const response = await KhoaHocAPI.searchingKhoaHoc(query, madonvi ?? "");
      if (response && "paginatedKhoahocArray" in response) {
        setCourses(response.paginatedKhoahocArray);
        setTotalItems(response.totalitems);
      } else {
        setCourses([]);
        setTotalItems(0);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching:", error);
      setCourses([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddKhoaHoc = () => {
    setSelectedKhoaHoc({
      id: "",
      ma_don_vi: localStorage.getItem("Matrungtam") || "",
      ma_khoa_hoc: "",
      thong_tin_khoa_hoc: "",
      thoi_gian_bat_dau: "",
      ngay_tao: "",
      ngay_gio_cap_nhat: "",
      kich_hoat: true,
    });
    onOpen();
  };

  const handleSaveKhoaHoc = async (khoaHoc: KhoaHoc) => {
    try {
      const updateBody = {
        madonvi: khoaHoc.ma_don_vi,
        makhoahoc: khoaHoc.ma_khoa_hoc,
        thongtinkhoahoc: khoaHoc.thong_tin_khoa_hoc,
        thoigianbatdau: khoaHoc.thoi_gian_bat_dau,
      };
      console.log(updateBody);
      await KhoaHocAPI.createKhoaHoc(updateBody);
      await fetchCourses(currentPage, itemsPerPage);
      onClose();
    } catch (error) {
      console.error("Error adding KhoaHoc:", error);
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
        <Heading as="h1" size="xl" marginBottom="6" color="#0C5776">
          Danh sách khóa học
        </Heading>

        <HStack marginX="2" marginBottom="4">
          <Box width="100%">
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Button colorScheme="orange" onClick={handleAddKhoaHoc}>
            Thêm Khóa Học
          </Button>
        </HStack>

        <KhoaHocTable data={courses} setData={setCourses} />

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
        />
      </Box>

      {selectedKhoaHoc && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="white" color="#0C5776" maxWidth="50%" width="50%">
            <ModalHeader>Thêm khóa học</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <KhoaHocForm
                khoaHoc={selectedKhoaHoc}
                onSave={setSelectedKhoaHoc}
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
                  if (selectedKhoaHoc) {
                    handleSaveKhoaHoc(selectedKhoaHoc);
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

export default KhoaHocPage;
