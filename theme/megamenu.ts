
export default {
  megamenu: {
    root: ({ props }: any) => ({
      class: ['bg-gray-900 border-none text-sm', 'flex relative', { 'p-2 items-center': props.orientation == 'horizontal', 'flex-col w-48 p-0 py-1': props.orientation !== 'horizontal' }]
    }),
    menu: {
      class: ['m-0 sm:p-0 list-none relative', 'outline-none', 'flex items-center flex-wrap flex-row top-auto left-auto relative bg-transparent shadow-none w-auto']
    },
    menuitem: ({ props }: any) => ({
      class: [
        'relative',
        {
          'w-auto': props.horizontal,
          'w-full': !props.horizontal
        }
      ]
    }),
    content: ({ props, context }: any) => ({
      class: [
        'transition-shadow duration-200',
        { 'rounded-md': props.level < 1 && props.horizontal },
        {
          'text-gray-300': !context.focused && !context.active,
          'text-white/80 bg-gray-800/90': context.focused && !context.active,
          'bg-blue-400 text-white/80': context.focused && context.active,
          'bg-blue-300 text-white/80': !context.focused && context.active
        },
        {
          'hover:text-white/80 hover:bg-gray-800/80': !context.active,
          'hover:bg-blue-500': context.active
        }
      ]
    }),
    action: {
      class: ['select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-1 px-1 select-none']
    },
    icon: {
      class: 'mr-2'
    },
    submenuicon: ({ props }: any) => ({
      class: [
        {
          'ml-2': props.horizontal,
          'ml-auto': !props.horizontal
        }
      ]
    }),
    panel: ({ props }: any) => ({
      class: [
        'py-1 bg-white dark:bg-gray-900 border-0 shadow-md w-auto',
        'absolute z-10',
        {
          'left-full top-0': !props.horizontal
        }
      ]
    }),
    grid: 'flex',
    column: 'w-1/2',
    submenu: {
      class: ['m-0 list-none', 'py-1 w-48']
    },
    submenuheader: {
      class: ['m-0 py-3 px-5 text-white/80 bg-gray-900 font-semibold rounded-tr-md rounded-tl-md']
    }
  }
}
