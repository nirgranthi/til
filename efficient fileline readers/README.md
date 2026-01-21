# fileline reader for big file.py
Use this when the file is big and cannot be loaded on the memory.
```
The Python mmap module provides a way to memory-map files, 
which allows you to access and modify file content as if 
it were a large bytearray or string in memory.
```
It is faster than the built in file.read() for big files.

# fileline reader for small file.py
Use this when the file is small enough to be loaded on the memory.

# Note
Opening and reading fileline with 'rb' instead of 'r' is significantly faster. 

On testing, I found "fileline reader for small file.py" is almost *10 times*  faster than a simple code like ```sum(1 for i in open(filename, "rb"))```