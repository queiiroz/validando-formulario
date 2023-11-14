const inicarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const tirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const enviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

inicarCamera.addEventListener("click", async function () {
  const iniciarVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
    // Solicitando apenas o vídeo sem áudio
  });

  inicarCamera.style.display = "none"; // Display none no botão inicar camera para ele sumir quando inicializar a camera
  campoCamera.style.display = "block"; // Display block permite que a imagem da câmera apareça

  video.srcObject = iniciarVideo;
});

tirarFoto.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  imagemURL = canvas.toDataURL("image/jpeg"); //Este comando transforma a imagem gerada no canvas em uma URL, o que nos possibilitará salvá-la posteriormente.

  campoCamera.style.display = "none"; // Desaparecer a câmera deixando apenas a foto/imagem
  mensagem.style.display = "block"; // Permite q a mensagem apareça na tela
});

enviarFoto.addEventListener("click", () => {
  const receberDadosExistentes = localStorage.getItem("cadastro");
  // permite que após o clique no botão seja retornado o item que possui a chave "cadastro" dentro de receberDadosExistentes
  const converteRetorno = JSON.parse(receberDadosExistentes); // convertendo em objeto

  converteRetorno.imagem = imagemURL; // criando o atributo "imagem" dentro da lista de dados

  localStorage.setItem("cadastro", JSON.stringify(converteRetorno)); // atualizando a chave "cadastro" e convertendo os dados novamente para JSON

  window.location.href = "./abrir-conta-form-3.html"; // permite o redirecionamento para a página de confirmação de cadastro.


});
