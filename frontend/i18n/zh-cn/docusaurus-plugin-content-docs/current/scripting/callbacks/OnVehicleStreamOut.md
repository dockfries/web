---
title: OnVehicleStreamOut
sidebar_label: OnVehicleStreamOut
description: 当载具从玩家客户端流卸载时触发该回调函数（载具距离过远超出可视范围）。
tags: ["vehicle"]
---

## 描述

当载具从玩家客户端流卸载时触发该回调函数（载具距离过远超出可视范围）。

| 参数名        | 说明                                                  |
| ----------- | ---------------------------------------------------- |
| vehicleid   | 被流卸载的载具ID                                      |
| forplayerid | 停止流加载该载具的玩家ID                              |

## 返回值

该回调始终在滤镜脚本中优先触发。

## 示例

```c
public OnVehicleStreamOut(vehicleid, forplayerid)
{
    new string[48];
    format(string, sizeof(string), "您的客户端已停止流加载载具 %d", vehicleid);
    SendClientMessage(forplayerid, 0xFFFFFFFF, string);
    return 1;
}
```

## 注意事项

<TipNPCCallbacks />

## 相关回调

- [OnVehicleStreamIn](OnVehicleStreamIn): 当载具被玩家客户端流加载时触发
- [OnPlayerStreamIn](OnPlayerStreamIn): 当玩家被其他客户端流加载时触发
- [OnPlayerStreamOut](OnPlayerStreamOut): 当玩家被其他客户端流卸载时触发
