import { useState } from "react"

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const setStorage = localStorage.getItem(key)
        return setStorage ? JSON.parse(setStorage) : defaultValue
    })

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }

    return [
        value,
        setLocalStorageValue
    ]
}