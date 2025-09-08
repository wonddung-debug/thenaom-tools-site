# Thenaom Tools — 업데이트 꾸러미 (Diff 페이지)
> 이 압축파일을 그대로 레포에 넣고 커밋/푸시하면 Netlify가 자동 배포합니다.

## 포함 파일
- `tools/diff.html` — 완성된 도구 페이지 (SEO/FAQ/다크모드 포함)
- `assets/css/base.css` — 공통 스타일 토큰
- `assets/js/diff.js` — 비교 로직 (jsdiff 기반)
- `CHANGELOG.md` — 변경 내역

## 적용 방법 (GitHub Desktop 기준)
1. GitHub Desktop 열기 → 좌측 레포가 *사이트 레포*인지 확인
2. **Repository ▸ Show in Explorer** 클릭 → 폴더가 열립니다.
3. 이 압축을 풀고 나온 `tools`, `assets` 폴더를 **덮어쓰기**합니다.
4. GitHub Desktop으로 돌아오면 변경 파일이 보입니다.
5. Summary에 커밋 메시지 입력: `feat(diff): add standalone diff tool page`
6. **Commit to main** → **Push origin**.
7. Netlify 배포 로그에서 성공 확인 (보통 1~3분).

## 주의
- 페이지 상단의 `[GTM_PLACEHOLDER]`, `[ADSENSE_PLACEHOLDER]` 주석 위치에 GTM/AdSense 스니펫을 넣으세요.
- 다른 도구에도 공통 스타일을 쓰려면 기존 CSS와 병합해도 됩니다.

## FAQ
- **왜 CDN을 쓰나요?** — jsdiff를 직접 포함할 수도 있지만, CDN이 더 가볍습니다. 폐쇄망이면 라이브러리를 로컬로 번들하세요.
- **다크/라이트는 어떻게 저장되나요?** — 버튼으로 토글하면 `localStorage`에 저장됩니다.