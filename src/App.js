import React, { useState } from 'react';

export default function App() {
  const [stage, setStage] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);

  // Her name - CUSTOMIZE THIS!
  const herName = "Jaan";

  const stages = [
    {
      question: `Hey ${herName}! 💕`,
      subtitle: "I have something important to ask you...",
      showButtons: false,
      nextText: "Click here 👉"
    },
    {
      question: "Before I ask...",
      subtitle: "Let me remind you of a few things...",
      showButtons: false,
      nextText: "Okay! 💝"
    },
    {
      question: "You make me smile every single day",
      subtitle: "",
      showButtons: false,
      nextText: "Aww 🥰",
      showPhoto: true
    },
    {
      question: "Your laugh is my favorite sound 🎵",
      subtitle: "",
      showButtons: false,
      nextText: "Keep going! 💗"
    },
    {
      question: "Life is so much better with you in it ✨",
      subtitle: "",
      showButtons: false,
      nextText: "This is sweet 🌸"
    },
    {
      question: "So here's the big question...",
      subtitle: "Ready?",
      showButtons: false,
      nextText: "I'm ready! 💓"
    },
    {
      question: `Ms. Tanvi Saini, will you be my Valentine? 💝`,
      subtitle: "and every day after that? 🌹",
      showButtons: true
    }
  ];

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Don't be silly!",
    "Try the other button!",
    "The Yes button looks nice!",
    "Click Yes please! 🥺",
    "Why are you doing this?",
    "I'm running out of space!"
  ];

  const moveNoButton = () => {
    // Account for button width and add generous safe margins
    const buttonWidth = 200;
    const buttonHeight = 70;
    
    // Extra margins to avoid browser UI, toolbars, and screen edges
    const marginX = 50; // Side margins
    const marginTop = 50; // Top margin
    const marginBottom = 150; // Extra bottom margin for browser bars/UI
    
    const maxX = window.innerWidth - buttonWidth - marginX;
    const maxY = window.innerHeight - buttonHeight - marginBottom;
    
    // Ensure we stay within safe bounds
    const newX = Math.max(marginX, Math.min(marginX + Math.random() * (maxX - marginX), maxX));
    const newY = Math.max(marginTop, Math.min(marginTop + Math.random() * (maxY - marginTop), maxY));
    
    setNoPosition({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    setShowSuccess(true);
  };

  const currentStage = stages[stage];

  // Success Screen
  if (showSuccess) {
    return (
      <div style={styles.successScreen}>
        {/* Floating hearts */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingHeart,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
          </div>
        ))}

        {/* Sparkles */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            style={{
              ...styles.sparkle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}

        <div style={styles.successContent}>
          <div style={styles.successEmoji}>🎉</div>
          <h1 style={styles.successTitle}>YAAAAY! 💝</h1>
          <p style={styles.successMessage}>
            You just made me the happiest person alive! 🥰
          </p>
          <div style={styles.successHearts}>❤️ 💕 💖 💗 💝</div>
          <p style={styles.successFooter}>
            Now let's make every day as special as today! ✨
          </p>
        </div>

        <style>{keyframes}</style>
      </div>
    );
  }

  // Main Proposal Screen
  return (
    <div style={styles.container}>
      {/* Background floating hearts */}
      <div style={styles.backgroundHearts}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.bgHeart,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>{currentStage.question}</h1>
          
          {currentStage.subtitle && (
            <p style={styles.subtitle}>{currentStage.subtitle}</p>
          )}

          {/* Photo section */}
          {currentStage.showPhoto && (
            <div style={styles.photoContainer}>
              <img 
                src="/her-photo.jpg"
                alt="Beautiful smile"
                style={styles.photo}
              />
            </div>
          )}

          {!currentStage.showButtons && (
            <button
              onClick={() => setStage(stage + 1)}
              style={styles.nextButton}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {currentStage.nextText}
            </button>
          )}

          {currentStage.showButtons && (
            <div style={styles.buttonsContainer}>
              <button
                onClick={handleYes}
                style={{
                  ...styles.yesButton,
                  fontSize: `${1.5 + noCount * 0.2}rem`,
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Yes! 💝 {noCount > 3 && "← Click me!"}
              </button>

              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={{
                  ...styles.noButton,
                  ...(noCount > 0 && {
                    position: 'fixed',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                  }),
                }}
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </button>
            </div>
          )}

          {/* Progress dots */}
          <div style={styles.progressDots}>
            {stages.map((_, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.dot,
                  ...(idx === stage && styles.dotActive),
                  ...(idx < stage && styles.dotCompleted),
                }}
              />
            ))}
          </div>
        </div>

        {stage === stages.length - 1 && noCount > 2 && (
          <p style={styles.hintText}>
            Psst... I know you want to click Yes! 😊
          </p>
        )}
      </div>

      <style>{keyframes}</style>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #f3e8ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  backgroundHearts: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  contentWrapper: {
    maxWidth: '700px',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  bgHeart: {
    position: 'absolute',
    color: '#f9a8d4',
    opacity: 0.2,
    animation: 'float-around 15s infinite ease-in-out',
  },
  card: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: '50px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    border: '4px solid #fbcfe8',
    textAlign: 'center',
    animation: 'fade-in 0.6s ease-out',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    color: '#9333ea',
    marginBottom: '30px',
    fontWeight: 500,
  },
  photoContainer: {
    margin: '30px auto',
    display: 'flex',
    justifyContent: 'center',
    animation: 'scale-in 0.6s ease-out',
  },
  photo: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #ec4899',
    boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)',
    animation: 'gentle-float 3s ease-in-out infinite',
  },
  nextButton: {
    marginTop: '30px',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(244, 114, 182, 0.4)',
    transition: 'all 0.3s ease',
  },
  buttonsContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  yesButton: {
    padding: '25px 50px',
    background: 'linear-gradient(135deg, #4ade80 0%, #10b981 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(74, 222, 128, 0.4)',
    transition: 'all 0.3s ease',
    animation: 'pulse-soft 2s ease-in-out infinite',
  },
  noButton: {
    padding: '18px 35px',
    background: '#d1d5db',
    color: '#4b5563',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  progressDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '30px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#d1d5db',
    transition: 'all 0.3s ease',
  },
  dotActive: {
    background: '#ec4899',
    width: '32px',
  },
  dotCompleted: {
    background: '#a855f7',
  },
  hintText: {
    marginTop: '25px',
    color: '#9333ea',
    fontStyle: 'italic',
    animation: 'bounce 1s infinite',
    textAlign: 'center',
    fontSize: '1.1rem',
  },
  successScreen: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fce7f3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  floatingHeart: {
    position: 'absolute',
    fontSize: '2.5rem',
    bottom: '-100px',
    animation: 'float-up 3s ease-out forwards',
  },
  sparkle: {
    position: 'absolute',
    animation: 'sparkle 2s infinite',
  },
  successContent: {
    textAlign: 'center',
    padding: '20px',
    zIndex: 10,
    animation: 'scale-in 0.5s ease-out',
  },
  successEmoji: {
    fontSize: 'clamp(5rem, 10vw, 8rem)',
    animation: 'bounce-slow 2s infinite',
    marginBottom: '30px',
  },
  successTitle: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 'bold',
    marginBottom: '30px',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #ec4899 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradient-shift 3s ease infinite',
  },
  successMessage: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    color: '#7c3aed',
    fontWeight: 600,
    marginBottom: '30px',
  },
  successHearts: {
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    animation: 'pulse-slow 3s infinite',
  },
  successFooter: {
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    color: '#8b5cf6',
    marginTop: '50px',
    fontWeight: 500,
  },
};

// CSS Keyframes
const keyframes = `
  @keyframes float-around {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse-soft {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes float-up {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-120vh) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }

  @keyframes scale-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gentle-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
