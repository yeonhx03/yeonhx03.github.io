---
title: "dataclass"
date: 2026-07-21
categories:
  - Python
tags:
  - "Python"
  - "dataclass"
---

## 1. dataclass란?

파이썬으로 주식 데이터를 담는 클래스를 작성해보자.

```python
class Stock:
    def __init__(self, ticker: str, price: float, currency: str = "USD"):
        self.ticker = ticker
        self.price = price
        self.currency = currency

    def __repr__(self):
        return (
            f"Stock(ticker={self.ticker!r}, "
            f"price={self.price!r}, "
            f"currency={self.currency!r})"
        )
```

위 코드에서는 필드 이름을 여러 번 반복해서 작성해야 한다. 파이썬에서 데이터를 담는 클래스를 만들다 보면 `__init__`, `__repr__`처럼 비슷한 형태의 코드가 자주 생긴다. 이런 반복 코드를 **보일러플레이트(boilerplate)** 라 한다.

`dataclasses` 모듈의 `@dataclass` 데코레이터를 사용하면 위 코드를 다음과 같이 줄일 수 있다.

```python
from dataclasses import dataclass


@dataclass
class Stock:
    ticker: str
    price: float
    currency: str = "USD"


stock = Stock("AAPL", 230.5)
print(stock)
# Stock(ticker='AAPL', price=230.5, currency='USD')
```

`@dataclass`는 타입 어노테이션이 붙은 속성을 **필드(field)** 로 인식하고, 필드 정보를 바탕으로 `__init__`, `__repr__`, `__eq__` 등의 메서드를 자동으로 만들어준다.
<br><br>

## 2. 언제 사용할까?

`dataclass`는 다음과 같이 데이터를 담는 클래스를 작성할 때 주로 사용한다.

- API 응답이나 설정값처럼 정해진 구조의 데이터를 담을 때
- 로그 이벤트나 메시지처럼 여러 값을 하나의 단위로 묶을 때
- `dict`보다 필드의 의미가 명확하고 타입 힌트가 있는 구조가 필요할 때
- 반복되는 초기화, 출력, 비교 코드를 줄이고 싶을 때

반면 데이터 검증이나 직렬화가 핵심이라면 `Pydantic`과 같은 별도의 라이브러리가 더 적합할 수 있다.
<br><br>

## 3. 기본 문법

`dataclasses` 모듈에서 `dataclass`를 가져오고 클래스 위에 `@dataclass`를 붙인다. 클래스 본문에는 필드 이름과 타입을 작성한다.

```python
from dataclasses import dataclass


@dataclass
class User:
    name: str
    age: int


user = User(name="yeonhx03", age=22)
print(user.name)
# yeonhx03
```

위 코드에서 `name`과 `age`가 필드로 인식된다.

단, 타입 어노테이션은 런타임에 타입을 강제하지 않는다. 아래 코드를 보자.

`age` 필드에 타입 어노테이션과 다른 문자열 값을 전달하지만 객체가 생성된다.

```python
user = User(name="yeonhx03", age="twenty-two")
print(user)
# User(name='yeonhx03', age='twenty-two')
```

타입 오류는 mypy나 Pyright 같은 정적 타입 검사기로 미리 찾을 수 있다. 런타임 타입 체크가 필요하다면 `__post_init__`에 검증 로직을 작성하거나 `pydantic` 같은 라이브러리를 사용할 수 있다.
<br><br>

## 4. 기본값

일반 클래스 속성과 같은 방법으로 필드의 기본값을 지정할 수 있다.

```python
from dataclasses import dataclass


@dataclass
class User:
    name: str
    age: int = 0


user = User("yeonhx03")
print(user)
# User(name='yeonhx03', age=0)
```

기본값이 없는 필드는 기본값이 있는 필드보다 앞에 와야 한다. 순서를 바꾸면 클래스를 정의할 때 `TypeError`가 발생한다.
<br><br>

## 5. mutable 객체의 기본값

`list`나 `dictionary`같이 mutable한 객체를 필드로 가지는 경우, 기본값을 지정할 때 유의해야 한다.
아래 코드를 보자. stocks를 가진 Portfolio 클래스이다.

```python
from dataclasses import dataclass


@dataclass
class Portfolio:
    stocks: list[str] = []
```

`Portfolio` 인스턴스를 만들 때마다 빈 리스트 객체가 생성되길 바라며 코드를 작성했을 것이다.
만약 이 코드가 실행되어(실제로는 오류가 발생한다) 인스턴스가 생성된다고 가정하면, 빈 리스트는 인스턴스를 생성할 때마다 만들어지지 않고 클래스가 정의될 때 딱 한 번만 만들어진다.

따라서 모든 `Portfolio` 인스턴스가 같은 리스트를 공유하게 된다.

```python
portfolio_a = Portfolio()
portfolio_b = Portfolio()

portfolio_a.stocks.append("AAPL")
# a에만 주식을 추가했지만
print(portfolio_b.stocks)
# ['AAPL'], b에도 같은 값이 나타남.
# 두 인스턴스의 stocks가 동일한 리스트 객체를 참조하기 때문.
```

mutable한 객체의 경우 그 공유된 객체 자체를 수정할 수 있기 때문에 문제가 발생한다.
현재 파이썬의 `dataclass`는 위와 같이 변경 가능한 기본값을 발견하면 공유 참조 문제가 발생하기 전에 클래스 정의 시점에 `ValueError`를 발생시킨다.
원래의 의도대로 각 인스턴스에 새로운 리스트를 만들려면 `field()`의 `default_factory`를 사용해야 한다.
dataclasses 모듈에서 field를 추가로 `import` 해주자.

```python
from dataclasses import dataclass, field


@dataclass
class Portfolio:
    stocks: list[str] = field(default_factory=list)


portfolio_a = Portfolio()
portfolio_b = Portfolio()

portfolio_a.stocks.append("AAPL")

print(portfolio_a.stocks)
# ['AAPL']
print(portfolio_b.stocks)
# []
```

`default_factory=list`는 `Portfolio` 인스턴스를 만들 때마다 인자가 없는 `list()`를 호출하라는 의미이다. 따라서 두 인스턴스는 서로 다른 리스트를 갖는다.
<br><br>

## 6. field() 함수

`field()`를 사용하면 기본값 생성 방식뿐만 아니라 초기화, 출력, 비교에 필드를 포함할지도 세밀하게 설정할 수 있다.

### 6.1. init

`init`의 기본값은 `True`이다. `init=False`로 설정하면 자동 생성되는 `__init__` 메서드의 매개변수에서 해당 필드가 제외된다.

```python
from dataclasses import dataclass, field


@dataclass
class ApiResponse:
    body: dict[str, object]
    status_code: int = field(init=False, default=200)


response = ApiResponse(body={"message": "ok"})
print(response)
# ApiResponse(body={'message': 'ok'}, status_code=200)
# 객체를 만들 때 사용자가 지정하지 못하게 하고, 정해진 초기값(default=200)으로 초기화할 때 유용
```

### 6.2. repr

`repr=False`로 설정한 필드는 자동 생성되는 `__repr__`의 출력에서 제외된다.


```python
from dataclasses import dataclass, field


@dataclass
class ApiKey:
    name: str
    key: str = field(repr=False)


api_key = ApiKey(name="payment", key="secret-value")
print(api_key)
# ApiKey(name='payment')
```

민감한 값을 출력하지 않을 때 유용하다.
단, `repr=False`는 출력 문자열에서만 필드를 제외할 뿐이다. `api_key.key`로 값에 접근할 수 있으므로 보안 기능으로 생각해서는 안 된다.

### 6.3. compare와 eq

`@dataclass`는 기본적으로 모든 비교 대상 필드의 값이 같은지 확인하는 `__eq__` 메서드를 만든다.

```python
from dataclasses import dataclass


@dataclass
class Stock:
    ticker: str
    price: float


print(Stock("AAPL", 230.5) == Stock("AAPL", 230.5))
# True, 서로 다른 객체지만 eq 메서드는 필드 값이 모두 같은지만 본다.
# 일반적인 class의 경우 서로 다른 객체기 때문에 == 연산의 결과는 False이다.
print(Stock("AAPL", 230.5) == Stock("AAPL", 231.0))
# False
```

특정 필드를 비교에서 제외하려면 `field(compare=False)`를 사용하면 된다.

```python
from dataclasses import dataclass, field


@dataclass
class LogEvent:
    message: str
    created_at: str = field(compare=False)


first = LogEvent("server started", "10:00")
second = LogEvent("server started", "10:01")

print(first == second)
# True
# created_at은 비교에서 제외, message만 같은지 확인
```

클래스 전체에 자동 `__eq__` 메서드를 만들지 않으려면 `@dataclass(eq=False)`를 사용한다.

## 7. __post_init__

`__post_init__`은 `__init__`으로 초기화 직후 호출되는 메서드이다. 주로 초기값을 검증, 데이터 정규화, 다른 필드를 기반으로 계산된 값을 설정할 때 사용한다.

아래는 초기값 검증의 예시 코드이다.

```python
from dataclasses import dataclass


@dataclass
class Stock:
    ticker: str
    price: float

    def __post_init__(self):
        if self.price < 0:
            raise ValueError("price must be non-negative")
```

`dataclass` 데코레이터는 타입이나 값 검증을 해주지 않기 때문에, 검증 로직이 필요할 경우 `__post_init__`에 넣어 검증할 수 있다.

아래는 데이터 정규화의 예시 코드이다.

```python
@dataclass
class Stock:
    ticker: str
    price: float

    def __post_init__(self):
        self.ticker = self.ticker.upper()
```

아래는 다른 필드를 기반으로 계산된 값을 설정하는 예시 코드이다.

```python
from dataclasses import dataclass, field


@dataclass
class Holding:
    ticker: str
    quantity: int
    price: float
    total_value: float = field(init=False)  # __init__으로 받지 않고, __post_init__에서 계산

    def __post_init__(self):
        self.total_value = self.quantity * self.price  # 객체 생성 후 값을 계산
```

## 8. frozen=True

`@dataclass(frozen=True)`와 같이 데코레이터 옆에 옵션을 줄 수 있다.

`frozen=True` 옵션을 설정하면 인스턴스를 생성한 뒤 필드에 새로운 값을 대입할 수 없어 인스턴스를 immutable로 만들 수 있다.

다만 `frozen=True`는 얕은 불변성만 제공한다. 필드가 리스트와 같은 mutable 객체를 참조한다면 그 객체의 내부는 여전히 변경될 수 있다.

완전한 불변 객체가 필요하다면 리스트 대신 튜플처럼 변경할 수 없는 타입을 사용하는 것이 좋다.

## References

- [Python 공식 문서: `dataclasses` — Data Classes](https://docs.python.org/3/library/dataclasses.html)
- [Python Dataclasses: @dataclass 데코레이터 완전 가이드](https://docs.kanaries.net/ko/topics/Python/python-dataclass)
