# Object oriented programming is a programming paradigm that provides a means of structuring programs so that properties and behaviors are bundled into individual objects.
# For example, an object could represent a person with properties like a name, age, and address and behaviors such as walking, talking, breathing, and running.
class Personal:
    
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
        
    def walk(self):
        print(f"{self.name} is walking")
    
    def talk(self):
        print(f"{self.name} is talking")
    
    def breathe(self):
        print(f"{self.name} is breathing")
        
# OOP also exists in other programming languages and is often described to center around the four pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism.
# 1. Encapsulation: The grouping of related properties and behaviors into a single unit, called an object. Encapsulation helps to keep the code organized and promotes modular, secure code.
# 2. Abstraction: The concept of hiding the complex implementation details and exposing only essential functionality of an object. By enforcing a consistent interface, abstraction allowing developers to focus on what on object does rather than how it achieves its functionality.
# 3. Inheritance: Enables the creation of a hierarchical relationship between classes, allowing a subclass to inherit attributes and methods from a parent class. This promotes code reuse and reduce duplication.
# 4. Polymorphism: Allow you to treat objects of different types as instance of the same base type, as long as they implement a common interface or behavior. This allows for more flexible and modular code.

# Class vs Instance
# Classes allow you to create a user-defined data structure. Classes define functions called "methods", which identify the behaviors and actions that an object created form the class can perform with its data.
# Class is a blueprint for how to define something. It is does not contain any data itself
# While the class is the blueprint, an instance is an object that is built from a class and contains real data.
# Example:
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def bark(self):
        print(f"{self.name} is barking")
        
dog1 = Dog("Buddy", 2)
dog2 = Dog("Max", 4)
# In this example, Dog is the class, and dog1 and dog2 are instances of the Dog class.

# __init__ method
# The __init__ method is a special method that is called when an instance of a class is created. It is also known as the constructor method.
# The __init__ method is used to initialize the instance of the class with data. When you create a new instance of a class, the __init__ method is called automatically.
# Attributes created in the __init__ method are called instance attributes, and they are unique to each instance of the class.
# Every attributes are created outside of the __init__ method are called class attributes, and they are shared by all instances of the class. That means if you change a class attribute, it will affect all instances of the class.
# Example:
class Car:
    # Class Attribute
    wheels = 4
    
    def __init__(self, make, model, year):
        # Instance Attributes
        self.make = make
        self.model = model
        self.year = year
        
car1 = Car("Toyota", "Corolla", 2020)
car2 = Car("Honda", "Civic", 2021)
print(car1.make) # Toyota
print(car2.make) # Honda
print(car1.wheels) # 4
print(car2.wheels) # 4

# Inherit form another class
# Inheritance is a mechanism in which a new class is created that inherits attributes and methods from an existing class. The new class is called a subclass, and the existing class is called a superclass.
# The subclass can add new attributes and methods, or override existing methods of the superclass.
# Example:
class Animal:
    def __init__(self, name):
        self.name = name
        
    def speak(self):
        raise NotImplementedError("Subclass must implement this abstract method")
    
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"
    
class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
    
dog = Dog("Buddy")
cat = Cat("Max")
print(dog.speak()) # Buddy says Woof!
print(cat.speak()) # Max says Meow!

# You can check if an object is an instance of a class using the isinstance() function.
# Example:
print(isinstance(dog, Dog)) # True
print(isinstance(dog, Animal)) # True
print(isinstance(dog, Cat)) # False
print(isinstance(Cat, Animal)) # False

# super() function
# The super() function is used to call the superclass's methods. It returns a temporary object of the superclass that allows you to call the superclass's methods inside the subclass.
# Example:
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def walk(self):
        print(f"{self.name} is walking")
    
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        # Person.__init__(self, name, age)
        # self.name = name
        # self.age = age
        # super() function is used to call the superclass's __init__ method to initialize the name and age attributes.
        
        self.grade = grade
        
    def study(self):
        print(f"{self.name} is studying")
        
student = Student("Alice", 18, 12)
student.walk() # Alice is walking
student.study() # Alice is studying
