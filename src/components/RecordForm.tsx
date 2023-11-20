import React, { useState, useEffect } from "react";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Country, State, ICountry, IState } from "country-state-city";
import { RecordFormProps, FormValues } from "../types/types";
import { FormikHelpers } from "formik";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name is too long")
    .matches(/^[A-Za-z ]*$/, "Only letters are allowed"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+\d+$/, "Phone number must start with +"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  emailConfirm: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Email confirmation is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  agreementType: Yup.string().required("Agreement type is required"),
  acceptLicense: Yup.bool().oneOf(
    [true],
    "You must accept the license agreement"
  ),
});

const RecordForm: React.FC<RecordFormProps> = ({
  initialValues,
  onSubmit,
  mode,
  title,
}) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  // Fetch countries on component mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Initialize states if a country is already selected in edit mode
  useEffect(() => {
    if (mode === "edit" && initialValues.country) {
      const selectedCountry = countries.find(
        (c) => c.name === initialValues.country
      );
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      }
    }
  }, [mode, initialValues.country, countries]);

  // Adjust initialValues for edit mode
  const adjustedInitialValues = {
    ...initialValues,
    emailConfirm: initialValues.emailConfirm || initialValues.email,
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    // Convert country and state codes to names
    const selectedCountry = countries.find((c) => c.isoCode === values.country);
    const selectedState = states.find((s) => s.isoCode === values.state);

    const processedValues = {
      ...values,
      country: selectedCountry ? selectedCountry.name : values.country,
      state: selectedState ? selectedState.name : values.state,
    };

    // Call the onSubmit prop with processed values
    await onSubmit(processedValues, formikHelpers);
  };

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const countryCode = e.target.value;
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.isoCode === countryCode
    );

    if (selectedCountry) {
      setStates(State.getStatesOfCountry(countryCode));
      setFieldValue("country", selectedCountry.isoCode);
      setFieldValue("state", ""); // Reset state field when country changes
    } else {
      setStates([]);
      setFieldValue("country", "");
    }
  };

  // Custom radio button field
  const RadioButton: React.FC<{
    label: string;
    value: string;
    name: string;
    type?: string;
  }> = ({ label, ...props }) => {
    const [field] = useField(props);
    return <FormControlLabel {...field} control={<Radio />} label={label} />;
  };

  // Custom checkbox field
  const CheckboxButton: React.FC<{
    children: React.ReactNode;
    name: string;
  }> = ({ children, ...props }) => {
    const [field] = useField({ ...props, type: "checkbox" });
    return (
      <FormControlLabel {...field} control={<Checkbox />} label={children} />
    );
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Heading and Icon */}
        <Typography variant="h4" component="h1" pb="2%" gutterBottom>
          <CreateIcon color="primary" sx={{ mr: 2, verticalAlign: "middle" }} />
          {title}
        </Typography>

        <Formik
          initialValues={adjustedInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            return (
              <Form>
                <Grid container spacing={2} justifyContent="center" ml={"10%"}>
                  {/* Form fields structured within Grid for layout */}
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone Number"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      name="emailConfirm"
                      label="Email Confirm"
                      error={
                        touched.emailConfirm && Boolean(errors.emailConfirm)
                      }
                      helperText={touched.emailConfirm && errors.emailConfirm}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      select
                      SelectProps={{ native: true }}
                      name="country"
                      value={values.country}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleCountryChange(e, setFieldValue)
                      }
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      select
                      SelectProps={{ native: true }}
                      name="state"
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    >
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioGroup name="agreementType">
                      <RadioButton
                        name="agreementType"
                        type="radio"
                        value="license"
                        label="By License Agreement"
                      />
                      <RadioButton
                        name="agreementType"
                        type="radio"
                        value="mutual"
                        label="By Mutual Agreement"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {values.agreementType === "license" && (
                      <FormGroup>
                        <CheckboxButton name="acceptLicense">
                          Accept License Agreement
                        </CheckboxButton>
                      </FormGroup>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {values.agreementType === "mutual" && (
                      <FormGroup>
                        <CheckboxButton name="sendNewsEmail">
                          Send me news by email
                        </CheckboxButton>
                      </FormGroup>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={
                        !values.agreementType ||
                        (values.agreementType === "license" &&
                          !values.acceptLicense) ||
                        isSubmitting
                      }
                      startIcon={
                        isSubmitting ? <CircularProgress size={20} /> : null
                      }
                    >
                      {mode === "create" ? "Create" : "Update"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default RecordForm;
