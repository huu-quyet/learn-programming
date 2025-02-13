# In Python, An iterator is an object that allows you to iterate over collections of data, such as lists, tuples, and dictionaries.
# An iterator is an object that implements the iterator protocol, which consists of the methods __iter__() and __next__().
# When there are no more values to return, it raises the StopIteration exception.

# 1. What is the Python Iterator Protocol?
# The Python iterator protocol is a way to create objects that can be iterated over using the for loop.
# An object is called an iterator if it implements the __iter__() and __next__() methods.
# The __iter__() method returns the iterator object itself. The __next__() method returns the next value in the sequence.
# When there are no more values to return, it raises the StopIteration exception.
# Example:

class MyIterator:
    def __init__(self, sequence):
        self._sequence = sequence
        self._index = 0
        
    def __iter__(self):
        return self
    
    def __next__(self):
        if self._index < len(self._sequence):
            value = self._sequence[self._index]
            self._index += 1
            return value
        else:
            raise StopIteration
    
for item in MyIterator([1, 2, 3, 4, 5]):
    print(item)
    
# Output: 1 2 3 4 5

# 2. Transforming the Input data
# The option of performing data transformation on a Python is a great feature. It can make your code efficient in term of memory consumption. Why?
# Well, imagine for a moment that iterators did not exist. In that case, if you want to iterate over values of your object, then you'd need to create a new list to store our calculation.
# This new list would consume memory because it would have to store all the data simultaneously. Only then would you able to iterate over the object.
# However, If you use an iterator, then your code will only require memory for a single item at a time. The iterator will compute the following items on demand without storing them in memory. In this regard, iterators are lazy objects.

# 3. Creating Generator Iterator
# Generator function are special types of function that allow you to create iterators using functional style. Unlike regular function, which typically compute a value and return it to the caller, generator functions return a generator iterator that yields a stream of data one value at a time.

# 3.1 Creating Generator Functions
# To create a generator function, you use the yield keyword instead of return. The yield keyword tells Python that the function is a generator function.
# When you call a generator function, it returns a generator iterator that you can use to iterate over the values it yields.
# Example:
def my_generator(list):
    for item in list:
        yield item
        
sequence_generator = my_generator([1, 2, 3, 4, 5])
for item in sequence_generator:
    print(item)
    
# Output: 1 2 3 4 5

# 3.2 Generator Expressions
# Generator expressions are similar to list comprehensions, but they use parentheses instead of square brackets.
# Example:
sequence = [1, 2, 3, 4, 5]
sequence_generator = (item for item in sequence)
for item in sequence_generator:
    print(item)

# Output: 1 2 3 4 5

# 4. Doing Memory Efficient data processing with Iterators
# Iterators are memory efficient because they only compute the next value in the sequence when you ask for it.
# This means that you can use iterators to process large datasets without running out of memory.
# With Iterator and generator, you do not need to store all the data in your computer's memory at the same time.

# 4.1 Returning Iterators Instead of Container types
# Regular function and comprehension return container types, such as lists, tuples, and dictionaries. These container types store all the data in memory at the same time.
# In contrast, iterator keep only one data item in memory at a time, generating the next items on demand or lazily.
# Example:
def square_list(list):
    squares = []
    for item in list:
        squares.append(item ** 2)
    return squares

sequence = [1, 2, 3, 4, 5]
squares = square_list(sequence)
print(squares) # Output: [1, 4, 9, 16, 25]

# In this example, you have two list objects in memory: sequence and squares. The sequence list stores the input data, and the squares list stores the output data.
# If the input data is large, then the squares list will also be large, consuming a lot of memory.
# You can rewrite the square_list() function to return an iterator instead of a list. This way, you can process large datasets without running out of memory.
# Example:
def square_iterator(list):
    for item in list:
        yield item ** 2
        
sequence = [1, 2, 3, 4, 5]
squares = square_iterator(sequence)
for item in squares:
    print(item)

# Output: 1 4 9 16 25

# 4.2 Creating a Data Pipeline with Iterators
# You can use iterators to create a data pipeline that processes data in stages. Each stage of the pipeline is an iterator that transforms the data in some way.
# Example:
def filter_odd(list):
    for item in list:
        if item % 2 == 1:
            yield item
        
def square(list):
    for item in list:
        yield item ** 2
        
sequence = [1, 2, 3, 4, 5]
pipeline = square(filter_odd(sequence))
for item in pipeline:
    print(item)

# Output: 1 9 25
# In this example, the filter_odd() function filters out odd numbers from the input sequence, and the square() function squares the remaining numbers.
# The pipeline variable is an iterator that processes the data in stages. It first filters out odd numbers and then squares the remaining numbers.

# 5. Limitation of Iterators
# You can only iterate over an iterator once. Once you have exhausted the iterator, you cannot iterate over it again.
# Example:
sequence = [1, 2, 3, 4, 5]
iterator = iter(sequence)
for item in iterator:
    print(item)
    
# Output: 1 2 3 4 5

for item in iterator:
    print(item)
    
# Output: Nothing

# And you can not reset the iterator to the beginning of the sequence. If you want to iterate over the sequence again, you need to create a new iterator.

# 6. Iterables
# An iterable is an object that implements the __iter__() method, which returns an iterator object.
# You can iterate over an iterable using a for loop or by calling the iter() function.
# Example:
sequence = [1, 2, 3, 4, 5]
iterator = iter(sequence)
for item in iterator:
    print(item)
    
# Output: 1 2 3 4 5

# 6.1 Creating an Iterable
# You can create an iterable by implementing the __iter__() method in a class.
# Example:
class MyIterable:
    def __init__(self, sequence):
        self._sequence = sequence
        
    def __iter__(self):
        return MyIterator(self._sequence)
    
class MyIterator:
    def __init__(self, sequence):
        self._sequence = sequence
        self._index = 0
        
    def __iter__(self):
        return self
    
    def __next__(self):
        if self._index < len(self._sequence):
            value = self._sequence[self._index]
            self._index += 1
            return value
        else:
            raise StopIteration

sequence = MyIterable([1, 2, 3, 4, 5])
for item in sequence:
    print(item)

# Output: 1 2 3 4 5

# 7. Comparing Iterators and Iterables
# An iterator is an object that implements the __iter__() and __next__() methods.
# An iterable is an object that implements the __iter__() method, which returns an iterator object.
# An iterator is an iterable, but an iterable is not necessarily an iterator.
# You can iterate over an iterator using a for loop or by calling the next() function.
# You can iterate over an iterable using a for loop or by calling the iter() function.
# Example:
sequence = [1, 2, 3, 4, 5]
iterator = iter(sequence)
for item in iterator:
    print(item)
    
# Output: 1 2 3 4 5

# Feature	                                        Iterators	Iterables
# Can be used in for loops directly	                    ✅	         ✅
# Can be iterated over many times	                    ❌	         ✅
# Support the iter() function	                        ✅	         ✅
# Support the next() function	                        ✅	         ❌
# Keep information about the state of iteration	        ✅	         ❌
# Optimize memory use	                                ✅          	 ❌

# The first feature in this list is possible because Python’s for loops always call iter() to get an iterator out of the target data. If this call succeeds, then the loop runs. Otherwise, you get an error.
# In general, when dealing with huge datasets, you should take advantage of iterators and write memory-efficient code. In contrast, if you’re coding custom container or collection classes, then provide them with the iterable protocol so that you can use them later in for loops.
