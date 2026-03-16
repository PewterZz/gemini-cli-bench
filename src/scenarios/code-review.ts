import { Scenario } from '../types';

export const codeReviewScenarios: Scenario[] = [
  {
    id: 'review-001',
    category: 'code-review',
    description: 'Identify SQL injection vulnerability',
    prompt: 'Review db.py and identify any security issues. Create a file issues.txt listing each problem.',
    setup: `cat > db.py << 'EOF'
import sqlite3

def get_user(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = '" + username + "'")
    return cursor.fetchone()
EOF`,
    assertions: [
      { type: 'file-exists', target: 'issues.txt', value: '' },
      { type: 'file-contains', target: 'issues.txt', value: 'SQL' },
    ],
  },
  {
    id: 'review-002',
    category: 'code-review',
    description: 'Flag hardcoded credentials',
    prompt: 'Review config.py for security issues and write a report to security-report.txt.',
    setup: `cat > config.py << 'EOF'
DATABASE_URL = "postgresql://admin:supersecret123@localhost:5432/mydb"
API_KEY = "sk-1234567890abcdef"
SECRET_KEY = "my-secret-jwt-key"

def get_db():
    return DATABASE_URL
EOF`,
    assertions: [
      { type: 'file-exists', target: 'security-report.txt', value: '' },
      { type: 'file-contains', target: 'security-report.txt', value: 'hardcoded' },
    ],
  },
  {
    id: 'review-003',
    category: 'code-review',
    description: 'Catch missing error handling',
    prompt: 'Review file_handler.py. List all places where exceptions could crash the program and write them to review.txt.',
    setup: `cat > file_handler.py << 'EOF'
def read_config(path):
    f = open(path)
    data = f.read()
    f.close()
    return data

def write_output(path, content):
    f = open(path, "w")
    f.write(content)
    f.close()
EOF`,
    assertions: [
      { type: 'file-exists', target: 'review.txt', value: '' },
    ],
  },
  {
    id: 'review-004',
    category: 'code-review',
    description: 'Identify inefficient algorithm',
    prompt: 'Review performance.py and write a report to perf-report.txt describing any performance issues.',
    setup: `cat > performance.py << 'EOF'
def find_duplicates(items):
    duplicates = []
    for i in range(len(items)):
        for j in range(len(items)):
            if i != j and items[i] == items[j]:
                if items[i] not in duplicates:
                    duplicates.append(items[i])
    return duplicates
EOF`,
    assertions: [
      { type: 'file-exists', target: 'perf-report.txt', value: '' },
      { type: 'file-contains', target: 'perf-report.txt', value: 'O(n' },
    ],
  },
  {
    id: 'review-005',
    category: 'code-review',
    description: 'Spot missing input sanitization in web handler',
    prompt: 'Review handler.py for input sanitization issues. Write findings to findings.txt.',
    setup: `cat > handler.py << 'EOF'
from html import escape

def handle_comment(user_input):
    # Render user comment directly in HTML template
    html = f"<div class='comment'>{user_input}</div>"
    return html

def handle_search(query):
    results = search_db(query)
    return results
EOF`,
    assertions: [
      { type: 'file-exists', target: 'findings.txt', value: '' },
      { type: 'file-contains', target: 'findings.txt', value: 'XSS' },
    ],
  },
  {
    id: 'review-006',
    category: 'code-review',
    description: 'Identify race condition in multi-threaded code',
    prompt: 'Review counter.py for thread safety issues. Write a report to thread-report.txt.',
    setup: `cat > counter.py << 'EOF'
import threading

counter = 0

def increment():
    global counter
    current = counter
    counter = current + 1

threads = [threading.Thread(target=increment) for _ in range(100)]
EOF`,
    assertions: [
      { type: 'file-exists', target: 'thread-report.txt', value: '' },
      { type: 'file-contains', target: 'thread-report.txt', value: 'race' },
    ],
  },
  {
    id: 'review-007',
    category: 'code-review',
    description: 'Flag use of deprecated API',
    prompt: 'Review crypto.py and identify any use of deprecated or insecure cryptographic functions. Write to crypto-review.txt.',
    setup: `cat > crypto.py << 'EOF'
import hashlib

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

def verify_password(password, stored_hash):
    return hash_password(password) == stored_hash
EOF`,
    assertions: [
      { type: 'file-exists', target: 'crypto-review.txt', value: '' },
      { type: 'file-contains', target: 'crypto-review.txt', value: 'MD5' },
    ],
  },
  {
    id: 'review-008',
    category: 'code-review',
    description: 'Identify missing pagination causing memory issues',
    prompt: 'Review api.py and identify scalability issues. Write to scalability.txt.',
    setup: `cat > api.py << 'EOF'
import sqlite3

def get_all_orders():
    conn = sqlite3.connect("orders.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders")
    return cursor.fetchall()  # Could return millions of rows
EOF`,
    assertions: [
      { type: 'file-exists', target: 'scalability.txt', value: '' },
      { type: 'file-contains', target: 'scalability.txt', value: 'pagination' },
    ],
  },
  {
    id: 'review-009',
    category: 'code-review',
    description: 'Spot missing __all__ export control',
    prompt: 'Review the module.py file and suggest improvements to its public API design. Write suggestions to api-design.txt.',
    setup: `cat > module.py << 'EOF'
def _internal_helper():
    pass

def public_function():
    return _internal_helper()

def another_public():
    pass

SECRET_KEY = "do-not-export-this"
EOF`,
    assertions: [
      { type: 'file-exists', target: 'api-design.txt', value: '' },
      { type: 'file-contains', target: 'api-design.txt', value: '__all__' },
    ],
  },
  {
    id: 'review-010',
    category: 'code-review',
    description: 'Identify inconsistent error handling patterns',
    prompt: 'Review service.py and document all inconsistencies in error handling to inconsistencies.txt.',
    setup: `cat > service.py << 'EOF'
def get_user(id):
    if id <= 0:
        return None  # Returns None on error

def create_user(data):
    if not data:
        raise ValueError("data required")  # Raises exception

def delete_user(id):
    if id <= 0:
        return False  # Returns False on error

def update_user(id, data):
    if id <= 0:
        raise RuntimeError("bad id")  # Different exception type
EOF`,
    assertions: [
      { type: 'file-exists', target: 'inconsistencies.txt', value: '' },
      { type: 'file-contains', target: 'inconsistencies.txt', value: 'inconsistent' },
    ],
  },
];
