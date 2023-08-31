import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { usePassThrough } from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";
import MegaMenu from 'primevue/megamenu';
import MegaMenuTheme from '~/theme/megamenu';

export default defineNuxtPlugin((nuxtApp: any) => {

  const TailwindTheme = usePassThrough(
    Tailwind,
    {
      ...MegaMenuTheme,
    },
    {
      merge: true,
      useMergeProps: true,
    }
  );

  nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: TailwindTheme, ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('MegaMenu', MegaMenu);
});
