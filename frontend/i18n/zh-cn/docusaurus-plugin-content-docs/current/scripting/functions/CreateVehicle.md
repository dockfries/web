---
title: CreateVehicle
sidebar_label: CreateVehicle
description: 在游戏世界中创建载具。
tags: ["载具"]
---

## 描述

在游戏世界中动态创建载具，可在脚本任意时刻替代 AddStaticVehicleEx 使用。

| 参数名                                 | 说明                                                |
| -------------------------------------- | --------------------------------------------------- |
| [modelid](../resources/vehicleid)      | 载具模型 ID                                         |
| Float:spawnX                           | 载具生成的 X 轴坐标                                 |
| Float:spawnY                           | 载具生成的 Y 轴坐标                                 |
| Float:spawnZ                           | 载具生成的 Z 轴坐标                                 |
| Float:angle                            | 载具初始朝向角度                                    |
| [colour1](../resources/vehiclecolorid) | 主颜色 ID                                           |
| [colour2](../resources/vehiclecolorid) | 副颜色 ID                                           |
| respawnDelay                           | 无驾驶员时载具重生延迟（秒）。使用-1 将禁用自动重生 |
| bool:addSiren                          | 默认值'false'。为载具启用警笛功能（需载具自带喇叭） |

## 返回值

返回创建的载具 ID（范围 1 至 MAX_VEHICLES）。

若达到载具数量上限或模型 ID 无效，返回 INVALID_VEHICLE_ID (65535)。

若使用火车模型 ID（538 或 537），返回 0（不可用）。

## 示例

```c
public OnGameModeInit()
{
    // 在游戏中添加一架九头蛇直升机（520），重生时间为60秒
    CreateVehicle(520, 2109.1763, 1503.0453, 32.2887, 82.2873, -1, -1, 60);
    return 1;
}
```

## 注意事项

:::warning

火车载具仅能通过[AddStaticVehicle](AddStaticVehicle)和[AddStaticVehicleEx](AddStaticVehicleEx)添加

:::

## 相关函数

- [DestroyVehicle](DestroyVehicle): 销毁载具
- [AddStaticVehicle](AddStaticVehicle): 添加静态载具
- [AddStaticVehicleEx](AddStaticVehicleEx): 添加带自定义重生时间的静态载具
- [GetVehicleParamsSirenState](GetVehicleParamsSirenState): 检测载具警笛状态
- [SetVehicleSpawnInfo](SetVehicleSpawnInfo): 配置载具生成参数
- [GetVehicleSpawnInfo](GetVehicleSpawnInfo): 获取载具生成信息
- [ChangeVehicleColours](ChangeVehicleColours): 修改载具颜色配置
- [GetVehicleColours](GetVehicleColours): 获取载具颜色配置
- [SetVehicleRespawnDelay](SetVehicleRespawnDelay): 设置载具重生延迟
- [GetVehicleRespawnDelay](GetVehicleRespawnDelay): 获取载具重生延迟

## 相关回调

- [OnVehicleSpawn](../callbacks/OnVehicleSpawn): 载具重生时触发
- [OnVehicleSirenStateChange](../callbacks/OnVehicleSirenStateChange): 警笛状态变化时触发

## 相关资源

- [载具模型列表](../resources/vehicleid): 游戏中所有可用载具模型的完整清单
- [载具颜色 ID 列表](../resources/vehiclecolorid): 所有载具颜色 ID 对照表
