'use client';

import { Box, Flex, IconButton, Spinner } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { ModuleCard } from '@/shared/chakra/components';
import { ALL_MODULES } from '@/utils';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { ProgramDetails } from '@/types';

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { programID } = useParams();

  const { response, isLoading } = useGetProgramById(programID?.toString());

  const modules = reorderDescending(response?.body) ?? [];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth / ALL_MODULES.length;
      const newScrollPosition = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollEvent);
      handleScrollEvent(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollEvent);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <Flex w="full" flexDir="column" gap="20px" pt="20px" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex w="full" flexDir="column" gap="20px" pt="20px">
      <Box pos="relative">
        <Flex
          gap="12px"
          overflowX="auto"
          scrollSnapType="x mandatory"
          ref={scrollContainerRef}
          sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
        >
          <IconButton
            aria-label="Scroll left"
            icon={<MdArrowBackIosNew size="1.25rem" />}
            variant="ghost"
            bgColor="white"
            color="primary.500"
            boxSize="2rem"
            minW="unset"
            rounded="full"
            pos="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
            _disabled={{ opacity: '0.6', cursor: 'not-allowed', _hover: { bgColor: 'white' } }}
            onClick={() => handleScroll('left')}
            isDisabled={isAtStart}
          />
          {modules.map((item, index) => (
            <ModuleCard
              key={item.id + index}
              module={item}
              status={item.isCompleted ? 'Completed' : item.isActive && !item.isCompleted ? 'In progress' : 'Pending'}
              maxW="242px"
              flexShrink={0}
              number={item.order}
              route={`/super-admin/programs/${programID}/${item.module.toLowerCase()}`}
              isActive={pathname.endsWith(item.module.toLowerCase())}
              scroll
              scrollSnapAlign="start"
            />
          ))}
          <IconButton
            aria-label="Scroll right"
            icon={<MdArrowForwardIos size="1.25rem" />}
            variant="ghost"
            bgColor="white"
            color="primary.500"
            boxSize="2rem"
            minW="unset"
            rounded="full"
            pos="absolute"
            right="6"
            top="50%"
            transform="translateY(-50%)"
            _disabled={{ opacity: '0.6', cursor: 'not-allowed', _hover: { bgColor: 'white' } }}
            onClick={() => handleScroll('right')}
            isDisabled={isAtEnd}
          />
        </Flex>
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default ProgramIDLayout;

function reorderDescending(items?: ProgramDetails[]) {
  if (!items) return;
  return items.sort((a, b) => a.order - b.order);
}
