export const addEventListener = <T extends keyof HTMLElementEventMap> (
    el: HTMLElement,
    event: T,
    cb: (e: HTMLElementEventMap[T]) => void,
    options: AddEventListenerOptions
) => {
    el.addEventListener(event, cb, options);
    return () => el.removeEventListener(event, cb);
}
