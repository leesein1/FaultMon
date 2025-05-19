// map.js
export function initMap() {
  const map = L.map('map').setView([36.3, 127.5], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);


  // ✅ 초기화 직후에도 강제 크기 재계산 (100ms 후)
  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  // ✅ 휠 줌(혹은 버튼 줌) 끝난 후에도 크기 재계산
  map.on('zoomend', () => {
    map.invalidateSize();
  });

  return map;
}
