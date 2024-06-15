// Questions.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Questions from './Questions';
import { handleScoreChange } from '../redux/actions';

// Mock useSelector
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock useAxios
jest.mock('../hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Questions Component', () => {
    const mockState = {
        question_category: '1',
        question_difficulty: 'easy',
        question_type: 'multiple',
        amount_of_question: 5,
        score: 0,
    };

    beforeEach(() => {
        useSelector.mockReturnValue(mockState); // Mock useSelector to return mockState
        useDispatch.mockClear(); // Clear mock dispatch calls
        useNavigate.mockClear(); // Clear mock navigate calls
    });

    test('renders loading spinner when data is fetching', () => {
        useAxios.mockReturnValue({ response: null, loading: true });

        const { getByTestId } = render(<Questions />);

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('renders no questions available message when no data is fetched', () => {
        useAxios.mockReturnValue({ response: { results: [] }, loading: false });

        const { getByText } = render(<Questions />);

        expect(getByText('No questions available.')).toBeInTheDocument();
    });

    test('renders question and options when data is fetched', async () => {
        const mockResponse = {
            results: [
                {
                    question: 'What is the capital of France?',
                    correct_answer: 'Paris',
                    incorrect_answers: ['London', 'Berlin', 'Madrid'],
                },
            ],
        };

        useAxios.mockReturnValue({ response: mockResponse, loading: false });

        const { getByText } = render(<Questions />);

        // Wait for question and options to be rendered
        await waitFor(() => {
            expect(getByText('Question 1')).toBeInTheDocument();
            expect(getByText('What is the capital of France?')).toBeInTheDocument();
            expect(getByText('London')).toBeInTheDocument();
            expect(getByText('Berlin')).toBeInTheDocument();
            expect(getByText('Madrid')).toBeInTheDocument();
        });
    });

    test('handles click answer correctly', async () => {
        const mockResponse = {
            results: [
                {
                    question: 'What is the capital of France?',
                    correct_answer: 'Paris',
                    incorrect_answers: ['London', 'Berlin', 'Madrid'],
                },
            ],
        };

        useAxios.mockReturnValue({ response: mockResponse, loading: false });
        useDispatch.mockReturnValue(jest.fn()); // Mock useDispatch to return a mock function
        useNavigate.mockReturnValue(jest.fn()); // Mock useNavigate to return a mock function

        const { getByText } = render(<Questions />);

        // Click on the correct answer
        fireEvent.click(getByText('Paris'));

        // Check if handleScoreChange action was dispatched
        expect(handleScoreChange).toHaveBeenCalledWith(1); // Assuming score increments correctly
    });
});
