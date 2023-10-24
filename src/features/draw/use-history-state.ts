import { useRef, useState } from "react"

export function useHistoryElements<T> (initialState: T[]) {
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
