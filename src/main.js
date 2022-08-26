import Vue from 'vue';
import App from './App.vue';
import router from './router';
import css from "./assets/style.css";
import {initializeApp} from 'firebase/app';
Vue.config.productionTip = false
const config = {
  apiKey: "AIzaSyC6ZLG7b0ovlOmdSn1YQ0GdrV0w0lMo1Rs",
  authDomain: "disaster5.firebaseapp.com",
  projectId: "disaster5",
  storageBucket: "disaster5.appspot.com",
  messagingSenderId: "731796188239",
  appId: "1:731796188239:web:b849043d1b23c6d3a20e3a",
  measurementId: "G-W1C30PP91B"
};

initializeApp(config);

new Vue({
  router,
  css,
  render: h => h(App)
}).$mount('#app');
