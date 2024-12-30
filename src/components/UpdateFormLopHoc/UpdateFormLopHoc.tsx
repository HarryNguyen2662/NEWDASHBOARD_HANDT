import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Box,
  Grid,
} from "@chakra-ui/react";

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

interface LopHocFormProps {
  lopHoc: LopHoc;
  onSave: (lopHoc: LopHoc) => void;
}

const UpdateFormLopHoc: React.FC<LopHocFormProps> = ({ lopHoc, onSave }) => {
  const [formValues, setFormValues] = useState(lopHoc);

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
          <FormLabel>Mã đơn vị: {formValues.ma_don_vi}</FormLabel>
          <Input
            id="ma_don_vi"
            name="ma_don_vi"
            type="text"
            value={formValues.ma_don_vi}
            onChange={handleChange}
            placeholder="Mã đơn vị"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Mã khóa học: {formValues.ma_khoa_hoc}</FormLabel>
          <Input
            id="ma_khoa_hoc"
            name="ma_khoa_hoc"
            type="text"
            value={formValues.ma_khoa_hoc}
            onChange={handleChange}
            placeholder="Mã khóa học"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>Mã lớp học: {formValues.ma_lop_hoc}</FormLabel>
          <Input
            id="ma_lop_hoc"
            name="ma_lop_hoc"
            type="text"
            value={formValues.ma_lop_hoc}
            onChange={handleChange}
            placeholder="Mã lớp học"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>
            Thông tin lớp học: {formValues.thong_tin_lop_hoc}
          </FormLabel>
          <Input
            id="thong_tin_lop_hoc"
            name="thong_tin_lop_hoc"
            type="text"
            value={formValues.thong_tin_lop_hoc}
            onChange={handleChange}
            placeholder="Thông tin lớp học"
          />
        </FormControl>
        <FormControl mb={4} width="100%">
          <FormLabel>
            Thời gian bắt đầu: {formValues.thoi_gian_bat_dau}
          </FormLabel>
          <Input
            id="thoi_gian_bat_dau"
            name="thoi_gian_bat_dau"
            type="datetime-local"
            value={formValues.thoi_gian_bat_dau}
            onChange={handleChange}
            placeholder="Thời gian bắt đầu"
          />
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
      </Grid>
    </Box>
  );
};

export default UpdateFormLopHoc;