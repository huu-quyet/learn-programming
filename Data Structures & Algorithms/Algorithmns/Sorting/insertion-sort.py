# Insertion Sort Algorithm use one part of the array to hole the sorted values, and the other part of the array to hold values that are not sorted yet.
# The Algorithm takes one value at a time from the unstored part of the array and puts it into the right place in the sorted part of the array, until the array is sorted.

## How it works:
# 1. Take the first value of the unstored part of the array.
# 2. Move the value to the correct place in the sorted part of the array.
# 3. Go though the unstored part of the array again as many time as there are values.

## Implementation Insertion Sort Algorithm:

def insertion_sort(arr):
    for i in range(1, len(arr)):
        current_value = arr[i]
        insert_index = i
        
        for j in range(i-1, -1, -1):
            if arr[j] > current_value:
                arr[j+1] = arr[j]
                insert_index = j
            else:
                break
        arr[insert_index] = current_value
    return arr

# Test the Algorithm:
arr = [5, 3, 8, 6, 2]
print(insertion_sort(arr)) # [2, 3, 5, 6, 8]

## Time Complexity:
# Best Case: O(n) - when the array is already sorted.
# Average Case: O(n^2) - when the array is not sorted.
# Worst Case: O(n^2) - when the array is sorted in reverse order.

## Space Complexity:
# O(1) - the Algorithm sorts the array in place, so it does not require any extra space.

## When to use Insertion Sort Algorithm:
# When the array is almost sorted.
# When the array is small.
