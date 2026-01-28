<template>
  <div v-if="game" class="game-container">
    <div class="game-header">
      <h1>Partie de Morpion</h1>
      <div class="game-code">
        <span>Code : <strong>{{ game.code }}</strong></span>
      </div>
    </div>

    <div v-if="!game.opponent" class="waiting-section">
      <div class="spinner"></div>
      <p>En attente d'un adversaire...</p>
      <p class="code-share">Partagez ce code : <strong>{{ game.code }}</strong></p>
    </div>

    <div v-else class="game-section">
      <div class="players">
        <div class="player">
          <span class="label">Vous</span>
          <span class="name">{{ game.owner?.name }}</span>
        </div>
        <div class="vs">VS</div>
        <div class="player">
          <span class="label">Adversaire</span>
          <span class="name">{{ game.opponent.name }}</span>
        </div>
      </div>

      <div class="turn-indicator">
        <span v-if="game.next_player_id === game.owner.id" class="your-turn">
          A vous de jouer!
        </span>
        <span v-else class="opponent-turn">
          En attente de l'adversaire...
        </span>
      </div>

      <div class="grid">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance, { moveWsURL } from '@/api/index.js'

export default {
  data(){
    return{
      game: null,
      ws: null
    }
  },
  computed: {
    board() {
      if (!this.game) return []
      return [
        this.game.r1c1, this.game.r1c2, this.game.r1c3,
        this.game.r2c1, this.game.r2c2, this.game.r2c3,
        this.game.r3c1, this.game.r3c2, this.game.r3c3
      ]
    }
  },
  beforeRouteEnter(to,from,next){
    const gameId = to.params.id
    instance.get(`/api/games/${gameId}`)
      .then(response => {
        console.log('Partie récupérée:', response.data)
        next(vm => {
          vm.game = response.data
          vm.waitForOpponentMove()
        })
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la partie : ', error.response?.status)
        next(false)
      })
  },
  methods: {
    waitForOpponentMove() {
      instance.get('/api/profile')
        .then(response =>{
          this.ws = new WebSocket(moveWsURL);
          const userId = response.data.id;
          console.log(this.ws)
          this.ws.onopen = () => {
            console.log('WebSocket connecté')
            this.ws.send(JSON.stringify({
              action: 'connect',
              game_id: this.game.id,
              player_id: userId
            }))
          }
          this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            switch(data.action){
              case 'opponent-join':
               console.log('Un adversaire a rejoint la partie')
               this.game = data.game
                break
              case 'opponent-play':
                console.log('L\'adversaire a joué')
                this.game = data.game
                break
              case 'opponent-quit':
                console.log('L\'adversaire a quitté')
                  this.game = data.game
                break
              default:
                console.log(data.action)
            }
          }
        })
        .catch(error =>{
          console.log('erreur de recuperation du profil');
      })
    }
}
}
</script>

<style scoped>
.game-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
}

.game-header h1 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.game-code {
  background: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-block;
}

.waiting-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.code-share {
  margin-top: 20px;
  font-size: 18px;
}

.game-section {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.players {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.player {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
}

.name {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
}

.vs {
  font-weight: bold;
  color: #6c757d;
  font-size: 20px;
}

.turn-indicator {
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: bold;
}

.your-turn {
  color: #28a745;
}

.opponent-turn {
  color: #ffc107;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

.cell {
  aspect-ratio: 1;
  background: #f8f9fa;
  border: 3px solid #dee2e6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.cell:hover {
  background: #e9ecef;
  transform: scale(1.05);
}
</style>
