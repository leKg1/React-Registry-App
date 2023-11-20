import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecordForm from "../components/RecordForm";
import { initialValues } from "../utils/formConfig";
import { FormikHelpers } from "formik";
import { FormValues, ModalContentType } from "../types/types";
import axios from "axios";
import MessageModal from "../components/MessageModal";

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  // State for controlling the display and content of the modal
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<ModalContentType>({
    title: "",
    message: "",
  });

  // Function to navigate back to the list page
  const navigateToList = () => navigate("/list");

  // handleSubmit: Function to handle form submission
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      // API call to create a new record
      const response = await axios.post(
        "http://localhost:3001/api/records",
        values
      );
      // Update modal content on successful record creation
      setModalContent({
        title: "Success",
        message: "Record created successfully!",
        linkTo: "/list",
        linkText: "Go to List",
        newRecordId: response.data.id,
      });
      setShowModal(true);
    } catch (error) {
      setModalContent({
        title: "Error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      // Stop form submission (loading state)
      formikHelpers.setSubmitting(false);
    }
  };

  // handleCloseModal: Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IconButton onClick={navigateToList} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      {/* Record Form for creating a new record */}
      <RecordForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mode="create"
        title="Create New Record"
      />
      {/* Modal for displaying messages after form submission */}
      <MessageModal
        open={showModal}
        title={modalContent.title}
        message={modalContent.message}
        onClose={handleCloseModal}
        linkTo={modalContent.linkTo}
        linkText={modalContent.linkText}
        recordId={modalContent.newRecordId}
      />
    </>
  );
};

export default CreatePage;
