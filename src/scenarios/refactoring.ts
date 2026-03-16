import { Scenario } from '../types';

export const refactoringScenarios: Scenario[] = [
  {
    id: 'refactor-001',
    category: 'refactoring',
    description: 'DRY up duplicated validation logic',
    prompt: 'Refactor validate.py to remove the duplicated validation code. Edit the file in place.',
    setup: `cat > validate.py << 'EOF'
def validate_email(data):
    if not data:
        raise ValueError("data is required")
    if len(data) < 3:
        raise ValueError("data too short")
    if "@" not in data:
        raise ValueError("invalid email")

def validate_username(data):
    if not data:
        raise ValueError("data is required")
    if len(data) < 3:
        raise ValueError("data too short")
    if not data.isalnum():
        raise ValueError("invalid username")
EOF`,
    assertions: [
      { type: 'file-contains', target: 'validate.py', value: 'def validate_required' },
    ],
  },
  {
    id: 'refactor-002',
    category: 'refactoring',
    description: 'Convert callback-style to async/await in JavaScript',
    prompt: 'Refactor fetch_data.js to use async/await instead of callbacks. Edit the file in place.',
    setup: `cat > fetch_data.js << 'EOF'
const fs = require('fs');

function readConfig(callback) {
    fs.readFile('config.json', 'utf8', function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(data));
        }
    });
}
EOF`,
    assertions: [
      { type: 'file-contains', target: 'fetch_data.js', value: 'async' },
      { type: 'file-contains', target: 'fetch_data.js', value: 'await' },
    ],
  },
  {
    id: 'refactor-003',
    category: 'refactoring',
    description: 'Replace multiple parameters with options object',
    prompt: 'Refactor create_user in user.py to use a single options dict instead of 5 positional params. Edit the file in place.',
    setup: `cat > user.py << 'EOF'
def create_user(name, email, age, role, active):
    return {
        "name": name,
        "email": email,
        "age": age,
        "role": role,
        "active": active,
    }
EOF`,
    assertions: [
      { type: 'file-contains', target: 'user.py', value: 'options' },
    ],
  },
  {
    id: 'refactor-004',
    category: 'refactoring',
    description: 'Replace nested ternary with clear if/else',
    prompt: 'Refactor the nested ternary in grade.py to use if/elif/else for readability. Edit the file in place.',
    setup: `cat > grade.py << 'EOF'
def get_grade(score):
    return "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D" if score >= 60 else "F"
EOF`,
    assertions: [
      { type: 'file-contains', target: 'grade.py', value: 'elif' },
    ],
  },
  {
    id: 'refactor-005',
    category: 'refactoring',
    description: 'Extract magic numbers into named constants',
    prompt: 'Refactor tax.py to replace all magic numbers with named constants. Edit the file in place.',
    setup: `cat > tax.py << 'EOF'
def calculate_tax(income):
    if income > 100000:
        return income * 0.35
    elif income > 50000:
        return income * 0.25
    else:
        return income * 0.15
EOF`,
    assertions: [
      { type: 'file-contains', target: 'tax.py', value: '=' },
      { type: 'file-not-contains', target: 'tax.py', value: '0.35' },
    ],
  },
  {
    id: 'refactor-006',
    category: 'refactoring',
    description: 'Replace list comprehension with generator for memory efficiency',
    prompt: 'Refactor process.py to use a generator instead of a list comprehension in the large_squares function. Edit the file in place.',
    setup: `cat > process.py << 'EOF'
def large_squares(n):
    return [x * x for x in range(n) if x * x > 100]
EOF`,
    assertions: [
      { type: 'file-contains', target: 'process.py', value: 'yield' },
    ],
  },
  {
    id: 'refactor-007',
    category: 'refactoring',
    description: 'Split long function into smaller functions',
    prompt: 'Refactor report.py. The generate_report function is too long — split it into at least 3 smaller functions. Edit the file in place.',
    setup: `cat > report.py << 'EOF'
def generate_report(data):
    if not data:
        raise ValueError("no data")
    if not isinstance(data, list):
        raise TypeError("data must be a list")
    cleaned = [x for x in data if x is not None]
    doubled = [x * 2 for x in cleaned]
    lines = [f"Item: {x}" for x in doubled]
    return "\n".join(lines)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'report.py', value: 'def validate' },
    ],
  },
  {
    id: 'refactor-008',
    category: 'refactoring',
    description: 'Replace string formatting with f-strings',
    prompt: 'Refactor logger.py to use f-strings instead of % formatting. Edit the file in place.',
    setup: `cat > logger.py << 'EOF'
def log(level, message, user):
    print("[%s] User %s: %s" % (level, user, message))

def warn(message, user):
    print("[WARN] User %s: %s" % (user, message))
EOF`,
    assertions: [
      { type: 'file-contains', target: 'logger.py', value: 'f"' },
      { type: 'file-not-contains', target: 'logger.py', value: '% (' },
    ],
  },
  {
    id: 'refactor-009',
    category: 'refactoring',
    description: 'Replace class with dataclass',
    prompt: 'Refactor point.py to use Python dataclass instead of a manual __init__. Edit the file in place.',
    setup: `cat > point.py << 'EOF'
class Point:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
EOF`,
    assertions: [
      { type: 'file-contains', target: 'point.py', value: '@dataclass' },
    ],
  },
  {
    id: 'refactor-010',
    category: 'refactoring',
    description: 'Simplify boolean expression',
    prompt: 'Refactor check.py to simplify the overly verbose boolean logic. Edit the file in place.',
    setup: `cat > check.py << 'EOF'
def is_valid(x):
    if x > 0:
        if x < 100:
            return True
        else:
            return False
    else:
        return False
EOF`,
    assertions: [
      { type: 'file-contains', target: 'check.py', value: 'return 0 < x < 100' },
    ],
  },
  {
    id: 'refactor-011',
    category: 'refactoring',
    description: 'Replace open/close with context manager',
    prompt: 'Refactor files.py to use context managers instead of manual open/close calls. Edit the file in place.',
    setup: `cat > files.py << 'EOF'
def read(path):
    f = open(path)
    data = f.read()
    f.close()
    return data

def write(path, content):
    f = open(path, 'w')
    f.write(content)
    f.close()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'files.py', value: 'with open' },
      { type: 'file-not-contains', target: 'files.py', value: '.close()' },
    ],
  },
  {
    id: 'refactor-012',
    category: 'refactoring',
    description: 'Replace print statements with proper logging',
    prompt: 'Refactor pipeline.py to use the logging module instead of print statements. Edit the file in place.',
    setup: `cat > pipeline.py << 'EOF'
def run_pipeline(data):
    print("Starting pipeline")
    result = process(data)
    print("Pipeline complete:", result)
    return result

def process(data):
    print("Processing", len(data), "items")
    return [x * 2 for x in data]
EOF`,
    assertions: [
      { type: 'file-contains', target: 'pipeline.py', value: 'import logging' },
      { type: 'file-not-contains', target: 'pipeline.py', value: 'print(' },
    ],
  },
  {
    id: 'refactor-013',
    category: 'refactoring',
    description: 'Move hardcoded config into a config dict',
    prompt: 'Refactor server.py to move all hardcoded values into a CONFIG dict at the top. Edit the file in place.',
    setup: `cat > server.py << 'EOF'
def start():
    host = "0.0.0.0"
    port = 8080
    workers = 4
    timeout = 30
    print(f"Starting on {host}:{port} with {workers} workers")
EOF`,
    assertions: [
      { type: 'file-contains', target: 'server.py', value: 'CONFIG' },
    ],
  },
  {
    id: 'refactor-014',
    category: 'refactoring',
    description: 'Convert for loop to list comprehension',
    prompt: 'Refactor transform.py to use list comprehensions instead of for loops with append. Edit the file in place.',
    setup: `cat > transform.py << 'EOF'
def double_evens(numbers):
    result = []
    for n in numbers:
        if n % 2 == 0:
            result.append(n * 2)
    return result

def to_upper(words):
    result = []
    for w in words:
        result.append(w.upper())
    return result
EOF`,
    assertions: [
      { type: 'file-contains', target: 'transform.py', value: 'for n in' },
      { type: 'file-not-contains', target: 'transform.py', value: '.append(' },
    ],
  },
  {
    id: 'refactor-015',
    category: 'refactoring',
    description: 'Replace isinstance chain with dict dispatch',
    prompt: 'Refactor handler.py to replace the isinstance chain with a dispatch dict. Edit the file in place.',
    setup: `cat > handler.py << 'EOF'
def handle(event):
    if isinstance(event, str):
        return "string: " + event
    elif isinstance(event, int):
        return "int: " + str(event)
    elif isinstance(event, list):
        return "list of " + str(len(event))
    else:
        return "unknown"
EOF`,
    assertions: [
      { type: 'file-contains', target: 'handler.py', value: 'handlers' },
    ],
  },
  {
    id: 'refactor-016',
    category: 'refactoring',
    description: 'Extract repeated string formatting into a helper',
    prompt: 'Refactor report.py to extract the repeated currency formatting into a single format_currency helper function. Edit the file in place.',
    setup: `cat > report.py << 'EOF'
def summary(revenue, cost, profit):
    return {
        "revenue": "$" + "{:.2f}".format(revenue),
        "cost": "$" + "{:.2f}".format(cost),
        "profit": "$" + "{:.2f}".format(profit),
    }
EOF`,
    assertions: [
      { type: 'file-contains', target: 'report.py', value: 'def format_currency' },
    ],
  },
  {
    id: 'refactor-017',
    category: 'refactoring',
    description: 'Replace manual None defaults with or operator',
    prompt: 'Refactor config.py to use "or" defaults instead of explicit None checks. Edit the file in place.',
    setup: `cat > config.py << 'EOF'
def get_config(overrides):
    host = overrides.get("host")
    if host is None:
        host = "localhost"
    port = overrides.get("port")
    if port is None:
        port = 3000
    return {"host": host, "port": port}
EOF`,
    assertions: [
      { type: 'file-not-contains', target: 'config.py', value: 'is None' },
    ],
  },
  {
    id: 'refactor-018',
    category: 'refactoring',
    description: 'Replace manual min/max with built-ins',
    prompt: 'Refactor stats.py to use Python built-in min() and max() instead of manual loops. Edit the file in place.',
    setup: `cat > stats.py << 'EOF'
def get_min(numbers):
    result = numbers[0]
    for n in numbers:
        if n < result:
            result = n
    return result

def get_max(numbers):
    result = numbers[0]
    for n in numbers:
        if n > result:
            result = n
    return result
EOF`,
    assertions: [
      { type: 'file-contains', target: 'stats.py', value: 'return min(' },
      { type: 'file-contains', target: 'stats.py', value: 'return max(' },
    ],
  },
  {
    id: 'refactor-019',
    category: 'refactoring',
    description: 'Flatten deeply nested conditionals',
    prompt: 'Refactor process.py to use early returns to flatten the nested if statements. Edit the file in place.',
    setup: `cat > process.py << 'EOF'
def process(user, data):
    if user is not None:
        if user.get("active"):
            if data is not None:
                if len(data) > 0:
                    return [x * 2 for x in data]
    return []
EOF`,
    assertions: [
      { type: 'file-contains', target: 'process.py', value: 'return []' },
    ],
  },
  {
    id: 'refactor-020',
    category: 'refactoring',
    description: 'Replace string concatenation in loop with join',
    prompt: 'Refactor builder.py to use str.join instead of += in a loop for efficiency. Edit the file in place.',
    setup: `cat > builder.py << 'EOF'
def build_csv(rows):
    result = ""
    for row in rows:
        result += ",".join(str(x) for x in row) + "\n"
    return result
EOF`,
    assertions: [
      { type: 'file-contains', target: 'builder.py', value: 'join(' },
    ],
  },
  {
    id: 'refactor-021',
    category: 'refactoring',
    description: 'Add __slots__ to reduce memory usage',
    prompt: 'Refactor particle.py to use __slots__ on the Particle class to reduce per-instance memory. Edit the file in place.',
    setup: `cat > particle.py << 'EOF'
class Particle:
    def __init__(self, x, y, z, mass):
        self.x = x
        self.y = y
        self.z = z
        self.mass = mass
EOF`,
    assertions: [
      { type: 'file-contains', target: 'particle.py', value: '__slots__' },
    ],
  },
  {
    id: 'refactor-022',
    category: 'refactoring',
    description: 'Replace global mutable state with function parameter',
    prompt: 'Refactor cache.py to remove the global variable and pass state as a parameter instead. Edit the file in place.',
    setup: `cat > cache.py << 'EOF'
_cache = {}

def get(key):
    return _cache.get(key)

def set(key, value):
    _cache[key] = value

def clear():
    _cache.clear()
EOF`,
    assertions: [
      { type: 'file-not-contains', target: 'cache.py', value: '_cache = {}' },
    ],
  },
  {
    id: 'refactor-023',
    category: 'refactoring',
    description: 'Convert module-level code into a main function',
    prompt: 'Refactor script.py to wrap all module-level code inside a main() function called under if __name__ == "__main__". Edit the file in place.',
    setup: `cat > script.py << 'EOF'
import sys

data = [1, 2, 3, 4, 5]
total = sum(data)
print("Total:", total)
sys.exit(0)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'script.py', value: 'def main()' },
      { type: 'file-contains', target: 'script.py', value: '__main__' },
    ],
  },
  {
    id: 'refactor-024',
    category: 'refactoring',
    description: 'Replace dict.keys() iteration with direct dict iteration',
    prompt: 'Refactor inventory.py to iterate directly over the dict instead of calling .keys(). Edit the file in place.',
    setup: `cat > inventory.py << 'EOF'
def summarize(stock):
    for key in stock.keys():
        print(key, stock[key])
EOF`,
    assertions: [
      { type: 'file-not-contains', target: 'inventory.py', value: '.keys()' },
    ],
  },
  {
    id: 'refactor-025',
    category: 'refactoring',
    description: 'Consolidate duplicate error messages into constants',
    prompt: 'Refactor errors.py to define error message strings as module-level constants instead of duplicating them inline. Edit the file in place.',
    setup: `cat > errors.py << 'EOF'
def validate_name(name):
    if not name:
        raise ValueError("Name cannot be empty")

def validate_email(email):
    if not email:
        raise ValueError("Email cannot be empty")

def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
EOF`,
    assertions: [
      { type: 'file-contains', target: 'errors.py', value: 'EMPTY_MSG' },
    ],
  },
];
