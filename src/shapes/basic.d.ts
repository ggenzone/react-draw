export type Shapes = 'rectangle' | 'circle' | 'brush' | 'pencil' | 'triangle' | 'line'

export interface ShapeElement {
  id: string
  name: Shapes

  x: number
  y: number
  width: number
  height: number
  angle: number

  selected: boolean
}

export interface RectangleElement extends ShapeElement {
  name: 'rectangle'
  backgroundColor: string
  strokeColor: string
  lineWidth: number
}

export interface LineElement extends ShapeElement {
  name: 'line'
  points: Point[]
  strokeColor: string
  lineWidth: number
}

export interface CircleElement extends ShapeElement {
  name: 'circle'
  backgroundColor: string
  strokeColor: string
  lineWidth: number
}

export interface TriangleElement extends ShapeElement {
  name: 'triangle'
  backgroundColor: string
  strokeColor: string
  lineWidth: number
}

export type Element = RectangleElement | LineElement | CircleElement | TriangleElement

export interface DrawFunctionProps {
  context: CanvasRenderingContext2D
  element: Element
  /*
  snapshot: ImageData | null
  currentPoint: Point
  initialPoint: Point | null
  prevPoint: Point | null
  lineWidth: number
  color: string
  */
}

export interface OverFunctionProps {
  element: Element
  currentPoint: Point
}

export interface Properties {
  lineWidth: number
  backgroundColor: string
  strokeColor: string
}

export interface CreateFunctionProps {
  properties: Properties
  currentPoint: Point
}

export interface UpdateFunctionProps {
  element: Element
  currentPoint: Point
}

export interface MoveFunctionProps {
  element: Element
  currentPoint: Point
  offset: Point
}


export interface BasicShape {
  name: Shapes
  startDrawing: (props: CreateFunctionProps) => Element
  updateDrawing: (props: UpdateFunctionProps) => Element
  endDrawing: (props: UpdateFunctionProps) => Element

  /*
  create: (props: CreateFunctionProps) => Element
  update: (props: UpdateFunctionProps) => Element
  */
 
  move: (props: MoveFunctionProps) => Element
  draw: (props: DrawFunctionProps) => void
  over: (props: OverFunctionProps) => boolean
}
