import * as Yup from "yup";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";
import { Formik, Form, useField } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormGroup>
      <label htmlFor={props.id || props.name}>{label}</label>
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
      <label htmlFor={props.id || props.name}>{label}</label>
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
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </FormGroup>
  );
};

// And now we can use these
const AddForm = () => {
  return (
    <div className="form-container p-3">
      <Formik
        initialValues={{
          itemName: "",
          itemQty: "",
          itemPrice: "",
          itemCategory: "",
          itemDes: "",
        }}
        validationSchema={Yup.object({
          itemName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          itemQty: Yup.number().positive().integer().required("Required"),
          itemPrice: Yup.number().positive().required("Required"),
          itemCategory: Yup.string()
            .oneOf(["food", "drink", "dryFood", "other"], "Invalid Item Type")
            .required("Required"),
          itemDes: Yup.string().max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Container>
            <h1 className="text-center my-5">Add Items</h1>
            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Item Name"
                  name="itemName"
                  type="text"
                  placeholder="Item"
                />
              </Col>

              <Col sm="12" md="6">
                <MyTextInput
                  label="Quantity"
                  name="itemQty"
                  type="number"
                  placeholder="Quantity"
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Price"
                  name="itemPrice"
                  type="number"
                  placeholder="Price"
                />
              </Col>
              <Col sm="12" md="6">
                <MySelect label="Category" name="itemCategory" type="select">
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
                  name="itemDes"
                  type="textarea"
                  rows="5"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <div>
                  <Button block color="primary" type="submit">
                    Add
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
