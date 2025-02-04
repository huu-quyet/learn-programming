"""
Variables
"""

"""
1 - In Python, variables are symbolic names that refer to objects or values stored in your computer's memory.
2 - Variables are created when you assign a value to them by using the assignment operator (=).
3 - Variables in Python are dynamically typed, allowing type changes thought reassignment.
4 - Variable names must start with a letter or an underscore, and can contain letters, numbers, and underscores. You should use snake case for multi-word names to improve readability.
5 - Variables exists in different scopes (global, local, nonlocal, or build-in), which can affect how you can access them.
6 - You can define unlimited number of variables in Python, limited only by computer memory

7- Setting and Changing a Variable's Data Type

    In Python, You do not need to declare the data type of a variable when you create one. Python automatically assigns the appropriate data type based on the value you assign to the variable.
    
8 - Variable holes the reference to the object in memory, not the object itself. When you assign a variable to another variable, you are copying the reference, not the object itself.

For example: 
    x = 10
    y = x
    x = 20
    print(y) # Output: 10
    print(x) # Output: 20
    
    In the above example, the value of y is 10, not 20, because y holds the reference to the object in memory, not the object itself.
In Python, variables do not store objects. They point or refer to objects. Every time you create an object in Python, it's assgined a unique number, which is then associated with the variable. This number is called the object's id (identifier or identity).
>>> n = 300
>>> id(n)
4399012816

You can create multiple variables that point to the same object. In other words, variables that hold the same memory address. When you change the object, all variables that point to that object will reflect the change.
>>> m = n
>>> id(n) == id(m)
True

And when you reassign the value of the m variable, the n variable will still hold the reference to the object in memory.
But when you also reassign n variable to a new object 
-> Both variables will point to different objects in memory.
-> When the references to an object drop to zero, the object is deleted from memory by Python's garbage collector.

9 - Variable Scopes
    - The concept of scope defines how the variables and names are looked up in your code. It determines the visibility of a variable within your code.
    Python variables can be in different scopes:
    1 - Local scope: Variables defined inside a function. They are not accessible outside the function.
    2 - Global scope: Variables defined at the module level. These variables are visible and accessible within the containing module and in other modules that import them.
    3 - Nonlocal scope: Variables defined in a nested function. They are accessible in the nested function and the outer function. Nonlocal variable are useful when you are creating a closure function and decorators.
    4 - Built-in scope: Variables defined in the Python built-in modules. They are accessible anywhere in the program.
"""

first_name = "Eric"
print(first_name)
first_name = "Melissa"
print(first_name)














