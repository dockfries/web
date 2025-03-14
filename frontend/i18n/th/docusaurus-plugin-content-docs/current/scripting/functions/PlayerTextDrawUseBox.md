---
title: PlayerTextDrawUseBox
sidebar_label: PlayerTextDrawUseBox
description: Toggle the box on a player-textdraw.
tags: ["player", "textdraw", "playertextdraw"]
---

## คำอธิบาย

Toggle the box on a player-textdraw.

| Name            | Description                                              |
|-----------------|----------------------------------------------------------|
| playerid        | The ID of the player whose textdraw to toggle the box of |
| PlayerText:text | The ID of the player-textdraw to toggle the box of       |
| bool:use        | **true** to use a box or **false** to not use a box      |

## ส่งคืน

This function does not return any specific values.

## ตัวอย่าง

```c
new PlayerText:MyTD[MAX_PLAYERS];

public OnPlayerConnect(playerid)
{
    MyTD[playerid] = CreatePlayerTextDraw(playerid, 40.0, 140.0, "_~N~Example text!~N~_");
    PlayerTextDrawUseBox(playerid, MyTD[playerid], true);
    PlayerTextDrawBoxColor(playerid, MyTD[playerid], 0x00000066); // Set the box color to a semi-transparent black
    return 1;
}
```

## ฟังก์ชั่นที่เกี่ยวข้องกัน

- [CreatePlayerTextDraw](CreatePlayerTextDraw): Create a player-textdraw.
- [PlayerTextDrawDestroy](PlayerTextDrawDestroy): Destroy a player-textdraw.
- [PlayerTextDrawIsBox](PlayerTextDrawIsBox): Checks if a player-textdraw is box.
- [PlayerTextDrawColor](PlayerTextDrawColor): Set the color of the text in a player-textdraw.
- [PlayerTextDrawBoxColor](PlayerTextDrawBoxColor): Set the color of a player-textdraw's box.
- [PlayerTextDrawBackgroundColor](PlayerTextDrawBackgroundColor): Set the background color of a player-textdraw.
- [PlayerTextDrawAlignment](PlayerTextDrawAlignment): Set the alignment of a player-textdraw.
- [PlayerTextDrawFont](PlayerTextDrawFont): Set the font of a player-textdraw.
- [PlayerTextDrawLetterSize](PlayerTextDrawLetterSize): Set the letter size of the text in a player-textdraw.
- [PlayerTextDrawTextSize](PlayerTextDrawTextSize): Set the size of a player-textdraw box (or clickable area for PlayerTextDrawSetSelectable).
- [PlayerTextDrawSetOutline](PlayerTextDrawSetOutline): Toggle the outline on a player-textdraw.
- [PlayerTextDrawSetShadow](PlayerTextDrawSetShadow): Set the shadow on a player-textdraw.
- [PlayerTextDrawSetProportional](PlayerTextDrawSetProportional): Scale the text spacing in a player-textdraw to a proportional ratio.
- [PlayerTextDrawSetString](PlayerTextDrawSetString): Set the text of a player-textdraw.
- [PlayerTextDrawShow](PlayerTextDrawShow): Show a player-textdraw.
- [PlayerTextDrawHide](PlayerTextDrawHide): Hide a player-textdraw.
