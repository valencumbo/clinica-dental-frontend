import { useState } from 'react'

const useForm = ({ initial_form_fields = {}, onSubmit }) => {

    const [form_state, setFormState] = useState(initial_form_fields)

    const onChangeFieldValue = (e) => {
        const { name, value } = e.target
        setFormState({
            ...form_state,
            [name]: value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit(form_state)
        }
    }

    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        setFormState
    }
}

export default useForm