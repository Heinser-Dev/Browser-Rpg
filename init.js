(()=>{
	
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyDqP564Zq1s1ftG99LvV2Nv4y9cEvJ55sI",
		authDomain: "game-65cbb.firebaseapp.com",
		databaseURL: "https://game-65cbb-default-rtdb.firebaseio.com/",
		projectId: "game-65cbb",
		storageBucket: "game-65cbb.appspot.com",
		messagingSenderId: "1039869603858",
		appId: "1:1039869603858:web:78fc1778129f220e4a68cb",
		measurementId: "G-HYZK4S0WYF"
	};

	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);
	const database = firebase.database();
	
	
    const character = new Image();
	character.src = 'characters.png';
	character.onload = ()=>{
		character.isLoaded = true;
	};
	
	
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.scale(3, 3);
	
	const nickname = prompt("Escolha um apelido");
	
	const playerId = database.ref('players').push().key;
	const player = new Player({
		nickname: nickname,
		img: {
			x: 2,
			y: 303
		}
	}, database, playerId);
	database.ref('players/' + playerId).set({
      x: player.x,
      y: player.y,
	  color: player.color,
	  nickname: player.nickname,
	  imgX: player.img.x,
	  imgY: player.img.y
    });
	
	

	
	function sendChatMessage(content, color){
	  const message = database.ref('chat').push();
	    message.set({
		color: color,
	 	sender: playerId,
		content: content,
	  })
	  document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;
	}
	
	sendChatMessage(nickname + " entrou", "green");
	
	function update(){
		
	}
	
function drawAllObjects() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar todos os inimigos
    database.ref('enemys').on('value', (enemySnapshot) => {
        const enemys = enemySnapshot.val();
        for (let enemyId in enemys) {
            const enemy = enemys[enemyId];
            ctx.drawImage(
                character,
                enemy.imgX, enemy.imgY,
                26, 26,
                enemy.x - player.cameraX - 13, enemy.y - player.cameraY - 13,
                26, 26
            );

            ctx.fillStyle = enemy.color;
            ctx.font = '6px Arial';
            ctx.textAlign = 'center';
            ctx.fillText("Lvl. " + enemy.level, enemy.x - player.cameraX, enemy.y - player.cameraY - 13);
        }
    });

    // Desenhar todos os jogadores
    database.ref('players').on('value', (playerSnapshot) => {
        const players = playerSnapshot.val();
        for (let playerId in players) {
            const selectedPlayer = players[playerId];
            ctx.fillStyle = selectedPlayer.color;
            ctx.drawImage(
                character,
                selectedPlayer.imgX, selectedPlayer.imgY,
                26, 26,
                selectedPlayer.x - player.cameraX - 13, selectedPlayer.y - player.cameraY - 13,
                26, 26
            );

            ctx.fillStyle = selectedPlayer.color;
            ctx.font = '6px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(selectedPlayer.nickname, selectedPlayer.x - player.cameraX, selectedPlayer.y - player.cameraY - 13);
        }
    });
}

	
	function loop(){
		update();console.log(player)
		drawAllObjects();
		requestAnimationFrame(loop);
	}
	
	document.addEventListener("keydown", ()=>{
      if (event.key === "ArrowUp" && player.moving === false) {
		player.move("Up");
      } else if (event.key === "ArrowDown" && player.moving === false) {
        player.move("Down");
      }else if (event.key === "ArrowLeft" && player.moving === false) {
        player.move("Left");
      }else if (event.key === "ArrowRight" && player.moving === false) {
        player.move("Right");
      }
	})
	
	document.getElementById('sendMessage').addEventListener('click', ()=>{
		const message = document.getElementById('message').value;
		sendChatMessage(nickname + ': ' + message, 'normal');
	})
	
	// Sincronize a posiÃ§Ã£o do jogador com os dados do banco de dados em tempo real
    database.ref('players/' + playerId).on('value', (snapshot) => {
      const data = snapshot.val();
      player.x = data.x;
      player.y = data.y;
    });
	
	//Sincronize as mensagens do chat
	database.ref('chat').orderByChild('timestamp').limitToLast(1).on('child_added', (snapshot)=>{
		var newMessage = snapshot.val();console.log(newMessage);
		
		var messages = document.querySelector('.messages');console.log(messages)
		
		messages.innerHTML += `<div class="${newMessage.color}">${newMessage.content}</div>`;console.log(messages)
	})
  
    //Excluir player ao fechar o jogo
	database.ref('players/' + playerId).onDisconnect().remove(()=>{
		//sendChatMessage(nickname + " saiu", "red");
	});
	
	loop();
})()
