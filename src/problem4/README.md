# Problem 4: Sum to N

This problem implements three different approaches to calculate the sum of natural numbers from 1 to n.

## Installation

Make sure you have Node.js installed on your system. Then install the dependencies using pnpm:

```bash
pnpm install
```

## Running Tests

To run the test suite:

```bash
pnpm run test
```


## Problem Description

Calculate the sum of all natural numbers from 1 to n (inclusive).

**Formula:** `1 + 2 + 3 + ... + n`

**Example:** For n = 5, the result should be 1 + 2 + 3 + 4 + 5 = 15

## Approaches

### 1. Iterative Approach (`sum_to_n_a`)

**Algorithm:** Uses a simple for loop to iterate through all numbers from 1 to n and accumulate the sum.

```typescript
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

**Complexity:**
- Time Complexity: O(n) - Linear time as we iterate through n numbers
- Space Complexity: O(1) - Constant space usage

**Pros:**
- Easy to understand and implement
- Predictable performance
- Memory efficient

**Cons:**
- Slower for large values of n
- Not optimal for performance-critical applications

### 2. Mathematical Formula (`sum_to_n_b`)

**Algorithm:** Uses the mathematical formula for arithmetic series: `n × (n + 1) / 2`

```typescript
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
```

**Complexity:**
- Time Complexity: O(1) - Constant time execution
- Space Complexity: O(1) - Constant space usage

**Pros:**
- **Fastest approach** - constant time regardless of n
- Most memory efficient
- Mathematically elegant (Gauss's formula)
- No risk of stack overflow

**Cons:**
- May have precision issues with extremely large numbers due to floating-point arithmetic

### 3. Recursive Approach (`sum_to_n_c`)

**Algorithm:** Uses recursion where `sum(n) = n + sum(n-1)` with base case `sum(0) = 0`.

```typescript
function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
}
```

**Complexity:**
- Time Complexity: O(n) - Linear time due to n recursive calls
- Space Complexity: O(n) - Linear space due to call stack

**Pros:**
- Elegant and functional programming style
- Easy to understand the mathematical relationship

**Cons:**
- **Risk of stack overflow** for large n values
- Higher memory usage due to call stack
- Slower than iterative approach due to function call overhead

## Performance Comparison

For n = 1,000,000:

| Approach | Time Complexity | Space Complexity | Performance |
|----------|----------------|------------------|-------------|
| Mathematical | O(1) | O(1) | ⭐⭐⭐⭐⭐ Fastest |
| Iterative | O(n) | O(1) | ⭐⭐⭐ Good |
| Recursive | O(n) | O(n) | ⭐ Slowest (Stack overflow risk) |

## Recommendation

**Use `sum_to_n_b` (Mathematical Formula)** for production code as it provides:
- Constant time execution
- No memory overhead
- No risk of stack overflow
- Optimal performance for any input size

## Error Handling

All functions include validation for:
- Negative numbers (logs error message)
- Zero input (returns 0)

## Test Coverage

The test suite covers:
- Basic functionality with various input values