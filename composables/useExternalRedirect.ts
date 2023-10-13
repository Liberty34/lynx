import { sendRedirect } from "h3";
export default async function useExternalRedirect(
  url: string,
  code: number = 302
) {
  //Check if the URL is valid
  if (/^(https?:\/\/)/.test(url)) {
    //Check if it's server side
    if (process.server) {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        await nuxtApp.callHook("app:redirected").then(() => {
          if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        });
      }
    } else {
      window.location.href = url;
      return;
    }
  }
  throw createError({
    statusCode: 404,
    message: "Not Found",
  });
}
