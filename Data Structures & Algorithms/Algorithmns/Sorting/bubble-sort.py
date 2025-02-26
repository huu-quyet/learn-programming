# Bubble Sort is an algorithm that sort an array from lowest value to the highest value.

# How it works:
# 1. Go though the array, one value at time. 
# 2. For each value, compare current value with the next value.
# 3. If the current value is greater than the next value, swap the values.
# 4. Repeat the process until the array is sorted.

# Implementation of Bubble Sort:
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        swapped = False
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if swapped:
            break        
                
    return arr
                
sorted_arr = bubble_sort([64, 34, 25, 12, 22, 11, 90])
print(sorted_arr) # [11, 12, 22, 25, 34, 64, 90]

# Time Complexity: O(n^2) because Bubble Sort has two nested loops.
# Space Complexity: O(1) because Bubble Sort is an memory location to store the array.

# Bubble Sort is not recommended for large arrays. It is not efficient.
# It is good for small arrays.
# It is a stable sorting algorithm.