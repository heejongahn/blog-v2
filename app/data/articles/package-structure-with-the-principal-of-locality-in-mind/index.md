---
title: "지역성의 원칙을 고려한 패키지 구조: 기능별로 나누기"
date: 2020-10-18T08:11:37.498Z
description: 보다 효율적이고 견고한 패키지 구조에 대한 고민
tags:
  - 프로그래밍
---

# 들어가며

패키지 구조의 선택은 프로그래머로서 맞닥뜨리는 단골 고민 주제 중 하나다. 정답이 없는 문제겠지만, 여러 차례 관련된 고민을 하면서 나름의 깨달음을 발견해 글로 남겨본다.

# 패키지 구조: 첫 시도

간단한 쇼핑몰을 만드는 경우를 생각해보자.

프로젝트를 시작하는 시점엔 코드의 양도 적고, 다루어야 하는 복잡도도 그다지 높지 않다. 그렇다고 모든 파일을 동일한 레벨에 늘어놓을 수는 없기에, 어떤 형태로든 정리를 해나가다 보면 보통 아래와 같은 형태의 디렉터리 구조가 나온다.

```
my-project
├── components
│   ├── ProductDetail.tsx
│   └── ProductItem.tsx
├── remotes
│   └── fetchProducts.ts
└── utils
    ├── filterProducts.ts
    └── parseProduct.ts
```

코드가 속하는 계층(layer)에 따라 분리된 형태다. 유틸리티 함수는 여기, API를 호출하는 코드는 여기, 리액트 컴포넌트는 저기… 작은 프로젝트에서 이런 구조는 잘 동작한다.

# 패키지 구조: 첫 시도의 문제

프로젝트가 어느 정도 복잡해지면, 한 프로젝트 내에서도 서로 상대적으로 독립적으로 동작하는 기능들이 생긴다. 예를 들어, 상품을 보여주는 기능만 있던 우리 프로젝트에 장바구니 기능을 추가하는 경우를 생각해보자. 새로 추가되는 코드를 기존에 존재하던 분류대로 놓아보자면 아래와 같은 형태가 될 것이다.

```
my-project
├── components
│   ├── CartItem.tsx
│   ├── CartTotal.tsx
│   ├── ProductDetail.tsx
│   └── ProductItem.tsx
├── remotes
│   ├── addToCart.ts
│   ├── fetchCart.ts
│   ├── fetchProducts.ts
│   └── removeFromCart.ts
└── utils
    ├── applyDiscount.ts
    ├── filterProducts.ts
    ├── getCartSum.ts
    └── parseProduct.ts
```

대부분 프로젝트는 시간이 흐름에 따라 자연스레 덩치가 커지고, 이런 기능의 추가를 여러 차례 겪은 프로젝트는 아래와 같은 형태가 될 것이다.

```
my-project
├── components
│   ├── CartItem.tsx
│   ├── CartTotal.tsx
│   ├── ProductDetail.tsx
│   ├── ProductItem.tsx
│   ├── (...사용자 관련 컴포넌트)
│   └── (...이벤트 관련 컴포넌트)
├── remotes
│   ├── addToCart.ts
│   ├── fetchCart.ts
│   ├── fetchProducts.ts
│   ├── removeFromCart.ts
│   ├── (...사용자 관련 리모트 코드)
│   └── (...이벤트 관련 리모트 코드)
└── utils
    ├── applyDiscount.ts
    ├── filterProducts.ts
    ├── getCartSum.ts
    ├── parseProduct.ts
    ├── (...사용자 관련 유틸리티 함수)
    └── (...이벤트 관련 유틸리티 함수)
```

별 문제는 없어 보인다. 코드는 많아졌지만, 우리가 세운 원칙에 맞게 여러 파일이 잘 분류가 되어있다. 그런데 정말 그럴까? 이렇게 코드베이스가 발전한 시점에서, 제품 목록과 관련된 스펙이 변경되었다고 가정해보자. 프로그래머는 아래와 같은 파일들을 건드리게 될 것이다.

```
my-project
├── components
│   ├── CartItem.tsx
│   ├── CartTotal.tsx
│   ├── ProductDetail.tsx           // 건드려야 할 파일
│   ├── ProductItem.tsx             // 건드려야 할 파일
│   ├── (...사용자 관련 컴포넌트)
│   └── (...이벤트 관련 컴포넌트)
├── remotes
│   ├── addToCart.ts
│   ├── fetchCart.ts
│   ├── fetchProducts.ts            // 건드려야 할 파일
│   ├── removeFromCart.ts           // 건드려야 할 파일
│   ├── (...사용자 관련 리모트 코드)
│   └── (...이벤트 관련 리모트 코드)
└── utils
    ├── applyDiscount.ts
    ├── filterProducts.ts           // 건드려야 할 파일
    ├── getCartSum.ts
    ├── parseProduct.ts             // 건드려야 할 파일
    ├── (...사용자 관련 유틸리티 함수)
    └── (...이벤트 관련 유틸리티 함수)
```

간단한 기능 추가에도 프로젝트의 여러 폴더를 광범위하게 건드리는 작업이 필요하다. 그뿐만이 아니다. 컴포넌트가 유틸리티 함수나 리모트 코드를 참조할 때마다 모든 의존성 경로가 루트 레벨까지 거슬러 올라갔다가 다시 다른 디렉터리를 파고 들어가는 형태로 길고 복잡해진다. (`import { applyDiscount } from  ‘../../../my-project/utils/applyDiscount’;`)

장바구니, 이벤트 등 특정 기능을 별도의 패키지로 분리하려 할 때는 어떨까? 관련 구현이 프로젝트의 온갖 곳에 흩어져 있어 대수술이 불가피할 것이다. 게다가 이러한 구조에서는 기능별로 기능의 내부 구현 디테일에 해당하는 유틸리티 함수 등을 감싸서 외부에 노출하지 않도록 하기도 여의치 않다.

정리하면, 계층별로 코드를 분리하는 구조는 아래와 같은 단점을 갖는다.

- 어떤 기능과 관련된 구현이 코드베이스 전체에 흩어지게 된다. 때문에 특정 작업의 영향 범위가 특정 폴더 수준으로 제한되지 않고 코드베이스 전체로 퍼진다.
- 구현이 한 군데 모여있지 않아, 특정 기능을 모듈로 분리하는 작업이 어려워진다.
- 기능의 내부 구현 디테일을 감추고 바깥에 추상화된 형태로 제공하기가 어려워진다.

# 지역성의 원칙

이러한 문제를 해결하기 위한 방법을 제시하기 전에, 잠시 알아보고 갈 개념이 있다. 바로 지역성의 원칙(principal of locality)인데, [영어 위키피디아 항목](https://en.wikipedia.org/wiki/Locality_of_reference)에는 아래와 같이 설명되어있다.

> 컴퓨터 과학에서, **참조의 지역성**, 또는 **지역성의 원칙**이란 프로세서가 짧은 시간 동안 동일한 메모리 공간에 반복적으로 접근하는 경향을 의미한다. 참조 지역성엔 두 종류가 있는데, 시간적 지역성과 공간적 지역성이다. 시간적 지역성이란 특정 데이터 또는 리소스가 짧은 시간 내에 반복적으로 사용되는 것을 가리킨다. 공간적 지역성이란 상대적으로 가까운 저장 공간에 있는 데이터 요소들이 사용되는 것을 가리킨다. 공간적 지역성의 특수한 경우인 순차적 지역성은 배열의 요소를 순회할 때와 같이 데이터 요소들이 선형적으로 배열되어 있고 접근될 때 발생한다.
>
> In computer science , **locality of reference**, also known as the **principle of locality**, is the tendency of a processor to access the same set of memory locations repetitively over a short period of time. There are two basic types of reference locality – temporal and spatial locality. Temporal locality refers to the reuse of specific data, and/or resources, within a relatively small time duration. Spatial locality (also termed /data locality/ refers to the use of data elements within relatively close storage locations. Sequential locality, a special case of spatial locality, occurs when data elements are arranged and accessed linearly, such as, traversing the elements in a one-dimensional array.

조금 더 풀어서 설명하면, 보통의 프로그램에서는 아래와 같은 두 경향이 존재한다.

- 특정 메모리가 한 번 참조되었다면, 그 메모리는 조만간 다시 참조될 확률이 높다. (시간적 지역성)
- 특정 메모리가 한 번 참조되었다면, 그 메모리의 근처에 있는 메모리도 조만간 참조될 확률이 높다. (공간적 지역성)

예를 들어, 배열을 순회하는 경우 첫 요소에 접근한 이후 곧바로 근처 메모리에 존재하는 다음 요소들에 차례로 접근하거나, 반복문의 본문에서 참조하는 데이터는 첫 참조 직후에도 여러 차례 반복해서 참조 당하는 식이다.

이는 **프로그래머가 그것을 목표로 하고 코드를 짜지 않더라도** 일반적인 프로그램에서 나타나는 보편적인 경향이다. 컴퓨터의 핵심 구성 요소 중 하나인 캐시는 이 경향을 이용해 적은 용량에도 불구하고 효율적인 보조 기억 장치로 동작할 수 있다.

매우 간단하게 설명하면, 어떤 메모리 공간에 대한 접근이 일어났을 때 캐시에는 그 공간을 포함하는 작은 크기의 메모리 블록(block)이 적재된다. 이 블록의 크기는 전체 메모리 공간보다 훨씬 작지만, 지역성에 의해 당분간 해당 블록에 포함되는 메모리가 참조될 확률이 높으므로, 결과적으로 많은 접근을 효과적으로 처리할 수 있다. (캐시의 동작에 더 관심이 있는 분께는 [💵 캐시가 동작하는 아주 구체적인 원리](https://parksb.github.io/article/29.html) 를 추천)

# 지역성의 원칙을 고려한 패키지 구조

그럼 다시 패키지 구조의 문제로 돌아와, 유한한 자원인 프로그래머의 머릿속 공간을 캐시라고 생각해보자.

모든 프로그램 메모리를 캐시에 올릴 수 없는 것과 유사하게 프로그래머 역시 복잡하고 거대한 프로젝트 전체의 맥락을 한 번에 머리 속에 들고 있을 수 없다. 하지만 일단 코드베이스 내 특정 영역, 내지는 특정 폴더의 동작과 맥락을 파악할 수 있다면, 해당 영역에 대해서는 마치 캐시에 이미 적재된 데이터 블록에 접근하듯 빠르게 처리가 가능하다.

문제는 캐시에 올릴 데이터 블록을 나누는 기준, 즉 폴더 구조를 어떻게 결정할 것인가이다. 캐시는 프로그램이 메모리에 접근하는 패턴에 존재하는 지역성을 기반으로 메모리상의 연결된 주소 공간을 한 덩어리로 다룬다. 이와 유사하게 프로그래머가 프로그램 내 파일에 접근하는 패턴에서 지역성을 발견할 수 있다면? 그에 맞추어 효율적인 패키지 구조를 찾을 수 있을 것이다.

현실 세계에서의 프로그래머의 업무는 많은 경우 연결된 맥락을 갖는다. 예를 들어 장바구니 개편이라는 업무를 수행하는 과정에는 장바구니라는 기능에 속하는 다양한 유틸리티, 리모트, 컴포넌트 코드 등이 비슷한 시기에 수정된다. 또한, 그에 수반하여 장바구니라는 기능과 결제, 상품 목록 등에도 적절한 변화가 필요할 수도 있다.

이때 **프로젝트의 기능** 각각을 하나의 블록으로 바라보면 일반적으로 아래와 같은 지역성이 성립함을 알 수 있다.

- 시간적 지역성: 특정 기능에 속하는 코드를 추가, 수정, 삭제한 프로그래머는 조만간 그 기능에 속하는 다른 코드를 건드릴 확률이 높다.
- 공간적 지역성: 특정 기능에 속하는 코드를 추가, 수정, 삭제한 프로그래머는 그 기능 주변부의 (상대적으로 긴밀히 연관된) 다른 기능에 속하는 코드를 건드릴 확률이 높다.

이러한 지역성은 코드가 속하는 계층이 아닌, 속하는 기능을 기준으로 발생한다.

- 장바구니의 유틸리티 함수를 수정한 프로그래머가 장바구니의 리모트, 컴포넌트들도 비슷한 시기에 수정할 가능성
- 장바구니의 유틸리티 함수를 수정한 프로그래머는 일반적으로 그 이후에 다른 유틸리티 함수 수정할 가능성

둘을 비교하면 전자가 후자보다 높은 것을 생각하면 쉽다.

이러한 지역성이 반영되지 않은, 계층을 기준으로 나눈 프로젝트 구조에서는 필연적으로 캐시 미스(cache miss)가 자주 발생한다. 한 폴더 내의 파일을 수정한 뒤, 이어지는 작업을 위해 다른 폴더를 찾아가야 하는 상황이 반복되는 것이다. 높은 캐시 미스 비율이 성능을 해치듯, 이러한 상황이 자주 반복되면 프로그래머의 생산성은 낮아진다.

이 상황을 타개하기 위해선 프로젝트의 내부 구조가 지역성이 발생하는 단위, 즉 기능별로 묶이도록 재배열할 필요가 있다. 위의 예시 프로젝트를 다시 정렬한다면 아래와 같을 것이다.

```
my-project
├── shared
│   └── (여러 기능이 공통으로 사용하는 코드)
├── cart
│   ├── components
│   │   ├── CartItem.tsx
│   │   └── CartTotal.tsx
│   ├── remotes
│   │   ├── addToCart.ts
│   │   ├── fetchCart.ts
│   │   └── removeFromCart.ts
│   └── utils
│       ├── applyDiscount.ts
│       └── getCartSum.ts
├── product
│   ├── components
│   │   ├── ProductDetail.tsx
│   │   └── ProductItem.tsx
│   ├── remotes
│   │   └── fetchProducts.ts
│   └── utils
│       ├── filterProducts.ts
│       └── parseProduct.ts
├── event
│   └── (이벤트 관련 코드)
└── user
    └── (사용자 관련 코드)
```

프로젝트는 최상위에서 서로 긴밀히 연결된 기능별로 나누어진다. 장바구니에 관련된 작업은 `cart` 폴더 내에서, 제품 목록에 관련된 작업은 `product` 폴더 내에서 이루어지고, 여러 기능에서 공용으로 사용하는 코드는 `shared` 이하에 존재한다. 특정 목적 달성은 높은 응집력(high cohesion)을 갖는 특정 폴더 내에서, 관련 맥락을 머리 속 캐시에 적재한 상태로 이루어진다. 예를 들어, 아까와 동일하게 제품 목록과 관련된 스펙 변경사항을 반영하기 위해 건드려야 할 팔일은 이제 아래와 같이 한 폴더 내에 존재한다.

```
my-project
├── shared
│   └── (여러 기능이 공통으로 사용하는 코드)
├── cart
│   ├── components
│   │   ├── CartItem.tsx
│   │   └── CartTotal.tsx
│   ├── remotes
│   │   ├── addToCart.ts
│   │   ├── fetchCart.ts
│   │   └── removeFromCart.ts
│   └── utils
│       ├── applyDiscount.ts
│       └── getCartSum.ts
├── product
│   ├── components
│   │   ├── ProductDetail.tsx     // 건드려야 할 파일
│   │   └── ProductItem.tsx       // 건드려야 할 파일
│   ├── remotes
│   │   └── fetchProducts.ts      // 건드려야 할 파일
│   └── utils
│       ├── filterProducts.ts     // 건드려야 할 파일
│       └── parseProduct.ts       // 건드려야 할 파일
├── event
│   └── (이벤트 관련 코드)
└── user
    └── (사용자 관련 코드)
```

기능별 패키지 구조의 장점은 캐시 히트 비율만이 아니다. 연관된 코드가 모두 같은 폴더에 존재하므로 추후 기능을 간단하게 삭제, 또는 별도 패키지로 추출할 수 있다. 그뿐만 아니라, 각 기능 폴더의 최상단을 기능 내부를 추상화하는 인터페이스처럼 사용해, 기능 내에서만 쓰일 코드는 감추고 외부서 접근해야 할 코드만 노출하는 식의 추상화를 구현하기도 훨씬 쉽다. 특정 기능 관련 구현이 여러 폴더에 흩뿌려져 있을 땐 달성하기 어려운 목표들이다.

물론 계층별로 코드를 나누는 일이 무조건 나쁜 것은 아니다. 위의 예시 코드만 보아도 기능별 폴더 안에선 계층별로 코드를 분리하고 있다. 상위 레벨에서 기능별로 나누어져 내부적으로는 마치 작은 하나의 프로젝트처럼 동작하는 특정 기능 폴더 내에서는 계층별 코드 분리가 의존성의 방향 관리를 비롯한 여러 목적에 도움이 될 수 있을 것이다.

# 맺으며

이 글은 며칠 전에 코드 리뷰를 하다 남긴 이 코멘트에서 시작되었다.

> 저 자신도 습관적으로 어길 때가 많지만… 개인적으로는 도메인별로 (offboarding, probationComplete, …) 폴더를 나누는 것이 코드의 종류별로 (remote, model, …) 나누는 것에 비해 서로 참조하고 맥락을 공유하는 애들이 근처에 살게 되어서 관리가 편했던 것 같습니다.

해당 코멘트에 다른 백엔드 엔지니어 분께서 “Package by feature, not layer” 라는 제목을 가진 [링크](http://www.javapractices.com/topic/TopicAction.do?Id=205)와 함께 자바 쪽에 비슷한 컨벤션이 존재함을 알려주셨고, “Packages by Feature“ 라는 키워드로 검색해보니 여러 글이 나왔다. 이런 장점이 있다 보니 당연히 이미 수많은 사람이 관련 프랙티스를 정리하고 소개한 리소스가 넘쳐나는데, 그걸 뒤늦게 발견한 것이다. (좀 다른 이야기지만 디자인 패턴 부류의 지식에 별로 관심을 가지지 않고 살았는데, 고전에 해당하는 자료만이라도 한 번쯤 읽어봐야겠다는 반성을 했다.)

경험적으로 얻은 느낌이 이미 널리 알려진 개념과 매치되는 것이 반가워(?) 그냥 간단한 소개와 함께 링크만 공유할까 하다가, 문득 이러한 접근의 차이를 지역성으로 설명할 수도 있겠다는 생각이 들어 글로 정리해보았다. 얼마나 설득력이 있는지는 잘 모르겠지만 😅 개인적으로는 글로 적으며 처음의 막연했던 생각을 어느 정도 정리할 수 있어 좋았다.

정답이 없는 문제인 만큼, 앞으로 생각이 바뀌거나 더 나은 방법을 찾는 일이 생길 수 있을 것이다 (그리고 그러길 바란다). 지금은 지금 드는 생각을 기록하고, 그런 상황이 생기면 그때 또 포스팅해 보기로!
