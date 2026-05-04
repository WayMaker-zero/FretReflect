import type { ChordData } from "../types"

// fingering: [6弦, 5弦, 4弦, 3弦, 2弦, 1弦]
// null=闷音, 0=空弦, 数字=按的品位
export const CHORDS: ChordData = {
  C: {
    name: "C",
    displayName: "C 大三和弦",
    notes: ["C", "E", "G"],
    fingering: [null, 3, 2, 0, 1, 0],
    startFret: 1,
  },
  D: {
    name: "D",
    displayName: "D 大三和弦",
    notes: ["D", "F#", "A"],
    fingering: [null, null, 0, 2, 3, 2],
    startFret: 1,
  },
  Dm: {
    name: "Dm",
    displayName: "Dm 小三和弦",
    notes: ["D", "F", "A"],
    fingering: [null, null, 0, 2, 3, 1],
    startFret: 1,
  },
  E: {
    name: "E",
    displayName: "E 大三和弦",
    notes: ["E", "G#", "B"],
    fingering: [0, 2, 2, 1, 0, 0],
    startFret: 1,
  },
  Em: {
    name: "Em",
    displayName: "Em 小三和弦",
    notes: ["E", "G", "B"],
    fingering: [0, 2, 2, 0, 0, 0],
    startFret: 1,
  },
  F: {
    name: "F",
    displayName: "F 大三和弦",
    notes: ["F", "A", "C"],
    fingering: [1, 3, 3, 2, 1, 1],
    startFret: 1,
  },
  G: {
    name: "G",
    displayName: "G 大三和弦",
    notes: ["G", "B", "D"],
    fingering: [3, 2, 0, 0, 0, 3],
    startFret: 1,
  },
  A: {
    name: "A",
    displayName: "A 大三和弦",
    notes: ["A", "C#", "E"],
    fingering: [null, 0, 2, 2, 2, 0],
    startFret: 1,
  },
  Am: {
    name: "Am",
    displayName: "Am 小三和弦",
    notes: ["A", "C", "E"],
    fingering: [null, 0, 2, 2, 1, 0],
    startFret: 1,
  },
  B7: {
    name: "B7",
    displayName: "B7 属七和弦",
    notes: ["B", "D#", "F#", "A"],
    fingering: [null, 2, 1, 2, 0, 2],
    startFret: 1,
  },
}

export const CHORD_LIST = Object.values(CHORDS)
