import sys
import re

code_and_input = sys.stdin.read()
code, user_input_008262891_invalid_user_cannot_choose = code_and_input.split('SPACEFORINPUT', 1)
user_input_008262891_invalid_user_cannot_choose = user_input_008262891_invalid_user_cannot_choose.split()

def custom_input(prompt=''):
    try:
        value = user_input_008262891_invalid_user_cannot_choose.pop(0)
        print(prompt, end='')
        print(value)
        return value
    except IndexError:
        raise Exception("Not enough input values provided.")
    
try:
    code = re.sub(r'input\((?:\"(.*?)\"|\'(.*?)\'|)\)', r'custom_input("\1\2")', code)
    code = re.sub(r'int\(input\((?:\"(.*?)\"|\'(.*?)\'|)\)\)', r'int(custom_input("\1\2"))', code)

    exec(code)
except Exception as e:
    print('Error: ' + str(e))