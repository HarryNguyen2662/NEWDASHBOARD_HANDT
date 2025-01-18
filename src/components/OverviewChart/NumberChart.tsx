import * as React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
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
      direction="column"
      overflow="hidden"
      variant="outline"
      bg="#0C5776" /* Rich teal blue background */
      borderRadius="lg"
      borderColor="#2D99AE" /* Medium aqua blue border */
      color="#BCFEFE" /* Pale cyan text */
      p={4}
      boxShadow="lg"
    >
      <CardBody>
        <Heading fontSize="xl" color="#F8DAD0" mb={2}>
          {title}
        </Heading>
        <Text fontSize="3xl" fontWeight="bold">
          {value}
        </Text>
      </CardBody>
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
