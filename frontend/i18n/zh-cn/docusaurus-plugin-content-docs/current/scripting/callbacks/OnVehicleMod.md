---
title: OnVehicleMod
sidebar_label: OnVehicleMod
description: 当载具被改装时触发该回调函数。
tags: ["vehicle"]
---

## 描述

当载具被改装（添加组件）时触发该回调函数。

| 参数名        | 说明                                             |
| ----------- | ------------------------------------------------ |
| playerid    | 进行改装的玩家ID（载具驾驶员）                   |
| vehicleid   | 被改装的载具ID                                   |
| componentid | 添加到载具的改装组件ID                           |

## 返回值

该回调始终在游戏模式中优先触发，返回0将阻止其他滤镜脚本处理此事件。

## 示例

```c
public OnVehicleMod(playerid, vehicleid, componentid)
{
    printf("载具 %d 被玩家 %d 改装，使用组件ID %d", vehicleid, playerid, componentid);

    if (GetPlayerInterior(playerid) == 0)
    {
        BanEx(playerid, "非法改装"); // 反非法改装脚本
        return 0; // 阻止非法改装同步给其他玩家
        // 经测试有效，即使服务器允许通过指令/菜单等方式改装
    }
    return 1;
}
```

## 注意事项

:::tip

本回调不会通过 [AddVehicleComponent](../functions/AddVehicleComponent) 函数触发

:::

## 相关回调

以下回调可能与该回调存在关联：

- [OnEnterExitModShop](OnEnterExitModShop): 当载具进入/离开改装店时触发
- [OnVehiclePaintjob](OnVehiclePaintjob): 当载具喷漆变更时触发
- [OnVehicleRespray](OnVehicleRespray): 当载具重新喷漆时触发

## 相关函数

以下函数可能与该回调存在关联：

- [AddVehicleComponent](../functions/AddVehicleComponent): 为载具添加改装组件
- [RemoveVehicleComponent](../functions/RemoveVehicleComponent): 移除载具的改装组件
- [GetVehicleComponentType](../functions/GetVehicleComponentType): 获取组件类型信息

## 相关资源

- [载具改装组件列表](../resources/carcomponentid)