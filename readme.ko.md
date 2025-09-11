# 디아블로 웹 버전 (DiabloWeb)

이것은 원본 디아블로 게임의 웹 포트 버전으로, GalaXyHaXz와 devilution 팀이 재구성한 소스 코드를 기반으로 개발되었습니다.

## 🎮 온라인 플레이

[diabloweb.pages.dev](https://diabloweb.pages.dev)에 접속해서 지금 바로 플레이를 시작하세요!

## 🌐 언어 지원

이 프로젝트는 현재 다국어 인터페이스를 지원합니다:
- 🇺🇸 English (영어)
- 🇹🇼 繁體中文 (번체 중국어)
- 🇨🇳 简体中文 (간체 중국어)
- 🇯🇵 日本語 (일본어)
- 🇰🇷 한국어

게임 화면 오른쪽 상단에서 언어를 전환할 수 있습니다.

## 📋 2025년 9월 9일 업데이트 기록

### 🔧 기술 수정 및 개선

#### 1. Node.js 호환성 문제 해결
- **문제**: 프로젝트가 구버전 `node-sass@4.14.1`을 사용하여 Node.js 20과 호환되지 않음
- **해결책**: 
  - `node-sass`를 제거하고 현대적인 `sass` (Dart Sass)로 전환
  - webpack 설정을 업데이트하여 새로운 Sass 로더 사용
  - OpenSSL Legacy Provider 문제를 수정하고 빌드 스크립트에 `--openssl-legacy-provider` 매개변수 추가

#### 2. Shareware 버전 로딩 문제 수정
- **문제**: "무료 버전 플레이" 버튼 클릭 후 404 오류와 파일 크기 오류 발생
- **근본 원인**: 
  - `spawn.mpq` 파일 (25.8 MB)이 Cloudflare Pages의 25MB 정적 파일 제한을 초과
  - GitHub Releases에서 직접 로딩할 때 CORS 크로스 도메인 문제 발생
- **최종 해결책**:
  - 대용량 파일을 작은 청크로 분할: `spawn.mpq.chunk000` (20MB) + `spawn.mpq.chunk001` (4.8MB)
  - 분할 정보를 기록하는 메타데이터 파일 `spawn.mpq.meta` 생성
  - 로딩 로직 수정: 청크 파일을 순차적으로 다운로드하고 메모리에서 재구성
  - 모든 파일을 동일 도메인에서 제공하여 CORS 문제 회피

#### 3. CI/CD 빌드 문제 수정
- **문제**: Cloudflare Pages CI 환경에서 ESLint 경고를 오류로 처리
- **해결책**: 루프 내 함수 생성을 피하도록 코드를 리팩토링하여 `no-loop-func` 규칙 준수

#### 4. 국제화 지원 추가
- **기능**: 완전한 다국어 지원 (영어/번체중국어/간체중국어/일본어/한국어)
- **구현**:
  - 언어 자동 감지 및 영속 저장을 지원하는 i18n 시스템 구축
  - 실시간 전환을 지원하는 언어 선택기 컴포넌트 추가
  - 메뉴, 오류 메시지, 로딩 프롬프트를 포함한 모든 사용자 인터페이스 텍스트 번역
  - 각 언어별 직업명 현지화 지원

### 🗂️ 새로 추가된 파일 구조
```
src/
├── i18n/
│   ├── index.js          # 국제화 핵심 기능
│   ├── en.json           # 영어 번역
│   ├── zh-tw.json        # 번체 중국어 번역
│   ├── zh-cn.json        # 간체 중국어 번역
│   ├── ja.json           # 일본어 번역
│   └── ko.json           # 한국어 번역
├── components/
│   ├── LanguageSelector.js    # 언어 선택기 컴포넌트
│   └── LanguageSelector.scss  # 언어 선택기 스타일
public/
└── chunks/
    ├── spawn.mpq.chunk000     # 분할 파일 1
    ├── spawn.mpq.chunk001     # 분할 파일 2
    └── spawn.mpq.meta         # 분할 메타데이터
split_spawn.js                 # 파일 분할 도구 스크립트
```

### 🚀 배포 최적화
- Cloudflare Pages 자동 배포 사용
- 파일 청킹 기술로 클라우드 플랫폼 파일 크기 제한 우회
- 로딩 경험 최적화, 청크 다운로드 진행률 표시 지원

### 🎯 게임 경험 개선
- 무료 체험판 로딩 불가 문제 수정
- 다국어 인터페이스 추가로 각 지역 사용자 경험 향상
- 완전한 원본 게임 기능 유지
- 세이브 관리 및 파일 업로드 기능 지원

## 🛠️ 로컬 개발

### 시스템 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 단계
```bash
# 프로젝트 클론
git clone https://github.com/anomixer/diabloweb
cd diabloweb

# 의존성 설치
npm install --legacy-peer-deps

# 개발 서버 시작
npm start

# 프로덕션 빌드 생성
npm run build
```

### 파일 분할 도구
`spawn.mpq` 파일을 다시 분할해야 하는 경우:
```bash
node split_spawn.js
```

## 📁 게임 파일 설명

### 정품 게임
- 원본 `DIABDAT.MPQ` 파일 지원
- [GoG](https://www.gog.com/game/diablo)에서 정품 게임 구매 가능
- 파일 드래그 앤 드롭 업로드 지원

### 체험판
- 무료 셰어웨어 버전, 웹 전용 버전으로 압축됨 (약 25MB)
- 자동 청크 로딩, 수동 다운로드 불필요
- 체험용 기본 게임 콘텐츠 포함

## 🤝 기여

Issue와 Pull Request 제출을 환영합니다!

## 📄 라이선스

이 프로젝트는 원본 DiabloWeb 프로젝트를 기반으로 개발되었습니다. 자세한 내용은 관련 라이선스 문서를 참조하세요.

## 🔗 관련 링크

- 원본 프로젝트: [d07RiV/diabloweb](https://github.com/d07RiV/diabloweb)
- 온라인 플레이: [diabloweb.pages.dev](https://diabloweb.pages.dev)
- 문제 신고: [GitHub Issues](https://github.com/anomixer/diabloweb/issues)
