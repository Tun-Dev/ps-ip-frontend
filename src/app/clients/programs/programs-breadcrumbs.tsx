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
  const programName = response?.body.name ? `${response.body.name} Disbursement` : '...';

  return (
    <Breadcrumb separator=">" color="grey.500" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem isCurrentPage={pathname === '/clients/programs'}>
        <BreadcrumbLink as={pathname === '/clients/programs' ? 'span' : Link} href="/clients/programs">
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!folderID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/clients/programs/${folderID}`}
          color={pathname === `/clients/programs/${folderID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/clients/programs/${folderID}` ? 'span' : Link}
            href={`/clients/programs/${folderID}`}
          >
            {folderName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!folderID && !!programID && (
        <BreadcrumbItem
          isCurrentPage={pathname === `/clients/programs/${folderID}/${programID}`}
          color={pathname === `/clients/programs/${folderID}/${programID}` ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={pathname === `/clients/programs/${folderID}/${programID}` ? 'span' : Link}
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
