import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

// Theme detection
const isDarkMode = () => {
  const html = document.documentElement;
  const theme = html.getAttribute('data-theme');
  return !theme || theme === 'dark';
};

export default forwardRef(function MessageInput({ onSubmit, isLoading }, ref) {
  const [value, setValue] = useState('');
  const [isDark, setIsDark] = useState(isDarkMode());
  const textareaRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => setIsDark(isDarkMode());
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setValue: (text) => {
      setValue(text);
      // Auto-grow textarea after setting value
      if (textareaRef.current) {
        setTimeout(() => {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
        }, 0);
      }
    },
    focus: () => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Move cursor to end
        textareaRef.current.selectionStart = textareaRef.current.value.length;
        textareaRef.current.selectionEnd = textareaRef.current.value.length;
      }
    }
  }));

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  const canSend = value.trim() && !isLoading;

  return (
    <div
      id="message-input-bar"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        padding: '1rem 0 1.5rem',
        background: 'linear-gradient(to top, var(--bg) 65%, transparent)',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.625rem',
            background: isDark ? '#30302E' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            borderRadius: 'var(--radius-xl)',
            padding: '0.625rem 0.75rem',
            transition: 'border-color 0.2s',
            boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.1)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
          }}
        >
          {/* Textarea */}
          <textarea
            id="problem-input"
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Describe your problem… e.g. 'Write a function to reverse a linked list'"
            disabled={isLoading}
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: isDark ? '#E5E5E5' : '#6D6A62',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              minHeight: '34px',
              maxHeight: '160px',
              overflowY: 'auto',
              padding: '3px 0',
              caretColor: isDark ? '#999' : '#999',
            }}
          />

          {/* Hint */}
          <div style={{
            fontSize: '0.6875rem',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-end',
            marginBottom: 5,
            display: value ? 'none' : 'block',
          }}>
            ↵ Enter
          </div>

          {/* Send button */}
          <button
            id="send-button"
            onClick={handleSubmit}
            disabled={!canSend}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: canSend ? 'var(--button-bg, #2a2a2a)' : 'var(--surface-4, #161616)',
              border: `1px solid ${canSend ? 'var(--border-default)' : 'var(--border-subtle)'}`,
              cursor: canSend ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (canSend) {
                e.currentTarget.style.opacity = '0.85';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {isLoading ? (
              <div style={{
                width: 14,
                height: 14,
                border: '2px solid rgba(255,255,255,0.15)',
                borderTopColor: 'rgba(255,255,255,0.7)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={canSend ? (isDark ? '#ccc' : '#C96443') : (isDark ? '#444' : '#d5d5d5')} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Status */}
        <div style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          fontSize: '0.6875rem',
          color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}>
          {isLoading
            ? '⚡ AI models are battling…'
            : 'Press Enter to send · Shift+Enter for new line'}
        </div>
      </div>
    </div>
  );
});
