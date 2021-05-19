"use strict";

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 30000);

    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2021-08-20/00:00:00');
    slider({
        slide: '.offer__slide',
        container: '.offer__slider',
        arrows: '.offer__slider-counter',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapperSlider: '.offer__slider-wrapper',
        field: '.offer__slider-track'
    });

});