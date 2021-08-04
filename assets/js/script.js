window.onload = function(){
    iniciar();
    setInterval(principal, 1000 / velocidadeJogo); // Roda o jogo dentro do laço
  }

  function iniciar(){

    folhaDesenho = document.getElementById("folha");
    areaDesenho = folhaDesenho.getContext("2d");

    larguraCampo = 900;
    alturaCampo = 600;
    larguraLinha = 5;
    alturaLinha = 600;
    diametroBola = 10;
    larguraRaquete = 10;
    alturaRaquete = 100;

    efeitoRaquete = 0.3;
    velocidadeJogador2 = 7;
    velocidadeJogo = 55;

    posicaoJogador1 = posicaoJogador2 = 250;
    posicaoBolaX = posicaoBolaY = 10;
    velocidadeBolaX = velocidadeBolaY = 10;
    pontuacaoJogador1 = pontuacaoJogador2 = 0;

  folhaDesenho.addEventListener('mousemove', function(e){
    posicaoJogador1 = e.clientY - alturaRaquete/2;
  });
  }

  function principal(){
    desenhar();
    calcular();
  }

  function desenhar(){
    //Campo
    areaDesenho.fillStyle = '#0000FF';
    areaDesenho.fillRect (0, 0, 900, 600);

    //Linha
    areaDesenho.fillStyle = '#FFFFFF';
    areaDesenho.fillRect(larguraCampo/2 - larguraLinha/2, 0, larguraLinha, alturaLinha);

    //Bola
    areaDesenho.fillRect(posicaoBolaX - diametroBola/2, posicaoBolaY - diametroBola/2, diametroBola, diametroBola);

    //Raquetes
    areaDesenho.fillRect(0, posicaoJogador1, larguraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - larguraRaquete, posicaoJogador2, larguraRaquete, alturaRaquete);

    //pontuação
    areaDesenho.fillText("Jogador 1 - " + pontuacaoJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Jogador 2 - " + pontuacaoJogador2 + " pontos", larguraCampo-200, 100);
  }

  function calcular(){
    posicaoBolaX = posicaoBolaX + velocidadeBolaX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaY;

    //Verifica lateral superior
    if(posicaoBolaY < 0 && velocidadeBolaY < 0) {
      velocidadeBolaY = -velocidadeBolaY;
    }

    //Verifica lateral inferior
    if (posicaoBolaY > alturaCampo && velocidadeBolaY > 0) {
      velocidadeBolaY = -velocidadeBolaY;
    }

    //Verifica pontuação jogador 2
    if(posicaoBolaX < 0) {
      if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete){

        //Rebate a Bola
        velocidadeBolaX = -velocidadeBolaX;

        var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete/2);
        velocidadeBolaY = diferencaY * efeitoRaquete;
      } else {
        //Ponto jogador 2
        pontuacaoJogador2++
        //função continuar
        continuar();
      }
    }

    //Verifica pontuação jogador 1
    if(posicaoBolaX > larguraCampo){
      if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete){

        //Rebate a Bola
        velocidadeBolaX = -velocidadeBolaX;

        var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete/2);
        velocidadeBolaY = diferencaY * efeitoRaquete;
      }else {
        //Pontos jogador 1
        pontuacaoJogador1++

        //função continuar
        continuar();
      }
    }

    //posicao jogador 2
    if(posicaoJogador2 + alturaRaquete/2 < posicaoBolaY){
      posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
      posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
  }

  function continuar(){
    //coloca bola no centro
    posicaoBolaX = larguraCampo /2;
    posicaoBolaY = alturaCampo / 2;
    velocidadeBolaX = -velocidadeBolaX;
    velocidadeBolaY = 3;
  }