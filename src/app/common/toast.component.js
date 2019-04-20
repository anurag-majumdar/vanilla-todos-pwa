const ToastComponent = {
    init () {
        this.element = document.querySelector('.toast')
    },

    showToast (msg) {
        this.element.textContent = msg;
        this.element.classList.add('show-toast');
        setTimeout(() => this.element.classList.remove('show-toast'), 3000);
    }
};

export default ToastComponent;