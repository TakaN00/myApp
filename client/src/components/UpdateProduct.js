import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { updateProduct, updateProductImage } from '../slices/productSlice';
import { getCategories } from '../slices/categorySlice';

const UpdateProduct = ({product}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            title:product.title,
            desc: product.desc,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            onStock: product.onStock,
            discount: product.discount,
            featured: product.featured,
        }
    });
  
    const submitFnct = (data) => { 
        dispatch(updateProduct({id:product._id, ...data}))
        handleClose();
     }

     useEffect(() => {
      dispatch(getCategories());
    }, []);
    const categoryList = useSelector((state) => state.category.categoryList);

  return (
    <>
    <Button variant="primary" className="mb-2" size="lg" onClick={handleShow}>
      Edit
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form onSubmit={handleSubmit(submitFnct)}>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("title",{required: true})} type="text" placeholder="Title" />
          {errors.title && <p>All products must have a title</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control {...register("desc",{required: true})} type="text" as="textarea" rows={5}  placeholder="Description" />
          {errors.desc && <p>All products must have a description</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={(e)=>dispatch(updateProductImage({id:product._id, file: e.target.files[0]}))} type="file" accept='.png, .jpg, .jpeg' placeholder="Image" />
          {errors.img && <p>All products must have an image</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select {...register("category",{required: true})}>
          <option hidden>Category</option>
            {categoryList.map((category) => (
              <option value={category.title} key={category._id}>{category.title}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSubcategory">
          <Form.Label>Sub-Category</Form.Label>
          <Form.Control {...register("subcategory")} type="text" placeholder="Sub-Category" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control {...register("price",{required: true})} type="number" placeholder="Price" />
          {errors.price && <p>All products must have a price</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control {...register("discount")} type="number" placeholder="Discount" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicOnStock">
          <Form.Label>On Stock</Form.Label>
          <Form.Select {...register("onStock")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicOnFeatured">
          <Form.Label>Featured</Form.Label>
          <Form.Select {...register("featured")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>

        <br/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>


      </Modal.Body>
    </Modal>
  </>
  )
}

export default UpdateProduct