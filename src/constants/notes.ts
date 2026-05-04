import type { NoteName } from "../types"

export const ALL_NOTES: NoteName[] = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
]

export const NATURAL_NOTES: NoteName[] = [
  "C", "D", "E", "F", "G", "A", "B",
]

export const NOTE_LABEL_CN: Record<NoteName, string> = {
  "C": "C (Do)",
  "C#": "C#/Db",
  "D": "D (Re)",
  "D#": "D#/Eb",
  "E": "E (Mi)",
  "F": "F (Fa)",
  "F#": "F#/Gb",
  "G": "G (Sol)",
  "G#": "G#/Ab",
  "A": "A (La)",
  "A#": "A#/Bb",
  "B": "B (Si)",
}

export function getNoteIndex(note: NoteName): number {
  return ALL_NOTES.indexOf(note)
}

export function getNoteAtFret(openNote: NoteName, fret: number): NoteName {
  const idx = (getNoteIndex(openNote) + fret) % 12
  return ALL_NOTES[idx]
}

export function getOctaveAtFret(baseOctave: number, openNote: NoteName, fret: number): number {
  const idx = getNoteIndex(openNote) + fret
  return baseOctave + Math.floor(idx / 12)
}

export const ENHARMONIC_NAMES: Record<string, { sharp: string; flat: string }> = {
  "C#": { sharp: "C♯", flat: "D♭" },
  "D#": { sharp: "D♯", flat: "E♭" },
  "F#": { sharp: "F♯", flat: "G♭" },
  "G#": { sharp: "G♯", flat: "A♭" },
  "A#": { sharp: "A♯", flat: "B♭" },
}
