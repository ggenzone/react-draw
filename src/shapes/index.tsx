import { Rectangle } from './rectangle'
import { Circle } from './circle'
import { Triangle } from './triangle'
import { Pencil } from './pencil'
import { Line } from './line'

export const ShapeHandler = (shape: string) => {
  switch (shape) {
    case 'rectangle':
      return Rectangle
    case 'circle':
      return Circle
    case 'triangle':
      return Triangle
    case 'brush':
    case 'pencil':
      return Pencil
    case 'line':
      return Line
    default:
      throw new Error('Unsupported Shape')
  }
}
