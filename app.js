// ─── BANCO DE DADOS ───────────────────────────────────────────
const menuData = {
  cafes: [
    { id:1, name:'Espresso Clássico', desc:'Dose encorpada com crema dourada perfeita. Grão arábica 100% selecionado.', price:6.90, img:'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
    { id:2, name:'Cappuccino Italiano', desc:'Espresso com leite vaporizado e espuma densa. Finalizado com canela.', price:12.90, img:'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80' },
    { id:3, name:'Latte Baunilha', desc:'Espresso suave com leite integral vaporizado e xarope artesanal de baunilha.', price:14.90, img:'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80' },
    { id:4, name:'Mocha Especial', desc:'Espresso com chocolate belga premium, leite e chantilly artesanal.', price:16.90, img:'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&q=80' },
  ],
  frias: [
    { id:5, name:'Cold Brew 24h', desc:'Extração lenta em água gelada por 24 horas. Suave, encorpado e sem acidez.', price:15.90, img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
    { id:6, name:'Frappuccino Caramelo', desc:'Café gelado batido com leite, caramelo artesanal e chantilly.', price:18.90, img:'frappuccino-caramelo.jpg' },
    { id:7, name:'Limonada com Espresso', desc:'Espresso duplo sobre limonada siciliana. Refrescante e vibrante.', price:14.90, img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
    { id:8, name:'Matcha Latte Gelado', desc:'Matcha premium japonês com leite de aveia e mel. Cremoso e delicioso.', price:16.90, img:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80' },
  ],
  paes: [
    { id:9, name:'Croissant de Manteiga', desc:'Massa folhada artesanal com manteiga francesa. Crocante por fora, macio por dentro.', price:9.90, img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
    { id:10, name:'Bolo de Cenoura', desc:'Receita clássica com calda de chocolate belga. Servido morno.', price:11.90, img:'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80' },
    { id:11, name:'Pão de Queijo Artesanal', desc:'Feito com polvilho e queijo minas. Saído quentinho do forno.', price:7.90, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { id:12, name:'Cheesecake de Frutas', desc:'Recheio cremoso de cream cheese com coulis de frutas vermelhas.', price:15.90, img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  ],
  salgados: [
    { id:13, name:'Wrap Frango Grelhado', desc:'Tortilla integral com frango grelhado, rúcula, tomate seco e molho especial.', price:22.90, img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
    { id:14, name:'Quiche Lorraine', desc:'Massa crocante com recheio de bacon, queijo suíço e creme de leite.', price:18.90, img:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&q=80' },
    { id:15, name:'Bruschetta Caprese', desc:'Pão italiano tostado com tomate, manjericão fresco e mussarela de búfala.', price:16.90, img:'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80' },
    { id:16, name:'Salada Caesar', desc:'Alface americana, croutons artesanais, parmesão e molho Caesar da casa.', price:24.90, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
  ]
};

// ─── BANCO DE DADOS — USUÁRIOS & AVALIAÇÕES ───────────────────
// Armazenado em memória (persiste enquanto a página estiver aberta)
const DB = {
  users: [],       // { name, email, passHash }
  reviews: [       // seed de reviews iniciais
    { name:'Ana Beatriz', stars:5, product:'Cappuccino Italiano', comment:'O melhor cappuccino que já tomei na vida! Ambiente aconchegante, atendimento incrível. Já virei cliente fiel.', since:'Cliente desde 2019', initials:'AB' },
    { name:'Carlos Eduardo', stars:5, product:'Ambiente / Atendimento', comment:'Lugar perfeito para trabalhar remotamente. Wifi rápido, música boa e o café é excepcional. Recomendo demais!', since:'Trabalha aqui toda semana', initials:'CE' },
    { name:'Mariana Souza', stars:5, product:'Croissant de Manteiga', comment:'Os pães artesanais combinam perfeitamente com o café. Uma experiência gastronômica completa e acessível.', since:'Frequentadora assídua', initials:'MS' },
  ]
};

// ─── AUTENTICAÇÃO ─────────────────────────────────────────────
let currentUser = null;

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h.toString(36);
}

function openAuth() { document.getElementById('authOverlay').classList.add('open'); document.getElementById('authModal').classList.add('open'); }
function closeAuth() { document.getElementById('authOverlay').classList.remove('open'); document.getElementById('authModal').classList.remove('open'); }

function switchAuthTab(tab) {
  document.getElementById('authLogin').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('authRegister').style.display = tab === 'register' ? '' : 'none';
  clearAuthErrors();
}

function clearAuthErrors() {
  ['loginError','registerError','registerSuccess'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.display = 'none'; el.textContent = ''; }
  });
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.style.display = 'block';
}

function doLogin() {
  clearAuthErrors();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { showAuthError('loginError', 'Preencha e-mail e senha.'); return; }
  if (!isValidEmail(email)) { showAuthError('loginError', 'Informe um e-mail válido.'); return; }
  const user = DB.users.find(u => u.email === email && u.passHash === simpleHash(pass));
  if (!user) { showAuthError('loginError', 'E-mail ou senha incorretos.'); return; }
  loginSuccess(user);
}

function doRegister() {
  clearAuthErrors();
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  if (!isValidName(name))  { showAuthError('registerError', 'Informe seu nome completo (nome e sobrenome, apenas letras).'); return; }
  if (!isValidEmail(email)) { showAuthError('registerError', 'Informe um e-mail válido.'); return; }
  if (pass.length < 6 || pass.length > 100) { showAuthError('registerError', 'A senha deve ter entre 6 e 100 caracteres.'); return; }
  if (pass !== pass2) { showAuthError('registerError', 'As senhas não coincidem.'); return; }
  if (DB.users.find(u => u.email === email)) { showAuthError('registerError', 'Já existe uma conta com este e-mail.'); return; }
  const user = { name, email, passHash: simpleHash(pass) };
  DB.users.push(user);
  const s = document.getElementById('registerSuccess');
  s.textContent = '✅ Conta criada com sucesso!'; s.style.display = 'block';
  setTimeout(() => { loginSuccess(user); }, 900);
}

function loginSuccess(user) {
  currentUser = user;
  closeAuth();
  renderNavAuth();
  showToast(`Bem-vindo(a), ${user.name.split(' ')[0]}! ☕`);
}

function logout() {
  currentUser = null;
  renderNavAuth();
  showToast('Até logo! Volte sempre ☕');
}

function renderNavAuth() {
  const area = document.getElementById('navAuthArea');
  if (currentUser) {
    const initials = currentUser.name.split(' ').map(w => w[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
    area.innerHTML = `
      <div class="user-badge" onclick="logout()" title="Clique para sair">
        <div class="user-avatar">${escapeHtml(initials)}</div>
        ${escapeHtml(currentUser.name.split(' ')[0])}
        <span style="opacity:.5;font-size:.7rem">· sair</span>
      </div>`;
  } else {
    area.innerHTML = `<button class="nav-btn" onclick="openAuth()">Entrar</button>`;
  }
}

// ─── CART ─────────────────────────────────────────────────────
let cart = [];

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartDrawer').classList.toggle('open');
}

function addToCart(id, name, price, img) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, img, qty: 1 });
  }
  renderCart();
  updateCartCount();
  // feedback no botão
  const btn = document.querySelector(`.menu-add[data-id="${id}"]`);
  if (btn) {
    btn.textContent = '✓';
    btn.style.background = '#2d7a3a';
    setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 900);
  }
  showToast(`${name} adicionado ao carrinho!`);
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">☕</div>
        <p>Seu carrinho está vazio.<br>Adicione algo do cardápio!</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
  container.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img class="cart-item-img" src="${i.img}" alt="${i.name}"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">R$ ${(i.price * i.qty).toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${i.id},-1)">−</button>
          <span class="qty-n">${i.qty}</span>
          <button class="qty-btn" onclick="updateQty(${i.id},1)">+</button>
        </div>
      </div>
      <button class="cart-remove" onclick="updateQty(${i.id},-999)" title="Remover">🗑</button>
    </div>
  `).join('');
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = total;
  el.classList.toggle('show', total > 0);
}

// ─── HELPERS DE VALIDAÇÃO ─────────────────────────────────────
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}
// Preposições comuns em nomes brasileiros (não contam como sobrenome real)
const NAME_PREPOSITIONS = new Set(['de','da','do','dos','das','e','di','du','del','la','le','van','von','y']);

function isValidName(s) {
  if (!s) return false;
  const trimmed = s.trim();
  if (trimmed.length < 4 || trimmed.length > 60) return false;
  if (/\s{2,}/.test(trimmed)) return false; // sem espaços duplicados
  // só letras (com acentos), espaços, hífens e apóstrofos
  if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s'\-]*[A-Za-zÀ-ÿ]$/.test(trimmed)) return false;
  // não pode ter 3+ letras iguais seguidas em qualquer lugar (ex: "aaaa", "kkk")
  if (/([A-Za-zÀ-ÿ])\1{2,}/i.test(trimmed)) return false;

  const words = trimmed.split(/\s+/).filter(Boolean);
  // precisa de pelo menos nome + sobrenome (2 palavras reais, fora preposições)
  const realWords = words.filter(w => !NAME_PREPOSITIONS.has(w.toLowerCase()));
  if (realWords.length < 2) return false;

  for (const w of words) {
    const lower = w.toLowerCase();
    if (NAME_PREPOSITIONS.has(lower)) continue;
    if (w.length < 2) return false;
    // precisa ter pelo menos uma vogal
    if (!/[aeiouáéíóúâêôûãõàäëïöü]/i.test(w)) return false;
    // pelo menos 25% de vogais (descarta gibberish tipo "Bcdfg")
    const vowels = (w.match(/[aeiouáéíóúâêôûãõàäëïöü]/gi) || []).length;
    if (vowels / w.length < 0.25) return false;
    // descarta padrões alternados sem sentido (ex: "Ababab", "Xyxyxy")
    if (/^([A-Za-zÀ-ÿ]{1,2})\1{2,}$/i.test(w)) return false;
  }
  // primeiro nome e último sobrenome com no mínimo 2 letras
  const first = realWords[0];
  const last  = realWords[realWords.length - 1];
  if (first.length < 2 || last.length < 2) return false;
  // total de letras (sem preposições e espaços) precisa ser ≥ 5
  const totalLetters = realWords.join('').length;
  if (totalLetters < 5) return false;
  return true;
}

// DDDs brasileiros válidos (Anatel)
const VALID_DDDS = new Set([
  11,12,13,14,15,16,17,18,19,
  21,22,24,27,28,
  31,32,33,34,35,37,38,
  41,42,43,44,45,46,47,48,49,
  51,53,54,55,
  61,62,63,64,65,66,67,68,69,
  71,73,74,75,77,79,
  81,82,83,84,85,86,87,88,89,
  91,92,93,94,95,96,97,98,99
]);

function isValidPhone(s) {
  const digits = String(s || '').replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 11) return false;
  // tudo o mesmo dígito (0000000000, 1111111111...)
  if (/^(.)\1+$/.test(digits)) return false;
  // sequências óbvias (somente o número inteiro)
  const SEQ_BAD = ['0123456789','01234567890','1234567890','12345678901','9876543210','98765432109','0987654321','09876543210'];
  if (SEQ_BAD.includes(digits)) return false;
  // DDD válido
  const ddd = parseInt(digits.substring(0, 2), 10);
  if (!VALID_DDDS.has(ddd)) return false;
  // celular (11 dígitos): 3º dígito deve ser 9 (regra Anatel)
  if (digits.length === 11 && digits[2] !== '9') return false;
  // fixo (10 dígitos): 3º dígito deve ser 2-5
  if (digits.length === 10 && !'2345'.includes(digits[2])) return false;
  // assinatura local não pode ser tudo igual (ex: 11 99999-9999 com tudo 9)
  const local = digits.substring(2);
  if (/^(.)\1+$/.test(local)) return false;
  return true;
}
function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim());
}
function isMostlyRepeated(s) {
  // detecta "aaaaaaaa", "kkkkkkkk", "11111111" etc.
  const cleaned = s.replace(/\s/g, '');
  if (cleaned.length < 4) return false;
  return /^(.)\1+$/.test(cleaned);
}

// ─── CHECKOUT ─────────────────────────────────────────────────
function finalizarPedido() {
  if (cart.length === 0) return;
  // monta resumo do pedido
  const linhas = cart.map(i => `
    <div class="checkout-line">
      <span class="qty">${i.qty}x</span>
      <span class="name">${escapeHtml(i.name)}</span>
      <span class="price">R$ ${(i.price * i.qty).toFixed(2).replace('.', ',')}</span>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('checkoutSummary').innerHTML = linhas + `
    <div class="checkout-total-row"><span>Total</span><span class="price">R$ ${total.toFixed(2).replace('.', ',')}</span></div>`;
  // pré-preenche dados se o usuário estiver logado
  if (currentUser) {
    const nomeEl = document.getElementById('coNome');
    if (!nomeEl.value) nomeEl.value = currentUser.name;
  }
  // fecha o carrinho e abre o checkout
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('checkoutError').style.display = 'none';
  document.getElementById('checkoutOverlay').classList.add('open');
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('checkoutError').style.display = 'none';
}

function showCheckoutError(msg) {
  const el = document.getElementById('checkoutError');
  el.textContent = msg;
  el.style.display = 'block';
}

function confirmarPedido() {
  if (cart.length === 0) { closeCheckout(); return; }
  const nome = document.getElementById('coNome').value.trim();
  const tel  = document.getElementById('coTel').value.trim();
  const obs  = document.getElementById('coObs').value.trim();

  if (!isValidName(nome)) {
    showCheckoutError('Informe seu nome completo (nome e sobrenome, apenas letras).');
    return;
  }
  if (!isValidPhone(tel)) {
    showCheckoutError('Informe um telefone real com DDD válido. Ex: (85) 9 8123-4567.');
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itens = cart.reduce((s, i) => s + i.qty, 0);

  // limpa o carrinho e fecha tudo
  cart = [];
  renderCart();
  updateCartCount();
  closeCheckout();
  document.getElementById('coNome').value = '';
  document.getElementById('coTel').value = '';
  document.getElementById('coObs').value = '';

  showToast(`🎉 Pedido confirmado, ${nome.split(' ')[0]}! ${itens} item(ns) · R$ ${total.toFixed(2).replace('.', ',')}`);
}

// ─── RENDER MENU ──────────────────────────────────────────────
function renderMenu(cat) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = menuData[cat].map(item => `
    <div class="menu-card">
      <img class="menu-card-img" src="${item.img}" alt="${item.name}" loading="lazy"/>
      <div class="menu-card-body">
        <div class="menu-name">${item.name}</div>
        <div class="menu-desc">${item.desc}</div>
        <div class="menu-footer">
          <div class="menu-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
          <button class="menu-add" data-id="${item.id}"
            onclick="addToCart(${item.id}, '${item.name.replace(/'/g,"\\'")}', ${item.price}, '${item.img}')">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.cat);
  });
});
renderMenu('cafes');

// ─── AVALIAÇÕES ───────────────────────────────────────────────
let selectedStars = 0;

function setStar(n) {
  selectedStars = n;
  document.querySelectorAll('.star-btn').forEach((b, i) => b.classList.toggle('active', i < n));
}

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = DB.reviews.map(r => `
    <div class="review-card reveal visible">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      ${r.product ? `<div class="review-badge">📦 ${escapeHtml(r.product)}</div>` : ''}
      <p class="review-text">"${escapeHtml(r.comment)}"</p>
      <div class="review-author">
        <div class="author-av">${r.img ? `<img src="${escapeHtml(r.img)}" alt="${escapeHtml(r.name)}"/>` : escapeHtml(r.initials)}</div>
        <div>
          <div class="author-n">${escapeHtml(r.name)}</div>
          <div class="author-r">${escapeHtml(r.since || 'Cliente Grão & Arte')}</div>
        </div>
      </div>
    </div>
  `).join('');
  // update subtitle
  const avg = (DB.reviews.reduce((s,r) => s+r.stars, 0) / DB.reviews.length).toFixed(1);
  document.getElementById('reviewsSubtitle').textContent = `${DB.reviews.length} avaliações · média ${avg}★`;
  document.getElementById('heroRating').textContent = avg + '★';
}

function submitReview() {
  const name    = document.getElementById('revName').value.trim();
  const comment = document.getElementById('revComment').value.trim();
  const product = document.getElementById('revProduct').value;
  if (!isValidName(name)) {
    showToast('⚠️ Informe seu nome completo (nome e sobrenome, apenas letras)');
    return;
  }
  if (selectedStars === 0) { showToast('⚠️ Selecione uma nota'); return; }
  if (comment.length < 10) { showToast('⚠️ O comentário precisa ter pelo menos 10 caracteres'); return; }
  if (comment.length > 500) { showToast('⚠️ O comentário não pode ter mais de 500 caracteres'); return; }
  if (isMostlyRepeated(comment)) { showToast('⚠️ Escreva um comentário com sentido'); return; }
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
  DB.reviews.unshift({ name, stars: selectedStars, product, comment, initials });
  renderReviews();
  // reset
  document.getElementById('revName').value = '';
  document.getElementById('revComment').value = '';
  document.getElementById('revProduct').value = '';
  selectedStars = 0;
  document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
  showToast('✅ Avaliação publicada! Obrigado!');
  document.getElementById('reviewsGrid').scrollIntoView({ behavior:'smooth', block:'start' });
}

renderReviews();

// ─── RESERVA ──────────────────────────────────────────────────
(function setupDate() {
  const today = new Date();
  const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const max = new Date(today); max.setMonth(max.getMonth() + 6);
  const el = document.getElementById('resData');
  el.min = fmt(today);
  el.max = fmt(max);
})();

function showFieldError(id, show) {
  document.getElementById('err-' + id).style.display = show ? 'block' : 'none';
}

function reservar() {
  const nome    = document.getElementById('resNome').value.trim();
  const tel     = document.getElementById('resTel').value.trim();
  const dataVal = document.getElementById('resData').value;
  const hora    = document.getElementById('resHora').value;
  const pessoas = document.getElementById('resPessoas').value;
  let valid = true;

  // Nome: precisa ser um nome válido (letras, 2-60 caracteres)
  const nomeOk = isValidName(nome);
  showFieldError('resNome', !nomeOk);
  document.getElementById('err-resNome').textContent = !nome
    ? 'Informe seu nome'
    : 'Informe seu nome completo (nome e sobrenome, apenas letras)';
  if (!nomeOk) valid = false;

  // Telefone: precisa ser brasileiro válido (DDD + 8 ou 9 dígitos)
  const telOk = isValidPhone(tel);
  showFieldError('resTel', !telOk);
  document.getElementById('err-resTel').textContent = !tel
    ? 'Informe o telefone'
    : 'Informe um telefone real com DDD válido. Ex: (85) 9 8123-4567';
  if (!telOk) valid = false;

  showFieldError('resHora', !hora);    if (!hora)    valid = false;
  showFieldError('resPessoas', !pessoas); if (!pessoas) valid = false;

  // Data: entre hoje e 6 meses no futuro
  let dataOk = false;
  if (dataVal) {
    const chosen = new Date(dataVal + 'T00:00:00');
    const today  = new Date(); today.setHours(0,0,0,0);
    const maxD   = new Date(today); maxD.setMonth(maxD.getMonth() + 6);
    dataOk = chosen >= today && chosen <= maxD && chosen.getFullYear() >= today.getFullYear();
  }
  showFieldError('resData', !dataOk);
  if (!dataOk) valid = false;

  if (!valid) return;

  const d = new Date(dataVal + 'T00:00:00');
  const dateStr = d.toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });
  const obs = document.getElementById('resObs').value.trim();

  document.getElementById('successMsg').textContent =
    `Reserva para ${nome} — ${dateStr} às ${hora} · ${pessoas} pessoa(s).${obs ? ' Obs: ' + obs : ''} Te esperamos com muito café! ☕`;

  document.getElementById('reservaForm').querySelector('h3').style.display = 'none';
  document.getElementById('reservaForm').querySelector('p').style.display = 'none';
  document.querySelectorAll('#reservaForm .form-row, #reservaForm .field').forEach(el => el.style.display = 'none');
  document.querySelector('.btn-reservar').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

function resetReserva() {
  ['resNome','resTel','resData','resHora','resPessoas','resObs'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.querySelectorAll('#reservaForm .form-row, #reservaForm .field').forEach(el => el.style.display = '');
  document.getElementById('reservaForm').querySelector('h3').style.display = '';
  document.getElementById('reservaForm').querySelector('p').style.display = '';
  document.querySelector('.btn-reservar').style.display = '';
  document.getElementById('formSuccess').style.display = 'none';
  document.querySelectorAll('.field-error').forEach(el => el.style.display = 'none');
}

// ─── TOAST ────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── NAV SCROLL ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ─── REVEAL ───────────────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
