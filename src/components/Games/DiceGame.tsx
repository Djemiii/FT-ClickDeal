"use client"

import type React from "react"
import { useState } from "react"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw, Trophy } from "lucide-react"

const DiceGame: React.FC = () => {
  const [dice, setDice] = useState([1, 1])
  const [isRolling, setIsRolling] = useState(false)
  const [bet, setBet] = useState<"low" | "high" | "double" | null>(null)
  const [credits, setCredits] = useState(100)
  const [lastWin, setLastWin] = useState(0)
  const [rollsLeft, setRollsLeft] = useState(5)
  const [gameHistory, setGameHistory] = useState<Array<{ roll: number[]; bet: string; win: number }>>([])

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

  const rollDice = async () => {
    if (isRolling || !bet || rollsLeft <= 0) return

    setIsRolling(true)
    setRollsLeft((prev) => prev - 1)

    // Animation des dés
    const rollDuration = 1500
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
    }, 100)

    setTimeout(() => {
      clearInterval(interval)

      // Résultat final
      const finalDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
      setDice(finalDice)

      const total = finalDice[0] + finalDice[1]
      const win = calculateWin(total, finalDice, bet)

      setLastWin(win)
      setCredits((prev) => prev + win)
      setGameHistory((prev) => [...prev, { roll: finalDice, bet, win }].slice(-5))
      setIsRolling(false)
      setBet(null)
    }, rollDuration)
  }

  const calculateWin = (total: number, diceValues: number[], betType: string) => {
    const betAmount = 10 // Mise fixe

    switch (betType) {
      case "low": // 2-7
        return total >= 2 && total <= 7 ? betAmount * 2 : 0
      case "high": // 8-12
        return total >= 8 && total <= 12 ? betAmount * 2 : 0
      case "double": // Double (même valeur sur les deux dés)
        return diceValues[0] === diceValues[1] ? betAmount * 6 : 0
      default:
        return 0
    }
  }

  const resetGame = () => {
    setDice([1, 1])
    setBet(null)
    setCredits(100)
    setLastWin(0)
    setRollsLeft(5)
    setGameHistory([])
  }

  const getDiceIcon = (value: number) => {
    const IconComponent = diceIcons[value - 1]
    return <IconComponent className="w-16 h-16 text-white" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎲 Jeu de Dés</h1>
          <p className="text-xl text-red-100 mb-6">Pariez sur le résultat et tentez votre chance !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Trophy className="w-5 h-5 mr-2" />
              <span>Crédits: {credits}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Lancers restants: {rollsLeft}</span>
            </div>
          </div>
        </div>

        {/* Zone de jeu */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Dés */}
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-8 mb-6">
              {dice.map((value, index) => (
                <div
                  key={index}
                  className={`bg-red-600 rounded-lg p-4 transition-all duration-200 ${
                    isRolling ? "animate-bounce" : ""
                  }`}
                >
                  {getDiceIcon(value)}
                </div>
              ))}
            </div>

            <div className="text-2xl font-bold text-gray-800 mb-2">Total: {dice[0] + dice[1]}</div>

            {lastWin > 0 && !isRolling && (
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                <Trophy className="w-5 h-5 inline mr-2" />
                Vous avez gagné {lastWin} crédits !
              </div>
            )}
          </div>

          {/* Options de pari */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setBet("low")}
              disabled={isRolling}
              className={`p-4 rounded-lg font-bold transition-colors ${
                bet === "low" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <div className="text-lg">PETIT (2-7)</div>
              <div className="text-sm">Gain: x2</div>
            </button>

            <button
              onClick={() => setBet("high")}
              disabled={isRolling}
              className={`p-4 rounded-lg font-bold transition-colors ${
                bet === "high" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <div className="text-lg">GRAND (8-12)</div>
              <div className="text-sm">Gain: x2</div>
            </button>

            <button
              onClick={() => setBet("double")}
              disabled={isRolling}
              className={`p-4 rounded-lg font-bold transition-colors ${
                bet === "double" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <div className="text-lg">DOUBLE</div>
              <div className="text-sm">Gain: x6</div>
            </button>
          </div>

          {/* Bouton de lancer */}
          <div className="text-center mb-8">
            <button
              onClick={rollDice}
              disabled={isRolling || !bet || rollsLeft <= 0}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isRolling ? (
                <RotateCcw className="w-6 h-6 animate-spin inline mr-2" />
              ) : (
                <Dice1 className="w-6 h-6 inline mr-2" />
              )}
              {isRolling ? "Lancement..." : "LANCER LES DÉS"}
            </button>
          </div>

          {/* Historique */}
          {gameHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Historique des lancers</h3>
              <div className="space-y-2">
                {gameHistory.map((game, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span>
                        🎲 {game.roll[0]} + {game.roll[1]} = {game.roll[0] + game.roll[1]}
                      </span>
                      <span className="text-sm text-gray-600">({game.bet})</span>
                    </div>
                    <span className={`font-bold ${game.win > 0 ? "text-green-600" : "text-red-600"}`}>
                      {game.win > 0 ? `+${game.win}` : "0"} crédits
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bouton reset */}
        <div className="text-center mt-8">
          <button
            onClick={resetGame}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Nouvelle partie
          </button>
        </div>

        {/* Règles */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">📋 Règles du jeu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <p>
                <strong>PETIT (2-7):</strong> Pariez que la somme sera entre 2 et 7. Gain x2
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <p>
                <strong>GRAND (8-12):</strong> Pariez que la somme sera entre 8 et 12. Gain x2
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎲</div>
              <p>
                <strong>DOUBLE:</strong> Pariez que les deux dés auront la même valeur. Gain x6
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiceGame
