import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WheelSection {
  text: string;
  color: string;
  reward: string;
}

interface FortuneWheelProps {
  sections: WheelSection[];
  onSpin: (reward: string) => void;
}

const FortuneWheel: React.FC<FortuneWheelProps> = ({ sections, onSpin }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate a random spin (5-10 full rotations plus a random section)
    const spinCount = 5 + Math.floor(Math.random() * 5); // 5-10 full rotations
    const sectionCount = sections.length;
    const sectionAngle = 360 / sectionCount;
    const randomSection = Math.floor(Math.random() * sectionCount);
    const extraAngle = randomSection * sectionAngle;
    const targetRotation = rotation + (spinCount * 360) + extraAngle;
    
    // Set the new rotation
    setRotation(targetRotation);
    
    // After animation completes, show the winner
    setTimeout(() => {
      setIsSpinning(false);
      const winningIndex = (sectionCount - Math.floor((targetRotation % 360) / sectionAngle)) % sectionCount;
      setWinner(sections[winningIndex].reward);
      onSpin(sections[winningIndex].reward);
    }, 5000); // Match the duration of the animation
  };

  const sectionAngle = 360 / sections.length;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: 5, 
            ease: [0.17, 0.67, 0.83, 0.67], // Custom easing for a realistic spin effect
          }}
          style={{ transformOrigin: "center" }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="absolute origin-center w-1/2 h-1/2"
              style={{
                top: '0',
                right: '0',
                transformOrigin: 'bottom left',
                transform: `rotate(${index * sectionAngle}deg)`,
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                backgroundColor: section.color,
              }}
            >
              <div 
                className="absolute text-white font-medium text-xs md:text-sm"
                style={{ 
                  transform: `rotate(${sectionAngle / 2}deg)`,
                  top: '30%', 
                  left: '20%',
                  width: '60px',
                  textAlign: 'center',
                }}
              >
                {section.text}
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-800 z-10"></div>
        
        {/* Pointer */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 z-10"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}
        >
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>
      
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`mt-8 px-6 py-3 rounded-full text-white font-medium text-lg transition-all transform hover:scale-105 ${
          isSpinning ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'
        }`}
      >
        {isSpinning ? 'En cours...' : 'Tourner la roue'}
      </button>
      
      {winner && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
          <p className="text-blue-800 font-medium">
            Félicitations! Vous avez gagné: <span className="font-bold">{winner}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FortuneWheel;