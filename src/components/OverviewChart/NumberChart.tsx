import * as React from "react";
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Heading,
  Card,
  CardBody,
} from "@chakra-ui/react";

export interface NumberChartProps {
  title: string;
  value: string;
}

export function NumberChart({
  title,
  value,
}: NumberChartProps): React.JSX.Element {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg="gray.800"
      borderRadius="lg"
      color="white"
    >
      <Stack>
        <CardBody>
          <Heading fontSize="2xl" color="white" mx={8} mt={6}>
            {title}
          </Heading>

          <Text fontSize="2xl" color="white" mx={8} mt={6}>
            {value}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
}

/*      
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

*/
