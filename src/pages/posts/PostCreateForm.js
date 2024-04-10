import React, { useState } from 'react';
import ProductsPanel from '../../components/ProductsPanel';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import BodySystemPanel from '../../components/BodySystemPanel';
import styles from '../../styles/PostCreateForm.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRedirect } from '../../hooks/useRedirect';

function PostCreateForm() {
    useRedirect('loggedOut');
    const [selectedBodySystems, setSelectedBodySystems] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage] = useState(null);
    const [customImage, setCustomImage] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState(null);

    /* Toggle selection of body system */
    const toggleBodySystem = (system) => {
        if (selectedBodySystems.includes(system)) {
            setSelectedBodySystems(
                selectedBodySystems.filter((item) => item !== system)
            );
        } else {
            setSelectedBodySystems([...selectedBodySystems, system]);
        }
    };

    /* Add a product to selected products for the post */
    const handleAddProduct = (product) => {
        const isProductExists = selectedProducts.some(
            (p) => p.id === product.id
        );
        if (!isProductExists) {
            setSelectedProducts((prevProducts) => [...prevProducts, product]);
            toast.success(`${product.name} added successfully!`);
        } else {
            toast.warn(`Product "${product.name}" is already added!`);
        }
    };

    /* Remove a product from selected products */
    const handleRemoveProduct = (productId) => {
        const removedProduct = selectedProducts.find(
            (product) => product.id === productId
        );
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
        toast.success(`${removedProduct.name} removed successfully!`);
    };

    /* Move to previous product in the selected product post area */
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    /* Move to previous product in the selected product post area */
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, selectedProducts.length - 2)
        );
    };

    /* Handle change in custom image input by uploading user image choice */
    const MAX_IMAGE_SIZE_MB = 4;
    const MAX_IMAGE_WIDTH = 4096;
    const MAX_IMAGE_HEIGHT = 4096;
    const handleCustomImageChange = (event) => {
        if (event.target.files.length) {
            const selectedFile = event.target.files[0];
            const fileSizeMB = selectedFile.size / (1024 * 1024);
            if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
                toast.error(
                    'Image size exceeds the maximum allowed limit of 4MB.'
                );
                return;
            }
            const img = document.createElement('img');
            img.onload = function () {
                if (this.width > MAX_IMAGE_WIDTH) {
                    toast.error(
                        'Image width exceeds the maximum allowed limit of 4096px.'
                    );
                    return;
                }
                if (this.height > MAX_IMAGE_HEIGHT) {
                    toast.error(
                        'Image height exceeds the maximum allowed limit of 4096px.'
                    );
                    return;
                }
                setCustomImage(URL.createObjectURL(selectedFile));
                setImage(selectedFile);
            };
            img.src = URL.createObjectURL(selectedFile);
        }
    };

    /* Handle form submission */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please upload an image before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        selectedProducts.forEach((product) => {
            formData.append('products', product.id);
        });

        try {
            const response = await axios.post('/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            /* Redirect to the newly created post */
            history.push(`/posts/${response.data.id}`);
            toast.success('Post created successfully!');
        } catch (error) {
            setErrors(error.response?.data);
        }
    };

    return (
        <Container>
            <Row>
                {/* Form for Creating a Post */}
                <Col lg={6}>
                    <div className={styles['center-div']}>
                        <Form
                            onSubmit={handleSubmit}
                            action="/posts/"
                            method="post"
                            encType="multipart/form-data"
                        >
                            {(selectedImage || customImage) && (
                                <div className="text-center">
                                    <Image
                                        src={customImage || selectedImage}
                                        alt="Post image"
                                        className={`mb-3 ${styles['preview-image']}`}
                                        fluid
                                    />
                                </div>
                            )}

                            <Form.Group controlId="customImage">
                                <Form.Label></Form.Label>
                                <Form.File
                                    accept="image/*"
                                    onChange={handleCustomImageChange}
                                    custom
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="customImage"
                                    className={styles['upload-button']}
                                >
                                    <FontAwesomeIcon icon={faUpload} /> Click to
                                    add or change the post image
                                </label>
                            </Form.Group>

                            <Row className="align-items-center justify-content-center  d-none d-lg-flex">
                                {selectedProducts.length > 2 &&
                                    currentIndex > 0 && (
                                        <Button
                                            onClick={handlePrevClick}
                                            className={styles['arrow-button']}
                                        >
                                            <FaChevronLeft />
                                        </Button>
                                    )}
                                {selectedProducts
                                    .slice(currentIndex, currentIndex + 2)
                                    .map((product) => (
                                        <Col key={product.id} sm={4}>
                                            <div
                                                key={product.id}
                                                className={
                                                    styles['product-post-card']
                                                }
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fluid
                                                />
                                                <h5>{product.name}</h5>
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        handleRemoveProduct(
                                                            product.id
                                                        )
                                                    }
                                                    className={
                                                        styles['remove-button']
                                                    }
                                                >
                                                    <BsX />
                                                </Button>
                                            </div>
                                        </Col>
                                    ))}

                                {selectedProducts.length > 2 &&
                                    currentIndex + 2 <
                                        selectedProducts.length && (
                                        <Button
                                            onClick={handleNextClick}
                                            className={styles['arrow-button']}
                                        >
                                            <FaChevronRight />
                                        </Button>
                                    )}
                            </Row>
                            <div className="d-md-none-custom text-center mb-3">
                                <h6>Selected Products:</h6>
                            </div>
                            <Row className="d-md-none-custom d-lg-none">
                                {selectedProducts.map((product) => (
                                    <Col
                                        key={product.id}
                                        xs={12}
                                        className="mb-3"
                                    >
                                        <div
                                            className={
                                                styles['product-container-post']
                                            }
                                        >
                                            <span>{product.name}</span>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleRemoveProduct(
                                                        product.id
                                                    )
                                                }
                                                className={`remove-product-small ${styles['remove-button']}`}
                                            >
                                                <BsX />
                                            </Button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <Form.Control
                                type="text"
                                placeholder="Add a title for your post"
                                className="mb-3 input-border"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            {errors?.title?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}
                            <Form.Control
                                as="textarea"
                                rows={6}
                                className="mb-3 input-border"
                                placeholder="Write a description on what this miracle combination of products has done for you."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors?.description?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={styles['post-create-button']}
                                >
                                    Create Post
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
                {/* Panels for Selecting Body Systems and Products */}
                <Col lg={6}>
                    <div className={styles['center-div']}>
                        <BodySystemPanel
                            selectedBodySystems={selectedBodySystems}
                            toggleBodySystem={toggleBodySystem}
                        />
                        <ProductsPanel
                            selectedBodySystems={selectedBodySystems}
                            onAddProduct={handleAddProduct}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PostCreateForm;
