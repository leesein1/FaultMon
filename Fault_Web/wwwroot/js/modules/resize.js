// 화면 리사이즈 모듈

import { isMobile } from './device-check.js';

export function resizeObj(map) {
    const tableHeight = $(window).height() - 258;
    const faultDetailHeight = $(window).height() - 390;

    $('.fault-table').css('max-height', tableHeight + 'px');
    $('#map').css('height', tableHeight + 'px');
    map.invalidateSize();
    $(".fault-detail").css('max-height', faultDetailHeight + 'px');
    $('.row .card').toggleClass('mb-4', isMobile());
}
