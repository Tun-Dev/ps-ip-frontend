'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const { programID } = useParams();
  const segments = pathname.split('/');
  const currentModule = segments[segments.length - 1];

  return (
    <Breadcrumb separator=">" color="grey.400" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/clients/modules">
          INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM (iDICE)
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!programID && currentModule && (
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href={`/super-admin/programs/${programID}/${currentModule}`}
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
