'use client';

import { Box, Flex, IconButton, Spinner } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { useGetProgramById } from '@/hooks/useGetProgramById';
import { ModuleCard } from '@/shared/chakra/components';
import { ProgramModulesDetails } from '@/types';
import { ALL_MODULES, renameKey } from '@/utils';

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { folderID, programID } = useParams();

  const { response, isLoading } = useGetProgramById(programID?.toString());

  const modules = reorderDescending(response?.body.programModules) ?? [];

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
          {modules.map((item) => {
            const newItem = renameKey(item, 'moduleGuidelines', 'moduleGuidelines');
            return (
              <ModuleCard
                key={item.id}
                module={newItem}
                status={item.isCompleted ? 'Completed' : item.isActive && !item.isCompleted ? 'In progress' : 'Pending'}
                maxW="242px"
                flexShrink={0}
                number={item.order}
                route={`/super-admin/programs/${folderID}/${programID}/${item.module.toLowerCase()}`}
                isActive={pathname.endsWith(item.module.toLowerCase())}
                scroll
                scrollSnapAlign="start"
              />
            );
          })}
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

function reorderDescending(items?: ProgramModulesDetails[]) {
  if (!items) return;
  return items.sort((a, b) => a.order - b.order);
}
