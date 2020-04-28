import Menu from './menu';
import { preloadFonts } from '../utils';

// Preload typekit fonts
preloadFonts('dba6omz').then(() => {
    document.body.classList.remove('loading');
});

const menu = new Menu(document.querySelector('nav.menu'));