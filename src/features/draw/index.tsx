import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleIcon,
  CursorArrowIcon,
  HamburgerMenuIcon,
  HandIcon,
  Pencil1Icon,
  QuestionMarkCircledIcon,
  Share1Icon,
  SlashIcon,
  SquareIcon,
  VercelLogoIcon
} from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import { type Properties, type Element } from '../../shapes/basic'

import { useHistoryElements } from './use-history-state'
import { getElementAtPosition, getIndexElementAtPosition } from './factory'
import { ShapeHandler } from '@/shapes'


export default function PlaygroundPage () {
  const stats = useRef(0)

  const [offset, setOffset] = useState<Point|null>(null)
  const [tool, setTool] = useState('rectangle')
  const [color, setColor] = useState<string>('#cccccc')
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [selected, setSelected] = useState<Element | null>(null)

  const { elements, pushElement, updateElement, undo, redo } = useHistoryElements<Element>([])

  const [action, setAction] = useState('none')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDown = (currentPoint: Point) => {
    if (tool === 'selector') {
      const index = getIndexElementAtPosition(elements, currentPoint)
      if (index !== -1) {
        const selectedElement = elements[index] ?? undefined
        if ( selectedElement !== undefined) {
          selectedElement.selected = true
          const offset = { x: currentPoint.x - selectedElement.x, y: currentPoint.y - selectedElement.y }

          setAction('moving')
          setOffset(offset)
          setSelected(selectedElement)
          updateElement(index, selectedElement)
          console.log('moving')
        }
      } else {
        setSelected(null)
      }
    } else {
      if (['rectangle', 'line', 'circle', 'triangle'].includes(tool)) {
        const shape = tool as Shapes

        const properties: Properties = {
          backgroundColor: color,
          strokeColor: color,
          lineWidth
        }

        const element = ShapeHandler(shape).startDrawing({ properties, currentPoint })

        pushElement(element)
        setSelected(element)
      }
      setAction('drawing')
    }
  }

  const onMove = (currentPoint: Point) => {
    if (selected !== null) {
      const index = elements.findIndex(el => el.id === selected.id)

      if (index !== -1) {
        const oldElement = elements[index]

        if (action === 'drawing') {
          console.log('drawing')
          const newElement = ShapeHandler(oldElement.name).updateDrawing({ element: oldElement, currentPoint })
          updateElement(index, newElement)
        } else if (action === 'moving' && offset != null) {
          const newElement = ShapeHandler(oldElement.name).move({ element: oldElement, currentPoint, offset })
          updateElement(index, newElement)
        }
      }
    }
  }

  const onUp = (currentPoint: Point) => {
    if (selected !== null) {
      const index = elements.findIndex(el => el.id === selected.id)

      if (index !== -1) {
        const oldElement = elements[index]

        if (action === 'drawing') {
          const newElement = ShapeHandler(oldElement.name).endDrawing({ element: oldElement, currentPoint })
          updateElement(index, newElement)
        }
      }
      setSelected(null)
    }
    setAction('none')
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.button === 0) {
      const currentPoint = { x: e.clientX, y: e.clientY }
      onDown(currentPoint)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const currentPoint: Point = { x: e.clientX, y: e.clientY }
    if (tool === 'selector') {
      // @ts-expect-error todo
      e.target.style.cursor = (getElementAtPosition(elements, currentPoint) === undefined) ? 'default' : 'grab'  // 
    }

    onMove(currentPoint)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.button === 0) {
      onUp({ x: e.clientX, y: e.clientY })
    }
  }

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const currentPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    onDown(currentPoint)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const currentPoint: Point = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    onMove(currentPoint)
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    onUp({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }

  useEffect(() => {
    console.log('Drawing' + stats.current)
    stats.current++

    /**
     * Validate canvas's references
     */
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (canvas == null || context == null) {
      throw new Error('No canvas element')
    }

    // canvas.style.cursor = 'crosshair'
    /**
     * Clear canvas
     */
    context.clearRect(0, 0, canvas.width, canvas.height)

    /**
     * Draw all elements
     */
    elements.forEach(element => {
      ShapeHandler(element.name).draw({ context, element })
    })
  }, [canvasRef, elements])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        Canvas is not supported
      </canvas>

      <div className="absolute bottom-0 left-0 p-2 ">
        <div className='flex'>

          <div className='bg-gray-200 rounded-md cursor-none flex items-center'>
            <Button variant='ghost' size='sm'>-</Button>
            <Separator orientation='vertical'/>
            <Separator orientation='vertical' className='bg-gray-400 '/>
            <span className='px-1'>100 %</span>
            <Separator orientation='vertical' className='bg-gray-400 '/>
            <Button variant='ghost' size='sm'>+</Button>
          </div>

          <div className='bg-gray-200 rounded-md cursor-none flex items-center ml-2'>
            <Button variant='ghost' size='sm' onClick={undo}><ArrowLeftIcon className='h-4 w-4 mr-2'/> Undo</Button>
            <Separator orientation='vertical' className='bg-gray-400 '/>
            <Button variant='ghost' size='sm' onClick={redo}>Redo <ArrowRightIcon className='h-4 w-4 ml-2' /></Button>
          </div>
        </div>
      </div>

      <div className='absolute top-0 left-1/2 transform -translate-x-1/2  p-2'>
        <div className='flex items-center bg-white gap-2 w-full'>
          <div className='flex items-center justify-between'>
            <Button size='icon' variant='ghost' className='rounded-none border border-grey-200 rounded-l'>
              <HandIcon className='h-4 w-4'/>
            </Button>
            <Button
              size='icon'
              variant={tool === 'selector' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setTool('selector') } }
            >
              <CursorArrowIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={tool === 'pencil' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setTool('pencil') } }
            >
              <Pencil1Icon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={tool === 'circle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setTool('circle') } }
            >
              <CircleIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={tool === 'rectangle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setTool('rectangle') } }
            >
              <SquareIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={tool === 'triangle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setTool('triangle') } }
            >
              <VercelLogoIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={tool === 'line' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200 rounded-r'
              onClick={() => { setTool('line') } }
            >
              <SlashIcon className='h-4 w-4' />
            </Button>
          </div>

          <Slider defaultValue={[lineWidth]} max={15} step={1} onValueCommit={(values) => { setLineWidth(values[0] ?? 5) } }/>
          <input type='color' onChange={(ev) => { setColor(ev.target.value) }} value={color} />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <div className='bg-white'>
          <Button size='icon' variant='outline'>
            <QuestionMarkCircledIcon className='h-4 w-4'/>
          </Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-2">
        <div className='bg-white'>
          <Button size='icon' variant='outline'>
            <HamburgerMenuIcon className='h-4 w-4'/>
          </Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-2 w-[200px] mt-16">
        <div className='bg-white border w-[200px] h-[500px]'>
          Panel
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <div className='bg-white'>
          <Button variant='outline' size='sm'><Share1Icon className='h-4 w-4 mr-2'/> Share</Button>
        </div>
      </div>
    </div>
  )
}
