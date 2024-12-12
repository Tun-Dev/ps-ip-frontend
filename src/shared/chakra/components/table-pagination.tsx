import { Button, Flex, type FlexProps, IconButton, Text } from '@chakra-ui/react';
import { MdArrowDropDownCircle } from 'react-icons/md';

type TablePaginationProps = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  isDisabled?: boolean;
} & FlexProps;

export function TablePagination({
  handleNextPage,
  handlePrevPage,
  handlePageChange,
  currentPage,
  totalPages,
  isNextDisabled,
  isPrevDisabled,
  isDisabled,
  ...props
}: TablePaginationProps) {
  return (
    <Flex align="center" justify="center" gap="2" mt="6" {...props}>
      <IconButton
        aria-label="Previous page"
        icon={<MdArrowDropDownCircle size="1rem" />}
        variant="unstyled"
        p={0}
        minW={0}
        h="auto"
        color="secondary.600"
        transform="auto"
        rotate="90deg"
        _hover={{ color: 'secondary.500' }}
        _disabled={{ color: 'grey.300', cursor: 'not-allowed' }}
        isDisabled={isPrevDisabled || isDisabled}
        onClick={handlePrevPage}
      />
      <Flex align="center" gap="1">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? 'primary' : 'ghost'}
            p={0}
            minW="1.8125rem"
            h="1.75rem"
            rounded="0.25rem"
            outline={index + 1 !== currentPage ? '1px solid' : 'none'}
            outlineColor={index + 1 !== currentPage ? 'grey.100' : 'none'}
            onClick={() => handlePageChange(index + 1)}
            isDisabled={isDisabled}
          >
            <Text
              as="span"
              variant={index + 1 === currentPage ? 'Body2Bold' : 'Body2Semibold'}
              color={index + 1 !== currentPage ? 'grey.500' : 'inherit'}
            >
              {index + 1}
            </Text>
          </Button>
        ))}
      </Flex>
      <IconButton
        aria-label="Next page"
        icon={<MdArrowDropDownCircle size="1rem" />}
        variant="unstyled"
        p={0}
        minW={0}
        h="auto"
        color="secondary.600"
        transform="auto"
        rotate="-90deg"
        _hover={{ color: 'secondary.500' }}
        _disabled={{ color: 'grey.300', cursor: 'not-allowed' }}
        isDisabled={isNextDisabled || isDisabled}
        onClick={handleNextPage}
      />
    </Flex>
  );
}
