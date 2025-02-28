---
slug: scripting-api
title: open.mp API design
authors: y_less
---

A key focus of open.mp is maintaining **backward compatibility**—your existing SA:MP scripts will continue to work as-is. However, open.mp also introduces improvements to fix inconsistencies and make scripting more intuitive and powerful.  

Here's a look at some common SA:MP issues we're addressing and how open.mp enhances the experience.

<!-- truncate -->

:::warning

The content of the following post is out of date and has no reference to the current state of open.mp. The post is published here for archival purposes.

:::

## Introduction

Firstly, a VERY important clarification - existing scripts will still work as-is. We have worked very hard on backwards compatibility and bear it in mind for every decision. There are many improvements we'd like to make that we simply can't for this reason, and other code that is greatly complicated by this compatibility requirement.

That said, there are improvements that can be made all over the place. Let's look at some examples of the inconsistencies in SA:MP scripting:

### Tags

- `Menu:CreateMenu` - Tagged.
- `DB:db_open` - Tagged.
- `CreateVehicle` - Untagged.
- `CreateActor` - Untagged.

```c
#define SELECT_OBJECT_GLOBAL_OBJECT 1
#define SELECT_OBJECT_PLAYER_OBJECT 2

forward OnPlayerSelectObject(playerid, type, objectid, modelid, Float:fX, Float:fY, Float:fZ);
```

`type` is untagged, as are ALL SA:MP defined constants; unlike pawn default constants:

```c
native File:fopen(const name[], filemode:mode = io_readwrite);
```

### Naming

- `SetVehiclePos` - "Vehicle" in the middle of the function name.
- `TextDrawTextSize` - "TextDraw" at the start.
- `db_open` - "db" at the start and lower-case.
- `fread` - "file" at the start, and shortened.
- `asin` - A SA:MP added function without camel/pascal case.

Consistency:

- GetVehicleZAngle - "Z-Angle"
- GetVehicleRotationQuat - "Rotation"
- SetPlayerFacingAngle - "Facing Angle"
- SetObjectRot - "Rot"

And despite all this, most libraries have now settled on the `Module_Method` naming convention.

### Constants

- `65535`

Value for invalid players, actors, TDs and a few other things. It is also the value for invalid vehicles, but `0` is ALSO an invalid vehicle ID sometimes returned.

- `0`

Value for invalid files, sometimes vehicles (as well as `65535`). Also the value for missing many things such as action states and weapons.

- `255`

Value for invalid teams and menus.

- `-1`

Value for invalid gang zones and weapon states.

Additionally many libraries use `0x80000000` and `-1` for invalid states because they are far less likely to eventually be a valid ID. 65535 is quite a large number, but a big server can easily have more objects than that.

### Per-Player Functions

- `CreateObject` and `CreatePlayerObject`

Has global and per-player versions.

- `SetPlayerMapIcon`

Has no global version.

- `SetGravity`

No per-player version, despite being possibly one of the most requested per-player functions, and added almost instantly by YSF and other plugins.

- `CreateVehicle`

No per-player version, despite also being repeatedly requested. But also not added by any (public) plugin, not even the streamer plugin.

- `SendClientMessage` and `SendClientMessageToAll`

Has global and per-player versions, but the per-player version is the default unlike most other functions.

- `GangZoneShowForPlayer` and `GangZoneShowForAll`

Menus, Gang Zones, and Text Draws are the only default SA:MP functions where you can specify exactly which players can see them. All others are either everyone or just one person. Of course, libraries and plugins have since vasly expanded on this model and most good ones now allow very fine-grained control over which subsets of players (groups) can use any given entity.

### IDs

- `CreateObject` and `CreatePlayerObject`

The IDs pool for these functions are shared. If a global object has ID `4` no player object can ever have ID `4`, but multiple players could have different objects all with ID `5`.

- `Create3DTextLabel` and `CreatePlayer3DTextLabel`

The ID pool is split - the first `1024` IDs are globals, the second `1024` are per-player. Each player can have up to `2048` 3D texts, but only `1024` of each type despite the fact that it makes no difference client-side.

- `SetPlayerMapIcon`

IDs are manually specified, up to a limit of 32. For a while this limit was not checked client- side, leading to a potential ACE exploit.

- `ShowPlayerDialog`

IDs are manually specified, with no limit at all. The IDs are also totally pointless since a player can only ever see one dialog at once.

- `SetTimer`

IDs wrap around, with no checking that an existing timer has the same ID. You would have to start over 4,000,000,000 timers at some point to encounter this issue, but it could happen - they don't even have to all remain running.

And of course some people rely on IDs being allocated in very specific orders, then wonder why their whole mode breaks when they for example add or remove a single vehicle.

## Compatibility

So, again, we must make it very clear that all existing *"SA:MP code"* will work. What does that mean exactly? Any code that is:

- Written in pawn.
- Uses the original SA:MP API without plugins.
- Is recompiled with our includes.
- Already uses the community compiler.

Will work.

However:

- If you use a plugin to write in a language other than pawn, that plugin will probably need to be ported first. So your code won't work immediately.
- If you use other plugins such as the streamer, YSF, audio, etc; they may already work, may need porting, or may be entirely superfluous because their functionality has been integrated in to the core server. So your code may work.
- If you only have the .AMX of your mode not the original source, why? Anyway, while all SA:MP functions exist, some have been redone or replaced by pawn code or macros and you MUST recompile. So if you can't, your code won't work at all.

## Building

### Example

Let's look at an insanely simple SA:MP mode to begin with.

```c
#include <a_samp>

main() {}

public OnGameModeInit()
{
    SetGameModeText("Example Script");
    AddPlayerClass(0, 0.0, 0.0, 4.0, 0.0, 0, 0, 0, 0, 0, 0);
    return 1;
}

public OnPlayerSpawn(playerid)
{
    SetPlayerCheckpoint(playerid, 20.0, 20.0, 4.0, 2.0);
    return 1;
}

public OnPlayerEnterCheckpoint(playerid)
{
    SendClientMessage(playerid, 0xFF0000AA, "You won!");
    return 1;
}
```

You spawn. You go to the checkpoint. You win.

### Conversion

To build this for open.mp, we need to change just the first include and add one define.

This:

```c
#include <a_samp>

main() {}
```

Becomes:

```c
#define OPENMP_COMPAT
#include <openmp\openmp>

main() {}
```

The first error you might get is:

`open.mp scripts require the community compiler from: git.io/pawn-compiler`

If you get this, go to https://git.io/pawn-compiler and download compiler version 3.10.10 or later. For the release we would like a pawno-equivalent tool with this compiler integrated already, but haven't done that yet. I STRONGLY suggest trying to compile your mode with this compiler first as it re-enabled const correctness warnings so you're likely to have a load of new warnings straight away (this is NOT a problem with the compiler, these are problems in your code that always existed, but were previously ignored). You will also probably want to replace your includes with these ones:

https://github.com/pawn-lang/pawn-stdlib  
https://github.com/pawn-lang/samp-stdlib

That's a good thing to do even if you don't use open.mp, as they fix a load of tag and const issues in the original includes.

### Warnings

If you don't get any warnings using the new compiler with the new version of `a_samp`, you will now see a load of new warnings along the lines of:

`warning 234: function is deprecated (symbol "AddPlayerClass") Use "Class_Add" instead.`

You have three options - and they're all supported:

- **Ignore the warnings:** The code will still work.
- **Suppress the warnings:** Change `OPENMP_COMPAT` to `OPENMP_QUIET`:

```c
#define OPENMP_QUIET
#include <openmp\openmp>

main() {}
```

- **Fix the warnings:** Some functions have changed names for consistency with each other; some functions have changed parameters because the old ones evolved and didn't fully expose the capabilities of open.mp. There's no simple way to convert every function yet, but you can leave the warnings on while slowly converting code - the old functions will continue to work perfectly well.

There are three stages to conversion:

### `#define OPENMP_QUIET`

Using this define allows your mode to compile with no new warnings from deprecated functions. But you shouldn't stick to this define, and the implicit conversions will only work for pawn code. You can convert code in this mode, as the new API will also work, but you can't use the compiler to see where problems remain.

### `#define OPENMP_COMPAT`

This is the second stage. Once you want to start taking advantage of all the improved features of open.mp like fine-grained per-player entity controls and removed limits you need to start using the new versions of the functions. The new functions are always available, but you might not know everywhere that needs converting. This will give warnings for the old functions, but they will still work, allowing you to convert parts of your mode one at a time.

### No define

Once you think you've finished converting your code, you remove the defines:

```c
#include <openmp\openmp>

main() {}
```

Now you get errors instead of warnings for any old code still in use.

## New API

So now we've seen what the problems were with the old API, and how to find where you need to apply the new API, we should actually look at said new API in terms of the previously identified issues:

### Tags

Functions now use tags almost everywhere. We have tried to find a balance between too many tag warnings and not enough useful information, but warnings are there for a reason and can help find problems you may have missed. For example passing a vehicle as a parameter to an object function, or giving someone a weapon that doesn't exist:

```c
// No warnings for this code, despite it being clearly wrong.
new object = CreateObject(various, parameters, here);
PutPlayerInVehicle(playerid, object);

// Same here - there's no weapon 20, despite it being amongst valid weapon IDs.
GivePlayerWeapon(playerid, 20, 200);
```

It would be much better if all pieces of clearly wrong code could give warnings. This is the power of a type-safe language, and while pawn isn't fully type-safe, we can get close with tags. Those examples become:

```c
// warning 213: tag mismatch: expected tag "Vehicle", but found "Object"
new Object:object = Object@Create(various, parameters, here);
Player_PutInVehicle(playerid, object);

// warning 213: tag mismatch: expected tag "WeaponType", but found but found none ("_")
GivePlayerWeapon(playerid, 20, 200);

// This doesn't give a warning:
GivePlayerWeapon(playerid, WEAPON_COLT45, 200);
```

### Naming

Most new functions use a refinement of the naming scheme already adopted by many libraries and plugins - `Module_VerbNoun`. Some don't, when they are a one-off that doesn't fit in to any larger module, but for the most part you can possibly guess the name of a function you need. No more wondering if it was "Rot" or "Rotation" for this type of element, there's no abbreviations unless the function name is otherwise too long (32+ characters, the compiler won't accept them). Want to change the model of an object? `Object_SetModel`. Want to show text to a player? `Text_Show`.

There are a limited set of verbs - `Get`, `Set`, `Create`, `Destroy`, `Add`, `Remove`, `Show`, `Hide`, `Run`, `Move`, `Stop`, and `Count`. More may be added and may show up in special situations, but generally if one of these fits, it's probably that one. By far the most common are `Get` and `Set`, which unlike in SA:MP now always come in pairs - if you can set any parameter you can get it as well later. They are also the verbs that most commonly come with a noun - you need to specify what to get or set - `Health`, `Position`, `Model`, `Width`, etc.

Some examples:

```c
native bool:Menu_SetDisabled(Menu:menuid, bool:disabled);
native bool:Menu_GetDisabled(Menu:menuid);

native bool:Text_SetAlignment(Text:text, alignment);
native Text_GetAlignment(Text:text);

native bool:Object_Move(Object:objectid, Float:posX, Float:posY, Float:posZ, Float:speed, Float:rotX = FLOAT_NAN, Float:rotY = FLOAT_NAN, Float:rotZ = FLOAT_NAN);

native DBResult_CountRows(DBResult:dbresult);

native Player_Spawn(Player:playerid);
```

Note that the module and tag names always match - `Vehicle`, `DB`, `Player` etc. [There are reasons besides consistency for this](https://github.com/pawn-lang/compiler/issues/234) - it gives a more OO -like interface, and is easier to remember. However, you might have noticed in an earlier example the function `Object@Create`, not `Object_Create`. The reason for this is what is in the first parameter.

In all seven of the examples immediately above the first parameter is the entity (object, vehicle, player, etc) being operated on. You want to get the position of a specific entity. You want to move a specific entity. You want to get the remaining time of a specific entity. This again maps to the OO-like API - `Player_Spawn(playerid)` can be thought of as `player.Spawn()`. PAWN can't do that, but that doesn't mean other languages plugging in to this API can't. In C++ terms - `_` is `.` or `->` and always needs a valid ID given as the first parameter. However, the function `Dialog_IsValid(Dialog:id)` by definition may not have a valid ID as the first parameter (or what's the point of it[^1]?), and `Icon_Create(image, Float:x, Float:y, Float:z)` doesn't even take an ID at all. These thus become `@` instead - `::` in C++ syntax. They might not take an ID at all, and absolutely don't need a valid one (@Destroy` also comes under this group of functions, as destroying an entity is an operation logically external to an entity, not an operation on the entity).

### Constants

To start with, instead of `#define` for everything we use `const` and `enum` as much as possible, except where we expect things to be overridden (`MAX_PLAYERS`):

```c
enum ObjectMaterialTextAlignment
{
    MATERIAL_TEXT_ALIGN_LEFT,
    MATERIAL_TEXT_ALIGN_CENTRE,
    MATERIAL_TEXT_ALIGN_RIGHT,
};
```

`Object_SetMaterialText` will now only accept one of those three values, and nothing else.

What about invalid IDs? We have made those consistent as well. All entities now use the same invalid value, well outside the range of possibly valid values - open.mp has removed almost all limits, so making a value like `65536` invalid just won't work. What is this new invalid value? We haven't decided... There are two main contenders both with pros and cons, and the decision isn't as easy as it might at first appear. But fortunately it doesn't make a big difference to the internal work as we can switch almost instantly.

The two choices are explained below, and we'd appreciate some feedback on this if possible:

#### `0`

Using `0` as an invalid value has a few advantages:

- it isn't an invalid index, so when returned and not correctly checked your code won't crash. It might not work perfectly, but it will keep doing something at least.
- It is very easy to check, and intent becomes obvious with it:

```c
new Object:object = Object@Create(various, parameters, here);
if (object)
{
    Object_SetMaterialText(object, "Hello");
}
else
{
    printf("Couldn't create the object.");
}
```

- A newly declared variable is by default an invalid value:

```c
new Dialog:d;
```

One of the most common bugs people get is their code only working for player 0, because they forgot to intialise a variable. If there's no player/object/vehicle 0, the code won't apply to anyone - it is better to have no player promoted to admin than the wrong player.

#### `-1`

Using `-1` as an invalid value has a few advantages:

- It IS an invalid index. Not being one was listed as an advantage for `0` because your code will often keep going instead of crashing, but with crashdetect that can be a good thing - there's a bug in your code and the crash will tell you exactly where it is, sometimes to the exact source code line. Which is better, silently continuing, or ending loudly?
- People are used to `0` as a valid value most of the time. Programmers start counting at `0`, so it should be valid and something outside the realm of positive integers should be invalid.
- In unsigned maths it is the largest possible integer - `0xFFFFFFFF`, `4294967295`. This means the internal hard limit for any entity type is the highest it can possibly be - `4,294,967,295` items before running out of IDs (and memory).

### Per-Player Functions

In short, these are no more. Every `ForPlayer`, `ForAll`, `CreatePlayerX` etc. function has been replaced by one simple function - `X_Display` (where `X` is any entity), and `X_Has` for checking:

```c
Object_Display(objectid, playerid, true); // Show it.
Object_Display(objectid, playerid, false); // Hide it.

Text_Display(textid, true); // Show it to everyone.

if (Zone_Has(zoneid, playerid))
{
    // The player is ALLOWED to see the gang zone.
}
```

YSI used `X_SetPlayer`, but showing things to players is the most fundamental thing to do, so it deserves its own verb. Some libraries use `X_Show` and `X_Hide`, but that's two functions which just leads to excess code when checking which to do:

```c
if (var) Checkpoint_Show(cpid, playerid);
else Checkpoint_Hide(cpid, playerid);
```

vs

```c
Checkpoint_Display(cpid, playerid, var);
```

Note that just calling `X_Display` might not actually show the item. An object on the far side of the world still won't be visible. A checkpoint in a different virtual world won't be visible even if it is right next to you. For world entities this just says that the player is allowed to see it, not that they are currently able to. Conversely, for HUD elements such as menus and dialogs this does show them instantly, and may hide others when only one is allowed.

### IDs

With the removal of per-player pools, and unification of invalid IDs, this is no longer an issue.

## Smarter functions.

The `X_Display` functions shown above can take two parameters - entity and display state, to enable every player to see them; or alternatively three parameters - entity, player, and display state. There are other functions that are smart about their parameters as well. One set of examples is the various rotation functions. As mentioned in the introduction, there are at least four different ways to get and set rotations on for different entities. Now there's one - `X_SetRotation` and `X_GetRotation`. For example:

```c
// Just get `z`.
z = Player_GetRotation(playerid);

// Get x, y, and z Euler angles.
Object_GetRotation(objectid, x, y, z);

// Get w, x, y, and z quaternion angles.
Vehicle_GetRotation(vehicleid, w, x, y, z);
```

Which is used for which entity? All of them:

```c
// Just get `z`.
z = Object_GetRotation(objectid);

// Get x, y, and z Euler angles.
Object_GetRotation(objectid, x, y, z);

// Get w, x, y, and z quaternion angles.
Object_GetRotation(objectid, w, x, y, z);
```

The parameter and return meanings are determined by the number of parameters given. Also for Set:

```c
// Just set `z`.
Vehicle_SetRotation(vehicleid, z);

// Set x, y, and z Euler angles.
Vehicle_SetRotation(vehicleid, x, y, z);

// Set w, x, y, and z quaternion angles.
Vehicle_SetRotation(vehicleid, w, x, y, z);
```

## Conclusion

We have tried very hard to make an API that's easy to use, easy to learn, but also backwards- compatibile. A lot of the success of SA:MP comes from it's ease of use, and we want to keep that, but are also aware that there are power users as well who want to get far more out of their code. Striking this balance is always hard, especially when the ones who comment the most are the most experienced - the ones who know the language inside and out and want to push it further. This creates a system that self-selects for advanced features at the expense of beginners. We don't want this, but we do still want to hear your thoughts. Which language and API features do you like, which do you not? What functions would help you get the most out of your code? Do you think the new design is simple, or too complicated? Are you fine with the haphazard names of the current functions? They serve their purpose, so why change them? Would you as a beginner have appreciated anything being done differently?

Please share any feedback you might have here in the burgershot topic below. We'd love to hear from you:

https://forum.open.mp/showthread.php?tid=1036

[^1]: Interesting side note. Thanks to the way we've abstracted the scripting API code, Dialog_IsValid is implemented as:

    ```c
    SCRIPT_API(Dialog_IsValid, bool(Dialog_s)) { return true; }
    ```

    That's literally it. No actual implementation needed because for the function to be called the entity lookup must have succeeded, and thus we can return true instantly.
