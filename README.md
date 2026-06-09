# yeonhx03.github.io

GitHub Pages에서 운영하는 Jekyll 기반 개인 기술 블로그입니다. Minimal Mistakes remote theme을 사용하되, 테마 원본을 복제하지 않고 필요한 include와 Sass partial만 override합니다.

## Local setup

Ruby 3.x 사용을 권장합니다. macOS 기본 시스템 Ruby 2.6은 일부 native gem 설치가 실패할 수 있습니다.

```bash
bundle install
bundle exec jekyll serve --livereload
```

브라우저에서 `http://127.0.0.1:4000`을 열어 확인합니다.

빌드만 확인할 때는 다음 명령을 실행합니다.

```bash
bundle exec jekyll build
```

## GitHub Pages 배포

1. GitHub 저장소 이름을 `yeonhx03.github.io`로 유지합니다.
2. 변경 사항을 기본 브랜치에 push합니다.
3. GitHub 저장소의 `Settings > Pages`에서 GitHub Pages가 기본 브랜치를 사용하도록 설정합니다.
4. 배포 후 `https://yeonhx03.github.io`에서 확인합니다.

## 수정할 placeholder

블로그 기본 정보는 `_config.yml`에서 바꿉니다.

- `title`
- `name`
- `description`
- `url`
- `repository`
- `github_username`
- `author.name`
- `author.avatar`

About 페이지 문구는 `_pages/about.md`에서 수정합니다.

## 구조

- `_config.yml`: 사이트 기본 정보, remote theme, 플러그인, 기본 post 옵션
- `_data/navigation.yml`: 상단 네비게이션
- `_includes/author-profile.html`: 좌측 sidebar 구성
- `_includes/sidebar/category-list.html`: 자동 category 목록
- `_sass/custom/`: Apple 스타일 커스텀 토큰과 UI 스타일
- `assets/js/custom-search.js`: 검색 입력 이벤트 보강
