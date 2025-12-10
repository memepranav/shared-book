/**
 * Currency formatting utilities
 *
 * Indian numbering system:
 * - 10 = 10
 * - 100 = 100
 * - 1,000 = 1 thousand
 * - 10,000 = 10 thousand
 * - 1,00,000 = 1 lakh
 * - 10,00,000 = 10 lakhs
 * - 1,00,00,000 = 1 crore
 */

export type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP';

interface FormatCurrencyOptions {
  currency?: CurrencyType;
  showSymbol?: boolean;
  locale?: string;
}

/**
 * Formats a number according to the specified currency format
 *
 * @param amount - The numeric amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234567) // "12,34,567" (Indian format, no symbol)
 * formatCurrency(1234567, { showSymbol: true }) // "₹12,34,567"
 * formatCurrency(1234567, { currency: 'USD', showSymbol: true }) // "$1,234,567"
 */
export const formatCurrency = (
  amount: number,
  options: FormatCurrencyOptions = {}
): string => {
  const {
    currency = 'INR',
    showSymbol = false,
    locale,
  } = options;

  let formattedAmount: string;

  // Format number based on currency type
  switch (currency) {
    case 'INR':
      // Indian numbering system (lakhs and crores)
      formattedAmount = amount.toLocaleString(locale || 'en-IN');
      if (showSymbol) {
        return `₹${formattedAmount}`;
      }
      return formattedAmount;

    case 'USD':
      formattedAmount = amount.toLocaleString(locale || 'en-US');
      if (showSymbol) {
        return `$${formattedAmount}`;
      }
      return formattedAmount;

    case 'EUR':
      formattedAmount = amount.toLocaleString(locale || 'de-DE');
      if (showSymbol) {
        return `€${formattedAmount}`;
      }
      return formattedAmount;

    case 'GBP':
      formattedAmount = amount.toLocaleString(locale || 'en-GB');
      if (showSymbol) {
        return `£${formattedAmount}`;
      }
      return formattedAmount;

    default:
      formattedAmount = amount.toLocaleString('en-IN');
      return formattedAmount;
  }
};

/**
 * Formats amount with INR symbol (₹)
 * Shorthand for formatCurrency with INR and symbol
 *
 * @param amount - The numeric amount to format
 * @returns Formatted string with ₹ symbol
 *
 * @example
 * formatINR(1234567) // "₹12,34,567"
 */
export const formatINR = (amount: number): string => {
  return formatCurrency(amount, { currency: 'INR', showSymbol: true });
};

/**
 * Formats amount in Indian numbering system without symbol
 *
 * @param amount - The numeric amount to format
 * @returns Formatted string in Indian format
 *
 * @example
 * formatIndianNumber(1234567) // "12,34,567"
 */
export const formatIndianNumber = (amount: number): string => {
  return formatCurrency(amount, { currency: 'INR', showSymbol: false });
};
