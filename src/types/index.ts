import { FormStatus, IdType } from '@/utils';
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
  user: { email: string; firstname: string; lastname: string };
};

export type Vendor = {
  id: string;
  name: string;
  email: string;
  service: string;
  product: string;
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone: string;
  phoneNumber: string;
  programCount: number;
  programDetails: { programId: string; vendorId: number }[];
};

export type VendorFilterParams = {
  query?: string;
  page?: number;
  pageSize?: number;
  program?: string;
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
  lastName: string;
  firstName: string;
  contactEmail: string;
  contactPhone: string;
  programCount: number;
  totalAgents: number;
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
  programType: string;
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
  aggregatorId: string;
  firstName: string;
  lastName: string;
  gender: string;
  lastActive: string;
  programCount: number;
  isActive: boolean;
  isOnline: boolean;
  aggregatorDetails: AggregatorProgramDetails[];
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

export type Client = {
  id: string;
  programs: number;
  amount: number;
  name: string;
  email: string;
  phoneNumber: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
};

export type ClientPayload = {
  // programId: string;
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
  eligibilityCriteria: EligibilityCriteriaType[] | string[];
};

export type EligibilityCriteriaType = {
  id: number | null;
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
  beneficiaryId: (number | string)[];
  moduleId: number;
  programId: string;
  vetScore?: number;
};

export type ClientFilterParams = {
  page: number;
  pageSize: number;
  query?: string;
  programId?: number;
};

export type Beneficiary = {
  id: string;
  firstname: string;
  lastname: string;
  otherNames: string;
  gender: string;
  dob: string;
  email: string;
  isFlagged: boolean;
  phoneNumber: string;
  vetScore: number;
  status: FormStatus;
  moduleName: string;
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
  verifications: Verification[];
};

export type FormAnswer = {
  key: string;
  value: string;
  answerId: string;
  score: number;
  question: QuestionDetails;
};

export type Verification = {
  type: string;
  value: string;
  status: boolean;
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
  coverPhoto: string;
  availableModules: { name: string; order: number }[];
};

export type ActivateAgentPayload = {
  agentId: string;
  isActive: boolean;
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
  agentsActive: number;
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
    gender: string;
    programDetails?: AgentProgramDetails[];
  }[];
};

export type ReassignAgentPayload = {
  agentId: string;
  aggregatorId: string;
  programDetails: { programId: string; objective: number; lgaId: number };
}[];

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

export type ProgramFilterOptions = Partial<{
  page: number;
  pageSize: number;
  query: string;
  folderId: string;
  vendorId: string;
  aggregatorId: string;
  clientId: string;
  enabled: boolean;
}>;

export type FolderProgram = {
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
  vendor: VendorUser;
};

export type VendorUser = {
  id: string;
  programs: number[];
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
  maxAgents: number;
  aggregatorProgramId: string;
  programName: string;
  programType: string;
  programId: string;
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
};

export type AgentDetails = {
  programName: string;
  programType: string;
  programId: string;
  objective: number;
  aggregatorId: string;
  lga: string;
  activation?: {
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    days: string[];
  };
};

export type AgentProgramPayload = {
  agentId: string;
  aggregatorId: string;
  programDetails: { programId: string; objective: number; lgaId: number };
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
  startDate: Date;
  endDate: Date;
};

export type VendorsOrders = {
  id: number;
  products: string;
  services: string;
  programName: string;
  programType: string;
  vendorName: string;
  amountDisburseable: number;
  scheduledDate: string;
  endDate: string;
};

export type VendorsOrdersDetails = {
  id: string;
  firstname: string;
  lastname: string;
  otherNames: string;
  gender: string;
  itemDisbursed: string;
  lga: string;
  vendor: string;
  vendorId: string;
  disbursementDate: string;
  status: string;
};

export type PendingAgent = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  lastActive: Date;
  lga?: string;
  state?: string;
  status?: boolean;
  isOnline?: boolean;
  aggregator?: string;
  programName?: string;
  programId?: string;
  programType?: string;
  aggregatorDetails: AggregatorProgramDetails[];
};

export type AggregatorProgramDetails = {
  id: string;
  programId: string;
  aggregatorId: string;
};

export type ScoreSheet = {
  beneficiaryId: string;
  answers: Answer[];
};

export type Answer = {
  answerId: string;
  score: number;
  value: string;
  question: string;
};

export type VettingOfficers = {
  firstname: string;
  lastname: string;
  otherNames?: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  role?: string;
};

export type VettingOfficersDetails = {
  id: string;
  firstName: string;
  lastName: string;
  otherNames?: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  role?: string;
};

export type VettingOfficersOverview = {
  specializedRoles: number;
  superAdmins: number;
};

export type CreateWhiteListBucketPayload = {
  name: string;
  programId: string;
  vendorId?: string | number;
  amount?: number;
  beneficiaries?: string[];
  whitelistId?: string;
};

export type VettingOfficersDashboard = {
  programs: number;
  totalVetted: number;
  pendingApproval: number;
  successfulVetting: number;
  failedVetting: number;
};

export type VettingOfficersProgram = {
  id: string;
  name: string;
  programs: Program[];
};

export type VettingOfficersProgramGroups = {
  id: string;
  name: string;
  programCount: number;
};

export type VettingOfficersAnalytics = {
  pendingApproval: number;
  successfulVetting: number;
  failedVetting: number;
};

export type WhitelistDetails = {
  id: string;
  name: string;
  status: string;
  programName: string;
  vendorId: null | string;
  beneficiariesNo: number;
};

export type ExitingWhitelistPayload = {
  whitelistId: string;
  programId: string;
  beneficiaryIds: string[];
};

export type BeneficiaryForm = {
  form: APIResponse<Form>;
  user: { firstName: string; lastName: string; company: string; userCode: string };
  moduleName: string;
};

export type AddClientToProgram = {
  clientId: string;
  programId: string;
  objective: number;
  stateId: number;
  amountDisbursed: number;
};

export type ClientDetails = {
  programId: string;
  programName: string;
  programType: string;
  amountDisbursed: string | null;
  totalBeneficiaries: number;
};

export type VerifyDataPayload = {
  id: string;
  programId: string;
  type: IdType;
  bankCode?: string;
};
