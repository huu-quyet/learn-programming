# A lambda function is a small anonymous function.
# A lambda function can take any number of arguments, but can only have one expression.
# Syntax: lambda arguments : expression
# Example:
# Add 10 to argument a, and return the result:
x = lambda a : a + 10
print(x(5)) # Output: 15

# Why Use Lambda Functions?
# The power of lambda is better shown when you use them as an anonymous function inside another function.
# Say you have a function definition that takes one argument, and that argument will be multiplied with an unknown number:
def myfunc(n):
  return lambda a : a * n
mydoubler = myfunc(2)
print(mydoubler(11)) # Output: 22

# When to use lambda functions?
# Use lambda functions when an anonymous function is required for a short period of time.
# Lambda functions are used along with built-in functions like filter(), map(), and reduce().
# Example: Use lambda functions with filter() to filter out even numbers from a list.
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered_list = list(filter(lambda x: x % 2 == 0, my_list))
print(filtered_list) # Output: [2, 4, 6, 8, 10]
