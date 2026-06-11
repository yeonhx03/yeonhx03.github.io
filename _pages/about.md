---
title: "About"
permalink: /about/
layout: single
author_profile: true
hide_title: true
---

<section class="about-profile" aria-labelledby="about-profile-title">
  <img
    class="about-profile__image"
    src="{{ site.author.avatar | relative_url }}"
    alt="{{ site.author.name | default: site.title }}"
  >
  <div class="about-profile__body">
    <h2 id="about-profile-title">{{ site.author.name | default: site.title }}</h2>
    <p>
      개인 공부 기록용 블로그입니다
    </p>
    <div class="about-profile__links" aria-label="Profile links">
      <span class="about-profile__link about-profile__link--placeholder" aria-label="Email">
        <i class="fas fa-envelope" aria-hidden="true"></i>
      </span>
      <a class="about-profile__link" href="https://github.com/{{ site.github_username }}" aria-label="GitHub">
        <i class="fab fa-github" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</section>

{% comment %}
Future editable sections live below. Remove this comment block when ready to fill them.

## About Me

나중에 소개 문장을 채울 자리입니다.

## Education

<div class="about-timeline">
  <div class="about-timeline__item">
    <span class="about-timeline__period">YYYY - YYYY</span>
    <div>
      <h3>학교 / 전공</h3>
      <p>학력 설명을 채울 자리입니다.</p>
    </div>
  </div>
</div>

## Experience

<div class="about-timeline">
  <div class="about-timeline__item">
    <span class="about-timeline__period">YYYY - YYYY</span>
    <div>
      <h3>회사 또는 프로젝트 / 역할</h3>
      <p>경력 또는 프로젝트 설명을 채울 자리입니다.</p>
    </div>
  </div>
</div>
{% endcomment %}
