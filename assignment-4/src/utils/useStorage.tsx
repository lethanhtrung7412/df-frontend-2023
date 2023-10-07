import { useEffect, useState } from 'react'
import Book from '../types/books'

export default function useStorage<T extends Book>(
  key: string,
  initialValue: T[],
): [T[], (newValue: T) => void, (id: number) => void] {
  const [value, setValue] = useState<T[]>([])
  useEffect(() => {
    const storedData =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null

    if (storedData) {
      setValue(JSON.parse(storedData))
    } else {
      setValue(initialValue)
    }
  }, [])

  const addToLocalStorage = (newValue: T) => {
    const updated = [...value, newValue]
    setValue(updated)
    window.localStorage.setItem(key, JSON.stringify(updated))
  }

  const deleteFromLocalStorage = (id: number) => {
    const updated = value.filter((v: T) => v.id !== id)
    setValue(updated)
    window.localStorage.setItem(key, JSON.stringify(updated))
  }
  return [value, addToLocalStorage, deleteFromLocalStorage]
}
