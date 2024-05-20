@echo off
setlocal enabledelayedexpansion

rem 设置初始值
set start_num=5000
set end_num=6999
set folder_count=4
set /a range=end_num-start_num+1
set /a images_per_folder=range/folder_count

rem 指定图片目录和目标文件夹
set image_dir=D:\CODE\sensing-system\data_object_image_2\training\image_2
set dest_dir=D:\CODE\sensing-system\data_object_image_2\training

rem 创建目标文件夹
cd /d %dest_dir%
for /l %%i in (1,1,%folder_count%) do (
    md folder%%i
)

rem 复制图片到目标文件夹
set /a count=0
for /l %%i in (%start_num%,1,%end_num%) do (
    set /a mod_value=count%%folder_count
    set /a folder_index=mod_value+1
    set /a count+=1

    rem 获取文件名
    set "filename=00%%i.png"
    set "filename=!filename:~-10!"

    rem 复制图片到目标文件夹
    copy /y "%image_dir%\!filename!" "%dest_dir%\folder!folder_index!"
)

echo 操作完成！
pause
