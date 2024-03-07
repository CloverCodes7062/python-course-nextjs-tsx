import sys

code_and_input = sys.stdin.read()
code, user_input = code_and_input.split('SPACEFORINPUT', 1)
user_input = user_input.split()

try:
    while 'input()' in code:
        code = code.replace('input()', str(user_input.pop(0)), 1)
    exec(code)
except Exception as e:
    print('Error: ' + str(e))