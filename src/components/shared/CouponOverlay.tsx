// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Calendar, MapPin, Tag, Eye, Download } from "lucide-react"

// interface Coupon {
//   _id: string
//   title: string
//   description: string
//   discount: number
//   category: string
//   location: string
//   startDate: string
//   endDate: string
//   conditions: string
//   company: string
//   views: number
//   downloads: number
// }

// interface CouponOverlayProps {
//   coupon: Coupon
// }

// const CouponOverlay: React.FC<CouponOverlayProps> = ({ coupon }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <div
//       className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image de fond du coupon */}
//       <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-blue-900 relative">
//         <img src={`https://i.pinimg.com/736x/da/13/30/da133043db28b1ae34cd5ce637fa057e.jpg`} alt={coupon.title} className="w-full h-full object-cover" />

//         {/* Badge de réduction */}
//         <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg">
//           -{coupon.discount}%
//         </div>

//         {/* Overlay avec les informations */}
//         <div
//           className={`absolute inset-0 bg-black  p-7 flex flex-col justify-between transition-opacity duration-300 ${
//             isHovered ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div>
//             <h3 className="text-white text-xl font-bold mb-2">{coupon.title}</h3>
//             <p className="text-gray-200 text-sm mb-4 line-clamp-3">{coupon.description}</p>

//             <div className="space-y-2 text-sm text-gray-300">
//               <div className="flex items-center">
//                 <Tag className="w-4 h-4 mr-2" />
//                 <span>{coupon.category}</span>
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="w-4 h-4 mr-2" />
//                 <span>{coupon.location}</span>
//               </div>
//               <div className="flex items-center">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 <span>Jusqu'au {new Date(coupon.endDate).toLocaleDateString("fr-FR")}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="flex space-x-4 text-xs text-gray-400">
//               <div className="flex items-center">
//                 <Eye className="w-3 h-3 mr-1" />
//                 <span>{coupon.views}</span>
//               </div>
//               <div className="flex items-center">
//                 <Download className="w-3 h-3 mr-1" />
//                 <span>{coupon.downloads}</span>
//               </div>
//             </div>
//             <button className="bg-blue-600 pb-3 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
//               Activer
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CouponOverlay

import {
  Calendar,
  Clock,
  Download,
  Eye,
  MapPin,
  QrCode,
  Store,
} from "lucide-react";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface Coupon {
  _id: string;
  title: string;
  description: string;
  discount: number;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  conditions: string;
  company: { name: string };
  views: number;
  downloads: number;
  qrCode: string;
  code: string;
}

const CouponOverlay: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
  const [showQR, setShowQR] = useState(false);

  // Couleurs dynamiques basées sur la catégorie
  const getCategoryColor = (category: string) => {
    const colors = {
      Restaurant: "from-orange-400 to-red-500",
      Shopping: "from-purple-400 to-pink-500",
      Beauty: "from-pink-400 to-rose-500",
      Travel: "from-blue-400 to-cyan-500",
      Tech: "from-gray-400 to-slate-600",
      default: "from-indigo-400 to-blue-500",
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const isExpiringSoon = () => {
    const endDate = new Date(coupon.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Header avec le discount et statut */}
      <div
        className={`bg-gradient-to-r ${getCategoryColor(
          coupon.category
        )} p-6 relative`}
      >
        <div className="flex justify-between items-start">
          <div className="text-white">
            <div className="text-4xl font-bold mb-1">-{coupon.discount}%</div>
            <div className="text-white/90 text-sm font-medium">
              {coupon.category}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {isExpiringSoon() && (
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Expire bientôt
              </div>
            )}
            <button
              onClick={() => setShowQR(!showQR)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <div>
          {!showQR && (
            <>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {coupon.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <Store className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {coupon.company.name || "Nom de l'entreprise"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                {coupon.description}
              </p>

              {/* Informations détaillées */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{coupon.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span>
                    Valide jusqu'au{" "}
                    {new Date(coupon.endDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* QR Code conditionnel */}
        {showQR && (
          <div className=" p-4 bg-gray-50 rounded-xl text-center">
            <div className="w-32 h-32 mx-auto bg-white  flex items-center justify-center mb-3">
              <div className=" p-4 bg-gray-50 rounded-xl text-center">
                <div className="w-full max-w-xs mx-auto mb-3 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={`https://hexdocs.pm/qr_code/docs/qrcode.svg`}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(coupon.code);
                }}
                className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Copier le code
              </button>

              <a
                href={coupon.qrCode}
                download={`qr-code-${coupon._id}.png`}
                className="text-xs px-3 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
              >
                Télécharger
              </a>
            </div>
          </div>
        )}

        {/* Stats et action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{coupon.views}</span>
            </div>
            <div className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              <span>{coupon.downloads}</span>
            </div>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className={`bg-gradient-to-r ${getCategoryColor(
              coupon.category
            )} text-white px-6 py-2 rounded-full font-medium text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
          >
            Utiliser
          </button>
        </div>
      </div>
    </div>
  );
};
export default CouponOverlay;
