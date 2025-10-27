import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { mockTheme } from "../__mock__/mockTheme";
import IconButton from "./IconButton";

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

// Mock SVG icon
const MockIcon = () => (
  <svg data-testid="mock-icon">
    <path d="M10 10" />
  </svg>
);

describe("IconButton", () => {
  it("should render correctly with children", () => {
    renderWithTheme(
      <IconButton>
        <MockIcon />
      </IconButton>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <IconButton onClick={handleClick}>
        <MockIcon />
      </IconButton>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is passed", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <IconButton onClick={handleClick} disabled>
        <MockIcon />
      </IconButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should be accessible with aria-label", () => {
    renderWithTheme(
      <IconButton aria-label="Close">
        <MockIcon />
      </IconButton>
    );

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
