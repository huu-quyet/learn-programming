## Merge Sort is an algorithm based on the divide-and-conquer strategy that first divides the array into several sub-lists until each sub-list consist of a value, then merge the sub-lists back into the sorted array.

## How it works:
# 1. Divide the array into two sub-arrays.
# [64, 34, 25, 12, 22, 11, 90] -> [64, 34, 25] [12, 22, 11, 90]

# 2. Continue dividing the sub-arrays until each sub-array consist of a value.
# [64, 34, 25] -> [64] [34] [25] (left sub-array)
# [12, 22, 11, 90] -> [12] [22] [11] [90] (right sub-array)

# 3. Merge two sub-arrays together by always putting the lowest value first.
# [64] [34] [25] -> [34, 64] [25] -> [25, 34, 64] (left sub-array)
# [12] [22] [11] [90] -> [12, 22] [11, 90] -> [11, 12, 22, 90] (right sub-array)

# 4. Repeat the process until there are no sub-arrays left.
# [25, 34, 64] [11, 12, 22, 90] -> [11, 12, 22, 25, 34, 64, 90]

## Implementation of Merge Sort:
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]
    
        # Divide the array into the sub-arrays
        # Each time the array is divided into two sub-arrays, it takes O(log n) time
        merge_sort(left)
        merge_sort(right)
        
        # Merge the sub-arrays
        # while loop takes O(n) time to merge the sub-arrays
        left_index = right_index = arr_index = 0
        while left_index < len(left) and right_index < len(right):
            if left[left_index] < right[right_index]:
                arr[arr_index] = left[left_index]
                left_index += 1
            else:
                arr[arr_index] = right[right_index]
                right_index += 1
            arr_index += 1
    
    return arr    

sorted_arr = merge_sort([64, 34, 25, 12, 22, 11, 90])
print(sorted_arr) # [11, 12, 22, 25, 34, 64, 90]

## Time Complexity: 
# Each merge operation takes O(n) time, where n is the number of elements in the sub-array
# Each time the array is divided into two sub-arrays, it takes O(log n) time
# -> Time complexity of Merge Sort is O(n log n)

## Space Complexity:
# Merge Sort uses additional space to store the sub-arrays
# The space complexity of Merge Sort is O(n) because each sub-array is stored in a separate memory location and merged back into the original array

## Applications:
# Merge Sort is a stable sorting algorithm that is used in external sorting.
# It is efficient for large arrays.
