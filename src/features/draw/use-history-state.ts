import { useRef, useState } from "react"

export function useHistory<T> (initialState: T[]) {
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<T[][]>([initialState])

  const setState = (action: T[] | ((prev: T[]) => T[]), overwrite = false) => {
    const newState = typeof action === 'function' ? action(history[index]) : action

    if (overwrite) {
      const newHistory = [...history.slice(0, index + 1)]
      newHistory[index] = newState
      setHistory(newHistory)
    } else {
      const updatedState = history.slice(0, index + 1)
      setHistory([...updatedState, newState])
      setIndex(prev => prev + 1)
    }
  }

  const undo = () => {
    setIndex(prev => prev > 0 ? prev - 1 : prev)
  }
  const redo = () => {
    setIndex(prev => (prev < history.length - 1) ? prev + 1 : prev)
  }

  const pushElement = (element: T) => {
    setState(prev => {
      const newElements = [...prev, element]
      return newElements
    })
  }

  const updateElement = (elementIndex: number, element: T) => {
    setState(prev => {
      const newElements = [...prev]
      newElements[elementIndex] = element
      return newElements
    }, true)
  }

  return { elements: history[index], setElements: setState, pushElement, updateElement, undo, redo}
}

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
