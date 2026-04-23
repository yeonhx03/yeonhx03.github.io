---
layout: single
title: "[TIL]260420: 함수 오버로딩"
excerpt: "함수 오버로딩 왜 필요함?"
categories:
  - TIL
tags:
  - TypeScript
toc: true
toc_sticky: true
date: 2026-04-20
last_modified_at: 2026-04-22
---

## 함수 오버로딩 (Function Overloading)
함수 이름은 하나인데, 들어오는 인자의 개수나 타입에 따라 다르게 작동하도록 하는 것.  

## 구조
여러 개의 선언부(overload signature)와 하나의 구현부(implementation signature)로 나뉜다.  
```Typescript
interface User {
  id: number;
  name: string;
}

// 아래 두 줄은 선언부.
function getUser(id: number): User;
function getUser(name: string): User[];

// 아래 줄은 구현부로, 실제 작동이 일어남. 이 때 구현부 타입은 선언부의 타입을 포함할 수 있어야 함.
function getUser(query: number|string): User|User[]{
  if(typeof query === "number"){
    return {id:query, name: "yeonhx03"}; // User 한 개 반환
  }  


  else{
    return [{id: 1, name: query},{id: 2, name: query}]; //User배열 반환
  }
}
```

## 왜 필요함?
python같은 경우 오버로딩이 없어서 그냥 if문으로 인자들 싹 검사함.  
TypeScript도 그냥 if문으로 예외처리하면 안되나? 싶음.  
우선 if문을 이용하면 결국 코드를 실행해야 에러 발생을 확인할 수 있음.  
근데 함수 오버로딩으로 미리 딱 정해놓으면 코드 쓰자마자 빨간 줄 떠서 확인 가능.  

사실 이것보다 입력 값에 따라 반환되는 타입이 달라질 때 큰 역할을 함.
구현부만 만들어놓으면 반환 타입이 무조건 `A|B`형태가 됨.  
선언부로 '미리 이거 입력되면 이거 반환해'라고 정해놓으면 리턴 타입이 딱 정해져서 향후 활용하기 용이해짐.
