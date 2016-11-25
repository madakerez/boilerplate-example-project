import Common from 'common';
import $ from 'jquery';


import OverlayManager from 'components/overlayManager.js';
import DrawTile from 'components/drawTile.js';
import MobileMenuControler from 'components/mobileMenuControler.js';
import TweenMax from 'TweenMax';

let data = null;

const getJSONData = function (){
    $.ajax({
        dataType: "json",
        url: 'assets/data.json',
        success: function(res){
           data = res;
            App.init();
        },
        error: function(error){
            console.log(error);
        }
    });
};

getJSONData();


let App =  {
    init: function(){
        const mainWrap = $('#main-section-wrap');
        const navAnchors =  $('nav a');

        const nav = {
            video: $('a[href="#video"]'),
            animations: $('a[href="#animations"]'),
            contact: $('a[href="#contact"]')
        };

        const $hamburger = $('.hamburger-wrap');
        const $mobileMenuWrap = $('#mobile-menu');

        const mobileMenuControler = new MobileMenuControler($hamburger, $mobileMenuWrap);

        const resetContent = function(){
            mainWrap.empty();
            navAnchors.removeClass('active');
        };

        mainWrap.load("video.html", function () {
            initVideoPage();
        });

        nav.video.click(function () {

            resetContent();

            $(this).addClass('active');

            mainWrap.load("video.html", function () {
                initVideoPage();
                fadeInOutContent();
            });
        });

        nav.contact.click(function (){

            resetContent();
            $(this).addClass('active');
            mainWrap.load("contact.html", function () {
                fadeInOutContent();
            });
        });


        nav.animations.click(function (){

            resetContent();
            $(this).addClass('active');
            mainWrap.load("animations.html", function () {
                initAnimationsPage();
                fadeInOutContent();
            });
        });

        const fadeInOutContent = function(){

            TweenMax.fromTo(mainWrap, 1, {
                ease: Power4.easeInOut,
                opacity: 0,
            }, {
                opacity: 1
            });
        };


        const initVideoPage = function() {

            $.each(data.home, (index, item)=> {
                let _tile = new DrawTile(item);
            });

            const tiles = $('.tile');

            $.each(tiles, (index, item)=> {
                let $item = $(item);
                let overlayManager = new OverlayManager($item, data, 'home');
            });
        };

        const initAnimationsPage = function() {

            $.each(data.animations, (index, item)=> {
                let _tile = new DrawTile(item);
            });

            const tiles = $('.tile');

            $.each(tiles, (index, item)=> {
                let $item = $(item);
                let overlayManager = new OverlayManager($item, data, 'animations');
            });
        };



    }

}


