import * as Yup from "yup";
import { Button, Col, Container, Row } from "reactstrap";
import { Formik, Form } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import useHTTP from "../hooks/useHTTP";
import ErrorModal from "../UI/ErrorModal";
import useFormikField from "../hooks/useFormikField";

// And now we can use these
const AddForm = (props) => {
  // isolate generic formik components to useFormik custom hook
  const { MyTextInput, MyTextArea, MySelect } = useFormikField();

  // isolate request logic to useHTTP custom hook
  const {
    isLoading,
    error,
    sendHttp: sendItemRequest,
    isModalShow,
    modalHandler,
  } = useHTTP();

  const createItem = (itemInfo, itemData) => {
    const generatedId = itemData.name;
    const createdItem = { id: generatedId, ...itemInfo };

    props.onAddItem(createdItem);
  };

  const enterItemHandler = async (itemInfo) => {
    sendItemRequest(
      {
        url: "https://react-5826f-default-rtdb.firebaseio.com/shop-items.json",
        method: "POST",
        body: itemInfo,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createItem.bind(null, itemInfo)
    );
  };

  // conditional error modal logic
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
          name: "",
          quantity: "",
          price: "",
          category: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          quantity: Yup.number().positive().integer().required("Required"),
          price: Yup.number().positive().required("Required"),
          category: Yup.string()
            .oneOf(["food", "drink", "dryFood", "other"], "Invalid Item Type")
            .required("Required"),
          description: Yup.string().max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // random number for ID
          const rand = Math.random();
          // new Object value with ID
          const newValues = {
            ...values,
            id: rand,
          };

          // call http function
          enterItemHandler(newValues);
          setSubmitting(false);
        }}
      >
        <Form>
          {modal}
          <Container>
            <h1 className="text-center my-5">Add Item</h1>
            {/* Item Name and Quantity Row*/}
            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Item Name"
                  name="name"
                  type="text"
                  placeholder="Item"
                />
              </Col>

              <Col sm="12" md="6">
                <MyTextInput
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                />
              </Col>
            </Row>

            {/* Price and Select Row*/}
            <Row>
              <Col sm="12" md="6">
                <MyTextInput
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Price"
                />
              </Col>
              <Col sm="12" md="6">
                <MySelect label="Category" name="category" type="select">
                  <option value="">Select a item type</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="dryFood">Dry Food</option>
                  <option value="other">Other</option>
                </MySelect>
              </Col>
            </Row>
            {/* Description Row*/}
            <Row>
              <Col>
                <MyTextArea
                  label="Description"
                  name="description"
                  type="textarea"
                  rows="5"
                />
              </Col>
            </Row>

            {/* Form action*/}
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
