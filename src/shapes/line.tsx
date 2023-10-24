import {
  type BasicShape,
  type DrawFunctionProps,
  type Element,
  type OverFunctionProps,
  type CreateFunctionProps,
  type LineElement,
  type UpdateFunctionProps,
  type MoveFunctionProps
} from './basic'

function draw (props: DrawFunctionProps) {
  const { context, element } = props

  const fromPoint = { x: element.x, y: element.y }
  const toPoint = { x: element.x + element.width, y: element.y + element.height }

  context.lineWidth = element.lineWidth
  context.strokeStyle = element.strokeColor

  context.beginPath()
  context.moveTo(fromPoint.x, fromPoint.y)
  context.lineTo(toPoint.x, toPoint.y)

  context.stroke()


  if (element.selected) {
    context.lineWidth = 1

    context.strokeStyle = '#0d83cd'
    context.strokeRect(element.x - 4, element.y - 4, element.width + 8, element.height + 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x - 8, element.y - 8, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x + element.width, element.y - 8, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x + element.width, element.y + element.height, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x - 8, element.y + element.height, 8, 8)
  }


  /*
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

  context.stroke()*/
}

function startDrawing (props: CreateFunctionProps): Element {
  const { properties, currentPoint } = props
  const line: LineElement = {
    id: crypto.randomUUID(),
    name: 'line',
    x: currentPoint.x,
    y: currentPoint.y,
    width: 10,
    height: 10,
    angle: 0,
    strokeColor: properties.strokeColor,
    points: [{ x: 0, y: 0 }, { x: 5, y: 5 }],
    lineWidth: properties.lineWidth,

    selected: false
  }

  return line
}

function over (props: OverFunctionProps) {
  const { element, currentPoint } = props

  if (element.name === 'line') {
    console.log('over line')
    const insideXAxis = (element.x <= currentPoint.x) && (currentPoint.x < element.x + element.width)
    const insideYAxis = (element.y <= currentPoint.y) && (currentPoint.y < element.y + element.height)

    return insideXAxis && insideYAxis
  }

  return false
}

function updateDrawing (props: UpdateFunctionProps): Element {
  const { element: oldElement, currentPoint } = props

  if (oldElement.name === 'line') {
    const width = currentPoint.x - oldElement.x
    const height = currentPoint.y - oldElement.y
    const element = { ...oldElement, width, height }
    return element
  }

  throw new Error('Not implemented')
}

function endDrawing (props: UpdateFunctionProps): Element {
  const { element: oldElement } = props

  if (oldElement.name === 'line') {
    
    const width = oldElement.width
    const height = oldElement.height
    const element = { ...oldElement, width, height }
    return element
  }

  throw new Error('Not implemented')
}

function move (props: MoveFunctionProps): Element {
  const { element: oldElement, currentPoint, offset } = props
  if (oldElement.name === 'line') {

    const x = currentPoint.x - offset.x
    const y = currentPoint.y - offset.y
    const width = oldElement.width
    const height = oldElement.height
    const element = { ...oldElement, x, y, width, height }
    return element
  }

  throw new Error('Not implemented')
}


export const Line: BasicShape = {
  name: 'line',
  startDrawing,
  updateDrawing,
  endDrawing,

  draw,
  move,
  over
}
