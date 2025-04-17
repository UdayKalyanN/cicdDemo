import { render, screen } from '@testing-library/react';
import App from './App';

import { act, fireEvent, waitFor } from '@testing-library/react';

// Mock fetch globally with a delayed response
global.fetch = jest.fn(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json: () => Promise.resolve({})
      });
    }, 100);
  })
);

// Clear all mocks before each test
beforeEach(() => {
  fetch.mockClear();
});

describe('App Component', () => {
  test('renders initial loading state', async () => {
    // Mock the initial fetch call with delay
    fetch.mockImplementationOnce(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
          });
        }, 100);
      })
    );
    
    render(<App />);
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();

    // Wait for the loading state to be replaced
    await waitFor(() => {
      expect(screen.queryByText(/Loading…/i)).not.toBeInTheDocument();
    });
  });

  test('displays hello message from backend', async () => {
    // Mock successful hello endpoint response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
      })
    );

    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Hello from Spring Boot!/i)).toBeInTheDocument();
    });
  });

  test('handles hello endpoint error', async () => {
    // Mock failed hello endpoint response
    fetch.mockImplementationOnce(() => Promise.reject('API Error'));

    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Error fetching hello/i)).toBeInTheDocument();
    });
  });

  test('greet button is disabled when name is empty', async () => {
    // Mock the initial fetch call
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
      })
    );

    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      const greetButton = screen.getByRole('button', { name: /greet/i });
      expect(greetButton).toBeDisabled();
    });
  });

  test('greet button is enabled when name is entered', async () => {
    // Mock the initial fetch call
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
      })
    );

    await act(async () => {
      render(<App />);
    });
    
    const nameInput = screen.getByPlaceholderText(/Your name…/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
    });
    
    await waitFor(() => {
      const greetButton = screen.getByRole('button', { name: /greet/i });
      expect(greetButton).toBeEnabled();
    });
  });

  test('displays greeting message when greet button is clicked', async () => {
    // Mock the initial hello endpoint call
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
      })
    );
    
    // Mock the greet endpoint call
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Hello, John! Welcome to Spring Boot!' })
      })
    );

    await act(async () => {
      render(<App />);
    });
    
    const nameInput = screen.getByPlaceholderText(/Your name…/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
    });
    
    const greetButton = screen.getByRole('button', { name: /greet/i });
    await act(async () => {
      fireEvent.click(greetButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Hello, John! Welcome to Spring Boot!/i)).toBeInTheDocument();
    });
  });

  test('handles greet endpoint error', async () => {
    // Mock the initial hello endpoint call
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Hello from Spring Boot!' })
      })
    );
    
    // Mock failed greet endpoint response
    fetch.mockImplementationOnce(() => Promise.reject('API Error'));

    await act(async () => {
      render(<App />);
    });
    
    const nameInput = screen.getByPlaceholderText(/Your name…/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
    });
    
    const greetButton = screen.getByRole('button', { name: /greet/i });
    await act(async () => {
      fireEvent.click(greetButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
