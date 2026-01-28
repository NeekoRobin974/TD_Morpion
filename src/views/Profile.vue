<template>
  <div class="profile">
    <h1>Mon profil</h1>

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
    <form v-if="user" @submit.prevent="saveProfile">
      <div>
        <label for="name">Nom : </label>
        <input type="text" id="name" v-model="user.name" required />
      </div>

      <div>
        <label for="email">Email : </label>
        <input type="email" id="email" v-model="user.email" required />
      </div>

      <button type="submit">Enregistrer</button>
    </form>
    <div v-else>
      Chargement...
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      errors: []
    };
  },
  //Hook de navigation appelé avant que la route ne soit confirmée
  beforeRouteEnter(to, from, next) {
    // On utilise simplement l'instance api qui contient déjà la Clé API dans ses headers
    api.get('/api/profile')
      .then(response => {
        next(vm => {
          vm.user = response.data;
        });
      })
      .catch(error => {
        console.error("Erreur chargement profil :", error);
        next(vm => {
          if (error.response && error.response.status === 401) {
            vm.errors.push("Erreur 401 : La clé API semble invalide ou manquante.");
          } else {
            vm.errors.push("Impossible de charger le profil.");
          }
        });
      });
  },
  methods: {
    async saveProfile() {
      this.errors = [];

      try {
        await api.put('/api/profile', this.user);
        alert('Profil mis à jour avec succès !');
      } catch (error) {
         if (error.response && error.response.data) {
             const errorData = error.response.data;
             if (Array.isArray(errorData.errors)) {
               this.errors = errorData.errors;
             } else if (errorData.message) {
               this.errors.push(errorData.message);
             } else {
               this.errors.push("Une erreur inconnue est survenue.");
             }
         } else {
            this.errors.push("Erreur réseau : " + error.message);
         }
      }
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.menu {
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

/* Chargement */
.profile > div:last-child {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 2rem;
}
</style>
