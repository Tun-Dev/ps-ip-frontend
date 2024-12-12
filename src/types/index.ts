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

export type Vendor = {
  name: string;
  service: string;
  item: string;
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
};

export type Module = {
  id: number;
  module: string;
  formId: null | string;
  order: number;
  moduleGuidelines: ModuleGuideline[];
  form: Form;
  name: string;
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

export type DataPointResponse = {
  dataPoints: DataPoints;
  questionType: QuestionType[];
};

export type QuestionType = {
  status: string;
  value: number;
};

export type DataPoints = {
  [key: string]: DataPoint[];
};

export interface DataPoint {
  id: string;
  format: Format;
  question: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Format {
  type: string;
  options: Option[];
}

export interface Option {
  id?: string;
  label: string;
  value: string;
  weight?: number;
}

export type FormResponse = {
  programName: string;
  programModuleId: number;
  formId: string;
};

export type FormPayload = {
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
  type: 'programLogo' | 'profilePhotos' | 'beneficiaryLogo';
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
  service: string;
};

export type ProgramDetails = {
  form: Form;
  moduleGuidelines: ModuleGuideline[];
  formId: string;
  module: string;
  id: number;
  order: number;
  isActive: boolean;
  isCompleted: boolean;
};

export interface Form {
  name: string;
  program: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
