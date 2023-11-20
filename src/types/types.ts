import React, { ReactNode } from "react";
import { FormikHelpers } from "formik";

// Form values interface
export interface FormValues {
  name: string;
  phone: string;
  email: string;
  emailConfirm: string;
  country: string;
  state: string;
  agreementType: string;
  acceptLicense: boolean;
  sendNewsEmail: boolean;
}

export interface HideOnScrollProps {
  children: React.ReactElement;
}

export interface ModalContentType {
  title: string;
  message: string;
  linkTo?: string;
  linkText?: string;
  newRecordId?: number;
  updatedRecordId?: number;
}

export interface RecordFormProps {
  initialValues: FormValues;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
  mode: "create" | "edit";
  recordId?: string;
  title: string;
}

export interface Record {
  id: number;
  name: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city?: string; // Assuming we have a 'city' field
  createdDate: string;
  updatedDate: string;
}

export interface RecordContextType {
  records: Record[];
  setRecords: (records: Record[]) => void;
}

export interface RecordProviderProps {
  children: ReactNode;
}

export type SortConfig = {
  key: keyof Record | "geo" | ""; // Includes "geo" for nested sorting
  direction: "asc" | "desc" | ""; // Sorting direction
};

export type FilterConfig = {
  name: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  createdDate: string;
  updatedDate: string;
};

export interface HideOnScrollProps {
  children: React.ReactElement;
}

export interface MessageModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  linkTo?: string;
  linkText?: string;
  recordId?: number;
}
