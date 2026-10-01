/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => 'GH₵\u00A0' + Number(n || 0).toLocaleString('en-GH', {maximumFractionDigits: 2});
const uid = () => Math.random().toString(36).slice(2, 9);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const svg = (d, s = 22, fill = 'none') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${fill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const HEART = 'M12 21s-7-4.6-9.3-9.1C1 8.5 3 5 6.4 5c2 0 3.4 1.1 4.1 2.3h3C14.2 6.1 15.6 5 17.6 5 21 5 23 8.5 21.3 11.9 19 16.4 12 21 12 21z';
const ICON = {
  bag: svg('<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  back: svg('<path d="M15 6l-6 6 6 6"/>', 20),
  send: svg('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>', 20),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', 20),
  chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L3 20l1-5.2A8 8 0 1 1 21 12z"/>', 20),
  check: svg('<path d="M5 12l5 5 9-10"/>', 28),
  shield: svg('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>', 20),
  heart: on => svg(`<path d="${HEART}"/>`, 20, on ? 'currentColor' : 'none'),
  wa: svg('<path d="M3 21l1.6-4.9A8.5 8.5 0 1 1 8 19.5L3 21z"/><path d="M9 9c.3 2.6 2.4 4.700 5 5l1-1.500-1.800-.900-.8.800c-.8-.4-1.500-1.100-1.900-1.900l.8-.8L10.400 7 9 8z"/>', 20)
};
const LOGO = '<svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true"><path d="M3 4h22l3 8H0z" fill="#F0B429"/><path d="M9 4h4l-1 8H6zM19 4h4l3 8h-6z" fill="#C1272D"/><path d="M3 14v11h22V14" fill="none" stroke="#F3F5EF" stroke-width="2"/><rect x="11" y="17" width="6" height="8" fill="#F3F5EF"/></svg>';

/* ---------- data ---------- */
const CAT = {
  Electronics: {c: '#2F6FB5', e: '🔌'},
  Fashion: {c: '#D99A00', e: '👕'},
  Home: {c: '#1F7A4D', e: '🏠'},
  Beauty: {c: '#9B4F96', e: '🧴'}
};
const CATS = Object.keys(CAT);
const SELLER = 'Accra Trade Hub';
const D_DEL = 'Accra 1–2 days · Other regions 3–5 days';
const D_WARR = '7-day return if the item is not as described';
const KEY = 'markethub:v1';
const REGIONS = {'Greater Accra': 20, 'Ashanti': 35, 'Central': 35, 'Eastern': 30, 'Western': 40, 'Western North': 45, 'Volta': 45, 'Oti': 50, 'Bono': 45, 'Bono East': 50, 'Ahafo': 50, 'Northern': 60, 'Savannah': 60, 'North East': 65, 'Upper East': 65, 'Upper West': 65};
const FREE_ACCRA = 500;
const feeFor = (region, sub) => (region === 'Greater Accra' && sub >= FREE_ACCRA) ? 0 : (REGIONS[region] != null ? REGIONS[region] : 55);

function seed() {
  const rows = [
    ['Samsung Galaxy A15 Smartphone', 1850, 'Electronics', '📱', '6.5-inch screen, 128GB storage, dual SIM and a 5,000mAh battery. Brand new and sealed, charger in the box.', '12-month manufacturer warranty', 8, 0],
    ['Nike Air Max Sneakers', 750, 'Fashion', '👟', 'Lightweight everyday sneakers with a cushioned sole. Sizes 40 to 45. Tell the seller your size in chat.', '7-day exchange if the size does not fit', 3, 650],
    ['HP 15 Laptop, 8GB RAM / 256GB SSD', 5400, 'Electronics', '💻', '15.6-inch laptop for school, office and browsing. Windows installed, charger included.', '12-month seller warranty', 4, 0],
    ['Wireless Earbuds', 220, 'Electronics', '🎧', 'Bluetooth earbuds with a charging case and about 20 hours of total playtime.', '6-month warranty', 25, 180],
    ['Ankara Print Dress', 260, 'Fashion', '👗', 'Tailored Ankara dress in sizes S to XL. Custom fitting available, ask in chat.', 'Free alteration within 7 days', 6, 0],
    ['Leather Handbag', 340, 'Fashion', '👜', 'Roomy handbag with a zip pocket and a detachable shoulder strap.', D_WARR, 2, 0],
    ['Smart Watch', 480, 'Electronics', '⌚', 'Tracks steps, heart rate and sleep, and shows phone notifications. Works with Android and iPhone.', '6-month warranty', 15, 0],
    ['Kente Print Shirt', 190, 'Fashion', '👔', 'Short-sleeve shirt with a woven kente trim. Sizes M to XXL.', D_WARR, 10, 0],
    ['Electric Rice Cooker, 1.8L', 380, 'Home', '🍚', 'Cooks rice for 6 to 8 people and keeps it warm. Non-stick inner pot and steamer tray.', '12-month warranty', 7, 0],
    ['Shea Butter Gift Set', 95, 'Beauty', '🧴', 'Raw shea butter body butter, lip balm and soap. Packed in a gift box.', D_WARR, 30, 0]
  ];
  const day = 864e5, now = Date.now();
  return {
    role: null, accounts: [], userId: null,
    products: rows.map((r, i) => ({id: 'p' + (i + 1), name: r[0], price: r[1], cat: r[2], emoji: r[3], desc: r[4], warranty: r[5], delivery: D_DEL, img: null, stock: r[6], sale: r[7] || 0})),
    cart: [], orders: [], chats: {}, unreadS: {}, unreadC: {}, deals: {}, wish: [],
    reviews: [
      {pid: 'p1', rating: 5, text: 'Sealed box, arrived the next day in Accra. Battery lasts all day.', name: 'Kwame A.', t: now - 9 * day},
      {pid: 'p1', rating: 4, text: 'Good phone for the price. Seller replied fast in chat.', name: 'Efua M.', t: now - 5 * day},
      {pid: 'p2', rating: 5, text: 'Fits true to size. Very comfortable for walking.', name: 'Nana Y.', t: now - 12 * day},
      {pid: 'p4', rating: 4, text: 'Clear sound for the price. The case is a bit small.', name: 'Ama K.', t: now - 3 * day},
      {pid: 'p5', rating: 5, text: 'The fitting was perfect and the print is beautiful.', name: 'Akosua B.', t: now - 7 * day},
      {pid: 'p9', rating: 4, text: 'Cooks evenly and keeps rice warm all afternoon.', name: 'Yaw D.', t: now - 2 * day}
    ]
  };
}
function norm(d) {
  d.deals = d.deals || {}; d.wish = d.wish || []; d.reviews = d.reviews || []; d.chats = d.chats || {};
  d.unreadS = d.unreadS || {}; d.unreadC = d.unreadC || {}; d.cart = d.cart || []; d.orders = d.orders || [];
  d.accounts = d.accounts || []; if (d.userId === undefined) d.userId = null;
  const sd = seed().products;
  d.products.forEach(p => {
    const s = sd.find(x => x.id === p.id);
    if (s) { if (p.stock === undefined) p.stock = s.stock; if (p.sale === undefined) p.sale = s.sale; }
  });
  d.orders.forEach(o => {
    if (!o.status) o.status = o.delivered ? 'delivered' : 'placed';
    if (o.subtotal == null) o.subtotal = o.total;
    if (o.fee == null) o.fee = 0;
  });
  return d;
}
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); if (d && d.products) return d; } } catch (e) {}
  return null;
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('Storage is full. Remove a product image and try again.'); }
}
let S = norm(load() || seed());
const blankCo = () => ({name: '', phone: '', addr: '', region: 'Greater Accra', method: 'momo', net: 'MTN', momo: '', card: '', exp: '', cvv: ''});
const V = {screen: 'home', pid: null, tab: 'products', q: '', cat: 'All', sort: 'new', sheet: null, chat: null, confirmDel: null, newImg: null, buy: null, co: blankCo(), err: '', busy: false, step: '', last: null, rv: null, offerPid: null, auth: {mode: 'signin', name: '', phone: '', password: '', confirm: ''}, authErr: '', installDismissed: false};
const accName = () => { const a = S.accounts.find(x => x.id === S.userId); return a ? a.name : ''; };
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

/* ---------- pricing + product helpers ---------- */
const byId = id => S.products.find(p => p.id === id);
const emojiOf = p => p.emoji || (CAT[p.cat] ? CAT[p.cat].e : '📦');
const hasSale = p => p.sale && p.sale > 0 && p.sale < p.price;
const baseOf = p => hasSale(p) ? p.sale : p.price;
const off = p => hasSale(p) ? Math.round((1 - p.sale / p.price) * 100) : 0;
const dealOf = p => S.deals[p.id];
const lineTotal = (p, q) => dealOf(p) != null ? dealOf(p) + (q - 1) * baseOf(p) : baseOf(p) * q;
const inStock = p => p.stock === undefined || p.stock > 0;
const cartItems = () => S.cart.map(c => ({p: byId(c.id), qty: c.qty})).filter(x => x.p);
const checkoutItems = () => V.buy ? (byId(V.buy) ? [{p: byId(V.buy), qty: 1}] : []) : cartItems();
const sumItems = items => items.reduce((a, x) => a + lineTotal(x.p, x.qty), 0);
const sumObj = o => Object.values(o).reduce((a, b) => a + b, 0);
const timeOf = t => new Date(t).toLocaleTimeString('en-GH', {hour: '2-digit', minute: '2-digit'});
const dateOf = t => new Date(t).toLocaleDateString('en-GH', {day: 'numeric', month: 'short', year: 'numeric'});
const earn = o => o.subtotal != null ? o.subtotal : o.total;
function ratingOf(pid) {
  const r = S.reviews.filter(x => x.pid === pid);
  return {n: r.length, avg: r.length ? r.reduce((a, x) => a + x.rating, 0) / r.length : 0};
}
function ratingHtml(pid) {
  const {n, avg} = ratingOf(pid);
  return n ? `<span class="rating" aria-label="Rated ${avg.toFixed(1)} out of 5 from ${n} review${n === 1 ? '' : 's'}"><b>★</b> ${avg.toFixed(1)} (${n})</span>` : '';
}
function priceHtml(p, big) {
  const d = dealOf(p);
  if (d != null) return `<div class="price${big ? ' big' : ''}">${money(d)}<s>${money(baseOf(p))}</s></div>`;
  if (hasSale(p)) return `<div class="price${big ? ' big' : ''}">${money(p.sale)}<s>${money(p.price)}</s></div>`;
  return `<div class="price${big ? ' big' : ''}">${money(p.price)}</div>`;
}

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ---------- views ---------- */
function artCore(p, cls, big) {
  const c = CAT[p.cat] ? CAT[p.cat].c : '#888';
  return `<div class="art${cls}" style="--c:${c}">${p.img ? `<img src="${p.img}" alt="${big ? esc(p.name) : ''}">` : `<span>${emojiOf(p)}</span>`}</div>`;
}
const art = (p, big) => artCore(p, '', big);
const artSm = p => artCore(p, ' sm', false);

function header() {
  const cnt = S.cart.reduce((a, c) => a + c.qty, 0);
  const isC = S.role === 'customer';
  return `<header class="top"><div class="bar">
    <button class="brand" data-action="home" aria-label="MarketPlace home">${LOGO}<span>MarketPlace</span></button>
    <div class="actions">
      ${S.role ? `<div class="seg" role="group" aria-label="Switch between shopping and selling">
        <button data-action="role" data-id="customer" aria-pressed="${isC}">Shop</button>
        <button data-action="role" data-id="seller" aria-pressed="${!isC}">Sell</button></div>` : ''}
      ${isC ? `<button class="cartbtn" data-action="cart" aria-label="Open cart, ${cnt} item${cnt === 1 ? '' : 's'}">${ICON.bag}${cnt ? `<b>${cnt}</b>` : ''}</button>` : ''}
      ${S.userId ? `<button class="who" data-action="logout" aria-label="Log out of ${esc(accName())}'s account">Log out</button>` : ''}
    </div></div><div class="kente"></div></header>`;
}

function authView() {
  const a = V.auth, isUp = a.mode === 'signup';
  return `<main class="gate">
    <h1>${isUp ? 'Create your account' : 'Welcome to MarketPlace'}</h1>
    <p class="sub">${isUp ? 'Sign up to shop or sell across Ghana.' : 'Sign in to shop or sell across Ghana.'}</p>
    <div class="chips" style="margin:18px 0 2px">
      <button class="chip" data-action="authmode" data-id="signin" aria-pressed="${!isUp}">Sign in</button>
      <button class="chip" data-action="authmode" data-id="signup" aria-pressed="${isUp}">Sign up</button>
    </div>
    <form data-form="auth" novalidate style="margin-top:16px">
      ${isUp ? `<div class="field"><label for="an">Full name</label><input id="an" data-auth="name" autocomplete="name" value="${esc(a.name)}"></div>` : ''}
      <div class="field"><label for="ap">Phone number</label><input id="ap" data-auth="phone" inputmode="tel" autocomplete="tel" placeholder="0244 123 456" value="${esc(a.phone)}"></div>
      <div class="field"><label for="aw">Password</label><input id="aw" type="password" data-auth="password" autocomplete="${isUp ? 'new-password' : 'current-password'}" value="${esc(a.password)}"></div>
      ${isUp ? `<div class="field"><label for="ac">Confirm password</label><input id="ac" type="password" data-auth="confirm" autocomplete="new-password" value="${esc(a.confirm)}"></div>` : ''}
      <p class="err" role="alert">${esc(V.authErr)}</p>
      <button class="btn primary block" type="submit">${isUp ? 'Create account' : 'Sign in'}</button>
      <p class="note">Test mode. Your account stays on this device only.</p>
    </form></main>`;
}
function gate() {
  return `<main class="gate">
    <h1>How do you want to use MarketPlace?</h1>
    <p class="sub">Buy and sell across Ghana. You can switch any time.</p>
    <div class="choices">
      <button class="choice buy" data-action="role" data-id="customer"><strong>Customer</strong><span>Shop phones, fashion, home items and more</span></button>
      <button class="choice" data-action="role" data-id="seller"><strong>Seller</strong><span>List your products and turn them into income</span></button>
    </div>
    <ul class="perks">
      <li>Make an offer, the way you would at the market</li>
      <li>Pay by MoMo or card and we hold your money until your order arrives</li>
      <li>Delivery to all 16 regions, with the fee shown before you pay</li>
    </ul></main>`;
}

function filtered() {
  const q = V.q.trim().toLowerCase();
  let list = S.products.filter(p => {
    if (V.cat === 'Deals' && !hasSale(p)) return false;
    if (V.cat === 'Saved' && !S.wish.includes(p.id)) return false;
    if (CATS.includes(V.cat) && p.cat !== V.cat) return false;
    return !q || (p.name + ' ' + p.cat + ' ' + (p.desc || '')).toLowerCase().includes(q);
  });
  if (V.sort === 'low') list.sort((a, b) => baseOf(a) - baseOf(b));
  else if (V.sort === 'high') list.sort((a, b) => baseOf(b) - baseOf(a));
  else if (V.sort === 'rated') list.sort((a, b) => ratingOf(b.id).avg - ratingOf(a.id).avg);
  return list;
}
function emptyGrid() {
  if (V.cat === 'Saved' && !V.q) return `<div class="empty"><strong>Nothing saved yet</strong>Tap the heart on a product to keep it here.</div>`;
  if (V.cat === 'Deals' && !V.q) return `<div class="empty"><strong>No deals right now</strong>Check back soon.</div>`;
  return `<div class="empty"><strong>Nothing found</strong>${V.q ? `No products match “${esc(V.q)}”. Try another word or a different category.` : 'No products in this category yet.'}</div>`;
}
function gridHtml(list) {
  if (!list.length) return emptyGrid();
  return list.map(p => {
    const on = S.wish.includes(p.id), ok = inStock(p);
    return `<article class="card">
    <div class="artwrap"><div data-action="open" data-id="${p.id}">${art(p)}</div>
      ${off(p) ? `<span class="off">-${off(p)}%</span>` : ''}${!ok ? '<span class="soldout">Sold out</span>' : ''}
      <button class="heart" data-action="wish" data-id="${p.id}" aria-pressed="${on}" aria-label="${on ? 'Remove from saved: ' : 'Save: '}${esc(p.name)}">${ICON.heart(on)}</button></div>
    <div class="info"><h3><button class="linkbtn" data-action="open" data-id="${p.id}">${esc(p.name)}</button></h3>
      <p class="cat">${esc(p.cat)} ${ratingHtml(p.id)}</p>${priceHtml(p)}
      ${ok && p.stock !== undefined && p.stock <= 5 ? `<span class="left">Only ${p.stock} left</span>` : ''}</div>
    <button class="addbtn" data-action="add" data-id="${p.id}" ${ok ? '' : 'disabled'}>${ok ? 'Add to cart' : 'Sold out'}</button></article>`;
  }).join('');
}
function updateGrid() {
  const l = filtered(), g = $('#grid'), c = $('#cnt');
  if (g) g.innerHTML = gridHtml(l);
  if (c) c.textContent = `${l.length} product${l.length === 1 ? '' : 's'}`;
}
function home() {
  const toConfirm = S.orders.filter(o => o.status === 'shipped').length;
  const unread = sumObj(S.unreadC);
  const chips = ['All', 'Deals', 'Saved', ...CATS].map(c => `<button class="chip" data-action="cat" data-id="${c}" aria-pressed="${V.cat === c}">${c}</button>`).join('');
  const anyDeal = S.products.some(hasSale) && (V.cat === 'All' || V.cat === 'Deals');
  return `<main class="wrap">
    <h1>Akwaaba. What are you shopping for?</h1>
    <div class="search">${ICON.search}<input id="q" type="search" placeholder="Search phones, sneakers, laptops" value="${esc(V.q)}" autocomplete="off" aria-label="Search products"></div>
    <div class="chips">${chips}<button class="chip first-right" data-action="orders">Orders${toConfirm ? `<b>${toConfirm}</b>` : ''}</button><button class="chip" data-action="inbox">Messages${unread ? `<b>${unread}</b>` : ''}</button></div>
    ${anyDeal ? `<div class="flash"><strong>Flash deals</strong><span>Ends in <b id="cd">--:--:--</b></span></div>` : ''}
    <div class="toolbar"><span class="count-line" id="cnt">${filtered().length} products</span>
      <label><span class="sr">Sort products</span><select id="sort">
        ${[['new', 'Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['rated', 'Top rated']].map(([v, l]) => `<option value="${v}" ${V.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
    <div id="grid" class="grid">${gridHtml(filtered())}</div></main>`;
}

function shareLink(p) {
  let url = '';
  try { url = location.href; } catch (e) {}
  const text = `${p.name} for ${money(baseOf(p))} on MarketPlace ${url}`.trim();
  return 'https://wa.me/?text=' + encodeURIComponent(text);
}
function detail() {
  const p = byId(V.pid);
  if (!p) { V.screen = 'home'; return home(); }
  const ok = inStock(p), d = dealOf(p);
  const revs = S.reviews.filter(r => r.pid === p.id).sort((a, b) => b.t - a.t).slice(0, 6);
  return `<main class="wrap"><button class="back" data-action="home">${ICON.back} All products</button>
    <div class="dgrid"><div>${art(p, true)}</div><div>
      <p class="cat">${esc(p.cat)} ${ratingHtml(p.id)}</p><h1>${esc(p.name)}</h1>
      ${priceHtml(p, true)}
      ${off(p) && d == null ? `<p class="left">Flash deal: ${off(p)}% off</p>` : ''}
      ${d != null ? `<div class="deal">The seller accepted your offer. Your price is ${money(d)} for one item.</div>` : ''}
      ${ok && p.stock !== undefined && p.stock <= 5 ? `<p class="left">Only ${p.stock} left in stock</p>` : ''}${!ok ? '<p class="left">Sold out</p>' : ''}
      <p class="desc">${esc(p.desc || 'No description yet. Ask the seller in chat.')}</p>
      <dl class="facts">
        <div><dt>Warranty</dt><dd>${esc(p.warranty || D_WARR)}</dd></div>
        <div><dt>Delivery</dt><dd>${esc(p.delivery || D_DEL)}. Free in Greater Accra on orders over ${money(FREE_ACCRA)}.</dd></div>
        <div><dt>Protection</dt><dd>Pay by MoMo or card and MarketPlace holds your money until you confirm delivery.</dd></div>
        <div><dt>Sold by</dt><dd>${SELLER}<span class="ver">Verified</span></dd></div>
      </dl>
      <div class="stack">
        <button class="btn primary block" data-action="buy" data-id="${p.id}" ${ok ? '' : 'disabled'}>Buy now</button>
        <div class="two"><button class="btn" data-action="add" data-id="${p.id}" ${ok ? '' : 'disabled'}>Add to cart</button>
          <button class="btn" data-action="offer" data-id="${p.id}" ${ok ? '' : 'disabled'}>Make an offer</button></div>
        <div class="two"><button class="btn ghost" data-action="chat" data-id="${p.id}">${ICON.chat} Chat with seller</button>
          <a class="btn ghost" href="${shareLink(p)}" target="_blank" rel="noopener">${ICON.wa} Share</a></div>
        <button class="btn ghost" data-action="wish" data-id="${p.id}">${ICON.heart(S.wish.includes(p.id))} ${S.wish.includes(p.id) ? 'Saved' : 'Save for later'}</button>
      </div></div></div>
    <section class="reviews"><h2>Reviews</h2>${revs.length ? revs.map(r => `<div class="review"><div class="who"><span class="st" aria-label="${r.rating} out of 5">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span><span>${esc(r.name)} · ${dateOf(r.t)}</span></div><p>${esc(r.text || '')}</p></div>`).join('')
      : '<p class="sub">No reviews yet. Buy it and be the first to rate it.</p>'}</section></main>`;
}

/* threads (shared by customer inbox + seller messages) */
function threadList(role) {
  const unreadMap = role === 'seller' ? S.unreadS : S.unreadC;
  const pids = Object.keys(S.chats).filter(pid => S.chats[pid].length && byId(pid))
    .sort((a, b) => S.chats[b][S.chats[b].length - 1].t - S.chats[a][S.chats[a].length - 1].t);
  if (!pids.length) {
    return `<div class="empty"><strong>No messages yet</strong>${role === 'seller' ? 'When a customer chats or makes an offer, it shows up here.' : 'Open a product and tap Chat with seller or Make an offer.'}</div>`;
  }
  return pids.map(pid => {
    const p = byId(pid), m = S.chats[pid], last = m[m.length - 1], u = unreadMap[pid] || 0;
    return `<button class="thread" data-action="thread" data-id="${pid}">${artSm(p)}
      <div class="grow"><strong>${esc(p.name)}</strong><p>${last.from === role ? 'You: ' : ''}${esc(last.text)}</p></div>
      <div style="text-align:right"><time>${timeOf(last.t)}</time>${u ? `<div><span class="badge">${u}</span></div>` : ''}</div></button>`;
  }).join('');
}
function inbox() {
  return `<main class="wrap"><button class="back" data-action="home">${ICON.back} All products</button>
    <h1>Messages</h1><div style="margin-top:16px">${threadList('customer')}</div></main>`;
}

/* customer orders */
function ordersView() {
  const list = [...S.orders].sort((a, b) => b.t - a.t);
  const steps = ['Placed', 'Shipped', 'Delivered'];
  const rows = list.map(o => {
    const idx = o.status === 'delivered' ? 2 : o.status === 'shipped' ? 1 : 0;
    const held = o.paid && o.status !== 'delivered';
    const rate = o.status === 'delivered' ? o.items.filter(i => !i.reviewed && byId(i.id)).map(i => `<button class="btn sm" data-action="rate" data-id="${o.id}|${i.id}">Rate ${esc(i.name.length > 22 ? i.name.slice(0, 22) + '…' : i.name)}</button>`).join('') : '';
    return `<li class="order"><div class="top-row"><strong class="ref">${o.id}</strong><strong>${money(o.total)}</strong></div>
      <p>${o.items.map(i => `${i.qty} × ${esc(i.name)}`).join(', ')}</p>
      <p>${dateOf(o.t)} · ${esc(o.method)} · ${o.fee ? `delivery ${money(o.fee)}` : 'free delivery'}${o.region ? ' to ' + esc(o.region) : ''}</p>
      <ol class="track" aria-label="Order progress">${steps.map((s, i) => `<li class="${i <= idx ? 'done' : ''}">${s}</li>`).join('')}</ol>
      ${held ? `<div class="protect">${ICON.shield}<span>Your money is held safely. It goes to the seller only after you confirm delivery.</span></div>` : ''}
      <div class="obtns">${o.status === 'shipped' ? `<button class="btn sm primary" data-action="confirm" data-id="${o.id}">Confirm delivery</button>` : ''}${rate}
        <button class="btn sm ghost" data-action="chat" data-id="${o.items[0].id}">${ICON.chat} Chat with seller</button></div></li>`;
  }).join('');
  return `<main class="wrap"><button class="back" data-action="home">${ICON.back} All products</button>
    <h1>Your orders</h1><div style="margin-top:12px">${list.length ? `<ul>${rows}</ul>` : `<div class="empty"><strong>No orders yet</strong>Orders you place show up here with live progress.</div>`}</div></main>`;
}

/* seller */
const earnedTotal = () => S.orders.filter(o => o.delivered).reduce((a, o) => a + earn(o), 0);
function seller() {
  const unread = sumObj(S.unreadS), toShip = S.orders.filter(o => o.status === 'placed').length;
  const tabs = [['products', 'Products'], ['sales', 'Sales'], ['messages', 'Messages'], ['reports', 'Reports']];
  const badge = {messages: unread, sales: toShip};
  const body = V.tab === 'products' ? sellerProducts() : V.tab === 'sales' ? sellerSales() : V.tab === 'messages' ? `<div>${threadList('seller')}</div>` : reports();
  return `<main class="wrap">
    <h1>Welcome back, Seller!</h1>
    <p class="sub">Seller Center: turn your products into income.</p>
    <dl class="stats"><div><dt>Products</dt><dd>${S.products.length}</dd></div>
      <div><dt>Paid out</dt><dd>${money(earnedTotal())}</dd></div>
      <div><dt>New messages</dt><dd>${unread}</dd></div></dl>
    <nav class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${V.tab === k}" data-action="tab" data-id="${k}">${l}${badge[k] ? `<b>${badge[k]}</b>` : ''}</button>`).join('')}</nav>
    ${body}</main>`;
}
function sellerProducts() {
  const rows = S.products.map(p => `<li class="prow">${artSm(p)}
    <div class="grow"><strong>${esc(p.name)}</strong><span class="cat">${hasSale(p) ? `${money(p.sale)} (was ${money(p.price)})` : money(p.price)} · ${esc(p.cat)} · ${p.stock === undefined ? 'Stock not tracked' : p.stock === 0 ? 'Sold out' : `${p.stock} in stock`}</span></div>
    <div class="pa">${V.confirmDel === p.id
      ? `<button class="btn sm ghost" data-action="delno">Cancel</button><button class="btn sm danger" data-action="delyes" data-id="${p.id}">Delete</button>`
      : `<button class="btn sm ghost" data-action="restock" data-id="${p.id}" aria-label="Add 5 to stock of ${esc(p.name)}">Restock +5</button><button class="btn sm ghost" data-action="del" data-id="${p.id}" aria-label="Delete ${esc(p.name)}">Delete</button>`}</div></li>`).join('');
  return `<section class="panel"><h2>Add new product</h2>
    <form data-form="product" novalidate>
      <div class="field"><label for="pn">Product name</label><input id="pn" name="name" maxlength="80" placeholder="e.g. Infinix Hot 40 Pro" autocomplete="off"></div>
      <div class="two"><div class="field"><label for="pp">Price (GH₵)</label><input id="pp" name="price" inputmode="decimal" placeholder="0.00" autocomplete="off"></div>
      <div class="field"><label for="pc">Category</label><select id="pc" name="cat">${CATS.map(c => `<option>${c}</option>`).join('')}</select></div></div>
      <div class="two"><div class="field"><label for="ps">Deal price (optional)</label><input id="ps" name="sale" inputmode="decimal" placeholder="Lower than price" autocomplete="off"></div>
      <div class="field"><label for="pk">In stock</label><input id="pk" name="stock" inputmode="numeric" placeholder="e.g. 10" autocomplete="off"></div></div>
      <div class="field"><label for="pd">Description</label><textarea id="pd" name="desc" placeholder="Condition, size, colour, what is in the box"></textarea></div>
      <div class="two"><div class="field"><label for="pw">Warranty (optional)</label><input id="pw" name="warranty" placeholder="e.g. 6 months" autocomplete="off"></div>
      <div class="field"><label for="pv">Delivery (optional)</label><input id="pv" name="delivery" placeholder="e.g. Accra same day" autocomplete="off"></div></div>
      <div class="field"><label for="pi">Product image</label><input id="pi" type="file" accept="image/*"><div class="prev" id="prev"></div></div>
      <p class="err" id="perr" role="alert"></p>
      <button class="btn primary block" type="submit">Add product</button></form></section>
    <section><h2 style="margin-bottom:6px">Your products (${S.products.length})</h2>
    ${S.products.length ? `<ul>${rows}</ul>` : `<div class="empty"><strong>No products yet</strong>Add your first product above. It appears in the shop right away.</div>`}</section>`;
}
function statusPill(o) {
  if (o.status === 'delivered') return `<span class="pill">${o.paid ? 'Delivered · money released' : 'Delivered'}</span>`;
  if (o.status === 'shipped') return '<span class="pill wait">On the way</span>';
  return o.paid ? '<span class="pill wait">Paid · held for you</span>' : '<span class="pill wait">Pay on delivery</span>';
}
function sellerSales() {
  const held = S.orders.filter(o => o.paid && !o.delivered).reduce((a, o) => a + earn(o), 0);
  const cod = S.orders.filter(o => !o.paid && !o.delivered).reduce((a, o) => a + earn(o), 0);
  const orders = [...S.orders].sort((a, b) => b.t - a.t);
  const list = orders.map(o => {
    let act = '';
    if (o.status === 'placed') act = `<button class="btn sm primary" style="margin-top:8px" data-action="ship" data-id="${o.id}">Mark as shipped</button>`;
    else if (o.status === 'shipped' && !o.paid) act = `<button class="btn sm" style="margin-top:8px" data-action="delivered" data-id="${o.id}">Mark as delivered</button>`;
    else if (o.status === 'shipped') act = `<p>Waiting for the buyer to confirm delivery. Your money is released then.</p>`;
    return `<li class="order"><div class="top-row"><strong class="ref">${o.id}</strong><strong>${money(earn(o))}</strong></div>
      <p>${o.items.map(i => `${i.qty} × ${esc(i.name)}`).join(', ')}</p>
      <p>${esc(o.customer.name)} · ${esc(o.customer.phone)} · ${esc(o.customer.addr)}${o.region ? ', ' + esc(o.region) : ''}</p>
      <p>${dateOf(o.t)} · ${esc(o.method)} ${statusPill(o)}</p>${act}</li>`;
  }).join('');
  return `<dl class="sum"><div><dt>Paid out</dt><dd>${money(earnedTotal())}</dd></div><div><dt>Held until delivery</dt><dd>${money(held)}</dd></div>
    <div><dt>Cash on delivery pending</dt><dd>${money(cod)}</dd></div><div><dt>Orders</dt><dd>${S.orders.length}</dd></div></dl>
    ${orders.length ? `<ul>${list}</ul>` : `<div class="empty"><strong>No sales yet</strong>When a customer checks out, the order shows up here. Switch to Shop and place a test order.</div>`}`;
}
function reports() {
  const months = [], now = new Date();
  for (let i = 5; i >= 0; i--) {
    const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({key: m.getFullYear() + '-' + m.getMonth(), label: m.toLocaleString('en-GB', {month: 'short'}), rev: 0, n: 0});
  }
  S.orders.forEach(o => {
    const d = new Date(o.t), k = d.getFullYear() + '-' + d.getMonth(), m = months.find(x => x.key === k);
    if (m) { m.n++; m.rev += earn(o); }
  });
  const cur = months[months.length - 1], max = Math.max(...months.map(m => m.rev), 1);
  const fmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : String(Math.round(n));
  const units = {};
  S.orders.forEach(o => o.items.forEach(i => { units[i.name] = (units[i.name] || 0) + i.qty; }));
  const top = Object.entries(units).sort((a, b) => b[1] - a[1])[0];
  const n = S.orders.length, avg = n ? S.orders.reduce((a, o) => a + earn(o), 0) / n : 0;
  return `<dl class="sum"><div><dt>Sales this month</dt><dd>${money(cur.rev)}</dd></div><div><dt>Orders this month</dt><dd>${cur.n}</dd></div>
    <div><dt>All-time orders</dt><dd>${n}</dd></div><div><dt>Average order</dt><dd>${money(avg)}</dd></div></dl>
    <section class="panel"><h2>Monthly sales</h2>
    ${n ? `<div class="bars" role="img" aria-label="Sales for the last six months">${months.map(m => `<div class="bcol"><em>${m.rev ? fmt(m.rev) : ''}</em><i style="height:${Math.max(2, Math.round(m.rev / max * 130))}px"></i><small>${m.label}</small></div>`).join('')}</div>`
      : `<div class="empty"><strong>No sales yet</strong>Your monthly chart fills in after your first order.</div>`}
    ${top ? `<p class="note">Best seller: ${esc(top[0])} (${top[1]} sold)</p>` : ''}</section>`;
}

/* sheets */
function sheets() {
  if (V.chat) return chatView();
  if (!V.sheet) return '';
  const map = {cart: [cartSheet, 'Your cart'], checkout: [checkoutSheet, 'Checkout'], success: [successSheet, 'Order placed'], offer: [offerSheet, 'Make an offer'], review: [reviewSheet, 'Rate your purchase']};
  const m = map[V.sheet];
  if (!m) return '';
  return `<div class="backdrop"><div class="sheet" role="dialog" aria-modal="true" aria-label="${m[1]}" tabindex="-1">${m[0]()}</div></div>`;
}
function cartSheet() {
  const items = cartItems();
  const head = `<div class="shead"><h2>Your cart</h2><button class="x" data-action="closeSheet" aria-label="Close cart">✕</button></div>`;
  if (!items.length) return head + `<div class="empty"><strong>Your cart is empty</strong>Browse products and tap Add to cart.</div><button class="btn block" style="margin-top:14px" data-action="closeSheet">Keep shopping</button>`;
  return head + items.map(({p, qty}) => `<div class="line">${artSm(p)}
    <div class="grow"><strong>${esc(p.name)}</strong><span class="cat">${money(lineTotal(p, qty))}${dealOf(p) != null ? ' · your accepted offer applied' : ''}</span>
      <div class="qty"><button data-action="dec" data-id="${p.id}" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-action="inc" data-id="${p.id}" aria-label="Increase quantity">+</button></div></div>
    <button class="link" data-action="rm" data-id="${p.id}">Remove</button></div>`).join('')
    + `<div class="total"><span>Subtotal</span><strong>${money(sumItems(items))}</strong></div>
    <p class="hint" style="margin-bottom:12px">Delivery fee is added at checkout.</p>
    <button class="btn primary block" data-action="checkout">Checkout</button>`;
}
function checkoutSheet() {
  const items = checkoutItems(), c = V.co, sub = sumItems(items), fee = feeFor(c.region, sub), total = sub + fee;
  const opt = (id, t, d) => `<button type="button" class="opt" role="radio" aria-checked="${c.method === id}" data-action="method" data-id="${id}"><i class="dot"></i><div><strong>${t}</strong><span>${d}</span></div></button>`;
  let fields = '';
  if (c.method === 'momo') fields = `<div class="sec"><div class="two">
      <div class="field"><label for="net">Network</label><select id="net" data-bind="net">${['MTN', 'Telecel', 'AirtelTigo'].map(n => `<option ${c.net === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <div class="field"><label for="momo">MoMo number</label><input id="momo" data-bind="momo" inputmode="tel" placeholder="0244 123 456" value="${esc(c.momo)}"></div></div>
      <p class="hint">You will get a prompt on your phone to approve the payment.</p></div>`;
  if (c.method === 'card') fields = `<div class="sec">
      <div class="field"><label for="card">Card number</label><input id="card" data-bind="card" inputmode="numeric" placeholder="0000 0000 0000 0000" autocomplete="cc-number" value="${esc(c.card)}"></div>
      <div class="two"><div class="field"><label for="exp">Expiry (MM/YY)</label><input id="exp" data-bind="exp" inputmode="numeric" placeholder="12/30" autocomplete="cc-exp" value="${esc(c.exp)}"></div>
      <div class="field"><label for="cvv">CVV</label><input id="cvv" data-bind="cvv" inputmode="numeric" placeholder="123" autocomplete="cc-csc" value="${esc(c.cvv)}"></div></div>
      <button type="button" class="link" data-action="testcard">Fill in the test card</button></div>`;
  if (c.method === 'cod') fields = `<p class="hint sec">Pay the rider in cash when your order arrives.</p>`;
  const btnText = V.busy ? 'Processing…' : c.method === 'cod' ? `Place order · ${money(total)}` : `Pay ${money(total)}`;
  return `<div class="shead"><h2>Checkout</h2><button class="x" data-action="closeSheet" aria-label="Close checkout">✕</button></div>
    ${items.map(({p, qty}) => `<div class="line">${artSm(p)}<div class="grow"><strong>${esc(p.name)}</strong><span class="cat">${qty} × ${money(baseOf(p))}${dealOf(p) != null ? ' · accepted offer applied' : ''}</span></div><strong>${money(lineTotal(p, qty))}</strong></div>`).join('')}
    <form data-form="checkout" novalidate>
      <div class="sec"><h3>Delivery details</h3>
        <div class="field"><label for="cn">Full name</label><input id="cn" data-bind="name" autocomplete="name" value="${esc(c.name)}"></div>
        <div class="field"><label for="cp">Phone number</label><input id="cp" data-bind="phone" inputmode="tel" autocomplete="tel" placeholder="0244 123 456" value="${esc(c.phone)}"></div>
        <div class="two"><div class="field"><label for="cr">Region</label><select id="cr" data-bind="region">${Object.keys(REGIONS).map(r => `<option ${c.region === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
        <div class="field"><label for="ca">Area and landmark</label><input id="ca" data-bind="addr" autocomplete="street-address" placeholder="East Legon, near A&amp;C Mall" value="${esc(c.addr)}"></div></div></div>
      <div class="rows"><div><span>Subtotal</span><span>${money(sub)}</span></div><div><span>Delivery to ${esc(c.region)}</span><span>${fee ? money(fee) : 'Free'}</span></div></div>
      <div class="total"><span>Total</span><strong>${money(total)}</strong></div>
      <div class="sec"><h3>Payment method</h3>
        <div class="opts" role="radiogroup" aria-label="Payment method">
          ${opt('momo', 'Mobile Money', 'MTN, Telecel or AirtelTigo')}${opt('card', 'Card', 'Visa or Mastercard')}${opt('cod', 'Cash on delivery', 'Pay when it arrives')}</div>${fields}
        ${c.method !== 'cod' ? `<div class="protect">${ICON.shield}<span>Buyer protection: we hold your payment until you confirm your order arrived.</span></div>` : ''}</div>
      <p class="err" role="alert">${esc(V.err)}</p>
      ${V.busy ? `<div class="step"><i class="spin"></i><span>${esc(V.step)}</span></div>` : ''}
      <button class="btn primary block" type="submit" ${V.busy ? 'disabled' : ''}>${btnText}</button>
      <p class="note">Test mode. No real money moves in this version.</p></form>`;
}
function successSheet() {
  const o = V.last;
  if (!o) return '';
  return `<div class="shead"><span></span><button class="x" data-action="closeSheet" aria-label="Close">✕</button></div>
    <div class="ok">${ICON.check}</div><h2>Order placed</h2>
    <p class="sub">Order <span class="ref">${o.id}</span> · ${money(o.total)}</p>
    <p class="sub">${o.paid ? `Paid with ${esc(o.method)}. We hold your money until you confirm delivery.` : 'Pay the rider in cash on delivery.'} ${SELLER} will deliver to ${esc(o.customer.addr)}, ${esc(o.region)}.</p>
    <div class="stack" style="margin-top:20px"><button class="btn primary block" data-action="orders">Track your order</button>
    <button class="btn block ghost" data-action="closeSheet">Keep shopping</button></div>`;
}
function offerSheet() {
  const p = byId(V.offerPid);
  if (!p) return '';
  const b = baseOf(p);
  const presets = [95, 90, 85].map(pc => Math.round(b * pc / 100));
  return `<div class="shead"><h2>Make an offer</h2><button class="x" data-action="closeSheet" aria-label="Close">✕</button></div>
    <div class="line">${artSm(p)}<div class="grow"><strong>${esc(p.name)}</strong><span class="cat">Asking price ${money(b)}</span></div></div>
    <form data-form="offer" novalidate style="margin-top:14px">
      <div class="presets" aria-label="Quick offers">${presets.map(v => `<button type="button" data-action="preset" data-id="${v}">${money(v)}</button>`).join('')}</div>
      <div class="field"><label for="of">Your offer (GH₵)</label><input id="of" inputmode="decimal" placeholder="e.g. ${presets[1]}" autocomplete="off"></div>
      <p class="err" role="alert">${esc(V.err)}</p>
      <button class="btn primary block" type="submit">Send offer</button>
      <p class="note">The seller can accept or decline. If they accept, the price applies to one item when you buy.</p></form>`;
}
function reviewSheet() {
  const r = V.rv;
  if (!r) return '';
  const p = byId(r.pid);
  return `<div class="shead"><h2>Rate your purchase</h2><button class="x" data-action="closeSheet" aria-label="Close">✕</button></div>
    <p><strong>${p ? esc(p.name) : ''}</strong></p>
    <div class="starrow" role="radiogroup" aria-label="Rating">${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="${r.rating === n}" class="${n <= r.rating ? 'on' : ''}" data-action="star" data-id="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">★</button>`).join('')}</div>
    <form data-form="review" novalidate>
      <div class="field"><label for="rt">Your review (optional)</label><textarea id="rt" data-rv="text" placeholder="How was the item and the delivery?">${esc(r.text)}</textarea></div>
      <p class="err" role="alert">${esc(V.err)}</p>
      <button class="btn primary block" type="submit">Post review</button></form>`;
}

function chatView() {
  const {pid, as} = V.chat, p = byId(pid);
  if (!p) return '';
  const msgs = S.chats[pid] || [];
  const quick = as === 'customer'
    ? ['Is this still available?', 'Can you deliver to Kumasi?', 'What sizes or colours do you have?']
    : ['Yes, it is available.', 'We deliver nationwide.', 'Thank you for your interest.'];
  const bubble = (m, i) => {
    const me = m.from === as;
    if (m.offer) {
      const st = m.offer.status;
      const label = st === 'accepted' ? 'Accepted' : st === 'declined' ? 'Declined' : (as === 'seller' ? 'Waiting for your reply' : 'Waiting for the seller');
      return `<div class="bub ${me ? 'me' : 'them'} offer"><strong>Offer: ${money(m.offer.amount)}</strong><span class="ostat ${st}">${label}</span>
        ${as === 'seller' && st === 'pending' ? `<div class="orow"><button class="btn sm" data-action="offerno" data-id="${i}">Decline</button><button class="btn sm primary" data-action="offeryes" data-id="${i}">Accept</button></div>` : ''}<small>${timeOf(m.t)}</small></div>`;
    }
    return `<div class="bub ${me ? 'me' : 'them'}">${esc(m.text)}<small>${timeOf(m.t)}</small></div>`;
  };
  return `<section class="chat" role="dialog" aria-modal="true" aria-label="Chat about ${esc(p.name)}">
    <div class="chat-head"><button class="x" data-action="closechat" aria-label="Back">${ICON.back}</button>${artSm(p)}
      <div class="grow"><strong>${esc(p.name)}</strong><span>${as === 'customer' ? SELLER : 'Customer'} · ${money(baseOf(p))}</span></div></div>
    <div class="msgs" id="msgs">${msgs.length ? msgs.map(bubble).join('')
      : `<div class="chat-empty">${as === 'customer' ? 'Ask the seller about price, delivery or size. Tap a suggestion below or write your own.' : 'No messages yet.'}</div>`}</div>
    <div class="quick">${quick.map(q => `<button data-action="quick" data-text="${esc(q)}">${esc(q)}</button>`).join('')}</div>
    <form class="compose" data-form="chat" autocomplete="off"><input id="cm" name="text" placeholder="Write a message" aria-label="Message"><button type="submit" aria-label="Send message">${ICON.send}</button></form></section>`;
}

/* ---------- render ---------- */
function installBanner() {
  if (V.installDismissed || isStandalone()) return '';
  return `<div class="instbar"><span>Install MarketPlace for a full, app-like experience</span>
    <div class="instbtns"><button class="btn sm primary" data-action="install">Install</button>
    <button class="x" data-action="dismissInstall" aria-label="Dismiss">✕</button></div></div>`;
}
function render() {
  let h = header() + installBanner();
  if (!S.userId) h += authView();
  else if (!S.role) h += gate();
  else if (S.role === 'customer') h += V.screen === 'detail' ? detail() : V.screen === 'inbox' ? inbox() : V.screen === 'orders' ? ordersView() : home();
  else h += seller();
  h += sheets();
  $('#app').innerHTML = h;
  document.body.style.overflow = (V.sheet || V.chat) ? 'hidden' : '';
  const m = $('#msgs'); if (m) m.scrollTop = m.scrollHeight;
  tickCd();
}
function tickCd() {
  const el = $('#cd'); if (!el) return;
  const n = new Date(), e = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1);
  const s = Math.max(0, Math.floor((e - n) / 1000)), p = x => String(x).padStart(2, '0');
  el.textContent = p(Math.floor(s / 3600)) + ':' + p(Math.floor(s % 3600 / 60)) + ':' + p(s % 60);
}
setInterval(tickCd, 1000);

/* ---------- actions ---------- */
function openSheet(name) { V.sheet = name; V.err = ''; render(); const s = $('.sheet'); if (s) s.focus({preventScroll: true}); }
function openChat(pid, as) {
  V.chat = {pid, as}; V.sheet = null;
  if (as === 'seller') delete S.unreadS[pid]; else delete S.unreadC[pid];
  save(); render();
}
function addToCart(id) {
  const p = byId(id); if (!p) return;
  if (!inStock(p)) { toast('Sold out'); return; }
  const e = S.cart.find(c => c.id === id);
  if (e && p.stock !== undefined && e.qty >= p.stock) { toast(`Only ${p.stock} in stock`); return; }
  if (e) e.qty++; else S.cart.push({id, qty: 1});
  save(); render(); toast('Added to cart');
}
function pushMsg(pid, from, text, extra) {
  const m = Object.assign({from, text, t: Date.now()}, extra || {});
  (S.chats[pid] = S.chats[pid] || []).push(m);
  const map = from === 'customer' ? S.unreadS : S.unreadC;
  map[pid] = (map[pid] || 0) + 1;
}

const ACTIONS = {
  home() { if (!S.role) return; V.screen = 'home'; V.sheet = null; V.chat = null; render(); window.scrollTo(0, 0); },
  role(id) { S.role = id; V.screen = 'home'; V.sheet = null; V.chat = null; save(); render(); window.scrollTo(0, 0); },
  authmode(id) { V.auth.mode = id; V.authErr = ''; render(); },
  logout() { S.userId = null; V.screen = 'home'; V.sheet = null; V.chat = null; save(); render(); window.scrollTo(0, 0); toast('Signed out'); },
  install() {
    if (window.__deferredPrompt) {
      window.__deferredPrompt.prompt();
      window.__deferredPrompt.userChoice.finally(() => { window.__deferredPrompt = null; V.installDismissed = true; render(); });
    } else {
      toast('iPhone: tap Share, then "Add to Home Screen". Android Chrome: tap ⋮, then "Install app".');
    }
  },
  dismissInstall() { V.installDismissed = true; render(); },
  cat(id) { V.cat = id; render(); },
  open(id) { V.pid = id; V.screen = 'detail'; render(); window.scrollTo(0, 0); },
  add(id) { addToCart(id); },
  buy(id) { const p = byId(id); if (!p || !inStock(p)) return; V.buy = id; V.busy = false; openSheet('checkout'); },
  chat(id) { V.sheet = null; openChat(id, S.role === 'seller' ? 'seller' : 'customer'); },
  cart() { openSheet('cart'); },
  closeSheet() { V.sheet = null; V.busy = false; render(); },
  inc(id) { const c = S.cart.find(x => x.id === id), p = byId(id); if (c && p && (p.stock === undefined || c.qty < p.stock)) c.qty++; else toast('No more in stock'); save(); render(); },
  dec(id) { const c = S.cart.find(x => x.id === id); if (c) { c.qty--; if (c.qty <= 0) S.cart = S.cart.filter(x => x.id !== id); } save(); render(); },
  rm(id) { S.cart = S.cart.filter(x => x.id !== id); save(); render(); },
  checkout() { if (!cartItems().length) return; V.buy = null; V.busy = false; openSheet('checkout'); },
  method(id) { V.co.method = id; V.err = ''; render(); },
  testcard() { V.co.card = '4084 0840 8408 4081'; V.co.exp = '12/30'; V.co.cvv = '408'; render(); },
  inbox() { V.screen = 'inbox'; render(); window.scrollTo(0, 0); },
  orders() { V.sheet = null; V.screen = 'orders'; render(); window.scrollTo(0, 0); },
  thread(id) { openChat(id, S.role === 'seller' ? 'seller' : 'customer'); },
  closechat() { V.chat = null; render(); },
  quick(id, el) { const i = $('#cm'); if (i) { i.value = el.dataset.text; i.focus(); } },
  wish(id) {
    const i = S.wish.indexOf(id);
    if (i >= 0) S.wish.splice(i, 1); else S.wish.push(id);
    save(); render(); toast(i >= 0 ? 'Removed from saved' : 'Saved for later');
  },
  offer(id) { const p = byId(id); if (!p || !inStock(p)) return; V.offerPid = id; openSheet('offer'); },
  preset(id) { const i = $('#of'); if (i) { i.value = id; i.focus(); } },
  offeryes(i) {
    const pid = V.chat.pid, m = S.chats[pid][+i];
    if (!m || !m.offer || m.offer.status !== 'pending') return;
    m.offer.status = 'accepted'; S.deals[pid] = m.offer.amount;
    pushMsg(pid, 'seller', `Offer accepted at ${money(m.offer.amount)}. Buy now to lock in that price.`);
    save(); render(); toast('Offer accepted');
  },
  offerno(i) {
    const pid = V.chat.pid, m = S.chats[pid][+i];
    if (!m || !m.offer || m.offer.status !== 'pending') return;
    m.offer.status = 'declined';
    pushMsg(pid, 'seller', 'Sorry, I cannot go that low. Try a higher offer.');
    save(); render(); toast('Offer declined');
  },
  ship(id) { const o = S.orders.find(x => x.id === id); if (o) o.status = 'shipped'; save(); render(); toast('Marked as shipped'); },
  delivered(id) { const o = S.orders.find(x => x.id === id); if (o) { o.status = 'delivered'; o.delivered = true; o.paid = true; } save(); render(); toast('Marked as delivered'); },
  confirm(id) {
    const o = S.orders.find(x => x.id === id);
    if (o) { o.status = 'delivered'; o.delivered = true; }
    save(); render(); toast(o && o.paid ? 'Delivery confirmed. The seller has been paid.' : 'Delivery confirmed');
  },
  rate(id) {
    const [oid, pid] = id.split('|');
    V.rv = {oid, pid, rating: 0, text: ''}; openSheet('review');
  },
  star(id) { V.rv.rating = +id; V.err = ''; render(); },
  tab(id) { V.tab = id; V.confirmDel = null; render(); },
  del(id) { V.confirmDel = id; render(); },
  delno() { V.confirmDel = null; render(); },
  delyes(id) {
    S.products = S.products.filter(p => p.id !== id);
    S.cart = S.cart.filter(c => c.id !== id);
    S.wish = S.wish.filter(w => w !== id);
    delete S.chats[id]; delete S.unreadS[id]; delete S.unreadC[id]; delete S.deals[id];
    V.confirmDel = null; save(); render(); toast('Product deleted');
  },
  restock(id) { const p = byId(id); if (p) p.stock = (p.stock || 0) + 5; save(); render(); toast('Stock updated'); }
};

function addProduct(f) {
  const name = f.elements.name.value.trim();
  const num = v => parseFloat(String(v).replace(/,/g, ''));
  const price = num(f.elements.price.value);
  const saleRaw = f.elements.sale.value.trim(), sale = saleRaw ? num(saleRaw) : 0;
  const stockRaw = f.elements.stock.value.trim(), stock = parseInt(stockRaw, 10);
  const err = $('#perr');
  if (!name) { err.textContent = 'Enter a product name.'; return; }
  if (!(price > 0)) { err.textContent = 'Enter a price greater than 0.'; return; }
  if (saleRaw && !(sale > 0 && sale < price)) { err.textContent = 'The deal price must be lower than the regular price.'; return; }
  if (!(stock >= 0)) { err.textContent = 'Enter how many you have in stock.'; return; }
  const cat = f.elements.cat.value;
  S.products.unshift({
    id: 'p' + uid(), name, price: Math.round(price * 100) / 100, cat, emoji: CAT[cat].e,
    desc: f.elements.desc.value.trim(),
    warranty: f.elements.warranty.value.trim() || D_WARR,
    delivery: f.elements.delivery.value.trim() || D_DEL,
    img: V.newImg, stock, sale: saleRaw ? Math.round(sale * 100) / 100 : 0
  });
  V.newImg = null; save(); render(); toast('Product added');
}
function sendChat(f) {
  const text = f.elements.text.value.trim();
  if (!text || !V.chat) return;
  pushMsg(V.chat.pid, V.chat.as, text);
  save(); render();
  const i = $('#cm'); if (i) i.focus();
}
function sendOffer() {
  const p = byId(V.offerPid); if (!p) return;
  const b = baseOf(p), a = parseFloat(String($('#of').value).replace(/,/g, ''));
  const pending = (S.chats[p.id] || []).some(m => m.offer && m.offer.status === 'pending');
  if (pending) { V.err = 'You already have an offer waiting for the seller.'; render(); return; }
  if (!(a > 0)) { V.err = 'Enter the amount you want to offer.'; render(); return; }
  if (a >= b) { V.err = `Your offer must be lower than the asking price of ${money(b)}. You can just buy it.`; render(); return; }
  if (a < b * 0.5) { V.err = `That is too low. Offers start at ${money(Math.ceil(b * 0.5))}.`; render(); return; }
  const amt = Math.round(a * 100) / 100;
  pushMsg(p.id, 'customer', `Offer: ${money(amt)}`, {offer: {amount: amt, status: 'pending'}});
  V.err = ''; save(); openChat(p.id, 'customer'); toast('Offer sent');
}
function submitReview() {
  const r = V.rv; if (!r) return;
  if (!r.rating) { V.err = 'Tap a star to rate.'; render(); return; }
  const o = S.orders.find(x => x.id === r.oid), item = o && o.items.find(i => i.id === r.pid);
  const parts = (o ? o.customer.name : 'Customer').trim().split(/\s+/);
  const name = parts[0] + (parts[1] ? ' ' + parts[1][0].toUpperCase() + '.' : '');
  S.reviews.push({pid: r.pid, rating: r.rating, text: r.text.trim(), name, t: Date.now()});
  if (item) item.reviewed = true;
  V.rv = null; V.sheet = null; V.err = ''; save(); render(); toast('Review posted');
}

function submitAuth() {
  const a = V.auth, phone = a.phone.trim().replace(/\s/g, '');
  if (!/^0\d{9}$/.test(phone)) { V.authErr = 'Enter a 10-digit phone number starting with 0, like 0244123456.'; render(); return; }
  if (a.mode === 'signup') {
    if (!a.name.trim()) { V.authErr = 'Enter your full name.'; render(); return; }
    if (S.accounts.some(x => x.phone === phone)) { V.authErr = 'An account with this number already exists. Sign in instead.'; render(); return; }
    if (a.password.length < 4) { V.authErr = 'Password must be at least 4 characters.'; render(); return; }
    if (a.password !== a.confirm) { V.authErr = 'Passwords do not match.'; render(); return; }
    const acc = {id: 'u' + uid(), name: a.name.trim(), phone, password: a.password};
    S.accounts.push(acc); S.userId = acc.id;
  } else {
    const acc = S.accounts.find(x => x.phone === phone);
    if (!acc || acc.password !== a.password) { V.authErr = 'Phone number or password is incorrect.'; render(); return; }
    S.userId = acc.id;
  }
  const name = accName().split(' ')[0], wasSignup = a.mode === 'signup';
  V.auth = {mode: 'signin', name: '', phone: '', password: '', confirm: ''}; V.authErr = '';
  save(); render(); window.scrollTo(0, 0);
  toast(`Welcome${wasSignup ? '' : ' back'}, ${name}!`);
}
function validate() {
  const c = V.co, num = s => s.replace(/\s/g, '');
  if (!c.name.trim()) return 'Enter your full name.';
  if (!/^0\d{9}$/.test(num(c.phone))) return 'Enter a 10-digit phone number starting with 0, like 0244123456.';
  if (!c.addr.trim()) return 'Enter your delivery area and a landmark.';
  if (c.method === 'momo' && !/^0\d{9}$/.test(num(c.momo))) return 'Enter the 10-digit MoMo number to charge.';
  if (c.method === 'card') {
    if (!/^\d{16}$/.test(num(c.card))) return 'Card number must be 16 digits.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(c.exp.trim())) return 'Enter the expiry as MM/YY.';
    if (!/^\d{3}$/.test(c.cvv.trim())) return 'CVV is 3 digits.';
  }
  return '';
}
async function pay() {
  if (V.busy) return;
  const items = checkoutItems();
  if (!items.length) { V.sheet = null; render(); return; }
  const c = V.co, msg = validate();
  if (msg) { V.err = msg; render(); return; }
  const short = items.find(x => x.p.stock !== undefined && x.qty > x.p.stock);
  if (short) { V.err = `Only ${short.p.stock} of ${short.p.name} left. Update your cart.`; render(); return; }
  V.err = ''; V.busy = true;
  V.step = c.method === 'momo' ? `Approve the payment prompt on ${c.momo.trim()}…` : c.method === 'card' ? 'Confirming with your bank…' : 'Placing your order…';
  render();
  await sleep(c.method === 'momo' ? 2200 : 1300);
  const sub = sumItems(items), fee = feeFor(c.region, sub);
  const order = {
    id: 'MH-' + uid().slice(0, 6).toUpperCase(), t: Date.now(),
    items: items.map(({p, qty}) => ({id: p.id, name: p.name, price: baseOf(p), qty})),
    subtotal: sub, fee, total: sub + fee, region: c.region,
    method: c.method === 'momo' ? `MoMo (${c.net})` : c.method === 'card' ? 'Card' : 'Cash on delivery',
    paid: c.method !== 'cod', delivered: false, status: 'placed',
    customer: {name: c.name.trim(), phone: c.phone.trim(), addr: c.addr.trim()}
  };
  items.forEach(({p, qty}) => { if (p.stock !== undefined) p.stock = Math.max(0, p.stock - qty); delete S.deals[p.id]; });
  S.orders.push(order);
  if (!V.buy) S.cart = [];
  V.last = order; V.busy = false; V.buy = null;
  V.co = Object.assign(blankCo(), {name: c.name, phone: c.phone, addr: c.addr, region: c.region});
  save(); V.sheet = 'success'; render();
  const s = $('.sheet'); if (s) s.focus({preventScroll: true});
}

function fileToDataUrl(file, max = 640) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = rej;
    fr.onload = () => {
      const im = new Image();
      im.onerror = rej;
      im.onload = () => {
        const k = Math.min(1, max / Math.max(im.width, im.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
        cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
        res(cv.toDataURL('image/jpeg', 0.82));
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('backdrop')) { ACTIONS.closeSheet(); return; }
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const fn = ACTIONS[el.dataset.action];
  if (fn) fn(el.dataset.id, el, e);
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') { V.q = t.value; updateGrid(); return; }
  if (t.dataset && t.dataset.bind) V.co[t.dataset.bind] = t.value;
  if (t.dataset && t.dataset.rv && V.rv) V.rv[t.dataset.rv] = t.value;
  if (t.dataset && t.dataset.auth) V.auth[t.dataset.auth] = t.value;
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'sort') { V.sort = t.value; updateGrid(); return; }
  if (t.dataset && t.dataset.bind) { V.co[t.dataset.bind] = t.value; if (t.dataset.bind === 'region') render(); }
  if (t.id === 'pi' && t.files && t.files[0]) {
    fileToDataUrl(t.files[0]).then(u => {
      V.newImg = u; const pv = $('#prev');
      if (pv) pv.innerHTML = `<img src="${u}" alt="Selected product image">`;
    }).catch(() => { const er = $('#perr'); if (er) er.textContent = 'That image could not be read. Try a JPG or PNG.'; });
  }
});
document.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, k = f.dataset.form;
  if (k === 'product') addProduct(f);
  else if (k === 'chat') sendChat(f);
  else if (k === 'checkout') pay();
  else if (k === 'offer') sendOffer();
  else if (k === 'review') submitReview();
  else if (k === 'auth') submitAuth();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (V.chat) ACTIONS.closechat(); else if (V.sheet) ACTIONS.closeSheet(); }
});
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); window.__deferredPrompt = e; render(); });
window.addEventListener('appinstalled', () => { window.__deferredPrompt = null; V.installDismissed = true; render(); });

render();
