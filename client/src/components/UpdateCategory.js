import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateCategory, updateCategoryImage } from "../slices/categorySlice";

const UpdateCategory = ({category}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues:{
        title:category.title,
        featured: category.featured,
    }
});

  const submitFnct = (data) => {
    dispatch(updateCategory({id:category._id, ...data}))
    handleClose();
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit category</Modal.Title>
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
              {errors.title && <p>All categories must have a title</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={(e)=>dispatch(updateCategoryImage({id:category._id, file: e.target.files[0]}))} type="file" accept='.png, .jpg, .jpeg' placeholder="Image" />
          {errors.img && <p>All categories must have an image</p>}
        </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicOnFeatured">
          <Form.Label>Featured</Form.Label>
          <Form.Select {...register("featured")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>

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

export default UpdateCategory;
