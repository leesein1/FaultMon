// 모달 제어 연결

import { recentFaultDetailPop } from './faultService.js'

export function initModalHandler() {
    const modalEl = document.getElementById('myModal');
    if (!modalEl) return;

    const myModal = new bootstrap.Modal(modalEl);

    $('.fault-tbody').on('dblclick', 'tr', async function () {
        const incidentID = $(this).data('incident-id'); // 예시
        try {
            await recentFaultDetailPop(incidentID); // 모든 준비 완료 기다림
            myModal.show(); // 그 다음 모달 띄우기
        } catch (err) {
            console.log("모달 표시 실패:", err);
        }
    });
}

