import type { IconProps } from '@chakra-ui/react';
import type { AxiosProgressEvent } from 'axios';
import type { IconType } from 'react-icons';

export type DropdownOption = {
  label: string;
  value: number;
  status: string;
  options: Option[];
  icon: ((props: IconProps) => JSX.Element) | IconType;
};

export type APIResponse<T> = {
  success: boolean;
  status: number;
  body: T;
  message: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  body: {
    total: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    data: T[];
  };
};

export type GroupedPaginatedResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  body: {
    total: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    data: T;
  };
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  gender: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  lockedOut: boolean;
  createdAt: string;
  updatedAt: string;
  roles: string[];
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

export type NewVendor = {
  name: string;
  service: string;
  product?: string;
  amount: number;
  scheduledDate: string;
  endDate: string;
  numberOfBeneficiaries: number;
  programId: number;
  user: {
    password: string;
    confirmPassword: string;
    email: string;
    firstname: string;
    lastname: string;
  };
};

export type Vendor = {
  id: string;
  amount: number;
  endDate: string;
  item: string;
  name: string;
  numberOfBeneficiaries: number;
  programName: string;
  programId: number;
  scheduledDate: string;
  product?: string;
  contactEmail: string;
  contactPhone: string;
};

export type VendorFilterParams = {
  query?: string;
  page?: number;
  pageSize?: number;
  programId?: number;
  scheduledDate?: string;
  endDate?: string;
};

export type VendorOverview = {
  vendors: number;
  orders: number;
  amountDisbursed: number | null;
  amountDisburseable: number | null;
  beneficiariesDisbursed: number;
};

export type Aggregator = {
  id: number;
  name: string;
  programId: number;
  noOfAgents: number;
  maxAgents: number;
  programName: string;
  contactEmail: string;
  contactPhone: string;
};

export type AggregatorOverview = {
  totalAggregators: number;
  totalAgents: number;
};

export type ProgramModules = {
  id: number;
  isActive: boolean;
  isCompleted: false;
  name: string;
  order: number;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  logo: string;
  moduleCount: string;
  programModules: ProgramModules[];
};

export type ProgramPayload = {
  name: string;
  description: string;
  logo: number;
  target: number;
  programTypeId: number;
  programModules: {
    moduleId: number;
    formId?: string;
    guidelines: number[];
    dataPoints?: { dataPoint: string; isRequired: boolean }[];
    isBase: boolean;
    order: number;
  }[];
};

export type AggregatorPayload = {
  name: string;
  programId: number;
  maxAgents: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Agent = {
  id: number;
  firstName: string;
  lastName: string;
  aggregator: string;
  dob: string;
  gender: string;
  userId: number;
  status: boolean;
  lga: string;
  state: string;
  programId: number;
};

export type Module = {
  id: number;
  name: string;
  module: string;
  formId: null | string;
  order: number;
  ModuleGuidelines: ModuleGuideline[];
  form: Form;
};

export type ModuleGuideline = {
  id: number;
  name: string;
  identifier: string;
  moduleId: number;
};

export type ProgramType = {
  id: number;
  type: string;
};

export type State = {
  id: number;
  name: string;
  LGAs: LGA[];
};

export type LGA = {
  id: number;
  name: string;
  stateId: number;
};

export type QuestionType = {
  status: string;
  value: number;
};

export type DataPoints = {
  [key: string]: DataPoint[];
};

export type DataPoint = {
  id: string;
  format: Format;
  question: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type Format = {
  type: string;
  options: Option[];
};

export type Option = {
  id?: string;
  label: string;
  value: string;
  weight?: number;
};

export type FormResponse = {
  programName: string;
  programModuleId: number;
  formId: string;
};

export type FormPayload = {
  id?: string;
  moduleId: number;
  program: string;
  questions: Question[];
  totalFormScore?: number;
  minVetScore?: number;
};

export type Question = {
  question: string;
  type: number;
  mandatory: boolean;
  options?: Option[];
  total?: number;
};

export type UploadPayload = {
  files: File[];
  type: 'programLogo' | 'profilePhotos' | 'beneficiaryDocs';
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

export type FileUpload = {
  id: number;
  fileName: string;
  fileType: string;
};

export type Partner = {
  amount: number;
  id: number;
  name: string;
  program: string;
};

export type NewPartnerDetails = {
  password: string;
  confirmPassword: string;
  programId: number;
  amount: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  contactEmail: string;
};

export type ProgramDetails = {
  name: string;
  logo: string;
  logoId: number;
  target: number;
  description: string;
  programType: string;
  programModules: ProgramModulesDetails[];
};

export type ProgramModulesDetails = {
  form: Form;
  moduleGuidelines: ModuleGuideline[];
  formId: string;
  module: string;
  id: number;
  order: number;
  isActive: boolean;
  isCompleted: boolean;
};

export type Form = {
  name: string;
  program: string;
  questions: QuestionDetails[];
  createdAt: string;
  updatedAt: string;
  id: string;
  totalFormScore?: number;
  minVetScore?: number;
};

export type QuestionDetails = {
  question: string;
  type: string;
  mandatory: boolean;
  options: Option[];
  createdAt: string;
  updatedAt: string;
  id: string;
  total?: number;
  dataPoint?: { buffer: string };
};

export type ApproveBeneficiaryPayload = {
  status: string;
  beneficiaryId: number[];
  moduleId: number;
  programId: number;
  vetScore?: number;
};

export type PartnerFilterParams = {
  page: number;
  pageSize: number;
  query?: string;
  programId?: number;
};

export type Beneficiary = {
  id: number;
  moduleName: string;
  status: string;
  [key: string]: string | number;
};

export type BeneficiaryDetails = {
  id: number;
  email: string;
  date: string;
  phoneNumber: string;
  moduleDetails: ModuleDetail[];
  progressLog: ProgressLog[];
};

export type ModuleDetail = {
  moduleName: string;
  formAnswers: FormAnswer[];
};

export type FormAnswer = {
  key: string;
  value: string;
};

export type ProgressLog = {
  agentName: string;
  date: string;
  progress: string;
  moduleName: string;
  status: string;
};

export type ProgramUploadResponse = {
  description: string;
  id: number;
  isActive: boolean;
  name: string;
  programTypeId: number;
  target: number;
};

export type ProgramForm = {
  form: Form;
  programId: number;
  moduleName: string;
  description: string;
  logo: string;
  programType: string;
  programName: string;
  availableModules: { module: string; order: number }[];
};

export type FillFormPayload = {
  programId: number;
  agentId?: number;
  formId: string;
  moduleName: string;
  formAnswers: { label: string; value: string; question: string }[];
};

export type BeneficiaryStatus = {
  status: string;
  currentModule: string;
  programName: string;
  availableModules: { name: string; order: number }[];
};

export type ActivateAgentPayload = {
  agentId: number;
  isActive: boolean;
  programId: number;
};
