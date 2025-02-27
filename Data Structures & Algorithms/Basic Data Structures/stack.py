## Stack is a liner data structure that follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out).
# Why is the stack called a LIFO data structure?
# Because the last element added to the stack is the first element to be removed.

# The issue with using a list as a stack is that list uses dynamic array internally and when it reaches its capacity it will reallocate a big chunk of memory somewhere else in memory area and copy all the elements. For example in below diagram if a list has a capacity of 10 and we try to insert 11th element, it will not allocate new memory in a different memory region, copy all 10 elements and then insert the 11th element. So overhead here is (1) allocate new memory plus (2) copy all existing elements in new memory area. This is not efficient. So we can use collections.deque which is a double-ended queue and it is implemented as a doubly linked list. It provides O(1) time complexity for append and pop operations.

# Stack Operations:
# 1. Push: Add an element to the top of a stack
# 2. Pop: Remove an element from the top of a stack
# 3. Peek or Top: Return the top element of the stack
# 4. isEmpty: Check if the stack is empty
# 5. Size: Return the number of elements in the stack

# Stack Applications:
# 1. Function calls and recursion
# 2. Undo mechanism in text editors
# 3. Expression parsing
# 4. Backtracking algorithms

# Stack Implementation using List:
class Stack:
    def __init__(self):
        self.stack = []
    
    def push(self, data):
        self.stack.append(data)
    
    def pop(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.stack.pop()
    
    def peek(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.stack[-1]
    
    def is_empty(self):
        return len(self.stack) == 0
    
    def size(self):
        return len(self.stack)
    
    def __str__(self):
        return str(self.stack)
    
# Example usage
if __name__ == "__main__":
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(stack)  # Output: [1, 2, 3]
    print("Size:", stack.size())  # Output: 3
    print("Pop:", stack.pop())  # Output: 3
    print("Pop:", stack.pop())  # Output: 2
    print("Peek:", stack.peek())  # Output: 1
    print("Size:", stack.size())  # Output: 1
    print("Is empty:", stack.is_empty())  # Output: False
    print("Pop:", stack.pop())  # Output: 1
    print("Is empty:", stack.is_empty())  # Output: True
    stack.pop()  # Exception: Stack is empty
    
# Time Complexity:
# - Push: O(1)
# - Pop: O(1)
# - Peek: O(1)
# - isEmpty: O(1)
# - Size: O(1)

# Stack using Linked List:
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        
class Stack:
    def __init__(self):
        self.top = None
        self.size = 0
    
    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node
        self.size += 1
    
    def pop(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        data = self.top.data
        self.top = self.top.next
        self.size -= 1
        return data
    
    def peek(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.top.data
    
    def is_empty(self):
        return self.size == 0
    
    def size(self):
        return self.size
    
    def __str__(self):
        current = self.top
        stack = []
        while current:
            stack.append(current.data)
            current = current.next
        return str(stack)
    
# Example usage
if __name__ == "__main__":
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(stack)  # Output: [3, 2, 1]
    print("Size:", stack.size())  # Output: 3
    print("Pop:", stack.pop())  # Output: 3
    print("Pop:", stack.pop())  # Output: 2
    print("Peek:", stack.peek())  # Output: 1
    print("Size:", stack.size())  # Output: 1
    print("Is empty:", stack.is_empty())  # Output: False
    print("Pop:", stack.pop())  # Output: 1
    print("Is empty:", stack.is_empty())  # Output: True
    stack.pop()  # Exception: Stack is empty
    
# Time Complexity:
# - Push: O(1)
# - Pop: O(1)
# - Peek: O(1)
# - isEmpty: O(1)
# - Size: O(1)

# Stack using collections.deque:
from collections import deque
class Stack:
    def __init__(self):
        self.stack = deque()
    
    def push(self, data):
        self.stack.append(data)
    
    def pop(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.stack.pop()
    
    def peek(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.stack[-1]
    
    def is_empty(self):
        return len(self.stack) == 0
    
    def size(self):
        return len(self.stack)
    
    def __str__(self):
        return str(self.stack)