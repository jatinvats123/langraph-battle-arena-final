import { useState } from 'react';
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

// Usage
console.log(fibonacci(10));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,

  judge: {
    solution_1_score: 10,
    solution_2_score: 8,
    solution_1_reasoning: "The Python solution demonstrates exceptional understanding of dynamic programming principles. The memoization technique eliminates redundant recursive calls, achieving O(n) time complexity while maintaining clean, readable code structure. Excellent use of closures and docstrings for documentation. The solution is pedagogically superior as it clearly illustrates the concept of overlapping subproblems.",
    solution_2_reasoning: "The JavaScript solution is highly practical with its iterative approach achieving O(1) space complexity—technically more memory-efficient than Solution 1. The bonus generator function shows creativity and advanced JavaScript knowledge. However, the lack of memoization explanation and slightly verbose implementation for the generator reduced the overall educational clarity. Still a strong, production-ready solution."
  }
};

/* ─── Loading Skeleton ───────────────────────────────────────── */
function Skeleton({ height = 200, delay = 0 }) {
  return (
    <div style={{
      height,
      borderRadius: 'var(--radius-xl)',
      background: 'linear-gradient(90deg, var(--surface-high) 25%, var(--surface-bright) 50%, var(--surface-high) 75%)',
      backgroundSize: '200% 100%',
      animation: `shimmer 1.8s ease-in-out infinite ${delay}ms`,
    }} />
  );
}

/* ─── Empty State ───────────────────────────────────────────── */
function EmptyState() {
  const features = [
    { icon: '⚡', label: 'Dual AI Models', desc: 'Two models compete live' },
    { icon: '🎯', label: 'Expert Judging', desc: 'AI-powered scoring & analysis' },
    { icon: '📊', label: 'Visual Scores', desc: 'Beautiful comparison metrics' },
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
      animation: 'fadeIn 0.6s ease',
    }}>
      {/* Glow orb */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,215,246,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        animation: 'float 4s ease-in-out infinite',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 10,
          borderRadius: '50%',
          border: '1px solid rgba(76,215,246,0.2)',
          animation: 'float 4s ease-in-out infinite reverse',
        }} />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="url(#bolt)"
            style={{ filter: 'drop-shadow(0 0 8px #4cd7f6)' }}
          />
          <defs>
            <linearGradient id="bolt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4cd7f6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
        letterSpacing: '-0.03em',
        color: 'var(--on-surface)',
        marginBottom: '0.75rem',
        lineHeight: 1.2,
      }}>
        Welcome to{' '}
        <span style={{
          background: 'linear-gradient(135deg, #4cd7f6 0%, #d0bcff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          AI Battle Arena
        </span>
      </h1>

      <p style={{
        fontSize: '1rem',
        color: 'var(--on-surface-muted)',
        fontFamily: 'var(--font-body)',
        lineHeight: 1.7,
        maxWidth: 480,
        marginBottom: '3rem',
      }}>
        Submit any problem and watch two cutting-edge AI models compete to deliver the best solution — judged in real time.
      </p>

      {/* Feature pills */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '3rem',
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--surface-high)',
            border: '1px solid rgba(73,68,84,0.35)',
            borderRadius: 'var(--radius-full)',
            padding: '10px 18px',
          }}>
            <span style={{ fontSize: '1.25rem' }}>{f.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--on-surface)',
              }}>{f.label}</div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--on-surface-muted)',
              }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt suggestions */}
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--on-surface-muted)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}>
          Try a sample prompt:
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          'Fibonacci sequence in Python',
          'Sort algorithm comparison',
          'Explain REST vs GraphQL',
        ].map(prompt => (
          <button
            key={prompt}
            style={{
              background: 'var(--surface-mid)',
              border: '1px solid rgba(73,68,84,0.35)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--on-surface-muted)',
              fontSize: '0.8125rem',
              padding: '6px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(76,215,246,0.3)';
              e.currentTarget.style.color = '#4cd7f6';
              e.currentTarget.style.background = 'rgba(76,215,246,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(73,68,84,0.35)';
              e.currentTarget.style.color = 'var(--on-surface-muted)';
              e.currentTarget.style.background = 'var(--surface-mid)';
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
    setCurrentProblem(problem);
    setIsLoading(true);
    setResult(null);

    try {
      // TODO: Replace with real API call:
      // const res = await fetch('/api/battle', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ problem }),
      // });
      // const data = await res.json();
      // setResult(data);

      // Simulate API delay
      await new Promise(r => setTimeout(r, 2200));
      setResult({ ...MOCK_RESPONSE, problem });
    } catch (err) {
      console.error('Battle API error:', err);
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

      {/* Main content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1320,
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
        paddingTop: '2rem',
        paddingBottom: '0.5rem',
        gap: '1.5rem',
      }}>

        {/* Loading State */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
            {/* Loading indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '1rem',
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#4cd7f6',
                boxShadow: '0 0 10px #4cd7f6',
                animation: 'blink 1s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
              }}>
                AI models are generating solutions…
              </span>
            </div>
            {/* Problem preview */}
            <div style={{
              background: 'var(--surface-mid)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.75rem',
              border: '1px solid rgba(73,68,84,0.3)',
            }}>
              <div style={{ fontSize: '0.6875rem', color: '#4cd7f6', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                Problem Statement
              </div>
              <p style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                {currentProblem}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <Skeleton height={340} delay={0} />
              <Skeleton height={340} delay={150} />
            </div>
            <Skeleton height={260} delay={300} />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !result && <EmptyState />}

        {/* Results */}
        {!isLoading && result && (
          <>
            {/* Problem */}
            <ProblemCard problem={result.problem} />

            {/* Solutions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
              alignItems: 'stretch',
            }}>
              <SolutionCard
                number={1}
                solution={result.solution_1}
                isWinner={winner === 1}
              />
              <SolutionCard
                number={2}
                solution={result.solution_2}
                isWinner={winner === 2}
              />
            </div>

            {/* Judge */}
            <JudgeVerdict judge={result.judge} />
          </>
        )}
      </main>

      {/* Sticky Input */}
      <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
