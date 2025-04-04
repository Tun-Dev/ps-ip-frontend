export const siteConfig = {
  name: 'PS-IP',
  title: 'PS-IP',
  description: '',
};

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
  Application: 'The initial step where you submit your information to be considered for the program.',
  Enumeration: 'A process to gather and record information about potential program participants.',
  Nomination: 'A selection process where potential participants are identified for the program.',
  Survey: 'A data collection phase to better understand participant circumstances.',
  Verification:
    'During verification, we check your information against the federal government’s database to validate your identity.',
  Vetting:
    'Through vetting, we verify that you meet the program’s requirements and are eligible to receive its benefits.',
  Whitelisting: 'After vetting, the most eligible candidates are whitelisted and selected as beneficiaries.',
  Disbursement:
    'Reaching the disbursement stage means you’ve been whitelisted and will receive the program’s benefits soon.',
  Rejected: 'Your application doesn’t meet the eligibility criteria for this program at this time.',
};

export enum FormStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  WHITELISTED = 'WHITELISTED',
  RECOMMENDED = 'RECOMMENDED',
  DISBURSED = 'DISBURSED',
}

export const FILE_SIZE_LIMITS = {
  images: 4 * 1024 * 1024, // 4MB
  videos: 70 * 1024 * 1024, // 70MB
  documents: 20 * 1024 * 1024, // 20MB
};

export enum IdType {
  NIN = 'NIN_SLIP',
  BVN = 'BVN',
  CAC = 'CAC',
  VOTER_ID = 'VOTER_ID',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
}
