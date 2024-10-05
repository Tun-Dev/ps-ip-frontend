import { MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft } from 'react-icons/md';
import { ShortAnswerIcon } from '../../public/icons';

export const OPTIONS = [
  { label: 'Short answer', value: 'Short answer', icon: ShortAnswerIcon },
  { label: 'Paragraph', value: 'Paragraph', icon: MdFormatAlignLeft },
  { label: 'Dropdown', value: 'Dropdown', icon: MdArrowDropDown },
  { label: 'Date', value: 'Date', icon: MdCloudUpload },
  { label: 'File upload', value: 'File upload', icon: MdDateRange },
] as const;
