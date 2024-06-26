import './App.css';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import ProfilePage from './pages/profiles/ProfilePage';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import PostCreator from './components/PostCreator';
import PostEditForm from './pages/posts/PostEditForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ProfilePasswordChange from './pages/profiles/ProfilePasswordChange';
import ChangePassword from './pages/profiles/ChangeUsername';
import GDPR from './pages/other/GDPR';
import NotFound from './components/NotFound';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Container className="content-container">
                <Switch>
                    <Route exact path="/login" render={() => <LoginForm />} />
                    <Route
                        exact
                        path="/register"
                        render={() => <RegisterForm />}
                    />
                    <Route
                        exact
                        path="/profile/:id"
                        render={(props) => <ProfilePage {...props} />}
                    />
                    <Route
                        path="/profiles/:id/edit"
                        component={ProfileEditForm}
                    />
                    <Route
                        path="/profiles/:id/password-change"
                        component={ProfilePasswordChange}
                    />
                    <Route exact path="/gdpr" render={() => <GDPR />} />
                    <Route
                        exact
                        path="/posts/create"
                        render={() => <PostCreateForm />}
                    />
                    <Route
                        exact
                        path="/posts/:id"
                        render={() => <PostPage />}
                    />
                    <Route path="/edit/:id" component={PostEditForm} />
                    <Route
                        path="/profiles/:id/change-username"
                        component={ChangePassword}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <PostsPage message="No results found. Try another search keyword" />
                        )}
                    />
                    <Route render={() => <NotFound />} />
                </Switch>
                <PostCreator />
            </Container>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
