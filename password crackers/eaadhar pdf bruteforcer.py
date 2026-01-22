import pikepdf
import itertools
import string
import time
from multiprocessing import Pool, cpu_count
from tqdm import tqdm

pdf_file = "eaadhar.pdf"
from_year = 1970
to_year = 2020

years = [str(y) for y in range(from_year, to_year + 1)]
CAPS = string.ascii_uppercase

def checkFileExist(file):
    try:
        with pikepdf.open(file):
            pass
    except FileNotFoundError:
        print(f"File: {file} does not exists")
        exit()
    except pikepdf.PasswordError:
        pass
    except Exception as e:
        print(f"Error: {e}")

def try_passwords(two_letters):
    first, second = two_letters

    for third, fourth in itertools.product(CAPS, repeat=2):
        suffix = second + third + fourth

        for year in years:
            password = first + suffix + year
            try:
                with pikepdf.open(pdf_file, password=password):
                    return password
            except pikepdf.PasswordError:
                pass

    return None

def main():
    workers = max(1, cpu_count() - 1)
    #print(f"Using {workers} worker processes")

    start = time.time()

    with Pool(workers) as pool:
        for first_letter in CAPS:
            print(f"\nTesting passwords starting with '{first_letter}'")

            tasks = [(first_letter, second) for second in CAPS]

            for result in tqdm(
                pool.imap_unordered(try_passwords, tasks, chunksize=2),
                total=len(tasks),
                desc=f"{first_letter}****",
            ):
                if result:
                    pool.close()
                    pool.join()
                    print(f"\nPASSWORD FOUND: {result}")
                    print(f"Time taken: {time.time() - start:.2f}s")
                    return

    print("Password not found")

if __name__ == '__main__':
    checkFileExist(pdf_file)
    main()
