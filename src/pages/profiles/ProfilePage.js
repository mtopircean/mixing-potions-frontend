import React, { useState, useEffect } from 'react';
import styles from '../../styles/ProfilePage.module.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faCircleMinus,
    faKey,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import axios from 'axios';
import Post from '../../pages/posts/Post';
import Follow from '../../components/Follow';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchProfileAndPosts = async () => {
            try {
                const { data: pageProfile } = await axiosReq.get(
                    `/profiles/${id}/`
                );
                setProfile(pageProfile);
                setLoading(false);

                let allUserPosts = [];
                let nextPage = '/posts';

                while (nextPage) {
                    const { data: postData } = await axiosReq.get(nextPage);
                    const userPostsData = postData.results.filter(
                        (post) => post.owner === pageProfile.username
                    );
                    allUserPosts = [...allUserPosts, ...userPostsData];
                    nextPage = postData.next;
                }
                setUserPosts(allUserPosts);

                const response = await axios.get(`/followers`);
                if (response.status === 200) {
                    const followedUsersData = response.data.results;
                    setFollowedUsers(followedUsersData);

                    console.log(
                        'Followed user IDs:',
                        followedUsersData.map((user) => user.id)
                    );
                    setIsFollowing(
                        followedUsersData.some(
                            (user) => user.followed_profile_id === id
                        )
                    );
                } else {
                    throw new Error('Failed to fetch followed users');
                }
            } catch (error) {
                setLoading(false);
                console.error(
                    'Error fetching profile, posts, and followed users:',
                    error
                );
                return (
                    <div>
                        Error: Failed to load data. Please try again later.
                    </div>
                );
            }
        };

        fetchProfileAndPosts();
    }, [id]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    if (loading) {
        return <div>Loading data.......</div>;
    }

    const unfollowUser = async (followedUserId) => {
        try {
            await axios.delete(`/followers/${followedUserId}`);
            setFollowedUsers((prevFollowerdUsers) =>
                prevFollowerdUsers.filter((user) => user.id !== followedUserId)
            );
            toast.success('User unfollowed successfully!');
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <Container>
            <div className="ranking-bar">
                <p>
                    <span className="ranking-title">
                        Accumulate likes to impove your ranking:
                    </span>
                    <br />
                    <span className="ranking-title">Basic</span> - 0 likes,{' '}
                    <span className="ranking-title">Apprentice</span>- 10 likes,{' '}
                    <span className="ranking-title">Experienced</span> - 50
                    likes, <span className="ranking-title">Master</span> - 100
                    likes
                </p>
            </div>
            {profile ? (
                <Row>
                    <Col md={6} className={styles['profile-header']}>
                        <div className={styles['header-ranking']}>
                            <img
                                src={profile.image}
                                alt="Profile"
                                className={styles['profile-image']}
                            />
                            <h4>
                                Ranking:{' '}
                                <span className={styles['user-ranking']}>
                                    {profile.user_status}
                                </span>
                            </h4>
                            <br />
                            <Col className="text-center">
                                {isFollowing ? (
                                    <Link
                                        to="/profile"
                                        className={styles.following}
                                    >
                                        Following...
                                    </Link>
                                ) : (
                                    <Follow ownerId={profile.id} />
                                )}
                            </Col>
                        </div>
                    </Col>
                    <Col md={6} className={styles['name-header']}>
                        <div>
                            <h2>{profile.username}</h2>
                            {currentUser &&
                                currentUser.username === profile.username && (
                                    <div
                                        className={
                                            styles['edit-delete-buttons']
                                        }
                                    >
                                        <NavLink
                                            to={`/profiles/${profile.id}/edit`}
                                            className={styles['edit-button']}
                                            activeClassName={styles['active']}
                                        >
                                            Edit{' '}
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />
                                            <br />
                                            Click edit and tell people more
                                            about you....
                                        </NavLink>
                                        <br className="mt-3 mb-3" />

                                        <br className="mt-3 mb-3" />
                                        <NavLink
                                            to={`/profiles/${profile.id}/change-username`}
                                            className={styles['edit-button']}
                                            activeClassName={styles['active']}
                                        >
                                            Change Username{' '}
                                            <FontAwesomeIcon icon={faUser} />
                                            <br />
                                        </NavLink>
                                        <Link
                                            to={`/profiles/${profile.id}/password-change`}
                                            className={`${styles['password-button']} mt-3`}
                                        >
                                            <br />
                                            Change password{' '}
                                            <FontAwesomeIcon icon={faKey} />
                                        </Link>
                                    </div>
                                )}
                        </div>
                    </Col>
                    <Col
                        className={`d-flex justify-content-center ${styles.seeMore}`}
                        md={12}
                    >
                        <button
                            onClick={toggleExpanded}
                            className={`${styles['profile-button']} d-flex justify-content-center align-items-center`}
                        >
                            {expanded ? '▲' : '▼'}{' '}
                            <span>see more profile details...</span>
                        </button>
                    </Col>
                    <hr></hr>
                    {expanded && (
                        <Col xs={12}>
                            <div className={styles['profile-detail']}>
                                <h5>Email:</h5>
                                <p>{profile.email}</p>
                            </div>
                            <div className={styles['profile-detail']}>
                                <h5>Nickname:</h5>
                                <p>{profile.nickname}</p>
                            </div>
                            <div className={styles['profile-detail']}>
                                <h5>First name:</h5>
                                <p>{profile.first_name}</p>
                            </div>
                            <div className={styles['profile-detail']}>
                                <h5>Last name:</h5>
                                <p>{profile.last_name}</p>
                            </div>
                            <div className={styles['profile-detail']}>
                                <h5>Age:</h5>
                                <p>{profile.age}</p>
                            </div>
                            <div className={styles['profile-detail']}>
                                <h5>Phone Number:</h5>
                                <p>{profile.phone_number}</p>
                            </div>
                            <div className={styles['text-center']}>
                                <h5>About:</h5>
                                <p>{profile.about}</p>
                            </div>
                        </Col>
                    )}
                </Row>
            ) : (
                <div>Error: Profile not found</div>
            )}
            <hr />

            {currentUser && currentUser.username === profile.username && (
                <Row>
                    <Col xs={12} md={12} className="text-center">
                        {followedUsers && followedUsers.length > 0 ? (
                            <>
                                <h4 className="text-center">Followed Users:</h4>
                                <div
                                    className="d-flex flex-column  align-items-center justify-content-center"
                                    id="container-followed-users"
                                >
                                    {followedUsers.map((user) => (
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            key={user.id}
                                        >
                                            <div>
                                                {user.followed_profile_id ? (
                                                    <Link
                                                        to={`/profile/${user.followed_profile_id}`}
                                                        className={
                                                            styles.usernameLink
                                                        }
                                                    >
                                                        {user.followed_name}
                                                    </Link>
                                                ) : (
                                                    <span>
                                                        {user.followed_name}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={() =>
                                                        unfollowUser(user.id)
                                                    }
                                                    className={`${styles.unfollowUser}`}
                                                >
                                                    <span>Unfollow</span>{' '}
                                                    <FontAwesomeIcon
                                                        icon={faCircleMinus}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h4 className="text-center">Followed Users:</h4>
                                <p className="no-followed">No followed users</p>
                            </div>
                        )}
                        <hr />
                    </Col>
                </Row>
            )}
            {userPosts && userPosts.length > 0 && (
                <Row>
                    <Col
                        xs={12}
                        md={12}
                        className="justify-content-center text-center mb-3"
                    >
                        <h4 className="mb-3">User Posts:</h4>
                        <Row>
                            {userPosts.map((post) => (
                                <Col
                                    xs={12}
                                    md={6}
                                    key={post.id}
                                    className="post-col mb-3"
                                >
                                    <div className="post-wrapper">
                                        <Post {...post} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProfilePage;
