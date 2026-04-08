import { useState, useEffect, useRef } from 'react';
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
function EmptyState({ onSampleClick }) {
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
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
      }}>
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 18V5"/>
          <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/>
          <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/>
          <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/>
          <path d="M18 18a4 4 0 0 0 2-7.464"/>
          <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/>
          <path d="M6 18a4 4 0 0 1-2-7.464"/>
          <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>
        </svg>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: 'clamp(1.75rem, 3vw, 2.375rem)',
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        lineHeight: 1.2,
      }}>
        Welcome to Duel AI
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
        alignItems: 'center',
        width: '100%',
        marginBottom: '2.5rem',
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 'var(--radius-full)',
            padding: '9px 16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
            cursor: 'default',
            transform: 'translateY(0)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <span style={{ fontSize: '1rem', opacity: 0.6 }}>{f.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: '0.75rem',
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
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {samples.map(prompt => (
          <button
            key={prompt}
            onClick={() => onSampleClick(prompt)}
            style={{
              background: 'var(--button-bg, #111)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              color: 'var(--button-text, var(--text-secondary))',
              fontSize: '0.8125rem',
              padding: '6px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transform: 'scale(1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
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
  const messageInputRef = useRef(null);

  // Handle sample prompt clicks — populate input field
  const handleSampleClick = (prompt) => {
    if (messageInputRef.current) {
      messageInputRef.current.setValue(prompt);
      // Focus the textarea for better UX
      messageInputRef.current.focus();
    }
  };

  // Load state from localStorage on mount
  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Load battle state
    const savedResult = localStorage.getItem('battleResult');
    const savedProblem = localStorage.getItem('currentProblem');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    if (savedProblem) {
      setCurrentProblem(savedProblem);
    }
  }, []);

  // Save result to localStorage whenever it changes
  useEffect(() => {
    if (result) {
      localStorage.setItem('battleResult', JSON.stringify(result));
    }
  }, [result]);

  // Save problem to localStorage whenever it changes
  useEffect(() => {
    if (currentProblem) {
      localStorage.setItem('currentProblem', currentProblem);
    }
  }, [currentProblem]);

  const handleSubmit = async (problem) => {
    console.log('📤 Sending problem:', problem);
    setCurrentProblem(problem);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              console.log('✅ Stream complete');
            } else if (data) {
              try {
                const streamedData = JSON.parse(data);
                console.log('📥 Streamed data:', streamedData);
                console.log('📥 Has judge?', streamedData.judge !== undefined);
                console.log('📥 Has solution_1_score?', streamedData.judge?.solution_1_score !== undefined);
                
                // Ensure result has the expected structure
                if (streamedData && streamedData.judge) {
                  setResult(streamedData);
                } else {
                  console.warn('⚠️ Missing expected structure:', { 
                    hasJudge: !!streamedData.judge,
                    keys: Object.keys(streamedData || {})
                  });
                }
              } catch (e) {
                console.error('❌ JSON parse error:', e);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('❌ Battle API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const winner = result && result.judge && result.judge.solution_1_score !== undefined
    ? (result.judge.solution_1_score >= result.judge.solution_2_score ? 1 : 2)
    : null;

  const handleBack = () => {
    console.log('🔙 Going back to home');
    setResult(null);
    setCurrentProblem('');
    localStorage.removeItem('battleResult');
    localStorage.removeItem('currentProblem');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
    }}>
      <Navbar hasResult={!!result} onBack={handleBack} />

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
        {!isLoading && !result && <EmptyState onSampleClick={handleSampleClick} />}

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

      <MessageInput ref={messageInputRef} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
