---
title: IsTextDrawVisibleForPlayer
sidebar_label: IsTextDrawVisibleForPlayer
description: 检测玩家的文本绘制是否可见。
tags: ["文本绘制"]
---

<VersionWarn version='omp v1.1.0.2612' />

## 描述

检测指定玩家的全局文本绘制是否处于显示状态。

| 参数名      | 说明                |
| ----------- | ------------------- |
| playerid    | 要检测的玩家 ID     |
| Text:textid | 要检测的文本绘制 ID |

## 返回值

**true** - 文本绘制当前可见

**false** - 文本绘制当前隐藏

## 示例代码

```c
new Text:gMyTextdraw; // 声明全局文本绘制变量

public OnGameModeInit()
{
    gMyTextdraw = TextDrawCreate(240.0, 580.0, "示例文本");
    return 1;
}

public OnPlayerConnect(playerid)
{
    TextDrawShowForPlayer(playerid, gMyTextdraw);
    return 1;
}

public OnPlayerSpawn(playerid)
{
    if (IsTextDrawVisibleForPlayer(playerid, gMyTextdraw))
    {
        // 文本绘制对玩家可见
    }
    return 1;
}
```

## 相关函数

- [TextDrawCreate](TextDrawCreate): 创建全局文本绘制
- [TextDrawShowForPlayer](TextDrawShowForPlayer): 为指定玩家显示文本绘制
- [TextDrawHideForPlayer](TextDrawHideForPlayer): 为指定玩家隐藏文本绘制
