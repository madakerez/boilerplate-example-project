import $ from 'jquery';
import TweenMax from 'TweenMax';

export default class MobileMenuControler {
    constructor(btn, menuWrap) {
        this.$btn = btn;
        this.$menuWrap = menuWrap;
        this.$nav = this.$menuWrap.find('nav');
        this.isVisible = null;
        this.time = 0.5;
        this.init();
    }

    init() {
        this.attachListeners();
    }

    attachListeners() {
        this.$btn.bind('click', e => this.ctrlAnim());
        this.$nav.bind('click', e => this.ctrlAnim());
    }

    dettachListeners(){
        this.$btn.unbind('click');
    }

    ctrlAnim(){
        if(!this.isVisible){
            this.toggleMenu(1,'auto', true);
            $('html').css('overflow','hidden');
        }
        else {
            this.toggleMenu(0, 'none', false);
            $('html').css('overflow','auto');
        }
    }

    toggleMenu(opacity, event, state){
        TweenMax.to(this.$menuWrap, this.time, {
            onStart: () => {
                this.dettachListeners();
            },
            ease: Power4.easeInOut,
            opacity: opacity,
            pointerEvents: event,

            onComplete: () => {
                this.isVisible = state;
                this.attachListeners();
            }
        });
    }



}