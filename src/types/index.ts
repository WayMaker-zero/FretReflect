export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B"

export interface FretNote {
  string: number
  fret: number
  note: NoteName
  octave: number
}

export interface ChordDefinition {
  name: string
  displayName: string
  notes: NoteName[]
  fingering: (number | null)[]
  startFret?: number
}

export type ChordData = Record<string, ChordDefinition>
