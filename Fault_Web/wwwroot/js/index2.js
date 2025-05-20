// 임시 index2전용 js

// 250513 silee - 모듈 연동
import { initModalHandler } from './modules/modal.js';
import { resizeObj } from './modules/resize.js';
import { formatSetTime, noticall, replaceSetTime } from './modules/utils.js'
import { markPos, arrMark, map, handleMarkerClick  } from './modules/mapLayer.js'
import { faultList, faultStatToday, recentFaultDetail } from './modules/faultService.js'
import { setRecentFault, setFaultDetail, removeDetail } from './modules/faultRender.js';
$(function () {
    // 250513 silee - 기본 연결 함수
    readyContent();
});

async function readyContent() {
    await connectSignalR();
    initModalHandler();
    resizeObj(map);
    $(window).on('resize', () => resizeObj(map));

    // ✅ 모든 초기화 끝났을 때 스피너 제거
    $('#wifi-loader').fadeOut(700, function () {
        $(this).remove();
    });
}

var connection_db = null;

async function connectSignalR() {
    connection_db = new signalR.HubConnectionBuilder()
        .withUrl("/SignalRChat")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection_db.on("Signal_FLTLIST", () => {
        console.log("✅ 확인이요 (클라이언트 메시지 받음)");
        LoadScreenData();
    });

    connection_db.start()
        .then(() => {
            console.log("✅ SignalR DB connection Success.");
            connection_db.invoke("GetAll");
            LoadScreenData();
        })
        .catch(err => {
            console.error("SignalR 연결 실패:", err.toString());
        });
}

/* 이동하기전에 여기서 컨트롤러 들 마무리 할 것*/
// 250519 silee 화면 현시에 필요한 데이터 함수 
function LoadScreenData() {
    /* 1. 함수 리스트 현시 */
    faultList();
    /* 2. 통게 데이터 현시 */
    faultStatToday();
}

// 250520 silee 클릭 이벤트 함수
window.clk_tr = function (key, idx) {
    let $targetTr = $("#tr-" + key);

    if ($targetTr.hasClass("select-tr")) {
        // 이미 선택된 항목을 다시 누르면 선택 해제
        $targetTr.removeClass("select-tr");
        handleMarkerClick(idx);
        removeDetail();

    } else {
        // 다른 항목 선택 시 기존 선택 해제하고 새로 선택
        $("#fault-tbody-id .select-tr").removeClass("select-tr");
        $targetTr.addClass("select-tr");

        handleMarkerClick(idx);
        recentFaultDetail(key);
    }
};


