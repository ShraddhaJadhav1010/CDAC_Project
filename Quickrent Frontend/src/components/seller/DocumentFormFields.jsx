// import React from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";

// function DocumentFormFields({
//   formData,
//   errors,
//   handleInputChange,
//   handleFileChange,
//   handleSubmit,
//   submitButtonText,
//   isUpdate = false,
// }) {
//   return (
//     <Form onSubmit={handleSubmit}>
//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Aadhar Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="aadharNo"
//               value={formData.aadharNo}
//               onChange={handleInputChange}
//               isInvalid={!!errors.aadharNo}
//               placeholder="Enter 12-digit Aadhar number"
//               maxLength={12}
//               disabled={isUpdate}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.aadharNo}
//             </Form.Control.Feedback>
//             <Form.Text className="text-muted">
//               Enter a valid 12-digit Aadhar number
//             </Form.Text>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               Aadhar Card{" "}
//               {isUpdate && formData.existingAadharCard && "(Optional)"}
//             </Form.Label>
//             <Form.Control
//               type="file"
//               name="aadharCard"
//               onChange={handleFileChange}
//               isInvalid={!!errors.aadharCard}
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.aadharCard}
//             </Form.Control.Feedback>
//             <Form.Text className="text-muted">
//               {isUpdate
//                 ? "Upload new Aadhar card if you want to update (PDF, JPG, PNG - max 5MB)"
//                 : "Upload Aadhar card (PDF, JPG, PNG - max 5MB)"}
//             </Form.Text>
//           </Form.Group>
//         </Col>

//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>PAN Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="panNo"
//               value={formData.panNo}
//               onChange={handleInputChange}
//               isInvalid={!!errors.panNo}
//               placeholder="Enter 10-character PAN number"
//               maxLength={10}
//               style={{ textTransform: "uppercase" }}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.panNo}
//             </Form.Control.Feedback>
//             <Form.Text className="text-muted">
//               Enter a valid 10-character PAN number (e.g., ABCDE1234F)
//             </Form.Text>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               PAN Card {isUpdate && formData.existingPanCard && "(Optional)"}
//             </Form.Label>
//             <Form.Control
//               type="file"
//               name="panCard"
//               onChange={handleFileChange}
//               isInvalid={!!errors.panCard}
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.panCard}
//             </Form.Control.Feedback>
//             <Form.Text className="text-muted">
//               {isUpdate
//                 ? "Upload new PAN card if you want to update (PDF, JPG, PNG - max 5MB)"
//                 : "Upload PAN card (PDF, JPG, PNG - max 5MB)"}
//             </Form.Text>
//           </Form.Group>
//         </Col>
//       </Row>

//       <Button variant="primary" type="submit">
//         {submitButtonText}
//       </Button>
//     </Form>
//   );
// }

// export default DocumentFormFields;
