<template>
  <div class="home">
    <h1>Morpion - Menu Principal</h1>
    <nav class="menu">
      <router-link to="/new-game" class="menu-item">
        <h2>Nouvelle Partie</h2>
        <p>Créer une nouvelle partie de morpion</p>
      </router-link>

      <router-link to="/join-game" class="menu-item">
        <h2>Rejoindre une Partie</h2>
        <p>Rejoindre une partie existante</p>
      </router-link>

      <router-link to="/profile" class="menu-item">
        <h2>Mon profil</h2>
        <p>Editer le profil</p>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.menu-item {
  padding: 1.5rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.menu-item:hover {
  border-color: #42b883;
  transform: translateY(-2px);
}
</style>
