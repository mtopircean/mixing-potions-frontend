import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Container, Alert } from 'react-bootstrap';
import styles from '../../styles/ProfileEditForm.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useRedirect } from '../../hooks/useRedirect';

// Define ProfileEditForm component
const ProfileEditForm = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        nickname: '',
        first_name: '',
        last_name: '',
        age: '',
        phone_number: '',
        about: '',
    });

    useEffect(() => {
        let isMounted = true;
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/profiles/${id}/`);
                const profileData = response.data;
                if (isMounted) {
                    setFormData(profileData);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            history.push('/');
        }
    }, [currentUser, history, id]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedData = {
                username: formData.username || null,
                nickname: formData.nickname || null,
                first_name: formData.first_name || null,
                last_name: formData.last_name || null,
                age: formData.age || null,
                phone_number: formData.phone_number || null,
                about: formData.about || null,
            };

            await axios.put(`/profiles/${id}/`, updatedData);
            toast.success('Profile data was updated');
            history.push(`/profile/${id}/`);
        } catch (error) {
            setErrors(error.response?.data);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        history.push(`/profile/${id}/`);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <h4 className="mb-4 mt-4 text-center">
                    Modify my account details/password:
                </h4>
                <Col md={8}>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="nickname">
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    Nickname:{' '}
                                </span>
                                {formData.nickname ||
                                    'Data was not submitted. Populate your profile.'}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nickname"
                                value={formData.nickname || ''}
                                onChange={handleInputChange}
                                placeholder="Type updated details..."
                            />
                        </Form.Group>
                        {errors?.nickname?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="firstName">
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    First Name:{' '}
                                </span>
                                {formData.first_name ||
                                    'Data was not submitted. Populate your profile.'}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formData.first_name || ''}
                                onChange={handleInputChange}
                                placeholder="Type updated details..."
                            />
                        </Form.Group>
                        {errors?.first_name?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="lastName">
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    Last Name:{' '}
                                </span>
                                {formData.last_name ||
                                    'Data was not submitted. Populate your profile.'}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={formData.last_name || ''}
                                onChange={handleInputChange}
                                placeholder="Type updated details..."
                            />
                        </Form.Group>
                        {errors?.last_name?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="age">
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    Age:{' '}
                                </span>
                                {formData.age ||
                                    'Data was not submitted. Populate your profile.'}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age || ''}
                                onChange={handleInputChange}
                                placeholder="Type updated details..."
                            />
                        </Form.Group>
                        {errors?.age?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    Phone Number:{' '}
                                </span>
                                {formData.phone_number ||
                                    'Data was not submitted. Populate your profile.'}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={formData.phone_number || ''}
                                onChange={handleInputChange}
                                placeholder="Type updated details..."
                            />
                        </Form.Group>
                        {errors?.phone_number?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>
                                <span className={styles.editFormLabel}>
                                    About me:{' '}
                                </span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                                rows={6}
                                placeholder={
                                    formData.about ||
                                    'Data was not submitted. Populate your profile.'
                                }
                            />
                        </Form.Group>
                        {errors?.about?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Col md={12} className={styles.profileFormButtons}>
                            <Button
                                variant="primary"
                                type="submit"
                                className={styles.profileSave}
                            >
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                className={styles.profileCancel}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileEditForm;
