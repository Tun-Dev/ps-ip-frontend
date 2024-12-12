import type { ButtonProps, IconProps } from '@chakra-ui/react';
import { Avatar, Box, Icon, Stack, Text } from '@chakra-ui/react';

type Props = {
  name: string;
  logo?: string;
  count: number;
  waveDirection?: 'top' | 'bottom';
  isActive?: boolean;
} & ButtonProps;

export const GeepComponent = ({ name, logo, count, waveDirection, isActive, ...props }: Props) => {
  return (
    <Box
      pos="relative"
      pt="2"
      px="3"
      pb="5"
      border="1px solid"
      borderColor="grey.100"
      rounded="2xl"
      boxShadow="card"
      overflow="hidden"
      cursor="pointer"
      bgColor={isActive ? 'primary.150' : 'primary.50'}
      _hover={{ bgColor: isActive ? 'primary.100' : 'primary.100' }}
      {...props}
    >
      <Stack spacing="3" pos="relative" zIndex="docked">
        <Text variant="Body2Semibold" color="primary.600">
          {count} Modules Available
        </Text>
        <Stack align="center">
          <Avatar boxSize="6rem" name={name} src={logo} bgColor={isActive ? 'white' : 'primary.200'} color="grey.500" />
          <Text variant="Body2Semibold" color="grey.500" textTransform="uppercase" textAlign="center">
            {name}
          </Text>
        </Stack>
      </Stack>
      <Wave pos="absolute" inset="0" zIndex="1" transform="auto" rotate={waveDirection === 'bottom' ? '180deg' : '0'} />
    </Box>
  );
};

const Wave = (props: IconProps) => {
  return (
    <Icon boxSize="full" viewBox="0 0 262 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M-28.0002 41.2514C125.985 65.7309 80.6253 181.453 259.678 200.369" stroke="#CDE5CC" />
      <path d="M4.8262 -19.3916C78.4611 50.0304 222.3 -88.5021 282.358 54.0475" stroke="#CDE5CC" />
      <path d="M-26.2753 38.3829C124.62 64.5909 86.5367 170.534 261.013 194.205" stroke="#CDE5CC" />
      <path d="M-24.5508 35.5137C123.254 63.4502 92.4476 159.614 262.347 188.041" stroke="#CDE5CC" />
      <path d="M-22.8259 32.6452C121.888 62.3103 98.3591 148.695 263.682 181.877" stroke="#CDE5CC" />
      <path d="M-21.1015 29.7764C120.523 61.1701 104.27 137.776 265.016 175.713" stroke="#CDE5CC" />
      <path d="M-19.3765 26.9074C119.157 60.0297 110.181 126.857 266.351 169.548" stroke="#CDE5CC" />
      <path d="M-17.6521 24.0389C117.791 58.8897 116.092 115.938 267.685 163.385" stroke="#CDE5CC" />
      <path d="M-15.9271 21.1701C116.426 57.7495 122.004 105.018 269.02 157.22" stroke="#CDE5CC" />
      <path d="M-14.2027 18.3011C115.06 56.6091 127.915 94.099 270.354 151.056" stroke="#CDE5CC" />
      <path d="M-12.4782 15.4326C113.694 55.4691 133.826 83.1801 271.688 144.892" stroke="#CDE5CC" />
      <path d="M-10.7533 12.5639C112.328 54.3289 139.737 72.2608 273.023 138.728" stroke="#CDE5CC" />
      <path d="M-9.02885 9.69487C110.962 53.1885 145.648 61.3414 274.357 132.564" stroke="#CDE5CC" />
      <path d="M-7.30391 6.82612C109.597 52.0483 151.559 50.4221 275.692 126.4" stroke="#CDE5CC" />
      <path d="M-5.57947 3.95761C108.231 50.9083 157.47 39.5031 277.026 120.236" stroke="#CDE5CC" />
      <path d="M-3.85453 1.08861C106.865 49.7679 163.382 28.5837 278.361 114.072" stroke="#CDE5CC" />
      <path d="M-2.3985 -1.46861C105.231 48.9392 169.024 17.976 279.426 108.219" stroke="#CDE5CC" />
      <path d="M-1.33345 -3.57123C103.206 48.5652 174.276 7.82291 280.101 102.821" stroke="#CDE5CC" />
      <path d="M-0.468472 -5.44294C100.98 48.422 179.327 -2.09929 280.576 97.6541" stroke="#CDE5CC" />
      <path d="M0.280854 -7.17912C98.639 48.4144 184.263 -11.8859 280.935 92.6226" stroke="#CDE5CC" />
      <path d="M0.955766 -8.82999C96.2235 48.4921 189.124 -21.5873 281.22 87.6764" stroke="#CDE5CC" />
      <path d="M1.58108 -10.4225C93.7584 48.6281 193.936 -31.2302 281.455 82.7885" stroke="#CDE5CC" />
      <path d="M2.17032 -11.9734C91.2572 48.8058 198.712 -40.8317 281.654 77.9422" stroke="#CDE5CC" />
      <path d="M2.73385 -13.4945C88.7304 49.0133 203.462 -50.4031 281.827 73.1259" stroke="#CDE5CC" />
      <path d="M3.277 -14.9922C86.1831 49.2442 208.192 -59.9513 281.98 68.3328" stroke="#CDE5CC" />
      <path d="M3.80518 -16.4717C83.6209 49.4932 212.906 -69.4813 282.118 63.558" stroke="#CDE5CC" />
      <path d="M4.32063 -17.9377C81.0459 49.7557 217.608 -78.9978 282.243 58.7966" stroke="#CDE5CC" />
    </Icon>
  );
};
