import "./App.css";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1></h1>} />
          <Route exact path="/about" render={() => <h1></h1>} />
          <Route exact path="/contact" render={() => <h1></h1>} />
          <Route exact path="/team" render={() => <h1></h1>} />
          <Route exact path="/join-login" render={() => <h1></h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
