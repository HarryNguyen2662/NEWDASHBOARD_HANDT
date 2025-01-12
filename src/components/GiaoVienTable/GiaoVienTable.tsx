import React, { useState } from "react";
import styles from "./GiaoVienTable.module.css";
import { Edit } from "lucide-react";
import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import GiaoVienForm from "../UpdateFormGiaoVien/UpdateFormGiaoVien";
import { TrungTamAPI, GiaoVienAPI } from "../../lib/API/API";

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

interface GiaoVienTableProps {
  data: GiaoVien[];
  setData: React.Dispatch<React.SetStateAction<GiaoVien[]>>;
}

const GiaoVienTable: React.FC<GiaoVienTableProps> = ({ data, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiaoVien, setSelectedGiaoVien] = useState<GiaoVien | null>(
    null
  );

  const onButtonClick = (giaoVien: GiaoVien, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGiaoVien(giaoVien);
    onOpen();
  };

  const updateGiaoVien = (updatedGiaoVien: GiaoVien) => {
    const updateBody = {
      madonvi: updatedGiaoVien.ma_don_vi,
      magiaovien: updatedGiaoVien.ma_giao_vien,
      tengiaovien: updatedGiaoVien.ten_giao_vien,
      sodienthoai: updatedGiaoVien.so_dien_thoai,
      ghichu: updatedGiaoVien.ghi_chu,
    };

    setData((prevData) =>
      prevData.map((giaoVien) =>
        giaoVien.id === updatedGiaoVien.id ? updatedGiaoVien : giaoVien
      )
    );

    GiaoVienAPI.updateGiaoVien(updateBody, updatedGiaoVien.id);
    console.log("Updated giao vien:", updateBody);
  };

  const handleSaveClick = () => {
    if (selectedGiaoVien) {
      updateGiaoVien(selectedGiaoVien);
      onClose();
    }
  };

  const handleDeleteClick = async () => {
    if (selectedGiaoVien) {
      await GiaoVienAPI.deleteGiaoVien(selectedGiaoVien.id);
      setData((prevData) =>
        prevData.filter((giaoVien) => giaoVien.id !== selectedGiaoVien.id)
      );
      setSelectedGiaoVien(null);
      onClose();
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên giáo viên</th>
            <th>Mã giáo viên</th>
            <th>Số điện thoại</th>
            <th>Ghi chú</th>
            <th>Xem chi tiết/Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((giaoVien) => (
            <tr key={giaoVien.id}>
              <td>{giaoVien.ten_giao_vien}</td>
              <td>{giaoVien.ma_giao_vien}</td>
              <td>{giaoVien.so_dien_thoai}</td>
              <td>{giaoVien.ghi_chu}</td>
              <td>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<Edit className="w-5 h-5 mr-2" />}
                    backgroundColor="rgb(255, 149, 15)"
                    variant="solid"
                    onClick={(e) => onButtonClick(giaoVien, e)}
                  >
                    Xem chi tiết/Chỉnh sửa
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedGiaoVien && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="white" color="#0C5776" maxWidth="50%" width="50%">
            <ModalHeader>Chi tiết giáo viên</ModalHeader>
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
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Xóa giáo viên
              </Button>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button colorScheme="orange" mr={3} onClick={handleSaveClick}>
                Lưu thông tin
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default GiaoVienTable;
