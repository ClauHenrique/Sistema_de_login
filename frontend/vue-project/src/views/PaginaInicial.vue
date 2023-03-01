<template>
  <div id="container" class="mx-auto d-block w-50">
    <h1 class="text-center">menu</h1>
    <h3 class="text-center mt-1">pagina principal</h3>
    <div class="img-profile mx-auto d-block">
      <!-- img background -->
    </div>
    <p class="text-center fs-4">oi! sou o <span class="fw-semibold">@{{ userName }}</span></p>

    <button type="button"
    @click="logout" 
    class="mx-auto d-block opacity-75 btn btn-dark rounded-0 w-50 p-2 fs-4">Sair</button>
  </div>
</template>

<script>
  import { 
    getIdUser,
    setToken,
    setIdUser, 
    checkToken } from '../authentication';
    
  import{ getDados } from '../API';

  export default {
    data() {
    return {
      imageUrl: "",
      userName: ""
    }
  },

  methods: {
    async getProfile() {
      const id_user = getIdUser()
      const token = checkToken()

      const profile = await getDados(id_user, token)
      this.imageUrl = "http://localhost:3333/files/" + profile.data.profilePicture
      this.userName = profile.data.nome

      const background_img = document.querySelector('.img-profile')
      background_img.style.backgroundImage = `url('${this.imageUrl}')`
    },

    logout() {
      setToken("")
      setIdUser("")
        window.location.href = "/"
    }
  },

  mounted() {
    this.getProfile()
  },
  }
</script>

<style scoped>
 
 #container {
  margin-top: 15vh;
 }

 .img-profile {
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat, repeat;
  background-size: cover;
 }
 
</style>