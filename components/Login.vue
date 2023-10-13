<template>
    <div class="bg-cyan-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div class="md:w-1/2 px-5">
            <h2 class="font-bold text-2xl"><template v-if="isLoggingIn">Login</template><template v-else>Register</template>
            </h2>
            <p class="text-sm mt-4">If you are already am member, easing sign in here</p>
            <UForm :validate="validate" :state="{ email, password }" @submit="handleFormLogin" class="gap-4">
                <UFormGroup label="Email" name="email" class="p-2 mt-3">
                    <UInput v-model="email" />
                </UFormGroup>
                <UFormGroup label="Password" name="password" class="p-2">
                    <UInput v-model="password" type="password" />
                </UFormGroup>
                <UFormGroup class="p-2">
                    <UButton type="submit" block class="hover:scale-105 duration-500">
                        <template v-if="isLoggingIn">Login</template><template v-else>Register</template>
                    </UButton>
                </UFormGroup>

                <div class="mt-3 grid grid-cols-3 items-center text-gray-400">
                    <hr class="border-gray-400">
                    <p class="text-center">OR</p>
                    <hr class="border-gray-400">
                </div>
                <UFormGroup class="p-2">
                    <UButton label="Connect with Google" color="white" block class="mt-3 hover:scale-105 duration-500">
                        <template #leading>
                            <IconGoogle class="mr-3" />
                        </template>
                    </UButton>
                </UFormGroup>
                <UFormGroup class="p-2">
                    <UButton label="Connect with Github" color="white" block class="mt-3 hover:scale-105 duration-500"
                        @click="handleGithubLogin">
                        <template #leading>
                            <IconGithub class="mr-3" />
                        </template>
                    </UButton>
                </UFormGroup>
                <p class="mt-5 text-xs border-b py-4">Forgot your password?</p>
                <div class="flex justify-between items-center">
                    <p class="text-xs"><template v-if="!isLoggingIn">Already registered?</template><template v-else>Don't
                            have an account?</template></p>
                    <UFormGroup class="p-2">
                        <UButton block class="hover:scale-110 duration-500" @click="isLoggingIn = !isLoggingIn"><template
                                v-if="!isLoggingIn">Login</template><template v-else>Register</template></UButton>
                    </UFormGroup>
                </div>
            </UForm>
        </div>
        <div class="w-1/2 md:block hidden ">
            <img src="/link.jpg" class="rounded-2xl " />
        </div>
        {{ err }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const email = ref('');
const password = ref('');
const errors: FormError[] = [];
const isLoggingIn = ref<boolean>(true)

const validate = () => {
    errors.length = 0; // Clear previous errors
    if (!email.value) errors.push({ path: 'email', message: 'Email is required' });
    if (!isValidEmail(email.value)) errors.push({ path: 'email', message: 'Invalid email format' });
    if (!password.value) errors.push({ path: 'password', message: 'Password is required' });
    return errors;
};

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const supabase = useSupabaseClient();

const handleGithubLogin = async () => {
    supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: '/dashboard' },
    }).then(({ data, error }) => {
        console.log("Github Login Success", data);
        if (!error) {
            useRouter().push('/dashboard')
        }
    })
    // const { error } = await supabase.auth.signInWithOAuth({
    //     provider: 'github',
    // })
    // if (error) {
    //     console.log("Error Github Login : ", error);
    //     return
    // }
}
let err: string;
const handleFormLogin = async () => {
    if (!isLoggingIn.value) return handleSignUp()
    try {
        supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        }).then(() => {
            useRouter().push('/dashboard')
        })
        // const { data, error } = await supabase.auth.signInWithPassword({
        //     email: email.value,
        //     password: password.value
        // });
        // if (error) {
        //     // errors.push({ path: 'email', message: 'Wrong email or password' });
        //     err = 'Wrong email or password'
        //     console.log("Error Login : ", error);

        //     return
        // }
        // err = ''
        // useRouter().push('/dashboard')

    } catch (error) {
        console.error(error);
    }
}

const handleSignUp = async () => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        });
        if (error) {
            // errors.push({ path: 'email', message: 'Wrong email or password' });
            err = 'Wrong email or password'
            return
        }

        err = 'Registered Successfully'

    } catch (error) {
        console.error(error);
    }
}
const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/dashboard'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
}

</script>
