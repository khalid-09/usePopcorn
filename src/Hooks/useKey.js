import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      const callback = e => {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };
      document.addEventListener('keydown', callback);
      return function () {
        document.removeEventListener('keydown', callback);
      }; // cleanup by removing dom listner after component unmounts
    },
    [action, key]
  ); // effect to perform action when key is pressed
}
