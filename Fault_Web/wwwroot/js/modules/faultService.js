// faultService.js (api 호출 부)
import { setRecentFault, setFaultDetail } from './faultRender.js';

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
// 250519 silee - 실시간 통계 변동 수치 현시
// 250513 silee - 비율 api
function faultStatToday() {
    $.ajax({
        url: '/Fault/GetStatToday',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
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

//250513 silee - 선택된 고장 상세
function recentFaultDetail(IncidentID) {
    $.ajax({
        url: '/Fault/GetFaultListDetail',
        type: 'GET',
        dataType: 'json',
        data: { IncidentID: IncidentID }, // IncidentID를 서버로 전달
        success: function (res) {
            setFaultDetail(res);
        },
        error: function (xhr, status, error) {
            console.error("오류 발생:", error);
        }
    });
}

export { faultList, faultStatToday, recentFaultDetail };
