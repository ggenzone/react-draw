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

export const Pencil: BasicShape = {
  name: 'pencil',
  startDrawing,
  updateDrawing,
  endDrawing,
  draw,
  move,
  over
}
