import mmap
reset = '\033[0m'
yellow = '\033[33m'

def count_lines(filename):
    with open(filename, "r+b") as f:
        with mmap.mmap(f.fileno(), 0) as mm:
            return mm.read().count(b'\n')

filename = 'passwords.txt'
print(f"{yellow}Total lines: {count_lines(filename)}{reset}")