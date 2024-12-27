import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Box,
  Grid,
} from "@chakra-ui/react";

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
  ma_don_vi: string;
  ngay_gio_cap_nhat: string;
  ngay_tao: string;
  password: string;
  so_dien_thoai: string;
  ten_hoc_vien: string;
}

interface HocVienFormProps {
  hocVien: HocVien;
  onSave: (hocvien: HocVien) => void;
}

const HocVienForm: React.FC<HocVienFormProps> = ({ hocVien, onSave }) => {
  const [formValues, setFormValues] = useState(hocVien);

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
          <FormLabel>Mã trung tâm: {formValues.ma_don_vi}</FormLabel>
          <Input
            id="ma_trung_tam"
            name="ma_trung_tam"
            type="text"
            value={formValues.ma_don_vi}
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

export default HocVienForm;
