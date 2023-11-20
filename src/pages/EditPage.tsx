import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import RecordForm from "../components/RecordForm";
import { useParams, useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import { FormValues, ModalContentType } from "../types/types";
import axios from "axios";
import MessageModal from "../components/MessageModal";

const EditPage: React.FC = () => {
  // Extract the record ID from the URL parameters
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState<FormValues | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>({
    title: "",
    message: "",
  });

  // Fetch the record details when the component mounts or the ID changes
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        // API call to get the record details
        const response = await axios.get(
          `http://localhost:3001/api/records/${id}`
        );
        // Set the fetched data as initial form values
        setInitialFormValues(response.data);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  // Function to navigate back to the list page
  const navigateToList = () => navigate("/list");

  // Handle form submission
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      // Ensure the record ID is available
      if (!id) {
        setModalContent({
          title: "Error",
          message: "An error occurred. Missing id.",
        });
        setShowModal(true);
        return;
      }
      // API call to update the record
      await axios.put(`http://localhost:3001/api/records/${id}`, values);
      // Set the modal content to indicate successful update
      setModalContent({
        title: "Success",
        message: "Record updated successfully!",
        linkTo: "/list",
        linkText: "Go to List",
        updatedRecordId: parseInt(id, 10),
      });
      setShowModal(true);
    } catch (error) {
      // Handle errors by showing an error message in the modal
      setModalContent({
        title: "Error",
        message: "An error occurred. Please try again.",
      });
      setShowModal(true);
    } finally {
      // Reset form submission state
      formikHelpers.setSubmitting(false);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IconButton onClick={navigateToList} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      {/* Display the RecordForm with the fetched initial values for editing */}
      {initialFormValues && (
        <RecordForm
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
          mode="edit"
          recordId={id}
          title="Edit Record"
        />
      )}
      {/* Modal component for displaying success or error messages */}
      <MessageModal
        open={showModal}
        title={modalContent.title}
        message={modalContent.message}
        onClose={handleCloseModal}
        linkTo={modalContent.linkTo}
        linkText={modalContent.linkText}
        recordId={modalContent.updatedRecordId}
      />
    </>
  );
};

export default EditPage;
