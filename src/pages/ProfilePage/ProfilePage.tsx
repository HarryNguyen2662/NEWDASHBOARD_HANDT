import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  VStack,
  Spinner,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, EditIcon } from "lucide-react";
import { TrungTamAPI } from "../../lib/API/API";
import { globalStore } from "../../globalsvar";

interface TrungTamData {
  dia_chi: string;
  email: string;
  ghi_chu: string;
  id: string;
  ma_don_vi: string;
  ngay_cap_nhat: string;
  ngay_cong_tac: string;
  ngay_tao: string;
  so_dien_thoai: string;
  ten_trung_tam: string;
  website: string;
}

const fieldLabels: { [key in keyof TrungTamData]: string } = {
  dia_chi: "Address",
  email: "Email",
  ghi_chu: "Note",
  id: "ID",
  ma_don_vi: "Center Code",
  ngay_cap_nhat: "Update Date",
  ngay_cong_tac: "Work Date",
  ngay_tao: "Creation Date",
  so_dien_thoai: "Phone Number",
  ten_trung_tam: "Center Name",
  website: "Website",
};

const ProfilePage = () => {
  const [trungtamData, setTrungTamData] = useState<TrungTamData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<TrungTamData | null>(null);
  const toast = useToast();

  useEffect(() => {
    const email = localStorage.getItem("Main_Email");
    if (email) {
      TrungTamAPI.getTrungTamByEmail(email).then((res) => {
        const data = res[0];
        localStorage.setItem("Main_Id", data.id);
        globalStore.set<string>("Main_Id", data.id);
        setTrungTamData(data);
        setEditedData(data);
      });
    }
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setTrungTamData(editedData);
    setIsEditing(false);
    console.log(editedData);
    /*await TrungTamAPI.updateTrungTam(
      localStorage.getItem("Main_Id") || "",
      editedData
    );*/
    const updateBody = {
      madonvi: editedData?.ma_don_vi,
      tentrungtam: editedData?.ten_trung_tam,
      diachi: editedData?.dia_chi,
      sodienthoai: editedData?.so_dien_thoai,
      email: editedData?.email,
      urlwebsite: editedData?.website,
      ngaycongtac: editedData?.ngay_cong_tac,
      ghichu: editedData?.ghi_chu,
    };

    TrungTamAPI.updateTrungTam(
      localStorage.getItem("Main_Id") || "",
      updateBody
    ).then((res) => {
      console.log(res);
    });
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!trungtamData) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6} maxWidth="800px" margin="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={handleBackClick}
          variant="ghost"
        >
          Back
        </Button>
        {!isEditing && (
          <Button leftIcon={<EditIcon />} onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Flex>

      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Center Profile
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="30%">Field</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(trungtamData).map(([key, value]) => (
              <Tr key={key}>
                <Td fontWeight="bold">
                  {fieldLabels[key as keyof TrungTamData]}
                </Td>
                <Td>
                  {isEditing ? (
                    <Input
                      name={key}
                      value={
                        editedData ? editedData[key as keyof TrungTamData] : ""
                      }
                      onChange={handleInputChange}
                    />
                  ) : key === "website" ? (
                    <Link href={value} isExternal color="blue.500">
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {isEditing && (
          <Flex justifyContent="flex-end" mt={4}>
            <Button onClick={() => setIsEditing(false)} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveClick}>
              Save Changes
            </Button>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePage;
