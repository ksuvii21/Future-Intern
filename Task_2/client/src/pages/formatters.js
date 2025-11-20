/**
 * Safely formats a number as Indian Rupee currency.
 * Returns 'N/A' if the price is not a valid number.
 * @param {number | string | undefined | null} price - The price to format.
 * @returns {string} - The formatted price string (e.g., "₹1,299") or "N/A".
 */
export const formatCurrency = (price) => {
  const numericPrice = Number(price);
  if (price === null || price === undefined || isNaN(numericPrice)) {
    return 'N/A';
  }
  return `₹${numericPrice}`;
};

/**
 * Safely formats a date string or Date object.
 * Returns an empty string if the date is invalid.
 * @param {string | Date | undefined | null} date - The date to format.
 * @returns {string} - The formatted date string or an empty string.
 */
export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return dateObj.toDateString();
};