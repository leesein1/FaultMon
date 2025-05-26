### 🚗 실시간 차량 사고/고장 관제 시스템
---


## 🚀 시스템 구성 및 접근 방법

- 본 시스템은 **.NET 8 MVC 기반 웹 애플리케이션**으로,  
  백엔드와 프론트엔드가 하나의 프로젝트 내에서 함께 구성되어 있습니다.

- MSSQL을 통해 데이터 연동 및 실시간 알림 처리(SignalR)를 구현하였으며,  
  완성된 웹 시스템은 **AWS EC2 인스턴스에 배포되어 IIS를 통해 서비스 중**입니다.
  
🌐 [**실시간 관제 시스템 바로가기**] [http://silee-portfolio1.shop] (http://silee-portfolio1.shop)

## 📌 프로젝트 개요

이 프로젝트는 택시, 공유차량, 운송 차량 등에서 발생할 수 있는 **사고나 고장 상황을 실시간으로 감지하고**,  
지도 기반 관제 화면을 통해 관리자에게 빠르게 전달하는 시스템입니다.

- DB에 Insert 발생 시, 실시간 알림 자동 표시  
- 지도 기반 위치 시각화 및 상태 업데이트 제공  
- 관리자 관제 페이지를 통해 즉각적인 상황 파악 및 대응 가능  

운영자 입장에서 **현장 상황을 한눈에 파악할 수 있도록 도와주는 실시간 대응 지원 도구**입니다.

---

## 🍀 개발 목적

이 프로젝트는 제가 실제로 근무했던 회사에서 경험했던 시스템을 바탕으로,  
**객체지향 설계, 구조 개선, 코드 모듈화**를 목표로 새롭게 개인적으로 개발한 프로젝트입니다.

---

### 🎯 주요 목표

#### 1. **객체지향 설계 기반의 구조 개선**

기존 시스템은 절차적인 방식으로 작성되어 유지보수가 어렵고 코드가 복잡했습니다.  
본 프로젝트에서는 **.NET 8 MVC 구조에 따라 컨트롤러-서비스-DAO로 역할을 분리**하고,  
객체지향적인 코드 설계를 통해 **가독성, 유지보수성, 확장성**을 크게 개선했습니다.

---

#### 2. **자바스크립트 모듈화로 역할별 코드 분리**

실시간 알림, 지도 렌더링, 테이블 처리 등 **UI 로직을 기능별로 JS 모듈로 나누고,  
`import/export`를 통해 필요한 기능만 로딩하는 방식**으로 구성했습니다.

이를 통해 **코드의 재사용성, 유지보수성**이 향상되었고,  
관제 페이지의 기능을 보다 깔끔하게 관리할 수 있게 되었습니다.

---

#### 3. **기술 스택에 대한 실전 이해도 향상**

이전에 사용했던 기술(MSSQL, SignalR, SQL Dependency, Service Broker 등)을  
이번에는 직접 처음부터 다시 구성하며,  
**실시간 통신 처리, DB 이벤트 연동, 지도 API 연계** 등 다양한 기술적 요소를  
스스로 설계하고 구현해보며 **기술에 대한 깊이 있는 이해와 실전 감각**을 키울 수 있었습니다.


## ⚙️ 핵심 기술 및 사용 환경

| 분야           | 기술 스택 및 도구                                      | 세부 내용                                                              |
|----------------|--------------------------------------------------------|------------------------------------------------------------------------|
| **Frontend**   | HTML / CSS / JavaScript, Leaflet.js, AdminLTE 4, jQuery, Bootstrap 5 | 지도 기반 실시간 위치 표시, 템플릿 커스터마이징, UI 동작 및 이벤트 처리 |
| **Backend**    | C#, .NET 8.0                                           | MVC 구조, 컨트롤러-서비스-DAO 분리, SignalR 통한 실시간 알림 처리     |
| **Database**   | MSSQL                                                  | SQL Dependency, Service Broker 연동 처리                              |
| **Modules**    | JavaScript 모듈화 (ES6 import/export)                 | 기능별 JS 파일 분리, 유지보수성과 재사용성 향상                       |
| **Dev Tools**  | Visual Studio 2022, SSMS, Git                          | 개발 및 디버깅, DB 관리, 버전관리                                      |
| **Deployment** | AWS EC2, IIS                                           | EC2 인스턴스를 이용한 서버 운영 및 배포, IIS를 통한 서비스 호스팅     |



✅ 관제 서비스 기능 리스트

## 🧾 사고/고장 리스트
1. 접수됨, 배정됨, 처리 완료됨 상태별 리스트 표시
2. 필터 (날짜, 지역, 상태 등)

## 🔔 고장 발생 시 알림 발생
**SQL Dependency + SignalR + Service Broker**
1. 실시간 팝업 표시 ( 우측 상단 현시 [접수번호] - 고장명 - 시간)
2. 알림 클릭 시 지도 줌 인 & 고장 요약 팝업
3. 실시간 고장 테입르 더블클릭 시 -> 팝업 현시 ( 고장 관련 정보 / 담당자 관련 정보 )

## 🗺 지도 위 고장 위치 시각화
1. Leaflet을 이용해 고장 위치 마커 표시
2. 마커 색상: 상태별 (예: 빨강=접수완료, 주황=출동중, 파랑=수리중 , 초록 = 완료)
3. 마커 클릭 시 상세 정보 툴팁

**고장 클릭시 팝업 처리로**
──────────────
🚨 [고장 유형] 엔진 이상
📍 차량번호: 12가 3456
📅 발생 시간: 2025-04-22 15:30
🗺 위치: 인천광역시 중구

👤 접수자: 이세인 (자동 등록 또는 수동 등록자)
📞 연락처: 010-XXXX-XXXX

---

🧑‍🔧 담당자: 김담당
📞 연락처: 010-XXXX-XXXX
🚗 출동 차량: 정비차량 1호
📍 현재 위치: [위치 표시 or 도착 예정]
🕐 배정 시간: 2025-04-22 15:45
──────────────

## 📊 실시간 처리 통계/카운터 현시

**상단 또는 사이드에 요약 정보 그래프 추가**

금일 발생 건수 / 처리 중 건수 / 완료 건수 / 완료율(%) / 평균 처리 시간 통계


## 📦 테이블 구조 명세서
---

### 🗂 RcvFault (고장 저장 테이블)

| 컬럼명              | 타입               | 제약조건                          | 설명                             |
|---------------------|-------------------|----------------------------------|----------------------------------|
| IncidentID          | INT               | PK, AI                           | 고장 고유 번호                    |
| ReceiptNo           | VARCHAR(30)       |                                  | 접수 번호 (F-YYMMDD-고장순번)     |
| SetTime             | DATETIME          |                                  | 발생 시간                        |
| FaultID             | INT               | FK → mt_FaultCode.FaultID        | 고장 코드                        |
| AssignedTime        | DATETIME          |                                  | 담당 접수 시간                   |
| EndTime             | DATETIME          |                                  | 처리 완료 시간                   |
| CustomerName        | VARCHAR(50)       |                                  | 사고자 이름                      |
| C_ViheicleLicense   | VARCHAR(20)       |                                  | 사고자 차량 번호                  |
| GPS_Lati            | DECIMAL(10, 6)    |                                  | 위도                             |
| GPS_Long            | DECIMAL(10, 6)    |                                  | 경도                             |
| LocationText        | VARCHAR(100)      |                                  | 위치 정보 (도로명 주소 등)         |
| MangerID            | INT               | FK → mt_manager.MangerID         | 담당자 ID                        |
| VehicleID           | INT               | FK → mt_corporate_vehicle.ID     | 출동 차량 ID                     |
| Stat                | TINYINT           |                                  | 상태 (0=접수, 1=배정, 2=완료)     |

---

### 🗂 mt_corporate_vehicle (출동 차량 테이블)

| 컬럼명         | 타입         | 제약조건 | 설명         |
|----------------|--------------|----------|--------------|
| VehicleID      | INT          | PK       | 출동 차량 고유 ID |
| VehicleLicense | VARCHAR(20)  |          | 출동 차량 번호     |

---

### 🗂 mt_manager (담당자 테이블)

| 컬럼명      | 타입         | 제약조건 | 설명         |
|-------------|--------------|----------|--------------|
| MangerID    | INT          | PK       | 담당자 고유 ID |
| MangerName  | VARCHAR(30)  |          | 담당자 이름     |
| MangerPhone | VARCHAR(20)  |          | 담당자 전화번호 |

---

### 🗂 mt_FaultCode (차량 고장 유형 코드 테이블)

| 컬럼명     | 타입         | 제약조건 | 설명               |
|------------|--------------|----------|--------------------|
| FaultID    | INT          | PK       | 고장 유형 고유 ID    |
| FaultName  | VARCHAR(50)  |          | 고장 유형 이름       |
| FaultText  | TEXT         |          | 고장 유형 상세       |
| FaultAct1  | VARCHAR(100) |          | 긴급 조치 사항 1     |
| FaultAct2  | VARCHAR(100) |          | 긴급 조치 사항 2     |
| FaultAct3  | VARCHAR(100) |          | 긴급 조치 사항 3     |



---

## 🧮 주요 쿼리 모음

> 아래는 이 시스템에서 활용되는 주요 프로시저 쿼리입니다.  
> 각 항목을 클릭하면 쿼리 내용을 확인할 수 있습니다.

<details>
<summary><strong>📌 PROC_GET_FAULT_LIST – 고장 목록 조회</strong></summary>

<br>

```sql
CREATE PROCEDURE PROC_GET_FAULT_LIST
    @StartDate DATETIME,
    @EndDate DATETIME,
    @Status TINYINT = NULL
AS
BEGIN
    SELECT
        R.IncidentID,
        R.ReceiptNo,
        R.SetTime,
        R.Stat,
        F.FaultName,
        M.MangerName
    FROM RcvFault R
    JOIN mt_FaultCode F ON R.FaultID = F.FaultID
    LEFT JOIN mt_manager M ON R.MangerID = M.MangerID
    WHERE R.SetTime BETWEEN @StartDate AND @EndDate
      AND (@Status IS NULL OR R.Stat = @Status)
    ORDER BY R.SetTime DESC;
END
```
> 날짜 및 상태 필터 기반으로 고장 이력을 조회하는 프로시저입니다.
> 관제 페이지 초기 진입 시 기본 리스트로 활용됩니다.
</details>

<details> <summary><strong>🛠 PROC_INSERT_FAULT_DUMMY – 더미 고장 데이터 자동 생성</strong></summary>

<br>

```sql
CREATE PROCEDURE PROC_GET_FAULT_LIST
    @StartDate DATETIME,
    @EndDate DATETIME,
    @Status TINYINT = NULL
AS
BEGIN
    SELECT
        R.IncidentID,
        R.ReceiptNo,
        R.SetTime,
        R.Stat,
        F.FaultName,
        M.MangerName
    FROM RcvFault R
    JOIN mt_FaultCode F ON R.FaultID = F.FaultID
    LEFT JOIN mt_manager M ON R.MangerID = M.MangerID
    WHERE R.SetTime BETWEEN @StartDate AND @EndDate
      AND (@Status IS NULL OR R.Stat = @Status)
    ORDER BY R.SetTime DESC;
END
```

> SQL Server Agent 작업을 통해 10초마다 자동 실행되도록 설정된 테스트용 프로시저입니다.
> 실시간 알림 및 지도 반응 기능을 검증하기 위한 더미 데이터 생성에 활용됩니다.

</details>

## 📄 참고

이 프로젝트는 MIT License 기반의 [AdminLTE 4.0.0-beta3](https://adminlte.io/) 템플릿을 커스터마이징하여 UI를 구성하였습니다.

