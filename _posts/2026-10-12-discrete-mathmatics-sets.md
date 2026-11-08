---
title: "Sets"
date: 2026-10-12
categories:
  - Discrete Mathmatics
tags:
  - "Discrete Mathmatics"
  - "Proof Method"
  - "Sets"
math: true
mathjax: true
---

## 1. Definition of Sets

집합 $S$의 원소 $x$ 중  조건 $P(x)$를 만족하는 모든 $x$를 원소로 갖는 집합 $A$를 다음과 같이 표기한다.

$$
A= \{ x\in S|P(x) \}
$$

“ $A$ is the set of all $x$ in $S$ such that $P$ of $x$ ”라고 읽는다.

quantified statement로 표현하면 

$$
 \forall x\in S,\quad x\in A\iff P(x)
$$

## 2. Definition of Subsets

집합 $A$가 집합 $B$의 부분집합일 때, formal universal conditional statement로 다음과 같이 쓸 수 있다.

$$
A \subseteq B \Leftrightarrow \forall x \text{ if } x \text{ in } A \text{ then } x \in B
$$

Subset의 정의를 논리식으로 쓰면 $p \rightarrow q$ 즉, $\sim p \lor q$꼴이다. 이에 대한 negation은 $\sim ( \sim p \lor q) \equiv p \land \sim q$임을 생각하면 negation 표기는 쉽게 생각할 수 있다.

$$
A \nsubseteq B \Leftrightarrow \exist x, x \in A \text{ and }x \in B
$$

## 3. Element Method: Subset, Set Equality의 증명

### 3. 1. proof of subset

주어진 집합 $X$, $Y$에 대해, $X \subseteq Y$를 증명하는 방법은 다음과 같다.

1. 집합 $X$에 속하는 임의의(particular but arbitrarily chosen) 원소 $x$를 가정하자.
2. $x$가 집합 $Y$의 원소임을 보인다. 

### 3. 2. proof of  set equality

주어진 집합 $A,B$에 대해 $A=B$의 증명은 다음을 보이면 된다.

$$
A \subseteq B \text{ and } B \subseteq A 
$$

즉, 앞서 소개한 subset의 증명을 이용해 $A \subseteq B$와 $B \subseteq  A$를 각각 보이면 된다.

## 4. Operations on Sets

4가지 집합 연산이 존재한다. 집합 $A$와 $B$는 universal set $U$의 subset이라 하자.

### 4. 1. Union (합집합)

모든 원소가 $A$ , $B$ $B$$A \cup B$로 표기한다.

$A \cup B = \{x \in U \mid x \in A \text{ or } x \in B\}$

### 4. 2. Intersection (교집합)

모든 원소가 $A, B$ 둘 모두에 속하는 집합으로, $A \cap B$로 표기한다.

$A \cap B = \{x \in U \mid x \in A \text{ and } x \in B\}$ 

### 4. 3. Complement (여집합)

모든 원소가 $U$에 속하고 $A$에는 속하지 않는 집합으로, $A^c$로 표기한다.

$A^c = \{x \in U \mid x \notin A\}$

### 4. 4. Difference (차집합)

모든 원소가 $A$에는 속하고 $B$에는 속하지 않는 집합으로, $A-B$로 표기한다.

$A - B = \{x \in U \mid x \in A \text{ and } x \notin B\}$

## 5. Indexed Collection of Sets

Indexed Collection of Sets는 각 집합에 index를 붙여 구분한 집합들의 모음이다. 집합이 여러 개 있을 때, $A,B,C, \cdots$ 대신  $A_1, A_2, A_3 \cdots$로 표현한다. 집합 자체에는 순서가 없고 중복이 없기 때문에, 각각의 집합을 체계적으로 분류하고 연산을 확장할 수 있다.

### 5. 1. Unions

여러 집합의 union을 다음과 같이 한번에 표기할 수 있다.

$A_0, A_1, \cdots$가 주어졌을 때 universal set $U$와 음이 아닌 정수 $n$에 대해

$$
\bigcup_{i=0}^{n} A_i = \{x \in U \mid x \in A_i \text{ for at least one } i = 0, 1, 2, \ldots, n\}
$$

위와 같은 Indexed collection of Union의 원소일 조건은 적어도 하나의 $A_i$에 속하는 것이다. 참고로 $n$을 무한대로 확장할 수 있다.

### 5. 2. Intersections

여러 집합의 intersection을 다음과 같이 한번에 표기할 수 있다.

$$
\bigcap_{i=0}^{n} A_i = \{x \in U \mid x \in A_i \text{ for every } i = 0, 1, 2, \ldots, n\}
$$

이 집합의 원소이려면 모든 $A_i$에 속해야 한다.

### 5. 3. Example

양의 정수 $i$에 대해 $A_i=\left[-2+\frac1i,;3-\frac1i\right]$라고 하자.

$(\displaystyle\bigcup_{i=1}^{3}A_i)$을 구해보자. 주어진 식은 $A_1 \cup A_2 \cup A_3$와 같으므로, 세 집합을 각각 구하면

 $A_1=[-1,2],\qquad
A_2=\left[-\frac32,\frac52\right],\qquad
A_3=\left[-\frac53,\frac83\right]$

이고 $A_1 \subseteq A_2 \subseteq A_3$이다. 따라서 $\bigcup_{i=1}^{3}A_i=\left[-\frac53,\frac83\right]$

이번엔 $(\displaystyle\bigcup_{i=1}^{\infty}A_i)$**를 구해보자. 모든** $A_i$가 열린구간 $(-2,3)$안에 있으므로 $-2 < x <3$인 임의의 $x$에 대해 충분히 큰 $i$를 선택하면, $x \in A_i$이다. 따라서 $\bigcup_{i=1}^{\infty}A_i=(-2,3)$이다.