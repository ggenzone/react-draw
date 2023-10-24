import { type BasicShape, type DrawFunctionProps } from './basic'

function draw (props: DrawFunctionProps) {
  const { initialPoint, context, snapshot, currentPoint, lineWidth, color } = props

  if (snapshot !== null) {
    context.putImageData(snapshot, 0, 0)
  }
  const startPoint = initialPoint ?? currentPoint

  context.lineWidth = lineWidth
  context.strokeStyle = color

  context.beginPath()
  context.moveTo(startPoint.x, startPoint.y)
  context.lineTo(currentPoint.x, currentPoint.y)
  context.lineTo((startPoint.x * 2) - currentPoint.x, currentPoint.y)
  context.closePath()

  context.stroke() //ctx.fill
}

export const Triangle: BasicShape = {
  name: 'triangle',
  draw
}