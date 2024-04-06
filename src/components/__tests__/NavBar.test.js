import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBar", () => {
  test("renders NavBar component without errors", () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });
});