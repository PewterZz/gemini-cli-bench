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
    return cursor.fetchall()
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
        return None

def create_user(data):
    if not data:
        raise ValueError("data required")

def delete_user(id):
    if id <= 0:
        return False

def update_user(id, data):
    if id <= 0:
        raise RuntimeError("bad id")
EOF`,
    assertions: [
      { type: 'file-exists', target: 'inconsistencies.txt', value: '' },
      { type: 'file-contains', target: 'inconsistencies.txt', value: 'inconsistent' },
    ],
  },
  {
    id: 'review-011',
    category: 'code-review',
    description: 'Identify path traversal vulnerability',
    prompt: 'Review server.py for directory traversal vulnerabilities and write findings to vuln-report.txt.',
    setup: `cat > server.py << 'EOF'
import os

def serve_file(base_dir, filename):
    path = os.path.join(base_dir, filename)
    with open(path) as f:
        return f.read()
EOF`,
    assertions: [
      { type: 'file-exists', target: 'vuln-report.txt', value: '' },
      { type: 'file-contains', target: 'vuln-report.txt', value: 'traversal' },
    ],
  },
  {
    id: 'review-012',
    category: 'code-review',
    description: 'Flag unbounded resource consumption',
    prompt: 'Review uploader.py for resource consumption issues and write a report to resource-report.txt.',
    setup: `cat > uploader.py << 'EOF'
def handle_upload(file_data):
    content = file_data.read()
    process(content)
    return len(content)
EOF`,
    assertions: [
      { type: 'file-exists', target: 'resource-report.txt', value: '' },
      { type: 'file-contains', target: 'resource-report.txt', value: 'size' },
    ],
  },
  {
    id: 'review-013',
    category: 'code-review',
    description: 'Identify missing index on frequently queried column',
    prompt: 'Review schema.sql and identify any missing database indexes. Write recommendations to db-review.txt.',
    setup: `cat > schema.sql << 'EOF'
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    status TEXT,
    created_at TIMESTAMP
);
EOF`,
    assertions: [
      { type: 'file-exists', target: 'db-review.txt', value: '' },
      { type: 'file-contains', target: 'db-review.txt', value: 'index' },
    ],
  },
  {
    id: 'review-014',
    category: 'code-review',
    description: 'Spot insecure random number generation',
    prompt: 'Review token.py for cryptographic weaknesses and write findings to crypto-issues.txt.',
    setup: `cat > token.py << 'EOF'
import random
import string

def generate_token(length=32):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))
EOF`,
    assertions: [
      { type: 'file-exists', target: 'crypto-issues.txt', value: '' },
      { type: 'file-contains', target: 'crypto-issues.txt', value: 'secrets' },
    ],
  },
  {
    id: 'review-015',
    category: 'code-review',
    description: 'Identify N+1 query problem',
    prompt: 'Review orm.py for database query efficiency issues and write findings to query-review.txt.',
    setup: `cat > orm.py << 'EOF'
def get_posts_with_authors(db):
    posts = db.query("SELECT * FROM posts")
    for post in posts:
        author = db.query(f"SELECT * FROM users WHERE id = {post['user_id']}")
        post['author'] = author
    return posts
EOF`,
    assertions: [
      { type: 'file-exists', target: 'query-review.txt', value: '' },
      { type: 'file-contains', target: 'query-review.txt', value: 'N+1' },
    ],
  },
  {
    id: 'review-016',
    category: 'code-review',
    description: 'Flag overly broad exception handling that hides bugs',
    prompt: 'Review worker.py for problematic exception handling and write findings to error-review.txt.',
    setup: `cat > worker.py << 'EOF'
def run_job(job):
    try:
        result = job.execute()
        job.mark_complete(result)
    except:
        pass
EOF`,
    assertions: [
      { type: 'file-exists', target: 'error-review.txt', value: '' },
      { type: 'file-contains', target: 'error-review.txt', value: 'bare except' },
    ],
  },
  {
    id: 'review-017',
    category: 'code-review',
    description: 'Identify TOCTOU race condition in file check',
    prompt: 'Review save.py for race conditions and write findings to race-conditions.txt.',
    setup: `cat > save.py << 'EOF'
import os

def save_file(path, content):
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write(content)
    else:
        raise FileExistsError(f"{path} already exists")
EOF`,
    assertions: [
      { type: 'file-exists', target: 'race-conditions.txt', value: '' },
      { type: 'file-contains', target: 'race-conditions.txt', value: 'TOCTOU' },
    ],
  },
  {
    id: 'review-018',
    category: 'code-review',
    description: 'Review for missing input length limits',
    prompt: 'Review registration.py for input validation gaps and write findings to validation-issues.txt.',
    setup: `cat > registration.py << 'EOF'
def register_user(username, password, bio):
    if not username or not password:
        raise ValueError("username and password required")
    return {
        "username": username,
        "password": hash(password),
        "bio": bio,
    }
EOF`,
    assertions: [
      { type: 'file-exists', target: 'validation-issues.txt', value: '' },
      { type: 'file-contains', target: 'validation-issues.txt', value: 'length' },
    ],
  },
  {
    id: 'review-019',
    category: 'code-review',
    description: 'Spot missing connection pool / connection leak',
    prompt: 'Review queries.py for database connection management issues and write a report to conn-review.txt.',
    setup: `cat > queries.py << 'EOF'
import sqlite3

def get_record(id):
    conn = sqlite3.connect("data.db")
    row = conn.execute("SELECT * FROM records WHERE id=?", (id,)).fetchone()
    return row

def delete_record(id):
    conn = sqlite3.connect("data.db")
    conn.execute("DELETE FROM records WHERE id=?", (id,))
    conn.commit()
EOF`,
    assertions: [
      { type: 'file-exists', target: 'conn-review.txt', value: '' },
      { type: 'file-contains', target: 'conn-review.txt', value: 'close' },
    ],
  },
  {
    id: 'review-020',
    category: 'code-review',
    description: 'Identify missing CSRF protection note in form handler',
    prompt: 'Review form.py for web security issues and write findings to web-security.txt.',
    setup: `cat > form.py << 'EOF'
def handle_form_submit(request):
    username = request.get("username")
    new_email = request.get("email")
    update_user_email(username, new_email)
    return {"success": True}
EOF`,
    assertions: [
      { type: 'file-exists', target: 'web-security.txt', value: '' },
      { type: 'file-contains', target: 'web-security.txt', value: 'CSRF' },
    ],
  },
  {
    id: 'review-021',
    category: 'code-review',
    description: 'Flag synchronous blocking call in async context',
    prompt: 'Review async_service.py for blocking calls that could degrade async performance. Write findings to async-issues.txt.',
    setup: `cat > async_service.py << 'EOF'
import asyncio
import time

async def process_request(data):
    result = heavy_computation(data)
    time.sleep(0.1)
    return result

def heavy_computation(data):
    return sorted(data)
EOF`,
    assertions: [
      { type: 'file-exists', target: 'async-issues.txt', value: '' },
      { type: 'file-contains', target: 'async-issues.txt', value: 'blocking' },
    ],
  },
  {
    id: 'review-022',
    category: 'code-review',
    description: 'Identify missing transaction rollback on error',
    prompt: 'Review transfer.py for transaction safety issues and write findings to tx-review.txt.',
    setup: `cat > transfer.py << 'EOF'
def transfer_funds(db, from_id, to_id, amount):
    db.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?", (amount, from_id))
    db.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?", (amount, to_id))
    db.commit()
EOF`,
    assertions: [
      { type: 'file-exists', target: 'tx-review.txt', value: '' },
      { type: 'file-contains', target: 'tx-review.txt', value: 'rollback' },
    ],
  },
  {
    id: 'review-023',
    category: 'code-review',
    description: 'Spot missing output encoding in template',
    prompt: 'Review mailer.py for output encoding issues and write findings to encoding-issues.txt.',
    setup: `cat > mailer.py << 'EOF'
def build_email_body(user_name, message):
    return f"""
    <html>
    <body>
        <p>Hello {user_name},</p>
        <p>{message}</p>
    </body>
    </html>
    """
EOF`,
    assertions: [
      { type: 'file-exists', target: 'encoding-issues.txt', value: '' },
      { type: 'file-contains', target: 'encoding-issues.txt', value: 'escape' },
    ],
  },
  {
    id: 'review-024',
    category: 'code-review',
    description: 'Identify overly permissive CORS configuration',
    prompt: 'Review cors.py for security misconfigurations and write findings to cors-review.txt.',
    setup: `cat > cors.py << 'EOF'
def get_cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
    }
EOF`,
    assertions: [
      { type: 'file-exists', target: 'cors-review.txt', value: '' },
      { type: 'file-contains', target: 'cors-review.txt', value: 'wildcard' },
    ],
  },
  {
    id: 'review-025',
    category: 'code-review',
    description: 'Flag missing rate limiting on authentication endpoint',
    prompt: 'Review auth.py for brute force protection issues and write findings to auth-review.txt.',
    setup: `cat > auth.py << 'EOF'
def login(username, password, db):
    user = db.find_user(username)
    if user and user["password"] == hash(password):
        return generate_session_token(user["id"])
    return None
EOF`,
    assertions: [
      { type: 'file-exists', target: 'auth-review.txt', value: '' },
      { type: 'file-contains', target: 'auth-review.txt', value: 'rate limit' },
    ],
  },
];
