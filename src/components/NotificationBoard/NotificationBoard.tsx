import React from "react";
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

export interface NotificationProps {
  id: number;
  message: string;
  time: string;
}

const notifications = [
  { id: 1, message: "You have a new message", time: "2 mins ago" },
  { id: 2, message: "Your order has been shipped", time: "1 hour ago" },
  { id: 3, message: "New comment on your post", time: "3 hours ago" },
];

const NotificationBoard: React.FC = () => {
  return (
    <Box p={4} bg="gray.800" borderRadius="md" color="white" mx={8} mt={6}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Trung tâm thông báo
      </Text>
      <VStack spacing={4} align="stretch">
        {notifications.map((notification: NotificationProps) => (
          <HStack
            key={notification.id}
            p={3}
            bg="gray.700"
            borderRadius="md"
            alignItems="center"
          >
            <Icon as={FaBell} w={6} h={6} color="yellow.400" />
            <Box>
              <Text fontSize="md">{notification.message}</Text>
              <Text fontSize="sm" color="gray.400">
                {notification.time}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default NotificationBoard;
