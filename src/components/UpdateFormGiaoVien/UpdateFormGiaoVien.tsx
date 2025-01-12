import React, { useState, useEffect } from "react";
import styles from "./GiaoVienTable.module.css";
import { Edit } from "lucide-react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Grid,
  Button,
} from "@chakra-ui/react";

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

interface GiaoVienFormProps {
  giaoVien: GiaoVien;
  onSave: (giaoVien: GiaoVien) => void;
}

const GiaoVienForm: React.FC<GiaoVienFormProps> = ({ giaoVien, onSave }) => {
  const [formValues, setFormValues] = useState(giaoVien);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    onSave(formValues);
  }, [formValues, onSave]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      backgroundColor="#FAE0C7"
      p={4}
      borderRadius="md"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl mb={4} width="100%">
          <FormLabel color="#0C5776">
            Tên giáo viên: {formValues.ten_giao_vien}
          </FormLabel>
          <Input
            id="ten_giao_vien"
            name="ten_giao_vien"
            type="text"
            value={formValues.ten_giao_vien}
            onChange={handleChange}
            placeholder="Tên giáo viên"
            backgroundColor="white"
            color="#0C5776"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel color="#0C5776">
            Mã giáo viên: {formValues.ma_giao_vien}
          </FormLabel>
          <Input
            id="ma_giao_vien"
            name="ma_giao_vien"
            type="text"
            value={formValues.ma_giao_vien}
            onChange={handleChange}
            placeholder="Mã giáo viên"
            backgroundColor="white"
            color="#0C5776"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel color="#0C5776">
            Số điện thoại: {formValues.so_dien_thoai}
          </FormLabel>
          <Input
            id="so_dien_thoai"
            name="so_dien_thoai"
            type="text"
            value={formValues.so_dien_thoai}
            onChange={handleChange}
            placeholder="Số điện thoại"
            backgroundColor="white"
            color="#0C5776"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel color="#0C5776">
            Mã trung tâm: {formValues.ma_don_vi}
          </FormLabel>
          <Input
            id="ma_trung_tam"
            name="ma_trung_tam"
            type="text"
            value={formValues.ma_don_vi}
            onChange={handleChange}
            placeholder="Mã trung tâm"
            backgroundColor="white"
            color="#0C5776"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel color="#0C5776">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            backgroundColor="white"
            color="#0C5776"
          />
        </FormControl>
      </Grid>
    </Box>
  );
};

export default GiaoVienForm;
