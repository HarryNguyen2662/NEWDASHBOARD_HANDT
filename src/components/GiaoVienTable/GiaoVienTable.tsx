import React from "react";
import styles from "./GiaoVienTable.module.css";
import { Edit } from "lucide-react";

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
  const handleGiaoVienClick = (giaoVien: GiaoVien) => {
    console.log("Giáo viên clicked:", giaoVien.ten_giao_vien);
    alert(`Giáo viên clicked: ${giaoVien.ten_giao_vien}`);
  };

  const onButtonClick = (giaoVien: GiaoVien, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Button clicked for:", giaoVien.ten_giao_vien);
    alert(`Button clicked for: ${giaoVien.ten_giao_vien}`);
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
            <tr key={giaoVien.id} onClick={() => handleGiaoVienClick(giaoVien)}>
              <td>{giaoVien.ten_giao_vien}</td>
              <td>{giaoVien.ma_giao_vien}</td>
              <td>{giaoVien.so_dien_thoai}</td>
              <td>{giaoVien.ghi_chu}</td>
              <td>
                <button
                  onClick={(e) => onButtonClick(giaoVien, e)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  <span>Xem chi tiết/Chỉnh sửa</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiaoVienTable;
