import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../slices/productSlice";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../slices/categorySlice";

const AddProduct = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseNav = () => {
    setShow(false);
    nav("/productlist");
  };
  const handleCloseReset = () => {
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
    dispatch(addProduct({ ...data, file: fileUpload }));
    handleShow();
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categoryList = useSelector((state) => state.category.categoryList);

  return (
    <div className="addForm">
      <Form onSubmit={handleSubmit(submitFnct)}>
        <h2>Add a new product</h2>
        <br />

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
          />
          {errors.title && <p className="alert-message">All products must have a title</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            {...register("desc", { required: true })}
            type="text"
            as="textarea"
            rows={3}
            placeholder="Description"
          />
          {errors.desc && <p className="alert-message">All products must have a description</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setFileUpload(e.target.files[0])}
            type="file"
            accept=".png, .jpg, .jpeg"
            placeholder="Image"
          />
          {errors.img && <p className="alert-message">All products must have an image</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select {...register("category", { required: true })}>
            <option hidden>Category</option>
            {categoryList.map((category) => (
              <option value={category.title} key={category._id}>{category.title}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSubcategory">
          <Form.Label>Sub-Category</Form.Label>
          <Form.Control
            {...register("subcategory")}
            type="text"
            placeholder="Sub-Category"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            {...register("price", { required: true })}
            type="number"
            placeholder="Price"
          />
          {errors.price && <p className="alert-message">All products must have a price</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your new product has been successfully added</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseReset} size="sm">
            Add New One
          </Button>
          <Button variant="success" onClick={handleCloseNav} size="sm">
            See Product List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;
