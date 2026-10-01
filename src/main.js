import './style.css'

const STORAGE_KEY = 'road-rush-save-v1'

const WORLDS = [
  {
    id: 1,
    name: 'World 1 · Green Valleys',
    unlocked: true,
    levels: [
      { id: 1, name: 'Sunny Valley', unlocked: true, boss: false },
      { id: 2, name: 'Sunset Hills', unlocked: false, boss: false },
      { id: 3, name: 'Moonlight Run', unlocked: false, boss: false },
      { id: 4, name: 'Snowy Peaks', unlocked: false, boss: false },
      { id: 5, name: 'Desert Dunes', unlocked: false, boss: true },
    ],
  },
  {
    id: 2,
    name: 'World 2 · Frost & Fire',
    unlocked: false,
    levels: [
      { id: 6, name: 'Icy Pass', unlocked: false },
      { id: 7, name: 'Ember Trail', unlocked: false },
      { id: 8, name: 'Glacier Gate', unlocked: false },
      { id: 9, name: 'Volcano Road', unlocked: false },
      { id: 10, name: 'Frostfire Peak', unlocked: false, boss: true },
    ],
  },
  {
    id: 3,
    name: 'World 3 · Mystic Realms',
    unlocked: false,
    levels: [
      { id: 11, name: 'Crystal Cove', unlocked: false },
      { id: 12, name: 'Fairy Forest', unlocked: false },
      { id: 13, name: 'Shadow Bridge', unlocked: false },
      { id: 14, name: 'Starlit Mesa', unlocked: false },
      { id: 15, name: 'Enchanted Gate', unlocked: false, boss: true },
    ],
  },
  {
    id: 4,
    name: 'World 4 · Ocean Shores',
    unlocked: false,
    levels: [
      { id: 16, name: 'Sandy Stretch', unlocked: false },
      { id: 17, name: 'Pier Dash', unlocked: false },
      { id: 18, name: 'Tide Loop', unlocked: false },
      { id: 19, name: 'Coral Curve', unlocked: false },
      { id: 20, name: 'Lighthouse Boss', unlocked: false, boss: true },
    ],
  },
  {
    id: 5,
    name: 'World 5 · Mountain High',
    unlocked: false,
    levels: [
      { id: 21, name: 'Cliffside', unlocked: false },
      { id: 22, name: 'Tunnel Run', unlocked: false },
      { id: 23, name: 'Alpine Air', unlocked: false },
      { id: 24, name: 'Windy Ridge', unlocked: false },
      { id: 25, name: 'Summit Showdown', unlocked: false, boss: true },
    ],
  },
  {
    id: 6,
    name: 'World 6 · Neon Nights',
    unlocked: false,
    levels: [
      { id: 26, name: 'City Lights', unlocked: false },
      { id: 27, name: 'Highway Hum', unlocked: false },
      { id: 28, name: 'Billboard Blitz', unlocked: false },
      { id: 29, name: 'Midnight Mile', unlocked: false },
      { id: 30, name: 'Neon Boss', unlocked: false, boss: true },
    ],
  },
  {
    id: 7,
    name: 'World 7 · Jungle Jam',
    unlocked: false,
    levels: [
      { id: 31, name: 'Canopy Cruise', unlocked: false },
      { id: 32, name: 'Vine Valley', unlocked: false },
      { id: 33, name: 'River Raft Road', unlocked: false },
      { id: 34, name: 'Temple Trail', unlocked: false },
      { id: 35, name: 'Idol Boss', unlocked: false, boss: true },
    ],
  },
  {
    id: 8,
    name: 'World 8 · Candy Canyon',
    unlocked: false,
    levels: [
      { id: 36, name: 'Sugar Slope', unlocked: false },
      { id: 37, name: 'Gummy Gulch', unlocked: false },
      { id: 38, name: 'Chocolate Chip', unlocked: false },
      { id: 39, name: 'Lollipop Loop', unlocked: false },
      { id: 40, name: 'Candy King', unlocked: false, boss: true },
    ],
  },
  {
    id: 9,
    name: 'World 9 · Space Sprint',
    unlocked: false,
    levels: [
      { id: 41, name: 'Moon Base', unlocked: false },
      { id: 42, name: 'Asteroid Ave', unlocked: false },
      { id: 43, name: 'Comet Curve', unlocked: false },
      { id: 44, name: 'Orbit Oval', unlocked: false },
      { id: 45, name: 'Star Boss', unlocked: false, boss: true },
    ],
  },
  {
    id: 10,
    name: 'World 10 · Grandma’s Gate',
    unlocked: false,
    levels: [
      { id: 46, name: 'Home Stretch', unlocked: false },
      { id: 47, name: 'Memory Lane', unlocked: false },
      { id: 48, name: 'Porch Parade', unlocked: false },
      { id: 49, name: 'Garden Dash', unlocked: false },
      { id: 50, name: 'Grandma’s House', unlocked: false, boss: true },
    ],
  },
]

const SHOP_ITEMS = [
  { id: 'heart', name: 'Extra Heart', desc: '+1 max heart (up to 5)', price: 50, emoji: '❤️' },
  { id: 'boost', name: 'Speed Boost Pack', desc: 'Start with a boost next run', price: 30, emoji: '⚡' },
  { id: 'magnet', name: 'Coin Magnet', desc: 'Pull coins closer for one run', price: 40, emoji: '🧲' },
  { id: 'paint', name: 'Blue Paint Job', desc: 'Cosmetic — cool blue car', price: 75, emoji: '🔵' },
]

function defaultState() {
  return {
    level: 1,
    hearts: 3,
    maxHearts: 3,
    score: 0,
    distance: 0,
    coins: 25,
    carLabel: 'Red Roadster',
    carColor: '#e6392e',
    rebirths: 0,
    owned: {},
    nextBoost: false,
    nextMagnet: false,
    unlockedLevels: [1],
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

function saveState(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

let state = loadState()
let currentModal = null
let game = null

const app = document.getElementById('app')

function heartsDisplay(n) {
  return '❤️'.repeat(Math.max(0, n)) + '🖤'.repeat(Math.max(0, (state.maxHearts || 3) - n))
}

function render() {
  app.innerHTML = `
    <div class="scene" id="scene">
      <div class="hills"><div class="h1"></div><div class="h2"></div><div class="h3"></div></div>
      <div class="road-strip"></div>
      <div class="lobby-car" id="lobby-car">🚗</div>

      <div class="screen active" id="lobby-screen">
        <div class="lobby-wrap">
          <div class="hud-bar">
            <span class="stat">Lv ${state.level}</span>
            <span class="stat hearts">${heartsDisplay(state.hearts)}</span>
            <span class="stat">⭐ ${state.score}</span>
            <span class="stat">🛣️ ${Math.floor(state.distance)} m</span>
            <span class="beep">Beep beep!</span>
            <span class="car-label">${escapeHtml(state.carLabel)}</span>
          </div>

          <div class="panel">
            <h1>Road Rush</h1>
            <p class="tagline">
              Drive across valleys &amp; worlds toward Grandma’s house.
              Dodge obstacles, race bosses, grab coins and boosts!
            </p>
            <div class="btn-row">
              <button class="btn btn-start" id="btn-start" type="button">Start the trip!</button>
              <button class="btn btn-shop" id="btn-shop" type="button">Shop</button>
              <button class="btn btn-rebirth" id="btn-rebirth" type="button">Rebirth</button>
              <button class="btn btn-help" id="btn-howto" type="button">How to play</button>
            </div>
            <div class="worlds" id="worlds"></div>
          </div>
        </div>
      </div>

      <div class="screen" id="game-screen">
        <div class="game-hud">
          <span class="chip" id="g-score">⭐ 0</span>
          <span class="chip" id="g-coins">🪙 0</span>
          <span class="chip" id="g-dist">🛣️ 0 m</span>
          <span class="chip" id="g-hearts">❤️❤️❤️</span>
          <span class="chip quit" id="g-quit">Quit</span>
        </div>
        <canvas id="game-canvas"></canvas>
        <div class="touch-controls" id="touch-controls">
          <button class="pedal" id="pedal-go" type="button">GO</button>
          <button class="pedal jump" id="pedal-jump" type="button">JUMP</button>
        </div>
        <div class="overlay-msg" id="game-over">
          <div class="box">
            <h2 id="end-title">Trip over!</h2>
            <p id="end-msg"></p>
            <button class="btn btn-start" id="btn-again" type="button">Try again</button>
            <button class="btn btn-back" id="btn-lobby" type="button">Back to lobby</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" id="modal-overlay">
        <div class="modal" id="modal-body"></div>
      </div>
    </div>
  `

  renderWorlds()
  bindLobby()
  updateLobbyCarColor()
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c])
}

function updateLobbyCarColor() {
  const el = document.getElementById('lobby-car')
  if (!el) return
  if (state.carColor === '#3a7ec8') {
    el.textContent = '🚙'
  } else {
    el.textContent = '🚗'
  }
}

function isLevelUnlocked(levelId) {
  return state.unlockedLevels.includes(levelId) || levelId === 1
}

function renderWorlds() {
  const root = document.getElementById('worlds')
  if (!root) return
  root.innerHTML = WORLDS.map((w) => {
    const locked = !w.unlocked && w.id !== 1
    return `
      <div class="world ${locked ? 'locked' : ''}">
        <div class="world-title">
          ${escapeHtml(w.name)}
          ${locked ? '<span class="lock">🔒 Locked</span>' : ''}
        </div>
        <div class="levels">
          ${w.levels.map((lv) => {
            const open = !locked && isLevelUnlocked(lv.id)
            const crown = lv.boss ? '<span class="crown">👑</span>' : ''
            return `
              <button class="level-btn ${lv.boss ? 'boss' : ''}"
                type="button"
                data-level="${lv.id}"
                data-name="${escapeHtml(lv.name)}"
                ${open ? '' : 'disabled'}>
                ${lv.id}. ${escapeHtml(lv.name)} ${crown}
              </button>`
          }).join('')}
        </div>
      </div>`
  }).join('')

  root.querySelectorAll('.level-btn:not(:disabled)').forEach((btn) => {
    btn.addEventListener('click', () => {
      startGame(Number(btn.dataset.level), btn.dataset.name)
    })
  })
}

function bindLobby() {
  document.getElementById('btn-start')?.addEventListener('click', () => {
    startGame(1, 'Sunny Valley')
  })
  document.getElementById('btn-shop')?.addEventListener('click', openShop)
  document.getElementById('btn-rebirth')?.addEventListener('click', openRebirth)
  document.getElementById('btn-howto')?.addEventListener('click', openHowTo)

  const overlay = document.getElementById('modal-overlay')
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal()
  })
}

function openModal(html) {
  const overlay = document.getElementById('modal-overlay')
  const body = document.getElementById('modal-body')
  body.innerHTML = html
  overlay.classList.add('open')
  currentModal = true
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open')
  currentModal = null
}

function openHowTo() {
  openModal(`
    <h2>How to play</h2>
    <p>Hold the gas, jump obstacles, collect coins, and race toward Grandma’s house!</p>
    <ul>
      <li><strong>Hold →</strong> (Right Arrow) to drive</li>
      <li><strong>Space</strong> or <strong>↑</strong> to jump</li>
      <li><strong>←</strong> (Left Arrow) to back up</li>
      <li><strong>Touch:</strong> hold the <em>GO</em> pedal, tap <em>JUMP</em></li>
    </ul>
    <p>Grab 🪙 coins and ⚡ boosts. Avoid rocks, cones, and puddles. Reach the finish flag to win the level!</p>
    <div style="text-align:center">
      <button class="btn btn-back" type="button" id="modal-close">Got it!</button>
    </div>
  `)
  document.getElementById('modal-close')?.addEventListener('click', closeModal)
}

function openShop() {
  openModal(`
    <h2>Shop</h2>
    <p class="coins-bal">Your coins: 🪙 ${state.coins}</p>
    <div class="shop-grid">
      ${SHOP_ITEMS.map((item) => {
        const owned = !!state.owned[item.id]
        const canBuy = state.coins >= item.price && !owned
        let label = owned ? 'Owned' : `Buy · ${item.price}`
        if (item.id === 'heart' && state.maxHearts >= 5) {
          label = 'Maxed'
        }
        const disabled = owned || state.coins < item.price || (item.id === 'heart' && state.maxHearts >= 5)
        return `
          <div class="shop-item">
            <div class="info">
              <div class="name">${item.emoji} ${escapeHtml(item.name)}</div>
              <div class="desc">${escapeHtml(item.desc)}</div>
            </div>
            <button class="btn btn-shop" type="button" data-buy="${item.id}" ${disabled ? 'disabled' : ''}>
              ${label}
            </button>
          </div>`
      }).join('')}
    </div>
    <div style="text-align:center">
      <button class="btn btn-back" type="button" id="modal-close">Close</button>
    </div>
  `)
  document.getElementById('modal-close')?.addEventListener('click', closeModal)
  document.querySelectorAll('[data-buy]').forEach((btn) => {
    btn.addEventListener('click', () => buyItem(btn.dataset.buy))
  })
}

function buyItem(id) {
  const item = SHOP_ITEMS.find((x) => x.id === id)
  if (!item) return
  if (state.coins < item.price) return

  if (id === 'heart') {
    if (state.maxHearts >= 5) return
    state.coins -= item.price
    state.maxHearts = Math.min(5, state.maxHearts + 1)
    state.hearts = state.maxHearts
  } else if (id === 'boost') {
    state.coins -= item.price
    state.nextBoost = true
    state.owned.boost = false // consumable — don't mark permanent
  } else if (id === 'magnet') {
    state.coins -= item.price
    state.nextMagnet = true
  } else if (id === 'paint') {
    state.coins -= item.price
    state.owned.paint = true
    state.carColor = '#3a7ec8'
    state.carLabel = 'Blue Cruiser'
  } else {
    state.coins -= item.price
    state.owned[id] = true
  }

  // For permanent cosmetics mark owned; consumables stay buyable
  if (id === 'paint') state.owned.paint = true

  saveState(state)
  openShop()
  // refresh lobby HUD bits
  const hud = document.querySelector('.hud-bar .car-label')
  if (hud) hud.textContent = state.carLabel
  updateLobbyCarColor()
  const coinHint = document.querySelector('.coins-bal')
  if (coinHint) coinHint.textContent = `Your coins: 🪙 ${state.coins}`
}

function openRebirth() {
  const cost = 100 + state.rebirths * 50
  openModal(`
    <h2>Rebirth</h2>
    <p>Start a fresh journey with bonus score multiplier! Keep your car paint and max hearts.</p>
    <p style="text-align:center;margin:12px 0;font-weight:800">
      Rebirths: ${state.rebirths}<br>
      Cost: 🪙 ${cost}
    </p>
    <p style="font-size:13px;text-align:center;color:var(--ink-soft)">
      Resets distance &amp; level progress. Grants +10% score bonus per rebirth (cosmetic for v1).
    </p>
    <div class="btn-row" style="margin-top:16px">
      <button class="btn btn-rebirth" type="button" id="do-rebirth" ${state.coins < cost ? 'disabled' : ''}>
        Rebirth now
      </button>
      <button class="btn btn-back" type="button" id="modal-close">Cancel</button>
    </div>
  `)
  document.getElementById('modal-close')?.addEventListener('click', closeModal)
  document.getElementById('do-rebirth')?.addEventListener('click', () => {
    if (state.coins < cost) return
    state.coins -= cost
    state.rebirths += 1
    state.distance = 0
    state.level = 1
    state.hearts = state.maxHearts
    state.unlockedLevels = [1]
    state.score = Math.floor(state.score * 0.5)
    saveState(state)
    closeModal()
    render()
  })
}

/* ========== GAME ENGINE ========== */

function startGame(levelId, levelName) {
  closeModal()
  document.getElementById('lobby-screen')?.classList.remove('active')
  document.getElementById('game-screen')?.classList.add('active')
  document.getElementById('lobby-car').style.display = 'none'
  document.querySelector('.hills').style.display = 'none'
  document.querySelector('.road-strip').style.display = 'none'

  const canvas = document.getElementById('game-canvas')
  const overlay = document.getElementById('game-over')
  overlay.classList.remove('open')

  if (game) game.destroy()
  game = createGame(canvas, {
    levelId,
    levelName: levelName || 'Sunny Valley',
    onQuit: () => returnToLobby(),
    onEnd: (result) => {
      const title = document.getElementById('end-title')
      const msg = document.getElementById('end-msg')
      if (result.won) {
        title.textContent = 'You made it!'
        msg.textContent = `Sunny Valley complete! +${result.score} score · 🪙 ${result.coins} coins`
        state.score += result.score
        state.coins += result.coins
        state.distance += result.distance
        if (!state.unlockedLevels.includes(2)) {
          state.unlockedLevels.push(2)
        }
        state.level = Math.max(state.level, 2)
        state.hearts = state.maxHearts
      } else {
        title.textContent = 'Trip over!'
        msg.textContent = `Crashed after ${Math.floor(result.distance)} m. Score +${result.score} · 🪙 ${result.coins}`
        state.score += result.score
        state.coins += result.coins
        state.distance += result.distance
        state.hearts = Math.max(1, state.maxHearts - 1)
      }
      saveState(state)
      overlay.classList.add('open')
    },
  })

  document.getElementById('btn-again')?.addEventListener('click', () => {
    startGame(levelId, levelName)
  }, { once: true })
  document.getElementById('btn-lobby')?.addEventListener('click', returnToLobby, { once: true })
  document.getElementById('g-quit')?.addEventListener('click', () => {
    if (game) game.destroy()
    returnToLobby()
  }, { once: true })
}

function returnToLobby() {
  if (game) {
    game.destroy()
    game = null
  }
  document.getElementById('game-screen')?.classList.remove('active')
  const car = document.getElementById('lobby-car')
  if (car) car.style.display = ''
  const hills = document.querySelector('.hills')
  if (hills) hills.style.display = ''
  const road = document.querySelector('.road-strip')
  if (road) road.style.display = ''
  render()
}

function createGame(canvas, opts) {
  const ctx = canvas.getContext('2d')
  let W = 0
  let H = 0
  let raf = 0
  let running = true
  let ended = false

  const keys = { right: false, left: false, jump: false }
  let touchGo = false
  let touchJumpQueued = false

  const useBoost = state.nextBoost
  const useMagnet = state.nextMagnet
  if (useBoost) state.nextBoost = false
  if (useMagnet) state.nextMagnet = false
  saveState(state)

  const player = {
    x: 120,
    y: 0,
    w: 56,
    h: 32,
    vy: 0,
    onGround: true,
    speed: useBoost ? 280 : 180,
    baseSpeed: useBoost ? 280 : 180,
  }

  let scroll = 0
  let distance = 0
  let score = 0
  let coins = 0
  let hearts = state.maxHearts
  let invuln = 0
  const goalDist = 1200 // meters-ish to finish Sunny Valley

  const obstacles = []
  const coinList = []
  const boosts = []
  let spawnTimer = 0
  let coinTimer = 0.5
  let boostTimer = 4

  const groundY = () => H * 0.72

  function resize() {
    const parent = canvas.parentElement
    const rect = parent.getBoundingClientRect()
    W = Math.floor(rect.width)
    H = Math.floor(rect.height)
    canvas.width = W
    canvas.height = H
    player.y = groundY() - player.h
  }

  function spawnObstacle() {
    const kinds = ['rock', 'cone', 'puddle']
    const kind = kinds[Math.floor(Math.random() * kinds.length)]
    const sizes = {
      rock: { w: 36, h: 28 },
      cone: { w: 22, h: 34 },
      puddle: { w: 48, h: 14 },
    }
    const s = sizes[kind]
    obstacles.push({
      kind,
      x: scroll + W + 40,
      y: groundY() - s.h + (kind === 'puddle' ? 8 : 0),
      w: s.w,
      h: s.h,
      hit: false,
    })
  }

  function spawnCoin() {
    const air = Math.random() > 0.45
    coinList.push({
      x: scroll + W + 20,
      y: air ? groundY() - 70 - Math.random() * 40 : groundY() - 28,
      r: 10,
      taken: false,
    })
  }

  function spawnBoost() {
    boosts.push({
      x: scroll + W + 20,
      y: groundY() - 55,
      w: 28,
      h: 28,
      taken: false,
    })
  }

  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  }

  function endGame(won) {
    if (ended) return
    ended = true
    running = false
    opts.onEnd({
      won,
      score,
      coins,
      distance,
    })
  }

  function update(dt) {
    if (!running || ended) return

    const driving = keys.right || touchGo
    const backing = keys.left

    if (driving) {
      player.speed = Math.min(player.baseSpeed + 40, player.speed + 40 * dt)
      scroll += player.speed * dt
      distance += (player.speed * dt) / 10
    } else if (backing) {
      scroll = Math.max(0, scroll - 90 * dt)
    } else {
      player.speed = Math.max(player.baseSpeed * 0.6, player.speed - 60 * dt)
      // coast a little
      if (player.speed > 40) {
        scroll += player.speed * 0.35 * dt
        distance += (player.speed * 0.35 * dt) / 10
      }
    }

    // jump
    if ((keys.jump || touchJumpQueued) && player.onGround) {
      player.vy = -420
      player.onGround = false
      touchJumpQueued = false
    }
    keys.jump = false

    player.vy += 1200 * dt
    player.y += player.vy * dt
    const gy = groundY() - player.h
    if (player.y >= gy) {
      player.y = gy
      player.vy = 0
      player.onGround = true
    }

    // keep car near left third
    player.x = Math.min(W * 0.28, 140)

    spawnTimer -= dt
    coinTimer -= dt
    boostTimer -= dt
    if (spawnTimer <= 0 && distance < goalDist - 80) {
      spawnObstacle()
      spawnTimer = 1.1 + Math.random() * 1.4 - Math.min(0.5, distance / 2000)
    }
    if (coinTimer <= 0 && distance < goalDist) {
      spawnCoin()
      coinTimer = 0.6 + Math.random() * 0.8
    }
    if (boostTimer <= 0 && distance < goalDist - 100) {
      spawnBoost()
      boostTimer = 6 + Math.random() * 4
    }

    // collisions — world space vs player screen space
    const px = scroll + player.x

    for (const o of obstacles) {
      if (o.hit) continue
      const box = { x: o.x, y: o.y, w: o.w, h: o.h }
      const pbox = { x: px, y: player.y, w: player.w, h: player.h }
      if (aabb(pbox, box)) {
        o.hit = true
        if (invuln <= 0) {
          hearts -= 1
          invuln = 1.2
          player.vy = -200
          player.onGround = false
          if (hearts <= 0) endGame(false)
        }
      }
    }

    for (const c of coinList) {
      if (c.taken) continue
      const magnetR = useMagnet ? 80 : 0
      const dx = c.x - (px + player.w / 2)
      const dy = c.y - (player.y + player.h / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < c.r + 20 + magnetR * 0.15 || (useMagnet && dist < magnetR)) {
        if (useMagnet && dist < magnetR && dist > c.r + 18) {
          c.x -= dx * 4 * dt
          c.y -= dy * 4 * dt
        }
        if (dist < c.r + 22) {
          c.taken = true
          coins += 1
          score += 10
        }
      }
    }

    for (const b of boosts) {
      if (b.taken) continue
      if (aabb(
        { x: px, y: player.y, w: player.w, h: player.h },
        { x: b.x, y: b.y, w: b.w, h: b.h },
      )) {
        b.taken = true
        player.baseSpeed = Math.min(360, player.baseSpeed + 50)
        player.speed = player.baseSpeed
        score += 25
      }
    }

    if (invuln > 0) invuln -= dt

    score = Math.max(score, Math.floor(distance))

    if (distance >= goalDist) {
      score += 100
      endGame(true)
    }

    // HUD
    document.getElementById('g-score').textContent = `⭐ ${score}`
    document.getElementById('g-coins').textContent = `🪙 ${coins}`
    document.getElementById('g-dist').textContent = `🛣️ ${Math.floor(distance)} / ${goalDist} m`
    document.getElementById('g-hearts').textContent = '❤️'.repeat(hearts) + '🖤'.repeat(Math.max(0, state.maxHearts - hearts))
  }

  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, '#5eb3e8')
    g.addColorStop(0.55, '#a8d8f0')
    g.addColorStop(0.55, '#c8e8a0')
    g.addColorStop(0.7, '#7bc47b')
    g.addColorStop(0.7, '#4a4a4a')
    g.addColorStop(1, '#3a3a3a')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)

    // sun
    ctx.fillStyle = '#ffe566'
    ctx.beginPath()
    ctx.arc(W * 0.82, H * 0.14, 36, 0, Math.PI * 2)
    ctx.fill()

    // clouds
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    drawCloud(((scroll * 0.15) % (W + 200)) - 100, H * 0.12, 1)
    drawCloud(((scroll * 0.1 + 300) % (W + 200)) - 80, H * 0.2, 0.8)

    // hills parallax
    drawHill(scroll * 0.3, H * 0.55, '#2e6b2e', 180)
    drawHill(scroll * 0.45 + 120, H * 0.58, '#3d8a3d', 150)
    drawHill(scroll * 0.55 + 40, H * 0.6, '#4a9c4a', 130)
  }

  function drawCloud(x, y, s) {
    ctx.beginPath()
    ctx.ellipse(x, y, 40 * s, 18 * s, 0, 0, Math.PI * 2)
    ctx.ellipse(x + 30 * s, y - 5 * s, 32 * s, 16 * s, 0, 0, Math.PI * 2)
    ctx.ellipse(x + 55 * s, y + 2 * s, 28 * s, 14 * s, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawHill(off, base, color, amp) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, H)
    for (let x = 0; x <= W; x += 20) {
      const wx = x + off
      const y = base + Math.sin(wx * 0.008) * amp * 0.35 + Math.sin(wx * 0.003) * amp * 0.25
      ctx.lineTo(x, y)
    }
    ctx.lineTo(W, H)
    ctx.closePath()
    ctx.fill()
  }

  function drawRoad() {
    const gy = groundY()
    ctx.fillStyle = '#4a4a4a'
    ctx.fillRect(0, gy - 8, W, H - gy + 8)

    // roadside grass edge
    ctx.fillStyle = '#5aaa4a'
    ctx.fillRect(0, gy - 14, W, 8)

    // dashed center line
    ctx.fillStyle = '#f0d060'
    const dash = 40
    const gap = 30
    const offset = scroll % (dash + gap)
    for (let x = -offset; x < W + dash; x += dash + gap) {
      ctx.fillRect(x, gy + (H - gy) * 0.35, dash, 5)
    }
  }

  function drawCar() {
    const x = player.x
    const y = player.y
    const blink = invuln > 0 && Math.floor(invuln * 10) % 2 === 0
    if (blink) return

    const color = state.carColor || '#e6392e'

    // body
    ctx.fillStyle = color
    roundRect(x, y + 8, player.w, 20, 6)
    ctx.fill()
    // cabin
    ctx.fillStyle = '#87ceeb'
    roundRect(x + 14, y, 28, 14, 4)
    ctx.fill()
    ctx.fillStyle = color
    ctx.fillRect(x + 12, y + 10, 32, 6)
    // wheels
    ctx.fillStyle = '#222'
    ctx.beginPath()
    ctx.arc(x + 14, y + player.h - 2, 8, 0, Math.PI * 2)
    ctx.arc(x + player.w - 14, y + player.h - 2, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.beginPath()
    ctx.arc(x + 14, y + player.h - 2, 3, 0, Math.PI * 2)
    ctx.arc(x + player.w - 14, y + player.h - 2, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  function drawEntities() {
    for (const o of obstacles) {
      const sx = o.x - scroll
      if (sx < -60 || sx > W + 60) continue
      if (o.kind === 'rock') {
        ctx.fillStyle = o.hit ? '#888' : '#666'
        ctx.beginPath()
        ctx.ellipse(sx + o.w / 2, o.y + o.h / 2, o.w / 2, o.h / 2, 0, 0, Math.PI * 2)
        ctx.fill()
      } else if (o.kind === 'cone') {
        ctx.fillStyle = o.hit ? '#aaa' : '#ff8c1a'
        ctx.beginPath()
        ctx.moveTo(sx + o.w / 2, o.y)
        ctx.lineTo(sx + o.w, o.y + o.h)
        ctx.lineTo(sx, o.y + o.h)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.fillRect(sx + 4, o.y + o.h * 0.4, o.w - 8, 5)
      } else {
        ctx.fillStyle = o.hit ? '#6a8aaa' : '#4a90c8'
        ctx.beginPath()
        ctx.ellipse(sx + o.w / 2, o.y + o.h / 2, o.w / 2, o.h / 2, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (const c of coinList) {
      if (c.taken) continue
      const sx = c.x - scroll
      if (sx < -40 || sx > W + 40) continue
      ctx.fillStyle = '#e8b84a'
      ctx.beginPath()
      ctx.arc(sx, c.y, c.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff3c0'
      ctx.beginPath()
      ctx.arc(sx - 2, c.y - 2, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#c4922a'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(sx, c.y, c.r - 1, 0, Math.PI * 2)
      ctx.stroke()
    }

    for (const b of boosts) {
      if (b.taken) continue
      const sx = b.x - scroll
      if (sx < -40 || sx > W + 40) continue
      ctx.fillStyle = '#ffe066'
      roundRect(sx, b.y, b.w, b.h, 6)
      ctx.fill()
      ctx.fillStyle = '#e07a2f'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('⚡', sx + b.w / 2, b.y + 20)
    }

    // finish flag
    const flagX = goalDist * 10 - scroll + player.x
    if (flagX > -40 && flagX < W + 40) {
      const gy = groundY()
      ctx.fillStyle = '#333'
      ctx.fillRect(flagX, gy - 80, 4, 80)
      ctx.fillStyle = '#3d9b4a'
      ctx.beginPath()
      ctx.moveTo(flagX + 4, gy - 80)
      ctx.lineTo(flagX + 40, gy - 65)
      ctx.lineTo(flagX + 4, gy - 50)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('FINISH', flagX + 8, gy - 88)
    }
  }

  function drawUIBanner() {
    ctx.fillStyle = 'rgba(42,33,24,0.55)'
    ctx.fillRect(W / 2 - 90, 48, 180, 28)
    ctx.fillStyle = '#f5ecd7'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(opts.levelName || 'Sunny Valley', W / 2, 67)
  }

  let last = performance.now()
  function frame(now) {
    if (!running && ended) {
      // still draw last frame peek — but stop loop after end paint once
    }
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (running) update(dt)
    drawSky()
    drawRoad()
    drawEntities()
    drawCar()
    drawUIBanner()
    if (running || !ended) raf = requestAnimationFrame(frame)
    else raf = requestAnimationFrame(frame) // keep drawing after end so scene visible under overlay
  }

  function onKeyDown(e) {
    if (e.code === 'ArrowRight') { keys.right = true; e.preventDefault() }
    if (e.code === 'ArrowLeft') { keys.left = true; e.preventDefault() }
    if (e.code === 'Space' || e.code === 'ArrowUp') { keys.jump = true; e.preventDefault() }
  }
  function onKeyUp(e) {
    if (e.code === 'ArrowRight') keys.right = false
    if (e.code === 'ArrowLeft') keys.left = false
  }

  const touchRoot = document.getElementById('touch-controls')
  const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  if (isTouch) touchRoot?.classList.add('show')

  const pedalGo = document.getElementById('pedal-go')
  const pedalJump = document.getElementById('pedal-jump')

  const goStart = (e) => { e.preventDefault(); touchGo = true }
  const goEnd = (e) => { e.preventDefault(); touchGo = false }
  const jumpTap = (e) => { e.preventDefault(); touchJumpQueued = true }

  pedalGo?.addEventListener('pointerdown', goStart)
  pedalGo?.addEventListener('pointerup', goEnd)
  pedalGo?.addEventListener('pointerleave', goEnd)
  pedalGo?.addEventListener('pointercancel', goEnd)
  pedalJump?.addEventListener('pointerdown', jumpTap)

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('resize', resize)

  resize()
  // brief tip: auto-nudge forward so something happens
  keys.right = false
  raf = requestAnimationFrame(frame)

  return {
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', resize)
      pedalGo?.removeEventListener('pointerdown', goStart)
      pedalGo?.removeEventListener('pointerup', goEnd)
      pedalGo?.removeEventListener('pointerleave', goEnd)
      pedalGo?.removeEventListener('pointercancel', goEnd)
      pedalJump?.removeEventListener('pointerdown', jumpTap)
      touchRoot?.classList.remove('show')
    },
  }
}

// boot
render()
