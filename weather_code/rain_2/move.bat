@echo off
setlocal enabledelayedexpansion

@REM set "source=D:\CODE\sensing-system\data_object_image_2\training\image_2"
@REM set "destination=D:\CODE\sensing-system\data_object_image_2\training\0000-4999"
set "source=D:\CODE\sensing-system\data_object_label_2\training\label_2"
set "destination=D:\CODE\sensing-system\data_object_label_2\training\0000-4999 label"

if not exist "%destination%" mkdir "%destination%"

echo Moving files from "%source%" to "%destination%"...

for /L %%i in (0,1,4999) do (
    set "index=00000%%i"
    set "index=!index:~-6!"
    set "filename=!index!.txt"
    echo Trying to move file: "!filename!"
    move "%source%\!filename!" "%destination%"
)

echo All files moved.
