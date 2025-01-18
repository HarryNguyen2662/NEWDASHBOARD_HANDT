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
        console.log(datatrungtam);
        setTenTrungTam(datatrungtam[0].ten_don_vi);
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
          const khoaHocList = await TrungTamAPI.getTrungTamLISTKH(
            datatrungtam[0].id,
            1,
            10
          );
          const lopHocList = await TrungTamAPI.getTrungTamLISTLH(
            datatrungtam[0].id,
            1,
            10
          );

          setSoLuongGiaoVien(giaoVienList.totalitems);
          setSoLuongHocVien(hocVienList.totalitems);
          setSoLuongKhoaHoc(khoaHocList.totalitems);
          setSoLuongLopHoc(lopHocList.totalitems);
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
    <Box
      display="flex"
      flexDirection="row"
      padding="4"
      margin="0 auto"
      textAlign="left"
      height="102vh"
      background="linear-gradient(135deg, #2D99AE, #0C5776)"
      color="#0C5776" /* Rich teal blue text */
    >
      <Flex direction="column" p={5}>
        <Heading fontSize="3xl" color="#000000" mx={8} mt={6}>
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
    </Box>
  );
};

export default Dashboard;
