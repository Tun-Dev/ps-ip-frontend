import { MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft } from 'react-icons/md';
import { ShortAnswerIcon } from '../../public/icons';

export const OPTIONS = [
  { label: 'Short answer', value: 'Short answer', icon: ShortAnswerIcon },
  { label: 'Paragraph', value: 'Paragraph', icon: MdFormatAlignLeft },
  { label: 'Dropdown', value: 'Dropdown', icon: MdArrowDropDown },
  { label: 'Date', value: 'Date', icon: MdCloudUpload },
  { label: 'File upload', value: 'File upload', icon: MdDateRange },
] as const;

export type Option = (typeof OPTIONS)[number];

export interface ModuleProps {
  id: number;
  name: string;
  status: 'Completed' | 'In progress' | 'Pending' | 'Edit';
  icon: string;
  isDisabled: boolean;
  active: boolean;
}

export const ModulesData: ModuleProps[] = [
  {
    id: 1,
    name: 'Enumeration',
    status: 'Completed',
    icon: '/icons/undraw_interview.svg',
    isDisabled: false,
    active: false,
  },
  {
    id: 2,
    name: 'Verification',
    status: 'In progress',
    icon: '/icons/undraw_authentication.svg',
    isDisabled: false,
    active: false,
  },
  {
    id: 3,
    name: 'Vetting',
    status: 'Pending',
    icon: '/icons/undraw_following.svg',
    isDisabled: true,
    active: false,
  },
  {
    id: 4,
    name: 'Whitelisting',
    status: 'Pending',
    icon: '/icons/undraw_followers.svg',
    isDisabled: true,
    active: false,
  },
  {
    id: 5,
    name: 'Disbursement',
    status: 'Pending',
    icon: '/icons/undraw_online_payments.svg',
    isDisabled: true,
    active: false,
  },
];

export const ProgramsData = [
  { id: 1, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 2, name: 'INVESMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 3, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 4, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
  { id: 5, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 6, name: 'INVESMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 7, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 8, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
];
