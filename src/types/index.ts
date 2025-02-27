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
  id: string;
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
  programId: string;
  user: {
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
  programId: string;
  scheduledDate: string;
  product?: string;
  contactEmail: string;
  contactPhone: string;
  programCount: number;
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
  id: string;
  name: string;
  programId: string;
  noOfAgents: number;
  maxAgents: number;
  programName: string;
  contactEmail: string;
  contactPhone: string;
  totalAgents: string;
  programCount: string;
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
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactEmail: string;
  contactPhone: string;
  programDetails: { programId: string; maxAgents: number }[];
};

export type AddAggregatorToProgram = {
  id: string;
  programId: string;
  maxAgents: number;
};

export type Agent = {
  id: string;
  firstName: string;
  lastName: string;
  aggregator: string;
  dob: string;
  gender: string;
  userId: number;
  status: boolean;
  lga: string;
  state: string;
  programId: string;
};

export type Module = {
  id: number;
  name: string;
  module: string;
  formId: null | string;
  order: number;
  moduleGuidelines: ModuleGuideline[];
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
  programId: string;
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
  coverPhoto: string;
  coverPhotoId: number;
  eligibilityCriteria: EligibilityCriteriaType[];
};

export type EligibilityCriteriaType = {
  id: number;
  criteria: string;
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
  dataPoint?: string;
};

export type ApproveBeneficiaryPayload = {
  status: string;
  beneficiaryId: number[];
  moduleId: number;
  programId: string;
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
  form?: Form;
  programId: string;
  moduleName: string;
  description: string;
  logo: string;
  programType: string;
  programName: string;
  availableModules: { module: string; order: number }[];
  coverPhoto: string;
  eligibilityCriteria: string[];
};

export type FillFormPayload = {
  programId: string;
  agentId?: string;
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
  agentId: string;
  isActive: boolean;
  programId?: string;
};

export type EnumerationsTableData = {
  name: string;
  lga: string;
  enumerated: string;
};

export type DashboardDataResponse = {
  runningPrograms: number;
  totalBeneficiaries: number;
  beneficiariesDisbursed: number;
  amountDisbursed: number;
  applications: number;
  beneficiariesEnumerated: number;
  awaitingKYCVerification: number;
  awaitingDisbursement: number;
  enumerations: EnumerationsTableData[];
};

export type AggregatorDashboard = {
  programCount: number;
  totalAgents: number;
  agentsOnline: number;
  totalEnumerations: number;
  unfulfilledObjectives: number;
  notification: [];
  activities: AggregatorActivity[];
};

export type AggregatorActivity = {
  program: string;
  activity: AggregatorActivityTable[];
};

export type AggregatorActivityTable = {
  name: string;
  lga: string;
  enumerated?: string;
  status?: 'Online' | 'Offline';
};

export type AggregatorAnalytics = {
  completedObjectives: number;
  pendingObjectives: number;
  pendingReviews: number;
  totalResponses: number;
  approvedEnumerations: number;
  deniedEnumerations: number;
  completionTime?: string;
};

export type AggregatorAgent = {
  id: string;
  firstName: string;
  lastName: string;
  aggregator: string;
  gender: string;
  state: string;
  lga: string;
  status: boolean;
  lastActive: string;
  programId: string;
  programName: string;
  programType: string;
};

export type AggregatorAgentsParams = Partial<{
  page: number;
  pageSize: number;
  query: string;
  active: boolean;
  aggregatorId: string;
}>;

export type AgentPayload = {
  aggregatorId: string;
  agents: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    programDetails?: AgentProgramDetails[];
  }[];
};

export type ReassignAgentPayload = {
  aggregatorProgramId: string;
  programs: {
    agentId: string;
    aggregatorId: string;
    programDetails: { programId: string; objective: number; lgaId: number };
  }[];
};

export type AgentProgramDetails = {
  programId: string;
  objective?: number;
  lgaId?: number;
};

export type GroupPayload = {
  name: string;
};

export type GroupEditPayload = {
  name: string;
  id?: string;
};

export type GroupPayloadResponse = {
  id: string;
  logo: string;
  name: string;
};

export type AddProgramToGroupPayload = {
  id: string;
  programIds: string[];
};

export type GroupResponse = {
  id: string;
  name: string;
  programCount: number;
};

export type GroupDetailsResponse = {
  id: string;
  logo: string;
  name: string;
  programs: Program[];
};

export type DashboardProgramGroups = {
  programCount: number;
  programGroups: { id: string; name: string; programCount: number }[];
};

export type AggregatorProgramsParams = Partial<{
  page: number;
  pageSize: number;
  query: string;
  folderId: string;
}>;

export type AggregatorProgram = {
  id: string;
  logo: string;
  name: string;
  programType: string;
  currentModule: string;
};

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  gender: string;
  email: string;
  phoneNumber: string;
  roles: RoleElement[];
  agent: [];
  aggregator: AggregatorUser;
};

export type AggregatorUser = {
  id: string;
  aggregatorPrograms: AggregatorUserProgram[];
};

export type AggregatorUserProgram = {
  id: string;
  programId: string;
  aggregatorId: string;
};

export type RoleElement = {
  role: Role;
};

export type Role = {
  id: number;
  name: string;
  description: string;
};

export type AgentSignUpPayload = {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  otherName: string;
  dob: string;
  gender: string;
  email: string;
  aggregatorCode: string;
  phoneNumber: string;
  bvnPhoneNumber: string;
  bvn: string;
  numberOfDependents: number;
  address: string;
  highestEducation: string;
  photo: number;
  nin: string;
  stateOfOrigin: number;
  LGAOfResidence: number;
};

export type VendorDashboard = {
  programs: number;
  orders: number;
  amountDisbursed: number;
  amountDisburseable: number;
  beneficiariesDisbursed: number;
  activities: VendorActivity;
};

export type VendorActivity = {
  programName: string;
  module: string;
  beneficiaries: VendorActivityBeneficiary[];
};

export type VendorActivityBeneficiary = {
  name: string;
  status: string;
};

export type VendorProgram = {
  programId: string;
  moduleName: string;
  logo: string;
  name: string;
  type: string;
  vendorProgramId: string;
};

export type VendorBeneficiary = {
  id: string;
  moduleName: string;
  status: string;
  email?: string;
  phoneNumber?: string;
  formAnswers?: { key: string; value: unknown }[];
  verifications?: { type: string; value: string; status: boolean }[];
};

export type AggregatorDetails = {
  name: string;
  agents: number;
  aggregatorProgramId: string;
  programName: string;
  programType: string;
};

export type VendorDetails = {
  vendorProgramId: number;
  name: string;
  productOrServices: string;
  scheduledDate: string;
  endDate: string;
  programName: string;
  programType: string;
  programId: string;
};

export type VendorProgramPayload = {
  id: string;
  programId: string;
  scheduledDate: string;
  endDate: string;
};

export type VendorAnalytics = {
  ordersPending: number;
  amountDisbursed: number;
  amountDisburseable: number;
  candidatesDisbursed: number;
};

export type ScheduleActivationPayload = {
  agent: { agentId: string; programId: string };
  schedule: AgentSchedule;
};

export type AgentSchedule = {
  days: (string | number)[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
};
