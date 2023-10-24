import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { useDraw } from '@/hooks/use-draw'
import { ShapeHandler } from '@/shapes'
import { ArrowLeftIcon, ArrowRightIcon, CircleIcon, CursorArrowIcon, DownloadIcon, HamburgerMenuIcon, HandIcon, LineHeightIcon, Pencil1Icon, QuestionMarkCircledIcon, Share1Icon, SlashIcon, SquareIcon, TrashIcon, TriangleDownIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'

type Shapes = 'rectangle' | 'line'

interface RectangleElement {
  id: string
  name: 'rectangle'

  x: number
  y: number
  width: number
  height: number
  angle: number


  backgroundColor: string
  strokeColor: string
}

interface LineElement {
  name: 'line'
}

type Element = RectangleElement | LineElement

interface CreateElementProps {
  currentPoint: Point
  shape: Shapes
}

function createElement (props: CreateElementProps): Element {
  const { currentPoint, shape } = props
  return ({
    id: crypto.randomUUID(),
    name: shape,
    x: currentPoint.x,
    y: currentPoint.y,
    width: 10,
    height: 10,
    angle: 0,

    backgroundColor: 'green',
    strokeColor: ''
  })
}

function useHistoryElements<T> (initialState: T[]) {
  const historyRef = useRef(0)
  const [history, setHistory] = useState<T[][]>([initialState])
  const [elements, setElements] = useState<T[]>(initialState)

  const updateElement = (index: number, element: T) => {
    setElements(prev => {
      const newElements = [...prev]
      newElements[index] = element
      return newElements
    })
  }
  const pushElement = (element: T) => {
    console.log('History position = ', (historyRef.current + 1))
    setHistory(history => [...history, elements])
    historyRef.current++
    setElements(prev => [...prev, element]) 
  }

  const undo = () => {
    if (historyRef.current > 0) {
      console.log('Undo to ', historyRef.current - 1)
      const newElements = history[historyRef.current - 1]
      historyRef.current--
      setElements(newElements)
    }
  }

  const redo = () => {
    if (historyRef.current < (history.length - 1)) {
      console.log('Redo to ', historyRef.current + 1)
      const newElements = history[historyRef.current + 1]
      historyRef.current++
      setElements(newElements)
    }
  }

  return { elements, setElements, pushElement, updateElement, undo, redo}
}

export default function PlaygroundPage () {
  const stats = useRef(0)

  const [tool, setTool] = useState('rectangle')
  const [color, setColor] = useState<string>('#cccccc')
  const [lineWidth, setLineWidth] = useState<number>(5)

  const { elements, pushElement, updateElement, undo, redo } = useHistoryElements<Element>([])

  const [drawing, setDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.button === 0) {
      setDrawing(true)
      const currentPoint = { x: e.clientX, y: e.clientY }
      if (tool === 'rectangle') {
        const element = createElement({ shape: 'rectangle', currentPoint })
        pushElement(element)
      }
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (drawing) {
      const currentPoint: Point = { x: e.clientX, y: e.clientY }

      const index = elements.length - 1
      const oldElement = elements[index]

      if (oldElement.name === 'rectangle') {
        const width = currentPoint.x - oldElement.x
        const height = currentPoint.y - oldElement.y
        const element = { ...oldElement, width, height }
        updateElement(index, element)
      }
    }
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.button === 0) {
      setDrawing(false)
    }
  }

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true)
    const currentPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    if (tool === 'rectangle') {
      const element = createElement({ shape: 'rectangle', currentPoint })
      pushElement(element)
    }
  }

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (drawing) {
      const currentPoint: Point = { x: e.touches[0].clientX, y: e.touches[0].clientY }

      const index = elements.length - 1
      const oldElement = elements[index]

      if (oldElement.name === 'rectangle') {
        const width = currentPoint.x - oldElement.x
        const height = currentPoint.y - oldElement.y
        const element = { ...oldElement, width, height }
        updateElement(index, element)
      }
    }
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(false)
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

    /**
     * Clear canvas
     */
    context.clearRect(0, 0, canvas.width, canvas.height)

    /**
     * Draw all elements
     */
    elements.forEach(element => {
      if (element.name === 'rectangle') {
        context.fillStyle = 'green'
        context.fillRect(element.x, element.y, element.width, element.height)
      }
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
            <Button size='icon' variant='ghost' className='rounded-none border border-grey-200' onClick={undo}>
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
    </div>
  )
}

export  function PlaygroundPage2 () {
  const [shape, setShape] = useState<string>('pencil')
  const [color, setColor] = useState<string>('#cccccc')
  const [lineWidth, setLineWidth] = useState<number>(5)
  const { canvasRef, onMouseDown, save, clear } = useDraw({ onDraw })

  function onDraw ({ prevPoint, ctx, currentPoint, initialPoint, snapshot }: Draw) {
    if (['pencil', 'rectangle', 'triangle', 'circle', 'line'].includes(shape)) {
      ShapeHandler(shape).draw({ context: ctx, initialPoint, currentPoint, snapshot, lineWidth, color, prevPoint })
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>

      <div className='absolute top-0 left-1/2 transform -translate-x-1/2  p-2'>
        <div className='flex items-center bg-white gap-2 w-full'>
          <div className='flex items-center justify-between'>
            <Button size='icon' variant='ghost' className='rounded-none border border-grey-200 rounded-l'>
              <HandIcon className='h-4 w-4'/>
            </Button>
            <Button size='icon' variant='ghost' className='rounded-none border border-grey-200'>
              <CursorArrowIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={shape === 'pencil' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setShape('pencil') } }
            >
              <Pencil1Icon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={shape === 'circle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setShape('circle') } }
            >
              <CircleIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={shape === 'rectangle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setShape('rectangle') } }
            >
              <SquareIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={shape === 'triangle' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200'
              onClick={() => { setShape('triangle') } }
            >
              <VercelLogoIcon className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant={shape === 'line' ? 'default' : 'ghost' }
              className='rounded-none border border-grey-200 rounded-r'
              onClick={() => { setShape('line') } }
            >
              <SlashIcon className='h-4 w-4' />
            </Button>
          </div>

          <Slider defaultValue={[lineWidth]} max={15} step={1} onValueCommit={(values) => { setLineWidth(values[0] ?? 5) } }/>
          <input type='color' onChange={(ev) => { setColor(ev.target.value) }} value={color} />
          <Button variant='ghost' onClick={save} size='icon' className='border'><DownloadIcon className='h-4 w-4' /></Button>
          <Button variant='ghost' size='icon' onClick={clear} className='border'><TrashIcon className='h-4 w-4'/></Button>
        </div>
      </div>
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
            <Button variant='ghost' size='sm'><ArrowLeftIcon className='h-4 w-4 mr-2'/> Undo</Button>
            <Separator orientation='vertical' className='bg-gray-400 '/>
            <Button variant='ghost' size='sm'>Redo <ArrowRightIcon className='h-4 w-4 ml-2' /></Button>
          </div>
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
