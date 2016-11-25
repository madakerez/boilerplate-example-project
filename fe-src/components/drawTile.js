import $ from 'jquery';
import TweenMax from 'TweenMax';

export default class DrawTile {
    constructor($item) {
        this.item = $item;
        this.column = $('.video-column-'+this.item.column);
        this.appendTile();

    }

    prepareTileTpl(){
        let _tpl = `<div data-videoid="${this.item.video_id}"
        data-tileid="${this.item.id}"
        class="video-row video-row-${this.item.size}">
            <div class="tile tile-${this.item.size}">
                <img src="images/video/tiles/${this.item.thumb_name}" alt="${this.item.header}"/>
                <div class="tile-overlay">
                    <h2>${this.item.header}</h2>
                </div>
            </div>
        </div>`;

        return _tpl;
    }

    appendTile(){
        let _column = this.column;
        let tpl = this.prepareTileTpl();

        _column.append(tpl);

    }



}
