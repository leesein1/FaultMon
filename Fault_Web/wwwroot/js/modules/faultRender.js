import {
    redIcon, orangeIcon, greenIcon, blueIcon,
    markPos, arrMark, map, markerGroup, resetMarkerState
} from './mapLayer.js';

import { formatSetTime, noticall, replaceSetTime } from './utils.js';

let title_old = '';
let idx = 0;

function setRecentFault(arrDB) {

    let selectedID = $("#fault-tbody-id .select-tr").attr("id");
    if (selectedID) {
        selectedID = selectedID.replace("tr-", "");
    }

    resetMarkerState();
    markerGroup.clearLayers(); // ✅ 루프 바깥에서 1번만

    const fdata1 = [];
    const fdata2 = [];
    let htmlBuffer = [];

    $("#fault-tbody-id").empty();

    for (let i = 0; i < arrDB.length; i++) {
        const row = arrDB[i];

        // ✅ 시간 포맷 한 번만
        const formattedTime = formatSetTime(row.SetTime);

        // 상태 → 텍스트 + 클래스 + 아이콘 결정
        let StatTxt = '완료';
        let StatClassTxt = 'badge text-bg-success';
        let markerIcon = greenIcon;

        if (row.Stat === 0) {
            StatTxt = '접수완료';
            StatClassTxt = 'badge text-bg-danger';
            markerIcon = redIcon;
        } else if (row.Stat === 1) {
            StatTxt = '출동중';
            StatClassTxt = 'badge text-bg-warning';
            markerIcon = orangeIcon;
        } else if (row.Stat === 2) {
            StatTxt = '수리중';
            StatClassTxt = 'badge text-bg-info';
            markerIcon = blueIcon;
        }

        // ✅ 테이블 행 구성 버퍼에 저장
        htmlBuffer.push(`
      <tr id="tr-${row.IncidentID}"onclick="clk_tr('${row.IncidentID}',${i})">
        <td><span class="${StatClassTxt}">${StatTxt}</span></td>
        <td><span>${row.ReceiptNo}</span></td>
        <td><span>${formattedTime}</span></td>
        <td><span>${row.FaultName}</span></td>
        <td><span>${row.MangerName}</span></td>
      </tr>
    `);

        // 마커 정보 저장
        fdata1.push(`접수번호 : ${row.ReceiptNo}`);
        fdata2.push(`고장명칭:${row.FaultName}`);
        markPos.push([row.GPS_Lati, row.GPS_Long]);

        const newMarker = L.marker([row.GPS_Lati, row.GPS_Long], { icon: markerIcon })
            .bindPopup(`${fdata1[i]}<br>${fdata2[i]}`);
        arrMark.push(newMarker);

        // 알림 비교
        const title = `[접수번호 : ${row.ReceiptNo}] - [${row.FaultName}]- [${formattedTime.split(' ')[1]}]`;
        if (i === 0 && idx !== 0 && title_old !== title) {
            noticall(title);
            title_old = title;
        }
    }

    idx++;

    $("#fault-tbody-id").append(htmlBuffer.join(''));

    // ✅ 마커 그룹 일괄 렌더
    arrMark.forEach(marker => markerGroup.addLayer(marker));

    // 렌더링 끝나고 선택 복원
    if (selectedID) {
        const idx = arrDB.findIndex(row => row.IncidentID == selectedID);
        if (idx !== -1) {
            clk_tr(selectedID, idx);
        }
    }
}

function setFaultDetail(arrDB) {
    const row = arrDB[0];
    const {
        IncidentID, ReceiptNo, SetTime, FaultID, FaultName,
        AssignedTime, EndTime, CustomerName, C_ViheicleLicense,
        GPS_Lati, GPS_Long, LocationText, MangerID, MangerName,
        VehicleID, Stat, FaultText, FaultAct1, FaultAct2, FaultAct3
    } = row;

    const setTimeFormatted = replaceSetTime(SetTime);
    const assignedTimeFormatted = replaceSetTime(AssignedTime);
    const endTimeFormatted = replaceSetTime(EndTime);

    const badgeMap = {
        0: 'bg-danger',
        1: 'bg-warning',
        2: 'bg-primary',
        3: 'bg-success'
    };
    const badgeColor = badgeMap[Stat] || 'bg-secondary';

    // 기본 현시
    $("#span-d-ReceiptNo").text(ReceiptNo);
    $("#span-d-SetTime").text(setTimeFormatted);
    $("#span-d-AssignedTime").text(assignedTimeFormatted);
    $("#span-d-EndTime").text(endTimeFormatted);
    $("#span-d-CustomerName").text(CustomerName);
    $("#span-d-C_ViheicleLicense").text(C_ViheicleLicense);
    $("#span-d-LocationText").text(LocationText);

    // 하단 HTML 구성
    let html = `
        <div style="margin-top: 15px;">
            <span class="badge ${badgeColor} rounded-circle d-inline-flex justify-content-center align-items-center" style="width: 28px; height: 28px; vertical-align: top;"></span>
            <span id="span-d-footer-FaultName" style="font-size:1.4rem; margin-left:5px; font-weight:bold;">${FaultName}</span>
        </div>
    `;

    [FaultAct1, FaultAct2, FaultAct3].forEach((act, i) => {
        html += `
            <div style="margin-top: 15px; margin-bottom:15px; font-size: 1.1rem;">
                <span class="badge bg-secondary rounded-circle d-inline-flex justify-content-center align-items-center" style="width: 28px; height: 28px; vertical-align: bottom;">
                    ${i + 1}
                </span>
                <span>${act || '-'}</span>
            </div>
        `;
    });

    // 출력 적용할 대상이 있다면 여기에 삽입
    $("#fault-detail-footer-id").html(html);
}

// 250520 silee - 빈값 현시를 위한 함수 
function removeDetail() {
    $("#span-d-ReceiptNo").text("");
    $("#span-d-SetTime").text("");
    $("#span-d-AssignedTime").text("");
    $("#span-d-EndTime").text("");
    $("#span-d-CustomerName").text("");
    $("#span-d-C_ViheicleLicense").text("");
    $("#span-d-LocationText").text("");

    $("#fault-detail-footer-id").empty();
}

export { setRecentFault, setFaultDetail, removeDetail };
