# A decorators is a design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure.
# Decorators are usually called before the definition of a function you want to decorate.

# Why use decorators?
# - Decorators allow you to add new functionality to an existing object without modifying its structure.
# - Decorators provide a simple syntax for calling higher-order functions.
# - Decorators can be used to separate concerns and make code easier to read and maintain.

# When to use decorators?
# - Use decorators when you want to add functionality to an existing object without modifying its structure.
# - Use decorators when you want to separate concerns and make code easier to read and maintain.

# 1. Function Decorator
# A decorator is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.
# Example:
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

def say_hello():
    print("Hello!")
    
say_hello = my_decorator(say_hello)
say_hello() # Output: Something is happening before the function is called. Hello! Something is happening after the function is called.

# The above example can be rewritten using the @ symbol, which is syntactic sugar for the example above.
# Example:
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
    
say_hello() # Output: Something is happening before the function is called. Hello! Something is happening after the function is called.

# 2. Function with Arguments
# Example:
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        func(*args, **kwargs)
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")
    
say_hello("Alice") # Output: Something is happening before the function is called. Hello, Alice! Something is happening after the function is called.

# 3. Chaining Decorators
# Multiple decorators can be chained in Python.
# Example:
def my_decorator1(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

def my_decorator2(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator1
@my_decorator2
def say_hello():
    print("Hello!")
    
say_hello() # Output: Something is happening before the function is called. Something is happening before the function is called. Hello! Something is happening after the function is called. Something is happening after the function is called.
# Explanation: The order in which decorators are applied is from the bottom up. In this case, my_decorator2 is applied first, followed by my_decorator1.

# 4. Decorator with Arguments
# Decorators can also take arguments.
# Example:
def repeat(num_times):
    def decorator_repeat(func):
        def wrapper(*args, **kwargs):
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat

@repeat(num_times=3)
def greet(name):
    print(f"Hello, {name}!")
    
greet("Alice") # Output: Hello, Alice! Hello, Alice! Hello, Alice!

# 5. Decorator Classes
# Decorators can also be implemented as classes.
# Example:
class DecoratorClass:
    def __init__(self, func):
        self.func = func
        
    def __call__(self, *args, **kwargs):
        print("Something is happening before the function is called.")
        self.func(*args, **kwargs)
        print("Something is happening after the function is called.")

@DecoratorClass
def say_hello():
    print("Hello!")
    
say_hello() # Output: Something is happening before the function is called. Hello! Something is happening after the function is called.
# How it works:
# - The __init__ method initializes the decorator with the function to be decorated.
# - The __call__ method is invoked when the decorated function is called, allowing the decorator to modify its behavior.