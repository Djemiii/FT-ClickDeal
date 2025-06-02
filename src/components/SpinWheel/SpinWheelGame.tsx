/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { RotateCcw, Gift, Clock } from "lucide-react"
// import { useSpin, useSpinHistory } from "../../hooks/useSpin"
// import { useCoupons } from "../../hooks/useCoupons"
// import { Coupon } from "../../hooks/useCoupons"

// interface WheelPrize {
//   id: string
//   label: string
//   value: number
//   type: "discount" | "points" | "coupon" | "nothing"
//   color: string
// }

// const SpinWheelGame: React.FC = () => {
//   const [isSpinning, setIsSpinning] = useState(false)
//   const [rotation, setRotation] = useState(0)
//   const [lastPrize, setLastPrize] = useState<any>(null)
//   const [spinsLeft, setSpinsLeft] = useState(3)
//   const wheelRef = useRef<HTMLDivElement>(null)
//  const {data:allCouponsData}=useCoupons()
//     const [allCoupons,setAllCoupons]=useState<Coupon[]>([])
//       useEffect(() => {
//         if (allCouponsData && Array.isArray(allCouponsData.data)) {
//           setAllCoupons(allCouponsData.data || [])
//         }
//       }, [allCouponsData])
//   const spin = useSpin()
//   const { data: history } = useSpinHistory()

//   // Données de la roue (normalement récupérées depuis l'API)
//   const prizes: WheelPrize[] = [
//     {
//       id: "1",
//       label: "10% de réduction",
//       value: 10,
//       type: "discount",
//       color: "#FF6B6B",
//     },
//     {
//       id: "2",
//       label: "50 points",
//       value: 50,
//       type: "points",
//       color: "#4ECDC4",
//     },
//     {
//       id: "3",
//       label: "Coupon gratuit",
//       value: 1,
//       type: "coupon",
//       color: "#45B7D1",
//     },
//     {
//       id: "4",
//       label: "Essayez encore",
//       value: 0,
//       type: "nothing",
//       color: "#96CEB4",
//     },
//     {
//       id: "5",
//       label: "20% de réduction",
//       value: 20,
//       type: "discount",
//       color: "#FECA57",
//     },
//     {
//       id: "6",
//       label: "100 points",
//       value: 100,
//       type: "points",
//       color: "#FF9FF3",
//     },
//   ]

//   const handleSpin = async () => {
   
//     if (isSpinning || spinsLeft <= 0) return

//     setIsSpinning(true)

//     try {
//       const result = await spin.mutateAsync()

//       // Animation de la roue
//       const randomRotation = Math.floor(Math.random() * 360) + 1440 // Au moins 4 tours
//       setRotation((prev) => prev + randomRotation)

//       // Attendre la fin de l'animation
//       setTimeout(() => {
//         setLastPrize(result)
//         setSpinsLeft((prev) => prev - 1)
//         setIsSpinning(false)
//       }, 3000)
//     } catch (error) {
//       setIsSpinning(false)
//       alert("Erreur lors du spin. Veuillez réessayer.")
//     }
//   }

//   const getPrizeIcon = (type: string) => {
//     switch (type) {
//       case "discount":
//         return "🎯"
//       case "points":
//         return "⭐"
//       case "coupon":
//         return "🎫"
//       default:
//         return "😔"
//     }
//   }

//   const getPrizeMessage = (prize: any) => {
//     if (!prize) return ""

//     switch (prize.type) {
//       case "discount":
//         return `Félicitations ! Vous avez gagné ${prize.value}% de réduction !`
//       case "points":
//         return `Bravo ! Vous avez gagné ${prize.value} points !`
//       case "coupon":
//         return "Excellent ! Vous avez gagné un coupon gratuit !"
//       case "nothing":
//         return "Pas de chance cette fois ! Réessayez demain."
//       default:
//         return "Merci d'avoir joué !"
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎡 Roue de la Fortune</h1>
//           <p className="text-xl text-blue-100 mb-6">Tentez votre chance et gagnez des prix incroyables !</p>

//           <div className="flex justify-center items-center space-x-6 text-white">
//             <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
//               <RotateCcw className="w-5 h-5 mr-2" />
//               <span>Spins restants: {spinsLeft}</span>
//             </div>
//             <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
//               <Clock className="w-5 h-5 mr-2" />
//               <span>Prochaine chance dans: 2h 30m</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Roue de la fortune */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-2xl p-8">
//               <div className="relative flex items-center justify-center">
//                 {/* Roue */}
//                 <div className="relative">
//                   <div
//                     ref={wheelRef}
//                     className="w-80 h-80 rounded-full border-8 border-gray-800 relative overflow-hidden transition-transform duration-3000 ease-out"
//                     style={{ transform: `rotate(${rotation}deg)` }}
//                   >
//                     {prizes.map((prize, index) => {
//                       const angle = (360 / prizes.length) * index
//                       const nextAngle = (360 / prizes.length) * (index + 1)

//                       return (
//                         <div
//                           key={prize.id}
//                           className="absolute w-full h-full"
//                           style={{
//                             background: `conic-gradient(from ${angle}deg, ${prize.color} ${angle}deg, ${prize.color} ${nextAngle}deg, transparent ${nextAngle}deg)`,
//                             clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, ${50 + 50 * Math.cos((nextAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((nextAngle * Math.PI) / 180)}%)`,
//                           }}
//                         >
//                           <div
//                             className="absolute text-black font-bold text-sm text-center"
//                             style={{
//                               top: "20%",
//                               left: "50%",
//                               transform: `translate(-50%, -50%) rotate(${angle + (360 / prizes.length) / 2}deg)`,
//                               width: "80px",
//                             }}
//                           >
//                             {prize.label}
//                           </div>
//                         </div>
//                       )
//                     })}
//                   </div>

//                   {/* Pointeur */}
//                   <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
//                     <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
//                   </div>

//                   {/* Bouton central */}
//                   <button
//                     onClick={handleSpin}
//                     disabled={isSpinning || spinsLeft <= 0}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
//                   >
//                     {isSpinning ? <RotateCcw className="w-8 h-8 animate-spin" /> : "SPIN"}
//                   </button>
//                 </div>
//               </div>

//               {/* Résultat */}
//               {lastPrize && (
//                 <div className="mt-8 text-center">
//                   <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
//                     <div className="text-4xl mb-2">{getPrizeIcon(lastPrize.type)}</div>
//                     <h3 className="text-xl font-bold mb-2">{getPrizeMessage(lastPrize)}</h3>
//                     {lastPrize.type !== "nothing" && (
//                       <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                         Récupérer mon prix
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Historique */}
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Gift className="w-5 h-5 mr-2" />
//                 Mes derniers gains
//               </h3>

//               {history && history.length > 0 ? (
//                 <div className="space-y-3">
//                   {history.slice(0, 5).map((item, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <span className="text-2xl mr-3">{getPrizeIcon(item.type)}</span>
//                         <div>
//                           <p className="font-medium text-gray-900">{item.prize}</p>
//                           <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-600 text-center py-4">Aucun gain pour le moment</p>
//               )}
//             </div>

//             {/* Règles */}
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Règles du jeu</h3>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li>• 3 spins gratuits par jour</li>
//                 <li>• Connexion requise pour jouer</li>
//                 <li>• Les prix sont valables 30 jours</li>
//                 <li>• Un seul prix par spin</li>
//                 <li>• Prochains spins à minuit</li>
//               </ul>
//             </div>

//             {/* Statistiques */}
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Vos statistiques</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total spins:</span>
//                   <span className="font-medium">{history?.length || 0}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Prix gagnés:</span>
//                   <span className="font-medium">{history?.filter((h) => h.type !== "nothing").length || 0}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Taux de réussite:</span>
//                   <span className="font-medium">
//                     {history?.length
//                       ? Math.round((history.filter((h) => h.type !== "nothing").length / history.length) * 100)
//                       : 0}
//                     %
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SpinWheelGame













"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { RotateCcw, Gift, Clock } from "lucide-react"
import { useSpin, useSpinHistory } from "../../hooks/useSpin"
import { useCoupons } from "../../hooks/useCoupons"
import { Coupon } from "../../hooks/useCoupons"

interface WheelPrize {
  id: string
  label: string
  coupon?: Coupon
  type: "coupon" | "nothing"
  color: string
}

const SpinWheelGame: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastPrize, setLastPrize] = useState<any>(null)
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [prizes, setPrizes] = useState<WheelPrize[]>([])
  const wheelRef = useRef<HTMLDivElement>(null)
  
  const { data: allCouponsData } = useCoupons()
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([])
  
  const spin = useSpin()
  const { data: history } = useSpinHistory()

  // Couleurs pour la roue
  const wheelColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
    "#FECA57", "#FF9FF3", "#A8E6CF", "#FFD93D"
  ]

  useEffect(() => {
     //@ts-ignore
    if (allCouponsData && Array.isArray(allCouponsData.data)) {
       //@ts-ignore
      setAllCoupons(allCouponsData.data || [])
    }
  }, [allCouponsData])

  useEffect(() => {
    // Filtrer seulement les coupons exclusifs et actifs
    const exclusiveCoupons =Array.isArray(allCoupons) && allCoupons.filter(
      coupon => coupon.isExclusive && coupon.isActive && coupon.approved
    )

    // Créer les prix de la roue
    const wheelPrizes: WheelPrize[] = []
    
    // Ajouter les coupons exclusifs (maximum 6 pour une belle roue)
    const couponsToShow = Array.isArray(exclusiveCoupons) && exclusiveCoupons.slice(0, 6)
    couponsToShow.forEach((coupon, index) => {
      wheelPrizes.push({
        id: coupon._id,
        label: `${coupon.discount}% - ${coupon.title.substring(0, 20)}${coupon.title.length > 20 ? '...' : ''}`,
        coupon: coupon,
        type: "coupon",
        color: wheelColors[index % wheelColors.length]
      })
    })

    // Compléter avec des cases "Essayez encore" si nécessaire pour avoir 8 sections
    const totalSections = 8
    const remainingSections = totalSections - wheelPrizes.length
    
    for (let i = 0; i < remainingSections; i++) {
      wheelPrizes.push({
        id: `nothing_${i}`,
        label: "Essayez encore",
        type: "nothing",
        color: wheelColors[(wheelPrizes.length + i) % wheelColors.length]
      })
    }

    setPrizes(wheelPrizes)
  }, [allCoupons])

  const handleSpin = async () => {
    if (isSpinning || spinsLeft <= 0 || prizes.length === 0) return

    setIsSpinning(true)

    try {
      
      const result = await spin.mutateAsync()

      // Animation de la roue
      const randomRotation = Math.floor(Math.random() * 360) + 1440 // Au moins 4 tours
      setRotation((prev) => prev + randomRotation)

      // Sélectionner un prix aléatoire parmi ceux disponibles
      const randomPrizeIndex = Math.floor(Math.random() * prizes.length)
      const selectedPrize = prizes[randomPrizeIndex]

      // Attendre la fin de l'animation
      setTimeout(() => {
        setLastPrize(selectedPrize)
        setSpinsLeft((prev) => prev - 1)
        setIsSpinning(false)
      }, 3000)
    } catch (error) {
      console.error("Erreur lors du spin:", error)
      setIsSpinning(false)
      alert("Erreur lors du spin. Veuillez réessayer.")
    }
  }

  const getPrizeIcon = (type: string) => {
    switch (type) {
      case "coupon":
        return "🎫"
      default:
        return "😔"
    }
  }

  const getPrizeMessage = (prize: WheelPrize) => {
    if (!prize) return ""

    if (prize.type === "coupon" && prize.coupon) {
      return `Félicitations ! Vous avez gagné le coupon "${prize.coupon.title}" avec ${prize.coupon.discount}% de réduction !`
    } else {
      return "Pas de chance cette fois ! Réessayez demain."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎡 Roue de la Fortune</h1>
          <p className="text-xl text-blue-100 mb-6">Tentez votre chance et gagnez des coupons exclusifs !</p>

          <div className="flex justify-center items-center space-x-6 text-white">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Spins restants: {spinsLeft}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 mr-2" />
              <span>Prochaine chance dans: 2h 30m</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roue de la fortune */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {prizes.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-600">Chargement des coupons exclusifs...</p>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  {/* Roue */}
                  <div className="relative">
                    <div
                      ref={wheelRef}
                      className="w-80 h-80 rounded-full border-8 border-gray-800 relative overflow-hidden transition-transform duration-3000 ease-out"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      {prizes.map((prize, index) => {
                        const angle = (360 / prizes.length) * index
                        const nextAngle = (360 / prizes.length) * (index + 1)

                        return (
                          <div
                            key={prize.id}
                            className="absolute w-full h-full"
                            style={{
                              background: `conic-gradient(from ${angle}deg, ${prize.color} ${angle}deg, ${prize.color} ${nextAngle}deg, transparent ${nextAngle}deg)`,
                              clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, ${50 + 50 * Math.cos((nextAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((nextAngle * Math.PI) / 180)}%)`,
                            }}
                          >
                            <div
                              className="absolute text-white font-bold text-xs text-center px-1"
                              style={{
                                top: "25%",
                                left: "50%",
                                transform: `translate(-50%, -50%) rotate(${angle + (360 / prizes.length) / 2}deg)`,
                                width: "70px",
                              }}
                            >
                              {prize.label}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Pointeur */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
                    </div>

                    {/* Bouton central */}
                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || spinsLeft <= 0}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                    >
                      {isSpinning ? <RotateCcw className="w-8 h-8 animate-spin" /> : "SPIN"}
                    </button>
                  </div>
                </div>
              )}

              {/* Résultat */}
              {lastPrize && (
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
                    <div className="text-4xl mb-2">{getPrizeIcon(lastPrize.type)}</div>
                    <h3 className="text-xl font-bold mb-2">{getPrizeMessage(lastPrize)}</h3>
                    
                    {lastPrize.type === "coupon" && lastPrize.coupon && (
                      <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4">
                        <p className="text-sm mb-2">
                          <strong>Entreprise:</strong> {lastPrize.coupon.company.name}
                        </p>
                        <p className="text-sm mb-2">
                          <strong>Lieu:</strong> {lastPrize.coupon.location}
                        </p>
                        <p className="text-sm mb-4">
                          <strong>Conditions:</strong> {lastPrize.coupon.conditions}
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                          Récupérer mon coupon
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coupons disponibles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                Coupons exclusifs disponibles
              </h3>

              {allCoupons.filter(c => c.isExclusive && c.isActive && c.approved).length > 0 ? (
                <div className="space-y-3">
                  {allCoupons
                    .filter(c => c.isExclusive && c.isActive && c.approved)
                    .slice(0, 3)
                    .map((coupon) => (
                      <div key={coupon._id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{coupon.title}</p>
                            <p className="text-xs text-gray-600">{coupon.company.name}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            -{coupon.discount}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">Aucun coupon exclusif disponible</p>
              )}
            </div>

            {/* Historique */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                Mes derniers gains
              </h3>

              {Array.isArray(history) && history && history.length > 0 ? (
                <div className="space-y-3">
                  {Array.isArray(history) && history.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getPrizeIcon(item.type)}</span>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.prize}</p>
                          <p className="text-xs text-gray-600">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">Aucun gain pour le moment</p>
              )}
            </div>

            {/* Règles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Règles du jeu</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3 spins gratuits par jour</li>
                <li>• Connexion requise pour jouer</li>
                <li>• Les coupons sont valables selon leurs conditions</li>
                <li>• Seuls les coupons exclusifs sont disponibles</li>
                <li>• Prochains spins à minuit</li>
              </ul>
            </div>

            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Vos statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total spins:</span>
                  <span className="font-medium">{Array.isArray(history) && history?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coupons gagnés:</span>
                  <span className="font-medium">{Array.isArray(history) && history?.filter((h) => h.type !== "nothing").length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de réussite:</span>
                  <span className="font-medium">
                    {Array.isArray(history) && history?.length
                      ? Math.round((history.filter((h) => h.type !== "nothing").length / history.length) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinWheelGame