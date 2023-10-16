interface Point {
  x: number
  y: number
}

interface Draw {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
  initialPoint: Point | null
  snapshot: ImageData | null
}
