import { SchemaOf } from 'yup'

export async function validation<T = Record<string, any>>(
    scheme: SchemaOf<T>,
    data: Record<string, any> | null
  ) {
    try {
      await scheme.validate(data, { abortEarly: false });
      return { isValid: true, errors: null };
    } catch (error) {
      const { errors } = error as any;
      return { isValid: false, errors };
    }
}