import { useAuth } from "../context/useAuth";

/**
 * Custom hook to manage user-specific localStorage data
 * Automatically prefixes keys with the current user's ID
 */
export function useUserStorage(key, initialValue = null) {
  const { user } = useAuth();

  // If no user is logged in, return initial value
  if (!user) {
    return [initialValue, () => {}];
  }

  const userKey = `${key}_${user.id}`;

  // Get the stored value
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(userKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  };

  // Set the stored value
  const setStoredValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(getStoredValue()) : value;
      localStorage.setItem(userKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [getStoredValue(), setStoredValue];
}
