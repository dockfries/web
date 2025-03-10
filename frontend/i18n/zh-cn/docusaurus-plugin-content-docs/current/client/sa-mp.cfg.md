---
title: sa-mp.cfg
sidebar_label: sa-mp.cfg
description: SA-MP客户端配置文件
---

## 配置文件说明

`sa-mp.cfg` 是用于配置 SA-MP 客户端设置的配置文件。该文件位于 Windows 用户账户下的`我的文档\GTA San Andreas User Files\SAMP`文件夹中，可使用记事本等文本编辑器进行编辑。

## 配置选项

| 选项                | 说明                                                                                                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **pagesize**        | 设置聊天窗口显示的行数（10-20 行），默认显示 10 行。可通过游戏内命令 `/pagesize` 实时调整。                                                                                                        |
| **fpslimit**        | 设置帧率上限（需在 GTA:SA 菜单中启用帧率限制器）。有效值 20-90，默认 50。对应游戏内命令 `/fpslimit`。[帧率说明](http://en.wikipedia.org/wiki/Frame_rate "http://en.wikipedia.org/wiki/Frame_rate") |
| **disableheadmove** | 控制玩家头部是否随视角转动（1=禁用 0=启用）。可通过 `/headmove` 命令切换。                                                                                                                         |
| **timestamp**       | 在聊天消息旁显示本地时间戳（1=启用 0=禁用）。使用 `/timestamp` 命令切换。                                                                                                                          |
| **ime**             | 控制聊天窗口是否支持输入法文本编辑和语言切换（1=启用 0=禁用）。                                                                                                                                    |
| **multicore**       | 多核 CPU 支持开关（默认 1=启用）。若出现鼠标问题可设为 0。                                                                                                                                         |
| **directmode**      | 为存在聊天文本显示问题的玩家启用直接屏幕渲染模式（0=禁用 1=启用）。                                                                                                                                |
| **audiomsgoff**     | 禁用音频流 URL 加载提示（1=不显示提示）。对应 `/audiomsg` 命令。                                                                                                                                   |
| **audioproxyoff**   | 禁用 Windows 代理服务器进行音频流传输（1=绕过代理）。                                                                                                                                              |
| **nonametagstatus** | 暂停玩家昵称标签旁显示沙漏图标（默认 0=启用）。使用 `/nametagstatus` 命令调整。                                                                                                                    |
| **fontface**        | 自定义 UI 字体（示例：`fontface="Comic Sans MS"`）。非官方支持功能，可能导致异常。                                                                                                                 |
| **fontweight**      | 字体粗细设置（0=粗体[默认] 1=正常）。                                                                                                                                                              |
