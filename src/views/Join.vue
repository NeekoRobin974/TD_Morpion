<template>
  <div class="join">
    <h1>Rejoindre une partie</h1>

    <nav class="menu">
      <router-link to="/home" class="menu-item">
        <button>Retour à l'accueil</button>
      </router-link>
    </nav>

    <div v-if="errors.length" class="errors">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <form @submit.prevent="joinGame">
      <div>
        <label for="gameId">ID de la partie : </label>
        <input type="text" id="gameId" v-model="gameCode"  required/>
        <button type="submit">Rejoindre</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'JoinGame',
  data() {
    return {
      errors: [],
      gameCode: ''
    };
  },
  methods: {
    joinGame(){
      this.errors = [];

      api.patch(`/api/games/${this.gameCode}/join`, {})
        .then(response => {
          this.$router.push(`/games/${response.data.id}`)
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            this.errors.push(error.response.data.message);
          } else {
            this.errors.push("Impossible de rejoindre la partie. Vérifiez le code.");
          }
        });
    },
  }
}
</script>

<style scoped>
.join {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.menu{
  margin-bottom: 2rem;
}

.menu-item {
  color: inherit;
}

.menu-item button {
  background-color: #fff;
  border: 2px solid #ccc;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  color: inherit;
  transition: all 0.3s;
}

.menu-item button:hover {
  border-color: #42b883;
  transform: translateY(-2px);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b883;
  outline: none;
}

button[type="submit"] {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 1rem;
}

button[type="submit"]:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

button[type="submit"]:active {
  transform: translateY(0);
}

.errors {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #ffcdd2;
}

.errors ul {
  margin: 0;
  padding-left: 1.5rem;
}
</style>
