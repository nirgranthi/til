reset = '\033[0m'
yellow = '\033[33m'

def count_lines(filename):
    with open(filename, "rb") as f:
        megaBytes = 1024*1024 # (this is 1MB)if needed to increase MBs, just multiply "*number"

        #this has error rate of 1 line because it counts new lines
        return sum(chunk.count(b'\n') for chunk in iter(lambda: f.read(megaBytes), b'')) 
        

filename = 'passwords.txt'
print(f"{yellow}Total lines: {count_lines(filename)}{reset}")