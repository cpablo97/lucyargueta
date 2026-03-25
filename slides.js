const section = document.querySelector('.fotos')

const isMobile = () => window.matchMedia('(max-width: 767px)').matches

// ---- Desktop: animated grid ---------------------------------

let index = 0
let timeout
let paused = false

const pattern = [
    [4, 2, 5, 0, 0, 0],
    [4, 3, 5, 2, 0, 0],
    [0, 3, 2, 3, 0, 0],
    [0, 2, 1, 2, 1, 0],
    [0, 0, 5, 3, 4, 2],
    [0, 0, 0, 3, 5, 2],
]

const nextGridSlide = () => {
    if (!section) return
    index = (index + 1) % pattern.length
    section.style.gridTemplateColumns = pattern[index].map(p => `${p}fr`).join(' ')
    clearTimeout(timeout)
    if (!paused) {
        timeout = setTimeout(nextGridSlide, 2000)
    }
}

const pauseAnimation = () => {
    paused = true
    clearTimeout(timeout)
}

const resumeAnimation = () => {
    paused = false
    timeout = setTimeout(nextGridSlide, 2000)
}

const startDesktopAnimation = () => {
    if (!section) return
    clearTimeout(timeout)
    section.addEventListener('mouseenter', pauseAnimation)
    section.addEventListener('mouseleave', resumeAnimation)
    if (!paused) {
        timeout = setTimeout(nextGridSlide, 2000)
    }
}

const stopDesktopAnimation = () => {
    if (!section) return
    clearTimeout(timeout)
    paused = false
    section.style.gridTemplateColumns = ''
}

// ---- Mobile: scroll snap slider -----------------------------

const scrollToNextCard = () => {
    const cards = Array.from(section.querySelectorAll('.fotos > div'))
    const sectionLeft = section.getBoundingClientRect().left

    for (const card of cards) {
        const cardLeft = card.getBoundingClientRect().left
        if (cardLeft > sectionLeft + 10) {
            section.scrollBy({ left: cardLeft - sectionLeft, behavior: 'smooth' })
            return
        }
    }
    // Reached the end — loop back to start
    section.scrollTo({ left: 0, behavior: 'smooth' })
}

// ---- Button: grid on desktop, scroll on mobile --------------



// ---- Init & handle resize -----------------------------------

const init = () => {
    if (isMobile()) {
        stopDesktopAnimation()
    } else {
        startDesktopAnimation()
    }
}

window.matchMedia('(max-width: 767px)').addEventListener('change', init)

init()

// ---- Background blob animation ------------------------------

const blobs = document.querySelectorAll('.blob')

blobs.forEach(blob => {
    const size = Math.random() * 300 + 200
    blob.style.width = size + 'px'
    blob.style.height = size + 'px'
    moveBlob(blob)
})

function moveBlob(blob) {
    const x = Math.random() * (window.innerWidth - parseFloat(blob.style.width))
    const y = Math.random() * (window.innerHeight - parseFloat(blob.style.height))
    blob.style.transform = `translate(${x}px, ${y}px)`
}

setInterval(() => {
    blobs.forEach(moveBlob)
}, 3000)
