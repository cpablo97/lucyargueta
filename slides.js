const section = document.querySelector('.fotos')
const slides = section.querySelectorAll('.fotos div')

let index = 0

let timeout

let paused = false

let pattern = [
    [4, 3, 5, 0, 0, 0],
    [4, 3, 5, 2, 0, 0],
    [0, 3, 2, 3, 0, 0],
    [0, 2, 1, 2, 1, 0],
    [0, 0, 5, 3, 4, 2],
    [0, 0, 0, 3, 5, 2],
]

const nextSlide = () => {
    index += 1
    index %= pattern.length

    section.style.gridTemplateColumns = pattern[index].map((p) => {
        return `${p}fr`
    }).join(' ')

    slides.forEach((slide, slideIndex) => {
        if(pattern[index][slideIndex] === 0) {
            slide.classList.add("hide")
        } else {
            slide.classList.remove("hide")
        }
    })
    clearTimeout(timeout)
    if (!paused) {
        timeout = setTimeout(nextSlide, 2000)
    }
}

section.addEventListener('mouseenter', () => {
    paused = true
    clearTimeout(timeout)
})

section.addEventListener('mouseleave', () => {
    paused = false
    timeout = setTimeout(nextSlide, 2000)
})

document.getElementById('next-slide').addEventListener('click', nextSlide)

timeout = setTimeout(nextSlide, 2000)

// Random blob movement
const blobs = document.querySelectorAll('.blob');

blobs.forEach(blob => {
    // Set random initial size
    const size = Math.random() * 300 + 200; // 200-500px
    blob.style.width = size + 'px';
    blob.style.height = size + 'px';
    
    // Set random initial position
    moveBlob(blob);
});

function moveBlob(blob) {
    const x = Math.random() * (window.innerWidth - parseFloat(blob.style.width));
    const y = Math.random() * (window.innerHeight - parseFloat(blob.style.height));
    blob.style.transform = `translate(${x}px, ${y}px)`;
}

// Move blobs every 3 seconds
setInterval(() => {
    blobs.forEach(blob => {
        moveBlob(blob);
    });
}, 3000);

