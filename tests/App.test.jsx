import React from 'react';
import { render } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest';
import App from '../src/App';
import Images from '../src/Images';

// Mock useOutletContext hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: vi.fn(),
}));

// Mock Images component
vi.mock('../src/Images', () => ({
  __esModule: true,
  default: vi.fn(() => null)
}));

// Mock useImageURL hook
const mockUseImageURL = vi.fn();

describe('App Component', () => {
  const mockQuantities = { item1: 1, item2: 2 };
  const mockHandleIncrease = vi.fn();
  const mockHandleDecrease = vi.fn();
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
      imageURL: 'test-url',
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
});
