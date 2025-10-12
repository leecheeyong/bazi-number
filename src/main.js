import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/bazi",
    name: "Bazi",
    component: () => import("./views/Bazi.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("./Home.vue"),
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("./views/Scanner.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
});

createApp(App).use(router).mount("#app");
