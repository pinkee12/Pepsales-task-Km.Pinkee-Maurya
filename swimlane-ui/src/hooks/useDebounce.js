// import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

const debounce = (func, delay) => {
  let timerId = null; // Initialize timerId to null
  return function (...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args); // Use apply to preserve the context
    }, delay);
  };
};

export const useDebounce = (fn, delay = 300) => {
  const functionRef = useRef(fn);

  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);

  const debouncedFunction = useMemo(() => {
    const callFn = (...params) => {
      functionRef.current?.(...params);
    };

    return debounce(callFn, delay);
  }, [delay]);

  return debouncedFunction;
};
