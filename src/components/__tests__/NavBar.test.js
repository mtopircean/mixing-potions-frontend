import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";

/* Testing display logo, menu and login of Navbar */
describe("NavBar", () => {
  test("renders NavBar component without errors", () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();

    const joinLoginLink = screen.getByText("Join/Login");
    expect(joinLoginLink).toBeInTheDocument();

    const navbarComponent = screen.getByRole("navigation");
    expect(navbarComponent).toBeInTheDocument();
  });
});