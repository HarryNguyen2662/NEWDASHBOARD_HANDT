import React, { useState } from "react";
import styles from "./LopHocTable.module.css";
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
import UpdateFormLopHoc from "../UpdateFormLopHoc/UpdateFormLopHoc";
import { LopHocAPI } from "../../lib/API/API";

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

interface LopHocTableProps {
  data: LopHoc[];
  setData: React.Dispatch<React.SetStateAction<LopHoc[]>>;
}

const LopHocTable: React.FC<LopHocTableProps> = ({ data, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLopHoc, setSelectedLopHoc] = useState<LopHoc | null>(null);

  const onButtonClick = (lopHoc: LopHoc, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLopHoc(lopHoc);
    onOpen();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateLopHoc = (updatedLopHoc: LopHoc) => {
    const updateBody = {
      madonvi: updatedLopHoc.ma_don_vi,
      makhoahoc: updatedLopHoc.ma_khoa_hoc,
      malophoc: updatedLopHoc.ma_lop_hoc,
      thongtinlophoc: updatedLopHoc.thong_tin_lop_hoc,
      thoigianbatdau: updatedLopHoc.thoi_gian_bat_dau,
      kichhoat: updatedLopHoc.kich_hoat,
    };

    setData((prevData) =>
      prevData.map((lopHoc) =>
        lopHoc.id === updatedLopHoc.id ? updatedLopHoc : lopHoc
      )
    );

    LopHocAPI.updateLopHoc(updatedLopHoc.id, updateBody);
    console.log("Updated lop hoc:", updateBody);
  };

  const handleSaveClick = () => {
    if (selectedLopHoc) {
      updateLopHoc(selectedLopHoc);
      onClose();
    }
  };

  const handleDeleteClick = async () => {
    if (selectedLopHoc) {
      await LopHocAPI.deleteLopHoc(selectedLopHoc.id);
      setData((prevData) =>
        prevData.filter((lopHoc) => lopHoc.id !== selectedLopHoc.id)
      );
      setSelectedLopHoc(null);
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
            <th>Mã lớp học</th>
            <th>Thông tin lớp học</th>
            <th>Thời gian bắt đầu</th>
            <th>Kích hoạt</th>
            <th>Xem chi tiết/Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lopHoc) => (
            <tr key={lopHoc.id}>
              <td>{lopHoc.ma_don_vi}</td>
              <td>{lopHoc.ma_khoa_hoc}</td>
              <td>{lopHoc.ma_lop_hoc}</td>
              <td>{lopHoc.thong_tin_lop_hoc}</td>
              <td>{formatDate(lopHoc.thoi_gian_bat_dau)}</td>
              <td>
                <Checkbox
                  colorScheme="red"
                  isChecked={lopHoc.kich_hoat}
                  style={{ transform: "scale(0.6)" }}
                />
              </td>
              <td>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<Edit className="w-5 h-5 mr-2" />}
                    backgroundColor="rgb(255, 149, 15)"
                    variant="solid"
                    onClick={(e) => onButtonClick(lopHoc, e)}
                  >
                    Xem chi tiết/Chỉnh sửa
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLopHoc && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Chi tiết lớp học</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedLopHoc && (
                <UpdateFormLopHoc
                  lopHoc={selectedLopHoc}
                  onSave={setSelectedLopHoc}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Xóa lớp học
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

export default LopHocTable;
