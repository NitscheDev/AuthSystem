<template>
    <div class="Home">
        <h1 class="title">Authentication System</h1>
        <p class="desc">Happy {{today}}, <b>{{ fullname }}!</b></p>
        <div class="container">
            <button @click="logout">logout</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import router from '../router';
const fullname = ref('')
let today = ref('')
//retrive authed user info
onMounted(async () => {
    const userId = localStorage.getItem('user')
    const response = await fetch('/api/user?id=' + userId)
    const data = await response.json()
    fullname.value = data.user.fullname
    //call required functions
    getDay() 
})

const getDay = () => {
    const day = new Date().getDay()
    if (day === 0) return today.value = 'Sunday'
    if (day === 1) return today.value = 'Monday'
    if (day === 2) return today.value = 'Tuesday'
    if (day === 3) return today.value = 'Wednesday'
    if (day === 4) return today.value = 'Thursday'
    if (day === 5) return today.value = 'Friday'
    if (day === 6) return today.value = 'Saturday'
}

const logout = async () => {
    await fetch('/api/logout')
    localStorage.removeItem('user')
    router.push('login')
}

</script>

<style lang="scss" scoped>
.Home {
    width: 100%;
    min-height: 100vh;

    .title {
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
    .desc {
        font-size: 14px;
        width: 100%;
        text-align: center;
    }
    .container {
        width: 100%;
        margin: 50px 0px;
        display: flex;
        justify-content: center;

        button {
            text-transform: uppercase;
            background: rgb(83, 116, 176);
            border: none;
            outline: none;
            border-radius: 5px;
            padding: 8px 15px;
            color: #FFFFFF;
            cursor: pointer;
        }
    }
}
</style>