export default function createHistory() {
    const listeners: (() => void)[] = [];

    function push(path: string) {
        window.history.pushState({}, '', path);
        notify();
    }

    function listen(listener: () => void) {
        listeners.push(listener);
        window.addEventListener('popstate', notify);
    }

    function notify() {
        listeners.forEach((listener) => listener());
    }

    return { push, listen };
}
