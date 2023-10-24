import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { useDraw } from '@/hooks/use-draw'
import { ShapeHandler } from '@/shapes'
import { ArrowLeftIcon, ArrowRightIcon, CircleIcon, CursorArrowIcon, DownloadIcon, HamburgerMenuIcon, HandIcon, LineHeightIcon, Pencil1Icon, QuestionMarkCircledIcon, Share1Icon, SlashIcon, SquareIcon, TrashIcon, TriangleDownIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function PlaygroundPage () {
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
          {/**
            <Select onValueChange={(value) => { setShape(value) }} defaultValue={shape}>
              <SelectTrigger className="">
                <SelectValue placeholder="Figure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pencil">Pencil</SelectItem>
                <SelectItem value="rectangle">Rectable</SelectItem>
                <SelectItem value="rectangle-border">Rectable border</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
           */}

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
