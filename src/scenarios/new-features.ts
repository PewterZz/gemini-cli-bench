import { Scenario } from '../types';

export const newFeatureScenarios: Scenario[] = [
  {
    id: 'feat-001',
    category: 'new-features',
    description: 'Add __repr__ method to a class',
    prompt: 'Add a __repr__ method to the Product class in product.py. Edit the file in place.',
    setup: `cat > product.py << 'EOF'
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
EOF`,
    assertions: [
      { type: 'file-contains', target: 'product.py', value: '__repr__' },
    ],
  },
  {
    id: 'feat-002',
    category: 'new-features',
    description: 'Add input validation to a function',
    prompt: 'Add input validation to divide in math.py. Raise ValueError if denominator is 0, TypeError if inputs are not numbers. Edit the file in place.',
    setup: `cat > math.py << 'EOF'
def divide(a, b):
    return a / b
EOF`,
    assertions: [
      { type: 'file-contains', target: 'math.py', value: 'ValueError' },
      { type: 'file-contains', target: 'math.py', value: 'TypeError' },
    ],
  },
  {
    id: 'feat-003',
    category: 'new-features',
    description: 'Add retry logic to an HTTP function',
    prompt: 'Add retry logic to fetch_url in http.py. Retry up to 3 times on failure with 1 second delay. Edit the file in place.',
    setup: `cat > http.py << 'EOF'
import urllib.request

def fetch_url(url):
    response = urllib.request.urlopen(url)
    return response.read().decode()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'http.py', value: 'retry' },
    ],
  },
  {
    id: 'feat-004',
    category: 'new-features',
    description: 'Add pagination to a list function',
    prompt: 'Add pagination support to get_items in store.py. Add page and page_size parameters. Edit the file in place.',
    setup: `cat > store.py << 'EOF'
ITEMS = list(range(100))

def get_items():
    return ITEMS
EOF`,
    assertions: [
      { type: 'file-contains', target: 'store.py', value: 'page' },
      { type: 'file-contains', target: 'store.py', value: 'page_size' },
    ],
  },
  {
    id: 'feat-005',
    category: 'new-features',
    description: 'Add caching with lru_cache',
    prompt: 'Add memoization to the fibonacci function in fib.py using functools.lru_cache. Edit the file in place.',
    setup: `cat > fib.py << 'EOF'
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'fib.py', value: 'lru_cache' },
    ],
  },
  {
    id: 'feat-006',
    category: 'new-features',
    description: 'Add logging to an existing function',
    prompt: 'Add Python logging to process_order in orders.py. Log at INFO level when order starts and completes. Edit the file in place.',
    setup: `cat > orders.py << 'EOF'
def process_order(order_id, items):
    total = sum(item["price"] for item in items)
    return {"order_id": order_id, "total": total, "status": "processed"}
EOF`,
    assertions: [
      { type: 'file-contains', target: 'orders.py', value: 'import logging' },
      { type: 'file-contains', target: 'orders.py', value: '.info(' },
    ],
  },
  {
    id: 'feat-007',
    category: 'new-features',
    description: 'Add a context manager to a resource class',
    prompt: 'Add __enter__ and __exit__ methods to the DatabaseConnection class in db.py. Edit the file in place.',
    setup: `cat > db.py << 'EOF'
class DatabaseConnection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connected = False

    def connect(self):
        self.connected = True

    def disconnect(self):
        self.connected = False
EOF`,
    assertions: [
      { type: 'file-contains', target: 'db.py', value: '__enter__' },
      { type: 'file-contains', target: 'db.py', value: '__exit__' },
    ],
  },
  {
    id: 'feat-008',
    category: 'new-features',
    description: 'Add a CLI argument parser',
    prompt: 'Add argparse-based CLI argument parsing to script.py. Add --input and --output arguments. Edit the file in place.',
    setup: `cat > script.py << 'EOF'
def main():
    print("running script")

if __name__ == "__main__":
    main()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'script.py', value: 'argparse' },
      { type: 'file-contains', target: 'script.py', value: '--input' },
      { type: 'file-contains', target: 'script.py', value: '--output' },
    ],
  },
  {
    id: 'feat-009',
    category: 'new-features',
    description: 'Add type hints to all functions',
    prompt: 'Add type hints to all function signatures in utils.py. Edit the file in place.',
    setup: `cat > utils.py << 'EOF'
def add(a, b):
    return a + b

def greet(name):
    return f"Hello, {name}"

def get_items(data, limit):
    return data[:limit]
EOF`,
    assertions: [
      { type: 'file-contains', target: 'utils.py', value: 'int' },
      { type: 'file-contains', target: 'utils.py', value: 'str' },
    ],
  },
  {
    id: 'feat-010',
    category: 'new-features',
    description: 'Add a unit test file',
    prompt: 'Write a test file test_calculator.py with pytest tests for all functions in calculator.py. Edit the file in place.',
    setup: `cat > calculator.py << 'EOF'
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b
EOF`,
    assertions: [
      { type: 'file-exists', target: 'test_calculator.py', value: '' },
      { type: 'file-contains', target: 'test_calculator.py', value: 'def test_' },
    ],
  },
  {
    id: 'feat-011',
    category: 'new-features',
    description: 'Add a property with getter and setter',
    prompt: 'Add a temperature property to the Sensor class in sensor.py with a getter and a setter that rejects negative values. Edit the file in place.',
    setup: `cat > sensor.py << 'EOF'
class Sensor:
    def __init__(self, name):
        self.name = name
        self._temperature = 0.0
EOF`,
    assertions: [
      { type: 'file-contains', target: 'sensor.py', value: '@property' },
      { type: 'file-contains', target: 'sensor.py', value: '@temperature.setter' },
    ],
  },
  {
    id: 'feat-012',
    category: 'new-features',
    description: 'Add rate limiting decorator',
    prompt: 'Add a rate_limit decorator to decorators.py that restricts calls to at most N per second. Edit the file in place.',
    setup: `cat > decorators.py << 'EOF'
import time

# Add a rate_limit(calls_per_second) decorator here
EOF`,
    assertions: [
      { type: 'file-contains', target: 'decorators.py', value: 'def rate_limit' },
      { type: 'file-contains', target: 'decorators.py', value: 'def decorator' },
    ],
  },
  {
    id: 'feat-013',
    category: 'new-features',
    description: 'Add CSV export method to a class',
    prompt: 'Add a to_csv() method to the Report class in report.py that writes its data to a CSV string. Edit the file in place.',
    setup: `cat > report.py << 'EOF'
class Report:
    def __init__(self, headers, rows):
        self.headers = headers
        self.rows = rows
EOF`,
    assertions: [
      { type: 'file-contains', target: 'report.py', value: 'def to_csv' },
      { type: 'file-contains', target: 'report.py', value: 'csv' },
    ],
  },
  {
    id: 'feat-014',
    category: 'new-features',
    description: 'Add environment variable config loading',
    prompt: 'Add a load_from_env() function to config.py that reads DATABASE_URL, PORT, and DEBUG from environment variables, with defaults. Edit the file in place.',
    setup: `cat > config.py << 'EOF'
DEFAULT_PORT = 3000
DEFAULT_DEBUG = False
EOF`,
    assertions: [
      { type: 'file-contains', target: 'config.py', value: 'load_from_env' },
      { type: 'file-contains', target: 'config.py', value: 'os.environ' },
    ],
  },
  {
    id: 'feat-015',
    category: 'new-features',
    description: 'Add sorting support to a collection class',
    prompt: 'Add a sorted_by(key) method to the Catalog class in catalog.py that returns items sorted by the given attribute. Edit the file in place.',
    setup: `cat > catalog.py << 'EOF'
class Catalog:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'catalog.py', value: 'def sorted_by' },
      { type: 'file-contains', target: 'catalog.py', value: 'sorted(' },
    ],
  },
  {
    id: 'feat-016',
    category: 'new-features',
    description: 'Add JSON serialization to a class',
    prompt: 'Add to_json() and from_json() class methods to the Config class in settings.py. Edit the file in place.',
    setup: `cat > settings.py << 'EOF'
class Config:
    def __init__(self, host, port, debug):
        self.host = host
        self.port = port
        self.debug = debug
EOF`,
    assertions: [
      { type: 'file-contains', target: 'settings.py', value: 'def to_json' },
      { type: 'file-contains', target: 'settings.py', value: 'def from_json' },
      { type: 'file-contains', target: 'settings.py', value: 'import json' },
    ],
  },
  {
    id: 'feat-017',
    category: 'new-features',
    description: 'Add timeout support to a function',
    prompt: 'Add a timeout parameter to run_task in tasks.py that raises TimeoutError if the function exceeds the limit. Edit the file in place.',
    setup: `cat > tasks.py << 'EOF'
import time

def run_task(fn, *args):
    return fn(*args)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'tasks.py', value: 'timeout' },
      { type: 'file-contains', target: 'tasks.py', value: 'TimeoutError' },
    ],
  },
  {
    id: 'feat-018',
    category: 'new-features',
    description: 'Add filtering to a query function',
    prompt: 'Add keyword filter support to search_products in products.py. The function should accept optional min_price and max_price parameters. Edit the file in place.',
    setup: `cat > products.py << 'EOF'
PRODUCTS = [
    {"name": "apple", "price": 1.0},
    {"name": "laptop", "price": 999.0},
    {"name": "book", "price": 15.0},
]

def search_products(query):
    return [p for p in PRODUCTS if query.lower() in p["name"].lower()]
EOF`,
    assertions: [
      { type: 'file-contains', target: 'products.py', value: 'min_price' },
      { type: 'file-contains', target: 'products.py', value: 'max_price' },
    ],
  },
  {
    id: 'feat-019',
    category: 'new-features',
    description: 'Add __eq__ and __hash__ to a class',
    prompt: 'Add __eq__ and __hash__ methods to the Color class in colors.py so instances can be compared and used in sets/dicts. Edit the file in place.',
    setup: `cat > colors.py << 'EOF'
class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b
EOF`,
    assertions: [
      { type: 'file-contains', target: 'colors.py', value: '__eq__' },
      { type: 'file-contains', target: 'colors.py', value: '__hash__' },
    ],
  },
  {
    id: 'feat-020',
    category: 'new-features',
    description: 'Add batch processing to a single-item function',
    prompt: 'Add a process_batch(items) function to processor.py that calls process_item on each item and returns a list of results. Edit the file in place.',
    setup: `cat > processor.py << 'EOF'
def process_item(item):
    return item.strip().upper()
EOF`,
    assertions: [
      { type: 'file-contains', target: 'processor.py', value: 'def process_batch' },
    ],
  },
  {
    id: 'feat-021',
    category: 'new-features',
    description: 'Add structured error class hierarchy',
    prompt: 'Add AppError, ValidationError, and NotFoundError exception classes to exceptions.py. ValidationError and NotFoundError should inherit from AppError. Edit the file in place.',
    setup: `cat > exceptions.py << 'EOF'
# Define custom exceptions here
EOF`,
    assertions: [
      { type: 'file-contains', target: 'exceptions.py', value: 'class AppError' },
      { type: 'file-contains', target: 'exceptions.py', value: 'class ValidationError' },
      { type: 'file-contains', target: 'exceptions.py', value: 'class NotFoundError' },
    ],
  },
  {
    id: 'feat-022',
    category: 'new-features',
    description: 'Add configurable output format to a reporter',
    prompt: 'Add a format parameter to generate_report in reporter.py supporting "text" and "json" output. Edit the file in place.',
    setup: `cat > reporter.py << 'EOF'
def generate_report(data):
    lines = [f"- {k}: {v}" for k, v in data.items()]
    return "\n".join(lines)
EOF`,
    assertions: [
      { type: 'file-contains', target: 'reporter.py', value: 'format' },
      { type: 'file-contains', target: 'reporter.py', value: 'json' },
    ],
  },
  {
    id: 'feat-023',
    category: 'new-features',
    description: 'Add iteration support to a custom class',
    prompt: 'Add __iter__ and __next__ to the NumberRange class in ranges.py so it can be used in a for loop. Edit the file in place.',
    setup: `cat > ranges.py << 'EOF'
class NumberRange:
    def __init__(self, start, end):
        self.start = start
        self.end = end
EOF`,
    assertions: [
      { type: 'file-contains', target: 'ranges.py', value: '__iter__' },
      { type: 'file-contains', target: 'ranges.py', value: '__next__' },
    ],
  },
  {
    id: 'feat-024',
    category: 'new-features',
    description: 'Add health check endpoint to Flask app',
    prompt: 'Add a /health GET endpoint to app.py that returns JSON {"status": "ok"}. Edit the file in place.',
    setup: `cat > app.py << 'EOF'
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World'
EOF`,
    assertions: [
      { type: 'file-contains', target: 'app.py', value: '/health' },
      { type: 'file-contains', target: 'app.py', value: 'status' },
    ],
  },
  {
    id: 'feat-025',
    category: 'new-features',
    description: 'Add diff functionality between two text files',
    prompt: 'Add a diff_files(path_a, path_b) function to differ.py that returns the unified diff between two files as a string. Edit the file in place.',
    setup: `cat > differ.py << 'EOF'
# Add diff_files function here
EOF`,
    assertions: [
      { type: 'file-contains', target: 'differ.py', value: 'def diff_files' },
      { type: 'file-contains', target: 'differ.py', value: 'difflib' },
    ],
  },
];
