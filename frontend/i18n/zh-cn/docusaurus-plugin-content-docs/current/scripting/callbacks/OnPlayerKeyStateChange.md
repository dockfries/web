---
title: OnPlayerKeyStateChange
sidebar_label: OnPlayerKeyStateChange
description: 当玩家支持的按键状态发生改变（按下/释放）时触发该回调函数。
tags: ["player"]
---

## 描述

当玩家支持的[按键](../resources/keys)状态发生改变（按下/释放）时触发该回调函数。<br/>方向键（上/下/左/右）不会触发此回调。

| 参数名   | 说明                                                 |
| -------- | ---------------------------------------------------- |
| playerid | 触发按键状态变化的玩家ID                             |
| newkeys  | 当前按下的按键位掩码 - [参见此处](../resources/keys) |
| oldkeys  | 变化前的按键位掩码 - [参见此处](../resources/keys)   |

## 返回值

- 本回调不处理返回值
- 始终在游戏模式中优先触发

## 注意事项

:::info

NPC也可触发此回调

:::

:::tip

方向键（上/下/左/右）不会触发此回调<br/>需通过[GetPlayerKeys](../functions/GetPlayerKeys)在[OnPlayerUpdate](../callbacks/OnPlayerUpdate)或定时器中检测

:::

## 相关函数

以下函数可能与本回调相关：

- [GetPlayerKeys](../functions/GetPlayerKeys): 检测玩家当前按下的按键

## 技术解析

### 概述

本回调用于检测圣安地列斯映射的功能键状态变化（非实际物理按键）。例如无法检测空格键，但可检测冲刺键（默认映射为空格）。

### 参数机制

通过位掩码表示按键状态。每个按键对应一个二进制位，需使用位运算进行检测。

### 错误检测方式

```c
if (newkeys == KEY_FIRE) // 错误：无法处理组合按键
```

### 正确检测方式

```c
if (newkeys & KEY_FIRE) // 正确：检测是否包含该按键
```

### 精确检测按键按下

```c
// 检测按键刚被按下
if ((newkeys & KEY_FIRE) && !(oldkeys & KEY_FIRE))
```

### 精确检测按键释放

```c
// 检测按键刚被释放
if ((oldkeys & KEY_FIRE) && !(newkeys & KEY_FIRE))
```

### 组合键检测

```c
// 检测同时按下两个按键
if ((newkeys & (KEY_FIRE | KEY_CROUCH)) == (KEY_FIRE | KEY_CROUCH) && (oldkeys & (KEY_FIRE | KEY_CROUCH)) != (KEY_FIRE | KEY_CROUCH))
```

## 宏定义方案

### 检测持续按住

```c
#define HOLDING(%0) ((newkeys & (%0)) == (%0))

// 示例：检测按住开火键
if (HOLDING( KEY_FIRE ))

// 示例：检测同时按住开火+蹲下
if (HOLDING( KEY_FIRE | KEY_CROUCH ))
```

### 检测首次按下

```c
#define PRESSED(%0) (((newkeys & (%0)) == (%0)) && ((oldkeys & (%0)) != (%0)))

// 示例：检测刚按下开火键
if (PRESSED( KEY_FIRE ))

// 示例：检测刚同时按下开火+蹲下
if (PRESSED( KEY_FIRE | KEY_CROUCH ))
```

### 检测当前按下状态

```c
#define PRESSING(%0,%1) (%0 & (%1))

// 示例：检测当前按着开火键
if (PRESSING( newkeys, KEY_FIRE ))

// 示例：检测当前按着开火+蹲下
if (PRESSING( newkeys, KEY_FIRE | KEY_CROUCH ))
```

### 检测按键释放

```c
#define RELEASED(%0) (((newkeys & (%0)) != (%0)) && ((oldkeys & (%0)) == (%0)))

// 示例：检测刚释放开火键
if (RELEASED( KEY_FIRE ))

// 示例：检测刚释放开火+蹲下
if (RELEASED( KEY_FIRE | KEY_CROUCH ))
```

## 应用示例

### 按下开火键安装氮气

```c
public OnPlayerKeyStateChange(playerid, KEY:newkeys, KEY:oldkeys)
{
	if (PRESSED(KEY_FIRE) && IsPlayerInAnyVehicle(playerid))
	{
		AddVehicleComponent(GetPlayerVehicleID(playerid), 1010); // 添加氮气组件
	}
	return 1;
}
```

### 超级跳跃

```c
public OnPlayerKeyStateChange(playerid, KEY:newkeys, KEY:oldkeys)
{
	if (PRESSED(KEY_JUMP))
	{
		new Float:z;
		GetPlayerPos(playerid, _, _, z);
		SetPlayerPos(playerid, _, _, z + 10.0); // Z轴坐标提升10单位
	}
	return 1;
}
```

### 按住使用键无敌

```c
new Float:gPlayerHealth[MAX_PLAYERS];
#define INFINITY (Float:0x7F800000)

public OnPlayerKeyStateChange(playerid, KEY:newkeys, KEY:oldkeys)
{
	if (PRESSED(KEY_ACTION))
	{
		GetPlayerHealth(playerid, gPlayerHealth[playerid]); // 保存当前生命值
		SetPlayerHealth(playerid, INFINITY); // 设置为无敌
	}
	else if (RELEASED(KEY_ACTION))
	{
		SetPlayerHealth(playerid, gPlayerHealth[playerid]); // 恢复原生命值
	}
	return 1;
}
```

## 底层原理

通过位掩码运算精确检测按键状态：

- **KEY_SPRINT** 二进制: `0b00001000`
- **KEY_JUMP** 二进制: `0b00100000`
- 组合检测时使用位与(&)和等于(==)运算确保精确匹配

当玩家同时按下多个按键时，通过位运算可准确分离目标按键状态，避免其他按键干扰检测结果。
