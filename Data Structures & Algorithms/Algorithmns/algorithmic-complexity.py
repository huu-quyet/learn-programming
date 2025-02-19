# What is algorithms?
# Algorithms are a set of instructions or rules to solve a problem or perform a task. They are the building blocks of computer programs and are used to manipulate data, perform calculations, and automate tasks. Algorithms can be simple or complex, depending on the problem they are designed to solve. They can be implemented in various programming languages and are essential for developing efficient and scalable software applications.

# Characteristics of algorithms:
# 1. Input: An algorithm takes zero or more inputs to produce an output.
# 2. Output: An algorithm produces one or more outputs based on the input.  
# 3. Definiteness: An algorithm should have a clear description of each step.   
# 4. Finiteness: An algorithm should terminate after a finite number of steps.
# 5. Effectiveness: An algorithm should be effective in solving the problem for which it is designed.

# Algorithmic complexity refers to the computing resources needed by an algorithm to solve a problem.
# These computing resources can be the time taken for program execution(time complexity), or the space used in memory during its execution(space complexity).
# The aim is to minimize these resources, so a algorithm that take less time and space is considered more efficient.
# Complexity is usually expressed in Big O notation, which describes the upper bound of time or space needs, and explain how they grown in relation to the input size. It is important to analyze and understand the algorithmic complexity to choose or design the most efficient algorithm for a specific use case.

# What is Big O, Big Omega, and Big Theta notation?
# Big O notation is a mathematical notation that describes the limiting behavior of a function in the worst case scenario.

# Big Omega notation is used to describe the lower bound of an algorithm's time or space complexity in the best case scenario.

# Big Theta notation is used to describe the tight bound of an algorithm's time or space complexity in the average case scenario.

# Worst-case time complexity: The maximum number of operations required for an input of size n.
# Best-case time complexity: The minimum number of operations required for an input of size n.
# Average-case time complexity: The average number of operations required for an input of size n.

# 1. What is the time complexity of the following code?
def find_sum(n):
    sum = 0
    for i in range(1, n+1):
        sum += i
    return sum
# The time complexity of the code is O(n) because the loop runs n times, where n is the input size.
# The number of operations grows linearly with the input size.

# 2. How to calculate the time complexity of an algorithm?
# To calculate the time complexity of an algorithm, you need to analyze the number of operations (statements) performed by the algorithm in relation to the input size.
# The time complexity can be:
# - constant time O(1), 
# - logarithmic time O(log n), 
# - linear time O(n),
# - quadratic time O(n^2),
# - cubic time O(n^3),
# - exponential time O(2^n),
# - or factorial time O(n!).
# - Logarithmic time O(log n)
# - Linearithmic time O(n log n)
# - polynomial time O(n^k)
# - exponential time O(k^n)
# The most common time complexities are O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n), and O

# Example: Calculate the time complexity of the following code:
def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val

# The time complexity of the code is O(n) because the loop runs n-1 times, where n is the length of the input array arr.
# The number of operations grows linearly with the input size.

# 3. What is the space complexity of an algorithm?
# Space complexity refers to the amount of memory space required by an algorithm to solve a problem.
# It is usually expressed in terms of the maximum amount of memory space used by the algorithm in relation to the input size.
# The space complexity can be:
# - constant space O(1),
# - linear space O(n),
# - quadratic space O(n^2),
# - cubic space O(n^3),
# - exponential space O(2^n),
# - or factorial space O(n!).
# Example: Calculate the space complexity of the following code:
def find_sum(n):
    sum = 0
    for i in range(1, n+1):
        sum += i
    return sum

# The space complexity of the code is O(1) because the algorithm uses a constant amount of memory space to store the sum variable, regardless of the input size n.
# The amount of memory space used does not grow with the input size.
# Example: Calculate the space complexity of a function that creates a list of n elements
def create_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result
# The space complexity is O(n) because the size of the result list grows linearly with input n

# 4. Constant complexity O(1)
# An algorithm has constant time complexity O(1) if the number of operations does not depend on the input size.
# The algorithm takes the same amount of time to run regardless of the input size.
# Example:
def constant_time(arr):
    for i in range(10):
        print(arr[i])
    
# The time complexity of the code is O(1) because the loop runs a fixed number of times (10) regardless of the input size.
# The number of operations is constant and does not depend on the input size.

# 5. Liner complexity O(n)
# An algorithm has liner time complexity O(n) if the number of the operations grows linearly with the input size.
# The algorithm takes n operations to run where n is the input size.
# Example:
def linear_time(arr):
    for i in range(len(arr)):
        print(arr[i])
        
# The time complexity of the code is O(n) because the loop runs n times, where n is the length of the input array arr.

# 6. Quadratic complexity O(n^2)
# An algorithm has quadratic time complexity O(n^2) if the number of operations grows quadratically with the input size.
# Example:
def quadratic_time(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            print(arr[i], arr[j])

# The time complexity of the code is O(n^2) because the nested loops run n^2 times, where n is the length of the input array arr.
# n = 2 -> 2^2 = 4
# n = 3 -> 3^2 = 9
# n = 4 -> 4^2 = 16

# 7. Cubic complexity O(n^3)
# An algorithm has cubic time complexity O(n^3) if the number of operations grows cubically with the input size.
# Example:
def cubic_time(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            for k in range(len(arr)):
                print(arr[i], arr[j], arr[k])
                
# The time complexity of the code is O(n^3) because the nested loops run n^3 times, where n is the length of the input array arr.
# n = 2 -> 2^3 = 8
# n = 3 -> 3^3 = 27
# n = 4 -> 4^3 = 64

# 8. Logarithmic complexity O(log n)
# An algorithm has logarithmic time complexity O(log n) if the number of operations grows logarithmically with the input size.
# Example:
def binary_search(arr, target):
    start = 0
    end = len(arr) - 1
    while start <= end:
        mid = (start + end) // 2
        if(arr[mid] == target):
            return mid
        elif(arr[mid] < target):
            start = mid + 1
        else:
            end = mid - 1
    return -1

print(binary_search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)) # 4
        
# 9. Linearithmic complexity O(n log n)
# An algorithm has linearithmic time complexity O(n log n) if the number of operations grows linearithmically with the input size.
# Example:
def merge_sort(arr):
    if len(arr) > 1:
        mid= len(arr) // 2
        left= arr[:mid]
        right= arr[mid:]
        merge_sort(left)
        merge_sort(right)
        
        i = j = k = 0
        while i < len(left) and j < len(right):
            if(left[i] < right[j]):
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
            
arr = [38, 27, 43, 3, 9, 82, 10] 
merge_sort(arr)
print(arr) # [3, 9, 10, 27, 38, 43, 82]

# 10. Exponential complexity O(2^n)
# An algorithm has exponential time complexity O(2^n) if the number of operations grows exponentially with the input size.
# Example:
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(5)) # 5

# 11. Factorial complexity O(n!)
# An algorithm has factorial time complexity O(n!) if the number of operations grows factorially with the input size.
# Example:
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)

print(factorial(5)) # 120
