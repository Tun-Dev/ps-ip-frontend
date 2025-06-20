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
  MdImage,
  MdNumbers,
  MdPerson,
  MdPhone,
  MdQuestionMark,
} from 'react-icons/md';
import { z } from 'zod';
import { ShortAnswerIcon } from '../../public/icons';
import { FILE_SIZE_LIMITS } from './constants';

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
    case 'IMAGE_UPLOAD':
      return MdImage;
    case 'FILE_UPLOAD':
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
    case 'IMAGE_UPLOAD':
      return 'Image';
    case 'FILE_UPLOAD':
      return 'File';
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

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Return the formatted date as dd-mm-yyyy
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const snakeToTitleCase = (str: string) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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
    case 'Client':
      return '/clients';
    case 'Vetting Officer':
      return '/vetting-officers';
    default:
      return '/login';
  }
};

export const getImageUrl = (url: string) => {
  return url.startsWith('http') ? url : `https://boi-ip-is.s3.eu-north-1.amazonaws.com/${url}`;
};

export const imageSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, 'Expected a file')
  .refine(
    (file) => file.size <= FILE_SIZE_LIMITS.images,
    `Image size should be less than ${FILE_SIZE_LIMITS.images / (1024 * 1024)}MB.`
  )
  .refine((file) => file.type.startsWith('image/'), 'Only images are allowed');

export const fileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, 'Expected a file')
  .refine(
    (file) => {
      if (file.type.startsWith('image/')) return file.size <= FILE_SIZE_LIMITS.images;

      if (file.type.startsWith('video/')) return file.size <= FILE_SIZE_LIMITS.videos;

      return file.size <= FILE_SIZE_LIMITS.documents;
    },
    (file) => {
      if (file.type.startsWith('image/'))
        return { message: `Image size should be less than ${FILE_SIZE_LIMITS.images / (1024 * 1024)}MB.` };

      if (file.type.startsWith('video/'))
        return { message: `Video size should be less than ${FILE_SIZE_LIMITS.videos / (1024 * 1024)}MB.` };

      return { message: `Document size should be less than ${FILE_SIZE_LIMITS.documents / (1024 * 1024)}MB.` };
    }
  )
  .refine((file) => {
    const supportedFileTypes = [
      // Images
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // Videos
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/webm',
    ];
    return supportedFileTypes.includes(file.type);
  }, 'Unsupported file format');
