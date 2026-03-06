export const useThrottle = <T extends unknown[]>(callback: (...args: T) => void, timeout: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function perform(...args: T) {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);

      clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
};
