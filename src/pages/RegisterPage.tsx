// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';

// // const RegisterPage: React.FC = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [userType, setUserType] = useState<'consumer' | 'business'>('consumer');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const { register } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!name || !email || !password || !confirmPassword) {
// //       setError('Veuillez remplir tous les champs');
// //       return;
// //     }
    
// //     if (password !== confirmPassword) {
// //       setError('Les mots de passe ne correspondent pas');
// //       return;
// //     }
    
// //     try {
// //       setIsLoading(true);
// //       setError('');
// //       await register(name, email, password, userType);
// //       navigate(userType === 'business' ? '/business' : '/');
// //     } catch (err) {
// //       console.error('Registration error:', err);
// //       setError('Une erreur est survenue lors de l\'inscription');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// //           Créer un compte
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">
// //           Ou{' '}
// //           <Link to="/login" className="font-medium text-blue-800 hover:text-blue-700">
// //             connectez-vous à votre compte existant
// //           </Link>
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             {error && (
// //               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
// //                 {error}
// //               </div>
// //             )}

// //             <div>
// //               <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
// //                 Type de compte
// //               </label>
// //               <div className="mt-1 grid grid-cols-2 gap-3">
// //                 <div
// //                   className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
// //                     userType === 'consumer'
// //                       ? 'border-blue-800 bg-blue-50'
// //                       : 'border-gray-300 hover:border-gray-400'
// //                   }`}
// //                   onClick={() => setUserType('consumer')}
// //                 >
// //                   <label
// //                     htmlFor="user-type-consumer"
// //                     className="block w-full text-sm font-medium cursor-pointer"
// //                   >
// //                     Consommateur
// //                   </label>
// //                   <input
// //                     type="radio"
// //                     id="user-type-consumer"
// //                     name="user-type"
// //                     className="sr-only"
// //                     checked={userType === 'consumer'}
// //                     onChange={() => setUserType('consumer')}
// //                   />
// //                 </div>
// //                 <div
// //                   className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
// //                     userType === 'business'
// //                       ? 'border-blue-800 bg-blue-50'
// //                       : 'border-gray-300 hover:border-gray-400'
// //                   }`}
// //                   onClick={() => setUserType('business')}
// //                 >
// //                   <label
// //                     htmlFor="user-type-business"
// //                     className="block w-full text-sm font-medium cursor-pointer"
// //                   >
// //                     Entreprise
// //                   </label>
// //                   <input
// //                     type="radio"
// //                     id="user-type-business"
// //                     name="user-type"
// //                     className="sr-only"
// //                     checked={userType === 'business'}
// //                     onChange={() => setUserType('business')}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
            
// //             <div>
// //               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //                 {userType === 'consumer' ? 'Nom complet' : 'Nom de l\'entreprise'}
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="name"
// //                   name="name"
// //                   type="text"
// //                   autoComplete="name"
// //                   required
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //                 Adresse email
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   required
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                 Mot de passe
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   autoComplete="new-password"
// //                   required
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
// //                 Confirmer le mot de passe
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="confirm-password"
// //                   name="confirm-password"
// //                   type="password"
// //                   autoComplete="new-password"
// //                   required
// //                   value={confirmPassword}
// //                   onChange={(e) => setConfirmPassword(e.target.value)}
// //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center">
// //               <input
// //                 id="agree-terms"
// //                 name="agree-terms"
// //                 type="checkbox"
// //                 required
// //                 className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
// //               />
// //               <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
// //                 J'accepte les{' '}
// //                 <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
// //                   conditions d'utilisation
// //                 </a>{' '}
// //                 et la{' '}
// //                 <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
// //                   politique de confidentialité
// //                 </a>
// //               </label>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
// //                   isLoading ? 'bg-blue-400' : 'bg-blue-800 hover:bg-blue-700'
// //                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
// //               >
// //                 {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterPage;





// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRegister } from "../hooks/useAuth"

// const RegisterPage: React.FC = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [userType, setUserType] = useState<"consommateur" | "entreprise">("consommateur")
//   const [error, setError] = useState("")
//   const register = useRegister()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Veuillez remplir tous les champs")
//       return
//     }

//     if (password !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas")
//       return
//     }

//     try {
//       setError("")
//       await register.mutateAsync({
//         name,
//         email,
//         password,
//         role: userType,
//       })
//       window.location.href = "/dashboard"
//     } catch (err: any) {
//       console.error("Registration error:", err)
//       setError(err.message || "Une erreur est survenue lors de l'inscription")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
//             <span className="text-white font-bold text-xl">CD</span>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Ou{" "}
//             <a href="/login" className="font-medium text-blue-800 hover:text-blue-700">
//               connectez-vous à votre compte existant
//             </a>
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

//             <div>
//               <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
//                 Type de compte
//               </label>
//               <div className="mt-1 grid grid-cols-2 gap-3">
//                 <div
//                   className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
//                     userType === "consommateur" ? "border-blue-800 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//                   }`}
//                   onClick={() => setUserType("consommateur")}
//                 >
//                   <label htmlFor="user-type-consumer" className="block w-full text-sm font-medium cursor-pointer">
//                     Consommateur
//                   </label>
//                   <input
//                     type="radio"
//                     id="user-type-consumer"
//                     name="user-type"
//                     className="sr-only"
//                     checked={userType === "consommateur"}
//                     onChange={() => setUserType("consommateur")}
//                   />
//                 </div>
//                 <div
//                   className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
//                     userType === "entreprise" ? "border-blue-800 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//                   }`}
//                   onClick={() => setUserType("entreprise")}
//                 >
//                   <label htmlFor="user-type-business" className="block w-full text-sm font-medium cursor-pointer">
//                     Entreprise
//                   </label>
//                   <input
//                     type="radio"
//                     id="user-type-business"
//                     name="user-type"
//                     className="sr-only"
//                     checked={userType === "entreprise"}
//                     onChange={() => setUserType("entreprise")}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 {userType === "consommateur" ? "Nom complet" : "Nom de l'entreprise"}
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Adresse email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
//                 Confirmer le mot de passe
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="confirm-password"
//                   name="confirm-password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 id="agree-terms"
//                 name="agree-terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
//                 J'accepte les{" "}
//                 <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
//                   conditions d'utilisation
//                 </a>{" "}
//                 et la{" "}
//                 <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
//                   politique de confidentialité
//                 </a>
//               </label>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={register.isPending}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   register.isPending ? "bg-blue-400" : "bg-blue-800 hover:bg-blue-700"
//                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//               >
//                 {register.isPending ? "Inscription en cours..." : "S'inscrire"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage




"use client"

import type React from "react"
import { useRegister } from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { showToast } from "../lib/toast"

// Schéma de validation avec Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
    role: z.enum(["consommateur", "entreprise"]),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "Vous devez accepter les conditions d'utilisation" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterPage: React.FC = () => {
  const register = useRegister()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "consommateur",
      agreeTerms: false,
    },
  })

  const userType = watch("role")

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      showToast.success("Inscription réussie ! Bienvenue sur ClickDeal.")
      window.location.href = "/login"
    } catch (err: any) {
      console.error("Registration error:", err)
      showToast.error(err.message || "Une erreur est survenue lors de l'inscription")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">CD</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <a href="/login" className="font-medium text-blue-800 hover:text-blue-700">
              connectez-vous à votre compte existant
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
                Type de compte
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div
                  className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
                    userType === "consommateur" ? "border-blue-800 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => {}}
                >
                  <label htmlFor="user-type-consumer" className="block w-full text-sm font-medium cursor-pointer">
                    Consommateur
                  </label>
                  <input
                    type="radio"
                    id="user-type-consumer"
                    value="consommateur"
                    className="sr-only"
                    {...registerField("role", { value: "consommateur" })}
                  />
                </div>
                <div
                  className={`relative border rounded-md px-3 py-2 shadow-sm cursor-pointer ${
                    userType === "entreprise" ? "border-blue-800 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => {}}
                >
                  <label htmlFor="user-type-business" className="block w-full text-sm font-medium cursor-pointer">
                    Entreprise
                  </label>
                  <input
                    type="radio"
                    id="user-type-business"
                    value="entreprise"
                    className="sr-only"
                    {...registerField("role", { value: "entreprise" })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {userType === "consommateur" ? "Nom complet" : "Nom de l'entreprise"}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...registerField("name")}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...registerField("email")}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...registerField("password")}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...registerField("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                type="checkbox"
                className={`h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded ${
                  errors.agreeTerms ? "border-red-300" : ""
                }`}
                {...registerField("agreeTerms")}
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                J'accepte les{" "}
                <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
                  politique de confidentialité
                </a>
              </label>
            </div>
            {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms.message}</p>}

            <div>
              <button
                type="submit"
                disabled={register.isPending}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  register.isPending ? "bg-blue-400" : "bg-blue-800 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {register.isPending ? "Inscription en cours..." : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
