import { type BasicShape, type DrawFunctionProps } from './basic'

function draw (props: DrawFunctionProps) {
  const { initialPoint, context, snapshot, currentPoint, lineWidth, color } = props
  if (snapshot !== null) {
    context.putImageData(snapshot, 0, 0)
  }
  const startPoint = initialPoint ?? currentPoint
  context.strokeRect(startPoint.x, startPoint.y, currentPoint.x - startPoint.x, currentPoint.y - startPoint.y)
  context.lineWidth = lineWidth
  context.strokeStyle = color
}

export const Rectangle: BasicShape = {
  name: 'rectangle',
  draw
}


    /*
    if (shape === 'rectangle-border') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint
      ctx.strokeRect(startPoint.x, startPoint.y, currentPoint.x - startPoint.x, currentPoint.y - startPoint.y)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
    }*/
