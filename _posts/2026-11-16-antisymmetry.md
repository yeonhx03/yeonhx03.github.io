---
title: "Antisymmetry"
date: 2026-11-16
categories:
  - Discrete Mathmatics
tags:
  - "Discrete Mathmatics"
  - "Relations"
  - "Antisymmetry"
math: true
mathjax: true
---
이전 post에서 equivalence relation의 3가지 성질을 살펴보았다. 이번에는 Relation의 성질 중 하나인 Antisymmetry에 대해 알아보자.

## 1. Antisymmetry (반대칭성)

Antisymmetry의 정의는 다음과 같다.

$$
\forall a, b \in A, \quad (aRb \land bRa) \Rightarrow\ a=b
$$

집합 $A$위의 relation $R$을 생각하자. 모든 $a, b \in A$에 대해 $aRb$와 $bRa$가 모두 성립하면, $a=b$ 라는 뜻이다.

relation을 화살표로 나타내어보자. $aRb$는 $a \to b$처럼 나타낼 수 있다. 이때 relation $R$이 antisymmetric이라면, 서로 다른 두 점 $a, b$ 사이에 $a \to b$가 존재하면 $b \to a$가 없어야 한다. 자기 자신으로 가는 self-loop $a \to a$는 허용된다. (self-loop이 $a=b$인 경우를 나타낸다.)

집합 $A$위의 relation $R$이 not antisymmetric이라는 건 다음과 동치이다. 

$$
\exists a, b \in A, \quad aRb \land bRa\ \land (a \neq b)
$$

### 1.1. Antisymmetry 예시 1

다음 두 relation $R_1, R_2$가 antisymmetric인지 판별해보자.

$$
\begin{align*}
R_1 &= \{(0,0),\ (0,3),\ (1,3),\ (3,0) \} \\ R_2 &=\{ (0,0),\ (1,0),\ (1,1),\ (1,2) \}
\end{align*}
$$

$R_1$을 보면 $(0,3)$에 대해 $(3,0)$이 존재하고, $0 \neq 3$이므로 antisymmetric이 아니다. 

$R_2$는 서로 다른 $a,b$에 대해 $(a,b),(b,a)$가 둘 다 있는 경우가 없으므로 antisymmetric이다. 

두 relation을 digraph로 나타내면 antisymmetric인지 더 쉽게 확인할 수 있다.

![R1_R2_digraphs.png](Antisymmetry/R1_R2_digraphs.png)

### 1.2. Antisymmetry 예시 2

이번에는 조금 더 구체적인 예시로 살펴보자.

$R_1$을 $\mathbb{Z}^{+}$에 대한 divides relation으로 정의하고 $R_2$를 $\mathbb{Z}$에 대한 divides relation으로 정의하자. 즉, 다음과 같다.

$$
\begin{align*}
&\forall a,b \in \mathbb{Z}^{+},  & aR_1b \Leftrightarrow a \mid b \\
&\forall a,b \in \mathbb{Z},  & aR_2b \Leftrightarrow a \mid b

\end{align*}
$$

두 relation $R_1$과 $R_2$가 antisymmetric인지 판별해보자.

$R_1$을 먼저 살펴보자. 양의 정수 $a, b$에 대해 $a \mid b$와 $b \mid a$가 동시에 성립할 때, $a=b$임을 확인하면 된다.

양의 정수 $a, b$가 서로를 나눈다고 가정하자. divides의 정의에 따라 $b=k_1a$, $a=k_2b$인 정수 $k_1,\ k_2$가 존재한다. 

이때 $a,b$는 양의 정수이므로 $k_1, k_2$도 양의 정수이다. 이를 식으로 쓰면 아래와 같다.

$$
\begin{cases}
a \mid b \Rightarrow b=k_1a \\
b \mid a \Rightarrow a=k_2b
\end{cases}
$$

아래 식을 위에 대입하면 $b=k_1k_2b$이고, $b>0$이므로 양변을 $b$로 나누면 $k_1k_2=1$이다. $k_1,\ k_2$도 양의 정수이므로 $k_1=k_2=1$이고 따라서 $a=b$이다. 따라서 $R_1$은 antisymmetric이다.

이번엔 $R_2$를 살펴보자. $R_2$는 antisymmetric이 아닌데, 이는 $0$이 아닌 정수 $a$와 $-a$ 가 반례이다. $-2$와 $2$ 로 확인해보자.

 $-2$는 $2$를 나누므로, $-2 \mid 2$이다. 반대도 성립하므로 $2 \mid -2$이다. 즉, $a \mid b$와 $b \mid a$가 동시에 성립하지만, $a \neq b$이므로 $R_2$는 antisymmetric하지 않다.

이처럼 divides로 정의되는 relation은 집합을 양의 정수로 잡냐, 전체 정수로 잡냐에 따라 antisymmetry가 달라진다.

### 1.3. Antisymmetry 와 Symmetry

이름 때문에 Symmetry의 negation이 Antisymmetry처럼 느껴질 수 있지만, 둘은 별개의 성질이다.

Symmetry는 $(a,b)$가 있으면 $(b,a)$가 반드시 있어야 한다.

$$
\forall a, b \in A,\ aRb \Rightarrow bRa
$$

digraph로 표현하면 다음과 같다.

![01_symmetry.png](Antisymmetry/01_symmetry.png)

Symmetry의 negation은 $(a,b)$는 있고 $(b,a)$는 없는 쌍이 하나라도 존재하는 것이다.

$$
\exists a,b \in A,\ aRb \land \sim (bRa)
$$

digraph로 표현하면 다음과 같다. ($a \to b$는 있지만 $b \to a$가 없어서 이 한 쌍에 의해 not symmetric)

![02_symmetry_negation.png](Antisymmetry/02_symmetry_negation.png)

Antisymmetry는 서로 다른 $a, b$에 대해 $aRb$와 $bRa$가 둘 다 성립하는 $(a,b)$ 쌍이 없다는 뜻이다.

$$
\forall a, b \in A, \quad (aRb \land bRa) \Rightarrow\ a=b
$$

digraph로 표현하면 다음과 같고, 이때 self-loop은 허용된다.

![03_antisymmetry.png](Antisymmetry/03_antisymmetry.png)

Symmetry의 부정은 역방향 화살표가 없는 쌍이 **적어도** 하나 있다는 뜻이다. Antisymmetry는 서로 다른 두 점 사이에 양방향 화살표가 존재하지 않는다는 뜻이다. 따라서 ‘symmetric이 아니다’와 ‘antisymmetric이다’는 서로 다른 조건이다.

$A=\{ a,b \}$ 위의 relation $R=\{ (a,a),\ (b,b) \}$는 symmetric인 동시에 antisymmetric이다. 이처럼 symmetry인 동시에 antisymmetry일 수 있으므로 더욱 더 symmetry의 부정이 antisymmetry라고 할 수 없다.