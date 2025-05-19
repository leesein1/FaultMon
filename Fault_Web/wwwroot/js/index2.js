// 임시 index2전용 js

// 250513 silee - 모듈 연동
import { initMap } from './map.js';
import { initModalHandler } from './modules/modal.js';
import { resizeObj } from './modules/resize.js';

const map = initMap();  // 하나의 map 인스턴스만 생성
let markPos = [];
let arrMark;
let title_old = '';
let idx = 0;
// 전역 변수로 레이어 그룹을 선언합니다.
let markerGroup = L.layerGroup().addTo(map);

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
    $('#wifi-loader').fadeOut(500, function () {
        console.log("..?");
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

// 250519 silee - 실시간 통계 변동 수치 현시 
function faultStatToday(){
    $.ajax({
        url: '/Fault/GetStatToday',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log("통계 JSON : ", res);
            $("#span-TotalCount").text(res[0].TotalCount);
            $("#span-InProgressCount").text(res[0].InProgressCount);
            $("#span-CompletedCount").text(res[0].CompletedCount);
            $("#span-CompletedRate").text(res[0].CompletedRate);
        },
        error: function (xhr, status, error) {
            console.error("오류 발생:", error);
        }
    });
}
// 250513 silee - 실시간 고장 이력
function faultList() {
    $.ajax({
        url: '/Fault/GetFaultList',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            setRecentFault(res);
        },
        error: function (xhr, status, error) {
            console.error("오류 발생:", error);
        }
    });
}

// 250513 silee - 비율 api
function b() {

}

//250513 silee - 선택된 고장 상세
function c() {

}


/* 테이블 셋팅 함수 및 모듈 */
function setRecentFault(arrDB) {
    const fdata1 = [];
    const fdata2 = [];
    let html = '';
    let notiSetTimeString = '';
    arrMark = [], markPos = [];

    $("#fault-tbody-id").empty();

    for (let i = 0; i < arrDB.length; i++) {
        const row = arrDB[i];
        const notiSetTimeString = row.SetTime.split('T')[1].substring(0, 8);
        let StatTxt = '';
        let StatClassTxt = ''
        switch (row.Stat) {
            case 0:
                StatTxt = '접수완료';
                StatClassTxt = 'badge text-bg-danger';
                break;
            case 1:
                StatTxt = '출동중';
                StatClassTxt = 'badge text-bg-warning';
                break;
            case 2:
                StatTxt = '수리중';
                StatClassTxt = 'badge text-bg-info';
                break;
            case 3:
                StatTxt = '완료';
                StatClassTxt = 'badge text-bg-success';
                break;
        }

        html += '<tr>';
        html += `<td><span id="td-span-StatTxt" class="${StatClassTxt}" >${StatTxt}</span></td>`;
        html += `<td><span id="td-span-ReceiptNo">${row.ReceiptNo}</span></td>`;
        html += `<td><span id="td-span-SetTime">${formatSetTime(row.SetTime)}</span></td>`;
        html += `<td><span id="td-span-FaultName">${row.FaultName}</span></td>`;
        html += `<td><span id="td-span-MangerName">${row.MangerName}</span></td>`;
        html += '</tr>';

        markerGroup.clearLayers();
        fdata1.push(`접수번호 : ${row.ReceiptNo}`);
        fdata2.push(`고장명칭:${row.FaultName}`);

        markPos.push([row.GPS_Lati, row.GPS_Long]);
        const newMarker = L.marker([row.GPS_Lati, row.GPS_Long]).bindPopup(`${fdata1[i]}<br>${fdata2[i]}`);
        arrMark.push(newMarker);

        const title = `[접수번호 : ${row.ReceiptNo}] - [${row.FaultName}]- [${notiSetTimeString}] `;

        if (i === 0 && idx != 0 && title_old !== title) {
            noticall(title);
            title_old = title;
        }
    }
    idx++;

    // 지도 마커 추가 
    arrMark.forEach(marker => markerGroup.addLayer(marker));
    $("#fault-tbody-id").append(html);
}

function formatSetTime(datetimeStr) {
    if (!datetimeStr) return '';

    const date = new Date(datetimeStr);

    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const DD = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${MM}-${DD} ${hh}:${mm}:${ss}`;
}


function noticall(title) {
    notify(title);
}