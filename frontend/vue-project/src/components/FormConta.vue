<template>
   <div class="row mb-5">

    <Message :msg="msgErro" :isActive="isActive" />

    <div
      class="border border-5 rounded-4 bg-success bg-gradient opacity-75 mx-auto col-md-6"
    >
      <form id="form">
        <img
        class="img-user"
        src="../../public/img/person-circle.svg" 
        alt="logo de usuario">

        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <label for="userName" class="form-label fs-4">Nome de usuario</label>
            <div id="nome">
              <input
              v-model="nome"
              type="text"
              class="form-control border border-0 rounded-0 p-3"
              id="userName"
              aria-describedby="userName"
            />
            </div>
          </div>
        </div> 

        <!-- mudar essa estilizacao depois -->
        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <label for="profile-picture" class="form-label fs-4">Sua foto de perfil</label>
            <div id="picture">
              <input
              type="file"
              @input="image = $event.target.files[0]"
              class="form-control border border-0 rounded-0 p-3"
              id="profile-picture"
              aria-describedby="profilePicture"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="mb-3 col-md-11 col-lg-12 px-5 pt-5">
            <label for="senha" class="form-label fs-4">Senha</label>
            <div id="password">
              <input
              v-model="senha"
              type="password"
              class="form-control border border-0 rounded-0 p-3"
              id="senha"
            />
            </div>
          </div>
        </div>
        

        <div class="row">
          <div class="mt-5 mb-3 px-5 col-md-11 col-lg-12">
            
           
            <button @click="Cadastrar" type="button" class="btn btn btn-dark rounded-0 w-100 p-2 fs-4">
              Criar Conta
            </button>
         

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
</style>

<script>
import { cadastrarUsuario, getUser } from '../API';
import { setToken, setIdUser } from '../authentication'
import Message from './Message.vue'

export default {
  name: "FormConta",
  components: {
    Message
  },

  data() {
    return {
        nome: "",
        image: "",
        senha: "",

        msgErro: "",
        isActive: false
    }
  },

  methods: {
    async Cadastrar() {
        try {      
          const formData = new FormData()

          formData.append('nome', this.nome)
          formData.append('senha', this.senha)
          formData.append('image', this.image)
          
          await cadastrarUsuario(formData)

          // chamar a funcao getUser para criar um token para o usuario
          const user = await getUser(this.nome, this.senha)
          setToken(user.data.token)
          setIdUser(user.data.id_user)
          window.location.href = "/paginainicial"
        }

        catch (err) {
          console.log("erro no cadastro ", err.response.data)

          const userName = document.getElementById("nome")
          const password = document.getElementById("password")
          const profilePicture = document.getElementById("picture")

          window.scrollTo(0, 0)

          if (!this.nome || !this.senha || !this.image) {
            this.msgErro = "Atenção! Preencha todos os campos!"
            this.isActive = true

            if (!this.nome) {
            userName.style.border = "2px solid red"
            }
            if (!this.senha) {
              password.style.border = "2px solid red"
            }
            if (!this.image) {
              profilePicture.style.border = "2px solid red"
            }
          }

          else if (err.response.data.erroExtençãoImg) {
            profilePicture.style.border = "2px solid red"
            this.msgErro = err.response.data.msg
            this.isActive = true
          }

          else if (err.response.data.userExists) {
            this.msgErro = "Atenção! Esse usuario já existe!"
            this.isActive = true
          }

          setTimeout(() => {
          userName.style.border = ""
          password.style.border = ""
          profilePicture.style.border = ""
          this.msgErro = ""
          this.isActive = false
        }, 3000)

        }
    }
  }
};
</script>
