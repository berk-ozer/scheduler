import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText
} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Render component and wait for data to load
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    // Click "Tuesday" and validate
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data and books an interview", async () => {
    // Render component and wait for data to load
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // Book an interview
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Validation
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  });

  it("loads data and cancels an interview", async () => {
    // Render component and wait for data to load
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    // Cancel the interview and validate
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Are you sure/i)).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));
  });

  it("loads data and edits an interview", async () => {
    // Render component and wait for data to load
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    // Edit the interview
    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Berk Ozer" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    //Validate
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Berk Ozer"));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // Render component and wait for data to load
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // Try to book an appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Validate
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /could not save appointment/i)
    );

    // Check that we can close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // Render component and wait for data to load
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    // Try to delete an appointment
    fireEvent.click(getByAltText(appointment, "Delete"));
    fireEvent.click(getByText(appointment, "Confirm"));

    // Validate
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /could not cancel appointment/i)
    );

    // Check that we can close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
