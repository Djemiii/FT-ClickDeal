"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RotateCcw, Clock, Star } from "lucide-react"

interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [score, setScore] = useState(0)

  const symbols = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🥝", "🍑"]

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("lost")
    }
  }, [timeLeft, gameStatus])

  useEffect(() => {
    if (matchedPairs === symbols.length) {
      setGameStatus("won")
      const bonusPoints = Math.max(0, timeLeft * 10)
      setScore(1000 + bonusPoints - moves * 5)
    }
  }, [matchedPairs, timeLeft, moves])

  const initializeGame = () => {
    const gameCards: Card[] = []
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5)

    shuffledSymbols.forEach((symbol, index) => {
      gameCards.push({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      })
    })

    setCards(gameCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimeLeft(60)
    setGameStatus("playing")
    setScore(0)
  }

  const flipCard = (cardId: number) => {
    if (gameStatus !== "playing") return
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return
    if (cards[cardId].isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      setTimeout(() => {
        const [firstId, secondId] = newFlippedCards
        const firstCard = cards[firstId]
        const secondCard = cards[secondId]

        if (firstCard.symbol === secondCard.symbol) {
          // Match trouvé
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card)),
          )
          setMatchedPairs((prev) => prev + 1)
        } else {
          // Pas de match - retourner les cartes
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card)),
          )
        }

        setFlippedCards([])
      }, 1000)
    }
  }

  const getGameMessage = () => {
    switch (gameStatus) {
      case "won":
        return `🎉 Félicitations ! Score: ${score} points`
      case "lost":
        return "⏰ Temps écoulé ! Essayez encore"
      default:
        return "Trouvez toutes les paires !"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🧠 Jeu de Mémoire</h1>
          <p className="text-xl text-blue-100 mb-6">Trouvez toutes les paires avant la fin du temps !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 mr-2" />
              <span>Temps: {timeLeft}s</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Coups: {moves}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>
                Paires: {matchedPairs}/{symbols.length}
              </span>
            </div>
          </div>
        </div>

        {/* Message de statut */}
        <div className="text-center mb-6">
          <div
            className={`inline-block px-6 py-3 rounded-lg text-white font-bold ${
              gameStatus === "won" ? "bg-green-500" : gameStatus === "lost" ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {getGameMessage()}
          </div>
        </div>

        {/* Grille de cartes */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  card.isFlipped || card.isMatched
                    ? "bg-white border-2 border-blue-500"
                    : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                }`}
                onClick={() => flipCard(card.id)}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {card.isFlipped || card.isMatched ? card.symbol : "?"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de redémarrage */}
        <div className="text-center mt-8">
          <button
            onClick={initializeGame}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
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
              <p>Trouvez toutes les paires de symboles identiques</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⏱️</div>
              <p>Vous avez 60 secondes pour terminer</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <p>Plus vous êtes rapide, plus votre score est élevé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryGame
