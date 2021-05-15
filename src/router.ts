import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/about",
        component: () => import("@/views/about.vue"),
    },
    {
        path: "/login",
        component: () => import("@/views/login.vue"),
    },
    {
        path: "/404",
        component: () => import("@/views/404.vue"),
    },
    {
        path: "/permission-deni",
        component: () => import("@/views/permission-deni.vue"),
    },
];

const router = createRouter({
    history: createWebHistory("/g"),
    routes,
});

const isLogin = function () {
    let login = sessionStorage.getItem("auth");
    return !!login;
};

async function addRouters() {
    let authRouters = await getAuth();
    authRouters.forEach(({ path }) => {
        isMenu = true;
        // 动态添加
        router.addRoute({
            path,
            component: () => import(`./views${path}.vue`),
        });
    });

    console.log(">>>", router.getRoutes());
}

// 获取权限路由
function getAuth() {
    return new Promise<Array<{ path: string }>>((resolve) => {
        setTimeout(() => {
            let authRouters = [
                {
                    path: "/auth/edit",
                },
                {
                    path: "/auth/userinfo",
                },
            ];
            resolve(authRouters);
        }, 150);
    });
}

// 路由拦截
let isMenu = false; // 是否获取过菜单
router.beforeEach(async (to, from, next) => {
    let { matched } = to;
    let isMatched = !!matched.length;

    if (!isMatched) {
        // 为匹配到路由
        if (isLogin()) {
            // 已登录
            if (isMenu) {
                // 没有权限
                next("/permission-deni");
            } else {
                // 动态添加路由
                await addRouters();
                next(to.path);
            }
        } else {
            // 未登录
            next("/login");
        }
    } else {
        next();
    }
});

export default router;
