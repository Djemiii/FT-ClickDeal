"use client"

import type React from "react"
import { useState } from "react"
import { RotateCcw, Zap, Target, Shuffle, Dice1, Gift, Trophy, Star } from "lucide-react"
import SpinWheelGame from "../SpinWheel/SpinWheelGame"
import SlotMachineGame from "./SlotMachineGame"
import ScratchCardGame from "./ScratchCardGame"
import MemoryGame from "./MemoryGame"
import DiceGame from "./DiceGame"
import TreasureHuntGame from "./TreasureHuntGame"

const GameCenter: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const games = [
    {
      id: "spin-wheel",
      name: "Roue de la Fortune",
      description: "Tournez la roue et gagnez des prix incroyables !",
      icon: RotateCcw,
      color: "from-purple-500 to-pink-500",
      component: SpinWheelGame,
    },
    {
      id: "slot-machine",
      name: "Machine à Sous",
      description: "Alignez les symboles et remportez le jackpot !",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      component: SlotMachineGame,
    },
    {
      id: "scratch-card",
      name: "Carte à Gratter",
      description: "Grattez pour découvrir votre prix caché !",
      icon: Target,
      color: "from-green-500 to-teal-500",
      component: ScratchCardGame,
    },
    {
      id: "memory-game",
      name: "Jeu de Mémoire",
      description: "Trouvez les paires et gagnez des récompenses !",
      icon: Shuffle,
      color: "from-blue-500 to-indigo-500",
      component: MemoryGame,
    },
    {
      id: "dice-game",
      name: "Jeu de Dés",
      description: "Lancez les dés et tentez votre chance !",
      icon: Dice1,
      color: "from-red-500 to-pink-500",
      component: DiceGame,
    },
    {
      id: "treasure-hunt",
      name: "Chasse au Trésor",
      description: "Trouvez le trésor caché et gagnez gros !",
      icon: Gift,
      color: "from-indigo-500 to-purple-500",
      component: TreasureHuntGame,
    },
  ]

  if (activeGame) {
    const game = games.find((g) => g.id === activeGame)
    if (game) {
      const GameComponent = game.component
      return (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setActiveGame(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Retour aux jeux
            </button>
          </div>
          <GameComponent />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎮 Centre de Jeux ClickDeal</h1>
          <p className="text-xl text-blue-100 mb-8">Jouez, amusez-vous et gagnez des prix incroyables !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Trophy className="w-5 h-5 mr-2" />
              <span>Jeux quotidiens gratuits</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>Prix garantis</span>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveGame(game.id)}
              >
                <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{game.name}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Disponible
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Jouer
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Rules Section */}
        <div className="mt-16 bg-white bg-opacity-10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">📋 Règles générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Jeux gratuits</h3>
              <p className="text-blue-100 text-sm">Chaque jeu peut être joué gratuitement une fois par jour</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Prix garantis</h3>
              <p className="text-blue-100 text-sm">Tous les jeux offrent des chances de gagner des récompenses</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Connexion requise</h3>
              <p className="text-blue-100 text-sm">Vous devez être connecté pour jouer et récupérer vos prix</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCenter
