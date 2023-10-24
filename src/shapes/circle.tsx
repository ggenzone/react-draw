import {
  type BasicShape,
  type DrawFunctionProps,
  type OverFunctionProps,
  type Element,
  type UpdateFunctionProps,
  type CreateFunctionProps,
  type MoveFunctionProps
} from './basic'

function draw (_props: DrawFunctionProps) {
  /*
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
  */
}

function over (_props: OverFunctionProps) {
  return false
}

function startDrawing (_props: CreateFunctionProps): Element {
  throw new Error('Not implemented')
}

function updateDrawing (_props: UpdateFunctionProps): Element {
  throw new Error('Not implemented')
}

function endDrawing (_props: UpdateFunctionProps): Element {
  throw new Error('Not implemented')
}

function move (_props: MoveFunctionProps): Element {
  throw new Error('Not implemented')
}

export const Circle: BasicShape = {
  name: 'circle',
  startDrawing,
  updateDrawing,
  endDrawing,
  draw,
  move,
  over
}
