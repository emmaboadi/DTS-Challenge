import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TaskList from '../TaskList';

jest.mock('axios');

describe('TaskList', () => {
  const mockTasks = [
    {
      _id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      status: 'pending',
      dueDate: '2024-04-25T10:00:00.000Z',
    },
    {
      _id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      status: 'completed',
      dueDate: '2024-04-26T10:00:00.000Z',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTasks });
  });

  it('renders task cards', async () => {
    render(<TaskList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
      expect(screen.getByText('Test Description 1')).toBeInTheDocument();
      expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    });
  });

  it('displays status chips', async () => {
    render(<TaskList />);
    
    await waitFor(() => {
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('completed')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<TaskList />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching tasks:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });
}); 