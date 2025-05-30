"use client"

import type React from "react"
import { useState } from "react"
import { Camera, Save, User, Mail, Building, Calendar, MapPin, Phone } from "lucide-react"
import { useCurrentUser, useUpdateUser, useUploadLogo } from "../../hooks/useAuth"

const UserProfile: React.FC = () => {
  const { data: user, isLoading } = useCurrentUser()
  const updateUser = useUpdateUser()
  const uploadLogo = useUploadLogo()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    description: user?.description || "",
    website: user?.website || "",
    secteurActivite: user?.secteurActivite || "",
    logo: user?.logo || "",
  })

  const handleSave = async () => {
    try {
      await updateUser.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        website: formData.website,
        secteurActivite: formData.secteurActivite,
        logo: formData.logo,
      })
      setIsEditing(false)
      alert("Profil mis à jour avec succès!")
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil")
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await uploadLogo.mutateAsync(file)
        alert("Logo mis à jour avec succès!")
      } catch (error) {
        alert("Erreur lors du téléchargement du logo")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? "Annuler" : "Modifier"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    {user?.logo ? (
                      <img
                        src={user.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-500" />
                    )}
                  </div>
                  {user?.role === "entreprise" && (
                    <label className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600 capitalize">{user?.role}</p>
                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Membre depuis {new Date(user?.createdAt || "").toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {user?.role === "entreprise" ? "Nom de l'entreprise" : "Nom complet"}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{user?.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{user?.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Numéro de téléphone"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{formData.phone || "Non renseigné"}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Adresse complète"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{formData.address || "Non renseigné"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {user?.role === "entreprise" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description de l'entreprise</label>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Décrivez votre entreprise..."
                      />
                    ) : (
                      <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <Building className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                        <span>{formData.description || "Aucune description"}</span>
                      </div>
                    )}
                  </div>
                )}

                {user?.role === "entreprise" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.secteurActivite}
                        onChange={(e) => setFormData({ ...formData, secteurActivite: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Secteur d'activité"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Building className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{formData.secteurActivite || "Non renseigné"}</span>
                      </div>
                    )}
                  </div>
                )}
                {user?.role === "entreprise" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://votre-site.com"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-600 hover:underline">{formData.website || "Non renseigné"}</span>
                      </div>
                    )}
                  </div>
                )}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={updateUser.isPending}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateUser.isPending ? "Sauvegarde..." : "Sauvegarder"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
