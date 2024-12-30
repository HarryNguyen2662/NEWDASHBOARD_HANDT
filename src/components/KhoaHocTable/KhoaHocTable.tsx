import React, { useState } from "react";
import styles from "./KhoaHocTable.module.css";
import { Edit } from "lucide-react";
import {
  Button,
  Stack,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import UpdateFormKhoaHoc from "../UpdateFormKhoaHoc/UpdateFormKhoaHoc";
import { KhoaHocAPI } from "../../lib/API/API";

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

interface KhoaHocTableProps {
  data: KhoaHoc[];
  setData: React.Dispatch<React.SetStateAction<KhoaHoc[]>>;
}

const KhoaHocTable: React.FC<KhoaHocTableProps> = ({ data, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState<KhoaHoc | null>(null);

  const onButtonClick = (khoaHoc: KhoaHoc, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedKhoaHoc(khoaHoc);
    onOpen();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateKhoaHoc = (updatedKhoaHoc: KhoaHoc) => {
    const updateBody = {
      madonvi: updatedKhoaHoc.ma_don_vi,
      makhoahoc: updatedKhoaHoc.ma_khoa_hoc,
      thongtinkhoahoc: updatedKhoaHoc.thong_tin_khoa_hoc,
      thoigianbatdau: updatedKhoaHoc.thoi_gian_bat_dau,
      kichhoat: updatedKhoaHoc.kich_hoat,
    };

    setData((prevData) =>
      prevData.map((khoaHoc) =>
        khoaHoc.id === updatedKhoaHoc.id ? updatedKhoaHoc : khoaHoc
      )
    );

    KhoaHocAPI.updateKhoaHoc(updatedKhoaHoc.id, updateBody);
    console.log("Updated khoa hoc:", updateBody);
  };

  const handleSaveClick = () => {
    if (selectedKhoaHoc) {
      updateKhoaHoc(selectedKhoaHoc);
      onClose();
    }
  };

  const handleDeleteClick = async () => {
    if (selectedKhoaHoc) {
      await KhoaHocAPI.deleteKhoaHoc(selectedKhoaHoc.id);
      setData((prevData) =>
        prevData.filter((khoaHoc) => khoaHoc.id !== selectedKhoaHoc.id)
      );
      setSelectedKhoaHoc(null);
      onClose();
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã đơn vị</th>
            <th>Mã khóa học</th>
            <th>Thông tin khóa học</th>
            <th>Thời gian bắt đầu</th>
            <th>Kích hoạt</th>
            <th>Xem chi tiết/Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((khoaHoc) => (
            <tr key={khoaHoc.id}>
              <td>{khoaHoc.ma_don_vi}</td>
              <td>{khoaHoc.ma_khoa_hoc}</td>
              <td>{khoaHoc.thong_tin_khoa_hoc}</td>
              <td>{formatDate(khoaHoc.thoi_gian_bat_dau)}</td>
              <td>
                <Checkbox
                  colorScheme="red"
                  isChecked={khoaHoc.kich_hoat}
                  style={{ transform: "scale(0.6)" }}
                />
              </td>
              <td>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<Edit className="w-5 h-5 mr-2" />}
                    backgroundColor="rgb(255, 149, 15)"
                    variant="solid"
                    onClick={(e) => onButtonClick(khoaHoc, e)}
                  >
                    Xem chi tiết/Chỉnh sửa
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedKhoaHoc && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Chi tiết khóa học</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedKhoaHoc && (
                <UpdateFormKhoaHoc
                  khoaHoc={selectedKhoaHoc}
                  onSave={setSelectedKhoaHoc}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Xóa khóa học
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

export default KhoaHocTable;
