"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

const SnowEffect: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const createSnowflake = (id: number): Snowflake => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
    })

    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => createSnowflake(i))
    setSnowflakes(initialSnowflakes)

    const interval = setInterval(() => {
      setSnowflakes((prev) =>
        prev
          .map((flake) => ({
            ...flake,
            y: flake.y + flake.speed,
            x: flake.x + Math.sin(flake.y * 0.01) * 0.5,
          }))
          .filter((flake) => flake.y < window.innerHeight),
      )
    }, 50)

    const addSnowflake = setInterval(() => {
      setSnowflakes((prev) => {
        if (prev.length < 50) {
          return [...prev, createSnowflake(Date.now())]
        }
        return prev
      })
    }, 300)

    return () => {
      clearInterval(interval)
      clearInterval(addSnowflake)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default SnowEffect
