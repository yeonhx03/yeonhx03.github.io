---
layout: single
title: "[TIL]260417: typeof"
excerpt: 'typeof 연산자 사용시 "data type"이어야 하는 이유'
categories:
  - TIL
tags:
  - TypeScript
  - Web
toc: true
toc_sticky: true
date: 2026-04-17
last_modified_at: 2026-04-21
---

## typeof
typeof 연산자는 피연산자의 데이터 타입을 **문자열**로 반환한다.  
typeof를 통한 narrowing 시, 데이터 타입을 ""로 감싸야 하는 이유다.  

```typescript
let score = Math.random() > 0.5
  ? "A+"
  : 90;
// score는 A+라는 string 혹은 90이라는 number

if(typeof score === "string"){    //typeof socre 는 "string" 또는 "number"
  score.toLowerCase();
}

//혹은

typeof score === "string"
  ? score.toLowerCase()
  : score.toFixed();
```
JavaScript를 모르는 채로 TypeScript를 시작하다보니 JavaScript를 공부했더라면 알았을 것들이 상당히 많다.
