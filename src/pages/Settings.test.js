// Settings.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Settings from './Settings';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock useAxios
jest.mock('../hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Settings Component', () => {
    const mockCategories = [
        { id: 9, name: 'General Knowledge' },
        { id: 10, name: 'Entertainment: Books' },
        // Add more mock categories as needed
    ];

    beforeEach(() => {
        useAxios.mockReturnValue({ response: { trivia_categories: mockCategories }, loading: false, error: null });
        useNavigate.mockClear(); // Clear mock navigate calls
    });

    test('renders loading spinner when fetching data', () => {
        useAxios.mockReturnValue({ response: null, loading: true, error: null });

        const { getByTestId } = render(<Settings />);

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('renders error message when fetch fails', () => {
        useAxios.mockReturnValue({ response: null, loading: false, error: true });

        const { getByText } = render(<Settings />);

        expect(getByText('Some Went Wrong!')).toBeInTheDocument();
    });

    test('renders form fields with correct options when data is fetched', async () => {
        const { getByLabelText, getByText } = render(<Settings />);

        await waitFor(() => {
            expect(getByLabelText('Category')).toBeInTheDocument();
            expect(getByLabelText('Difficulty')).toBeInTheDocument();
            expect(getByLabelText('Type')).toBeInTheDocument();
        });

        // Verify category options
        expect(getByText('General Knowledge')).toBeInTheDocument();
        expect(getByText('Entertainment: Books')).toBeInTheDocument();

        // Verify difficulty options
        expect(getByText('Easy')).toBeInTheDocument();
        expect(getByText('Medium')).toBeInTheDocument();
        expect(getByText('Hard')).toBeInTheDocument();

        // Verify type options
        expect(getByText('Multiple Choise')).toBeInTheDocument();
        expect(getByText('True/False')).toBeInTheDocument();
    });

    test('navigates to /questions on form submit', async () => {
        const { getByText } = render(<Settings />);

        fireEvent.submit(getByText('Get Started'));

        // Check if useNavigate was called with the correct path
        expect(useNavigate).toHaveBeenCalledWith('/questions');
    });
});
