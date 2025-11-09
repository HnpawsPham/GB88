const formatVnd = n => {
    const x = Math.round(n / 1000) * 1000
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const balanceDisplay = document.getElementById('balance')
const logs = document.getElementById('logs')
const feed = document.getElementById('feed')
const toasts = document.getElementById('toasts')
const project = document.getElementById('project')
const ctx = document.getElementById('profit-chart').getContext('2d')
const data = {
    labels:
        [], datasets:
        [{
            label: 'Lợi nhuận (VNĐ)',
            data: [],
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            backgroundColor: function (context) {
                const g = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
                g.addColorStop(0, 'rgba(0,230,118,0.18)');
                g.addColorStop(1, 'rgba(0,0,0,0)'); return g
            },
            borderColor: 'rgba(0,230,118,0.95)',
            borderWidth: 2
        }]
}

const chart = new Chart(ctx, {
    type: 'line', data: data,
    options: {
        animation: { duration: 400 },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: false },
            y: { display: false }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

let balance = 1200000;
let projectedCnt = 0;
balanceDisplay.innerText = '₫ ' + formatVnd(balance);

function pushPoint(value) {
    const now = new Date()
    const label = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0')
    data.labels.push(label)
    data.datasets[0].data.push(value)
    if (data.labels.length > 40) {
        data.labels.shift()
        data.datasets[0].data.shift()
    }
    chart.update()
}

function spawnToast(amount) {
    const t = document.createElement('div')
    t.className = 'toast'
    t.innerHTML = '<div>Đã rút: ₫ ' + formatVnd(amount)
        + '</div><div class="sub">Giao dịch hoàn tất</div>'
    toasts.prepend(t)

    const delay = 3500 + Math.random() * 3000
    t.style.animation = 'floatUp 1.2s ease forwards'

    setTimeout(function () {
        t.style.transition = 'opacity 400ms, transform 400ms'
        t.style.opacity = '0'
        t.style.transform = 'translateY(-20px)';

        setTimeout(function () {
            if (t.parentNode) t.parentNode.removeChild(t)
        }, 420)
    }, delay);
}

function feedDisplay(text) {
    const el = document.createElement('div')
    el.className = 'log-item'
    el.innerText = text
    feed.prepend(el)
    if (feed.childElementCount > 20) feed.removeChild(feed.lastChild)
}

// GEN RANDOM PROFIT
function randomAmount() {
    const min = 100000
    const max = 10000000
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let autoMode = false;
let burst = false;

// WITHDRAW
document.getElementById('withdraw').addEventListener('click', function () {
    const amount = randomAmount();

    balance += amount
    projectedCnt += Math.floor(amount * 0.04)
    balanceDisplay.innerText = '₫ ' + formatVnd(balance)
    project.innerText = '₫ ' + formatVnd(projectedCnt)

    spawnToast(amount)
    feedDisplay('Rút thành công: ₫ ' + formatVnd(amount) + ' • +' + Math.round(amount / 1000000) + 'M')
    pushPoint(Math.max(0, (data.datasets[0].data.length ? data.datasets[0].data[data.datasets[0].data.length - 1] : 0) + Math.round(amount / 5000)))

    if (document.getElementById('confettiToggle').checked) effect()
    if (document.getElementById('many').checked) {
        for (let i = 0; i < 6; i = i + 1) {
            setTimeout(function () {
                const a = randomAmount()
                spawnToast(a)
                feedDisplay('Rút: ₫ ' + formatVnd(a))

                balance += a
                balanceDisplay.innerText = '₫ ' + formatVnd(balance)
                pushPoint(data.datasets[0].data[data.datasets[0].data.length - 1] + Math.round(a / 5000))
            }, 220 * i)
        }
    }
})

// WITHDRAW AUTOMATICALLY
document.getElementById('auto').addEventListener('click', function () {
    autoMode = !autoMode
    this.innerText = autoMode ? 'Dừng' : 'Tự động (x10)'
    if (autoMode) {
        const interval = setInterval(function () {
            if (!autoMode) {
                clearInterval(interval)
                return
            }
            document.getElementById('withdraw').click()
        }, 700)
    }
})

function effect() {
    const wrap = document.getElementById('confetti')
    for (let i = 0; i < 40; i = i + 1) {
        const p = document.createElement('div')

        p.className = 'p'
        p.style.left = Math.random() * 100 + '%'
        p.style.top = Math.random() * 10 + '%'
        p.style.background = ['#00ff9d', '#00e676', '#a7ffeb', '#8cffc6'][Math.floor(Math.random() * 4)]
        p.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)'
        const dur = 2000 + Math.random() * 1800
        p.style.transition = 'transform ' + dur + 'ms linear, top ' + dur + 'ms linear, left ' + dur + 'ms linear, opacity 800ms'
        wrap.appendChild(p)

        setTimeout(function () {
            p.style.top = 90 + Math.random() * 10 + '%'
            p.style.left = Math.random() * 100 + '%'
            p.style.opacity = '0'

            setTimeout(function () {
                if (p.parentNode) p.parentNode.removeChild(p)
            }, dur + 120)
        }, 40)
    }
}

function notstonk() {
    const last = data.datasets[0].data.length ? data.datasets[0].data[data.datasets[0].data.length - 1] : 120000
    let up = Math.round(Math.random() * 800 + 200)
    const downChance = 0.3;

    if (Math.random() < downChance) {
        const down = Math.round(Math.random() * 220 + 40)
        pushPoint(Math.max(0, last - down))
        return
    }
    pushPoint(last + up);
}

setInterval(function () {
    notstonk()
}, 1500);

for (let i = 0; i < 8; i = i + 1)
    pushPoint(120000 + i * 800)