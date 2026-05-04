import { useState } from "react"
import type { ChordDefinition } from "./types"
import Header from "./components/Header"
import ScalePanel from "./components/ScalePanel"
import FretboardCanvas from "./components/FretboardCanvas"
import ChordPanel from "./components/ChordPanel"

export default function App() {
  const [projectedChord, setProjectedChord] = useState<ChordDefinition | null>(null)

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <ScalePanel projectedChord={projectedChord} />
      <FretboardCanvas projectedChord={projectedChord} />
      <ChordPanel
        projectedChord={projectedChord}
        onToggleProject={setProjectedChord}
      />
      <footer className="text-center text-xs text-stone-400 py-4">
        指映 FretReflect · 个人乐理速查工具
      </footer>
    </div>
  )
}
