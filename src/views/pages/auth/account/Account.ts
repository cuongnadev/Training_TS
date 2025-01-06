class Account {
    container: HTMLElement;
    constructor() {
        this.container = document.createElement('div')
    }

    render() {
        return this.container;
    }
}

export default Account;