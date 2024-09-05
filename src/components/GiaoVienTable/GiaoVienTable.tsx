import React from "react";
import styles from "./GiaoVienTable.module.css";
import {
  completedIcon,
  inProgressIcon,
  inReviewIcon,
} from "../../assets/navbar";

interface GiaoVien {
  id: string;
  maGiaoVien: string;
  maTrungTam: string;
  tenGiaoVien: string;
  soDienThoai: string;
  ghiChu?: string;
  ngayTao?: string;
  ngayCapNhat?: string;
  password?: string;
}

interface GiaoVienTableProps {
  data: GiaoVien[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return (
        <img
          src={completedIcon}
          alt="Completed"
          className={styles.statusIcon}
        />
      );
    case "In Progress":
      return (
        <img
          src={inProgressIcon}
          alt="In Progress"
          className={styles.statusIcon}
        />
      );
    case "In Review":
      return (
        <img src={inReviewIcon} alt="In Review" className={styles.statusIcon} />
      );
    default:
      return (
        <img
          src={completedIcon}
          alt="Completed"
          className={styles.statusIcon}
        />
      );
  }
};

const GiaoVienTable: React.FC<GiaoVienTableProps> = ({ data }) => {
  const handleGiaoViensClick = (GiaoVien: GiaoVien) => {
    console.log("GiaoVien clicked:", GiaoVien.tenGiaoVien);
    alert(`GiaoVien clicked: ${GiaoVien.tenGiaoVien}`);
  };

  const onButtonClick = (GiaoVien: GiaoVien) => {
    console.log("Button clicked for:", GiaoVien.tenGiaoVien);
    alert(`Button clicked for: ${GiaoVien.tenGiaoVien}`);
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
            <th>Xem chi tiết/Chinh sửa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((GiaoVien, index) => (
            <tr
              key={GiaoVien.tenGiaoVien + index}
              onClick={() => handleGiaoViensClick(GiaoVien)}
              onKeyUp={() => {}}
              onKeyDown={() => {}}
              onKeyPress={() => {}}
            >
              <td>{GiaoVien.tenGiaoVien}</td>
              <td>{GiaoVien.maGiaoVien}</td>
              <td>{GiaoVien.soDienThoai}</td>
              <td>{GiaoVien.ghiChu}</td>
              <td>
                <button onClick={() => onButtonClick(GiaoVien)}>
                  "Xem chi tiết/Chinh sửa"
                </button>
              </td>
              {/* New button */}
              {/*
              <td>{GiaoVien.serviceArea}</td>
              <td>{getStatusIcon(GiaoVien.status)}</td>
              */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiaoVienTable;
