import { Scenario } from '../types';

export const newFeatureScenarios: Scenario[] = [
  {
    id: 'feat-001',
    category: 'new-features',
    description: 'Add __repr__ method to a class',
    prompt: 'Add a __repr__ method to the Product class in product.py.',
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
    prompt: 'Add input validation to divide in math.py. Raise ValueError if denominator is 0, TypeError if inputs are not numbers.',
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
    prompt: 'Add retry logic to fetch_url in http.py. Retry up to 3 times on failure with 1 second delay.',
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
    prompt: 'Add pagination support to get_items in store.py. Add page and page_size parameters.',
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
    prompt: 'Add memoization to the fibonacci function in fib.py using functools.lru_cache.',
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
    prompt: 'Add Python logging to process_order in orders.py. Log at INFO level when order starts and completes.',
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
    prompt: 'Add __enter__ and __exit__ methods to the DatabaseConnection class in db.py.',
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
    prompt: 'Add argparse-based CLI argument parsing to script.py. Add --input and --output arguments.',
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
    prompt: 'Add type hints to all function signatures in utils.py.',
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
    prompt: 'Write a test file test_calculator.py with pytest tests for all functions in calculator.py.',
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
];
