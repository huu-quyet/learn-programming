# A Hash table is defined as a data structure that store key-value pairs.
# It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
# The hash function generates a unique key for each element in the array.

## Build a Hash Table from scratch:
# Step 1: Create a Hash Table class with a constructor that initializes the size of the hash table.
# Step 2: Create a hash function that converts the key into an index.
# Step 3: Create a set method that stores a key-value pair in the hash table.
# Step 4: Create a get method that retrieves the value using the key.
# Step 5: Create a delete method that removes the key-value pair from the hash table.
# Step 6: Create a display method that prints the key-value pairs in the hash table.

class HashTable:
    def __init__(self, size):
        self.size = size
        self.hash_table = [[] for _ in range(size)]
        
    def hash_function(self, key):
        sum_of_ascii = sum([ord(char) for char in key])
        return sum_of_ascii % self.size
    
    def set(self, key, value):
        hash_key = self.hash_function(key)
        key_exists = False
        slot = self.hash_table[hash_key]
        if slot:
            for i, kv in enumerate(slot):
                k , v = kv
                if key == k:
                    key_exists = True
                    break
            if key_exists:
                if value in slot[i][1]:
                    return
                else:
                    slot[i] = ((key, value))
            else:
                slot.append((key, value))
        else:
            self.hash_table[hash_key] = [(key, value)]
            
    def get(self, key):
        hash_key = self.hash_function(key)
        slot = self.hash_table[hash_key]
        if slot:
            for k, v in slot:
                if key == k:
                    return v
        else:
            return None
        
    def delete(self, key):
        hash_key = self.hash_function(key)
        slot = self.hash_table[hash_key]
        if slot:
            for i, kv in enumerate(slot):
                k, v = kv
                if key == k:
                    del slot[i]
                    return True
        return False
    
    def display(self):
        print("Hash Table:")
        for index, slot in enumerate(self.hash_table):
            print(index, slot)
            
# Create a Hash Table with a size of 10
# hash_table = HashTable(10)
# hash_table.set("John", 23)
# hash_table.set("Jane", 25)
# hash_table.set("Jack", 27)
# print(hash_table.get("John")) # Output: 23
# hash_table.display()

## Handing Collisions:
# Collisions occur when two different keys hash to the same index.
# There are two common ways to handle collisions:
# 1. Separate Chaining: Each bucket stores a linked list of key-value pairs.
# 2. Open Addressing: When a collision occurs, find the next available slot in the hash table.

# Separate Chaining:
# In the Separate Chaining method, each bucket stores a linked list of key-value pairs.
# When a collision occurs, the key-value pair is added to the linked list.
# Example:
class HashTable:
    def __init__(self, size):
        self.size = size
        self.hash_table = [[] for _ in range(size)]
        
    def hash_function(self, key):
        count_ascii = sum([ord(char) for char in key])
        return count_ascii % self.size
    
    def display(self):
        print("Hash table:")
        for i, kv in enumerate(self.hash_table):
            print(i, kv)
    
    def set(self, key, value):
        hash_key = self.hash_function(key)
        slot = self.hash_table[hash_key]
        key_exists = False
        if slot:
            for i, kv in enumerate(slot):
                k, v = kv
                if key == k:
                    key_exists = True
                    break
            if key_exists:
                if value in slot[i][1]:
                    return
                else:
                    slot[i] = ((key, slot[i][1] + [value]))
            else:
                slot.append((key, [value]))
        else:
            self.hash_table[hash_key] = [(key, [value])]
            
    def get(self, key):
        hash_key = self.hash_function(key)
        slot = self.hash_table[hash_key]
        if slot:
            for k, v in slot:
                if key == k:
                    return v
        else:
            return None
        
    def delete(self, key):
        hash_key = self.hash_function(key)
        slot = self.hash_table[hash_key]
        if slot:
            for i, kv in enumerate(slot):
                k, v = kv
                if key == k:
                    del slot[i]
                    return True
        return False
            
hash_table = HashTable(10)
hash_table.set("John", 23)  
hash_table.set("John", 23)  
hash_table.set("Jane", 25)
hash_table.set("Jack", 27)
hash_table.set("John", 24)
hash_table.set("Doe", 29)
hash_table.set("Stack", 30)
hash_table.set("Overflow", 31)
hash_table.set("Python", 32)
hash_table.set("Java", 33)
hash_table.set("C++", 34)
hash_table.set("C#", 35)
hash_table.set("Ruby", 36)
print(hash_table.get("John")) # Output: [23, 24]
print(hash_table.get("Stack")) # Output: [30]
hash_table.delete("Jane")
hash_table.display()

# Open Addressing:
# In the Open Addressing method, when a collision occurs, find the next available slot in the hash table.
# There are three common ways to handle collisions in Open Addressing:
# 1. Linear Probing: When a collision occurs, find the next available slot by incrementing the index by 1.
# 2. Quadratic Probing: When a collision occurs, find the next available slot by incrementing the index by 1, 4, 9, 16, and so on.
# 3. Double Hashing: When a collision occurs, find the next available slot by using a second hash function.
# Example:
class HashTable:
    def __init__(self, size):
        self.size = size
        self.hash_table = [None] * size
        
    def hash_function(self, key):
        sum_ascii = sum([ord(char) for char in key])
        return sum_ascii % self.size
    
    def display(self):
        print("Hash Table:")
        for i, kv in enumerate(self.hash_table):
            print(i, kv)
            
    def set(self, key, value):
        hash_key = self.hash_function(key)
        if self.hash_table[hash_key] is None:
            self.hash_table[hash_key] = (key, value)
        else:
            next_slot = self.rehash(hash_key)
            while self.hash_table[next_slot] is not None:
                next_slot = self.rehash(next_slot)
            self.hash_table[next_slot] = (key, value)
            
    def get(self, key):
        hash_key = self.hash_function(key)
        start_slot = hash_key
        while self.hash_table[hash_key] is not None:
            k, v = self.hash_table[hash_key]
            if k == key:
                return v
            hash_key = self.rehash(hash_key)
            if hash_key == start_slot:
                return None
        return None
    
    def delete(self, key):
        hash_key = self.hash_function(key)
        start_slot = hash_key
        while self.hash_table[hash_key] is not None:
            k, v = self.hash_table[hash_key]
            if k == key:
                self.hash_table[hash_key] = None
                return True
            hash_key = self.rehash(hash_key)
            if hash_key == start_slot:
                return False
        return False
    
    def rehash(self, old_hash):
        return (old_hash + 1) % self.size

# Hash tables offer fast lookups, insertions, and deletions.
# Hash tables are widely used in database indexing, caching, routers, and more.