/**
 * Async sleep method that waits a specific number of milliseconds.
 * @param {number} delay How many milliseconds to wait for.
 */
export async function sleep(delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
}
