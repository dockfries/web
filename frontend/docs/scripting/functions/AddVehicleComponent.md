---
title: AddVehicleComponent
sidebar_label: AddVehicleComponent
description: Adds a 'component' (often referred to as a 'mod' (modification)) to a vehicle.
tags: ["vehicle"]
---

## Description

Adds a 'component' (often referred to as a 'mod' (modification)) to a vehicle. Valid components can be found here.

| Name                                     | Description                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| vehicleid                                | The ID of the vehicle to add the component to. Not to be confused with modelid. |
| [component](../resources/carcomponentid) | The ID of the component to add to the vehicle.                                  |

## Returns

**true** - The component was successfully added to the vehicle.

**false** - The component was not added because the vehicle does not exist.

## Examples

```c
new gTaxi;

public OnGameModeInit()
{
    gTaxi = AddStaticVehicle(420, -2482.4937, 2242.3936, 4.6225, 179.3656, 6, 1); // Taxi
    return 1;
}

public OnPlayerStateChange(playerid, PLAYER_STATE:newstate, PLAYER_STATE:oldstate)
{
    if (newstate == PLAYER_STATE_DRIVER && oldstate == PLAYER_STATE_ONFOOT)
    {
        if (GetPlayerVehicleID(playerid) == gTaxi)
        {
            AddVehicleComponent(gTaxi, 1010); // Nitro
            SendClientMessage(playerid, 0xFFFFFFAA, "Nitro added to the Taxi.");
        }
    }
    return 1;
}
```

## Notes

:::warning

Using an invalid component ID crashes the player's game. (Fixed in open.mp)

:::

## Related Functions

- [RemoveVehicleComponent](RemoveVehicleComponent): Remove a component from a vehicle.
- [GetVehicleComponentInSlot](GetVehicleComponentInSlot): Check what components a vehicle has.
- [GetVehicleComponentType](GetVehicleComponentType): Check the type of component via the ID.
- [VehicleCanHaveComponent](VehicleCanHaveComponent): Is the component legal on the vehicle?

## Related Callbacks

- [OnVehicleMod](../callbacks/OnVehicleMod): Called when a vehicle is modded.
- [OnEnterExitModShop](../callbacks/OnEnterExitModShop): Called when a vehicle enters or exits a mod shop.

## Related Resources

- [Car Component IDs](../resources/carcomponentid)
