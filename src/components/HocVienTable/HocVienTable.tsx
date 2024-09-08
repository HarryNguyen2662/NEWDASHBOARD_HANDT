import React from "react";
import styles from "./HocVienTable.module.css";
import { Edit } from "lucide-react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";

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

const hocVienTable: React.FC<HocVienTableProps> = ({ data }) => {
  const handlehocVienClick = (hocVien: HocVien) => {
    console.log("Giáo viên clicked:", hocVien.ten_hoc_vien);
    alert(`Giáo viên clicked: ${hocVien.ten_hoc_vien}`);
  };

  const onButtonClick = (hocVien: HocVien, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Button clicked for:", hocVien.ten_hoc_vien);
    alert(`Button clicked for: ${hocVien.ten_hoc_vien}`);
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
    </div>
  );
};

export default hocVienTable;
