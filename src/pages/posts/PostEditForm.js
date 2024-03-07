import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ProductsPanel from "../../components/ProductsPanel";
import BodySystemPanel from "../../components/BodySystemPanel";
import styles from "../../styles/PostCreateForm.module.css";

function PostEditForm({ post }) {
  const currentUser = useCurrentUser();
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

useEffect(() => {
    if(!currentUser) {
        history.pushState("/")
    }
    if(post) {
        setTitle(post.title);
        setDescription(post.description);
        setSelectedProducts(post.products)
    }
}, [currentUser, history, post]);

const toggleBodySystem = (system) => {

};

const handleAddProduct = (product) => {

};

const handleRemoveProduct = (productId) => {

};

const handlePrevClick = () => {

};

const handleNextClick = () => {

};

const handleCheckboxChange = (product) => {

};

const handleCustomImageChange = (event) => {

};

const handleSubmit = async (event) => {

};

    return (
    <Container>
        
    </Container>

    );
    }

export default PostEditForm;