import { type BasicShape, type DrawFunctionProps } from './basic'

function draw (props: DrawFunctionProps) {
  const { context, currentPoint, lineWidth, color, initialPoint, snapshot } = props

  if (snapshot !== null) {
    context.putImageData(snapshot, 0, 0)
  }
  const startPoint = initialPoint ?? currentPoint
  context.lineWidth = lineWidth
  context.strokeStyle = color

  context.beginPath()
  context.moveTo(startPoint.x, startPoint.y)
  context.lineTo(currentPoint.x, currentPoint.y)

  context.stroke()
}

export const Line: BasicShape = {
  name: 'line',
  draw
}
