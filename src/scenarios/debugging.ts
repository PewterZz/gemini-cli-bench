import { Scenario } from '../types';

export const debuggingScenarios: Scenario[] = [
  {
    id: 'debug-001',
    category: 'debugging',
    description: 'Fix off-by-one error in loop bounds',
    prompt: 'There is a bug in sum_list.py. Find and fix it. Edit the file in place.',
    setup: `cat > sum_list.py << 'EOF'
def sum_list(items):
    total = 0
    for i in range(len(items) - 1):
        total += items[i]
    return total
EOF`,
    assertions: [
      { type: 'file-contains', target: 'sum_list.py', value: 'range(len(items))' },
    ],
  },
  {
    id: 'debug-002',
    category: 'debugging',
    description: 'Fix missing return statement',
    prompt: 'The function in calculator.py always returns None. Fix it. Edit the file in place.',
    setup: `cat > calculator.py << 'EOF'
def multiply(a, b):
    result = a * b

def add(a, b):
    return a + b
EOF`,
    assertions: [
      { type: 'file-contains', target: 'calculator.py', value: 'return result' },
    ],
  },
  {
    id: 'debug-003',
    category: 'debugging',
    description: 'Fix wrong base case in recursive function',
    prompt: 'The factorial function in math_utils.py has a bug. Fix it. Edit the file in place.',
    setup: `cat > math_utils.py << 'EOF'
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'math_utils.py', value: 'n == 0' },
    ],
  },
  {
    id: 'debug-004',
    category: 'debugging',
    description: 'Fix broken import path',
    prompt: 'The import in app.py is broken. Fix it so it imports from utils.py in the same directory. Edit the file in place.',
    setup: `cat > utils.py << 'EOF'
def helper():
    return 42
EOF
cat > app.py << 'EOF'
from lib.utils import helper
result = helper()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'app.py', value: 'from utils import helper' },
    ],
  },
  {
    id: 'debug-005',
    category: 'debugging',
    description: 'Fix string concatenation type error',
    prompt: 'Fix the TypeError in greet.py. Edit the file in place.',
    setup: `cat > greet.py << 'EOF'
def greet(name, age):
    return "Hello " + name + ", you are " + age + " years old."
EOF`,
    assertions: [
      { type: 'file-contains', target: 'greet.py', value: 'str(age)' },
    ],
  },
  {
    id: 'debug-006',
    category: 'debugging',
    description: 'Fix mutable default argument bug',
    prompt: 'There is a common Python bug in store.py. Find and fix it. Edit the file in place.',
    setup: `cat > store.py << 'EOF'
def add_item(item, items=[]):
    items.append(item)
    return items
EOF`,
    assertions: [
      { type: 'file-contains', target: 'store.py', value: 'items=None' },
    ],
  },
  {
    id: 'debug-007',
    category: 'debugging',
    description: 'Fix integer division bug',
    prompt: 'The average function in stats.py returns wrong results for odd sums. Fix it. Edit the file in place.',
    setup: `cat > stats.py << 'EOF'
def average(numbers):
    return sum(numbers) / len(numbers)

result = int(sum([1,2,3]) / len([1,2,3]))
EOF`,
    assertions: [
      { type: 'file-contains', target: 'stats.py', value: 'float' },
    ],
  },
  {
    id: 'debug-008',
    category: 'debugging',
    description: 'Fix wrong comparison operator',
    prompt: 'The is_palindrome function in palindrome.py has a bug. Fix it. Edit the file in place.',
    setup: `cat > palindrome.py << 'EOF'
def is_palindrome(s):
    reversed_s = s[::-1]
    if reversed_s is s:
        return True
    return False
EOF`,
    assertions: [
      { type: 'file-contains', target: 'palindrome.py', value: '==' },
    ],
  },
  {
    id: 'debug-009',
    category: 'debugging',
    description: 'Fix incorrect dictionary key access',
    prompt: 'The get_user_name function in users.py crashes on missing keys. Fix it to return None if not found. Edit the file in place.',
    setup: `cat > users.py << 'EOF'
def get_user_name(user_dict):
    return user_dict['name']
EOF`,
    assertions: [
      { type: 'file-contains', target: 'users.py', value: '.get(' },
    ],
  },
  {
    id: 'debug-010',
    category: 'debugging',
    description: 'Fix infinite loop due to missing increment',
    prompt: 'The count_down function in loop.py runs forever. Fix it. Edit the file in place.',
    setup: `cat > loop.py << 'EOF'
def count_down(n):
    result = []
    while n > 0:
        result.append(n)
    return result
EOF`,
    assertions: [
      { type: 'file-contains', target: 'loop.py', value: 'n -= 1' },
    ],
  },
  {
    id: 'debug-011',
    category: 'debugging',
    description: 'Fix wrong variable used in condition',
    prompt: 'The search function in finder.py never finds anything. Fix it. Edit the file in place.',
    setup: `cat > finder.py << 'EOF'
def search(items, target):
    for i, item in enumerate(items):
        if i == target:
            return i
    return -1
EOF`,
    assertions: [
      { type: 'file-contains', target: 'finder.py', value: 'item == target' },
    ],
  },
  {
    id: 'debug-012',
    category: 'debugging',
    description: 'Fix silent exception swallow',
    prompt: 'The parse function in parser.py silently swallows errors making debugging impossible. Fix it to re-raise. Edit the file in place.',
    setup: `cat > parser.py << 'EOF'
import json

def parse(data):
    try:
        return json.loads(data)
    except:
        pass
EOF`,
    assertions: [
      { type: 'file-contains', target: 'parser.py', value: 'raise' },
    ],
  },
  {
    id: 'debug-013',
    category: 'debugging',
    description: 'Fix scope bug — variable referenced before assignment',
    prompt: 'The counter function in counter.py crashes with UnboundLocalError. Fix it. Edit the file in place.',
    setup: `cat > counter.py << 'EOF'
count = 0

def increment():
    count += 1
    return count
EOF`,
    assertions: [
      { type: 'file-contains', target: 'counter.py', value: 'global count' },
    ],
  },
  {
    id: 'debug-014',
    category: 'debugging',
    description: 'Fix list modified during iteration',
    prompt: 'The cleanup function in cleaner.py skips items because it modifies the list while iterating. Fix it. Edit the file in place.',
    setup: `cat > cleaner.py << 'EOF'
def remove_negatives(numbers):
    for n in numbers:
        if n < 0:
            numbers.remove(n)
    return numbers
EOF`,
    assertions: [
      { type: 'file-contains', target: 'cleaner.py', value: 'copy' },
    ],
  },
  {
    id: 'debug-015',
    category: 'debugging',
    description: 'Fix incorrect string slicing index',
    prompt: 'The truncate function in text.py cuts one character too many. Fix it. Edit the file in place.',
    setup: `cat > text.py << 'EOF'
def truncate(s, max_len):
    if len(s) > max_len:
        return s[:max_len - 1] + "..."
    return s
EOF`,
    assertions: [
      { type: 'file-contains', target: 'text.py', value: 's[:max_len]' },
    ],
  },
  {
    id: 'debug-016',
    category: 'debugging',
    description: 'Fix None check using equality instead of identity',
    prompt: 'The check in validator.py should use "is None" not "== None". Fix it. Edit the file in place.',
    setup: `cat > validator.py << 'EOF'
def is_empty(value):
    if value == None:
        return True
    return len(value) == 0
EOF`,
    assertions: [
      { type: 'file-contains', target: 'validator.py', value: 'is None' },
      { type: 'file-not-contains', target: 'validator.py', value: '== None' },
    ],
  },
  {
    id: 'debug-017',
    category: 'debugging',
    description: 'Fix wrong exception type caught',
    prompt: 'The read function in reader.py catches Exception but should only catch FileNotFoundError. Fix it. Edit the file in place.',
    setup: `cat > reader.py << 'EOF'
def read_file(path):
    try:
        with open(path) as f:
            return f.read()
    except Exception:
        return None
EOF`,
    assertions: [
      { type: 'file-contains', target: 'reader.py', value: 'FileNotFoundError' },
    ],
  },
  {
    id: 'debug-018',
    category: 'debugging',
    description: 'Fix shallow copy bug',
    prompt: 'The copy_matrix function in matrix.py returns a shallow copy — modifying the result changes the original. Fix it. Edit the file in place.',
    setup: `cat > matrix.py << 'EOF'
def copy_matrix(matrix):
    return matrix.copy()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'matrix.py', value: 'deepcopy' },
    ],
  },
  {
    id: 'debug-019',
    category: 'debugging',
    description: 'Fix zero division not handled',
    prompt: 'The ratio function in ratio.py crashes when total is zero. Fix it to return 0.0 in that case. Edit the file in place.',
    setup: `cat > ratio.py << 'EOF'
def ratio(part, total):
    return part / total
EOF`,
    assertions: [
      { type: 'file-contains', target: 'ratio.py', value: 'total == 0' },
    ],
  },
  {
    id: 'debug-020',
    category: 'debugging',
    description: 'Fix logical AND/OR operator precedence bug',
    prompt: 'The access_check function in auth.py grants access incorrectly due to operator precedence. Fix it with explicit parentheses. Edit the file in place.',
    setup: `cat > auth.py << 'EOF'
def access_check(is_admin, is_owner, is_active):
    return is_admin or is_owner and is_active
EOF`,
    assertions: [
      { type: 'file-contains', target: 'auth.py', value: '(is_admin or is_owner)' },
    ],
  },
  {
    id: 'debug-021',
    category: 'debugging',
    description: 'Fix incorrect regex escape',
    prompt: 'The pattern in matcher.py fails to match dots in domain names because the dot is unescaped. Fix it. Edit the file in place.',
    setup: `cat > matcher.py << 'EOF'
import re

def is_valid_domain(domain):
    pattern = r"^[a-z]+.[a-z]+$"
    return bool(re.match(pattern, domain))
EOF`,
    assertions: [
      { type: 'file-contains', target: 'matcher.py', value: '\\\\.' },
    ],
  },
  {
    id: 'debug-022',
    category: 'debugging',
    description: 'Fix file not closed on exception',
    prompt: 'The write function in writer.py leaks a file handle if an exception occurs. Fix it using a context manager. Edit the file in place.',
    setup: `cat > writer.py << 'EOF'
def write_data(path, data):
    f = open(path, 'w')
    f.write(data)
    f.close()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'writer.py', value: 'with open' },
    ],
  },
  {
    id: 'debug-023',
    category: 'debugging',
    description: 'Fix key error in nested dict access',
    prompt: 'The get_city function in profile.py crashes when the address key is missing. Fix it to return an empty string. Edit the file in place.',
    setup: `cat > profile.py << 'EOF'
def get_city(profile):
    return profile['address']['city']
EOF`,
    assertions: [
      { type: 'file-contains', target: 'profile.py', value: '.get(' },
    ],
  },
  {
    id: 'debug-024',
    category: 'debugging',
    description: 'Fix string method called on wrong type',
    prompt: 'The normalize function in normalizer.py crashes when given an integer. Fix it to convert to string first. Edit the file in place.',
    setup: `cat > normalizer.py << 'EOF'
def normalize(value):
    return value.strip().lower()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'normalizer.py', value: 'str(value)' },
    ],
  },
  {
    id: 'debug-025',
    category: 'debugging',
    description: 'Fix missing await on async call',
    prompt: 'The fetch function in async_client.py never actually awaits the result. Fix it. Edit the file in place.',
    setup: `cat > async_client.py << 'EOF'
import asyncio

async def get_data(url):
    return url

async def fetch(url):
    result = get_data(url)
    return result
EOF`,
    assertions: [
      { type: 'file-contains', target: 'async_client.py', value: 'await get_data' },
    ],
  },
];
