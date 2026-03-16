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

# In Python 2, this was floor division — ensure float division in Python 3
# Bug: result is always truncated to integer
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
];
