---
title: CountRunningTimers
sidebar_label: CountRunningTimers
description: 获取当前运行的计时器数量。
tags: ["计时器"]
---

<VersionWarn version='omp v1.1.0.2612' />

## 说明

获取通过[SetTimer](SetTimer)和[SetTimerEx](SetTimerEx)创建的正在运行的计时器数量。

## 返回值

返回当前运行的计时器数量。

## 应用示例

```c
printf("运行中的计时器数量: %d", CountRunningTimers());
```

## 关联函数

- [SetTimer](SetTimer): 创建基础计时器
- [SetTimerEx](SetTimerEx): 创建带参数的计时器
- [KillTimer](KillTimer): 终止正在运行的计时器
