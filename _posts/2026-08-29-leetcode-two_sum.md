---
title: "[LeetCode]two sum(c++)"
date: 2026-08-29
published: true
categories:
  - PS
tags:
  - "Algorithm"
  - "PS"
math: true
mathjax: true
---
[문제: two sum](https://leetcode.com/problems/two-sum/description/)

## 접근 방법

이중반복문을 이용할 수 있지만, 시간복잡도가 $O(n^{2})$ 이 되므로 다시 생각해보자. 시간복잡도를 $O(n^{2})$ 보다 낮추려면, 결국 다시 배열을 순회하는 일이 없도록 해야 한다.  

즉, `target-nums[i]` 값이 배열에 있는지 일일이 다시 순회하면 안된다. 이를 위해서 hash table을 이용할 수 있다. `C++` 에서는 `unordered_map` 을 지원하므로 이를 이용해 풀어보자.  

## Solution

우선, unordered_map `seen` 을 만들자.

그 후 배열을 한번 순회하며 hash table에 값과 인덱스를 각각 key와 value로 저장한다.

`target` 과 `num[i]`의 차를 구하고, 해당 값을 key로 삼아 index를 바로 얻을 수 있다.

```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        
        for(int i=0; i<nums.size(); i++ ){
            int need = target - nums[i];
            if(seen.find(need) != seen.end()){
                return {seen[need],i};
            }
            seen[nums[i]]=i;

        }
        return {};
    }
};
```

## Solution 2

`target`이 주어지면, 첫번째 원소와의 차를 구한다.  

이 값이 첫번째 원소 뒤의 원소 중 있는지 비교 후, 없으면 다음 원소부터 다시 시행.  

즉 이중반복문을 이용해 배열을 순회하면 되는데, 이러면 시간 복잡도가 $O(n^{2})$이 되므로 좋은 방법은 아니다.  