import time
from datetime import timedelta

startTime = time.perf_counter()


# paste your python script here
# works correctly even if you have multiprocessing module


endTime = time.perf_counter()

timeTaken = endTime - startTime
print(f"Execution Time: {timedelta(seconds=round(timeTaken))}")