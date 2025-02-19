# ARRAY DATA STRUCTURE CONCEPTS

# 1. Definition:
#     - A collection of similar data elements stored in contiguous memory locations
#     - Fixed size (in most traditional implementations)
#     - Elements accessed using index (0-based or 1-based depending on language)

# 2. Types of Arrays:
#     a) One-Dimensional Array (Linear Array)
#     ```
#     [1] [2] [3] [4] [5]
#     ```
    
#     b) Two-Dimensional Array (Matrix)
#     ```
#     [1] [2] [3]
#     [4] [5] [6]
#     [7] [8] [9]
#     ```
    
#     c) Multi-Dimensional Array
#     ```
#     [[[1,2], [3,4]], [[5,6], [7,8]]]
#     ```

# Static Array (Fixed Size):
#     - Size is fixed at compile time
#     - Memory allocated on stack or heap
#     - Size must be known at compile time
#     - Example: int arr[5];

# Dynamic Array (Resizable):
#     - Size can be changed at runtime
#     - Memory allocated on heap
#     - Example: ArrayList in Java, Vector in C++, list in Python, Array in JavaScript

# 3. Basic Operations & Time Complexity:
#     - Access: O(1) - constant time
#     - Insertion: O(n) - worst case
#     - Deletion: O(n) - worst case
#     - Search: O(n) - linear search
#     - Search (sorted array): O(log n) - binary search

# 4. Memory Requirements:
#     - For n elements: Size = n * size_of(data_type)
#     - Continuous memory allocation

# 5. Advantages:
#     - Random access: O(1)
#     - Simple and easy to use
#     - Cache-friendly due to memory locality

# 6. Disadvantages:
#     - Fixed size
#     - Insertion/deletion expensive
#     - Memory wastage (pre-allocation)
#     - Contiguous memory requirement

# 7. Common Array Operations:

#     a) Traversal
#     ```c
#     for (i = 0; i < n; i++) {
#          // Process array[i]
#     }
#     ```

#     b) Binary Search (sorted arrays)
#     ```c
#     low = 0;
#     high = n-1;
#     while (low <= high) {
#          mid = (low + high)/2;
#          if (array[mid] == target) return mid;
#          if (array[mid] < target) low = mid + 1;
#          else high = mid - 1;
#     }
#     ```

#     c) Array Rotation
#     ```c
#     // Left rotate by one position
#     temp = array[0];
#     for (i = 0; i < n-1; i++)
#          array[i] = array[i+1];
#     array[n-1] = temp;
#     ```

# 8. Special Types:
#     - Circular Array
#     - Dynamic Array (like ArrayList in Java, Vector in C++)
#     - Sparse Array

# 9. Common Applications:
#     - Implementing matrices
#     - Lookup tables
#     - Buffer pools
#     - Database records
#     - Image pixel data storage

# 10. Memory Representation:
#      Base_Address + (index * size_of(data_type))

# Example: Array Implementation in Python
class Array:
    def __init__(self, size):
        self.size = size
        self.array = [None] * size
        self.length = 0
    
    def insert(self, element, index):
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        if self.length >= self.size:
            raise Exception("Array is full")
        
        # Shift elements to make space
        for i in range(self.length, index, -1):
            self.array[i] = self.array[i-1]
        
        self.array[index] = element
        self.length += 1
    
    def delete(self, index):
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        
        # Shift elements to fill gap
        for i in range(index, self.length-1):
            self.array[i] = self.array[i+1]
        
        self.array[self.length-1] = None
        self.length -= 1
    
    def get(self, index):
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        return self.array[index]
    
    def __str__(self):
        return str([self.array[i] for i in range(self.length)])
    
# Example usage
if __name__ == "__main__":
    arr = Array(5)
    arr.insert(1, 0)
    arr.insert(2, 1)
    arr.insert(3, 2)
    arr.insert(4, 3)
    arr.insert(5, 4)
    print(arr)  # Output: [1, 2, 3, 4, 5]
    arr.delete(2)
    print(arr)  # Output: [1, 2, 4, 5]