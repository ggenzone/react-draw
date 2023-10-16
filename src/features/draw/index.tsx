import { Separator } from '@/components/ui/separator'
import { useDraw } from '@/hooks/use-draw'
import { useState } from 'react'

export default function PlaygroundPage () {
  const [color, setColor] = useState<string>('#ccc')
  const [lineWidth, setLineWidth] = useState<number>(5)
  const { canvasRef, onMouseDown } = useDraw({ onDraw })

  function onDraw ({ prevPoint, ctx, currentPoint }: Draw) {
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
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                Widgets
                <div className='mt-2 flex items-center justify-between'>
                  <label className='block'> Color
                    <input type='color' onChange={(ev) => { setColor(ev.target.value) }} value={color} />
                  </label>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <label className='block'> Brush
                    <input type='range' min={3} max={10} onChange={(ev) => { setLineWidth(Number(ev.target.value)) }} value={lineWidth} />
                  </label>
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
