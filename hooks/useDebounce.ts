import { useEffect , useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);

            return () => {
                clearTimeout(timer);
            }
        }, delay || 500);
    } , [value , delay])

    return debouncedValue;
}

export default useDebounce;