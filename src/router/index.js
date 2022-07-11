import Vue from "vue";
import VueRouter from "vue-router";

const asaDemoView = () => import("../views/ASADemoView.vue");

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: asaDemoView,
            name: "asaDemo",
        },
    ],
});

export default router;
