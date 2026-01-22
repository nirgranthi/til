from pathlib import Path
import pikepdf
import multiprocessing
from tqdm import tqdm

pdf_file = 'pdf.pdf'
pwd_file = 'passwords.txt'
chunk_size = 1000

def checkFileExists(pdf, pwd):
    if not Path(pdf).exists():
        print(f"File Not Found: {pdf}")
        exit()
    if not Path(pwd).exists():
        print(f"File Not Found: {pwd}")
        exit()

def checkPasswords(passwords):
    for password in passwords:
        password = password.strip()
        if not password: continue
        try:
            with pikepdf.open(pdf_file, password=password.strip()):
                return password
        except pikepdf.PasswordError:
            pass
        except Exception as e:
            print(f"Error: {e}")
            print(f"For Password: {password}")
    return None

def count_lines():
    #from https://github.com/nirgranthi/til/blob/main/efficient%20fileline%20readers/fileline%20reader%20for%20small%20file.py
    with open(pwd_file, "rb") as f:
        megaBytes = 1024*1024
        return sum(chunk.count(b'\n') for chunk in iter(lambda: f.read(megaBytes), b''))

def get_chunk_wordlist_generator(filename, chunk_size):
    chunk = []
    with open(filename, "r") as f:
        for line in f:
            chunk.append(line)
            if len(chunk) >= chunk_size:
                yield chunk
                chunk = []
    if chunk:
        yield chunk

def main():
    checkFileExists(pdf_file, pwd_file)

    print("Counting passwords...")
    total_passwords = count_lines()
    print(f"--Total passwords: {total_passwords}")

    try:
        total_chunks = (total_passwords // chunk_size) + 1
    except:
        total_chunks = None
    
    print(f"Starting attack with {multiprocessing.cpu_count()} cores...")
    
    pool = multiprocessing.Pool()
    wordlist_chunk = get_chunk_wordlist_generator(pwd_file, chunk_size)

    for result in tqdm(pool.imap_unordered(checkPasswords, wordlist_chunk), total=total_chunks, unit='chunk'):
        if result:
            pool.terminate()
            pool.join()
            print(f"\n\n[+] PASSWORD FOUND: {result.strip()}")
            exit()
    print("\n[!] Password not found.")


if __name__ == '__main__':
    main()
