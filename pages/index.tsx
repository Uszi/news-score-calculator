import Head from 'next/head'
import { Inter } from '@next/font/google'
import * as yup from "yup";

import styles from '@/styles/Home.module.css'
import Form, { FormProps } from '@/components/forms/form'
import NumericInput from '@/components/inputs/numeric-input'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const schema: yup.AnyObjectSchema = yup.object().shape({
    temp: yup.number().min(31).max(42).required(),
    hr: yup.number().min(25).max(220).required(),
    rr: yup.number().min(3).max(60).required()
  }).required();

  const renderForm = ({register, resetForm, errors, isSubmitting, isDirty}: FormProps) => {
    return <>
        <NumericInput 
          label={'Body temperature'} 
          description={'Degrees celcius'}
          name={'temp'}
          required={true}
          register={register}
          error={errors.temp?.message} />

        <NumericInput 
          label={'Heartrate'} 
          description={'Beats per minute'}
          name={'hr'}
          required={true}
          register={register}
          error={errors.hr?.message} />
          
        <NumericInput 
          label={'Respiratory rate'} 
          description={'Breaths per minute'}
          name={'rr'}
          required={true}
          register={register}
          error={errors.rr?.message} />

        <div className={styles.buttons}>
          <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading" : "Calculate NEWS score"}
          </button>
          {isDirty && <button type="button" onClick={() => resetForm()}>
              {"Reset form"}
          </button>}
        </div>
    </>
  }
  const renderSuccess = (responseData: any) => {
    return (
      <>
        <div className={styles.score_box}>News score:&nbsp;<strong>{responseData.score}</strong></div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>NEWS Score Calculator</title>
        <meta name="description" content="NEWS Score Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={inter.style}>
        <h2>NEWS score calculator</h2>
        <Form endpoint="/api/calculate" renderForm={renderForm} renderSuccess={renderSuccess} schema={schema} />
      </main>
    </>
  )
}
