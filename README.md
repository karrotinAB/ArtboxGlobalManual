# 매뉴얼 사이트 데모 — 사용 안내

## 폴더 구성
- index.html   → 단일 페이지. 위쪽은 표지(커버), 스크롤 내리면 바로 매뉴얼 본문으로 이어짐
- editor.html  → 편집 전용 페이지 (비밀번호 필요, 검색엔진 노출 안 됨) — 페이지를 그대로 보면서 원하는 구역을 클릭하면 그 자리에서 바로 편집됨. GitHub에 직접 저장도 가능
- content.json → 실제 콘텐츠 데이터 (제목/설명/이미지 경로·크기·위치, 한/영 동시 보관)
- render.js    → index.html이 표지+본문을 그리는 공통 렌더링 로직
- style.css    → 디자인 (배경 #FFE5E4, 사이드바 #DD807D, 문서형 레이아웃)
- images/      → 데모용 이미지 (실제 배포 시 이 폴더에 실제 사진 업로드)

## 로컬에서 미리보기
터미널에서 이 폴더로 이동한 뒤:
    python3 -m http.server 8000
브라우저에서 http://localhost:8000 접속.

## GitHub Pages로 배포하는 법
1. GitHub(karrotinab 계정)에 새 저장소 생성 (Public)
2. 저장소 페이지 → Add file → Upload files → 이 폴더 안의 파일/폴더 전체 드래그 → Commit
3. Settings → Pages → Branch를 main, 폴더 /(root) 선택 → Save
4. 1~3분 뒤 https://karrotinab.github.io/저장소이름/ 으로 접속 가능

## 편집기 사용법
1. editor.html 접속 → 비밀번호 입력 (데모: artbox2026)
2. 실제 페이지가 그대로 보여요. 챕터 제목이나 섹션을 클릭하면 그 자리가 바로 편집 카드로 바뀜
3. 완료 누르면 저장되고 다시 보기 모드로 닫힘
4. 점선 버튼으로 섹션/챕터 추가

### 이제 두 가지 저장 방법이 있어요

**A. GitHub에 바로 저장 (자동, 추천)**
1. 상단 "⚙️ GitHub 연결" 클릭
2. 계정(owner), 저장소 이름(repo), 브랜치(보통 main), 토큰을 입력하고 "설정 저장"
3. 이후 "GitHub에 저장 ⬆" 버튼 누르면 파일 다운로드/재업로드 없이 바로 content.json이 저장소에 반영돼요

**개인 액세스 토큰(PAT) 만드는 법** (3분, 무료):
1. GitHub 우측 상단 프로필 → Settings → 왼쪽 아래 Developer settings
2. Personal access tokens → Fine-grained tokens → Generate new token
3. Token name 아무거나, Expiration은 원하는 기간(최대 366일)
4. Resource owner: 본인 계정(karrotinab)
5. Repository access: "Only select repositories" → 이 매뉴얼 저장소만 선택 (핵심: 전체 저장소 접근 주지 않기)
6. Permissions → Repository permissions → **Contents: Read and write**로 설정 (다른 권한은 그대로 No access)
7. Generate token → 뜨는 토큰 값을 바로 복사 (다시 볼 수 없어요) → editor.html의 토큰 칸에 붙여넣기

토큰은 "이 저장소에만, Contents 읽기/쓰기만" 최소 권한으로 만드는 걸 꼭 지켜주세요.
"이 브라우저에 토큰 기억하기"를 켜면 다음에 다시 안 넣어도 되지만(localStorage),
공용 컴퓨터에서는 꺼두고 세션마다 새로 입력하는 걸 추천해요.

**B. 수동 다운로드 (기존 방식, 백업용)**
1. "내보내기 ⤓" → content.json 다운로드
2. 저장소의 기존 content.json에 덮어쓰기 업로드

이미지가 바뀌면 두 방법 모두 images 폴더에 실제 파일을 직접 업로드해야 해요
(에디터에서 사진 파일 자체를 업로드하는 기능은 아직 없고, 경로만 입력하는 방식이에요).

## v5 변경사항
- editor.html에 "GitHub에 저장" 버튼 추가 — 개인 액세스 토큰으로 GitHub API에 직접 커밋
- ⚙️ GitHub 연결 설정 패널 (계정/저장소/브랜치/경로/토큰, 토큰은 세션 또는 브라우저에 선택적으로 저장)
- 기존 "내보내기(다운로드 후 재업로드)" 방식은 백업 수단으로 계속 유지
