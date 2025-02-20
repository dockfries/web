---
title: OnNPCExitVehicle
sidebar_label: OnNPCExitVehicle
description: 当NPC离开载具时触发该回调
tags: ["npc"]
---

## 描述

当NPC离开载具时触发该回调。

## 示例

```c
public OnNPCExitVehicle()
{
    print("NPC已离开载具");
    return 1;
}
```

## 相关回调

以下回调可能与当前回调存在关联：

- [OnNPCEnterVehicle](OnNPCEnterVehicle)：当NPC进入载具时触发