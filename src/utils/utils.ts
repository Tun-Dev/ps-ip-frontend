import type { User } from '@/types';
import { AxiosError } from 'axios';
import {
  MdArrowDropDown,
  MdCheck,
  MdCloudUpload,
  MdDateRange,
  MdEmail,
  MdFormatAlignLeft,
  MdFormatListBulleted,
  MdGpsFixed,
  MdNumbers,
  MdPerson,
  MdPhone,
  MdQuestionMark,
} from 'react-icons/md';
import { ShortAnswerIcon } from '../../public/icons';

export const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
};

export const formatErrorMessage = (error: unknown) => {
  let message = 'An unknown error occurred';
  if (error instanceof Error) message = error.message;
  if (error instanceof AxiosError) message = error.response?.data.message || message;
  return message;
};

export const getDropdownIcon = (name: string) => {
  switch (name) {
    case 'SHORT_TEXT':
      return ShortAnswerIcon;
    case 'LONG_TEXT':
      return MdFormatAlignLeft;
    case 'DROPDOWN':
      return MdArrowDropDown;
    case 'DATE':
      return MdCloudUpload;
    case 'UPLOAD':
      return MdDateRange;
    case 'MULTIPLE_CHOICE':
      return MdFormatListBulleted;
    case 'CHECKBOX':
      return MdCheck;
    case 'EMAIL':
      return MdEmail;
    case 'PHONE_NUMBER':
      return MdPhone;
    case 'KYC':
      return MdPerson;
    case 'NUMBER':
      return MdNumbers;
    case 'GPS':
      return MdGpsFixed;
    default:
      return MdQuestionMark;
  }
};

export const getDropdownName = (name: string) => {
  switch (name) {
    case 'SHORT_TEXT':
      return 'Short answer';
    case 'LONG_TEXT':
      return 'Paragraph';
    case 'DROPDOWN':
      return 'Dropdown';
    case 'DATE':
      return 'Date';
    case 'UPLOAD':
      return 'File upload';
    case 'MULTIPLE_CHOICE':
      return 'Multiple choice';
    case 'CHECKBOX':
      return 'Checkbox';
    case 'EMAIL':
      return 'Email';
    case 'PHONE_NUMBER':
      return 'Phone number';
    case 'KYC':
      return 'KYC';
    case 'NUMBER':
      return 'Number';
    default:
      return name;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renameKey(obj: any, oldKey: string, newKey: string) {
  if (!(oldKey in obj)) {
    return obj;
  }
  const newObj = {
    ...obj,
    [newKey]: obj[oldKey],
  };
  delete newObj[oldKey];
  return newObj;
}

export const formatDateForInput = (isoString: string) => {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const getDashboardRoute = (user: User | null) => {
  if (!user || !user.roles || user.roles.length < 1) return '/login';
  switch (user.roles[0]) {
    case 'Super Admin':
      return '/super-admin';
    case 'Vendor':
      return '/vendors';
    case 'Aggregator':
      return '/aggregators';
    case 'Agent':
      return '/aggregators';
    case 'Partner':
      return '/clients';
    default:
      return '/login';
  }
};

export const getImageUrl = (url: string) => {
  return url.startsWith('http') ? url : `https://boi-ip-is.s3.eu-north-1.amazonaws.com/${url}`;
};
