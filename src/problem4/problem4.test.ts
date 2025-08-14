import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './problem4';
import {describe, expect, jest, test} from '@jest/globals';

describe('Problem 4 - Sum to N Tests', () => {
  const functions = [
    { name: 'sum_to_n_a (Iterative)', func: sum_to_n_a },
    { name: 'sum_to_n_b (Mathematical)', func: sum_to_n_b },
    { name: 'sum_to_n_c (Recursive)', func: sum_to_n_c }
  ];

  // Test each function with the same test cases
  functions.forEach(({ name, func }) => {
    describe(name, () => {
      
      test('should return 0 for n = 0', () => {
        expect(func(0)).toBe(0);
      });

      test('should return 1 for n = 1', () => {
        expect(func(1)).toBe(1);
      });

      test('should return 3 for n = 2', () => {
        expect(func(2)).toBe(3);
      });

      test('should return 6 for n = 3', () => {
        expect(func(3)).toBe(6);
      });

      test('should return 10 for n = 4', () => {
        expect(func(4)).toBe(10);
      });

      test('should return 15 for n = 5', () => {
        expect(func(5)).toBe(15);
      });

      test('should return 55 for n = 10', () => {
        expect(func(10)).toBe(55);
      });

      test('should return 5050 for n = 100', () => {
        expect(func(100)).toBe(5050);
      });

      test('should handle larger numbers correctly', () => {
        expect(func(1000)).toBe(500500);
      });

      test('should handle negative numbers', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        func(-5);
        
        expect(consoleSpy).toHaveBeenCalledWith('Input must be a non-negative integer.');
        
        consoleSpy.mockRestore();
      });

    });
  });
});