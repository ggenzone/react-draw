import { downloadImage } from '@/lib/save-file'
import { useEffect, useRef, useState } from 'react'

interface UseDrawProps {
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void 
}


export const useDraw = ({ onDraw }: UseDrawProps) => {
  const snapshot = useRef<ImageData | null>(null)
  const [mouseDown, setMouseDown] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<Point | null>(null)
  const initialPoint = useRef<Point | null>(null)

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (canvasRef?.current == null || ctx == null) {
      return
    }

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    initialPoint.current = { x, y }

    snapshot.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    setMouseDown(true)
  }

  const clear = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (canvasRef?.current == null || ctx == null) {
      return
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
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

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current, initialPoint: initialPoint.current, snapshot: snapshot.current })
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e: MouseEvent) => {
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
