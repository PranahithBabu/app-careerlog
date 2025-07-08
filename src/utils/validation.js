// List of keywords indicating non-work-related content
export const NON_WORK_KEYWORDS = [
  'family', 'dinner', 'lunch', 'breakfast', 'movie', 'vacation', 'picnic',
  'juice', 'park', 'shopping', 'party', 'sleep', 'restaurant', 'travel'
];

/**
 * Checks if the description contains any non-work-related keywords.
 * @param {string} desc - The user input description
 * @returns {boolean} True if non-work-related keyword is found
 */
export function containsNonWorkKeyword(desc) {
  if (!desc) return false;
  const lower = desc.toLowerCase();
  return NON_WORK_KEYWORDS.some(word => new RegExp(`\\b${word}\\b`, 'i').test(lower));
} 