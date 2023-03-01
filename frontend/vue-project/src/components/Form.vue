<template>
  <div class="row mb-5">
    <MessageVue :msg="msgErro" :isActive="isActive" v-show="msgErro" />
    <div
      class="border border-5 rounded-4 bg-success bg-gradient opacity-75 mx-auto col-md-6"
    >
      <form>
        <img
        class="img-user"
        src="../../public/img/person-circle.svg" 
        alt="logo de usuario">

        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <label for="exampleInputEmail1" class="form-label fs-4">Nome de usuario</label>
           <div id="userName">
            <input
              v-model="userName"
              type="text"
              class="form-control border border-0 rounded-0 p-3"
              aria-describedby="emailHelp"
            />
           </div>
          </div>
        </div>

        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <label for="exampleInputPassword1" class="form-label fs-4">Senha</label>
            <div id="password">
              <input
              v-model="password"
              type="password"
              class="form-control border border-0 rounded-0 p-3"
              id="exampleInputPassword1"
            />
            </div>
          </div>
        </div>

          <!-- criar conta -->
        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <RouterLink class="text-dark fs-4" 
            to="/CriarConta">Criar conta</RouterLink>
          </div>
        </div>
        

        <div class="row">
          <div class="mt-5 mb-3 px-5 col-md-11 col-lg-12">
            
            <!-- <RouterLink to="/paginainicial"> -->
              <button @click="Entrar" type="button" class="btn btn btn-dark rounded-0 w-100 p-2 fs-4">
              Login
            </button>
            <!-- </RouterLink> -->

          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  
  .img-user {
    width: 15%;
    margin-top: 1rem;
    margin-left: 2rem;
  }

  /* #userName {
    border: 2px solid red !important;
  } */
</style>

<script>
  import {RouterLink} from 'vue-router'
  import { getUser } from '../API'
  import { setToken, setIdUser } from '../authentication'
  import MessageVue from './Message.vue'

  export default {
    name: "Form",
    components: {
     MessageVue
    },

      data() {
      return {
        urlPaginaInicial: "",
        userName: "",
        password: "",

        msgErro: "",
        isActive: false
      }
    },

    methods: {
     
      async Entrar() {
       try {
        const exists = await getUser(this.userName, this.password)
        console.log(exists.data)
        setToken(exists.data.token)
        setIdUser(exists.data.id_user)
        window.location.href = "/paginainicial"
       }
       catch (err) {
        // console.log(err)

        window.scrollTo(0, 0)

        this.msgErro = "Usuario invalido!"
        this.isActive = true

        const userName =  document.getElementById("userName")
        const password = document.getElementById("password")

        if (!this.userName) {
          userName.style.border = "2px solid red"
        }
        if (!this.password) {
          password.style.border = "2px solid red"
        }

        setTimeout(() => {
          userName.style.border = ""
          password.style.border = ""
          this.msgErro = ""
          this.isActive = false
        }, 3000)
       }
        
      }
    }
  }
</script>
