export interface DrawFunctionProps {
  context: CanvasRenderingContext2D
  snapshot: ImageData | null
  currentPoint: Point
  initialPoint: Point | null
  prevPoint: Point | null
  lineWidth: number
  color: string
}

export interface BasicShape {
  name: Shapes
  draw: (props: DrawFunctionProps) => void
}
