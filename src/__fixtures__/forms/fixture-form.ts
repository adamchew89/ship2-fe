import { BasicForm, BasicFormField } from "z@Types/type-form";

export const fields: { [x: string]: BasicFormField } = {
  required: {
    id: "required",
    type: "required",
    label: "Required",
    required: true,
  },
  nullable: {
    id: "nullable",
    type: "nullable",
    label: "Nullable",
    required: false,
  },
  email: {
    id: "email",
    type: "email",
    label: "Email",
    required: false,
  },
  mobile: {
    id: "mobile",
    type: "mobile",
    label: "Mobile",
    required: false,
  },
};

export const form: BasicForm = {
  isValid: false,
  fields,
};
