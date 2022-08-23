<template>
    <div class="Register">
        <div class="container">
            <h1 class="title">register</h1>
            <p class="description">Register to access dashboard</p>
            <input type="text" class="textfield" placeholder="Email" v-model="email">
            <input type="text" class="textfield" placeholder="Fullname" v-model="fullname">
            <input type="password" class="textfield" placeholder="Password" v-model="password">
            <button class="loginbtn" @click="submitAction">register</button>
            <p class="links">Already a member? <router-link to="/login">Click Here!</router-link></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';

const email = ref('')
const fullname = ref('')
const password = ref('')

async function submitAction() {
    if (!email.value || !password.value || !fullname.value) return console.error('All fields is required')

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ email: email.value, fullname: fullname.value, password: password.value })
    })
    const data = await response.json()
    if (data.ok !== true) {
        console.log(data)
    } else {
        //save user to localstoreage
        localStorage.setItem('user', data.user._id)
        console.log(data)
        if (data.ok === true) {
            router.push({name:'home'})
        }
    }
}
</script>

<style lang="scss" scoped>
.Register {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(236, 239, 245);
    color: #222222;
    .container {
        padding: 20px 50px;
        background: #ffffff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;

        .title {
            text-transform: uppercase;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
        }

        .description {
            text-align: center;
            font-size: 14px;
            color: #9497a4;
            margin-bottom: 15px;
        }

        .textfield {
            width: 250px;
            border: 1px solid rgb(200, 205, 223);
            outline: none;
            padding: 8px 15px;
            border-radius: 5px;
            background: #f5f6f9;
            margin: 5px 0px;
            font-size: 14px;
        }

        .loginbtn {
            width: 250px;
            height: 40px;
            margin-top: 15px;
            text-transform: uppercase;
            border: none;
            border-radius: 5px;
            color: #FFFFFF;
            background: rgb(83, 116, 176);
            font-size: 14px;
            cursor: pointer;
        }
        .links {
            margin-top: 10px;
            font-size: 14px;
            width: 100%;
            text-align: center;

            a {
                text-decoration: none;
                font-weight: bolder;
                color: rgb(83, 116, 176);
            }
        }
    }
}
</style>