<template>
    <div class="relative" id="home">
        <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <div class="relative pt-36 ml-auto">
                <div class="h-screen">
                    <div class="">
                        <div>
                            <h1 class="text-2xl font-bold text-green">{{ data?.short_key }}</h1>
                        </div>
                        <div class="shadow-xl rounded p-3 mt-5">
                            <div class="text-sm text-gray-500">
                                {{ data?.created_at }}
                            </div>
                            <div class="mt-5 flex justify-between items-center">
                                <div
                                    class="bg-gray-200 p-2 rounded-xl shadow-sm pl-5 w-1/2 h-16 items-center overflow-x-auto">
                                    <span class="text-gray-700 text-center">{{ data.long_url }}</span>
                                </div>
                                <div class="bg-gray-200 p-2 rounded-xl shadow-sm pl-5 justify-center">
                                    <div class="text-gray-700 text-center font-bold text-4xl">{{ data.total_clicks ?? 0 }}
                                    </div>
                                    <div class="text-center">Total Clicks</div>
                                </div>
                            </div>
                            <div class="mt-5">
                                <h2 class="text-xl mb-5 font-bold">
                                    Click Logs
                                </h2>

                                <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No Clicks.' }"
                                    :rows="data.clicks" :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                                    sort-desc-icon="i-heroicons-arrow-down-20-solid"
                                    :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }" />

                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- {{ console.log("Data : ", parseUserAgent(data.clicks[0].user_agent)) }} -->
</template>
<script setup lang="ts">
const columns = [{
    key: 'created_at',
    label: 'Date',
    sortable: true
}, {
    key: 'ip',
    label: 'IP Address',
    sortable: true,
    class: 'whitespace-nowrap'
}, {
    key: 'country',
    label: 'Country',
    sortable: true
}, {
    key: 'city',
    label: 'City',
    sortable: true
}, {
    key: 'user_agent',
    label: 'User Agent',
    sortable: true
}]
import { Database } from '@/types/supabase'
const { id } = useRoute().params
const client = useSupabaseClient<Database>()
const { data, refresh } = useAsyncData('links', async () => {
    const { data, error } = await client.from('links').select('*,clicks(*)').eq('short_key', id).single()
    return data
})

// type UserAgentInfo = {
//     os: string;
//     browser: string;
//     version: string;
// };
// const parseUserAgent = (userAgentString: string): UserAgentInfo => {
//     if (!userAgentString) { return { os: '', browser: '', version: '' } } else {
//         const parts = userAgentString.split(' ');

//         const userAgent: UserAgentInfo = {
//             os: parts[2],
//             browser: parts[parts.length - 2],
//             version: parts[parts.length - 1],
//         };
//         return userAgent;
//     }
// };
</script>