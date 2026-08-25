import { containerPlugin } from '@vuepress/plugin-container'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

module.exports = {
  lang: 'en-US',
  title: 'Starter template',
  description: 'Starter template',

  theme: defaultTheme({
    //logo: '/images/linux.png',
    navbar: [
      { text: 'Toledo', link: 'https://toledo.kuleuven.be/portal' },
      { text: 'Report Issue', link: 'https://github.com/BioBoost/course_linux_essentials/issues' },
      { text: 'Organization', link: 'https://github.com/vives-linux-essentials-2022-2023' }
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
     
    ],
    sidebarDepth: 1,
    repo: 'WimDejonghe/vuePress2-starter',
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