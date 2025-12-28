def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def generate_primes(limit):
    primes = []
    for num in range(2, limit + 1):
        if is_prime(num):
            primes.append(num)
            print(num) # Prints all the prime numbers
    return len(primes)

limit = int(input("Enter the upper limit to generate prime numbers: "))
prime_numbers = generate_primes(limit)

print(f"Prime numbers up to {limit}: {prime_numbers}")
#print(prime_numbers)
