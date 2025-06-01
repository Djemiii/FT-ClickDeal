"use client"

import type React from "react"
import { useState } from "react"
import { Play, RotateCcw, Trophy, Coins } from "lucide-react"

const SlotMachineGame: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [reels, setReels] = useState(["🍒", "🍋", "🍊"])
  const [credits, setCredits] = useState(100)
  const [lastWin, setLastWin] = useState(0)
  const [spinsLeft, setSpinsLeft] = useState(5)

  const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "⭐", "7️⃣"]
  const winnings = {
    "🍒🍒🍒": 50,
    "🍋🍋🍋": 75,
    "🍊🍊🍊": 100,
    "🍇🍇🍇": 150,
    "🔔🔔🔔": 200,
    "💎💎💎": 500,
    "⭐⭐⭐": 1000,
    "7️⃣7️⃣7️⃣": 2000,
  }

  const spin = async () => {
    if (isSpinning || spinsLeft <= 0) return

    setIsSpinning(true)
    setSpinsLeft((prev) => prev - 1)

    // Animation des rouleaux
    const spinDuration = 2000
    const intervals: NodeJS.Timeout[] = []

    // Faire tourner chaque rouleau
    reels.forEach((_, index) => {
      const interval = setInterval(() => {
        setReels((prev) => {
          const newReels = [...prev]
          newReels[index] = symbols[Math.floor(Math.random() * symbols.length)]
          return newReels
        })
      }, 100)
      intervals.push(interval)

      // Arrêter chaque rouleau à des moments différents
      setTimeout(
        () => {
          clearInterval(interval)
          if (index === reels.length - 1) {
            // Dernier rouleau - calculer le résultat final
            setTimeout(() => {
              const finalReels = [
                symbols[Math.floor(Math.random() * symbols.length)],
                symbols[Math.floor(Math.random() * symbols.length)],
                symbols[Math.floor(Math.random() * symbols.length)],
              ]
              setReels(finalReels)
              checkWin(finalReels)
              setIsSpinning(false)
            }, 200)
          }
        },
        spinDuration + index * 300,
      )
    })
  }

  const checkWin = (finalReels: string[]) => {
    const combination = finalReels.join("")
    const winAmount = winnings[combination as keyof typeof winnings] || 0

    if (winAmount > 0) {
      setLastWin(winAmount)
      setCredits((prev) => prev + winAmount)
    } else {
      setLastWin(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎰 Machine à Sous</h1>
          <p className="text-xl text-yellow-100 mb-6">Alignez les symboles et remportez le jackpot !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Coins className="w-5 h-5 mr-2" />
              <span>Crédits: {credits}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Spins restants: {spinsLeft}</span>
            </div>
          </div>
        </div>

        {/* Machine à sous */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-3xl p-8 shadow-2xl mx-auto max-w-2xl">
          {/* Écran */}
          <div className="bg-black rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-4">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg h-24 flex items-center justify-center text-4xl transition-all duration-200 ${
                    isSpinning ? "animate-pulse" : ""
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>

            {/* Résultat */}
            {lastWin > 0 && !isSpinning && (
              <div className="text-center mt-4">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                  <Trophy className="w-5 h-5 inline mr-2" />
                  Vous avez gagné {lastWin} crédits !
                </div>
              </div>
            )}
          </div>

          {/* Bouton de jeu */}
          <div className="text-center">
            <button
              onClick={spin}
              disabled={isSpinning || spinsLeft <= 0}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isSpinning ? (
                <RotateCcw className="w-6 h-6 animate-spin inline mr-2" />
              ) : (
                <Play className="w-6 h-6 inline mr-2" />
              )}
              {isSpinning ? "En cours..." : "SPIN"}
            </button>
          </div>
        </div>

        {/* Tableau des gains */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">💰 Tableau des gains</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            {Object.entries(winnings).map(([combination, amount]) => (
              <div key={combination} className="text-center bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl mb-2">{combination.split("").join(" ")}</div>
                <div className="font-bold">{amount} crédits</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlotMachineGame
