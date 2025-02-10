"""
Functions

In programming, a function is a self-contained block of code that encapsulate a specific task or related group of task.

I. The importance of Python functions
1. Abstraction and Reusability
- Functions allow you to abstract away complex logic into a single block of code. This makes your code easier to read and maintain.
- Functions can be reused in multiple parts of your program, reducing code duplication and making your code more modular.
2. Modularity
- Functions allow you to break down your program into smaller, more manageable pieces. This makes your code easier to understand and debug.
3. Namespace separation
- A namespace is a region of a program in which identifiers have meaning. When a Python function is called, a new namespace is created for that function. This means that, you can use variable names and identifiers inside a function without worrying about conflicts with other parts of your program.

"""

# II. Defining a function

def buy_item(cost_of_item):
    return cost_of_item + add_tax_to_item(cost_of_item)


def add_tax_to_item(cost_of_item):
    current_tax_rate = .03
    return cost_of_item * current_tax_rate


final_cost = buy_item(50)
print(final_cost)

# III. Function arguments
# 1. Positional arguments
# Positional arguments are the most common type of argument in Python. They are passed to a function in the order they are defined in the function signature.
# Example:
def greet_user(name, greeting):
    return f"{greeting}, {name}!"

print(greet_user("Alice", "Hello"))  # Output: Hello, Alice!
print(greet_user("Bob", "Hi"))  # Output: Hi, Bob!

# 2. Keyword arguments
# Keyword arguments are passed to a function by specifying the argument name followed by the value. This allows you to pass arguments in any order, as long as you specify the argument name.
# Example:
def greet_user(name, greeting):
    return f"{greeting}, {name}!"

print(greet_user(name="Alice", greeting="Hello"))  # Output: Hello, Alice!
print(greet_user(greeting="Hi", name="Bob"))  # Output: Hi, Bob!

# When both positional and keyword argument are used, positional arguments must come before keyword arguments.
# Example:
def greet_user(name, greeting):
    return f"{greeting}, {name}!"

print(greet_user("Alice", greeting="Hello"))  # Output: Hello, Alice!

# 3. Default parameters
# Default parameters are used to provide a default value for an argument if no value is provided when the function is called.
# Example:
def greet_user(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet_user("Alice"))  # Output: Hello, Alice!
print(greet_user("Bob", "Hi"))  # Output: Hi, Bob!

# 3.1 Default parameters with mutable objects
# When using mutable objects (e.g., lists, dictionaries) as default parameters, you should be careful because the default value is shared across all function calls.
# In Python, default parameter values are defined only once when the function is defined. The default values is not re-defined each time the function is called.
# Example:
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))  # Output: ['apple']
print(add_item("banana"))  # Output: ['apple', 'banana']

# To avoid this issue, you can use None as the default value and then set the default value inside the function.
# Example:
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("apple"))  # Output: ['apple']
print(add_item("banana"))  # Output: ['banana']

# 4. Pass-by-value vs. pass-by-reference
# - Pass-by-value: A copy of the argument is passed to the function.
# - Pass-by-reference: A reference to the argument is passed to the function.
# In Python, arguments are passed by value, but the value being passed is a reference to the object.
# When you pass a mutable object (e.g., list, dictionary) to a function, the function can modify the object in place.
# Example:
def modify_list(items):
    items.append(4)
    return items

my_list = [1, 2, 3]
print(modify_list(my_list))  # Output: [1, 2, 3, 4]
print(my_list)  # Output: [1, 2, 3, 4]

# 5. Argument packing
# Argument packing allows you to pass a variable number of arguments to a function.
# 5.1 Packing positional arguments
# You can use the * operator to pack positional arguments into a tuple.
# Example:
def sum_values(*args):
    return sum(args)

print(sum_values(1, 2, 3))  # Output: 6
print(sum_values(4, 5, 6, 7))  # Output: 22

# 5.2 Packing keyword arguments
# You can use the ** operator to pack keyword arguments into a dictionary.
# Example:
def print_values(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
        
print_values(name="Alice", age=30)  # Output: name: Alice, age: 30

# 6. Argument unpacking
# Argument unpacking allows you to pass a sequence of arguments to a function.
# 6.1 Unpacking positional arguments
# You can use the * operator to unpack a list or tuple into positional arguments.
# Example:
def greet_user(name, greeting):
    return f"{greeting}, {name}!"

user_info = ["Alice", "Hello"]
print(greet_user(*user_info))  # Output: Hello, Alice!

# 6.2 Unpacking keyword arguments
# You can use the ** operator to unpack a dictionary into keyword arguments.
# Example:
def greet_user(name, greeting):
    return f"{greeting}, {name}!"

user_info = {"name": "Alice", "greeting": "Hello"}
print(greet_user(**user_info))  # Output: Hello, Alice!

# 7. Arbitrary arguments and keyword arguments
# You can define functions that accept an arbitrary number of positional or keyword arguments.
# 7.1 Arbitrary positional arguments
# You can use the *args parameter to accept an arbitrary number of positional arguments.
# Example:
def sum_values(*args):
    return sum(args)

print(sum_values(1, 2, 3))  # Output: 6

# 7.2 Arbitrary keyword arguments
# You can use the **kwargs parameter to accept an arbitrary number of keyword arguments.
# Example:
def print_values(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_values(name="Alice", age=30)  # Output: name: Alice, age: 30

# 8. Keyword-only arguments
# You can define functions that only accept keyword arguments by using the * parameter.
# Example:
def greet_user(*, name, greeting):
    return f"{greeting}, {name}!"

print(greet_user(name="Alice", greeting="Hello"))  # Output: Hello, Alice!

# 9. Positional only arguments
# You can define functions that only accept positional arguments by using the / parameter.
# Example:
def greet_user(name, greeting, /):
    return f"{greeting}, {name}!"

print(greet_user("Alice", "Hello"))  # Output: Hello, Alice!

# 10. Function annotations
# Function annotations allow you to add type hints to function parameters and return values.
# Example:
def add_numbers(a: int, b: int) -> int:
    return a + b

result = add_numbers(1, 2)
print(result)  # Output: 3

# Function annotations are not enforced by Python, but they can be used by type-checking tools like mypy.

# 11. Both keyword-only and positional-only arguments
# You can define functions that accept both keyword-only and positional-only arguments by using the / and * parameters.
# Example:
def greet_user(name, /, greeting, *, punctuation):
    return f"{greeting}, {name}{punctuation}"

print(greet_user("Alice", "Hello", punctuation="!"))  # Output: Hello, Alice!

# IV. Returning multiple values
# A function can return multiple values by returning a tuple.
# Example:
def get_user_info():
    name = "Alice"
    age = 30
    return name, age

name, age = get_user_info()
print(f"Name: {name}, Age: {age}")  # Output: Name: Alice, Age: 30

