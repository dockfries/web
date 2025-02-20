---
title: OnVehiclePaintjob
sidebar_label: OnVehiclePaintjob
description: 当玩家在改装店预览载具喷漆时触发该回调函数。
tags: ["vehicle"]
---

## 描述

当玩家在改装店内预览载具喷漆时触发该回调函数（注意：玩家购买喷漆时不会触发）。

| 参数名       | 说明                                                      |
| ---------- | -------------------------------------------------------- |
| playerid   | 变更喷漆预览的玩家ID                                      |
| vehicleid  | 变更喷漆预览的载具ID                                      |
| paintjobid | 新预览的喷漆ID                                            |

## 返回值

该回调始终在游戏模式中优先触发，返回0将阻止其他滤镜脚本处理此事件。

## 示例

```c
public OnVehiclePaintjob(playerid, vehicleid, paintjobid)
{
    new string[128];
    format(string, sizeof(string), "您已将载具预览喷漆变更为 %d 号样式！", paintjobid);
    SendClientMessage(playerid, 0x33AA33AA, string);
    return 1;
}
```

## 注意事项

:::tip

- 本回调不会通过 [ChangeVehiclePaintjob](../functions/ChangeVehiclePaintjob) 函数触发
- 如需检测玩家购买喷漆行为，可使用 vSync 插件的 OnVehicleChangePaintjob 回调

:::

## 相关回调

以下回调可能与该回调存在关联：

- [OnVehicleRespray](OnVehicleRespray): 当载具重新喷漆时触发
- [OnVehicleMod](OnVehicleMod): 当载具进行改装时触发

## 相关函数

以下函数可能与该回调存在关联：

- [ChangeVehiclePaintjob](../functions/ChangeVehiclePaintjob): 变更载具喷漆样式
- [ChangeVehicleColor](../functions/ChangeVehicleColor): 设置载具颜色
- [GetVehiclePaintjob](../functions/GetVehiclePaintjob): 获取载具当前喷漆样式

## 相关资源

- [载具喷漆样式列表](../resources/paintjobids)