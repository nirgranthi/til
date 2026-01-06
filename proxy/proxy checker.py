import requests
import concurrent.futures
import threading
import urllib3
import itertools

# 400000+ proxies for each
#http_proxies_raw = 'https://raw.githubusercontent.com/wiki/gfpcom/free-proxy-list/lists/http.txt'
#https_proxies_raw = 'https://raw.githubusercontent.com/wiki/gfpcom/free-proxy-list/lists/https.txt'

http_proxies_raw = 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/http.txt'  #40000+ proxies
https_proxies_raw = ''

GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
RESET = '\033[0m'

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

lock = threading.Lock()
counter = itertools.count(1)

def loadProxies(url, proxyType):
    proxies = []
    try:
        print(f"{YELLOW}Fetching {proxyType} proxies...{RESET}")
        response = requests.get(url)
        proxies.extend([line.strip() for line in response.text.splitlines() if line.strip()])
    except Exception as e:
        print(f"{YELLOW}[!] Failed to load {proxyType} proxies: {e}{RESET}")
    return list(set(proxies))

#print(f"{GREEN}Total proxies fetched: {len(http_proxies)+len(http)}{RESET}")

def check_proxy(proxy, protocol, fileHandle):
    count = next(counter)
    targetUrl = 'https://httpbin.org/ip' if protocol=='https' else 'http://httpbin.org/ip'
    try:
        #verify argument checks for SSL certificates
        response = requests.get(
            targetUrl, 
            proxies={'http': proxy, 'https': proxy}, 
            timeout=5, 
            verify=False
        )
        if response.status_code == 200:
            with lock:
                print(f"{GREEN}{count}:- Working {protocol}: {proxy}{RESET}")
                fileHandle.write(f'{proxy}\n')
                fileHandle.flush()
        else:
            pass
            #print(f"{RED}[!]{count}:- Failed to check proxy {proxy} (status: {response.status_code}){RESET}")
    except requests.RequestException as e:
        pass
        #print(f"{RED}[!]{count}:- Failed to check proxy {proxy}{RESET}")
        #print(f"{RED}[!]{count}:- Failed to check proxy {proxy}: {e}{RESET}")

def main():
    http_proxies = loadProxies(http_proxies_raw, 'HTTP')
    https_proxies = loadProxies(http_proxies_raw, 'HTTPS')

    with open('working_http_proxies.txt', 'w') as httpFile, \
        open('working_https_proxies.txt', 'w') as httpsFile, \
        concurrent.futures.ThreadPoolExecutor(max_workers=200) as executor:

        futures = []
        for proxy in http_proxies:
            futures.append(executor.submit(check_proxy, proxy, 'http', httpFile))
        
        for proxy in https_proxies:
            futures.append(executor.submit(check_proxy, proxy, 'https', httpsFile))

        concurrent.futures.wait(futures)

#print(f"{GREEN}Total working proxies: {len(working_http_proxies)+len(working_https_proxies)}{RESET}")
if __name__ == '__main__':
    main()
