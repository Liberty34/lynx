<template></template>
<script setup lang="ts">
import geoip from 'geoip-lite2'
import { Database } from '@/types/supabase'
const params = useRoute().params;
const client = useSupabaseClient<Database>();

if (!params.id) {
    throw createError({
        statusCode: 404,
        message: 'Not Found'
    })
}
const { data } = await useAsyncData('link', async () => {
    const { data, error } = await client.from('links').select('*').eq('short_key', params.id).single()
    if (error) {
        throw createError({
            statusCode: 404,
            message: 'Not Found'
        })

    }
    return data
})



if (data.value?.long_url) {
    const ua = useUserAgent();
    if (ua && ua.ip) {
        const geo = geoip.lookup('207.97.227.239')

        if (geo) {
            const { data: res, error } = await client.from('clicks').insert([
                {
                    link_id: data.value.id,
                    ip: ua.ip,
                    country: geo.country,
                    // region: geo.region,
                    city: geo.city,
                    // browser: ua.browser,
                    // os: ua.os,
                    // platform: ua.platform,
                    // device: ua.device,
                    // referrer: ua.referrer,
                    user_agent: ua.userAgent,
                    // created_at: new Date()
                }
            ])
            if (error) {
                console.log("Error", error)
            }
        }
    }
    useExternalRedirect(data.value?.long_url)
} else {
    throw createError({
        statusCode: 404,
        message: 'Not Found'
    })
}
</script>