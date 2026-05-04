import { useState } from "react"
import { Music, Eye, EyeOff } from "lucide-react"
import { CHORD_LIST, CHORDS } from "../constants/chords"
import { NOTE_LABEL_CN } from "../constants/notes"
import { getNoteColor } from "../utils/fretboard"
import type { ChordDefinition } from "../types"

interface ChordPanelProps {
  projectedChord: ChordDefinition | null
  onToggleProject: (chord: ChordDefinition | null) => void
}

export default function ChordPanel({ projectedChord, onToggleProject }: ChordPanelProps) {
  const [selected, setSelected] = useState<string>("C")

  const chord = CHORDS[selected]
  const isProjecting = projectedChord !== null && projectedChord.name === selected

  function handleSelect(name: string) {
    setSelected(name)
    if (projectedChord !== null) {
      onToggleProject(CHORDS[name])
    }
  }

  function handleToggle() {
    if (isProjecting) {
      onToggleProject(null)
    } else {
      onToggleProject(chord)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-purple-500 rounded-full inline-block" />
        常见和弦 · 构成 & 指法
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col items-center lg:min-w-[120px]">
            <button
              onClick={handleToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all mb-3
                ${isProjecting
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white border border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-600"
                }`}
            >
              {isProjecting ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
              {isProjecting ? "取消投射" : "投射到指板"}
            </button>

            <div className="flex lg:flex-col gap-2 flex-wrap justify-center">
              {CHORD_LIST.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleSelect(c.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
                    ${selected === c.name
                      ? "bg-amber-500 text-white shadow-md scale-105"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <Music className="w-5 h-5 text-amber-600" />
              {chord.displayName}
            </h3>

            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {chord.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: getNoteColor(note) }}
                >
                  {note.replace("#", "♯")}
                  <span className="text-[10px] ml-1 opacity-80 font-normal">
                    {NOTE_LABEL_CN[note].split(" ")[1]?.replace(/[()]/g, "") || ""}
                  </span>
                </span>
              ))}
            </div>

            <ChordBox chord={chord} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ChordBox({ chord }: { chord: ChordDefinition }) {
  const { fingering, startFret } = chord
  const maxFret = Math.max(...fingering.filter((f): f is number => f !== null && f > 0), 0)
  const visibleFrets = maxFret <= 4 ? 4 : maxFret

  const strings = fingering
  const topOffset = startFret ?? 1

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-0.5 items-end">
        {strings.map((fret, i) => (
          <div key={i} className="flex flex-col items-center w-8">
            <span className="text-[10px] font-medium text-stone-400 mb-0.5">
              {fret === null ? "✕" : fret === 0 ? "○" : ""}
            </span>
          </div>
        ))}
      </div>

      <div
        className="relative border-2 border-stone-700 rounded-sm bg-stone-100"
        style={{
          width: strings.length * 34 + 2,
          height: visibleFrets * 34 + 2,
        }}
      >
        {Array.from({ length: visibleFrets + 1 }, (_, row) => (
          <div
            key={row}
            className="absolute left-0 right-0 border-t border-stone-400"
            style={{ top: row * 34, height: row === 0 ? 2 : 0 }}
          />
        ))}

        {strings.map((_, si) => (
          <div
            key={si}
            className="absolute top-0 bottom-0 border-l border-stone-400"
            style={{ left: si * 34 + 17, width: 0 }}
          />
        ))}

        {strings.map((fret, si) => {
          if (fret === null || fret === 0) return null
          const col = si * 34 + 17
          const row = (fret - topOffset + 1) * 34 - 17
          return (
            <div
              key={si}
              className="absolute w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
              style={{
                left: col - 12,
                top: row - 12,
              }}
            >
              {fret}
            </div>
          )
        })}

        {startFret && startFret > 1 && (
          <div
            className="absolute -left-7 text-[10px] font-medium text-stone-500"
            style={{ top: 34 - 9 }}
          >
            {startFret}fr
          </div>
        )}
      </div>

      <div className="flex gap-0.5 mt-1">
        {strings.map((fret, i) => (
          <div key={i} className="w-8 text-center text-[11px] font-mono text-stone-600">
            {fret === null ? "✕" : fret}
          </div>
        ))}
      </div>
    </div>
  )
}
