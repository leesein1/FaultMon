// 모달 제어 연결

export function initModalHandler() {
    const modalEl = document.getElementById('myModal');
    if (!modalEl) return; // 예외 처리

    const myModal = new bootstrap.Modal(modalEl);

    $('.fault-tbody').on('dblclick', 'tr', function () {
        myModal.show();
    });
}
