# LINKED LIST IN DATA STRUCTURES AND ALGORITHMS

# Linked List are a type of data structure used for storing collections of data. 
# The data is stored in nodes and each node has a reference (link) to the next node in the sequence or chain.
# Types of linked list: 
# - Singly Linked List: Where each node has a reference to the next node in the chain and the last node point to null.
# - Doubly Linked List: Where each node has two references, one to the next node and one to the previous node.
# - Circular Linked List: Where the last node points back to the first node.
# - Circular Doubly Linked List: Where the last node points back to the first node and each node has two references, one to the next node and one to the previous node.
# Linked List are used in other data structures like stacks, queues, and graphs.

# 1. Compare Linked List with Arrays
# 1.1 Issue with Arrays
# - Arrays have a fixed size, so if you want to add more elements than the array size, you have to create a new array and copy the elements from the old array to the new array.
# - Arrays are not dynamic, so you have to know the size of the array before you create it.
# - Arrays are not flexible, so you can't insert an element in the middle of the array without shifting all the elements to the right.
# - Arrays are not efficient, so if you want to insert an element at the beginning of the array, you have to shift all the elements to the right, or if you want to delete an element from the middle/beginning of the array, you have to shift all the elements to the left.

# 1.2. Linked List
# - Linked List are dynamic, so you can add as many elements as you want without worrying about the size.
# - Linked List are flexible, so you can insert an element in the every position you want without shifting all the elements.
# - Linked List are efficient, so you can insert an element at the beginning of the list in O(1) time complexity and delete an element from the beginning of the list in O(1) time complexity.
# - Linked List are not efficient in searching and accessing, so if you want to search or access for an element in the list, you have to traverse the list from the beginning to the end.
# - Linked List are not efficient in memory, so each node in the list has an overhead of storing the reference to the next node.    
# - Linked List are not cache-friendly, so the elements in the list are not stored in contiguous memory locations.
# - Linked List are not thread-safe, so if you want to use a linked list in a multi-threaded environment, you have to synchronize the access to the list.
# - Linked List are not suitable for small data, so if you have a small number of elements, it's better to use an array.
# - Linked List are suitable for large data, so if you have a large number of elements, it's better to use a linked list.

# Implement Linked List:
## Singly Linked List
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next
        
class LinkedList:
    def __init__(self):
        self.head = None
        
    def print(self):
        if self.head is None:
            print("Linked List is empty")
            return
        itr = self.head
        ll = ''
        while itr:
            ll += str(itr.data) + '-->' if itr.next else str(itr.data)
            itr = itr.next
        print(ll)
        
    def get_length(self):
        count = 0
        itr = self.head
        while itr:
            count += 1
            itr = itr.next
        return count
    
    def insert_at_beginning(self, data):
        self.head = Node(data, self.head)
        
    def insert_at_end(self, data):
        if self.head is None:
            self.head = Node(data, None)
            return
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = Node(data, None)
        
    def insert_at(self, index, data):
        if index < 0 or index > self.get_length():
            raise Exception("Invalid index")
        
        if index == 0:
            self.insert_at_beginning(data)
            return

        count = 0
        itr = self.head
        while itr:
            if count == index - 1:
                itr.next = Node(data, itr.next)
                break
            itr = itr.next
            count += 1
            
    def remove_at(self, index):
        if index < 0 or index >= self.get_length():
            raise Exception("Invalid index")
        
        if index == 0:
            self.head = self.head.next
            return
        
        count = 0
        itr = self.head
        while itr:
            if count == index - 1:
                itr.next = itr.next.next
                break
            itr = itr.next
            count +=1
            
    def insert_values(self, data_list):
        self.head = None
        for data in data_list:
            self.insert_at_end(data)
            
                                    
ll = LinkedList()
ll.insert_at_beginning(5)
ll.insert_at_beginning(89)
ll.insert_at_end(79)
ll.insert_at_end(45)
ll.insert_at(2, 78)
ll.insert_at(0, 56)
ll.remove_at(2)
ll.print()
print('Length: ', ll.get_length())

## Doubly Linked List
class Node:
    def __init__(self, data=None, prev=None, next=None):
        self.data = data
        self.prev = prev
        self.next = next
        
class DoublyLinkedList:
    def __init__(self):
        self.head = None
        
    def print(self):
        if self.head is None:
            print("Linked List is empty")
            return
        
        itr = self.head
        ll = ''
        while itr:
            ll += str(itr.data) + '<-->' if itr.next else str(itr.data)
            itr = itr.next
            
        print(ll)
        
    def length(self):
        count = 0
        itr = self.head
        while itr:
            count += 1
            itr = itr.next
            
        return count
    
    def insert_at_beginning(self, data):
        node = Node(data, None, self.head)
        self.head = node
        if node.next:
            node.next.prev = node
            
    def insert_at_end(self, data):
        if self.head is None:
            self.head = Node(data, None, None)
            return
        
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = Node(data, itr, None)
        
    def insert_at(self, index, data):
        if index < 0 or index > self.length():
            raise Exception("Invalid index")
        
        if index == 0:
            self.insert_at_beginning(data)
            return
        
        count = 0
        itr = self.head
        while itr:
            if count == index - 1:
                node = Node(data, itr, itr.next)
                if node.next:
                    node.next.prev = node
                itr.next = node
                break
            itr = itr.next
            count += 1
        
    def remove_at(self, index):
        if index < 0 or index >= self.length():
            raise Exception("Invalid index")
        
        if index == 0:
            self.head = self.head.next
            self.head.prev = None
            return
        
        count = 0
        itr = self.head
        while itr:
            if count == index - 1:
                itr.next = itr.next.next
                if itr.next:
                    itr.next.prev = itr
                break
            itr = itr.next
            count +=1
            
    def insert_values(self, data_list):
        self.head = None
        for data in data_list:
            self.insert_at_end(data)
        
dll = DoublyLinkedList()
dll.insert_at_beginning(5)
dll.insert_at_beginning(89)
dll.insert_at_end(79)
dll.insert_at_end(45)
dll.insert_at(2, 78)
dll.insert_at(0, 56)
dll.remove_at(2)
dll.print()
print('Length: ', dll.length())
dll.insert_values([1, 2, 3, 4, 5])
dll.print()