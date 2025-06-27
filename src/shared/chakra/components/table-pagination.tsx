import { Button, Flex, type FlexProps, IconButton, Input, Skeleton, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';

type TablePaginationProps = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange?: (size: number) => void;
  currentPage: number;
  totalPages: number;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  isDisabled?: boolean;
  pageSize?: number;
  totalCount?: number;
} & FlexProps;

const getPaginationRange = (current: number, total: number) => {
  const range: (number | string)[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const showLeftDots = current > 3;
  const showRightDots = current < total - 2;

  if (!showLeftDots && showRightDots) {
    range.push(...[1, 2, 3, 4, '...', total]);
  } else if (showLeftDots && !showRightDots) {
    range.push(...[1, '...', total - 3, total - 2, total - 1, total]);
  } else if (showLeftDots && showRightDots) {
    range.push(...[1, '...', current - 1, current, current + 1, '...', total]);
  }

  return range;
};

export function TablePagination({
  handleNextPage,
  handlePrevPage,
  handlePageChange,
  handlePageSizeChange,
  currentPage,
  totalPages,
  isNextDisabled,
  isPrevDisabled,
  isDisabled,
  pageSize,
  totalCount,
  ...props
}: TablePaginationProps) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const [inputPage, setInputPage] = useState<string>(currentPage.toString());
  const [inputPageSize, setInputPageSize] = useState<string>(pageSize?.toString() || '10');

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    setInputPageSize(pageSize?.toString() || '10');
  }, [pageSize]);

  const parsedPage = Number(inputPage);
  const isInputInvalid = isNaN(parsedPage) || parsedPage < 1 || parsedPage > totalPages;

  const parsedPageSize = Number(inputPageSize);
  const isPageSizeInvalid = isNaN(parsedPageSize) || parsedPageSize < 1 || parsedPageSize > 500;

  const handleGo = () => {
    if (isInputInvalid) return;
    handlePageChange(parsedPage);
  };

  const handleSetPageSize = () => {
    if (isPageSizeInvalid || !handlePageSizeChange) return;
    handlePageSizeChange(parsedPageSize);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  const onPageSizeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSetPageSize();
    }
  };

  return (
    <Flex align="center" justify="center" gap="2" mt="6" {...props} pos="relative">
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
        {/* {Array.from({ length: totalPages }, (_, index) => (
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
        ))} */}
        {paginationRange.map((item, index) =>
          typeof item === 'number' ? (
            <Button
              key={index}
              variant={item === currentPage ? 'primary' : 'ghost'}
              p={0}
              minW="1.8125rem"
              h="1.75rem"
              rounded="0.25rem"
              outline={item !== currentPage ? '1px solid' : 'none'}
              outlineColor={item !== currentPage ? 'grey.100' : 'none'}
              onClick={() => handlePageChange(item)}
              isDisabled={isDisabled}
            >
              <Text
                as="span"
                variant={item === currentPage ? 'Body2Bold' : 'Body2Semibold'}
                color={item !== currentPage ? 'grey.500' : 'inherit'}
              >
                {item}
              </Text>
            </Button>
          ) : (
            <Text key={index} px="1" color="grey.500">
              ...
            </Text>
          )
        )}
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

      <Flex align="center" gap="2" pos="absolute" left={0}>
        <Skeleton isLoaded={!isDisabled} minW="8rem">
          <Text color="grey.500" fontSize="sm">
            {/* Showing {currentCount} of {totalCount} Beneficiaries */}
            Showing {Math.min(currentPage * (pageSize ?? 10), totalCount ?? 0)} of {totalCount ?? 0} Beneficiaries
          </Text>
        </Skeleton>
      </Flex>

      {/* Direct page input and Go button */}
      <Flex align="center" gap="2" pos="absolute" right={0}>
        <Flex gap="2">
          <Input
            type="number"
            value={inputPageSize}
            onChange={(e) => setInputPageSize(e.target.value)}
            onKeyDown={onPageSizeKeyDown}
            min={1}
            max={500}
            h="32px"
            w="3rem"
            fontSize="sm"
            p="8px"
            placeholder="Rows"
            isDisabled={isDisabled}
            outline="0px"
            _focusVisible={{
              outline: 'none',
            }}
          />
          <Button
            fontSize="sm"
            h="32px"
            p="8px"
            onClick={handleSetPageSize}
            isDisabled={isDisabled || isPageSizeInvalid}
            variant="primary"
          >
            Set page size
          </Button>
        </Flex>
        <Flex gap="2">
          <Input
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={onKeyDown}
            min={1}
            max={totalPages}
            h="32px"
            w="3rem"
            fontSize="sm"
            p="8px"
            placeholder="Page"
            isDisabled={isDisabled}
            outline="0px"
            _focusVisible={{
              outline: 'none',
            }}
          />
          <Button
            fontSize="sm"
            h="32px"
            p="8px"
            onClick={handleGo}
            isDisabled={isDisabled || isInputInvalid}
            variant="primary"
          >
            Go to page
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
