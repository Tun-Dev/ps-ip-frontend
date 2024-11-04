'use client';

import { Link } from '@chakra-ui/next-js';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { useProgramStore } from '@/providers/programs-store-provider';

const ProgramsBreadcrumbs = () => {
  const pathname = usePathname();
  const step = useProgramStore((state) => state.step);
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const activeModule = selectedModules.find((module) => module.id === activeModuleId);

  return (
    <Breadcrumb separator=">" color="grey.400" fontSize="1rem" fontWeight="600">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/super-admin/programs">
          Programs
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathname === '/super-admin/programs/create' && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/super-admin/programs/create">
            Create New Program
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 1 && (
        <BreadcrumbItem isCurrentPage={step === 1} color={step === 1 ? 'primary.500' : 'inherit'}>
          <BreadcrumbLink as={step === 1 ? 'span' : Link} href="/super-admin/programs/create">
            Select Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 2 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.500' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Edit Modules
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 3 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.500' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Admin Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step === 4 && (
        <BreadcrumbItem isCurrentPage={!activeModule} color={!activeModule ? 'primary.500' : 'inherit'}>
          <BreadcrumbLink as={!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            Review
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathname === '/super-admin/programs/create' && step !== 1 && activeModule && (
        <BreadcrumbItem isCurrentPage={!!activeModule} color={!!activeModule ? 'primary.500' : 'inherit'}>
          <BreadcrumbLink as={!!activeModule ? 'span' : Link} href="/super-admin/programs/create">
            {activeModule.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ProgramsBreadcrumbs;
