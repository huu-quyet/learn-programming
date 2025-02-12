# Modules in Python is a file that contains Python code. Instead of putting all the code in a single file, we can put the code in separate files and import the file in other files or main file. This make the code organized and easier to maintain.

# Example: Create a module file named Math.py and write the following code in it.
import Math
print(Math.add(10, 20))
print(Math.sub(10, 20))
print(Math.mul(10, 20))
print(Math.div(10, 20))

# We can rename of the module while importing it.
import Math as m
print(m.add(10, 20))

# We can import specific functions from the module.
from Math import add, div, mul,sub
print(add(10, 20))
print(div(10, 20))


# 1. Executing a Module as a Script
# When we run a module, Python sets a few special variables like __name__ to the name of the module. If the module is executed as the main program, the Python interpreter sets the __name__ variable to __main__. If the module is imported, the __name__ variable is set to the name of the module.
# Example: Create a module file named Math.py and write the following code in it.

if __name__ == "__main__":
    print(add(10, 20))
    print(sub(10, 20))
    print(mul(10, 20))
    
# 2. Complied Python files
# To speed up loading modules, Python caches the compiled version of each module in the __pycache__ directory under the name module.version.pyc, where the version encodes the format of the compiled file; it generally contains the Python version number. For example, in CPython release 3.3 the compiled version of spam.py would be cached as __pycache__/spam.cpython-33.pyc. This naming convention allows compiled modules from different releases and different versions of Python to coexist.
# Python checks the modification date of the source against the compiled version to see if it’s out of date and needs to be recompiled. This is a completely automatic process. Also, the compiled modules are platform-independent, so the same library can be shared among systems with different architectures.
# Python does not check the cache in two circumstances. First, it always recompiles and does not store the result for the module that’s loaded directly from the command line. Second, it does not check the cache if there is no source module. To support a non-source (compiled only) distribution, the compiled module must be in the source directory, and there must not be a source module.
# Some tips for experts:
# You can use the -O or -OO switches on the Python command to reduce the size of a compiled module. The -O switch removes assert statements, the -OO switch removes both assert statements and __doc__ strings. Since some programs may rely on having these available, you should only use this option if you know what you’re doing. “Optimized” modules have an opt- tag and are usually smaller. Future releases may change the effects of optimization.
# A program doesn’t run any faster when it is read from a .pyc file than when it is read from a .py file; the only thing that’s faster about .pyc files is the speed with which they are loaded.
# The module compileall can create .pyc files for all modules in a directory.
# There is more detail on this process, including a flow chart of the decisions, in PEP 3147.

# 3. The dir() Function
# The dir() built-in function returns a sorted list of strings containing the names defined by a module.

print(dir(Math))
# ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'add', 'div', 'mul', 'sub']
# It is all the names that are defined in the module Math. The list contains the names of all the modules, variables, and functions that are defined in the module Math.

# 4. Packages
# Packages are a way of structuring Python’s module namespace by using “dotted module names”. For example, the module name A.B designates a submodule named B in a package named A. Just like the use of modules saves the authors of different modules from having to worry about each other’s global variable names, the use of dotted module names saves the authors of multi-module packages like NumPy or the Python Imaging Library from having to worry about each other’s module names.
# Example: Create a package named MyPackage and create two modules named Math1.py and Math2.py in it.
# To import the modules from the package, we use the following syntax.
from Maths import Math1, Math2
print(Math1.add(10, 20))
print(Math2.mul(10, 20))
print(dir(Math1))

# Package model structure in Python:

# sound/                          Top-level package
#       __init__.py               Initialize the sound package
#       formats/                  Subpackage for file format conversions
#               __init__.py
#               wavread.py
#               wavwrite.py
#               aiffread.py
#               aiffwrite.py
#               auread.py
#               auwrite.py
#               ...
#       effects/                  Subpackage for sound effects
#               __init__.py
#               echo.py
#               surround.py
#               reverse.py
#               ...
#       filters/                  Subpackage for filters
#               __init__.py
#               equalizer.py
#               vocoder.py
#               karaoke.py
#               ...

# When importing the package, Python searches through the directories on sys.path looking for the package subdirectory.
# The __init__.py files are required to make Python treat the directories as containing packages; this is done to prevent directories with a common name, such as string, from unintentionally hiding valid modules that occur later on the module search path.
# In the simplest case, __init__.py can just be an empty file, but it can also execute initialization code for the package or set the __all__ variable, described later.
# Note that when using "from package import item", the item can be either a submodule (or subpackage) of the package, or some other name defined in the package, like a function, class or variable. The import statement first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it. If it fails to find it, an ImportError exception is raised.