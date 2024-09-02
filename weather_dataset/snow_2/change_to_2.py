import os

def remove_files_without_suffix(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            if "_2" not in filename:
                file_path = os.path.join(folder_path, filename)
                os.remove(file_path)
                print(f"Removed: {file_path}")

def main():
    folder_path = r"E:\audodrive_project\data\all_bad_weather\snow_2\severe"
    remove_files_without_suffix(folder_path)

if __name__ == "__main__":
    main()
