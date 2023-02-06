import style from '@/styles/NumericInput.module.css'

type NumericInputProps = {
    name: string, 
    label: string, 
    description: string,
    error?: string,
    required: boolean
    register: any
}

export default function NumericInput({name, label, description, error, required, register}: NumericInputProps) {
  return (
    <div className={style.numericinput}>
        <label htmlFor={name}>{label}</label>
        <span className="description">{description}</span>
        <input type="number" step="any" id={name} name={name} required={required} {...register(name, {required: true})} />
        {error && <span className="error">{error}</span>}
    </div>
  )
}
