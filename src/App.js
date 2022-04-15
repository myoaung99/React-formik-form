import React from "react";
import { useFormik } from "formik";
import "./App.css";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { email: "", firstName: "", lastName: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

export default App;
