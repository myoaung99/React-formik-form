import React from "react";
import { FormGroup, Input } from "reactstrap";
import { useField } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const useFormikField = () => {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormGroup>
        <label className="py-1" htmlFor={props.id || props.name}>
          {label}
        </label>
        <Input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormGroup>
        <label className="py-1" htmlFor={props.id || props.name}>
          {label}
        </label>
        <Input className="text-area" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormGroup>
        <label className="py-1" htmlFor={props.id || props.name}>
          {label}
        </label>
        <Input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };

  return {
    MyTextInput,
    MyTextArea,
    MySelect,
  };
};

export default useFormikField;
