import "./App.css";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import Container from "react-bootstrap/Container";
import "./api/axiosDefaults";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostCreator from "./components/PostCreator";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="content-container">
        <Switch>
          <Route exact path="/" render={() => <h1></h1>} />
          <Route exact path="/about" render={() => <h1></h1>} />
          <Route exact path="/contact" render={() => <h1></h1>} />
          <Route exact path="/team" render={() => <h1></h1>} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/gdpr" render={() => <h1></h1>} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
        <PostCreator />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
