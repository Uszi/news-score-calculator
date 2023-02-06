export type Range = {
    min: number,
    max: number
}
export type Measure = {
    range: Range
    score: number
}
export type AlgorithmData = {
    type: string,
    ranges: Measure[]
}
const tempData: AlgorithmData = {
    type: 'TEMP',
    ranges: [
      {
        range: { min: 31, max: 35 },
        score: 3
      },
      {
        range: { min: 35, max: 36 },
        score: 1
      },
      {
        range: { min: 36, max: 38 },
        score: 0
      },
      {
        range: { min: 38, max: 39 },
        score: 1
      },
      {
        range: { min: 39, max: 42 },
        score: 2
      },
    ]
  }
const hrData: AlgorithmData = {
    type: 'HR',
    ranges: [
      {
        range: { min: 25, max: 40 },
        score: 3
      },
      {
        range: { min: 40, max: 50 },
        score: 1
      },
      {
        range: { min: 50, max: 90 },
        score: 0
      },
      {
        range: { min: 90, max: 110 },
        score: 1
      },
      {
        range: { min: 110, max: 130 },
        score: 2
      },
      {
        range: { min: 130, max: 220 },
        score: 3
      },
    ]
  }
const rrData: AlgorithmData = {
    type: 'RR',
    ranges: [
      {
        range: { min: 3, max: 8 },
        score: 3
      },
      {
        range: { min: 8, max: 11 },
        score: 1
      },
      {
        range: { min: 11, max: 20 },
        score: 0
      },
      {
        range: { min: 20, max: 24 },
        score: 2
      },
      {
        range: { min: 24, max: 60 },
        score: 3
      },
    ]
  }

  export const data = { [tempData.type]: tempData, [hrData.type]: hrData, [rrData.type]: rrData }