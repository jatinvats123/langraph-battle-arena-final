import { useState } from 'react';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/Navbar';
import ProblemCard from '../components/ProblemCard';
import SolutionCard from '../components/SolutionCard';
import JudgeVerdict from '../components/JudgeVerdict';
import MessageInput from '../components/MessageInput';

/* ─── Mock Data (replace with real API) ─────────────────────── */
const MOCK_RESPONSE = {
  problem: "Write a code for fibonacci sequence",
  solution_1: `def fibonacci(n):
    """
    Recursive approach with memoization (Dynamic Programming).
    Time Complexity: O(n) | Space Complexity: O(n)
    """
    memo = {}

    def fib_helper(k):
        if k in memo:
            return memo[k]
        if k <= 1:
            return k
        memo[k] = fib_helper(k - 1) + fib_helper(k - 2)
        return memo[k]

    return fib_helper(n)

# Generate first n Fibonacci numbers
def fibonacci_sequence(n):
    return [fibonacci(i) for i in range(n)]

# Example usage
print(fibonacci_sequence(10))
# Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,

  solution_2: `function fibonacci(n) {
  // Iterative approach - most space-efficient
  // Time Complexity: O(n) | Space Complexity: O(1)

  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

// Generator approach for infinite sequences
function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(fibonacci(10));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,

  judge: {
    solution_1_score: 10,
    solution_2_score: 8,
    solution_1_reasoning: "The Python solution demonstrates exceptional understanding of dynamic programming principles. The memoization technique eliminates redundant recursive calls, achieving O(n) time complexity while maintaining clean, readable code structure. Excellent use of closures and docstrings for documentation. The solution is pedagogically superior as it clearly illustrates the concept of overlapping subproblems.",
    solution_2_reasoning: "The JavaScript solution is highly practical with its iterative approach achieving O(1) space complexity—technically more memory-efficient than Solution 1. The bonus generator function shows creativity and advanced JavaScript knowledge. However, the lack of memoization explanation and slightly verbose implementation for the generator reduced the overall educational clarity. Still a strong, production-ready solution."
  }
};

/* ─── Skeleton ───────────────────────────────────────────────── */
function Skeleton({ height = 200, delay = 0 }) {
  return (
    <div style={{
      height,
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
      backgroundSize: '200% 100%',
      animation: `shimmer 1.6s ease-in-out infinite ${delay}ms`,
    }} />
  );
}

/* ─── Empty State ────────────────────────────────────────────── */
function EmptyState() {
  const features = [
    { icon: '⚡', label: 'Dual AI Models', desc: 'Two models compete live' },
    { icon: '◎', label: 'Expert Judging', desc: 'AI-powered scoring & analysis' },
    { icon: '▦', label: 'Visual Scores', desc: 'Beautiful comparison metrics' },
  ];

  const samples = [
    'Fibonacci sequence in Python',
    'Sort algorithm comparison',
    'Explain REST vs GraphQL',
  ];

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease',
    }}>
      {/* Icon */}
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#151515',
        border: '1px solid rgba(255,255,255,0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#888" />
        </svg>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.75rem, 3vw, 2.375rem)',
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        lineHeight: 1.2,
      }}>
        Welcome to AI Battle Arena
      </h1>

      <p style={{
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        lineHeight: 1.7,
        maxWidth: 460,
        marginBottom: '2.5rem',
      }}>
        Submit any problem and watch two cutting-edge AI models compete to deliver the best solution — judged in real time.
      </p>

      {/* Feature pills */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '2.5rem',
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-full)',
            padding: '9px 16px',
          }}>
            <span style={{ fontSize: '1rem', opacity: 0.6 }}>{f.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
              }}>{f.label}</div>
              <div style={{
                fontSize: '0.725rem',
                color: 'var(--text-tertiary)',
              }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sample prompts */}
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '0.6875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}>
          Try a sample prompt:
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {samples.map(prompt => (
          <button
            key={prompt}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              padding: '6px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProblem, setCurrentProblem] = useState('');

  const handleSubmit = async (problem) => {
    console.log('📤 Sending problem:', problem);
    setCurrentProblem(problem);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:3000/invoke', { problem });
      console.log('✅ API Response:', response.data);
      setResult(response.data.result);
    } catch (err) {
      console.error('❌ Battle API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const winner = result
    ? (result.judge.solution_1_score >= result.judge.solution_2_score ? 1 : 2)
    : null;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
    }}>
      <Navbar hasResult={!!result} />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1320,
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
        paddingTop: '1.75rem',
        paddingBottom: '0.5rem',
        gap: '1.25rem',
      }}>

        {/* Loading */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '0.75rem',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#555',
                animation: 'blink 1s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                letterSpacing: '-0.01em',
              }}>
                AI models are generating solutions…
              </span>
            </div>

            {/* Problem preview during load */}
            <div style={{
              background: '#111111',
              borderRadius: 'var(--radius-lg)',
              padding: '1.125rem 1.5rem',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                Problem Statement
              </div>
              <p style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                {currentProblem}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <Skeleton height={320} delay={0} />
              <Skeleton height={320} delay={120} />
            </div>
            <Skeleton height={240} delay={260} />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !result && <EmptyState />}

        {/* Results */}
        {!isLoading && result && (
          <>
            <ProblemCard problem={result.problem} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
              alignItems: 'stretch',
            }}>
              <SolutionCard number={1} solution={result.solution_1} isWinner={winner === 1} />
              <SolutionCard number={2} solution={result.solution_2} isWinner={winner === 2} />
            </div>

            <JudgeVerdict judge={result.judge} />
          </>
        )}
      </main>

      <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
