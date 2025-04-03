/**
 * Utility functions for the Wedding Detective API
 */

// Format currency with appropriate symbol
const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

// Convert USD to INR (simplified conversion)
const convertToRupees = (usdAmount) => {
  const conversionRate = 83.5; // Example conversion rate (1 USD = 83.5 INR)
  return Math.round(usdAmount * conversionRate);
};

// Get current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

module.exports = {
  formatCurrency,
  convertToRupees,
  getTimestamp
};