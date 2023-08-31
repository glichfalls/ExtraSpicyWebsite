import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { usePassThrough } from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";
import MegaMenu from 'primevue/megamenu';
import MegaMenuTheme from '~/theme/megamenu';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';

export default defineNuxtPlugin((nuxtApp: any) => {

  const TailwindTheme = usePassThrough(Tailwind, {
    ...MegaMenuTheme,
    panel: {
      header: ({ props }: any) => ({
        class: [
          'border-0',
          {
            'p-5': !props.toggleable,
            'py-3 px-5': props.toggleable
          }
        ]
      }),
      content: {
        class: [
          'p-0 border-0',
        ]
      },
      title: {
        class: ['leading-none font-light text-2xl !text-red']
      }
    },
    skeleton: {
      root: ({ props }: any) => ({
        class: [
          'bg-white',
          'after:bg-white',
          {
            'rounded-md': props.shape !== 'circle',
            'rounded-full': props.shape == 'circle'
          }
        ]
      })
    },
    button: {
      root: {
        class: [
          'bg-primary text-white',
          'border-0'
        ]
      },
      label: ({ props }: any) => ({
        class: [
          'flex-1',
          'duration-200',
          'font-bold',
          {
            'hover:underline': props.link
          }
        ]
      }),
      icon: ({ props }: any) => ({
        class: [
          {
            'mr-2': props.iconPos == 'left' && props.label != null,
            'ml-2': props.iconPos == 'right' && props.label != null,
            'mb-2': props.iconPos == 'top' && props.label != null,
            'mt-2': props.iconPos == 'bottom' && props.label != null
          }
        ]
      }),
      badge: ({ props }: any) => ({
        class: [{ 'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge }]
      })
    },
    dialog: {
      root: {
        class: [
          'w-full max-w-[600px]',
          'bg-gray-900',
        ]
      },
      header: {
        class: [
          'bg-gray-900',
        ]
      },
      content: {
        class: [
          'bg-gray-900',
        ],
      },
      footer: {
        class: ['bg-gray-900']
      },
    },
    inlinemessage: {
      root: ({ props }: any) => ({
        class: [
          'text-sm',
          'inline-flex items-center justify-center align-top',
          'p-1 m-0 rounded-md',
          {
            'bg-blue-100 border-0 text-blue-700': props.severity == 'info',
            'bg-green-100 border-0 text-green-700': props.severity == 'success',
            'bg-orange-100 border-0 text-orange-700': props.severity == 'warn',
            'bg-gray-900 border-0 text-red-700': props.severity == 'error'
          }
        ]
      }),
      icon: 'text-base mr-2'
    },
    breadcrumb: {
      root: {
        class: [
          'overflow-x-auto',
          'bg-gray-900 border-0 rounded-md pb-4 pt-1',
          'text-sm',
        ],
      },
      menu: 'm-0 p-0 list-none flex items-center flex-nowrap',
      action: {
        class: [
          'text-decoration-none flex items-center',
        ]
      },
      icon: 'text-white',
      separator: {
        class: ['mx-2 text-white', 'flex items-center']
      }
    }
  }, {
    merge: true,
    useMergeProps: true,
  });

  nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: TailwindTheme, ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('MegaMenu', MegaMenu);
  nuxtApp.vueApp.component('Panel', Panel);
  nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner);
  nuxtApp.vueApp.component('Skeleton', Skeleton);
});
