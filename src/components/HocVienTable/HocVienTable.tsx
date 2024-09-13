import React, { useState } from "react";
import styles from "./HocVienTable.module.css";
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
import { useFormikContext } from "formik";
import { FormValues, TextInputData } from "@/types/RegisterPage";
import HocVienForm from "../UpdateFormHocVien/UpdateFormHocVien";

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

interface HocVienTableProps {
  data: HocVien[];
}

const HocVienTable: React.FC<HocVienTableProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHocVien, setSelectedHocVien] = useState<HocVien | null>(null);

  const handlehocVienClick = (hocVien: HocVien) => {
    console.log("Giáo viên clicked:", hocVien.ten_hoc_vien);
    alert(`Giáo viên clicked: ${hocVien.ten_hoc_vien}`);
  };

  const onButtonClick = (hocVien: HocVien, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedHocVien(hocVien);
    onOpen();
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên học viên</th>
            <th>Mã học viên</th>
            <th>Số điện thoại</th>
            <th>Email học viên</th>
            <th>MGV quản lý</th>
            <th>Kích hoạt</th>
            <th>Xem chi tiết/Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((hocVien) => (
            <tr key={hocVien.id}>
              <td>{hocVien.ten_hoc_vien}</td>
              <td>{hocVien.ma_hoc_vien}</td>
              <td>{hocVien.so_dien_thoai}</td>
              <td>{hocVien.email}</td>
              <td>{hocVien.ma_giao_vien_quan_ly}</td>
              <td>
                <Checkbox
                  colorScheme="red"
                  defaultChecked
                  style={{ transform: "scale(0.6)" }}
                />
              </td>
              <td>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<Edit className="w-5 h-5 mr-2" />}
                    backgroundColor="rgb(255, 149, 15)"
                    variant="solid"
                    onClick={(e) => onButtonClick(hocVien, e)}
                  >
                    Xem chi tiết/Chỉnh sửa
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedHocVien && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Chi tiết học viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HocVienForm hocVien={selectedHocVien} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default HocVienTable;
