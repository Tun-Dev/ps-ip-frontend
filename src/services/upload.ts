import axiosInstance from '@/lib/axios';
import type { APIResponse, FileUpload, UploadPayload } from '@/types';

export const uploadFile = async ({ files, type, onUploadProgress }: UploadPayload) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.set('type', type);
  const response = await axiosInstance.post<APIResponse<FileUpload[]>>('/uploads', formData, { onUploadProgress });
  return response.data;
};
