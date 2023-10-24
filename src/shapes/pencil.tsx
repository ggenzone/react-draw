import { type BasicShape, type DrawFunctionProps } from './basic'

function draw (props: DrawFunctionProps) {
  const { context, currentPoint, lineWidth, color, prevPoint } = props

  const startPoint = prevPoint ?? currentPoint
  context.beginPath()
  context.lineWidth = lineWidth
  context.strokeStyle = color
  context.moveTo(startPoint.x, startPoint.y)
  context.lineTo(currentPoint.x, currentPoint.y)
  context.stroke()

  context.fillStyle = color
  context.beginPath()
  context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
  context.fill()
}

export const Pencil: BasicShape = {
  name: 'pencil',
  draw
}
