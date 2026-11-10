---
title: "Chomsky Normal Form"
date: 2026-11-10
categories:
  - Automata
tags:
  - "Automata"
  - "CYK Algorithm"
  - "Algorithm"
  - "Chomsky Normal Form"
math: true
mathjax: true
---

## 1. Chomsky Normal Form

CFG 중, 다음과 같은 form의 production만을 가지면 Chomsky Normal Form이라 한다.

$$
A \rightarrow BC, \quad A \rightarrow a
$$

즉, Chomsky Normal Form이 되려면 CFG를 만족하고, 모든 production이 화살표 오른쪽에 Variable이 2개만 있거나, single terminal symbol만 있어야 한다. 앞으로 Chomsky Normal Form을 간단히 CNF라 하자.

가령 $S \rightarrow BS|b$, $B \rightarrow SB|a$는 CNF이다. 

$S \rightarrow AS|AAS$, $A \rightarrow SA|aa$는 CFG이지만, 주어진 production 중 $S \rightarrow AAS$는 우측에 변수가 3개, $A \rightarrow aa$는 terminal symbol이 2개이므로 CNF가 아니다.

## 2. CFG를 CNF로 변환할 수 있다.

빈 문자열 $\lambda$를 생성하지 않는 CFG $G=(V,T,S,P)$를 동치인 CNF $\hat{G}=(\hat{V},\hat{T},S,\hat{P})$ 로 변환할 수 있다.

### 2. 1. Proof

$\lambda$ productions, unit-productions가 없는 grammar $G$를 생각하자.

Step 1: $G$를 CFG인 $G_1=(V_1, T_1, S_1, P_1)$로 변환

- production의 우변 길이가 1이라면, $G$는 unit-productions가 없으므로 $G_1$은 single terminal symbol을 produce하는 $A \rightarrow a$만 가진다.
- production의 우변 길이가 2 이상이라면, single terminal symbol $a$를 새 Variable $B_a$로 대체하고, $P_1$에 $B_a \rightarrow a$를 추가한다. 이 과정에서 우변에 Variable만 남게 된다.
    
    예를 들어, 주어진 문법 $G$의$G$$A \rightarrow aBCb$ 이라면, $A \rightarrow B_aBCb$로 바꾸고, $B_a \rightarrow a$를 추가한다. 같은 방식으로 한번 더 $A \rightarrow B_aBCB_b$로 바꾸고, $B_b \rightarrow b$를 추가한다.
    
    따라서 새로운 production $P_1$은 다음과 같다.
    
    $$
    \begin{align*}
    P_1:\quad &A \rightarrow B_aBCB_b, 
    \\
    &B_a \rightarrow a,
    \\
    &B_b \rightarrow b
    \end{align*}
    $$
    

Step 2: $G_1$을 CNF인 $\hat{G}=(\hat{V},\hat{T},S,\hat{P})$로 변환

- $P_1$에서 우변 길이가 1인 production은 $A \rightarrow a$, 길이가 2인 production은 $A \rightarrow BC$꼴이다. 따라서 이 둘은 CNF를 만족하므로 그대로 $\hat{P}$에 추가한다.
- $P_1$에서 길이가 3 이상인 production은 $A \rightarrow C_{1}C_{2} \cdots C_{n}$ ($C_i \in V$) 형태이다. 여기서 가장 앞의 $C_1$을 제외한 $C_2 \cdots C_n$을 새 variable $D_1$이 produce하도록 만든다.
    
    $D_1 = C_2 \cdots C_n$라고 두면 기존 production은 $A→C_1D_1$이 된다. $D_1$에 $D_1$$D_1=C_2D_2$ ($D_2 = C_3 \cdots C_n$)로 쓸 수 있고, 이를 반복해 나가면 모든 production이 $A \rightarrow BC$꼴이 되어 $\hat{P}$에 추가할 수 있다. 
    
- 완성된 $\hat{P}$는 $A \rightarrow a$, $A \rightarrow BC$꼴만 가지므로, $\hat{G}$는 CNF이다.

### 2. 2. Example

$$
\begin{aligned}
S &\to aABb \mid b \\
A &\to aA \mid a \\
B &\to bB \mid b
\end{aligned}
$$

위 CFG를 Chomsky Normal Form으로 바꿔보자.

$\lambda$ - production과 unit production이 없으므로, 바로 변환 과정을 적용할 수 있다.

Step 1: 우변 길이가 2 이상인 production에 대해,

$S \to aABb$에서, $B_a \to a$를 추가하여 $S \to B_aABb$로 만든다. 다시 $B_b = b$를 추가하여 $S \to B_aABB_b$로 만든다. 

$A \to aA$와 $B \to bB$에 위에서 만든 production을 적용하면 $A \to B_aA,\ B \to B_bB$가 된다.

Step 2: 길이가 3 이상인 우변을 분해

$S \to B_aABB_b$의 우변 길이는 4다. 따라서 새 변수 $D_1=ABB_a,\ D_2=BB_a$로 두자. 그러면 우변 길이가 3 이상인 production은 $S \to B_aD_1$, $D_1=AD_2$로 바꿀 수 있다.

따라서 최종적으로 

$$
\boxed{
\begin{aligned}
S &\to B_aD_1 \mid b \\
D_1 &\to AD_2 \\
D_2 &\to BB_a \\
A &\to B_aA \mid a \\
B &\to B_bB \mid b \\
B_a &\to a \\
B_b &\to b
\end{aligned}
}
$$

모든 production의 우변이 single terminal symbol 또는 2개의 Variable 형태이므로 CNF이다.

## 3. CYK Algorithm

결국 우리가 Chomsky Normal Form을 다룬 이유는, membership problem을 해결하기 위해서이다. 

CYK Algorithm은 CNF를 가장 빠르게 parsing하는 알고리즘으로, $w$가 해당 grammar의 member인지 아닌지 판별할 수 있다.

가령 CYK Algorithm이