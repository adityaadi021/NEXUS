import type { SVGProps } from 'react';

export function NexusLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 220 50" 
      width="165" 
      height="37.5"
      aria-label="Nexus Esports Logo"
      className="nexus-logo"
      {...props}
    >
      <style>
        {`
          @keyframes energizeN {
            0%, 100% { 
              stroke-width: 3;
              filter: drop-shadow(0 0 2px hsl(var(--primary) / 0.5))
                      drop-shadow(0 0 4px hsl(var(--accent) / 0.3));
            }
            50% { 
              stroke-width: 3.8;
              filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.8))
                      drop-shadow(0 0 12px hsl(var(--accent) / 0.6));
            }
          }

          @keyframes glitchEffect {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          @keyframes energyPulse {
            0% { 
              stroke-dashoffset: 0;
              filter: drop-shadow(0 0 2px hsl(var(--primary) / 0.5));
            }
            50% { 
              stroke-dashoffset: -20;
              filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.8))
                      drop-shadow(0 0 12px hsl(var(--accent) / 0.6));
            }
            100% { 
              stroke-dashoffset: 0;
              filter: drop-shadow(0 0 2px hsl(var(--primary) / 0.5));
            }
          }

          @keyframes circuitPulse {
            0%, 100% { 
              opacity: 0.5;
              stroke-dashoffset: 0;
              filter: drop-shadow(0 0 2px hsl(var(--accent) / 0.3));
            }
            50% { 
              opacity: 0.8;
              stroke-dashoffset: -20;
              filter: drop-shadow(0 0 4px hsl(var(--accent) / 0.6));
            }
          }

          @keyframes textGlow {
            0%, 100% { 
              filter: drop-shadow(0 0 2px hsl(var(--primary) / 0.5))
                      drop-shadow(0 0 4px hsl(var(--accent) / 0.3))
                      drop-shadow(0 0 6px hsl(var(--secondary) / 0.2));
            }
            50% { 
              filter: drop-shadow(0 0 4px hsl(var(--primary) / 0.8))
                      drop-shadow(0 0 8px hsl(var(--accent) / 0.5))
                      drop-shadow(0 0 12px hsl(var(--secondary) / 0.4));
            }
          }

          @keyframes particleFloat {
            0% { 
              transform: translateY(0) translateX(0) scale(1);
              opacity: 0;
            }
            50% { 
              opacity: 0.8;
              transform: translateY(-10px) translateX(5px) scale(1.2);
            }
            100% { 
              transform: translateY(-20px) translateX(10px) scale(1);
              opacity: 0;
            }
          }

          @keyframes energyBurst {
            0% { 
              transform: scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: scale(1.2);
              opacity: 0.4;
            }
            100% { 
              transform: scale(1);
              opacity: 0.8;
            }
          }

          .n-path-animated {
            animation: energizeN 2.5s infinite alternate ease-in-out,
                       drawPath 3s ease-in-out forwards;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }

          .glitch-effect {
            animation: glitchEffect 0.3s infinite;
            animation-play-state: paused;
          }

          .nexus-logo:hover .glitch-effect {
            animation-play-state: running;
          }

          .circuit-line {
            stroke-dasharray: 5, 5;
            animation: circuitPulse 2s infinite linear;
          }

          .energy-line {
            stroke-dasharray: 10, 10;
            animation: energyPulse 2s infinite linear;
          }

          .text-animated {
            animation: textGlow 3s infinite alternate ease-in-out;
          }

          .particle {
            animation: particleFloat 3s infinite ease-out;
          }

          .energy-burst {
            animation: energyBurst 2s infinite ease-in-out;
          }

          .nexus-logo:hover .n-path-animated {
            filter: drop-shadow(0 0 12px hsl(var(--primary) / 0.9))
                    drop-shadow(0 0 16px hsl(var(--accent) / 0.7));
          }

          .nexus-logo:hover .text-animated {
            filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.8))
                    drop-shadow(0 0 12px hsl(var(--accent) / 0.6))
                    drop-shadow(0 0 16px hsl(var(--secondary) / 0.4));
          }

          @keyframes drawPath {
            to { stroke-dashoffset: 0; }
          }
        `}
      </style>
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
          <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
        </filter>
        <filter id="particleGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="energyGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Animated "N" Shape with particles and energy effects */}
      <g className="n-container glitch-effect">
        <path 
          className="n-path-animated"
          d="M10,5 L10,45 L40,5 L40,45"
          fill="none"
          stroke="url(#neonGradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Energy burst effects */}
        <circle className="energy-burst" cx="15" cy="10" r="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" filter="url(#energyGlow)" />
        <circle className="energy-burst" cx="35" cy="40" r="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" filter="url(#energyGlow)" style={{ animationDelay: '0.5s' }} />
        {/* Particles */}
        <circle className="particle" cx="15" cy="10" r="1" fill="hsl(var(--accent))" filter="url(#particleGlow)" />
        <circle className="particle" cx="35" cy="40" r="1" fill="hsl(var(--accent))" filter="url(#particleGlow)" style={{ animationDelay: '0.5s' }} />
        <circle className="particle" cx="25" cy="25" r="1" fill="hsl(var(--accent))" filter="url(#particleGlow)" style={{ animationDelay: '1s' }} />
        {/* Energy lines */}
        <path className="energy-line" d="M10,25 L40,25" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Circuit lines with enhanced animation */}
      <g className="circuit-container">
        <line className="circuit-line" x1="45" y1="10" x2="50" y2="15" stroke="hsl(var(--accent))" strokeWidth="1" />
        <line className="circuit-line" x1="45" y1="40" x2="50" y2="35" stroke="hsl(var(--accent))" strokeWidth="1" style={{ animationDelay: '0.5s' }} />
        <circle className="circuit-line" cx="43" cy="25" r="1.5" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" style={{ animationDelay: '1s' }} />
        {/* Additional circuit details */}
        <path className="energy-line" d="M45,25 L55,25" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Animated text with enhanced effects */}
      <text
        x="50" 
        y="32"
        fontFamily="var(--font-space-grotesk), Inter, sans-serif"
        fontSize="22" 
        fontWeight="bold"
        fill="url(#neonGradient)"
        className="text-animated glitch-effect"
      >
        Nexus Esports
      </text>

      {/* Enhanced circuit details */}
      <g className="circuit-container">
        <path
          className="circuit-line"
          d="M180,15 L190,15 M180,35 L190,35"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          style={{ animationDelay: '1.5s' }}
        />
        <circle
          className="circuit-line"
          cx="185"
          cy="25"
          r="2"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          style={{ animationDelay: '2s' }}
        />
        {/* Energy nodes */}
        <circle className="energy-burst" cx="185" cy="15" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" filter="url(#energyGlow)" />
        <circle className="energy-burst" cx="185" cy="35" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" filter="url(#energyGlow)" style={{ animationDelay: '1s' }} />
      </g>
    </svg>
  );
}
