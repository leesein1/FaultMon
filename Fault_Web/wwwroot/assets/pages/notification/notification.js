'use strict';

// 전역 범위에서 notify 함수 정의
function notify(_title, _message) {
    isMobile();

    let from = 'top';
    let align = 'right';
    let icon = '';
    let type = 'inverse';
    let animIn = 'animated bounceInLeft';
    let animOut = 'animated bounceOutLeft';

    if (mobile) {
        $.growl({
            icon: icon,
            title: _title,
            message: _message,
            url: ''
        }, {
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                from: from,
                align: align
            },
            offset: {
                x: 30,
                y: 30
            },
            spacing: 10,
            z_index: 999999,
            delay: 5000,
            timer: 5000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: animIn,
                exit: animOut
            },
            icon_type: 'class',
            template: '<div data-growl="container" class="alert" role="alert" style="background-color:#c62e2e;">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon"></span>' +
                '<span data-growl="title" style="font-size: 12px !important;"></span>' +
                '<span data-growl="message"></span>' +
                '<a href="#" data-growl="url"></a>' +
                '</div>'
        });
    } else {
        $.growl({
            icon: icon,
            title: _title,
            message: _message,
            url: ''
        }, {
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                from: from,
                align: align
            },
            offset: {
                x: 30,
                y: 30
            },
            spacing: 10,
            z_index: 999999,
            delay: 5000,
            timer: 5000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: animIn,
                exit: animOut
            },
            icon_type: 'class',
            template: '<div data-growl="container" class="alert" role="alert" style="background-color:#c62e2e">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon"></span>' +
                '<span data-growl="title"></span>' +
                '<span data-growl="message"></span>' +
                '<a href="#" data-growl="url"></a>' +
                '</div>'
        });
    }
}

$(document).ready(function () {
    $('.notifications .btn').on('click', function (e) {
        e.preventDefault();
        notify('[05-14 06:55] - 150606 편성 [MF] ', '신호장치 비상제동 계전기 소자(EMR1)');
    });
});

var mobile = null;

function isMobile() {
    var userAgent = navigator.userAgent;
    mobile = /(iPhone|iPad|Android|BlackBerry|Windows Phone)/i.test(userAgent);

}