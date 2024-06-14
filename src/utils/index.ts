import React, { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
//在一个函数，改变传入的对象本身是不好的
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
//原生防抖函数
// export const debounce = (func: Function, delay?: number) => {
//   let timeout;
//   return (...param) => {
//     if(timeout){
//       clearTimeout(timeout)
//     }
//     timeout=setTimeout(() => func(...param), delay)
//   }
// }
