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
	
	

	
	
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext("2d");
	const color = prompt("Escolha uma cor");
	
	const playerId = database.ref('players').push().key;
	const player = new Player({
		color: color,
	}, database, playerId);
	database.ref('players/' + playerId).set({
      x: player.x,
      y: player.y,
	  color: player.color
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
	
	sendChatMessage(playerId + " entrou", "green");
	
	function update(){
		
	}
	
	function drawAllPlayers(){
	  database.ref('players').once('value', (snapshot) => {
        const players = snapshot.val();
        player.draw(ctx, players);
      });
	}
	
	function loop(){
		update();
		drawAllPlayers();
		requestAnimationFrame(loop)
	}
	
	document.addEventListener("keydown", ()=>{
      if (event.key === "ArrowUp") {
		const x = 0;
		const y = -1;
        player.update(x, y);
      } else if (event.key === "ArrowDown") {
        const x = 0;
		const y = 1;
        player.update(x, y);
      }else if (event.key === "ArrowLeft") {
        const x = -1;
		const y = 0;
        player.update(x, y);
      }else if (event.key === "ArrowRight") {
        const x = 1;
		const y = 0;
        player.update(x, y);
      }
	})
	
	document.getElementById('sendMessage').addEventListener('click', ()=>{
		const message = document.getElementById('message').value;
		sendChatMessage(playerId + ': ' + message, 'normal');
	})
	
	// Sincronize a posição do jogador com os dados do banco de dados em tempo real
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
		//sendChatMessage(playerId + " saiu", "red");
	});
	
	loop();
})()