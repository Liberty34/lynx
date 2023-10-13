<template>
    <UForm :validate="validate" :state="state" @submit="submitForm" class="gap-4 flex items-end">
        <UFormGroup label="Long URL" name="url" class="w-5/12 ">
            <UInput placeholder="https://example.com" icon="i-heroicons-globe-alt" v-model="state.url" />
        </UFormGroup>
        <UFormGroup label="Short Key" name="shortKey" class="w-5/12 ">
            <UInput placeholder="stkcy" v-model="state.key" />
        </UFormGroup>
        <UFormGroup class="w-2/12">
            <UButton type="submit" :ui="{ rounded: 'rounded-full' }" size="sm" block class="hover:scale-105 duration-500 ">
                Submit
            </UButton>
        </UFormGroup>
    </UForm>
</template>
<script setup lang="ts">
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { Database } from 'types/supabase'

const client = useSupabaseClient<Database>();
const user = useSupabaseUser()
const initialState = {
    url: undefined,
    key: nanoid(6)
}
const state = ref(initialState)
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.url) errors.push({ path: 'url', message: 'Provide long link' })
    if (!state.key) errors.push({ path: 'shortKey', message: 'Required' })
    return errors
}
const emit = defineEmits(['created'])
async function submitForm(event: FormSubmitEvent<any>) {
    try {
        const { data, error } = await client.from('links').insert({
            long_url: event.data.url,
            short_key: event.data.key,
            user_id: user.value?.id,
        })
        emit('created', 1)
        if (data) {
            state.value = initialState // reset the form
        }

    } catch (error) {
        console.log(error);
    }

}    </script>

