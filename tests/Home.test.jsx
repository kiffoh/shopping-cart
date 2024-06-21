import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/HomePage";
import App from "../src/App";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import * as reactRouterDom from "react-router-dom";

// Mock the useOutletContext hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => [
      {}, // quantities
      vi.fn(), // handleIncrease
      vi.fn(), // handleDecrease
      vi.fn(), // handleChange
      () => ({ imageURL: [{ id: 1, title: "Item 1", price: "10.00", image: "item1.jpg" }], loading: false, error: null }) // useImageURL
    ],
  };
});

describe("Home component", () => {
  it("renders correct heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading").textContent).toMatch(/Home/i);
  });

  it("renders approprate title", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const shoppingPageBtn = screen.getByRole("link", { name: "Items" })

    await user.click(shoppingPageBtn);

    expect(screen.getByRole("heading").textContent).toMatch(/Items/i);
  })

  /*
  it("changes the shopping cart", async () => {

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading").textContent).toMatch(/Items/i);
    

    const shoppingPageBtn = screen.getByRole("link", { name: "Items" })

    await user.click(shoppingPageBtn);

    await waitFor(async () => {
      const increaseBtn = await screen.findByRole("button", { name: "+" });
      await user.click(increaseBtn);

      const handleIncrease = reactRouterDom.useOutletContext()[1];
      expect(handleIncrease).toHaveBeenCalled();
      
    });
  })
  */
})

