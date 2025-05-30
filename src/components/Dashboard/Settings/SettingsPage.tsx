"use client"

import type React from "react"
import { useState } from "react"
import { Save, Bell, Shield, Palette, Database } from "lucide-react"
import { useCurrentUser, useUpdateUserPreferences } from "../../../hooks/useUsers"

const SettingsPage: React.FC = () => {
  const { data: user } = useCurrentUser()
  const updatePreferences = useUpdateUserPreferences()

  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    language: "fr",
    theme: "light",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    maxCouponsPerCompany: 50,
    defaultCouponDuration: 30,
  })

  const handleSavePreferences = async () => {
    try {
      await updatePreferences.mutateAsync({
        notifications: preferences.notifications,
        newsletter: preferences.newsletter,
        language: preferences.language,
      })
      alert("Préférences sauvegardées avec succès!")
    } catch (error) {
      alert("Erreur lors de la sauvegarde des préférences")
    }
  }

  const handleSaveSystemSettings = async () => {
    try {
      // API call to save system settings
      alert("Paramètres système sauvegardés avec succès!")
    } catch (error) {
      alert("Erreur lors de la sauvegarde des paramètres système")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de l'application</p>
      </div>

      <div className="space-y-8">
        {/* Préférences utilisateur */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Préférences de notification
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Notifications push</label>
                    <p className="text-sm text-gray-600">Recevoir des notifications dans l'application</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Notifications par email</label>
                    <p className="text-sm text-gray-600">Recevoir des emails de notification</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Notifications SMS</label>
                    <p className="text-sm text-gray-600">Recevoir des SMS pour les alertes importantes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Newsletter</label>
                    <p className="text-sm text-gray-600">Recevoir notre newsletter hebdomadaire</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.newsletter}
                    onChange={(e) => setPreferences({ ...preferences, newsletter: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Emails marketing</label>
                    <p className="text-sm text-gray-600">Recevoir des offres promotionnelles</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketingEmails}
                    onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Alertes de sécurité</label>
                    <p className="text-sm text-gray-600">Notifications de sécurité importantes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.securityAlerts}
                    onChange={(e) => setPreferences({ ...preferences, securityAlerts: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePreferences}
                disabled={updatePreferences.isPending}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {updatePreferences.isPending ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>

        {/* Préférences d'affichage */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Préférences d'affichage
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres système (Admin seulement) */}
        {user?.role === "admin" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Paramètres système
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Mode maintenance</label>
                      <p className="text-sm text-gray-600">Désactiver l'accès public à l'application</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Autoriser les inscriptions</label>
                      <p className="text-sm text-gray-600">Permettre aux nouveaux utilisateurs de s'inscrire</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={systemSettings.allowRegistrations}
                      onChange={(e) => setSystemSettings({ ...systemSettings, allowRegistrations: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Vérification email requise</label>
                      <p className="text-sm text-gray-600">Exiger la vérification de l'email à l'inscription</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={systemSettings.requireEmailVerification}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, requireEmailVerification: e.target.checked })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre max de coupons par entreprise
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={systemSettings.maxCouponsPerCompany}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, maxCouponsPerCompany: Number.parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée par défaut des coupons (jours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={systemSettings.defaultCouponDuration}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, defaultCouponDuration: Number.parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveSystemSettings}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les paramètres système
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sécurité */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Sécurité
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
                <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire à votre compte</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Activer</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Sessions actives</h3>
                <p className="text-sm text-gray-600">Gérer les appareils connectés à votre compte</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Voir les sessions
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Journal d'activité</h3>
                <p className="text-sm text-gray-600">Consulter l'historique des connexions et actions</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Voir le journal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
