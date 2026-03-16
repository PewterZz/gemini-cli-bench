import { Scenario } from '../types';

export const refactoringScenarios: Scenario[] = [
  {
    id: 'refactor-001',
    category: 'refactoring',
    description: 'DRY up duplicated validation logic',
    prompt: 'Refactor validate.py to remove the duplicated validation code.',
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
    prompt: 'Refactor fetch_data.js to use async/await instead of callbacks.',
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
    prompt: 'Refactor create_user in user.py to use a single options dict instead of 5 positional params.',
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
    prompt: 'Refactor the nested ternary in grade.py to use if/elif/else for readability.',
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
    prompt: 'Refactor tax.py to replace all magic numbers with named constants.',
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
    prompt: 'Refactor process.py to use a generator instead of a list comprehension in the large_squares function.',
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
    prompt: 'Refactor report.py. The generate_report function is too long — split it into at least 3 smaller functions.',
    setup: `cat > report.py << 'EOF'
def generate_report(data):
    # Validate
    if not data:
        raise ValueError("no data")
    if not isinstance(data, list):
        raise TypeError("data must be a list")

    # Transform
    cleaned = [x for x in data if x is not None]
    doubled = [x * 2 for x in cleaned]

    # Format
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
    prompt: 'Refactor logger.py to use f-strings instead of % formatting.',
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
    prompt: 'Refactor point.py to use Python dataclass instead of a manual __init__.',
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
    prompt: 'Refactor check.py to simplify the overly verbose boolean logic.',
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
];
