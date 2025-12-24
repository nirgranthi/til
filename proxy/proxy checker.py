import requests
import concurrent.futures
import threading
import urllib3

http_proxies = 'https://raw.githubusercontent.com/wiki/gfpcom/free-proxy-list/lists/http.txt'
https_proxies = 'https://raw.githubusercontent.com/wiki/gfpcom/free-proxy-list/lists/https.txt'

GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
RESET = '\033[0m'

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def load_proxies():
    proxies = []
    try:
        print(f"{YELLOW}Fetching proxies...{RESET}")
        response = requests.get(http_proxies)
        proxies.extend([line.strip() for line in response.text.splitlines() if line.strip()])
    except Exception as e:
        print(f"{YELLOW}[!] Failed to load HTTP proxies: {e}{RESET}")
    try:
        response = requests.get(https_proxies)
        proxies.extend([line.strip() for line in response.text.splitlines() if line.strip()])
    except Exception as e:
        print(f"{YELLOW}[!] Failed to load HTTPS proxies: {e}{RESET}")
    #print(f"{GREEN}Proxies loaded successfully.{RESET}")
    print(f"{GREEN}Total proxies fetched: {len(proxies)}{RESET}")
    return list(set(proxies))

def check_proxy(proxy, counter, working_proxies, lock):
    with lock:
        count = next(counter)
    try:
        #verify argument checks for SSL certificates
        response = requests.get('http://httpbin.org/ip', proxies={'http': proxy, 'https': proxy}, timeout=5, verify=False)
        if response.status_code == 200:
            print(f"{GREEN}{count}:- Working proxy: {proxy}{RESET}")
            with lock:
                working_proxies.append(proxy)
        else:
            pass
            #print(f"{RED}[!]{count}:- Failed to check proxy {proxy} (status: {response.status_code}){RESET}")
    except requests.RequestException as e:
        pass
        #print(f"{RED}[!]{count}:- Failed to check proxy {proxy}{RESET}")
        #print(f"{RED}[!]{count}:- Failed to check proxy {proxy}: {e}{RESET}")

proxies = load_proxies()
working_proxies = []
counter = iter(range(1, len(proxies) + 1))
lock = threading.Lock()

with concurrent.futures.ThreadPoolExecutor(max_workers=200) as executor:
    futures = [executor.submit(check_proxy, proxy, counter, working_proxies, lock) for proxy in proxies]
    concurrent.futures.wait(futures)

with open('working_proxies.txt', 'w') as f:
    for proxy in working_proxies:
        f.write(f'{proxy}\n')

print(f"{GREEN}Total working proxies: {len(working_proxies)}{RESET}")

