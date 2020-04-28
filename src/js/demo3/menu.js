import MenuItem from './menuItem';

export default class Menu {
    constructor(el) {
        this.DOM = {el: el};
        this.items = [];
        [...this.DOM.el.querySelectorAll('.menu__item')].forEach(item => this.items.push(new MenuItem(item)));
    }
}