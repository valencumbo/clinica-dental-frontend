import { useState } from "react"
import useRequest from "./useRequest"
import { createWorkspace } from "../services/workspaceService"
import useForm from "./useForm"

const useCreateWorkspace = () => {
    const { loading, error, sendRequest } = useRequest()
    const [errors, setErrors] = useState({})

    const handleCreateWorkspace = async (form_values) => {
        const newErrors = {};

        if (!form_values.name || form_values.name.trim() === '') {
            newErrors.name = 'El nombre del tratamiento es obligatorio.';
        }

        if (form_values.description && form_values.description.length > 1000) {
            newErrors.description = 'La descripción no puede superar los 1000 caracteres.';
        }

        if (!form_values.price || isNaN(form_values.price) || Number(form_values.price) <= 0) {
            newErrors.price = 'El precio es obligatorio y debe ser mayor a 0.';
        }

        if (!form_values.duration || isNaN(form_values.duration) || Number(form_values.duration) <= 0) {
            newErrors.duration = 'La duración en minutos es obligatoria y debe ser mayor a 0.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});

            const payload = {
                name: form_values.name,
                description: form_values.description,
                price: Number(form_values.price),
                duration: Number(form_values.duration)
            }

            await sendRequest(async () => {
                await createWorkspace(payload)
                window.location.href = '/home'
            })
        }
    }

    const { form_state, onChangeFieldValue, onSubmitForm } = useForm({
        initial_form_fields: {
            name: '',
            description: '',
            price: '',
            duration: ''
        },
        onSubmit: handleCreateWorkspace
    })

    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        isLoading: loading,
        error,
        errors
    }
}

export default useCreateWorkspace