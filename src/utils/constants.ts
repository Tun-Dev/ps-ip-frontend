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
    form: {
      name: 'Nomination_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '6749aae926f5db219859ef22',
    },
    ModuleGuidelines: [],
    formId: '6749aae926f5db219859ef22',
    module: 'Nomination',
    id: 61,
    order: 3,
  },
  {
    form: {
      name: 'Vetting_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '6749aaec26f5db219859ef2d',
    },
    ModuleGuidelines: [
      {
        id: 131,
        name: 'Allow manual vetting',
        identifier: 'MANUAL',
        moduleId: 3,
      },
    ],
    formId: '6749aaec26f5db219859ef2d',
    module: 'Vetting',
    id: 62,
    order: 4,
    isActive: false,
    isCompleted: false,
    name: '',
  },
  {
    form: {
      name: 'Disbursement_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '6749aaed26f5db219859ef34',
    },
    ModuleGuidelines: [
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
    id: 63,
    order: 5,
    isActive: false,
    isCompleted: false,
    name: '',
  },
  {
    form: {
      name: 'Vetting_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '6749aaec26f5db219859ef2d',
    },
    ModuleGuidelines: [
      {
        id: 136,
        name: 'Allow manual whitelisting',
        identifier: 'MANUAL',
        moduleId: 5,
      },
    ],
    formId: '6749aaec26f5db219859ef2d',
    module: 'Whitelisting',
    id: 64,
    order: 6,
    isActive: false,
    isCompleted: false,
    name: '',
  },
  {
    form: {
      name: 'Survey_Investment in Digital Creative Enterprises Program (iDICE)',
      program: 'Investment in Digital Creative Enterprises Program (iDICE)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '6749aaef26f5db219859ef3d',
    },
    ModuleGuidelines: [],
    formId: '6749aaef26f5db219859ef3d',
    module: 'Survey',
    id: 65,
    order: 7,
    isActive: false,
    isCompleted: false,
    name: '',
  },
  {
    form: {
      name: 'Application_Community Development and Skills Enhancement Program (CDSEP)',
      program: 'Community Development and Skills Enhancement Program (CDSEP)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '675a20e0464c70d54d04ed17',
    },
    ModuleGuidelines: [
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
    id: 59,
    order: 1,
    isActive: true,
    isCompleted: false,
  },
  {
    form: {
      name: 'Enumeration_Community Development and Skills Enhancement Program (CDSEP)',
      program: 'Community Development and Skills Enhancement Program (CDSEP)',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '675a20e1464c70d54d04ed1c',
    },
    ModuleGuidelines: [
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
    id: 60,
    order: 2,
    isActive: false,
    isCompleted: false,
    name: '',
  },
];

// export const ALL_MODULES = [
//   {
//     id: 1,
//     name: 'Application',
//     icon: '/icons/Application.svg',
//     hasForm: true,
//     hasSettings: true,
//   },
//   {
//     id: 2,
//     name: 'Enumeration',
//     icon: '/icons/Enumeration.svg',
//     hasForm: true,
//     hasSettings: true,
//   },
//   {
//     id: 3,
//     name: 'Verification',
//     icon: '/icons/Verification.svg',
//     hasForm: false,
//     hasSettings: false,
//   },
//   {
//     id: 4,
//     name: 'Nomination',
//     icon: '/icons/Nomination.svg',
//     hasForm: false,
//     hasSettings: false,
//   },
//   {
//     id: 5,
//     name: 'Vetting',
//     icon: '/icons/Vetting.svg',
//     hasForm: true,
//     hasSettings: true,
//   },
//   {
//     id: 6,
//     name: 'Whitelisting',
//     icon: '/icons/Whitelisting.svg',
//     hasForm: false,
//     hasSettings: true,
//   },
//   {
//     id: 7,
//     name: 'Disbursement',
//     icon: '/icons/Disbursement.svg',
//     hasForm: false,
//     hasSettings: true,
//   },
//   {
//     id: 8,
//     name: 'Survey',
//     icon: '/icons/Survey.svg',
//     hasForm: true,
//     hasSettings: false,
//   },
// ];

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
