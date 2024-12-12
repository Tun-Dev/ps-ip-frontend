'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useProgramStore } from '@/providers/programs-store-provider';
import { ProgramDetails } from '@/types';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { programID } = useParams();
  const { data: modules } = useGetModules();
  const segments = pathname.split('/');
  const currentModule = segments[segments.length - 1];
  const step = useProgramStore((state) => state.step);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const activeModule = modules?.body.find((module) => module.id === activeModuleId);

  const { response } = useGetProgramById(programID?.toString());
  const orderedResponse = reorderDescending(response?.body);
  const program = orderedResponse?.[0]?.form?.program ?? orderedResponse?.[1]?.form?.program ?? '...';
  const agent = searchParams.get('agent');

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
          <BreadcrumbLink as={!!programID && !currentModule ? 'span' : Link} href="/super-admin/programs">
            {program}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!!programID && !!currentModule && (
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
      {pathname === '/super-admin/programs/create' && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/super-admin/programs/create">
            Create New Program
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 1 && (
        <BreadcrumbItem isCurrentPage={step === 1} color={step === 1 ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={step === 1 ? 'span' : Link} href="/super-admin/programs/create">
            Select Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 2 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Edit Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 3 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Admin Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 4 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Review
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step !== 1 && activeModule && (
        <BreadcrumbItem isCurrentPage={!!activeModule} color={!!activeModule ? 'primary.600' : 'inherit'}>
          <BreadcrumbLink as={!!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            {activeModule.module}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ProgramsBreadcrumbs;

function reorderDescending(items?: ProgramDetails[]) {
  if (!items) return;
  return items.sort((a, b) => a.order - b.order);
}
