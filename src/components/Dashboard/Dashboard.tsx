import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { NumberChart } from "../OverviewChart/NumberChart";
import { TrungTamAPI, GiaoVienAPI, HocVienAPI } from "../../lib/API/API";

const Dashboard: React.FC = () => {
  const [dulieutrungtam, setDulieuTrungTam] = useState<any>(null);
  const [tentrungtam, setTenTrungTam] = useState("");
  const [soLuongGiaoVien, setSoLuongGiaoVien] = useState(0);
  const [soLuongHocVien, setSoLuongHocVien] = useState(0);
  const [soLuongKhoaHoc, setSoLuongKhoaHoc] = useState(0);
  const [soLuongLopHoc, setSoLuongLopHoc] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const email = localStorage.getItem("Main_Email");
      if (email) {
        const datatrungtam = await TrungTamAPI.getTrungTamByEmail(email);
        setTenTrungTam(datatrungtam[0].ten_trung_tam);
        try {
          const giaoVienList = await TrungTamAPI.getTrungTamLISTGV(
            datatrungtam[0].id,
            1,
            10
          );
          const hocVienList = await TrungTamAPI.getTrungTamLISTHS(
            datatrungtam[0].id,
            1,
            10
          );
          //const khoaHocList = await TrungTamAPI.getKhoaHocList();
          //const lopHocList = await TrungTamAPI.getLopHocList();

          setSoLuongGiaoVien(giaoVienList.length);
          setSoLuongHocVien(hocVienList.length);
          //setSoLuongKhoaHoc(khoaHocList.length);
          //setSoLuongLopHoc(lopHocList.length);
        } catch (error) {
          console.error("Failed to fetch counts:", error);
        }
      } else {
        console.error("Email is null");
      }
    };

    fetchCounts();
  }, []);

  return (
    <Flex direction="column" p={5} bg="black">
      <Heading fontSize="3xl" color="white" mx={8} mt={6}>
        Chào mừng đến với {tentrungtam}
      </Heading>
      <HStack direction="row" spacing={6} mx={8} mt={6}>
        <NumberChart
          title="số lượng giáo viên"
          value={soLuongGiaoVien.toString()}
        />
        <NumberChart
          title="số lượng học viên"
          value={soLuongHocVien.toString()}
        />
        <NumberChart
          title="số lượng khoá học"
          value={soLuongKhoaHoc.toString()}
        />
        <NumberChart
          title="số lượng lớp học"
          value={soLuongLopHoc.toString()}
        />
      </HStack>
    </Flex>
  );
};

export default Dashboard;
