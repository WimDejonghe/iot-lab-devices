import { containerPlugin } from '@vuepress/plugin-container'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

//module.exports= ({ extendsMarkdown: md => { md.use(require('markdown-it-mathjax3')); } })

module.exports = {
  lang: 'nl_BE',
  title: 'Lab IoT Devices',
  description: 'Cursus voor Graduaat studenten Internet of Things VIVES Kortrijk',
   head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?familiy=Material+Icons' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML', async: true }]
  ],
  //extendsMarkdown: md => { md.use(require('markdown-it-mathjax3')); },

  theme: defaultTheme({
    logo: 'https://www.vives.be/sites/default/files/uploads/huisstijl/Logo VIVES Hogeschool - Smile.png',
    navbar: [
      { text: 'Toledo', link: 'https://toledo.kuleuven.be/portal' },
      { text: 'Report Issue', link: 'https://github.com/WimDejonghe/iot-lab-devices' },      
      { text: 'Organization', link: 'https://github.com/WimDejonghe/iot-lab-devices' }

    ],
    sidebar: [
      {
        text: 'About this Course',
        link: '/about-this-course/README.md',
      },
      {
        text: 'Introduction to Programming',
        children: [
          '/a-introductory/01-introduction/README.md',
          '/a-introductory/02-introduction/README.md',
          
        ]
      },
      {
        text: 'ESP32 Deepsleep',
        children: [
          '/deepsleep/01-intro/README.md',
          '/deepsleep/02-timerWakeUp/README.md',
          '/deepsleep/03-externalWakeUp/README.md',
        ]
      },
      {
        text: 'Bluetooth',
        children: [
          '/bluetooth/01-intro/README.md',
          '/bluetooth/02-gatt/README.md',
          '/bluetooth/03-esp32/README.md',
          '/bluetooth/04-rpi/README.md',
          '/bluetooth/05-opdrachten/README.md',
        ]
      },
           
    ],
    sidebarDepth: 1,
    repo: 'WimDejonghe/iot-devices',
    docsDir: 'docs',
    docsBranch: 'master'
  }),
  serviceWorker: true,
  plugins: [
    


    containerPlugin({
      type: 'codeoutput',
      locales: {
        '/': {
          defaultInfo: 'Output',
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    
  ],

  
}