import pyzipper
import multiprocessing
from tqdm import tqdm

zip_file = "new.zip"
filename = "passwords.txt"
chunk_size = 1000

def checkPasswords(chunk):
    with pyzipper.AESZipFile(zip_file) as zf:
        first_file = zf.namelist()[0]
        for pwd in chunk:
            password = pwd.strip()
            if not password: continue
            
            try:
                zf.setpassword(password)
                zf.read(first_file)
                return password
            except (RuntimeError, pyzipper.BadZipFile, pyzipper.LargeZipFile):
                continue
            except Exception as e:
                pass
                #print(f"Error: {e}")
                #print(f"For Password: {password}")
    return None

def get_chunk_wordlist_generator(filename, chunk_size):
    chunk = []
    with open(filename, "rb") as f:
        for line in f:
            chunk.append(line)
            if len(chunk) >= chunk_size:
                yield chunk
                chunk = []
    if chunk:
        yield chunk

def count_lines():
    #from https://github.com/nirgranthi/til/blob/main/efficient%20fileline%20readers/fileline%20reader%20for%20small%20file.py
    with open(filename, "rb") as f:
        megaBytes = 1024*1024
        return sum(chunk.count(b'\n') for chunk in iter(lambda: f.read(megaBytes), b''))

if __name__ == '__main__':
    print("Counting passwords...")
    total_passwords = count_lines()
    print(f"--Total passwords: {total_passwords}")

    try:
        total_chunks = (total_passwords // chunk_size) + 1
    except:
        total_chunks = None

    print(f"Starting attack with {multiprocessing.cpu_count()} cores...")
    
    pool = multiprocessing.Pool()
    wordlist_chunk = get_chunk_wordlist_generator(filename, chunk_size)
    
    for result in tqdm(pool.imap_unordered(checkPasswords, wordlist_chunk), total=total_chunks, unit="chunk"):
        if result:
            print(f"\n\n[+] PASSWORD FOUND: {result.decode().strip()}")
            pool.terminate()
            exit()
            
    print("\n[!] Password not found.")