import { 
  type BasicShape,
  type DrawFunctionProps,
  type OverFunctionProps,
  type Element,
  type UpdateFunctionProps,
  type CreateFunctionProps,
  type RectangleElement,
  type MoveFunctionProps
} from './basic'

function draw (props: DrawFunctionProps) {
  const { context, element } = props

  if (element.name === 'rectangle') {
    context.fillStyle = element.backgroundColor
    context.fillRect(element.x, element.y, element.width, element.height)

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
  }
}

function over (props: OverFunctionProps) {
  const { element, currentPoint } = props

  if (element.name === 'rectangle') {
    const insideXAxis = (element.x <= currentPoint.x) && (currentPoint.x < element.x + element.width)
    const insideYAxis = (element.y <= currentPoint.y) && (currentPoint.y < element.y + element.height)

    return insideXAxis && insideYAxis
  }

  return false
}

function updateDrawing (props: UpdateFunctionProps): Element {
  const { element: oldElement, currentPoint } = props
  if (oldElement.name === 'rectangle') {
    const width = currentPoint.x - oldElement.x
    const height = currentPoint.y - oldElement.y

    const element = { ...oldElement, width, height }
    return element
  }

  throw new Error('Not implemented')
}

function endDrawing (props: UpdateFunctionProps): Element {
  const { element: oldElement } = props
  if (oldElement.name === 'rectangle') {
    const minX = Math.min(oldElement.x, oldElement.x + oldElement.width)
    const minY = Math.min(oldElement.y, oldElement.y + oldElement.height)

    const element = { ...oldElement, x: minX, y: minY, width: Math.abs(oldElement.width), height: Math.abs(oldElement.height) }
    return element
  }

  throw new Error('Not implemented')
}

function move (props: MoveFunctionProps): Element {
  const { element: oldElement, currentPoint, offset } = props
  if (oldElement.name === 'rectangle') {

    const x = currentPoint.x - offset.x
    const y = currentPoint.y - offset.y
    const width = oldElement.width
    const height = oldElement.height
    const element = { ...oldElement, x, y, width, height }
    return element
  }

  throw new Error('Not implemented')
}


function startDrawing (props: CreateFunctionProps): Element {
  const { properties, currentPoint } = props
  const rectangle: RectangleElement = {
    id: crypto.randomUUID(),
    name: 'rectangle',
    x: currentPoint.x,
    y: currentPoint.y,
    width: 10,
    height: 10,
    angle: 0,

    backgroundColor: properties.backgroundColor,
    strokeColor: properties.strokeColor,
    lineWidth: properties.lineWidth,

    selected: false
  }

  return rectangle
}

export const Rectangle: BasicShape = {
  name: 'rectangle',
  startDrawing,
  updateDrawing,
  endDrawing,
  move,
  draw,
  over
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
