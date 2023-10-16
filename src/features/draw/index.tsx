import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { useDraw } from '@/hooks/use-draw'
import { useState } from 'react'

export default function PlaygroundPage () {
  const [shape, setShape] = useState<string>('brush')
  const [color, setColor] = useState<string>('#cccccc')
  const [lineWidth, setLineWidth] = useState<number>(5)
  const { canvasRef, onMouseDown, save, clear } = useDraw({ onDraw })

  function onDraw ({ prevPoint, ctx, currentPoint, initialPoint, snapshot }: Draw) {
    if (shape === 'brush') {
      const startPoint = prevPoint ?? currentPoint
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.stroke()

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
      ctx.fill()
    }

    if (shape === 'rectangle-border') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint
      ctx.strokeRect(startPoint.x, startPoint.y, currentPoint.x - startPoint.x, currentPoint.y - startPoint.y)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
    }

    if (shape === 'rectangle') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint
      ctx.fillRect(startPoint.x, startPoint.y, currentPoint.x - startPoint.x, currentPoint.y - startPoint.y)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
    }

    if (shape === 'circle') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint
      const radius = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2))
      ctx.beginPath()

      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
      ctx.stroke() //ctx.fill 
    }

    if (shape === 'triangle') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint

      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color

      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.lineTo((startPoint.x * 2) - currentPoint.x, currentPoint.y)
      ctx.closePath()

      ctx.stroke() //ctx.fill
    }


    if (shape === 'line') {
      if (snapshot !== null) {
        ctx.putImageData(snapshot, 0, 0)
      }
      const startPoint = initialPoint ?? currentPoint
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color

      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)

      ctx.stroke() 
    }
  }

  return (
    <>
      <div className="h-full flex-col flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <div className="hidden space-x-2 md:flex">
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2 border rounded-sm border-black p-4 bg-background">
                <div className='mt-2 flex items-center justify-between '>
                  <label className='w-full'>Shape </label>
                  <Select onValueChange={(value) => { setShape(value) }} defaultValue={shape}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Figure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brush">Brush</SelectItem>
                      <SelectItem value="rectangle">Rectable</SelectItem>
                      <SelectItem value="rectangle-border">Rectable border</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="triangle">Triangle</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className='mt-2 flex items-center justify-between '>
                  <label className='w-full'> Color </label>
                  <input type='color' onChange={(ev) => { setColor(ev.target.value) }} value={color} />
                </div>
                <Separator />
                <div className='mt-2 flex items-center justify-between'>
                  <label className='w-full'> Brush </label>
                  <Slider defaultValue={[lineWidth]} max={15} step={1} onValueCommit={(values) => { setLineWidth(values[0] ?? 5) } }/>
                </div>
                <Separator />
                <div className='flex flex-grow'></div>
                <div className='mt-2 flex items-center justify-between'>
                  <Button variant='secondary' onClick={clear} className='w-full' size='sm'>Clear canvas</Button>
                </div>

                <div className='mt-2 flex items-center justify-between'>
                  <Button variant='default' onClick={save} className='w-full' size='sm'>Save</Button>
                </div>
              </div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div>
                      <canvas onMouseDown={onMouseDown} ref={canvasRef} className='rounded-sm border border-black' width={750} height={750}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
