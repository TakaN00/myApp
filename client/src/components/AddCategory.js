import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCategory } from "../slices/categorySlice";

const AddCategory = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const [fileUpload, setFileUpload] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitFnct = (data) => {
    dispatch(addCategory({ ...data, file: fileUpload }));
    handleClose();
    reset();
  };

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}>
      <i className="bi bi-plus-circle"></i> Add new category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                {...register("title", { required: true })}
                type="text"
                placeholder="Title"
              />
              {errors.title && <p className="alert-message">All categories must have a title</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={(e) => setFileUpload(e.target.files[0])}
                type="file"
                accept=".png, .jpg, .jpeg"
                placeholder="Image"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicOnFeatured">
          <Form.Label>Featured</Form.Label>
          <Form.Select {...register("featured")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group> */}

            <br />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit(submitFnct)}
                type="submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategory;
