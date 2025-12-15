import time
import hashlib
import multiprocessing

def hash_benchmark(n):
    # CPU load
    for i in range(n):
        hashlib.sha256(str(i).encode()).hexdigest()

def main():
    num_hashes = 2000000 # 2 Million hashes
    
    print(f"Running Benchmark on CPU ({multiprocessing.cpu_count()} Cores)...")
    
    # Single Core Test
    start = time.time()
    hash_benchmark(num_hashes)
    end = time.time()
    print(f"Single Core Time: {end - start:.2f} seconds")

    # Multi Core Test
    start = time.time()
    with multiprocessing.Pool() as pool:
        # distribute load on different process
        pool.map(hash_benchmark, [num_hashes//8]*8) 
    end = time.time()
    print(f"Multi Core Time: {end - start:.2f} seconds")


if __name__ == '__main__':
    main()