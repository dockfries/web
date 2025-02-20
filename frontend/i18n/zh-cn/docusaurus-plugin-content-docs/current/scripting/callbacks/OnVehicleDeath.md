---
title: OnVehicleDeath
sidebar_label: OnVehicleDeath
description: 当载具被摧毁（爆炸或浸没水中）时触发该回调函数。
tags: ["vehicle"]
---

## 描述

当载具被摧毁时触发该回调函数，触发条件包括：
- 载具爆炸
- 载具完全浸没水中

| 参数名      | 说明                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------- |
| vehicleid | 被摧毁的载具ID                                                                                   |
| killerid  | 报告载具摧毁状态的玩家ID（参数名易误解，通常为驾驶员/乘客或最近玩家）                             |

## 返回值

该回调始终在滤镜脚本中优先触发。

## 示例

```c
public OnVehicleDeath(vehicleid, killerid)
{
    new string[64];
    format(string, sizeof(string), "载具 %i 已被摧毁。报告者：玩家 %i。", vehicleid, killerid);
    SendClientMessageToAll(0xFFFFFFFF, string);
    return 1;
}
```

## 注意事项

:::tip

- 载具部分浸没水中时也会触发本回调，此时通过传送或驶出水域仍可挽救载具
- 载具完全摧毁后，当驾驶员离开或经过短暂时间，载具会消失且不会再次触发本回调

:::

## 相关回调

以下回调可能与该回调存在关联：

- [OnVehicleSpawn](OnVehicleSpawn): 当载具重新生成时触发

## 相关函数

以下函数可能与该回调存在关联：

- [SetVehicleHealth](../functions/SetVehicleHealth): 设置载具生命值
- [GetVehicleHealth](../functions/GetVehicleHealth): 获取载具生命值
- [RepairVehicle](../functions/RepairVehicle): 完全修复载具