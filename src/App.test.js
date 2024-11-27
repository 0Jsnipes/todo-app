import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
  test('should display "Get Started Here" initially', () => {
    render(<App />);
    const getStartedText = screen.getByText(/get started here/i);
    expect(getStartedText).toBeInTheDocument();
  });

  test('add a new list', () => {
    render(<App />);
    const addListButton = screen.getByText(/add new list/i);
    fireEvent.click(addListButton);
  
    const removeListButton = screen.getByText(/remove list/i);
    expect(removeListButton).toBeInTheDocument();
  });
  

  test('add todos to the list', () => {
    render(<App />);
    const addListButton = screen.getByText(/add new list/i);
    fireEvent.click(addListButton);

    const todoInput = screen.getByPlaceholderText(/add a new todo/i);
    fireEvent.change(todoInput, { target: { value: 'Buy groceries' } });
    fireEvent.keyDown(todoInput, { key: 'Enter', code: 'Enter' });

    const todoItem = screen.getByText(/buy groceries/i);
    expect(todoItem).toBeInTheDocument();
  });

  test('check off a todo item', async () => {
    render(<App />);
    const addListButton = screen.getByText(/add new list/i);
    fireEvent.click(addListButton);
  
    const todoInput = screen.getByPlaceholderText(/add a new todo/i);
    fireEvent.change(todoInput, { target: { value: 'Walk the dog' } });
    fireEvent.keyDown(todoInput, { key: 'Enter', code: 'Enter' });
  
    const todoCheckbox = screen.getByText('Walk the dog');
    fireEvent.click(todoCheckbox);
  
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked());
  });
  

  test('remove a list', () => {
    render(<App />);
    const addListButton = screen.getByText(/add new list/i);
    fireEvent.click(addListButton);

    const removeListButton = screen.getByText(/remove list/i);
    fireEvent.click(removeListButton);

    const todoInput = screen.queryByPlaceholderText(/list name/i);
    expect(todoInput).not.toBeInTheDocument();
  });
});
