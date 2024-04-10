import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert  } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProductsPanel from '../../components/ProductsPanel';
import BodySystemPanel from '../../components/BodySystemPanel';
import styles from '../../styles/PostCreateForm.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRedirect } from '../../hooks/useRedirect';

function PostEditForm({ post }) {
    useRedirect('loggedOut');
    const currentUser = useCurrentUser();
    const [selectedBodySystems, setSelectedBodySystems] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [customImage, setCustomImage] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState(null);

    /* Fetch post data on component mount */
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                const postData = response.data;
                setTitle(postData.title);
                setDescription(postData.description);
                setSelectedProducts(postData.products);
                setSelectedImage(postData.image);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    /* Update state with post data when received */
    useEffect(() => {
        if (!currentUser) {
            history.push('/');
        }
        if (post) {
            setTitle(post.title);
            setDescription(post.description);
            setSelectedProducts(post.products);
        }
    }, [currentUser, history, post]);

    /* Toggle selection of body system */
    const toggleBodySystem = (system) => {
        if (selectedBodySystems.includes(system)) {
            setSelectedBodySystems((prevSystems) =>
                prevSystems.filter((item) => item !== system)
            );
        } else {
            setSelectedBodySystems((prevSystems) => [...prevSystems, system]);
        }
    };

    /* Add a product to selected products for the post */
    const handleAddProduct = (product) => {
        const isProductExists = selectedProducts.some(
            (p) => p.id === product.id
        );
        if (!isProductExists) {
            setSelectedProducts((prevProducts) => [...prevProducts, product]);
        }
    };

    /* Remove a product from selected products */
    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    /* Move to previous product in the selected product post area. It is a scroll area. */
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    /* Move to next product in the selected product post area. It is a scroll area. */
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, selectedProducts.length - 2)
        );
    };

    /* Handle custom image selection(user uploaded image) */
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
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);

            if (image) {
                formData.append('image', image);
            }
            selectedProducts.forEach((product) => {
                formData.append('products', product.id);
            });

            const response = await axios.put(`/posts/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Post updated successfully!');

            history.push(`/posts/${response.data.id}`);
        } catch (error) {
            setErrors(error.response?.data);
        }
    };

    return (
        <Container>
            <Row>
                {/* Form for editing the post */}
                <Col sm={6}>
                    <div className={styles['center-div']}>
                        <Form
                            onSubmit={handleSubmit}
                            action={`/posts/${id}/`}
                            method="put"
                            encType="multipart/form-data"
                        >
                            {(selectedImage || customImage) && (
                                <Image
                                    src={customImage || selectedImage}
                                    alt="Selected product image"
                                    className="mb-3"
                                    fluid
                                />
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
                                    change the image
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
                            <Button
                                variant="primary"
                                type="submit"
                                className={styles['post-create-button']}
                            >
                                Update Post
                            </Button>
                        </Form>
                    </div>
                </Col>
                {/* Panels for selecting body systems and products to be added to post */}
                <Col sm={6}>
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

export default PostEditForm;
