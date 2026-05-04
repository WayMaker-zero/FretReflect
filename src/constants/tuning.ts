import type { NoteName, FretNote } from "../types"
import { getNoteAtFret, getOctaveAtFret } from "./notes"

export const STRING_COUNT = 6
export const FRET_COUNT = 12

export interface StringTuning {
  stringNumber: number
  note: NoteName
  octave: number
}

// 木吉他标准调弦 EADGBE (从6弦到1弦)
export const STANDARD_TUNING: StringTuning[] = [
  { stringNumber: 6, note: "E", octave: 2 },
  { stringNumber: 5, note: "A", octave: 2 },
  { stringNumber: 4, note: "D", octave: 3 },
  { stringNumber: 3, note: "G", octave: 3 },
  { stringNumber: 2, note: "B", octave: 3 },
  { stringNumber: 1, note: "E", octave: 4 },
]

export function getFretNote(string: number, fret: number): FretNote {
  const tuning = STANDARD_TUNING.find((s) => s.stringNumber === string)
  if (!tuning) throw new Error(`Invalid string: ${string}`)
  return {
    string,
    fret,
    note: getNoteAtFret(tuning.note, fret),
    octave: getOctaveAtFret(tuning.octave, tuning.note, fret),
  }
}

export function getAllFretNotes(): FretNote[][] {
  return STANDARD_TUNING.map((s) =>
    Array.from({ length: FRET_COUNT + 1 }, (_, fret) => ({
      string: s.stringNumber,
      fret,
      note: getNoteAtFret(s.note, fret),
      octave: getOctaveAtFret(s.octave, s.note, fret),
    }))
  )
}
