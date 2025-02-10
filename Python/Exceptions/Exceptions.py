# Python Exceptions Tutorial
# Handling Exceptions in Python

# The try statement works as follows.

# First, the try clause (the statement(s) between the try and except keywords) is executed.

# If no exception occurs, the except clause is skipped and execution of the try statement is finished.

# If an exception occurs during execution of the try clause, the rest of the clause is skipped. Then, if its type matches the exception named after the except keyword, the except clause is executed, and then execution continues after the try/except block.

# If an exception occurs which does not match the exception named in the except clause, it is passed on to outer try statements; if no handler is found, it is an unhandled exception and execution stops with an error message.

# A try statement may have more than one except clause, to specify handlers for different exceptions. At most one handler will be executed. Handlers only handle exceptions that occur in the corresponding try clause, not in other handlers of the same try statement. 

def demonstrate_exceptions():
    # 1. Basic try-except
    try:
        result = 10 / 0  # This will raise a ZeroDivisionError
    except ZeroDivisionError:
        print("Cannot divide by zero!")

    # 2. Multiple except blocks
    try:
        number = int("abc")  # This will raise a ValueError
    except ValueError:
        print("Invalid number conversion")
    except TypeError:
        print("Type error occurred")

    # 3. Using else clause (runs if no exception occurs)
    try:
        number = int("123")
    except ValueError:
        print("Invalid conversion")
    else:
        print(f"Conversion successful: {number}")

    # 4. Using finally (always runs)
    try:
        file = open("nonexistent.txt")
    except FileNotFoundError:
        print("File not found!")
    finally:
        print("This will always execute")

    # 5. Catching multiple exceptions in one line
    try:
        value = [1, 2, 3][4]  # This will raise an IndexError
    except (IndexError, TypeError):
        print("List index or type error occurred")

    # 6. Getting exception information
    # The raise statement allows the programmer to force a specified exception to occur.
    try:
        raise Exception("Custom error message")
    except Exception as e:
        print(f"Error details: {str(e)}")

    # 7. Creating custom exceptions
    class CustomError(Exception):
        pass

    try:
        raise CustomError("This is a custom error")
    except CustomError as ce:
        print(f"Caught custom error: {ce}")

if __name__ == "__main__":
    demonstrate_exceptions()
    
    # Common built-in exceptions:
    # - ValueError: Invalid value
    # - TypeError: Invalid operation between types
    # - IndexError: List index out of range
    # - KeyError: Dictionary key not found
    # - FileNotFoundError: File doesn't exist
    # - ZeroDivisionError: Division by zero
    # - AttributeError: Object has no attribute/method
    # - ImportError: Module not found
    # - SyntaxError: Invalid Python syntax