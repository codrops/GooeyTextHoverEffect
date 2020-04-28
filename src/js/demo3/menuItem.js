import { gsap } from 'gsap';

export default class MenuItem {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.textsGroupEl = this.DOM.el.querySelector('svg > g');
        this.filterId = this.DOM.el.querySelector('svg filter').id;
        
        [this.DOM.text_1, this.DOM.text_2] = this.DOM.textsGroupEl.querySelectorAll('text');
        
        this.DOM.feBlur = document.querySelector(`#${this.filterId} > feGaussianBlur`);
        this.primitiveValues = {stdDeviation: 0};

        this.createTimeline();
        this.initEvents();
    }
    initEvents() {
        this.onMouseEnterFn = () => {
            this.DOM.textsGroupEl.style.filter = `url(#${this.filterId})`;
            this.tl.play();
        }
        this.onMouseLeaveFn = () => {
            this.DOM.textsGroupEl.style.filter = `url(#${this.filterId})`;
            this.tl.reverse();
        }
        this.DOM.el.addEventListener('mouseenter', this.onMouseEnterFn);
        this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveFn);
    }
    createTimeline() {
        // init timeline
        this.tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.DOM.textsGroupEl.style.filter = 'none';
            },
            onReverseComplete: () => {
                this.DOM.textsGroupEl.style.filter = 'none';
            },
            onUpdate: () => {
                this.DOM.feBlur.setAttribute('stdDeviation', this.primitiveValues.stdDeviation)
            }
        })
        .to(this.primitiveValues, { 
            duration: 0.4,
            ease: "none",
            startAt: {stdDeviation: 0},
            stdDeviation: 1
        }, 0)
        .to(this.primitiveValues, { 
            duration: 0.4,
            ease: "none",
            stdDeviation: 0
        })

        .to(this.DOM.text_1, { 
            duration: 0.8,
            ease: "none", // Power1.easeInOut
            opacity: 0
        }, 0)
        .to(this.DOM.text_2, { 
            duration: 0.8,
            ease: "none", // Power1.easeInOut
            opacity: 1
        }, 0)
        .to(this.DOM.text_1, { 
            duration: 0.8,
            ease: "Power1.easeInOut",
            y: -5
        }, 0)
        .to(this.DOM.text_2, { 
            duration: 0.8,
            ease: "Power1.easeInOut",
            startAt: {y: 5},
            y: 0
        }, 0);
    }
}