import $ from 'jquery';
import TweenMax from 'TweenMax';

export default class OverlayManager {
    constructor(tile, data, layoutType, tileid) {
        this.$tile = tile;
        this.$tpl = $('#tpl-overlay-default');
        this.$overlayWrap = $('#overlay-wrap');
        this.$tileRow = this.$tile.closest('.video-row');
        this.$tileId = $(this.$tileRow).data().tileid;

        this.layoutType = layoutType;
        this.data = data[this.layoutType];
        this.dataSize =  Object.keys(this.data).length;;

        this.$tileData = this.data[this.$tileId];

        this.$exitBtn = null;
        this.$nextBtn = null;
        this.$prevBtn = null;
        this.$videoContainer = null;

        this.$endpoint = '//player.vimeo.com/video/'
        this.time = 0.5;
        this.init();
    }

    init() {
        this.attachOverlayListeners();
    }

    attachOverlayListeners() {

        this.$tile.bind('click', e => this.showOverlay());
    }

    dettachOverlayListenres(){
        this.$tile.unbind('click');
    }

    attachNavigationListeners(){
        this.$nextBtn = $('a[href="#next"]');
        this.$prevBtn = $('a[href="#prev"]');

        this.$nextBtn.bind('click', e => this.showNextVideo());
        this.$prevBtn.bind('click', e => this.showPrevVideo());

    }


    showNextVideo(){



        if (this.$tileId < this.dataSize -1) {
            this.$tileId = this.$tileId + 1;
            this.$tileData = this.data[this.$tileId];


        }
        else {
            this.$tileId = 0;
            this.$tileData = this.data[this.$tileId];

        }

        this.prepareTplContent();

    }

    showPrevVideo(){

        if(this.$tileId != 0) {
            this.$tileId = this.$tileId - 1;
            this.$tileData = this.data[this.$tileId];
        }
        else {
            this.$tileId = this.dataSize -1;
            this.$tileData = this.data[this.$tileId];

        }
        this.prepareTplContent();
    }


    attachExitBtnEvent(){
        this.$exitBtn = $('.exit-btn-container');
        this.$exitBtn.bind('click', e => this.hideOverlay());
    }
    dettachExitBtnEvent(){
        this.$exitBtn.unbind('click');
    }

    appendTpl(){
        let _tpl = this.$tpl.html();
        this.$overlayWrap.append(_tpl);
        this.prepareTplContent();
    }

    prepareTplContent(){

        //set current tile video id
        let iframe = this.$overlayWrap.find('iframe');
        iframe.prop('src',this.prepareVideoEndpoint());

        //set proper title
        this.$overlayWrap.find('.title').text(this.$tileData.header);

        //set tags
        this.$overlayWrap.find('.tag').text(this.$tileData.tags);
    }

    removeTpl(){
        this.$overlayWrap.empty();
    }

    prepareVideoEndpoint(){

        let _videoTpl =  this.$endpoint + this.$tileData.video_id;
        return _videoTpl;
    }

    showOverlay() {

        this.appendTpl();
        $('html').css('overflow','hidden');

        TweenMax.to(this.$overlayWrap, this.time, {
            ease: Power4.easeInOut,
            opacity: 1,
            onComplete: ()=>{
                this.dettachOverlayListenres();
                this.attachExitBtnEvent();
                this.attachNavigationListeners();
            }
        });
    }

    resetContext (){
        this.$tileRow = this.$tile.closest('.video-row');
        this.$tileId = $(this.$tileRow).data().tileid;
        this.$tileData = this.data[this.$tileId];
    }

    hideOverlay(){
        TweenMax.to(this.$overlayWrap, this.time, {
            ease: Power4.easeInOut,
            opacity: 0,
            onComplete: ()=> {
                this.dettachExitBtnEvent();
                this.removeTpl();
                this.attachOverlayListeners();
                this.resetContext();
                this.prepareTplContent();
                $('html').css('overflow','auto');
            }

        });
    }

    switchVideoTransition(){
        this.$videoContainer = $('.embedded-video-wrap');


        TweenMax.to(this.$videoContainer, this.time, {
            ease: Power4.easeInOut,
            opacity: 0,
            onComplete: ()=> {


                $('iframe').load(()=>{
                    TweenMax.to(this.$videoContainer, this.time, {
                        ease: Power4.easeInOut,
                        opacity: 1
                    })
                })
            }
        })
    }

}
