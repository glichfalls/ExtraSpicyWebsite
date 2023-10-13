import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import MegaMenu from 'primevue/megamenu';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import ContextMenu from 'primevue/contextmenu';
import InlineMessage from 'primevue/inlinemessage';

import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'assets/css/primevue.css';

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('MegaMenu', MegaMenu);
  nuxtApp.vueApp.component('Panel', Panel);
  nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner);
  nuxtApp.vueApp.component('Skeleton', Skeleton);
  nuxtApp.vueApp.component('Dialog', Dialog);
  nuxtApp.vueApp.component('InlineMessage', InlineMessage);
  nuxtApp.vueApp.component('ContextMenu', ContextMenu);
});
