import { type BasicShape, type DrawFunctionProps } from './basic'

function draw (props: DrawFunctionProps) {
  const { initialPoint, context, snapshot, currentPoint, lineWidth, color } = props

  if (snapshot !== null) {
    context.putImageData(snapshot, 0, 0)
  }
  const startPoint = initialPoint ?? currentPoint
  const radius = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2))
  context.beginPath()

  context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
  context.lineWidth = lineWidth
  context.strokeStyle = color
  context.stroke() //ctx.fill
}

export const Circle: BasicShape = {
  name: 'circle',
  draw
}
