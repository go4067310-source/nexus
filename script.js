/* NEXUS Hardware — interações do site */

var produtos = [
  {id:1,nome:"PC Gamer NEXUS Force",categoria:"PC Gamer",tipo:"pc",descricao:"Configuração personalizada para jogos. Peças e valores devem ser definidos na cotação.",imagem:"https://images.tcdn.com.br/img/img_prod/591628/gabinete_gamer_c3tech_aquarius_frontal_e_lateral_em_vidro_usb_3_0_preto_mt_g810bk_40981_1_026f1e130aaf7060d52ab56732408c4d.jpg",tag:"DESTAQUE"},
  {id:2,nome:"PC Gamer Ryzen + Radeon",categoria:"PC Gamer",tipo:"pc",descricao:"Exemplo de computador com processador AMD Ryzen e placa de vídeo Radeon. Confirme todos os componentes antes da compra.",imagem:"https://fdn.gsmarena.com/imgroot/news/23/05/amd-rx-7600/inline/-1200/gsmarena_001.jpg",tag:"CONFIGURÁVEL"},
  {id:3,nome:"AMD Ryzen 5 5500",categoria:"Processador",tipo:"processador",descricao:"Processador AMD Ryzen 5 5500, plataforma AM4. 6 núcleos e 12 threads. Não possui vídeo integrado.",imagem:"https://neocomputer.md/image/cache/catalog/products/ui-products/54fcc760-4c07-11ea-b816-00155d1de702/88f2584a-db90-4e33-bb3d-5ad5c622157f-800x800.png",tag:"AMD"},
  {id:4,nome:"AMD Radeon RX 7600 8GB",categoria:"Placa de vídeo",tipo:"placa de vídeo",descricao:"Placa de vídeo AMD Radeon RX 7600 com 8 GB de memória GDDR6. Verifique o modelo do fabricante e a fonte recomendada.",imagem:"https://fdn.gsmarena.com/imgroot/news/23/05/amd-rx-7600/inline/-1200/gsmarena_001.jpg",tag:"RADEON"},
  {id:5,nome:"Placa-mãe B550M",categoria:"Placa-mãe",tipo:"placa-mãe",descricao:"Placa-mãe com chipset B550 e formato micro-ATX como referência visual. O modelo exato ainda precisa ser escolhido.",imagem:"https://www.tradeinn.com/f/14004/140049051_2/asus-prime-b550m-a-motherboard-refurbished.jpg",tag:"AM4"},
  {id:6,nome:"Memória RAM 16GB (2×8GB)",categoria:"Memória",tipo:"memória",descricao:"Kit de memória DDR4 com dois módulos de 8 GB como exemplo. A frequência e a marca precisam ser confirmadas.",imagem:"https://down-th.img.susercontent.com/file/th-11134207-7r98p-lp9jwxcelpj27d",tag:"DUAL CHANNEL"},
  {id:7,nome:"SSD 500GB",categoria:"Armazenamento",tipo:"armazenamento",descricao:"SSD de 500 GB. A imagem mostra um exemplo M.2 NVMe; confirme se o modelo desejado é NVMe ou SATA.",imagem:"https://img.ep-cdn.com/i/500/500/io/iodxpsgzamtuvqhbylck/kingston-500gb-m-2-2280-nvme-snv3s-500g-series-nv3-ssd-cene.jpg",tag:"500GB"},
  {id:8,nome:"Gabinete estilo aquário",categoria:"Gabinete",tipo:"gabinete",descricao:"Gabinete com painéis de vidro e visual panorâmico. Confira dimensões e compatibilidade com a placa-mãe e a placa de vídeo.",imagem:"https://images.tcdn.com.br/img/img_prod/591628/gabinete_gamer_c3tech_aquarius_frontal_e_lateral_em_vidro_usb_3_0_preto_mt_g810bk_40981_1_026f1e130aaf7060d52ab56732408c4d.jpg",tag:"RGB"},
  {id:9,nome:"Monitor Gamer 144Hz",categoria:"Monitor",tipo:"monitor",descricao:"Monitor de 144 Hz como referência visual. O tamanho, resolução, painel e modelo exatos ainda precisam ser escolhidos.",imagem:"https://s13emagst.akamaized.net/products/27398/27397207/images/res_b8ba87b14d45e150aec4e7a61e26f6b8.jpg?hash=6B54D6F3F344D9E1374CC0342DF47F19&height=450&width=450",tag:"144 HZ"}
];

var carrinho = [];
var produtoSelecionado = null;
var filtroAtual = "todos";
var historicoConversa = [];
var nexusRespondendo = false;

function criarCard(produto) {
  return '<article class="product-card">' +
    '<span class="product-tag">' + produto.tag + '</span>' +
    '<div class="product-image"><img src="' + produto.imagem + '" alt="' + produto.nome + '" loading="lazy" onerror="this.src=\'https://placehold.co/500x360/171b24/ffffff?text=NEXUS+HARDWARE\'"></div>' +
    '<div class="product-info"><span class="product-category">' + produto.categoria + '</span>' +
    '<h3>' + produto.nome + '</h3><p>' + produto.descricao + '</p>' +
    '<div class="product-bottom"><span class="product-price">Preço a consultar</span>' +
    '<div class="product-actions"><button class="small-button" onclick="abrirProduto(' + produto.id + ')">Detalhes</button>' +
    '<button class="small-button add" onclick="adicionarCarrinho(' + produto.id + ')">+ Carrinho</button></div></div></div></article>';
}

function renderizarProdutos() {
  var pcGrid = document.getElementById("pc-grid");
  var partsGrid = document.getElementById("parts-grid");
  pcGrid.innerHTML = produtos.filter(function(p){return p.tipo === "pc";}).map(criarCard).join("");
  mostrarPecas();
}

function mostrarPecas() {
  var grid = document.getElementById("parts-grid");
  var busca = document.getElementById("search-bar").value.toLowerCase().trim();
  var lista = produtos.filter(function(p){
    if (p.tipo === "pc") return false;
    var combinaFiltro = filtroAtual === "todos" || p.tipo === filtroAtual;
    var combinaBusca = (p.nome + " " + p.categoria + " " + p.descricao).toLowerCase().includes(busca);
    return combinaFiltro && combinaBusca;
  });
  grid.innerHTML = lista.length ? lista.map(criarCard).join("") : '<p class="cart-empty">Nenhum componente encontrado.</p>';
}

function filtrarBusca() {
  var busca = document.getElementById("search-bar").value.toLowerCase().trim();
  document.getElementById("pc-grid").innerHTML = produtos.filter(function(p){return p.tipo === "pc" && (p.nome + " " + p.descricao).toLowerCase().includes(busca);}).map(criarCard).join("");
  mostrarPecas();
}

function abrirProduto(id) {
  produtoSelecionado = produtos.find(function(p){return p.id === id;});
  if (!produtoSelecionado) return;
  document.getElementById("modal-img").src = produtoSelecionado.imagem;
  document.getElementById("modal-img").alt = produtoSelecionado.nome;
  document.getElementById("modal-title").textContent = produtoSelecionado.nome;
  document.getElementById("modal-desc").textContent = produtoSelecionado.descricao;
  document.getElementById("modal-add-btn").onclick = function(){adicionarCarrinho(produtoSelecionado.id);closeProductModal();};
  document.getElementById("product-modal").classList.add("open");
}
function closeProductModal(){document.getElementById("product-modal").classList.remove("open");}

function adicionarCarrinho(id) {
  var produto = produtos.find(function(p){return p.id === id;});
  if (!produto) return;
  var item = carrinho.find(function(p){return p.id === id;});
  if (item) item.quantidade += 1;
  else carrinho.push({id:produto.id,quantidade:1});
  atualizarCarrinho();
  mostrarToast(produto.nome + " adicionado ao carrinho!");
}
function alterarQuantidade(id,valor) {
  var item = carrinho.find(function(p){return p.id === id;});
  if (!item) return;
  item.quantidade += valor;
  if (item.quantidade <= 0) carrinho = carrinho.filter(function(p){return p.id !== id;});
  atualizarCarrinho();
}
function removerCarrinho(id) {carrinho = carrinho.filter(function(p){return p.id !== id;});atualizarCarrinho();}
function atualizarCarrinho() {
  var total = carrinho.reduce(function(soma,item){return soma + item.quantidade;},0);
  document.getElementById("cart-count").textContent = total;
  var area = document.getElementById("cart-items");
  if (carrinho.length === 0) area.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.<br>Adicione componentes para montar sua lista.</p>';
  else area.innerHTML = carrinho.map(function(item){
    var p = produtos.find(function(prod){return prod.id === item.id;});
    return '<div class="cart-item"><img src="' + p.imagem + '" alt=""><div><strong>' + p.nome + '</strong><small>Preço a consultar</small><div class="cart-qty"><button onclick="alterarQuantidade(' + p.id + ',-1)">−</button><span>' + item.quantidade + '</span><button onclick="alterarQuantidade(' + p.id + ',1)">+</button></div></div><button class="cart-remove" onclick="removerCarrinho(' + p.id + ')">Remover</button></div>';
  }).join("");
  document.getElementById("cart-summary").textContent = total ? total + " item(ns) no carrinho • valores sob consulta." : "Os preços serão informados pela equipe.";
}
function toggleCartModal(abrir) {
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");
  var mostrar = typeof abrir === "boolean" ? abrir : !drawer.classList.contains("open");
  drawer.classList.toggle("open",mostrar);overlay.classList.toggle("open",mostrar);
}
function openCheckout() {
  if (!carrinho.length) {mostrarToast("Adicione pelo menos um produto primeiro.");return;}
  toggleCartModal(false);
  document.getElementById("ck-sucesso").hidden = true;
  document.getElementById("checkout-form").hidden = false;
  document.getElementById("checkout-modal").classList.add("open");
}
function closeCheckout(){document.getElementById("checkout-modal").classList.remove("open");}
function confirmarOrcamento(evento) {
  evento.preventDefault();
  var nome = document.getElementById("ck-nome").value.trim();
  var email = document.getElementById("ck-email").value.trim();
  var telefone = document.getElementById("ck-telefone").value.trim();
  var itens = carrinho.map(function(item){var p=produtos.find(function(prod){return prod.id===item.id;});return p.nome + " (quantidade: " + item.quantidade + ")";}).join("; ");
  var resumo = "Pedido demonstrativo NEXUS Hardware\nNome: " + nome + "\nE-mail: " + email + "\nTelefone: " + (telefone || "Não informado") + "\nItens: " + itens + "\nPreços e disponibilidade: a confirmar.";
  document.getElementById("checkout-form").hidden = true;
  var sucesso = document.getElementById("ck-sucesso");
  sucesso.hidden = false;
  sucesso.textContent = "Resumo criado! Este protótipo não enviou o pedido nem realizou pagamento.\n\n" + resumo;
  carrinho = [];atualizarCarrinho();
}
function mostrarToast(texto) {
  var toast = document.getElementById("toast");toast.textContent = texto;toast.classList.add("show");
  window.clearTimeout(mostrarToast.timer);mostrarToast.timer = window.setTimeout(function(){toast.classList.remove("show");},2500);
}

function toggleTheme() {
  document.body.classList.toggle("light");
  var ativo = document.body.classList.contains("light");
  document.getElementById("theme-btn").textContent = ativo ? "☾" : "☼";
}
function toggleChat(abrir) {
  var chat = document.getElementById("chat-window");
  var mostrar = typeof abrir === "boolean" ? abrir : !chat.classList.contains("open");
  chat.classList.toggle("open",mostrar);
  if (mostrar) document.getElementById("chat-input").focus();
}
function addChatMessage(message,type) {
  var messages = document.getElementById("chat-messages");
  var item = document.createElement("div");item.className = type + "-message";item.textContent = message;
  messages.appendChild(item);messages.scrollTop = messages.scrollHeight;
  return item;
}
async function consultarNexus(pergunta) {
  if (nexusRespondendo) return;
  nexusRespondendo = true;
  var digitando = addChatMessage("NEXUS AI está pensando...","bot");
  var mensagens = historicoConversa.concat([{role:"user",content:pergunta}]).slice(-12);
  try {
    var resposta = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:mensagens})});
    var dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.error || "Não foi possível acessar a IA.");
    digitando.textContent = dados.reply || "Não recebi uma resposta. Tente novamente.";
    historicoConversa.push({role:"user",content:pergunta});
    historicoConversa.push({role:"assistant",content:digitando.textContent});
    historicoConversa = historicoConversa.slice(-12);
  } catch (erro) {
    console.error(erro);
    digitando.textContent = erro.message === "Failed to fetch" ? "Não consegui conectar ao servidor. Confira se o projeto está rodando pelo Node.js." : erro.message;
  }
  nexusRespondendo = false;
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}
function sendMessage(evento) {
  if (evento) evento.preventDefault();
  var input = document.getElementById("chat-input");
  var pergunta = input.value.trim();
  if (!pergunta || nexusRespondendo) return;
  addChatMessage(pergunta,"user");input.value="";consultarNexus(pergunta);
}
function sendSuggestion(texto) {document.getElementById("chat-input").value=texto;sendMessage();}

// Eventos iniciais
renderizarProdutos();atualizarCarrinho();
document.getElementById("search-form").addEventListener("submit",function(evento){evento.preventDefault();filtrarBusca();document.getElementById("pecas").scrollIntoView({behavior:"smooth"});});
document.getElementById("search-bar").addEventListener("input",filtrarBusca);
document.querySelectorAll(".filter-button").forEach(function(botao){botao.addEventListener("click",function(){document.querySelectorAll(".filter-button").forEach(function(b){b.classList.remove("active");});botao.classList.add("active");filtroAtual=botao.getAttribute("data-filter");mostrarPecas();});});
document.getElementById("theme-btn").addEventListener("click",toggleTheme);
document.getElementById("menu-button").addEventListener("click",function(){document.getElementById("main-nav").classList.toggle("open");});
document.querySelectorAll(".main-nav a").forEach(function(link){link.addEventListener("click",function(){document.getElementById("main-nav").classList.remove("open");});});
document.getElementById("checkout-form").addEventListener("submit",confirmarOrcamento);
document.getElementById("contact-form").addEventListener("submit",function(evento){evento.preventDefault();document.getElementById("contact-feedback").textContent="Obrigado! Este formulário ainda é demonstrativo e precisa ser conectado para enviar mensagens.";this.reset();});
