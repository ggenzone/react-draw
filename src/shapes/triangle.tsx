import { 
  type UpdateFunctionProps, 
  type BasicShape, 
  type DrawFunctionProps, 
  type OverFunctionProps, 
  type CreateFunctionProps,
  type Element,
  type MoveFunctionProps
} from './basic'

function draw (_props: DrawFunctionProps) {
  /*
  const {  context } = props

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

  context.stroke() //ctx.fill*/
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

export const Triangle: BasicShape = {
  name: 'triangle',
  startDrawing,
  updateDrawing,
  endDrawing,
  draw,
  move,
  over
}