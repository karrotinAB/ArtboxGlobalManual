# 매뉴얼 사이트 데모 — 사용 안내

## 폴더 구성
- index.html   → 실제 공개용 사이트 (한/영 토글, 사이드바 챕터 이동)
- editor.html  → 편집 전용 페이지 (비밀번호 필요, 검색엔진 노출 안 됨)
- content.json → 실제 콘텐츠 데이터 (제목/설명/이미지 경로, 한/영 동시 보관)
- render.js    → index.html과 editor.html이 공유하는 렌더링 로직
- style.css    → 디자인 (원본 매뉴얼북의 코랄 그라데이션, 알약형 배지, 세로 챕터탭 반영)
- images/      → 데모용 이미지 (실제 배포 시 이 폴더에 실제 사진 업로드)

## 로컬에서 미리보기
브라우저가 fetch()로 content.json을 읽기 때문에, 파일을 더블클릭해서 여는 것보다는
간단한 로컬 서버로 여는 게 안전해요.

터미널에서 이 폴더로 이동한 뒤:
    python3 -m http.server 8000
그 다음 브라우저에서 http://localhost:8000 접속.

## GitHub Pages로 배포하는 법
1. 이 폴더 전체를 GitHub 저장소에 업로드 (기존 Imagecutter 배포하실 때처럼)
2. 저장소 Settings → Pages에서 배포 브랜치 지정
3. 몇 분 뒤 https://karrotinab.github.io/저장소이름/ 형태로 접속 가능

## 편집기 비밀번호
데모 비밀번호: artbox2026
(editor.html 안의 EDITOR_PASSCODE 값을 원하는 비밀번호로 직접 바꿔서 쓰세요.
 완전한 보안은 아니라서, editor.html 링크는 사이트 어디에도 노출하지 않는 걸 추천해요.)

## 콘텐츠 수정 흐름
1. editor.html 접속 → 비밀번호 입력
2. 왼쪽 폼에서 텍스트 수정 → 오른쪽에 실시간 미리보기
3. 다 고쳤으면 "내보내기" 버튼 → content.json 다운로드
4. 다운로드된 content.json을 저장소의 기존 파일에 덮어쓰기 업로드
5. 이미지가 바뀌면 images 폴더에 같은 파일명(또는 새 파일명 + content.json 경로 수정)으로 업로드
