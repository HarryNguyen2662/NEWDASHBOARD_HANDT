import React, { useState } from "react";
import styles from "./GiaoVienTable.module.css";
import { Edit } from "lucide-react";
import { FormControl, FormLabel, Input, Box, Grid } from "@chakra-ui/react";
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
interface GiaoVienFormProps {
  giaoVien: GiaoVien;
}

const GiaoVienForm: React.FC<GiaoVienFormProps> = ({ giaoVien }) => {
  const [formValues, setFormValues] = useState(giaoVien);

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
          <FormLabel>Tên giáo viên: {formValues.ten_giao_vien}</FormLabel>
          <Input
            id="ten_giao_vien"
            name="ten_giao_vien"
            type="text"
            value={formValues.ten_giao_vien}
            onChange={handleChange}
            placeholder="Tên giáo viên"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Mã giáo viên: {formValues.ma_giao_vien}</FormLabel>
          <Input
            id="ma_giao_vien"
            name="ma_giao_vien"
            type="text"
            value={formValues.ma_giao_vien}
            onChange={handleChange}
            placeholder="Mã giáo viên"
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

export default GiaoVienForm;
