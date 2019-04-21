const ToastComponent = {
    init () {
        this.timeout = null;
        this.element = document.querySelector('.toast')
    },

    showToast (msg) {
        if(this.timeout) clearTimeout(this.timeout);
        this.element.textContent = msg;
        this.element.classList.add('show-toast');
        this.timeout = setTimeout(() => this.element.classList.remove('show-toast'), 3000);
    }
};

export default ToastComponent;