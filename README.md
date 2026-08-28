# FaultMon V1

.NET 8 MVC로 구현한 차량 고장 관제 시스템의 첫 버전입니다.

실무에서 접했던 관제 시스템 구조를 개인 프로젝트로 다시 구현했습니다. 화면과 서버 로직이 한 MVC 프로젝트에 들어 있으며, 이후 V2에서 React 프론트와 ASP.NET Core API로 분리했습니다.

- V2 Front: [FaultMon-Front](https://github.com/leesein1/FaultMon-Front)
- V2 API: [08.SeinServices.Api](https://github.com/leesein1/08.SeinServices.Api)

---

## 시작 배경

실무에서 차량 고장 관제 시스템을 접하면서 실시간 목록, 지도, 상태 변경 알림 같은 기능이 어떻게 연결되는지 직접 다시 구성해보고 싶었습니다.

회사 시스템을 그대로 가져온 것이 아니라, 경험했던 업무 흐름을 기준으로 개인 프로젝트를 새로 만들었습니다. 첫 버전은 .NET 8 MVC 안에서 화면과 서버 기능을 함께 구현했습니다.

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

## 기술과 구조

**Backend**  
`.NET 8 MVC` `C#` `SignalR`

**Frontend**  
`JavaScript` `jQuery` `Bootstrap` `Leaflet`

**Database**  
`MSSQL` `SQL Dependency` `Service Broker`

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

화면 JavaScript는 지도, 테이블, 알림 등 기능별 모듈로 분리했습니다.

과거 AWS EC2 + IIS 환경에 배포했으며 현재 해당 배포는 중단된 상태입니다.

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

## V2에서 변경한 부분

V1의 MVC 통합 구조를 React 프론트와 ASP.NET Core API로 나눴습니다. 고장 조회 기능은 공용 API 서버로 옮기고, 실시간 갱신은 SignalR Hub를 사용합니다.

V1에 없던 누적 고장 이력 검색 화면과 검색 API도 추가했습니다.
