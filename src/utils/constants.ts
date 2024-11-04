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

export const ALL_MODULES = [
  {
    id: 1,
    name: 'Application',
    icon: '/icons/undraw_my_app.svg',
    hasForm: true,
    hasSettings: true,
  },
  {
    id: 2,
    name: 'Enumeration',
    icon: '/icons/undraw_interview.svg',
    hasForm: true,
    hasSettings: true,
  },
  {
    id: 3,
    name: 'Verification',
    icon: '/icons/undraw_authentication.svg',
    hasForm: false,
    hasSettings: false,
  },
  {
    id: 4,
    name: 'Nomination',
    icon: '/icons/undraw_selecting_team.svg',
    hasForm: false,
    hasSettings: false,
  },
  {
    id: 5,
    name: 'Vetting',
    icon: '/icons/undraw_following.svg',
    hasForm: true,
    hasSettings: true,
  },
  {
    id: 6,
    name: 'Whitelisting',
    icon: '/icons/undraw_followers.svg',
    hasForm: false,
    hasSettings: true,
  },
  {
    id: 7,
    name: 'Disbursement',
    icon: '/icons/undraw_online_payments.svg',
    hasForm: false,
    hasSettings: true,
  },
  {
    id: 8,
    name: 'Survey',
    icon: '/icons/undraw_survey.svg',
    hasForm: true,
    hasSettings: false,
  },
];

export type ModuleProps = (typeof ALL_MODULES)[number];

export const ProgramsData = [
  { id: 1, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 2, name: 'INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 3, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 4, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
  { id: 5, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 6, name: 'INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 7, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 8, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
];

export const MONTHS = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

export const CURRENT_MONTH = new Date().toLocaleString('en-US', { month: 'long' });
