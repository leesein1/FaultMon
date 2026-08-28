# FaultMon V1

.NET 8 MVC로 구현한 차량 고장 관제 시스템의 기존 버전입니다.

실무에서 접했던 관제 시스템 구조를 개인 프로젝트로 다시 구현했습니다. 현재는 React 프론트와 ASP.NET Core API로 분리한 V2로 개편 중입니다.

- V2 Front: [FaultMon-Front](https://github.com/leesein1/FaultMon-Front)
- V2 API: [08.SeinServices.Api](https://github.com/leesein1/08.SeinServices.Api)

---

## 주요 기능

- 최근 고장 목록 조회
- 고장 상세 정보 표시
- Leaflet 기반 고장 위치 표시
- 상태별 지도 마커
- 금일 처리 통계
- SQL Dependency + SignalR 기반 실시간 알림
- Service Broker를 이용한 DB 변경 감지

---

## 기술

**Backend**  
`.NET 8 MVC` `C#` `SignalR`

**Frontend**  
`JavaScript` `jQuery` `Bootstrap` `Leaflet`

**Database**  
`MSSQL` `SQL Dependency` `Service Broker`

기존 배포는 AWS EC2 + IIS 환경에서 진행했으며 현재는 중단된 상태입니다.

---

## 구조

```text
Browser
  │
  ▼
.NET 8 MVC
  ├─ Controller
  ├─ Service
  └─ DAO
      │
      ▼
    MSSQL
      │
      ├─ SQL Dependency
      └─ Service Broker
              │
              ▼
           SignalR
```

화면 쪽 JavaScript는 지도, 테이블, 알림 등 기능별 모듈로 분리했습니다.

---

## Demo

<details>
<summary><b>Web</b></summary>
<br/>
<img src="./video/web.gif" width="1000" alt="FaultMon Web Demo" />
</details>

<details>
<summary><b>Mobile</b></summary>
<br/>
<img src="./video/mobile.gif" width="240" alt="FaultMon Mobile Demo" />
</details>

---

## V2에서 바꾼 부분

V1은 MVC 프로젝트 안에 화면과 서버 로직이 함께 있습니다.

V2에서는 React 프론트와 ASP.NET Core API를 별도 저장소로 분리했습니다. 고장 조회 기능은 API로 이관했고 실시간 갱신은 SignalR Hub를 사용합니다.

누적 고장 이력 검색도 V2에서 별도 화면과 API로 추가했습니다.
