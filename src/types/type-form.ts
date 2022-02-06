export interface BasicForm {
  isValid: boolean;
  fields: { [x: string]: BasicFormField };
}

export interface BasicFormField {
  id: string;
  name?: string;
  type: string;
  label: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  url?: string;
  file?: File | null;
  files?: File[];
  required?: boolean;
  helperText?: string;
  error?: boolean;
}
