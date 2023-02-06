import { ReactNode, useState } from 'react'
import { FieldValues, useForm, UseFormRegister, UseFormReset } from "react-hook-form"
import { AnyObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css'

type Props = {
    endpoint: string
    renderForm: (formProps: FormProps) => ReactNode
    renderSuccess: (responseData: object) => ReactNode
    schema: AnyObjectSchema
}
export type FormProps = {
    register: UseFormRegister<FieldValues>
    resetForm: Function
    isSubmitting: boolean
    isDirty: boolean
    errors: { [error: string]: any }
}

function serialize(data: any) {
    return {
        measurements: Object.keys(data).map(key => {return {type: key.toUpperCase(), value: data[key]}}) 
    }
}

async function saveFormData(data: object, url: string) {
    return await fetch(url, {
        body: JSON.stringify(serialize(data)),
        headers: {"Content-Type": "application/json"},
        method: "POST"
    })
}

function Form({endpoint, renderForm, renderSuccess, schema}: Props) {
    const {register, reset, handleSubmit, setError, formState: {isSubmitting, errors, isDirty}} = useForm({ resolver: yupResolver(schema)})
    const [responseData, setResponseData] = useState(undefined)

    const onSubmit = async (data: object) => {
        const response = await saveFormData(data, endpoint)
        if (response.status === 400) {
            const fieldToErrorMessage: { [fieldName: string]: string } = await response.json()
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
                setError(fieldName, {type: 'custom', message: errorMessage})
            }
        } else if (response.ok) {
            setResponseData(await response.json())
        } else {
            toast.error("An unexpected error occurred while saving, please try again")
        }
    }

    const resetForm = () => {
        setResponseData(undefined)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {renderForm({register, resetForm, errors, isSubmitting, isDirty})}
            {responseData && renderSuccess(responseData)}
            <ToastContainer position="bottom-center"/>
        </form>
    )
}

export default Form