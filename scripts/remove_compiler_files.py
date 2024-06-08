import os 

# Checked only on macos, idk if it works on windows
current_directory = os.getcwd()
work_directory = current_directory[:len(current_directory) - len("scripts")] + "tests"

print(f"Starting '.js' files removing script in dir: {work_directory}")

def remove_files(in_directory: str) -> None:
    items = os.listdir(in_directory)

    for item in items:
        if not item.count('.'):
            remove_files(in_directory + "/" + str(item))
        if item.endswith('.js') or item.endswith('.map') or item.endswith('.d.ts'):
            print(f"Now removing: {str(item)}")
            os.remove(in_directory + "/" + str(item))

remove_files(work_directory)