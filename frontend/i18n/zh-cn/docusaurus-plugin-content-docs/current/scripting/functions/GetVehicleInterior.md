---
title: GetVehicleInterior
sidebar_label: GetVehicleInterior
description: 获取车辆的内部空间ID。
tags: ["车辆"]
---

<VersionWarn version='omp v1.1.0.2612' />

## 描述

获取指定车辆的内部空间 ID。

## 参数

| 参数名    | 说明            |
| --------- | --------------- |
| vehicleid | 目标车辆的 ID。 |

## 返回值

返回车辆的内部空间 ID。

## 示例代码

```c
public OnGameModeInit()
{
    new vehicleid = CreateVehicle(560, 2096.1917, -1328.5150, 25.1059, 0.0000, 6, 0, 100);
    LinkVehicleToInterior(vehicleid, 15);

    new interiorid = GetVehicleInterior(vehicleid);
    // interiorid = 15
    return 1;
}
```

## 相关函数

- [LinkVehicleToInterior](LinkVehicleToInterior): 将车辆链接到指定内部空间。
