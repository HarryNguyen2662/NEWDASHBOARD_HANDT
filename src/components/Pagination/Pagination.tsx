import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Button,
  HStack,
  Select,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <Box mt={4}>
      <HStack spacing={4} justify="space-between" align="center">
        <HStack spacing={2}>
          <Text>Rows per page:</Text>
          <Select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1); // Reset to first page when changing items per page
            }}
            width="auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
          <Text>
            {totalItems === 0
              ? "No items"
              : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                  currentPage * itemsPerPage,
                  totalItems
                )} of ${totalItems}`}
          </Text>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            size="sm"
          />

          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              variant={currentPage === pageNum ? "solid" : "outline"}
              colorScheme={currentPage === pageNum ? "orange" : "gray"}
              size="sm"
            >
              {pageNum}
            </Button>
          ))}

          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            size="sm"
          />
        </HStack>
      </HStack>
    </Box>
  );
};
