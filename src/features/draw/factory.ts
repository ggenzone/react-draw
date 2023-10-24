import { ShapeHandler } from '@/shapes'
import { type Properties, type Element } from '../../shapes/basic'
export interface CreateElementProps {
  properties: Properties
  currentPoint: Point
  shape: Shapes
}

export function createElement (props: CreateElementProps): Element {
  const { currentPoint, shape, properties } = props
  const handler = ShapeHandler(shape)

  return handler.startDrawing({ properties, currentPoint })

  // throw new Error('Not supported shape')
}

function isWithinElement (element: Element, currentPoint: Point) {
  return ShapeHandler(element.name).over({ element, currentPoint })
}

export function getElementAtPosition (elements: Element[], currentPoint: Point) {
  return elements.find((elem) => isWithinElement(elem, currentPoint))
}


export function getIndexElementAtPosition (elements: Element[], currentPoint: Point) {
  return elements.findIndex((elem) => isWithinElement(elem, currentPoint))
}