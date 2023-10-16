import { downloadImage } from '@/lib/save-file'
import { useEffect, useRef, useState } from 'react'

interface UseDrawProps {
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void 
}

export const useDraw = ({ onDraw }: UseDrawProps) => {
  const [mouseDown, setMouseDown] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<Point | null>(null)

  const onMouseDown = () => { setMouseDown(true) }

  const clear = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (canvasRef?.current == null || ctx == null) {
      return
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const save = () => {
    if (canvasRef?.current === null) {
      return
    }
    const d = canvasRef.current.toDataURL('image/png')

    downloadImage(d, 'export.png')
    
    /*const w = window.open('about:blank', 'image from canvas')
    w?.document.write("<img src='" + d + "' alt='from canvas'/>")
    console.log('Saved!')*/
  }

  useEffect(() => {
    const onMouseUp = () => {
      setMouseDown(false)
      prevPoint.current = null
    }

    const handler = (e: MouseEvent) => {
      if (!mouseDown) return
      const currentPoint = computePointInCanvas(e)

      const ctx = canvasRef.current?.getContext('2d')
      if (ctx == null || currentPoint == null) {
        return
      }

      onDraw({ctx, currentPoint, prevPoint: prevPoint.current })
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e:MouseEvent) => {
      const canvas = canvasRef.current

      if (canvas === null) {
        return
      }

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      return { x, y }
    }

    if (canvasRef?.current !== null) {
      canvasRef.current.addEventListener('mousemove', handler)
    }
    window.document.addEventListener('mouseup', onMouseUp)

    return () => {
      canvasRef?.current?.removeEventListener('mousemove', handler)
      window.document.removeEventListener('mouseup', onMouseUp)
    }
  }, [onDraw])

  return { canvasRef, onMouseDown, save, clear }
}
