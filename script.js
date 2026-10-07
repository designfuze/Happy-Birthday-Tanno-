const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const IM={I1:'images/photo-1.jpg',I2:'images/photo-2.jpg',I3:'images/photo-3.jpg',I4:'images/photo-4.jpg',I5:'images/photo-5.jpg'};
$$('[data-i]').forEach(e=>e.src=IM[e.dataset.i]);
const pc=['#ff5c93','#ffb703','#9be0c6','#ffd1dc'],fc=['#ff5c93','#ffb703','#9be0c6','#7a2a52','#ffd1dc'];
function bn(){const w=innerWidth<600?14:22,n=Math.floor(innerWidth/(w*2+8));$$('.bunt').forEach(b=>{b.innerHTML='';for(let i=0;i<n;i++){const f=document.createElement('i');f.style.cssText=`--c:${fc[i%5]};--d:${-i*.3}s;--w:${w}px`;b.append(f)}})}bn();addEventListener('resize',bn);
$('#ttl').innerHTML=[...'Happy Birthday'].map((c,i)=>c==' '?' ':`<span style="animation-delay:${1+i*.06}s">${c}</span>`).join('');
const cv=$('#cf'),cx=cv.getContext('2d');let ps=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();onresize=rs;
function boom(){const n=ps.length;for(let i=0;i<140;i++)ps.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*16,vy:-Math.random()*14-3,c:pc[i%4],r:Math.random()*6,s:Math.random()*6+3});if(!n)loop()}
function loop(){cx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.3;p.r+=.2;cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});ps=ps.filter(p=>p.y<cv.height+20);if(ps.length)requestAnimationFrame(loop)}
// lock
const CODE='08102007';let en='';
$('#dots').innerHTML='<b></b>'.repeat(8);
['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(k=>{if(!k){$('#pad').append(document.createElement('span'));return}const b=document.createElement('button');b.textContent=k;b.setAttribute('aria-label',k=='⌫'?'Delete digit':'Digit '+k);b.onclick=()=>key(k);$('#pad').append(b)});
function key(k){if(!$('#lock')||$('#lock').classList.contains('go'))return;$('#err').textContent='';
if(k=='⌫')en=en.slice(0,-1);else if(en.length<8)en+=k;
$$('#dots b').forEach((d,i)=>d.classList.toggle('f',i<en.length));
if(en.length==8){if(en==CODE){$('#err').textContent='';$('#lock').classList.add('go');document.body.classList.remove('lk');boom();setTimeout(boom,600);setTimeout(song,900)}
else{const d=$('#dots');d.classList.add('shake');$('#err').textContent="That code isn't right. Try her birth date as DDMMYYYY.";setTimeout(()=>{d.classList.remove('shake');en='';$$('#dots b').forEach(x=>x.classList.remove('f'))},500)}}}
addEventListener('keydown',e=>{if(/^\d$/.test(e.key))key(e.key);else if(e.key=='Backspace')key('⌫')});
// scroll
$$('[data-to]').forEach(b=>b.onclick=()=>$('#'+b.dataset.to).scrollIntoView({behavior:'smooth'}));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});$$('.rv').forEach(e=>io.observe(e));
// story
const ch=[['I4','Once upon a time','There lived a girl whose smile could light up a whole house. People came in tired and left lighter, and she never knew she was the reason.'],
['I2','She found her quiet','Among tall, misty pines she learned that calm is a kind of strength. She walked slowly and noticed everything, and the forest seemed to notice her too.'],
['I3','She wore her roots like a crown','Velvet, gold and a bouquet of white flowers. She stood tall in her own colours, and everyone around her felt proud just to be there.'],
['I1','Shy, but never small','Sometimes she hid behind her hands, and even then her joy leaked through. Soft hearts are the bravest ones, and hers is one of them.'],
['I5','Today, a new page begins','Every year adds a chapter, and this one is yours to write. May it be full of laughter, good people and dreams that come true. Happy Birthday, Tanno!']];
let c=0;const env=$('#env'),tg=()=>{env.classList.toggle('open');if(env.classList.contains('open')){boom();setTimeout(()=>env.scrollIntoView({behavior:'smooth',block:'center'}),500)}};
function pg(){const x=ch[c];$('#bi').innerHTML=`<img src="${IM[x[0]]}" alt="">`;$('#bt').innerHTML=`<div class="no">Page ${c+1}</div><h3>${x[1]}</h3><p>${x[2]}</p>`+(c==4?'<br><button class="btn" id="lt">Open your letter</button>':'');
const b=$('#book');b.classList.remove('turn');void b.offsetWidth;b.classList.add('turn');$('#pg').textContent=`${c+1} of 5`;$('#pv').disabled=!c;$('#nx').disabled=c==4;
if(c==4)$('#lt').onclick=()=>{$('#ft').scrollIntoView({behavior:'smooth'});setTimeout(()=>{if(!env.classList.contains('open'))tg()},900)}}
$('#pv').onclick=()=>{c--;pg()};$('#nx').onclick=()=>{c++;pg()};pg();

// puzzle
let pa=[...Array(12).keys()],sel=-1;const pz=$('#pz');
function pr(){pz.innerHTML='';pa.forEach((v,i)=>{const t=document.createElement('i');t.style.backgroundImage=`url(${IM.I5})`;t.style.backgroundPosition=`${(v%3)*50}% ${Math.floor(v/3)*33.333}%`;if(i==sel)t.className='s';t.onclick=()=>ps_(i);pz.append(t)})}
function ps_(i){if(sel<0){sel=i}else{[pa[sel],pa[i]]=[pa[i],pa[sel]];sel=-1;if(pa.every((v,k)=>v==k)){$('#pzs').textContent='You did it! That smile is back together. ✨';boom()}}pr()}
function sh(){do{pa.sort(()=>Math.random()-.5)}while(pa.every((v,k)=>v==k));sel=-1;$('#pzs').textContent='Tap two pieces to swap them and rebuild the photo.';pr()}
$('#pzr').onclick=sh;let shw=false,sv;$('#pzh').onclick=()=>{if(!shw){shw=true;sv=[...pa];pa=[...Array(12).keys()];pr();$('#pzh').textContent='Hide picture'}else{shw=false;pa=sv;pr();$('#pzh').textContent='Show picture'}};sh();
// quiz
const Q=[['Pick a birthday treat',['Chocolate cake','Ice cream','Pizza']],['Pick a birthday mood',['Dancing all day','Cozy and quiet','Out on an adventure']],['Pick a birthday wish',['Happiness','Success','Travel']]];let qi=0,qa=[];
function qr(){const q=$('#qz');if(qi<3){q.innerHTML=`<div class="qn">Question ${qi+1} of 3</div><h3>${Q[qi][0]}</h3><div class="o">${Q[qi][1].map((o,k)=>`<button data-k="${k}">${o}</button>`).join('')}</div>`;$$('#qz .o button').forEach(b=>b.onclick=()=>{qa.push(Q[qi][1][b.dataset.k]);qi++;qr()})}
else{q.innerHTML=`<div class="qn">Your result</div><h3>${qa[0]}, ${qa[1].toLowerCase()}, and a wish for ${qa[2].toLowerCase()}.</h3><p>That is exactly the kind of birthday you deserve, Tanno. Consider it all granted.</p><br><button class="btn" id="qre">Take it again</button>`;$('#qre').onclick=()=>{qi=0;qa=[];qr()};boom()}}
qr();

// song
const L=[['Hap','py','Birth','day','to','you'],['Hap','py','Birth','day','to','you'],['Hap','py','Birth','day','dear','Tan','no'],['Hap','py','Birth','day','to','you']];
const N=[[392,.75],[392,.25],[440,1],[392,1],[523.25,1],[493.88,2],[392,.75],[392,.25],[440,1],[392,1],[587.33,1],[523.25,2],[392,.75],[392,.25],[783.99,1],[659.25,1],[523.25,1],[493.88,1],[440,2],[698.46,.75],[698.46,.25],[659.25,1],[523.25,1],[587.33,1],[523.25,2.5]];
$('#ly').innerHTML=L.map((l,i)=>`<div id="l${i}">${l.map(s=>`<span>${s}</span>`).join(' ')}</div>`).join('');
const SP=[...$$('#ly span')];let ac,mg,tm=[],pl=false;
function stopS(){tm.forEach(clearTimeout);tm=[];pl=false;if(mg){mg.gain.cancelScheduledValues(0);mg.gain.value=0}$$('#ly span').forEach(s=>s.classList.remove('h'));$$('#ly div').forEach(d=>d.classList.remove('on'));$('#sg').textContent='Play the birthday song'}
function song(){if(pl)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();mg=ac.createGain();mg.gain.value=.5;mg.connect(ac.destination)}catch(e){return}
pl=true;$('#sg').textContent='Stop the song';let t=ac.currentTime+.1,b=.52,sy=0;const t0=t;
N.forEach(([f,d],k)=>{const o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;const L2=ac.createGain();L2.gain.value=.25;
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d*b*1.6);o.connect(g);o2.connect(L2);L2.connect(g);g.connect(mg);o.start(t);o2.start(t);o.stop(t+d*b*1.7);o2.stop(t+d*b*1.7);
const i=sy++,w=(t-ac.currentTime)*1e3;tm.push(setTimeout(()=>{SP.forEach(s=>s.classList.remove('h'));if(SP[i]){SP[i].classList.add('h');const row=SP[i].parentElement;$$('#ly div').forEach(d=>d.classList.toggle('on',d==row))}},w));t+=d*b});
tm.push(setTimeout(()=>{stopS();boom()},(t-ac.currentTime)*1e3+300))}
$('#sg').onclick=()=>pl?stopS():song();
// cake + envelope
let lit=true;$('#blow').onclick=()=>{if(lit){lit=false;$('#ck').classList.add('out');$('#msg').textContent='Your wish is on its way, Tanno ✨';$('#blow').textContent='Relight the candles';boom();song()}else{lit=true;$('#ck').classList.remove('out');$('#msg').textContent='';$('#blow').textContent='Blow out the candles'}};
env.onclick=tg;env.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();tg()}};
