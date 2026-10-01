(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`road-rush-save-v1`,t=[{id:1,name:`World 1 · Green Valleys`,unlocked:!0,levels:[{id:1,name:`Sunny Valley`,unlocked:!0,boss:!1},{id:2,name:`Sunset Hills`,unlocked:!1,boss:!1},{id:3,name:`Moonlight Run`,unlocked:!1,boss:!1},{id:4,name:`Snowy Peaks`,unlocked:!1,boss:!1},{id:5,name:`Desert Dunes`,unlocked:!1,boss:!0}]},{id:2,name:`World 2 · Frost & Fire`,unlocked:!1,levels:[{id:6,name:`Icy Pass`,unlocked:!1},{id:7,name:`Ember Trail`,unlocked:!1},{id:8,name:`Glacier Gate`,unlocked:!1},{id:9,name:`Volcano Road`,unlocked:!1},{id:10,name:`Frostfire Peak`,unlocked:!1,boss:!0}]},{id:3,name:`World 3 · Mystic Realms`,unlocked:!1,levels:[{id:11,name:`Crystal Cove`,unlocked:!1},{id:12,name:`Fairy Forest`,unlocked:!1},{id:13,name:`Shadow Bridge`,unlocked:!1},{id:14,name:`Starlit Mesa`,unlocked:!1},{id:15,name:`Enchanted Gate`,unlocked:!1,boss:!0}]},{id:4,name:`World 4 · Ocean Shores`,unlocked:!1,levels:[{id:16,name:`Sandy Stretch`,unlocked:!1},{id:17,name:`Pier Dash`,unlocked:!1},{id:18,name:`Tide Loop`,unlocked:!1},{id:19,name:`Coral Curve`,unlocked:!1},{id:20,name:`Lighthouse Boss`,unlocked:!1,boss:!0}]},{id:5,name:`World 5 · Mountain High`,unlocked:!1,levels:[{id:21,name:`Cliffside`,unlocked:!1},{id:22,name:`Tunnel Run`,unlocked:!1},{id:23,name:`Alpine Air`,unlocked:!1},{id:24,name:`Windy Ridge`,unlocked:!1},{id:25,name:`Summit Showdown`,unlocked:!1,boss:!0}]},{id:6,name:`World 6 · Neon Nights`,unlocked:!1,levels:[{id:26,name:`City Lights`,unlocked:!1},{id:27,name:`Highway Hum`,unlocked:!1},{id:28,name:`Billboard Blitz`,unlocked:!1},{id:29,name:`Midnight Mile`,unlocked:!1},{id:30,name:`Neon Boss`,unlocked:!1,boss:!0}]},{id:7,name:`World 7 · Jungle Jam`,unlocked:!1,levels:[{id:31,name:`Canopy Cruise`,unlocked:!1},{id:32,name:`Vine Valley`,unlocked:!1},{id:33,name:`River Raft Road`,unlocked:!1},{id:34,name:`Temple Trail`,unlocked:!1},{id:35,name:`Idol Boss`,unlocked:!1,boss:!0}]},{id:8,name:`World 8 · Candy Canyon`,unlocked:!1,levels:[{id:36,name:`Sugar Slope`,unlocked:!1},{id:37,name:`Gummy Gulch`,unlocked:!1},{id:38,name:`Chocolate Chip`,unlocked:!1},{id:39,name:`Lollipop Loop`,unlocked:!1},{id:40,name:`Candy King`,unlocked:!1,boss:!0}]},{id:9,name:`World 9 · Space Sprint`,unlocked:!1,levels:[{id:41,name:`Moon Base`,unlocked:!1},{id:42,name:`Asteroid Ave`,unlocked:!1},{id:43,name:`Comet Curve`,unlocked:!1},{id:44,name:`Orbit Oval`,unlocked:!1},{id:45,name:`Star Boss`,unlocked:!1,boss:!0}]},{id:10,name:`World 10 · Grandma’s Gate`,unlocked:!1,levels:[{id:46,name:`Home Stretch`,unlocked:!1},{id:47,name:`Memory Lane`,unlocked:!1},{id:48,name:`Porch Parade`,unlocked:!1},{id:49,name:`Garden Dash`,unlocked:!1},{id:50,name:`Grandma’s House`,unlocked:!1,boss:!0}]}],n=[{id:`heart`,name:`Extra Heart`,desc:`+1 max heart (up to 5)`,price:50,emoji:`❤️`},{id:`boost`,name:`Speed Boost Pack`,desc:`Start with a boost next run`,price:30,emoji:`⚡`},{id:`magnet`,name:`Coin Magnet`,desc:`Pull coins closer for one run`,price:40,emoji:`🧲`},{id:`paint`,name:`Blue Paint Job`,desc:`Cosmetic — cool blue car`,price:75,emoji:`🔵`}];function r(){return{level:1,hearts:3,maxHearts:3,score:0,distance:0,coins:25,carLabel:`Red Roadster`,carColor:`#e6392e`,rebirths:0,owned:{},nextBoost:!1,nextMagnet:!1,unlockedLevels:[1]}}function i(){try{let t=localStorage.getItem(e);return t?{...r(),...JSON.parse(t)}:r()}catch{return r()}}function a(t){localStorage.setItem(e,JSON.stringify(t))}var o=i(),s=null,c=document.getElementById(`app`);function l(e){return`❤️`.repeat(Math.max(0,e))+`🖤`.repeat(Math.max(0,(o.maxHearts||3)-e))}function u(){c.innerHTML=`
    <div class="scene" id="scene">
      <div class="hills"><div class="h1"></div><div class="h2"></div><div class="h3"></div></div>
      <div class="road-strip"></div>
      <div class="lobby-car" id="lobby-car">🚗</div>

      <div class="screen active" id="lobby-screen">
        <div class="lobby-wrap">
          <div class="hud-bar">
            <span class="stat">Lv ${o.level}</span>
            <span class="stat hearts">${l(o.hearts)}</span>
            <span class="stat">⭐ ${o.score}</span>
            <span class="stat">🛣️ ${Math.floor(o.distance)} m</span>
            <span class="beep">Beep beep!</span>
            <span class="car-label">${d(o.carLabel)}</span>
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
  `,m(),h(),f()}function d(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function f(){let e=document.getElementById(`lobby-car`);e&&(e.textContent=o.carColor===`#3a7ec8`?`🚙`:`🚗`)}function p(e){return o.unlockedLevels.includes(e)||e===1}function m(){let e=document.getElementById(`worlds`);e&&(e.innerHTML=t.map(e=>{let t=!e.unlocked&&e.id!==1;return`
      <div class="world ${t?`locked`:``}">
        <div class="world-title">
          ${d(e.name)}
          ${t?`<span class="lock">🔒 Locked</span>`:``}
        </div>
        <div class="levels">
          ${e.levels.map(e=>{let n=!t&&p(e.id),r=e.boss?`<span class="crown">👑</span>`:``;return`
              <button class="level-btn ${e.boss?`boss`:``}"
                type="button"
                data-level="${e.id}"
                data-name="${d(e.name)}"
                ${n?``:`disabled`}>
                ${e.id}. ${d(e.name)} ${r}
              </button>`}).join(``)}
        </div>
      </div>`}).join(``),e.querySelectorAll(`.level-btn:not(:disabled)`).forEach(e=>{e.addEventListener(`click`,()=>{S(Number(e.dataset.level),e.dataset.name)})}))}function h(){document.getElementById(`btn-start`)?.addEventListener(`click`,()=>{S(1,`Sunny Valley`)}),document.getElementById(`btn-shop`)?.addEventListener(`click`,y),document.getElementById(`btn-rebirth`)?.addEventListener(`click`,x),document.getElementById(`btn-howto`)?.addEventListener(`click`,v);let e=document.getElementById(`modal-overlay`);e?.addEventListener(`click`,t=>{t.target===e&&_()})}function g(e){let t=document.getElementById(`modal-overlay`),n=document.getElementById(`modal-body`);n.innerHTML=e,t.classList.add(`open`)}function _(){document.getElementById(`modal-overlay`)?.classList.remove(`open`)}function v(){g(`
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
  `),document.getElementById(`modal-close`)?.addEventListener(`click`,_)}function y(){g(`
    <h2>Shop</h2>
    <p class="coins-bal">Your coins: 🪙 ${o.coins}</p>
    <div class="shop-grid">
      ${n.map(e=>{let t=!!o.owned[e.id];o.coins,e.price;let n=t?`Owned`:`Buy · ${e.price}`;e.id===`heart`&&o.maxHearts>=5&&(n=`Maxed`);let r=t||o.coins<e.price||e.id===`heart`&&o.maxHearts>=5;return`
          <div class="shop-item">
            <div class="info">
              <div class="name">${e.emoji} ${d(e.name)}</div>
              <div class="desc">${d(e.desc)}</div>
            </div>
            <button class="btn btn-shop" type="button" data-buy="${e.id}" ${r?`disabled`:``}>
              ${n}
            </button>
          </div>`}).join(``)}
    </div>
    <div style="text-align:center">
      <button class="btn btn-back" type="button" id="modal-close">Close</button>
    </div>
  `),document.getElementById(`modal-close`)?.addEventListener(`click`,_),document.querySelectorAll(`[data-buy]`).forEach(e=>{e.addEventListener(`click`,()=>b(e.dataset.buy))})}function b(e){let t=n.find(t=>t.id===e);if(!t||o.coins<t.price)return;if(e===`heart`){if(o.maxHearts>=5)return;o.coins-=t.price,o.maxHearts=Math.min(5,o.maxHearts+1),o.hearts=o.maxHearts}else e===`boost`?(o.coins-=t.price,o.nextBoost=!0,o.owned.boost=!1):e===`magnet`?(o.coins-=t.price,o.nextMagnet=!0):e===`paint`?(o.coins-=t.price,o.owned.paint=!0,o.carColor=`#3a7ec8`,o.carLabel=`Blue Cruiser`):(o.coins-=t.price,o.owned[e]=!0);e===`paint`&&(o.owned.paint=!0),a(o),y();let r=document.querySelector(`.hud-bar .car-label`);r&&(r.textContent=o.carLabel),f();let i=document.querySelector(`.coins-bal`);i&&(i.textContent=`Your coins: 🪙 ${o.coins}`)}function x(){let e=100+o.rebirths*50;g(`
    <h2>Rebirth</h2>
    <p>Start a fresh journey with bonus score multiplier! Keep your car paint and max hearts.</p>
    <p style="text-align:center;margin:12px 0;font-weight:800">
      Rebirths: ${o.rebirths}<br>
      Cost: 🪙 ${e}
    </p>
    <p style="font-size:13px;text-align:center;color:var(--ink-soft)">
      Resets distance &amp; level progress. Grants +10% score bonus per rebirth (cosmetic for v1).
    </p>
    <div class="btn-row" style="margin-top:16px">
      <button class="btn btn-rebirth" type="button" id="do-rebirth" ${o.coins<e?`disabled`:``}>
        Rebirth now
      </button>
      <button class="btn btn-back" type="button" id="modal-close">Cancel</button>
    </div>
  `),document.getElementById(`modal-close`)?.addEventListener(`click`,_),document.getElementById(`do-rebirth`)?.addEventListener(`click`,()=>{o.coins<e||(o.coins-=e,o.rebirths+=1,o.distance=0,o.level=1,o.hearts=o.maxHearts,o.unlockedLevels=[1],o.score=Math.floor(o.score*.5),a(o),_(),u())})}function S(e,t){_(),document.getElementById(`lobby-screen`)?.classList.remove(`active`),document.getElementById(`game-screen`)?.classList.add(`active`),document.getElementById(`lobby-car`).style.display=`none`,document.querySelector(`.hills`).style.display=`none`,document.querySelector(`.road-strip`).style.display=`none`;let n=document.getElementById(`game-canvas`),r=document.getElementById(`game-over`);r.classList.remove(`open`),s&&s.destroy(),s=w(n,{levelId:e,levelName:t||`Sunny Valley`,onQuit:()=>C(),onEnd:e=>{let t=document.getElementById(`end-title`),n=document.getElementById(`end-msg`);e.won?(t.textContent=`You made it!`,n.textContent=`Sunny Valley complete! +${e.score} score · 🪙 ${e.coins} coins`,o.score+=e.score,o.coins+=e.coins,o.distance+=e.distance,o.unlockedLevels.includes(2)||o.unlockedLevels.push(2),o.level=Math.max(o.level,2),o.hearts=o.maxHearts):(t.textContent=`Trip over!`,n.textContent=`Crashed after ${Math.floor(e.distance)} m. Score +${e.score} · 🪙 ${e.coins}`,o.score+=e.score,o.coins+=e.coins,o.distance+=e.distance,o.hearts=Math.max(1,o.maxHearts-1)),a(o),r.classList.add(`open`)}}),document.getElementById(`btn-again`)?.addEventListener(`click`,()=>{S(e,t)},{once:!0}),document.getElementById(`btn-lobby`)?.addEventListener(`click`,C,{once:!0}),document.getElementById(`g-quit`)?.addEventListener(`click`,()=>{s&&s.destroy(),C()},{once:!0})}function C(){s&&=(s.destroy(),null),document.getElementById(`game-screen`)?.classList.remove(`active`);let e=document.getElementById(`lobby-car`);e&&(e.style.display=``);let t=document.querySelector(`.hills`);t&&(t.style.display=``);let n=document.querySelector(`.road-strip`);n&&(n.style.display=``),u()}function w(e,t){let n=e.getContext(`2d`),r=0,i=0,s=0,c=!0,l=!1,u={right:!1,left:!1,jump:!1},d=!1,f=!1,p=o.nextBoost,m=o.nextMagnet;p&&(o.nextBoost=!1),m&&(o.nextMagnet=!1),a(o);let h={x:120,y:0,w:56,h:32,vy:0,onGround:!0,speed:p?280:180,baseSpeed:p?280:180},g=0,_=0,v=0,y=0,b=o.maxHearts,x=0,S=1200,C=[],w=[],T=[],E=0,D=.5,O=4,k=()=>i*.72;function A(){let t=e.parentElement.getBoundingClientRect();r=Math.floor(t.width),i=Math.floor(t.height),e.width=r,e.height=i,h.y=k()-h.h}function j(){let e=[`rock`,`cone`,`puddle`],t=e[Math.floor(Math.random()*e.length)],n={rock:{w:36,h:28},cone:{w:22,h:34},puddle:{w:48,h:14}}[t];C.push({kind:t,x:g+r+40,y:k()-n.h+(t===`puddle`?8:0),w:n.w,h:n.h,hit:!1})}function M(){let e=Math.random()>.45;w.push({x:g+r+20,y:e?k()-70-Math.random()*40:k()-28,r:10,taken:!1})}function N(){T.push({x:g+r+20,y:k()-55,w:28,h:28,taken:!1})}function P(e,t){return e.x<t.x+t.w&&e.x+e.w>t.x&&e.y<t.y+t.h&&e.y+e.h>t.y}function F(e){l||(l=!0,c=!1,t.onEnd({won:e,score:v,coins:y,distance:_}))}function I(e){if(!c||l)return;let t=u.right||d,n=u.left;t?(h.speed=Math.min(h.baseSpeed+40,h.speed+40*e),g+=h.speed*e,_+=h.speed*e/10):n?g=Math.max(0,g-90*e):(h.speed=Math.max(h.baseSpeed*.6,h.speed-60*e),h.speed>40&&(g+=h.speed*.35*e,_+=h.speed*.35*e/10)),(u.jump||f)&&h.onGround&&(h.vy=-420,h.onGround=!1,f=!1),u.jump=!1,h.vy+=1200*e,h.y+=h.vy*e;let i=k()-h.h;h.y>=i&&(h.y=i,h.vy=0,h.onGround=!0),h.x=Math.min(r*.28,140),E-=e,D-=e,O-=e,E<=0&&_<1120&&(j(),E=1.1+Math.random()*1.4-Math.min(.5,_/2e3)),D<=0&&_<S&&(M(),D=.6+Math.random()*.8),O<=0&&_<1100&&(N(),O=6+Math.random()*4);let a=g+h.x;for(let e of C){if(e.hit)continue;let t={x:e.x,y:e.y,w:e.w,h:e.h};P({x:a,y:h.y,w:h.w,h:h.h},t)&&(e.hit=!0,x<=0&&(--b,x=1.2,h.vy=-200,h.onGround=!1,b<=0&&F(!1)))}for(let t of w){if(t.taken)continue;let n=m?80:0,r=t.x-(a+h.w/2),i=t.y-(h.y+h.h/2),o=Math.hypot(r,i);(o<t.r+20+n*.15||m&&o<n)&&(m&&o<n&&o>t.r+18&&(t.x-=r*4*e,t.y-=i*4*e),o<t.r+22&&(t.taken=!0,y+=1,v+=10))}for(let e of T)e.taken||P({x:a,y:h.y,w:h.w,h:h.h},{x:e.x,y:e.y,w:e.w,h:e.h})&&(e.taken=!0,h.baseSpeed=Math.min(360,h.baseSpeed+50),h.speed=h.baseSpeed,v+=25);x>0&&(x-=e),v=Math.max(v,Math.floor(_)),_>=S&&(v+=100,F(!0)),document.getElementById(`g-score`).textContent=`⭐ ${v}`,document.getElementById(`g-coins`).textContent=`🪙 ${y}`,document.getElementById(`g-dist`).textContent=`🛣️ ${Math.floor(_)} / ${S} m`,document.getElementById(`g-hearts`).textContent=`❤️`.repeat(b)+`🖤`.repeat(Math.max(0,o.maxHearts-b))}function L(){let e=n.createLinearGradient(0,0,0,i);e.addColorStop(0,`#5eb3e8`),e.addColorStop(.55,`#a8d8f0`),e.addColorStop(.55,`#c8e8a0`),e.addColorStop(.7,`#7bc47b`),e.addColorStop(.7,`#4a4a4a`),e.addColorStop(1,`#3a3a3a`),n.fillStyle=e,n.fillRect(0,0,r,i),n.fillStyle=`#ffe566`,n.beginPath(),n.arc(r*.82,i*.14,36,0,Math.PI*2),n.fill(),n.fillStyle=`rgba(255,255,255,0.85)`,R(g*.15%(r+200)-100,i*.12,1),R((g*.1+300)%(r+200)-80,i*.2,.8),z(g*.3,i*.55,`#2e6b2e`,180),z(g*.45+120,i*.58,`#3d8a3d`,150),z(g*.55+40,i*.6,`#4a9c4a`,130)}function R(e,t,r){n.beginPath(),n.ellipse(e,t,40*r,18*r,0,0,Math.PI*2),n.ellipse(e+30*r,t-5*r,32*r,16*r,0,0,Math.PI*2),n.ellipse(e+55*r,t+2*r,28*r,14*r,0,0,Math.PI*2),n.fill()}function z(e,t,a,o){n.fillStyle=a,n.beginPath(),n.moveTo(0,i);for(let i=0;i<=r;i+=20){let r=i+e,a=t+Math.sin(r*.008)*o*.35+Math.sin(r*.003)*o*.25;n.lineTo(i,a)}n.lineTo(r,i),n.closePath(),n.fill()}function B(){let e=k();n.fillStyle=`#4a4a4a`,n.fillRect(0,e-8,r,i-e+8),n.fillStyle=`#5aaa4a`,n.fillRect(0,e-14,r,8),n.fillStyle=`#f0d060`;let t=g%70;for(let a=-t;a<r+40;a+=70)n.fillRect(a,e+(i-e)*.35,40,5)}function V(){let e=h.x,t=h.y;if(x>0&&Math.floor(x*10)%2==0)return;let r=o.carColor||`#e6392e`;n.fillStyle=r,H(e,t+8,h.w,20,6),n.fill(),n.fillStyle=`#87ceeb`,H(e+14,t,28,14,4),n.fill(),n.fillStyle=r,n.fillRect(e+12,t+10,32,6),n.fillStyle=`#222`,n.beginPath(),n.arc(e+14,t+h.h-2,8,0,Math.PI*2),n.arc(e+h.w-14,t+h.h-2,8,0,Math.PI*2),n.fill(),n.fillStyle=`#aaa`,n.beginPath(),n.arc(e+14,t+h.h-2,3,0,Math.PI*2),n.arc(e+h.w-14,t+h.h-2,3,0,Math.PI*2),n.fill()}function H(e,t,r,i,a){n.beginPath(),n.moveTo(e+a,t),n.arcTo(e+r,t,e+r,t+i,a),n.arcTo(e+r,t+i,e,t+i,a),n.arcTo(e,t+i,e,t,a),n.arcTo(e,t,e+r,t,a),n.closePath()}function U(){for(let e of C){let t=e.x-g;t<-60||t>r+60||(e.kind===`rock`?(n.fillStyle=e.hit?`#888`:`#666`,n.beginPath(),n.ellipse(t+e.w/2,e.y+e.h/2,e.w/2,e.h/2,0,0,Math.PI*2),n.fill()):e.kind===`cone`?(n.fillStyle=e.hit?`#aaa`:`#ff8c1a`,n.beginPath(),n.moveTo(t+e.w/2,e.y),n.lineTo(t+e.w,e.y+e.h),n.lineTo(t,e.y+e.h),n.closePath(),n.fill(),n.fillStyle=`#fff`,n.fillRect(t+4,e.y+e.h*.4,e.w-8,5)):(n.fillStyle=e.hit?`#6a8aaa`:`#4a90c8`,n.beginPath(),n.ellipse(t+e.w/2,e.y+e.h/2,e.w/2,e.h/2,0,0,Math.PI*2),n.fill()))}for(let e of w){if(e.taken)continue;let t=e.x-g;t<-40||t>r+40||(n.fillStyle=`#e8b84a`,n.beginPath(),n.arc(t,e.y,e.r,0,Math.PI*2),n.fill(),n.fillStyle=`#fff3c0`,n.beginPath(),n.arc(t-2,e.y-2,3,0,Math.PI*2),n.fill(),n.strokeStyle=`#c4922a`,n.lineWidth=2,n.beginPath(),n.arc(t,e.y,e.r-1,0,Math.PI*2),n.stroke())}for(let e of T){if(e.taken)continue;let t=e.x-g;t<-40||t>r+40||(n.fillStyle=`#ffe066`,H(t,e.y,e.w,e.h,6),n.fill(),n.fillStyle=`#e07a2f`,n.font=`bold 16px sans-serif`,n.textAlign=`center`,n.fillText(`⚡`,t+e.w/2,e.y+20))}let e=S*10-g+h.x;if(e>-40&&e<r+40){let t=k();n.fillStyle=`#333`,n.fillRect(e,t-80,4,80),n.fillStyle=`#3d9b4a`,n.beginPath(),n.moveTo(e+4,t-80),n.lineTo(e+40,t-65),n.lineTo(e+4,t-50),n.closePath(),n.fill(),n.fillStyle=`#fff`,n.font=`bold 12px sans-serif`,n.textAlign=`left`,n.fillText(`FINISH`,e+8,t-88)}}function ee(){n.fillStyle=`rgba(42,33,24,0.55)`,n.fillRect(r/2-90,48,180,28),n.fillStyle=`#f5ecd7`,n.font=`bold 14px sans-serif`,n.textAlign=`center`,n.fillText(t.levelName||`Sunny Valley`,r/2,67)}let W=performance.now();function G(e){let t=Math.min(.05,(e-W)/1e3);W=e,c&&I(t),L(),B(),U(),V(),ee(),s=requestAnimationFrame(G)}function K(e){e.code===`ArrowRight`&&(u.right=!0,e.preventDefault()),e.code===`ArrowLeft`&&(u.left=!0,e.preventDefault()),(e.code===`Space`||e.code===`ArrowUp`)&&(u.jump=!0,e.preventDefault())}function q(e){e.code===`ArrowRight`&&(u.right=!1),e.code===`ArrowLeft`&&(u.left=!1)}let J=document.getElementById(`touch-controls`);(matchMedia(`(pointer: coarse)`).matches||`ontouchstart`in window)&&J?.classList.add(`show`);let Y=document.getElementById(`pedal-go`),X=document.getElementById(`pedal-jump`),Z=e=>{e.preventDefault(),d=!0},Q=e=>{e.preventDefault(),d=!1},$=e=>{e.preventDefault(),f=!0};return Y?.addEventListener(`pointerdown`,Z),Y?.addEventListener(`pointerup`,Q),Y?.addEventListener(`pointerleave`,Q),Y?.addEventListener(`pointercancel`,Q),X?.addEventListener(`pointerdown`,$),window.addEventListener(`keydown`,K),window.addEventListener(`keyup`,q),window.addEventListener(`resize`,A),A(),u.right=!1,s=requestAnimationFrame(G),{destroy(){c=!1,cancelAnimationFrame(s),window.removeEventListener(`keydown`,K),window.removeEventListener(`keyup`,q),window.removeEventListener(`resize`,A),Y?.removeEventListener(`pointerdown`,Z),Y?.removeEventListener(`pointerup`,Q),Y?.removeEventListener(`pointerleave`,Q),Y?.removeEventListener(`pointercancel`,Q),X?.removeEventListener(`pointerdown`,$),J?.classList.remove(`show`)}}}u();