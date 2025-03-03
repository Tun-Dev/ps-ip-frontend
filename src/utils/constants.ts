import type { Module } from '@/types';
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

export const ALL_MODULES: Module[] = [
  {
    form: {
      name: 'Nomination_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '6749aae926f5db219859ef22',
    },
    moduleGuidelines: [],
    formId: '6749aae926f5db219859ef22',
    module: 'Nomination',
    name: 'Nomination',
    id: 61,
    order: 3,
  },
  {
    form: {
      name: 'Vetting_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '6749aaec26f5db219859ef2d',
    },
    moduleGuidelines: [
      {
        id: 131,
        name: 'Allow manual vetting',
        identifier: 'MANUAL',
        moduleId: 3,
      },
    ],
    formId: '6749aaec26f5db219859ef2d',
    module: 'Vetting',
    name: 'Vetting',
    id: 62,
    order: 4,
  },
  {
    form: {
      name: 'Disbursement_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '6749aaed26f5db219859ef34',
    },
    moduleGuidelines: [
      {
        id: 137,
        name: 'Allow beneficiaries enjoy multiple disbursement',
        identifier: 'MULTIPLE_DISBURSEMENTS',
        moduleId: 6,
      },
      {
        id: 138,
        name: 'Allow rejection during disbursement',
        identifier: 'CAN_REJECT',
        moduleId: 6,
      },
      {
        id: 139,
        name: 'Allow pause disbursement',
        identifier: 'CAN_PAUSE',
        moduleId: 6,
      },
    ],
    formId: '6749aaed26f5db219859ef34',
    module: 'Disbursement',
    name: 'Disbursement',
    id: 63,
    order: 5,
  },
  {
    form: {
      name: 'Vetting_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '6749aaec26f5db219859ef2d',
    },
    moduleGuidelines: [
      {
        id: 136,
        name: 'Allow manual whitelisting',
        identifier: 'MANUAL',
        moduleId: 5,
      },
    ],
    formId: '6749aaec26f5db219859ef2d',
    module: 'Whitelisting',
    name: 'Whitelisting',
    id: 64,
    order: 6,
  },
  {
    form: {
      name: 'Survey_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '6749aaef26f5db219859ef3d',
    },
    moduleGuidelines: [],
    formId: '6749aaef26f5db219859ef3d',
    module: 'Survey',
    name: 'Survey',
    id: 65,
    order: 7,
  },
  {
    form: {
      name: 'Application_Community Development and Skills Enhancement Program (CDSEP)',
      program: 'Community Development and Skills Enhancement Program (CDSEP)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '675a20e0464c70d54d04ed17',
    },
    moduleGuidelines: [
      {
        id: 126,
        name: 'Allow multiple responses by one beneficiary',
        identifier: 'MULTIPLE_APPLICATIONS',
        moduleId: 1,
      },
      {
        id: 127,
        name: 'Allow beneficiaries save and continue',
        identifier: 'SAVE_AND_CONTINUE',
        moduleId: 1,
      },
      {
        id: 128,
        name: 'Allow screenshots',
        identifier: 'CAN_SCREENSHOT',
        moduleId: 1,
      },
      {
        id: 129,
        name: 'Allow beneficiaries apply again after rejection',
        identifier: 'CAN_REAPPLY',
        moduleId: 1,
      },
    ],
    formId: '675a20e0464c70d54d04ed17',
    module: 'Application',
    name: 'Application',
    id: 59,
    order: 1,
  },
  {
    form: {
      name: 'Enumeration_Community Development and Skills Enhancement Program (CDSEP)',
      program: 'Community Development and Skills Enhancement Program (CDSEP)',
      questions: [],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      id: '675a20e1464c70d54d04ed1c',
    },
    moduleGuidelines: [
      {
        id: 133,
        name: 'Agent assisted enumeration',
        identifier: 'AGENT_ASSISTED',
        moduleId: 4,
      },
      {
        id: 134,
        name: 'Self enumeration',
        identifier: 'SELF_ENUMERATION',
        moduleId: 4,
      },
      {
        id: 135,
        name: 'Allow beneficiaries apply again after rejection',
        identifier: 'CAN_REAPPLY',
        moduleId: 4,
      },
    ],
    formId: '675a20e1464c70d54d04ed1c',
    module: 'Enumeration',
    name: 'Enumeration',
    id: 60,
    order: 2,
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

export const SERVICES = [
  { label: 'Cash', value: 'Cash' },
  { label: 'Physical Item', value: 'Physical Item' },
  { label: 'Capacity Building', value: 'Capacity Building' },
];

export const MODULE_STATUS = {
  Application: {
    description: 'The initial step where you submit your information to be considered for the program.',
    status: 'Your Application has been sent.',
  },
  Enumeration: {
    description: 'A process to gather and record information about potential program participants.',
    status: 'Your information has been recorded.',
  },
  Nomination: {
    description: 'A selection process where potential participants are identified for the program.',
    status: 'You have been successfully nominated.',
  },
  Survey: {
    description: 'A data collection phase to better understand participant circumstances.',
    status: 'Your survey has been completed.',
  },
  Verification: {
    description:
      'During verification, we check your information against the federal government’s database to validate your identity.',
    status: 'Your Application has been sent.',
  },
  Vetting: {
    description:
      'Through vetting, we verify that you meet the program’s requirements and are eligible to receive its benefits.',
    status: 'Congratulations, you have been verified.',
  },
  Whitelisting: {
    description: 'After vetting, the most eligible candidates are whitelisted and selected as beneficiaries.',
    status: 'Congratulations, you have been vetted.',
  },
  Disbursement: {
    description:
      'Reaching the disbursement stage means you’ve been whitelisted and will receive the program’s benefits soon.',
    status: 'Congratulations, you have been whitelisted.',
  },
  Rejected: {
    description: 'Your application doesn’t meet the eligibility criteria for this program at this time.',
    status: 'Verification Failed',
  },
  default: {
    description: 'This is the default module status',
    status: 'This is the default status',
  },
};
