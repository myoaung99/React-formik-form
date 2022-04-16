import * as Yup from "yup";
import { useState } from "react";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";
import { Formik, Form, useField } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import useHTTP from "../hooks/useHTTP";
import ErrorModal from "../UI/ErrorModal";

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

// to do with POST response data
const transformData = (data) => {
  const id = data.name;
  const createNewItem = { ...data[id], id: id };

  console.log(createNewItem);
};

// And now we can use these
const AddForm = () => {
  // isolate request logic to useHTTP custom hook
  const { isLoading, error, sendHttp, isModalShow, modalHandler } = useHTTP();

  // error modal logic
  const modal = isModalShow && (
    <ErrorModal onClose={modalHandler}>
      <p className="h5">Something went wrong</p>
      <p className="my-4">{error}</p>
      <div className="text-end">
        <Button size="lg" color="danger" onClick={modalHandler}>
          Ok
        </Button>
      </div>
    </ErrorModal>
  );
  return (
    <div className="form-container p-3">
      <Formik
        initialValues={{
          Name: "",
          Quantity: "",
          Price: "",
          Category: "",
          Description: "",
        }}
        validationSchema={Yup.object({
          Name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          Quantity: Yup.number().positive().integer().required("Required"),
          Price: Yup.number().positive().required("Required"),
          Category: Yup.string()
            .oneOf(["food", "drink", "dryFood", "other"], "Invalid Item Type")
            .required("Required"),
          Description: Yup.string().max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const rand = Math.random();
          const newValues = {
            ...values,
            id: rand,
          };
          const requestConfig = {
            url: "https://react-5826f-default-rtdb.firebaseio.com/shop-items.json",
            method: "POST",
            body: newValues,
            headers: {
              "Content-Type": "application/json",
            },
          };
          sendHttp(requestConfig);
          setSubmitting(false);
        }}
      >
        <Form>
          {modal}
          <Container>
            <h1 className="text-center my-5">Add Items</h1>

            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Item Name"
                  name="Name"
                  type="text"
                  placeholder="Item"
                />
              </Col>

              <Col sm="12" md="6">
                <MyTextInput
                  label="Quantity"
                  name="Quantity"
                  type="number"
                  placeholder="Quantity"
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Price"
                  name="Price"
                  type="number"
                  placeholder="Price"
                />
              </Col>
              <Col sm="12" md="6">
                <MySelect label="Category" name="Category" type="select">
                  <option value="">Select a item type</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="dryFood">Dry Food</option>
                  <option value="other">Other</option>
                </MySelect>
              </Col>
            </Row>

            <Row>
              <Col>
                <MyTextArea
                  label="Description"
                  name="Description"
                  type="textarea"
                  rows="5"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <div>
                  <Button block color="primary" type="submit">
                    {isLoading ? "Loading..." : "Add"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
