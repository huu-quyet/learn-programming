# Queues area type of data structure in which elements are held in a sequence and access is restricted to one end.
# Elements are added (enqueue) at the end and removed(dequeue) from the front. This make queues a First In First Out (FIFO) data structure.
# This type of organization is particularly useful for specific situations such as printing jobs, handling requests in a web server, scheduling task in a system, etc.
# Due to FIFO property, once a new element is inserted into the queue, all elements that were added before the new element must be removed before the new element can be invoked.
# Queue operations:
# - Enqueue: Add an element to the end of the queue
# - Dequeue: Remove an element from the front of the queue
# - IsEmpty: Check if the queue is empty
# - Size: Get the number of elements in the queue
#
# Queue Applications:
# - CPU scheduling
# - Disk scheduling
# - Printer queue
# - Call center systems
# - Traffic management
#
# Queue Implementation using List:
class Queue:
    def __init__(self):
        self.queue = []
    
    def enqueue(self, data):
        self.queue.append(data)
    
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.queue.pop(0)
    
    def is_empty(self):
        return len(self.queue) == 0
    
    def size(self):
        return len(self.queue)
    
    def __str__(self):
        return str(self.queue)
    
# Queue Implementation using collections.deque:
from collections import deque
class Queue:
    def __init__(self):
        self.queue = deque()
    
    def enqueue(self, data):
        self.queue.appendleft(data)
        
    def is_empty(self):
        return len(self.queue) == 0
        
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")
        
        return self.queue.pop()
    
    def size(self):
        return len(self.queue)