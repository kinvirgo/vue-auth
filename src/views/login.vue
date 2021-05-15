<template>
    <h2>选择登录用户</h2>
    <select v-model="user" @change="setUser">
        <option value="">请选择用户</option>
        <option value="100">管理员</option>
        <option value="101">普通用户</option>
    </select>
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

            setUser(e: Event) {
                // @ts-ignore
                let user = e.target.value;
                // 设置
                sessionStorage.setItem("auth", user);
            },
        };
    },
});
</script>
<style></style>
