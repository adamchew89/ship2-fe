import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import React from "react";
import * as FixtureForm from "z@Fixtures/forms/fixture-form";
import { BasicFormField } from "z@Types/type-form";
import Field from "./Field";

interface MockFormProps {
  field: BasicFormField;
}

function MockForm(props: MockFormProps) {
  const [value, setValue] = React.useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form>
      <Field {...props.field} onChange={changeHandler} value={value} />
      <button data-testid="BlurTriggerBtn" onClick={submitHandler}>
        Blur
      </button>
    </form>
  );
}

describe("[Field]", () => {
  it("should render without crashing", () => {
    render(<MockForm field={FixtureForm.fields.required} />);
    expect(screen.getByTestId("Field")).toBeInTheDocument();
  });

  describe("[Required]", () => {
    let requiredInputField: HTMLInputElement;
    let blurTriggerBtn: HTMLButtonElement;
    beforeEach(() => {
      render(<MockForm field={FixtureForm.fields.required} />);
      requiredInputField = screen.getByRole("input");
      blurTriggerBtn = screen.getByTestId("BlurTriggerBtn");
    });

    it("should be valid by default", () => {
      expect(requiredInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be valid after population", () => {
      UserEvent.click(requiredInputField);
      UserEvent.keyboard("A");
      UserEvent.click(blurTriggerBtn);
      expect(requiredInputField).toHaveAttribute("value", "A");
      expect(requiredInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be invalid after population and clearing", () => {
      UserEvent.click(requiredInputField);
      UserEvent.keyboard("A");
      UserEvent.clear(requiredInputField);
      UserEvent.click(blurTriggerBtn);
      expect(requiredInputField).toHaveAttribute("value", "");
      expect(requiredInputField).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("[Nullable]", () => {
    let nullableInputField: HTMLInputElement;
    let blurTriggerBtn: HTMLButtonElement;
    beforeEach(() => {
      render(<MockForm field={FixtureForm.fields.nullable} />);
      nullableInputField = screen.getByRole("input");
      blurTriggerBtn = screen.getByTestId("BlurTriggerBtn");
    });

    it("should be valid by default", () => {
      expect(nullableInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be valid after population", () => {
      UserEvent.click(nullableInputField);
      UserEvent.keyboard("A");
      UserEvent.click(blurTriggerBtn);
      expect(nullableInputField).toHaveAttribute("value", "A");
      expect(nullableInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be valid after population and clearing", () => {
      UserEvent.click(nullableInputField);
      UserEvent.keyboard("A");
      UserEvent.clear(nullableInputField);
      UserEvent.click(blurTriggerBtn);
      expect(nullableInputField).toHaveAttribute("value", "");
      expect(nullableInputField).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("[Email]", () => {
    let emailInputField: HTMLInputElement;
    let blurTriggerBtn: HTMLButtonElement;
    beforeEach(() => {
      render(<MockForm field={FixtureForm.fields.email} />);
      emailInputField = screen.getByRole("input");
      blurTriggerBtn = screen.getByTestId("BlurTriggerBtn");
    });

    it("should be valid by default", () => {
      expect(emailInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be valid after population of valid email", () => {
      UserEvent.click(emailInputField);
      UserEvent.keyboard("test@test.test");
      UserEvent.click(blurTriggerBtn);
      expect(emailInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be invalid after population of invalid email", () => {
      UserEvent.click(emailInputField);
      UserEvent.keyboard("A");
      UserEvent.click(blurTriggerBtn);
      expect(emailInputField).toHaveAttribute("value", "A");
      expect(emailInputField).toHaveAttribute("aria-invalid", "true");
    });

    it("should be valid after population and clearing", () => {
      UserEvent.click(emailInputField);
      UserEvent.keyboard("A");
      UserEvent.clear(emailInputField);
      UserEvent.click(blurTriggerBtn);
      expect(emailInputField).toHaveAttribute("value", "");
      expect(emailInputField).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("[Mobile]", () => {
    let mobileInputField: HTMLInputElement;
    let blurTriggerBtn: HTMLButtonElement;
    beforeEach(() => {
      render(<MockForm field={FixtureForm.fields.mobile} />);
      mobileInputField = screen.getByRole("input");
      blurTriggerBtn = screen.getByTestId("BlurTriggerBtn");
    });

    it("should be valid by default", () => {
      expect(mobileInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be valid after population of valid mobile", () => {
      UserEvent.click(mobileInputField);
      UserEvent.keyboard("88088808");
      UserEvent.click(blurTriggerBtn);
      expect(mobileInputField).toHaveAttribute("aria-invalid", "false");
    });

    it("should be invalid after population of invalid mobile", () => {
      UserEvent.click(mobileInputField);
      UserEvent.keyboard("a");
      UserEvent.click(blurTriggerBtn);
      expect(mobileInputField).toHaveAttribute("aria-invalid", "true");
    });

    it("should be valid after population and clearing", () => {
      UserEvent.click(mobileInputField);
      UserEvent.keyboard("1");
      UserEvent.clear(mobileInputField);
      UserEvent.click(blurTriggerBtn);
      expect(mobileInputField).toHaveAttribute("value", "");
      expect(mobileInputField).toHaveAttribute("aria-invalid", "false");
    });
  });
});
