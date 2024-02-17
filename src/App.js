import "./App.css";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import Container from "react-bootstrap/Container";
import './api/axiosDefaults';
import { Route, Switch } from 'react-router-dom';
import LoginForm from "./components/pages/auth/LoginForm"
import RegisterForm from "./components/pages/auth/RegisterForm"
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    handleMount()
  },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
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
          <Route exact path="/gdpr" render={() => <h1></h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>
    </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
