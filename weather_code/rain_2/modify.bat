@echo off
setlocal enabledelayedexpansion

rem 设置要处理的文件夹路径
set "folderPath=D:\CODE\AE_rain\test_data_output\folder1"

rem 进入指定文件夹
cd /d "%folderPath%" || (
    echo 文件夹不存在或无法访问。
    exit /b 1
)

rem 遍历文件夹中的所有文件
for %%f in (*) do (
    rem 获取文件名和后缀
    set "filename=%%~nf"
    set "extension=%%~xf"

    rem 将文件后缀改为 .png
    ren "%%f" "!filename!.png"
)

echo 文件后缀修改完成。
