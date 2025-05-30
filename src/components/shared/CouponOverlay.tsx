"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, MapPin, Tag, Eye, Download } from "lucide-react"

interface Coupon {
  _id: string
  title: string
  description: string
  discount: number
  category: string
  location: string
  startDate: string
  endDate: string
  conditions: string
  company: string
  views: number
  downloads: number
}

interface CouponOverlayProps {
  coupon: Coupon
}

const CouponOverlay: React.FC<CouponOverlayProps> = ({ coupon }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image de fond du coupon */}
      <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-blue-900 relative">
        <img src={`https://i.pinimg.com/736x/da/13/30/da133043db28b1ae34cd5ce637fa057e.jpg`} alt={coupon.title} className="w-full h-full object-cover" />

        {/* Badge de réduction */}
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg">
          -{coupon.discount}%
        </div>

        {/* Overlay avec les informations */}
        <div
          className={`absolute inset-0 bg-black  p-7 flex flex-col justify-between transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{coupon.title}</h3>
            <p className="text-gray-200 text-sm mb-4 line-clamp-3">{coupon.description}</p>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{coupon.category}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{coupon.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Jusqu'au {new Date(coupon.endDate).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-xs text-gray-400">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{coupon.views}</span>
              </div>
              <div className="flex items-center">
                <Download className="w-3 h-3 mr-1" />
                <span>{coupon.downloads}</span>
              </div>
            </div>
            <button className="bg-blue-600 pb-3 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Activer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponOverlay
