export class EventEmitter {
    private eventListeners: { [key: string]: Function[] } = {};

    // Đăng ký sự kiện
    on(event: string, callback: Function): void {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    // Hủy đăng ký sự kiện
    off(event: string, callback: Function): void {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter((listener) => listener !== callback);
        }
    }

    // Kích hoạt sự kiện
    emit(event: string, ...args: any[]): void {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach((callback) => callback(...args));
        }
    }
}
