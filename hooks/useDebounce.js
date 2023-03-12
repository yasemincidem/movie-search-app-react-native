import {useEffect, useState} from "react";

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timerId);
        }
    }, [value, delay]);

    return [debouncedValue];
};
export {useDebounce};
