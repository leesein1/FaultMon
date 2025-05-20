// mapLayer.js ( map 데이터 변동 현시 )
import { initMap } from './map.js';

let selectedIdx = null;

const redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-red.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
    iconUrl: 'img/marker-icon-orange.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: 'img/marker-icon-green.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: 'img/marker-icon-blue.png',  // 기본: marker-icon.png와 동일
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// 250520 silee - index2 js에서 초기화 하게 하기 위한 함수 추가
function resetMarkerState() {
    arrMark.length = 0;
    markPos.length = 0;
}

function handleMarkerClick(idx) {
    const marker = arrMark[idx];
    const latlng = markPos[idx];

    if (selectedIdx === idx) {
        map.closePopup();
        map.setView([36.3, 127.5], 7);
        marker.setZIndexOffset(0); // 원래 값으로 복원
        selectedIdx = null;
    } else {
        marker.openPopup();
        if (selectedIdx !== null) {
            arrMark[selectedIdx].setZIndexOffset(0);
        }
        marker.setZIndexOffset(1000); 
        map.setView(latlng, 17);
        selectedIdx = idx;
    }
}


let markPos = [];
let arrMark = [];

const map = initMap();  // 하나의 map 인스턴스만 생성
let markerGroup = L.layerGroup().addTo(map);

export { redIcon, orangeIcon, greenIcon, blueIcon, markPos, arrMark, map, markerGroup, resetMarkerState, handleMarkerClick };