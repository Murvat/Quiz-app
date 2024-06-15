// FinalScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import FinalScreen from './FinalScreen';

// Mock useDispatch and useSelector
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('FinalScreen Component', () => {
    beforeEach(() => {
        useDispatch.mockClear();
        useSelector.mockClear();
        useNavigate.mockClear();
    });

    test('renders final score correctly', () => {
        useSelector.mockReturnValue({ score: 100 }); // Mock useSelector to return a specific score

        const { getByText } = render(<FinalScreen />);

        expect(getByText('Final Score 100')).toBeInTheDocument();
    });

    test('calls dispatch and navigate correctly on button click', () => {
        const mockDispatch = jest.fn();
        const mockNavigate = jest.fn();

        useDispatch.mockReturnValue(mockDispatch); // Mock useDispatch to return a mock function
        useSelector.mockReturnValue({ score: 80 }); // Mock useSelector to return a specific score
        useNavigate.mockReturnValue(mockNavigate); // Mock useNavigate to return a mock function

        const { getByText } = render(<FinalScreen />);

        fireEvent.click(getByText('back to settings!'));

        expect(mockDispatch).toHaveBeenCalledWith(handleScoreChange(0));
        expect(mockDispatch).toHaveBeenCalledWith(handleAmountChange(50));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
