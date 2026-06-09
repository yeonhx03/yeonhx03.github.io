---
title: "Jekyll 블로그 구조 잡기"
date: 2026-06-10 01:00:00 +0900
categories:
  - Jekyll
tags:
  - GitHub Pages
  - Minimal Mistakes
  - Setup
---

GitHub Pages에서 운영할 정적 블로그는 배포 방식이 단순할수록 오래 유지하기 쉽습니다. 이 글은 Minimal Mistakes remote theme을 유지하면서 필요한 파일만 override하는 구조를 점검하기 위한 샘플입니다.

## 기본 원칙

테마 전체를 복사하지 않고 `_config.yml`, `_data/navigation.yml`, `_includes`, `_sass/custom`처럼 변경 의도가 분명한 파일만 프로젝트 안에 둡니다.

> 커스터마이징은 작게 시작하고, 반복되는 불편이 생겼을 때만 넓히는 편이 유지보수에 유리합니다.

## 로컬 실행

로컬에서 확인할 때는 다음 명령을 사용합니다.

```bash
bundle install
bundle exec jekyll serve --livereload
```

## 확인할 것

| 항목 | 설명 |
| --- | --- |
| Navigation | Category, Post, About, Search 순서 |
| Sidebar | 프로필, 방문자 수, 전체 글 수, 카테고리 |
| Search | 입력 즉시 결과 필터링 |

본문 링크는 [Jekyll 공식 문서](https://jekyllrb.com/)처럼 기본 상태에서도 링크임을 알아볼 수 있어야 합니다.
