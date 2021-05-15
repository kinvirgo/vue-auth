<template>
    <div>当前用户:{{ user || "未登录" }}</div>
    <ul>
        <li>
            <router-link to="/">首页</router-link>
        </li>
        <li>
            <router-link to="/about">关于</router-link>
        </li>
        <li>
            <router-link to="/auth/edit">编辑</router-link>
        </li>
        <li>
            <router-link to="/auth/userinfo">用户信息</router-link>
        </li>
    </ul>
    <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    setup(props, context) {
        let state = reactive({
            user: sessionStorage.getItem("auth") || "",
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>
<style lang="scss"></style>
