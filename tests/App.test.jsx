import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest';
import App from '../src/App';
import Images from '../src/Images';
import userEvent from '@testing-library/user-event';

// Mock useOutletContext hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: vi.fn(),
}));

// Mock Images component
vi.mock('../src/Images', () => ({
  __esModule: true,
  default: vi.fn(({ quantities, onIncrease, onDecrease, onChange, useImageURL }) => {
    const { imageURL, error, loading } = useImageURL();

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>A network error was encountered</h1>;

    return (
      <div>
        {imageURL && imageURL.map(image => (
          <div key={image.id}>
            <h3>{image.title}</h3>
            <div>
              <img src={image.image} alt={image.title} />
            </div>
            <p>{image.description}</p>
            <div>
              <p>Rating: {image.rating.rate}</p>
              <p>Price: ${image.price}</p>
            </div>
            <div>
              <button onClick={() => onDecrease(image.id)}>-</button>
              <input
                type="number"
                value={quantities[image.id] || 0}
                onChange={(e) => onChange(image.id, e.target.value)}
              />
              <button onClick={() => onIncrease(image.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    );
  }),
}));

// Mock useImageURL hook
const mockUseImageURL = vi.fn();

describe('App Component', () => {
  const mockQuantities = { item1: 0, item2: 0 };
  const mockHandleIncrease = vi.fn(id => {
    mockQuantities[id] = (mockQuantities[id] || 0) + 1;
  });
  
  const mockHandleDecrease = vi.fn(id => {
    mockQuantities[id] = Math.max((mockQuantities[id] || 0) - 1, 0);
  });
  const mockHandleChange = vi.fn();

  beforeEach(() => {
    useOutletContext.mockReturnValue([
      mockQuantities,
      mockHandleIncrease,
      mockHandleDecrease,
      mockHandleChange,
      mockUseImageURL,
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders Images component with correct props', () => {
    mockUseImageURL.mockReturnValue({
      imageURL: [{ id: 'item1', title: 'Item 1', description: 'Description 1', rating: { rate: 4 }, price: 10, image: 'test-image-url' }],
      error: null,
      loading: false,
    });

    render(<App />);

    expect(Images).toHaveBeenCalledWith(
      {
        quantities: mockQuantities,
        onIncrease: mockHandleIncrease,
        onDecrease: mockHandleDecrease,
        onChange: mockHandleChange,
        useImageURL: mockUseImageURL,
      },
      {}
    );
  });

  test('increases quantity of item', async () => {
    const user = userEvent.setup();

    mockUseImageURL.mockReturnValue({
      imageURL: [{ id: 'item1', title: 'Item 1', description: 'Description 1', rating: { rate: 4 }, price: 10, image: 'test-image-url' }],
      error: null,
      loading: false,
    });

    render(<App />);

    // Wait for the component to not be in a loading state
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const increaseBtn = screen.getByRole('button', { name: /\+/i });

    screen.debug()
    await user.click(increaseBtn);
    screen.debug()

    expect(mockHandleIncrease).toHaveBeenCalledWith('item1'); // Verify that mockHandleIncrease was called with 'item1'

    // Wait for the input value to update
    await waitFor(() => {
      expect(screen.getByRole('spinbutton')).toHaveValue(1);
    });
  });

  test('decreases quantity of item', async () => {
    const user = userEvent.setup();

    mockUseImageURL.mockReturnValue({
      imageURL: [{ id: 'item1', title: 'Item 1', description: 'Description 1', rating: { rate: 4 }, price: 10, image: 'test-image-url' }],
      error: null,
      loading: false,
    });

    render(<App />);

    // Wait for the component to not be in a loading state
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    
    const increaseBtn = screen.getByRole('button', { name: /\+/i });

    await user.click(increaseBtn);

    const input = screen.getByRole('spinbutton');
    // expect(input).toHaveValue(1); // Assuming the initial value is 1 and it increases to 2


    const decreaseBtn = screen.getByRole('button', { name: /\-/i });
    // console.log(decreaseBtn)
    // console.log(screen.getAllByRole("button"))

    await user.click(decreaseBtn);

    expect(screen.getByRole("spinbutton")).toHaveValue(0);
  });
});
