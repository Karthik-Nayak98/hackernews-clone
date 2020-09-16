export const debounce = (func, delay) => {
  let timer;
  return function () {
    const context = this,
      args = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }

}