import os

def check_empty_files(folder_path):
    empty_files = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            if os.path.getsize(file_path) == 0:
                empty_files.append(filename)

    if not empty_files:
        print("没有空文件")
    else:
        print("以下文件为空:")
        for empty_file in empty_files:
            print(empty_file)

# 指定要检查的文件夹路径
folder_path = r'E:\audodrive_project\Faster-RCNN-TensorFlow-Python3-master\data\VOCDevkit2007\VOC2007\label_2'

# 执行检查
check_empty_files(folder_path)