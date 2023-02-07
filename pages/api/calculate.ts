import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { data, Range } from '@/data/algorythmicData'
import { validation } from '@/helpers/validation'

type ResponseData = {
  score: number
}
type MeasureData = {
  type: string,
  value: number
}
type RequestData = {
  measurments: MeasureData[]
}

const isInRange = (range: Range, number: number) => {
  return number > range.min && number <= range.max
}

const calculateScore = (data: any, value: number) => {
  for(const measureData of data) {
    if(isInRange(measureData.range, value)) {
      return measureData.score
    }
  }
  return 0
}
const requestBodyValidation: yup.SchemaOf<RequestData> = yup.object().shape({
  measurments: yup.array().of(yup.object().shape({
    type: yup.string().required(),
    value: yup.number().required()
  }))
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | any>
) {
  const { method, body } = req

  /* We'are accepting only POST requests */
  if(method !== 'POST') {
    res.status(400)
    return
  }

  /* Run server-side validation */
  const { errors } = await validation(requestBodyValidation, body)

  if (errors) {
    res.status(400).json({ errors })
    return
  }

  /* Iterate all values, calculate scores, then sum them */
  const score = body.measurements
    .map((measure: MeasureData) => calculateScore(data[measure.type].ranges, measure.value))
    .reduce((a: number, b: number) => a + b, 0)

  res.status(200).json({ score })
}
