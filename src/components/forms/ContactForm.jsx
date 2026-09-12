import { useState } from "react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { WhatsAppButton } from "../common/ContactButtons";
import {
  enquiryRequirements,
  submitEnquiry,
} from "../../services/enquiryService";
import { isValidIndianMobile } from "../../utils/phone";
import { whatsappMessages } from "../../utils/whatsapp";
import "./ContactForm.css";

const EMPTY_FORM = {
  name: "",
  phone: "",
  requirement: "",
  message: "",
};

/** Frontend-only validation. No data leaves the browser in this version. */
const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (!values.requirement) {
    errors.requirement = "Please select what you need help with.";
  }

  return errors;
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [result, setResult] = useState(null);

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }));
    }
  };

  const onBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, requirement: true, message: true });

    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await submitEnquiry(values);
      setResult(response);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setResult(null);
    setStatus("idle");
  };

  if (status === "success") {
    const requirementLabel =
      enquiryRequirements.find((item) => item.value === values.requirement)
        ?.label ?? values.requirement;

    return (
      <div className="contact-form contact-form--success" role="status">
        <span className="contact-form__success-icon">
          <Icon name="check" size={26} />
        </span>
        <h3 className="contact-form__success-title">
          Thank you! Your enquiry has been recorded for this demo.
        </h3>
        <p className="contact-form__success-text">
          Our team will contact you after backend integration. Nothing has been
          sent to Tejas Agency yet — this version of the website has no backend,
          so the details below stayed in your browser.
        </p>
        <dl className="contact-form__summary">
          <div>
            <dt>Reference</dt>
            <dd>{result?.reference}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{values.name}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{values.phone}</dd>
          </div>
          <div>
            <dt>Requirement</dt>
            <dd>{requirementLabel}</dd>
          </div>
        </dl>
        <p className="contact-form__success-text">
          To reach us right now, send the same details on WhatsApp:
        </p>
        <div className="contact-form__success-actions">
          <WhatsAppButton
            message={whatsappMessages.enquiry({
              ...values,
              requirement: requirementLabel,
            })}
          >
            Send on WhatsApp
          </WhatsAppButton>
          <Button variant="secondary" onClick={reset}>
            Submit another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <p className="contact-form__intro">
        Share a few details and we will get back to you. Fields marked with{" "}
        <span aria-hidden="true">*</span> are required.
      </p>

      <div className="form-field">
        <label htmlFor="name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          onBlur={onBlur("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name ? (
          <p className="form-field__error" id="name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="phone">
          Phone number <span aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          value={values.phone}
          onChange={setField("phone")}
          onBlur={onBlur("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          required
        />
        {errors.phone ? (
          <p className="form-field__error" id="phone-error">
            {errors.phone}
          </p>
        ) : (
          <p className="form-field__hint" id="phone-hint">
            We use this only to call you back about your enquiry.
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="requirement">
          Requirement <span aria-hidden="true">*</span>
        </label>
        <select
          id="requirement"
          name="requirement"
          value={values.requirement}
          onChange={setField("requirement")}
          onBlur={onBlur("requirement")}
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? "requirement-error" : undefined}
          required
        >
          <option value="">Select a requirement</option>
          {enquiryRequirements.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.requirement ? (
          <p className="form-field__error" id="requirement-error">
            {errors.requirement}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Tell us about your water source, family size or the problem you are facing."
          value={values.message}
          onChange={setField("message")}
          onBlur={onBlur("message")}
        />
      </div>

      {status === "error" ? (
        <p className="form-field__error form-field__error--form" role="alert">
          Something went wrong while recording your enquiry. Please try again or
          message us on WhatsApp.
        </p>
      ) : null}

      <div className="contact-form__actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Submit Enquiry"}
        </Button>
        <WhatsAppButton size="lg" variant="secondary">
          Or message on WhatsApp
        </WhatsAppButton>
      </div>

      <p className="contact-form__note">
        Demo build: this form is frontend only. Submissions are validated in the
        browser and are not sent anywhere yet.
      </p>
    </form>
  );
}
