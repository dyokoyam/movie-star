import { useEffect, useState } from "react";

export function usePlaceholder<T>(initial: T) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  return { value, setValue };
}
