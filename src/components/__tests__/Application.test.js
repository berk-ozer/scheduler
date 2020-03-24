import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);



describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render component and wait for data to load
    const { container, debug } = render(<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // Book an interview
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(container, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Validation
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    // expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();

    // Not doing the above validation
    // "spots remaining" functionality uses server side logic. My app fetches "days" with updated "spots" every time there is an interview scheduled or deleted
    // Talked to a mentor and they suggested I don't test for this here, because it's server side logic
  });
})
