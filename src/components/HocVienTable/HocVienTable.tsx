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
  FormControl,
  FormLabel,
  Input,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { FormValues, TextInputData } from "@/types/RegisterPage";

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

interface HocVienFormProps {
  hocVien: HocVien;
}

const HocVienForm: React.FC<HocVienFormProps> = ({ hocVien }) => {
  const [formValues, setFormValues] = useState(hocVien);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl mb={4} width="100%">
          <FormLabel>Tên học viên: {formValues.ten_hoc_vien}</FormLabel>
          <Input
            id="ten_hoc_vien"
            name="ten_hoc_vien"
            type="text"
            value={formValues.ten_hoc_vien}
            onChange={handleChange}
            placeholder="Tên học viên"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Mã học viên: {formValues.ma_hoc_vien}</FormLabel>
          <Input
            id="ma_hoc_vien"
            name="ma_hoc_vien"
            type="text"
            value={formValues.ma_hoc_vien}
            onChange={handleChange}
            placeholder="Mã học viên"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Số điện thoại: {formValues.so_dien_thoai}</FormLabel>
          <Input
            id="so_dien_thoai"
            name="so_dien_thoai"
            type="text"
            value={formValues.so_dien_thoai}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Email: {formValues.email}</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>MGV quản lý: {formValues.ma_giao_vien_quan_ly}</FormLabel>
          <Input
            id="ma_giao_vien_quan_ly"
            name="ma_giao_vien_quan_ly"
            type="text"
            value={formValues.ma_giao_vien_quan_ly}
            onChange={handleChange}
            placeholder="MGV quản lý"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Mã trung tâm: {formValues.ma_trung_tam}</FormLabel>
          <Input
            id="ma_trung_tam"
            name="ma_trung_tam"
            type="text"
            value={formValues.ma_trung_tam}
            onChange={handleChange}
            placeholder="Mã trung tâm"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Đã tốt nghiệp</FormLabel>
          <Checkbox
            id="da_tot_nghiep"
            name="da_tot_nghiep"
            isChecked={formValues.da_tot_nghiep}
            onChange={handleChange}
          >
            {formValues.da_tot_nghiep ? "Có" : "Không"}
          </Checkbox>
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Kích hoạt</FormLabel>
          <Checkbox
            id="kich_hoat"
            name="kich_hoat"
            isChecked={formValues.kich_hoat}
            onChange={handleChange}
          >
            {formValues.kich_hoat ? "Có" : "Không"}
          </Checkbox>
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>
      </Grid>
    </Box>
  );
};

export default HocVienTable;
