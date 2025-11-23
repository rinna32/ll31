import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [stored, setStored] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setStored(value);
        } catch { }
    };

    return [stored, setValue] as const;
}