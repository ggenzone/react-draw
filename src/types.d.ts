interface Point {
  x: number
  y: number
}

type Shapes = 'rectangle' | 'circle' | 'brush' | 'pencil' | 'triangle' | 'line'

interface Draw {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
  initialPoint: Point | null
  snapshot: ImageData | null
}
