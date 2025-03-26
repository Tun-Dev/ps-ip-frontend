'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';

import { useGetGroupById } from '@/hooks/useGetGroupById';
import { useGetProgramById } from '@/hooks/useGetProgramById';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const { programID, folderID } = useParams();
  const segments = pathname.split('/');
  const currentModule = segments[segments.length - 1];

  const { response: group } = useGetGroupById(folderID?.toString());

  const folderName = group?.body.name ?? '...';

  const { response } = useGetProgramById(programID?.toString());
  const programName = response?.body.name ?? '...';

  return (
    <Breadcrumb
      separator=">"
      color="grey.500"
      fontSize="1rem"
      fontWeight="600"
      sx={{ '& > ol': { flexWrap: 'wrap' } }}
      isTruncated
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/clients/programs">
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!folderID && (
        <BreadcrumbItem
          isCurrentPage={!!folderID && !programID}
          color={!!folderID && !programID ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!folderID && !programID ? 'span' : Link}
            href={`/clients/programs/${folderID}`}
            maxW="15rem"
            isTruncated
          >
            {folderName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!programID && (
        <BreadcrumbItem
          isCurrentPage={!!programID && !currentModule}
          color={!!programID && !currentModule ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!programID && !currentModule ? 'span' : Link}
            href={`/clients/programs/${folderID}/${programID}/application`}
            maxW="15rem"
            isTruncated
          >
            {programName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!programID && !!currentModule && (
        <BreadcrumbItem
          isCurrentPage={!!programID && !!currentModule}
          color={!!programID && !!currentModule ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!programID && !!currentModule ? 'span' : Link}
            href={`/clients/programs/${folderID}/${programID}/${currentModule}`}
            textTransform="capitalize"
          >
            {currentModule}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ProgramsBreadcrumbs;
