---
title: SetPlayerFacingAngle
sidebar_label: SetPlayerFacingAngle
description: Set a player's facing angle (Z rotation).
tags: ["player"]
---

## คำอธิบาย

Set a player's facing angle (Z rotation).

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| playerid  | The ID of the player to set the facing angle of. |
| Float:ang | The angle the player should face.                |

## ส่งคืน

1: The function executed successfully.

0: The function failed to execute. The player specified does not exist.

## ตัวอย่าง

```c
SetPlayerFacingAngle( playerid, 0 ); //Player faces north
```

```
        north (0)
           |
(90) west-   -east (270)      (Good way to remember: Never Eat Shredded Wheat)
           |
        south (180)
```

## บันทึก

:::warning

Angles are reversed in GTA:SA; 90 degrees would be East in the real world, but in GTA:SA 90 degrees is in fact West. North and South are still 0/360 and 180. To convert this, simply do 360 - angle.

:::

## ฟังก์ชั่นที่เกี่ยวข้องกัน

- GetPlayerFacingAngle: Check where a player is facing.
- SetPlayerPos: Set a player's position.
