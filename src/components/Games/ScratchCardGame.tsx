"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { RotateCcw, Gift, Star } from "lucide-react"

const ScratchCardGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [scratchedPercentage, setScratchedPercentage] = useState(0)
  const [prize, setPrize] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [cardsLeft, setCardsLeft] = useState(3)

  const prizes = [
    { text: "10% de réduction", value: 10, type: "discount" },
    { text: "50 points", value: 50, type: "points" },
    { text: "Coupon gratuit", value: 1, type: "coupon" },
    { text: "Essayez encore", value: 0, type: "nothing" },
    { text: "20% de réduction", value: 20, type: "discount" },
    { text: "100 points", value: 100, type: "points" },
  ]

  useEffect(() => {
    initializeCard()
  }, [])

  const initializeCard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = 400
    canvas.height = 300

    // Dessiner le fond du prix (caché)
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setPrize(randomPrize.text)

    // Dessiner la couche à gratter
    ctx.fillStyle = "#C0C0C0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Ajouter un motif
    ctx.fillStyle = "#A0A0A0"
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10)
        }
      }
    }

    // Texte "Grattez ici"
    ctx.fillStyle = "#666"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Grattez ici !", canvas.width / 2, canvas.height / 2)
  }

  const startScratching = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true)
    scratch(e)
  }

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fill()

    // Calculer le pourcentage gratté
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100
    setScratchedPercentage(percentage)

    if (percentage > 50 && !isRevealed) {
      setIsRevealed(true)
      setCardsLeft((prev) => prev - 1)
    }
  }

  const stopScratching = () => {
    setIsScratching(false)
  }

  const resetCard = () => {
    setScratchedPercentage(0)
    setIsRevealed(false)
    setPrize(null)
    initializeCard()
  }

  const getPrizeIcon = (prizeText: string) => {
    if (prizeText.includes("réduction")) return "🎯"
    if (prizeText.includes("points")) return "⭐"
    if (prizeText.includes("Coupon")) return "🎫"
    return "😔"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎫 Carte à Gratter</h1>
          <p className="text-xl text-green-100 mb-6">Grattez pour découvrir votre prix caché !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Gift className="w-5 h-5 mr-2" />
              <span>Cartes restantes: {cardsLeft}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>Gratté: {Math.round(scratchedPercentage)}%</span>
            </div>
          </div>
        </div>

        {/* Carte à gratter */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl mx-auto max-w-2xl">
          <div className="relative">
            {/* Prix caché (arrière-plan) */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{prize ? getPrizeIcon(prize) : "🎁"}</div>
                <div className="text-2xl font-bold">{prize || "Votre prix"}</div>
              </div>
            </div>

            {/* Canvas pour gratter */}
            <canvas
              ref={canvasRef}
              className="relative z-10 rounded-lg cursor-pointer"
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
            />
          </div>

          {/* Résultat */}
          {isRevealed && (
            <div className="mt-6 text-center">
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block mb-4">
                <Gift className="w-6 h-6 inline mr-2" />
                Félicitations ! Vous avez gagné : {prize}
              </div>
              <div>
                <button
                  onClick={resetCard}
                  disabled={cardsLeft <= 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  {cardsLeft > 0 ? "Nouvelle carte" : "Plus de cartes"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">📋 Comment jouer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white text-center">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <p>Utilisez votre souris pour gratter la surface argentée</p>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <p>Grattez au moins 50% de la surface pour révéler votre prix</p>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <p>Récupérez votre récompense et jouez à nouveau !</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScratchCardGame
