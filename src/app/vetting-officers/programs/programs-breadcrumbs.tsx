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
  const programName = response?.body.name ? `${response.body.name} Vetting` : '...';

  return (
    <Breadcrumb separator=">" color="grey.500" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem isCurrentPage={pathname === '/vetting-officers/programs'}>
        <BreadcrumbLink
          as={pathname === '/vetting-officers/programs' ? 'span' : Link}
          href="/vetting-officers/programs"
        >
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!folderID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/vetting-officers/programs/${folderID}`}
          color={pathname === `/vetting-officers/programs/${folderID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/vetting-officers/programs/${folderID}` ? 'span' : Link}
            href={`/vetting-officers/programs/${folderID}`}
          >
            {folderName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!folderID && !!programID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/vetting-officers/programs/${folderID}/${programID}`}
          color={pathname === `/vetting-officers/programs/${folderID}/${programID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/vetting-officers/programs/${folderID}/${programID}` ? 'span' : Link}
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
