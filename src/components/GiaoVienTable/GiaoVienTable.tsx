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

interface GiaoVien {
  ghi_chu: string;
  id: string;
  ma_giao_vien: string;
  ma_trung_tam: string;
  ngay_cap_nhat: string;
  ngay_tao: string;
  password: string;
  so_dien_thoai: string;
  ten_giao_vien: string;
}

interface GiaoVienTableProps {
  data: GiaoVien[];
}

const GiaoVienTable: React.FC<GiaoVienTableProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiaoVien, setSelectedGiaoVien] = useState<GiaoVien | null>(
    null
  );

  const onButtonClick = (giaoVien: GiaoVien, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGiaoVien(giaoVien);
    onOpen();
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
                  {/*
													<button onClick={(e) => onButtonClick(giaoVien, e)}>
														<Edit className="w-5 h-5 mr-2" />
														<span>Xem chi tiết/Chỉnh sửa</span>
													</button>
												*/}
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
          <ModalContent bg="black" color="white" maxWidth="50%" width="50%">
            <ModalHeader>Chi tiết giáo viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GiaoVienForm giaoVien={selectedGiaoVien} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button colorScheme="orange" mr={3}>
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
