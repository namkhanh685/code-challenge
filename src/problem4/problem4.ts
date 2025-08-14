/* Approach 1:
 * Iterative approach using a loop
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function sum_to_n_a(n: number): number {
  if (n < 0) {
    console.error("Input must be a non-negative integer.");
  }
  if (n === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/* Approach 2:
 * Mathematical formula for the sum of the first n natural numbers
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function sum_to_n_b(n: number): number {
  if (n < 0) {
    console.error("Input must be a non-negative integer.");
  }
  if (n === 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
}

/* Approach 3:
 * Recursive approach
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to recursion stack
 */
function sum_to_n_c(n: number): number {
  if (n < 0) {
    console.error("Input must be a non-negative integer.");
    return 0;
  }
  if (n === 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
}

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };