'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useProgramStore } from '@/providers/programs-store-provider';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { programID } = useParams();
  const segments = pathname.split('/');
  const currentModule = segments[segments.length - 1];
  const step = useProgramStore((state) => state.step);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const { data: modules } = useGetModules(!!activeModuleId);
  const activeModule = modules?.body.find((module) => module.id === activeModuleId);

  const { response } = useGetProgramById(programID?.toString());
  const programName = response?.body.name ?? '...';
  const agent = searchParams.get('agent');

  const isEditing = pathname === `/super-admin/programs/edit/${programID}`;
  const isCreating = pathname === '/super-admin/programs/create';

  return (
    <Breadcrumb separator=">" color="grey.500" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/super-admin/programs">
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!!programID && (
        <BreadcrumbItem
          isCurrentPage={!!programID && !currentModule}
          color={!!programID && !currentModule ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!programID && !currentModule ? 'span' : Link}
            href={`/super-admin/programs/${programID}/application`}
          >
            {programName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!programID && !!currentModule && pathname !== `/super-admin/programs/edit/${programID}` && (
        <BreadcrumbItem
          isCurrentPage={!!programID && !!currentModule && !agent}
          color={!!programID && !!currentModule && !agent ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!programID && !!currentModule && !agent ? 'span' : Link}
            href={`/super-admin/programs/${programID}/${currentModule}`}
            textTransform="capitalize"
          >
            {currentModule}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!programID && !!currentModule && !!agent && (
        <BreadcrumbItem
          isCurrentPage={!!programID && !!currentModule && !!agent}
          color={!!programID && !!currentModule && !!agent ? 'primary.600' : 'inherit'}
        >
          <BreadcrumbLink
            as={!!programID && !!currentModule && !!agent ? 'span' : Link}
            href={`/super-admin/programs/${programID}/${currentModule}?agent=${encodeURIComponent(agent)}`}
            textTransform="capitalize"
          >
            Agent ({agent})
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {isCreating && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/super-admin/programs/create">
            Create New Program
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {(isCreating || isEditing) && step === 1 && (
        <BreadcrumbItem isCurrentPage={step === 1} color={step === 1 ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={step === 1 ? 'span' : Link} href="/super-admin/programs/create">
            Select Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {(isCreating || isEditing) && step === 2 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Edit Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {(isCreating || isEditing) && step === 3 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Admin Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {(isCreating || isEditing) && step === 4 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Review
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {(isCreating || isEditing) && step !== 1 && activeModule && (
        <BreadcrumbItem isCurrentPage={!!activeModule} color={!!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            {activeModule.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ProgramsBreadcrumbs;
