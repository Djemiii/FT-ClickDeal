"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Edit, Trash2, Save, Settings, RotateCcw } from "lucide-react"
import { useSpinWheelConfig, useUpdateSpinWheelConfig, useSpinWheelStats } from "../../../hooks/useSpinWheel"

interface WheelPrize {
  id: string
  label: string
  value: number
  type: "discount" | "points" | "coupon" | "nothing"
  probability: number
  color: string
}

const SpinWheelAdmin: React.FC = () => {
  const { data: config, isLoading } = useSpinWheelConfig()
  const { data: stats } = useSpinWheelStats()
  const updateConfig = useUpdateSpinWheelConfig()

  const [prizes, setPrizes] = useState<WheelPrize[]>([
    {
      id: "1",
      label: "10% de réduction",
      value: 10,
      type: "discount",
      probability: 20,
      color: "#FF6B6B",
    },
    {
      id: "2",
      label: "50 points",
      value: 50,
      type: "points",
      probability: 25,
      color: "#4ECDC4",
    },
    {
      id: "3",
      label: "Coupon gratuit",
      value: 1,
      type: "coupon",
      probability: 15,
      color: "#45B7D1",
    },
    {
      id: "4",
      label: "Essayez encore",
      value: 0,
      type: "nothing",
      probability: 40,
      color: "#96CEB4",
    },
  ])

  const [settings, setSettings] = useState({
    maxSpinsPerDay: 3,
    isActive: true,
    requireLogin: true,
    cooldownMinutes: 60,
  })

  const [editingPrize, setEditingPrize] = useState<string | null>(null)
  const [newPrize, setNewPrize] = useState<Partial<WheelPrize>>({
    label: "",
    value: 0,
    type: "discount",
    probability: 0,
    color: "#FF6B6B",
  })

  const handleAddPrize = () => {
    if (newPrize.label && newPrize.value !== undefined && newPrize.probability) {
      const prize: WheelPrize = {
        id: Date.now().toString(),
        label: newPrize.label,
        value: newPrize.value,
        type: newPrize.type as WheelPrize["type"],
        probability: newPrize.probability,
        color: newPrize.color || "#FF6B6B",
      }
      setPrizes([...prizes, prize])
      setNewPrize({
        label: "",
        value: 0,
        type: "discount",
        probability: 0,
        color: "#FF6B6B",
      })
    }
  }

  const handleUpdatePrize = (id: string, updatedPrize: Partial<WheelPrize>) => {
    setPrizes(prizes.map((prize) => (prize.id === id ? { ...prize, ...updatedPrize } : prize)))
    setEditingPrize(null)
  }

  const handleDeletePrize = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce prix ?")) {
      setPrizes(prizes.filter((prize) => prize.id !== id))
    }
  }

  const handleSaveConfig = async () => {
    try {
      await updateConfig.mutateAsync({
        prizes,
        settings,
      })
      alert("Configuration sauvegardée avec succès!")
    } catch (error) {
      alert("Erreur lors de la sauvegarde")
    }
  }

  const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration de la Roue de la Fortune</h1>
        <p className="text-gray-600">Configurez les prix et paramètres de la roue de la fortune</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total spins</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalSpins || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Spins aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.spinsToday || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Plus className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prix distribués</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.prizesWon || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <RotateCcw className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.activeUsers || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration des prix */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Prix de la roue</h2>
            <p className="text-sm text-gray-600 mt-1">
              Probabilité totale: {totalProbability}%
              {totalProbability !== 100 && <span className="text-red-600 ml-2">⚠️ Doit être égal à 100%</span>}
            </p>
          </div>

          <div className="p-6">
            {/* Liste des prix */}
            <div className="space-y-4 mb-6">
              {prizes.map((prize) => (
                <div key={prize.id} className="border border-gray-200 rounded-lg p-4">
                  {editingPrize === prize.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={prize.label}
                        onChange={(e) => handleUpdatePrize(prize.id, { label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Nom du prix"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={prize.value}
                          onChange={(e) => handleUpdatePrize(prize.id, { value: Number.parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Valeur"
                        />
                        <input
                          type="number"
                          value={prize.probability}
                          onChange={(e) =>
                            handleUpdatePrize(prize.id, { probability: Number.parseInt(e.target.value) })
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Probabilité %"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={prize.type}
                          onChange={(e) => handleUpdatePrize(prize.id, { type: e.target.value as WheelPrize["type"] })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="discount">Réduction</option>
                          <option value="points">Points</option>
                          <option value="coupon">Coupon</option>
                          <option value="nothing">Rien</option>
                        </select>
                        <input
                          type="color"
                          value={prize.color}
                          onChange={(e) => handleUpdatePrize(prize.id, { color: e.target.value })}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingPrize(null)}
                          className="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => setEditingPrize(null)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: prize.color }} />
                        <div>
                          <p className="font-medium text-gray-900">{prize.label}</p>
                          <p className="text-sm text-gray-600">
                            {prize.type === "discount" && `${prize.value}% de réduction`}
                            {prize.type === "points" && `${prize.value} points`}
                            {prize.type === "coupon" && "Coupon gratuit"}
                            {prize.type === "nothing" && "Aucun prix"}
                            {" • "}
                            {prize.probability}% de chance
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingPrize(prize.id)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePrize(prize.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ajouter un nouveau prix */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Ajouter un nouveau prix</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newPrize.label}
                  onChange={(e) => setNewPrize({ ...newPrize, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nom du prix"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={newPrize.value}
                    onChange={(e) => setNewPrize({ ...newPrize, value: Number.parseInt(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Valeur"
                  />
                  <input
                    type="number"
                    value={newPrize.probability}
                    onChange={(e) => setNewPrize({ ...newPrize, probability: Number.parseInt(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Probabilité %"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={newPrize.type}
                    onChange={(e) => setNewPrize({ ...newPrize, type: e.target.value as WheelPrize["type"] })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="discount">Réduction</option>
                    <option value="points">Points</option>
                    <option value="coupon">Coupon</option>
                    <option value="nothing">Rien</option>
                  </select>
                  <input
                    type="color"
                    value={newPrize.color}
                    onChange={(e) => setNewPrize({ ...newPrize, color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  onClick={handleAddPrize}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter le prix
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres généraux */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Paramètres généraux</h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre maximum de spins par jour</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.maxSpinsPerDay}
                onChange={(e) => setSettings({ ...settings, maxSpinsPerDay: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temps d'attente entre les spins (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={settings.cooldownMinutes}
                onChange={(e) => setSettings({ ...settings, cooldownMinutes: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={settings.isActive}
                  onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Roue active
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireLogin"
                  checked={settings.requireLogin}
                  onChange={(e) => setSettings({ ...settings, requireLogin: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="requireLogin" className="ml-2 block text-sm text-gray-900">
                  Connexion requise pour jouer
                </label>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                onClick={handleSaveConfig}
                disabled={updateConfig.isPending || totalProbability !== 100}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateConfig.isPending ? "Sauvegarde..." : "Sauvegarder la configuration"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinWheelAdmin
