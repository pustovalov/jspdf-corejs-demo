import './styles/app.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import App from './components/App.svelte'


const app = new App({
  target: document.getElementById('app'),
})
