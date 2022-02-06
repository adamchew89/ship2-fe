import { BasicForm } from "z@Types/type-form";

const baseForm: BasicForm = {
  isValid: false,
  fields: {
    name: {
      id: "name",
      type: "text",
      label: "",
      value: "",
      required: true,
    },
    mobile: {
      id: "mobile",
      type: "mobile",
      label: "",
      value: "",
      required: true,
    },
    pin: {
      id: "pin",
      type: "password",
      label: "",
      value: "",
      required: true,
    },
  },
};

export default baseForm;
