'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';

import { useGetGroupById } from '@/hooks/useGetGroupById';
import { useGetProgramById } from '@/hooks/useGetProgramById';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const { programID, folderID } = useParams();
  const { response } = useGetProgramById(programID?.toString());
  const { response: group } = useGetGroupById(folderID?.toString());

  const folderName = group?.body.name ?? '...';
  const programName = response?.body.name ?? '...';

  return (
    <Breadcrumb separator=">" color="grey.500" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem isCurrentPage={pathname === '/aggregators/programs'}>
        <BreadcrumbLink as={pathname === '/aggregators/programs' ? 'span' : Link} href="/aggregators/programs">
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!folderID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/aggregators/programs/${folderID}`}
          color={pathname === `/aggregators/programs/${folderID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/aggregators/programs/${folderID}` ? 'span' : Link}
            href={`/aggregators/programs/${folderID}`}
          >
            {folderName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!folderID && !!programID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/aggregators/programs/${folderID}/${programID}`}
          color={pathname === `/aggregators/programs/${folderID}/${programID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/aggregators/programs/${folderID}/${programID}` ? 'span' : Link}
            href={`/super-admin/programs/${folderID}/${programID}/application`}
          >
            {programName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ProgramsBreadcrumbs;
