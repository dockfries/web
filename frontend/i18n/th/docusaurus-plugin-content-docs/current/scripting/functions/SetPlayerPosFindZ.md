---
title: SetPlayerPosFindZ
sidebar_label: SetPlayerPosFindZ
description: This sets the players position then adjusts the players z-coordinate to the nearest solid ground under the position.
tags: ["player"]
---

## คำอธิบาย

This sets the players position then adjusts the players z-coordinate to the nearest solid ground under the position.

| Name     | Description                                  |
| -------- | -------------------------------------------- |
| playerid | The ID of the player to set the position of. |
| Float:x  | The X coordinate to position the player at.  |
| Float:y  | The X coordinate to position the player at.  |
| Float:z  | The Z coordinate to position the player at.  |

## ส่งคืน

1: The function executed successfully.

0: The function failed to execute. This means the player specified does not exist.

## ตัวอย่าง

```c
SetPlayerPosFindZ(playerid, 1234.5, 1234.5, 1000.0);
```

## บันทึก

:::warning

This function does not work if the new coordinates are far away from where the player currently is. The Z height will be 0, which will likely put them underground. It is highly recommended that the MapAndreas plugin be used instead.

:::

## ฟังก์ชั่นที่เกี่ยวข้องกัน

- SetPlayerPos: Set a player's position.
- OnPlayerClickMap: Called when a player sets a waypoint/target on the pause menu map.
