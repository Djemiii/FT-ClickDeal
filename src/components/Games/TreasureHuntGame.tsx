"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, GemIcon as Treasure, Bomb, Gift, RotateCcw, Star } from "lucide-react"

interface Cell {
  id: number
  isRevealed: boolean
  content: "treasure" | "bomb" | "empty" | "coin"
  value: number
}

const TreasureHuntGame: React.FC = () => {
  const [grid, setGrid] = useState<Cell[]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [score, setScore] = useState(0)
  const [treasuresFound, setTreasuresFound] = useState(0)
  const [movesLeft, setMovesLeft] = useState(10)
  const [gamesLeft, setGamesLeft] = useState(3)

  const gridSize = 25 // 5x5 grid

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newGrid: Cell[] = []

    // Créer une grille vide
    for (let i = 0; i < gridSize; i++) {
      newGrid.push({
        id: i,
        isRevealed: false,
        content: "empty",
        value: 0,
      })
    }

    // Placer les trésors (3)
    const treasurePositions = getRandomPositions(3)
    treasurePositions.forEach((pos) => {
      newGrid[pos] = { ...newGrid[pos], content: "treasure", value: 100 }
    })

    // Placer les bombes (5)
    const bombPositions = getRandomPositions(5, treasurePositions)
    bombPositions.forEach((pos) => {
      newGrid[pos] = { ...newGrid[pos], content: "bomb", value: 0 }
    })

    // Placer les pièces (8)
    const coinPositions = getRandomPositions(8, [...treasurePositions, ...bombPositions])
    coinPositions.forEach((pos) => {
      newGrid[pos] = { ...newGrid[pos], content: "coin", value: 20 }
    })

    setGrid(newGrid)
    setGameStatus("playing")
    setScore(0)
    setTreasuresFound(0)
    setMovesLeft(10)
  }

  const getRandomPositions = (count: number, excludePositions: number[] = []): number[] => {
    const positions: number[] = []
    while (positions.length < count) {
      const pos = Math.floor(Math.random() * gridSize)
      if (!positions.includes(pos) && !excludePositions.includes(pos)) {
        positions.push(pos)
      }
    }
    return positions
  }

  const revealCell = (cellId: number) => {
    if (gameStatus !== "playing" || movesLeft <= 0) return

    const cell = grid[cellId]
    if (cell.isRevealed) return

    const newGrid = grid.map((c) => (c.id === cellId ? { ...c, isRevealed: true } : c))
    setGrid(newGrid)
    setMovesLeft((prev) => prev - 1)

    switch (cell.content) {
      case "treasure":
        setScore((prev) => prev + cell.value)
        setTreasuresFound((prev) => {
          const newCount = prev + 1
          if (newCount === 3) {
            setGameStatus("won")
            setGamesLeft((prev) => prev - 1)
          }
          return newCount
        })
        break
      case "bomb":
        setGameStatus("lost")
        setGamesLeft((prev) => prev - 1)
        // Révéler toutes les bombes
        setTimeout(() => {
          setGrid((prev) => prev.map((c) => (c.content === "bomb" ? { ...c, isRevealed: true } : c)))
        }, 500)
        break
      case "coin":
        setScore((prev) => prev + cell.value)
        break
    }

    if (movesLeft <= 1 && cell.content !== "bomb" && treasuresFound < 3) {
      setGameStatus("lost")
      setGamesLeft((prev) => prev - 1)
    }
  }

  const getCellContent = (cell: Cell) => {
    if (!cell.isRevealed) {
      return <MapPin className="w-6 h-6 text-gray-400" />
    }

    switch (cell.content) {
      case "treasure":
        return <Treasure className="w-6 h-6 text-yellow-500" />
      case "bomb":
        return <Bomb className="w-6 h-6 text-red-500" />
      case "coin":
        return <Gift className="w-6 h-6 text-blue-500" />
      default:
        return <span className="text-gray-400">•</span>
    }
  }

  const getCellStyle = (cell: Cell) => {
    if (!cell.isRevealed) {
      return "bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer"
    }

    switch (cell.content) {
      case "treasure":
        return "bg-yellow-200 border-2 border-yellow-400"
      case "bomb":
        return "bg-red-200 border-2 border-red-400"
      case "coin":
        return "bg-blue-200 border-2 border-blue-400"
      default:
        return "bg-gray-200 border-2 border-gray-300"
    }
  }

  const getGameMessage = () => {
    switch (gameStatus) {
      case "won":
        return `🎉 Félicitations ! Tous les trésors trouvés ! Score: ${score}`
      case "lost":
        return grid.some((c) => c.isRevealed && c.content === "bomb")
          ? "💥 Boom ! Vous avez touché une bombe !"
          : "⏰ Plus de mouvements ! Partie terminée"
      default:
        return `Trouvez les 3 trésors ! Mouvements restants: ${movesLeft}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🗺️ Chasse au Trésor</h1>
          <p className="text-xl text-indigo-100 mb-6">Trouvez les trésors cachés sans toucher les bombes !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>Score: {score}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Treasure className="w-5 h-5 mr-2" />
              <span>Trésors: {treasuresFound}/3</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Parties: {gamesLeft}</span>
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

        {/* Grille de jeu */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-5 gap-3">
            {grid.map((cell) => (
              <div
                key={cell.id}
                className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${getCellStyle(cell)}`}
                onClick={() => revealCell(cell.id)}
              >
                {getCellContent(cell)}
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de nouvelle partie */}
        <div className="text-center mt-8">
          <button
            onClick={initializeGame}
            disabled={gamesLeft <= 0}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            {gamesLeft > 0 ? "Nouvelle partie" : "Plus de parties"}
          </button>
        </div>

        {/* Légende */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🗝️ Légende</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
            <div>
              <Treasure className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p>Trésor (+100 pts)</p>
            </div>
            <div>
              <Gift className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p>Pièce (+20 pts)</p>
            </div>
            <div>
              <Bomb className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p>Bombe (Game Over)</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p>Case cachée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasureHuntGame
