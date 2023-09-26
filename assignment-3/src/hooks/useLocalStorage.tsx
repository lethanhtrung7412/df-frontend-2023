import { useState } from 'react'
import { SetValue } from '../interface/types'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore as T)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  const removeById = (id: string | number) => {
    try {
      const storedData = storedValue as Array<{ id: string | number }>

      const updatedData = storedData.filter((item) => item.id !== id)

      setStoredValue(updatedData as T)
      window.localStorage.setItem(key, JSON.stringify(updatedData))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue, removeById] as [
    T,
    (value: SetValue<T>) => void,
    (id: string | number) => void,
  ]
}

export default useLocalStorage
