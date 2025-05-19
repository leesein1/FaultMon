// 모바일 체크 함수 모듈

// 250503 silee - 모바일 체크 함수
export function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}