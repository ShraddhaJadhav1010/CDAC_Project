export const validateForm = (formData, formType) => {
  const errors = {};

  if (formType === "add") {
    // Validation for Add Document form
    if (
      !formData.aadharNo ||
      formData.aadharNo.length !== 12 ||
      !/^\d{12}$/.test(formData.aadharNo)
    ) {
      errors.aadharNo = "Please enter a valid 12-digit Aadhar number.";
    }

    if (!formData.panNo || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
      errors.panNo = "Please enter a valid PAN number.";
    }

    if (!formData.aadharCard) {
      errors.aadharCard = "Please upload your Aadhar card.";
    }

    if (!formData.panCard) {
      errors.panCard = "Please upload your PAN card.";
    }
  } else if (formType === "update") {
    // Validation for Update Document form
    if (
      !formData.searchAadhar ||
      formData.searchAadhar.length !== 12 ||
      !/^\d{12}$/.test(formData.searchAadhar)
    ) {
      errors.searchAadhar =
        "Please enter a valid 12-digit Aadhar number to search.";
    }
  }

  return errors;
};
