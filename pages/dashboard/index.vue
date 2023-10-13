<template>
    <div class="relative" id="home">
        <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <div class="relative pt-36 ml-auto">
                <div class="lg:w-2/3 h-screen">
                    <div class="">
                        <div>
                            <h1 class="text-2xl font-bold text-green">Dashboard</h1>
                        </div>
                        <div class="shadow-xl rounded p-3 mt-5">
                            <LinkForm @created="refresh" />
                        </div>
                        <div class="mt-10">
                            <LinkItem v-for="link in data" :key="link.id" :link="{
                                shortKey: link.short_key,
                                longUrl: link.long_url ?? '',
                                id: link.id,
                                totalClicks: link.total_clicks ?? 0
                            }" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Database } from 'types/supabase'
definePageMeta({
    middleware: 'auth'
})
const client = useSupabaseClient<Database>();
const user = useSupabaseUser()
const { data, refresh } = useAsyncData('links', async () => {
    const { data, error } = await client.from('links').select('*').eq('user_id', user.value?.id).order('id', { ascending: false })
    return data
})
</script>

