import { Box, Heading, Stack, StackProps, Text } from '@chakra-ui/react';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramStore } from '@/providers/programs-store-provider';
import { renameKey } from '@/utils';
import { SettingsForm } from './settings-form';

const AdminSettings = (props: StackProps) => {
  const { data: modules } = useGetModules();

  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);

  if (!activeModuleId || !selectedModuleIds.ids.has(activeModuleId)) return null;

  return (
    <Stack py="6" spacing="2.94rem" {...props}>
      {Array.from(selectedModuleIds.ids).map((moduleId, index) => {
        const currentModule = modules?.body.find((module) => module.id === moduleId);
        if (!currentModule) return null;
        const correctModule = renameKey(currentModule, 'name', 'module');
        const isVettingModule = correctModule.module === 'Vetting';
        return (
          <Box key={moduleId} flex="1" display={activeModuleId === moduleId ? 'block' : 'none'}>
            <Heading variant="Body2Semibold" color="primary.500" mb="4" textTransform="capitalize">
              <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
                {index + 1}
              </Box>{' '}
              {correctModule?.module}
            </Heading>
            {!isVettingModule && correctModule.ModuleGuidelines.length > 0 ? (
              <SettingsForm currentModule={correctModule} />
            ) : (
              <Text variant="Body2Semibold" textAlign="center" color="grey.500">
                No settings for this module.
              </Text>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default AdminSettings;
