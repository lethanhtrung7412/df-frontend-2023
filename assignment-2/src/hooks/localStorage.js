import { useState } from 'react'; 

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      const parseValue = JSON.parse(value);
      return value && parseValue.length > 0 ? parseValue : initialValue; 
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const removeById = id => {
    try {
      const storedData = storedValue;
      const updatedData = storedData.filter(item => item.id !== id);
      setStoredValue(updatedData);
      window.localStorage.setItem(key, JSON.stringify(updatedData));
    } catch (error) {
      console.log(error);
    }
  };
 
  return [storedValue, setValue, removeById];

}

export default useLocalStorage;