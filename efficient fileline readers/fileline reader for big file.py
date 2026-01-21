import mmap
#mmap memory maps the file as if it were a part of the RAM

def count_lines(filename):
    with open(filename, "r+b") as f:
        with mmap.mmap(f.fileno(), 0) as mm:
            return mm.read().count(b'\n')

filename = 'passwords.txt'
print(f"Total lines: {count_lines(filename)}")