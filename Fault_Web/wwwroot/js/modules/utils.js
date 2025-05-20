// utils.js (또는 common.js 등)

// 날짜 포맷 함수
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

function replaceSetTime(datetimeStr) {
    if (!datetimeStr || datetimeStr === null || datetimeStr === "") return "-";
    return datetimeStr.replace("T", " ").split(".")[0];
}


// 알림 호출 함수
function noticall(title) {
    notify(title);  // 전역 함수 notify가 이미 선언되어 있다고 가정
}

//
export { formatSetTime, noticall, replaceSetTime };
