"use client"

import { useRef, useEffect, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Connection {
  from: number
  to: number
  progress: number
  active: boolean
  pulseProgress: number
}

export function AnimatedNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
      canvas.width = width
      canvas.height = height
    })

    const parent = canvas.parentElement
    if (!parent) return
    resizeObserver.observe(parent)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize nodes
    const nodeCount = 25
    if (nodesRef.current.length === 0) {
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 4 + 3,
        })
      }
    }

    // Initialize connections
    if (connectionsRef.current.length === 0) {
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (Math.random() > 0.85) {
            connectionsRef.current.push({
              from: i,
              to: j,
              progress: 0,
              active: Math.random() > 0.5,
              pulseProgress: Math.random(),
            })
          }
        }
      }
    }

    let animationFrameId: number

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const nodes = nodesRef.current
      const connections = connectionsRef.current

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > dimensions.width) node.vx *= -1
        if (node.y < 0 || node.y > dimensions.height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(dimensions.width, node.x))
        node.y = Math.max(0, Math.min(dimensions.height, node.y))
      })

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        const dx = toNode.x - fromNode.x
        const dy = toNode.y - fromNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw if within range
        if (distance < 200) {
          const opacity = 1 - distance / 200

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Animate pulse along connection
          if (conn.active) {
            conn.pulseProgress += 0.008
            if (conn.pulseProgress > 1) {
              conn.pulseProgress = 0
              conn.active = Math.random() > 0.3
            }

            const pulseX = fromNode.x + dx * conn.pulseProgress
            const pulseY = fromNode.y + dy * conn.pulseProgress

            // Draw pulse
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.6})`
            ctx.fill()

            // Pulse glow
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.15})`
            ctx.fill()
          } else {
            // Randomly activate
            if (Math.random() > 0.998) {
              conn.active = true
              conn.pulseProgress = 0
            }
          }
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Node shadow/glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fill()

        // Main node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fill()

        // Inner highlight
        ctx.beginPath()
        ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [dimensions])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Faded grid background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
