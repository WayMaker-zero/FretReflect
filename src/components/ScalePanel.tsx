import { ALL_NOTES, NATURAL_NOTES, ENHARMONIC_NAMES } from "../constants/notes"
import { getNoteColor } from "../utils/fretboard"
import type { ChordDefinition } from "../types"

const SOLFEGE_MAP: Record<string, string> = {
  C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si",
}

interface ScalePanelProps {
  projectedChord: ChordDefinition | null
}

export default function ScalePanel({ projectedChord }: ScalePanelProps) {
  const chordNotes = projectedChord?.notes ?? []

  return (
    <section className="max-w-3xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-amber-500 rounded-full inline-block" />
        基础音阶 · 一个八度
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        <div className="flex items-end justify-center gap-0">
          {ALL_NOTES.map((note) => {
            const isNatural = NATURAL_NOTES.includes(note)
            const color = getNoteColor(note)
            const inChord = chordNotes.includes(note)
            const active = inChord && projectedChord !== null

            if (isNatural) {
              return (
                <div key={note} className="flex flex-col items-center shrink-0" style={{ width: 48 }}>
                  <div
                    className="flex flex-col items-center justify-center rounded-md shadow-sm transition-all duration-200"
                    style={{
                      width: 48,
                      height: 60,
                      borderWidth: active ? 2.5 : 2,
                      borderStyle: "solid",
                      borderColor: color,
                      backgroundColor: active ? color : "#fff",
                      color: active ? "#fff" : color,
                    }}
                  >
                    <span className="text-base font-bold leading-tight">{note}</span>
                    <span className="text-[10px] leading-tight opacity-60">
                      {SOLFEGE_MAP[note]}
                    </span>
                  </div>
                  {active && (
                    <div className="w-1 h-1 rounded-full mt-1" style={{ backgroundColor: color }} />
                  )}
                </div>
              )
            }

            const enh = ENHARMONIC_NAMES[note]
            return (
              <div key={note} className="flex flex-col items-center shrink-0" style={{ width: 42 }}>
                <div className="flex items-start justify-center" style={{ height: 60, paddingTop: 2 }}>
                  <div
                    className="rounded-full flex flex-col items-center justify-center shadow-sm transition-all duration-200"
                    style={{
                      width: 38,
                      height: 38,
                      borderWidth: active ? 2.5 : 2,
                      borderStyle: "solid",
                      borderColor: color,
                      backgroundColor: active ? color : "#fff",
                      color: active ? "#fff" : color,
                    }}
                  >
                    {enh && (
                      <>
                        <span className="text-[10px] font-bold leading-none">
                          {active ? enh.sharp : enh.sharp}
                        </span>
                        <span className="text-[9px] leading-none opacity-70">
                          {enh.flat}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {active && (
                  <div className="w-1 h-1 rounded-full mt-1" style={{ backgroundColor: color }} />
                )}
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-stone-400 mt-3">
          方形 = 自然音　圆形 = 半音　{projectedChord && (
            <span className="text-amber-600 font-medium">实色 = 和弦构成音</span>
          )}
          {!projectedChord && "升降双名标注"}
        </p>
      </div>
    </section>
  )
}
