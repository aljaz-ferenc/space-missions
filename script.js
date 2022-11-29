gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(Draggable)

const planet = document.querySelector('.planet img')
const satelites = document.querySelectorAll('.satelite__image')
const satelitesContainer = document.querySelector('.satelites')
const sateliteOptions = document.querySelectorAll('.info__navigation--item')
const sateliteImages = document.querySelectorAll('.satelite__image')
const backgroundFront = document.querySelector('.background__front')
const backgroundBack = document.querySelector('.background__back')
const earthSection = document.querySelector('.display-earth')
const marsSection = document.querySelector('.display-mars')
const moonSection = document.querySelector('.display-moon')
const earthBtn = document.querySelector('.menu__items--earth').parentElement
const marsBtn = document.querySelector('.menu__items--mars').parentElement
const moonBtn = document.querySelector('.menu__items--moon').parentElement
const satelite1 = document.querySelector('.image1')
const satelite2 = document.querySelector('.image2')
const satelite3 = document.querySelector('.image3')
const satelite4 = document.querySelector('.image4')
const cardsLeft = document.querySelectorAll('.exploration-container--left .explorations__image')
const cardsRight = document.querySelectorAll('.exploration-container--right .explorations__image')
const years = document.querySelectorAll('.year')
const scroll = document.querySelector('.scroll')
const gallery = document.querySelector('.gallery__container')
const galleryImages = document.querySelectorAll('.gallery__container--image')
const explorationsSection = document.querySelector('#explorations')
const explorationsLink = document.querySelector('.menu__items--missions')
const galleryLink = document.querySelector('.menu__items--gallery')
const scrollToTop = document.querySelector('.to-top')
const heroSection = document.querySelector('.hero')
const satelitesAll = document.querySelectorAll('.satelite')
const infoText = document.querySelector('.info__text')
const infoHeading = document.querySelector('.info__heading')
const body = document.querySelector('body')
const mobileMars = document.querySelector('.mobile__mars img')
const mobileEarth = document.querySelector('.mobile__earth img')
const mobileMoon = document.querySelector('.mobile__moon img')

//Scroll progress bar
window.addEventListener('scroll', (e) => {
    const height = document.body.clientHeight - window.innerHeight
    const percentage = (window.pageYOffset / height) * 100
    scroll.style.width = `${percentage}%`
})

//Changing planets
marsBtn.addEventListener('click', () => {
    if(currentPlanet === 'mars') return
    currentPlanet = 'mars'
    changeSateliteImg()
    printInfo()
    planet.classList.remove('moon')
    planet.classList.add('mars')
    planet.classList.remove('earth')
    planet.srcset="images/planets/mars1500ll.webp 1500w, images/planets/mars700.webp 700w" 
    planet.sizes = "(max-width: 425px) 100vw, (max-width: 1200px) 100vw"
    planet.src = '/images/planets/mars1500ll.webp'
    mobileMars.classList.add('mobile-outline')
    mobileEarth.classList.remove('mobile-outline')
    mobileMoon.classList.remove('mobile-outline')
})
earthBtn.addEventListener('click', () => {
    if(currentPlanet === 'earth') return
    currentPlanet = 'earth'
    changeSateliteImg()
    printInfo()
    planet.classList.remove('moon')
    planet.classList.remove('mars')
    planet.classList.add('earth')
    planet.srcset="images/planets/earth1500ll.webp 1500w, images/planets/earth700.webp 700w" 
    planet.sizes = "(max-width: 425px) 100vw, (max-width: 1200px) 100vw"
    planet.src = '/images/planets/earth1500ll.webp'
    mobileEarth.classList.add('mobile-outline')
    mobileMoon.classList.remove('mobile-outline')
    mobileMars.classList.remove('mobile-outline')
})

moonBtn.addEventListener('click', () => {
    if(currentPlanet === 'moon') return
    currentPlanet = 'moon'
    changeSateliteImg()
    printInfo()
    planet.classList.add('moon')
    planet.classList.remove('mars')
    planet.classList.remove('earth')
    planet.srcset="images/planets/moon1500.webp 1500w, images/planets/moon700.webp 700w" 
    planet.sizes = "(max-width: 425px) 100vw, (max-width: 1200px) 100vw"
    planet.src = '/images/planets/moon1500.webp'
    mobileMoon.classList.add('mobile-outline')
    mobileEarth.classList.remove('mobile-outline')
    mobileMars.classList.remove('mobile-outline')
})

document.querySelector('.satelites').style.zIndex = '-1'
let currentState = 1
let currentPlanet = 'earth'
const earth = {
    1: ["The Hubble Space Telescope (often referred to as HST or Hubble) is a space telescope that was launched into low Earth orbit in 1990 and remains in operation. Hubble features a 2.4 m mirror, and its five main instruments observe in the ultraviolet, visible, and near-infrared regions of the electromagnetic spectrum. Hubble's orbit outside the distortion of Earth's atmosphere allows it to capture extremely high-resolution images with substantially lower background light than ground-based telescopes. It has recorded some of the most detailed visible light images, allowing a deep view into space. Many Hubble observations have led to breakthroughs in astrophysics, such as determining the rate of expansion of the universe.", 'Hubble Space Telescope'],
    2: ["The James Webb Space Telescope (JWST) is a space telescope which conducts infrared astronomy. As the largest optical telescope in space, its high resolution and sensitivity allow it to view objects too old, distant, or faint for the Hubble Space Telescope. This will enable investigations across many fields of astronomy and cosmology, such as observation of the first stars, the formation of the first galaxies, and detailed atmospheric characterization of potentially habitable exoplanets.", 'James Webb Space Telescope'],
    3: ["The Kepler space telescope is a retired space telescope launched by NASA in 2009 to discover Earth-size planets orbiting other stars. Designed to survey a portion of Earth's region of the Milky Way to discover Earth-size exoplanets in or near habitable zones and estimate how many of the billions of stars in the Milky Way have such planets, Kepler's sole scientific instrument is a photometer that continually monitored the brightness of approximately 150,000 main sequence stars in a fixed field of view. Kepler observed 530,506 stars and detected 2,662 planets. After nine and a half years of operation, the telescope's reaction control system fuel was depleted, and NASA announced its retirement on October 30, 2018.", 'The Kepler Space Telescope'],
    4: ["Voyager 1 is a space probe launched by NASA on September 5, 1977, as part of the Voyager program to study the outer Solar System and interstellar space beyond the Sun's heliosphere. Launched 16 days after its twin Voyager 2, Voyager 1 has been operating for 45 years. Voyager 1 crossed the heliopause and entered interstellar space on August 25, 2012, making it the first spacecraft to do so. At a distance of 158.79 AU (14.760 billion mi) from Earth as of November 7, 2022, it is the most distant man-made object from Earth. Voyager 1's extended mission is expected to continue until about 2025, when its radioisotope thermoelectric generators (RTGs) will no longer supply enough electric power to operate its scientific instruments.", 'Voyager 1']
}

const mars = {
    1: ["Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory (MSL) mission. Curiosity was launched from Cape Canaveral (CCAFS) on 26 November 2011, at 15:02:00 UTC and landed on Aeolis Palus inside Gale crater on Mars on 6 August 2012, 05:17:57 UTC after a 560 million km (350 million mi) journey. Mission goals include an investigation of the Martian climate and geology, assessment of whether the selected field site inside Gale has ever offered environmental conditions favorable for microbial life (including investigation of the role of water), and planetary habitability studies in preparation for human exploration.", 'Curiosity'],
    2: ["Perseverance, nicknamed Percy, is a car-sized Mars rover designed to explore the Jezero crater on Mars as part of NASA's Mars 2020 mission. Confirmation that the rover successfully landed on Mars was received on 18 February 2021, at 20:55 UTC. Perseverance has a similar design to its predecessor rover, Curiosity, although it was moderately upgraded. It carries seven primary payload instruments, nineteen cameras, and two microphones. The rover's goals include identifying ancient Martian environments capable of supporting life, seeking out evidence of former microbial life existing in those environments, collecting rock and soil samples to store on the Martian surface, and testing oxygen production from the Martian atmosphere to prepare for future crewed missions.", 'Perseverance'],
    3: ["Ingenuity, nicknamed Ginny, is a small robotic helicopter operating on Mars as part of NASA's Mars 2020 mission along with the Perseverance rover, which landed with Ingenuity attached to its underside on February 18, 2021. The helicopter was deployed to the surface on April 3, 2021, and on April 19 successfully made the first powered controlled extraterrestrial flight by an aircraft, taking off vertically, hovering and landing for a flight duration of 39.1 seconds. Because radio signals take 5 to 20 minutes to travel between Earth and Mars depending on planetary positions, Ingenuity must operate autonomously, performing maneuvers planned, scripted and transmitted to it by JPL. Ingenuity carries a piece of fabric from the wing of the 1903 Wright Flyer, the Wright Brothers' airplane used in the first controlled powered heavier-than-air flight on Earth. Ingenuity's initial take-off and landing area is named Wright Brothers Field as a tribute.", 'Ingenuity'],
    4: ["The Interior Exploration using Seismic Investigations, Geodesy and Heat Transport (InSight) mission is a robotic lander designed to study the deep interior of the planet Mars. The mission launched on 5 May 2018 at 11:05:01 UTC aboard an Atlas V-401 launch vehicle and successfully landed at Elysium Planitia on Mars on 26 November 2018 at 19:52:59 UTC. InSight's objectives are to place a seismometer, called Seismic Experiment for Interior Structure (SEIS), on the surface of Mars to measure seismic activity and provide accurate 3D models of the planet's interior; and measure internal heat transfer using a heat probe called HP3 to study Mars' early geological evolution. This could bring a new understanding of how the Solar System's terrestrial planets – Mercury, Venus, Earth, Mars – and Earth's Moon form and evolve.", 'InSight']
}

const moon = {
    1: ["Luna 2 (Russian: Луна 2), originally named the Second Soviet Cosmic Rocket and nicknamed Lunik 2 in contemporaneous media, was the sixth of the Soviet Union's Luna programme spacecraft launched to the Moon, E-1 No.7. It was the first spacecraft to reach the surface of the Moon, and the first human-made object to make contact with another celestial body. The spacecraft was launched on 12 September 1959 by the Luna 8K72 s/n I1-7B rocket. It followed a direct path to the Moon. In addition to the radio transmitters sending telemetry information back to Earth, the spacecraft released a sodium gas cloud so the spacecraft's movement could be visually observed. On 13 September 1959, it impacted the Moon's surface east of Mare Imbrium near the craters Aristides, Archimedes, and Autolycus. Prior to impact, two sphere-shaped pennants with USSR and the launch date engraved in Cyrillic were detonated, sending pentagonal shields in all directions. Luna 2 did not detect radiation or magnetic belts around the Moon.", 'Luna 2'],
    2: ["'One small step for man, a giant leap for mankind' - this is probably one of the most famous things anyone has ever said. Neil Armstrong made the momentous remarks as he stepped out of the landing craft to become the first human to walk on the Moon. This incredible moment in history happened on the 20 July in 1969, when America sent Neil Armstrong, Buzz Aldrin and Michael Collins into space, aboard the Apollo 11 mission. After being sent to the Moon by the Saturn V's third stage, the astronauts separated the spacecraft from it and traveled for three days until they entered lunar orbit. Armstrong and Aldrin then moved into Eagle and landed in the Sea of Tranquility on July 20. Armstrong's first steps on the Moon were broadcast live on television across the world.", 'Apollo 11'],
    3: ["Apollo 15 (July 26 – August 7, 1971) was the ninth crewed mission in the United States' Apollo program and the fourth to land on the Moon. It was the first J mission, with a longer stay on the Moon and a greater focus on science than earlier landings. The first Lunar Rover was used during the Apollo 15 mission on the 31 July 1971. A space rover is a vehicle which travels along the surface of the Moon and is equipped with tools to perform various experiments by itself. The first rover had four-wheels and was battery-powered. Since then, technology has advanced and many Moon rovers have landed on the Moon. They've collected hugely important material for scientists to study back on Earth.", 'Apollo 15'],
    4: ["The Lunar Reconnaissance Orbiter (LRO) is a NASA robotic spacecraft currently orbiting the Moon in an eccentric polar mapping orbit. Data collected by LRO have been described as essential for planning NASA's future human and robotic missions to the Moon. Its detailed mapping program is identifying safe landing sites, locating potential resources on the Moon, characterizing the radiation environment, and demonstrating new technologies. The probe has made a 3-D map of the Moon's surface at 100-meter resolution and 98.2% coverage (excluding polar areas in deep shadow), including 0.5-meter resolution images of Apollo landing sites. As of 2019, LRO has enough fuel to continue operations for at least seven more years, and NASA expects to continue utilizing LRO's reconnaissance capabilities to identify sites for lunar landers well into the 2020s.", 'The Lunar Reconnaissance Orbiter']
}


//Smooth scrolling
explorationsLink.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: explorationsSection })
})
galleryLink.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: gallery })
})
scrollToTop.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: document.querySelector('header') })
})
mobileEarth.classList.add('mobile-outline')

document.querySelectorAll('.mobile-item').forEach(item => {
    gsap.to(item, {
        rotate: 360,
        repeat: -1,
        duration: 10,
        ease: 'linear'
    })
})


//Manage state based on clicked satelite
function manageState() {

    sateliteOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            currentState = +opt.dataset.value
            showInfo()
            displayNav()
            changeSateliteImg()
            printInfo()
        })
    })

    window.addEventListener('keydown', (e) => {
        console.log(e.key)
        if (e.key === 'ArrowRight' && currentState < 4) {
            currentState++
            showInfo()
            displayNav()
        } else if (e.key === 'ArrowRight' && currentState === 4) {
            return
        }
        if (e.key === 'ArrowLeft' && currentState > 1) {
            currentState--
            showInfo()
            displayNav()
        } else if (e.key === 'ArrowLeft' && currentState <= 1) {
            return
        }
        changeSateliteImg()
        printInfo()
    })
}
manageState()


function showInfo() {
    document.querySelectorAll('.info__satelite').forEach(sat => {
        if (currentState === +sat.dataset.value) {
            sat.classList.add('active')
        } else {
            sat.classList.remove('active')
        }
    })
}
showInfo()


function displayNav() {
    document.querySelectorAll('.outline').forEach(el => {
        if (el.classList.contains(currentState)) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    })
}
displayNav()


//Animations
function changeSateliteImg() {
    let tl = gsap.timeline({})
    tl.to(satelite1, {
        y: '-300%',
        onComplete: () => satelite1.src = `images/satelites/${currentPlanet}/${currentState}.webp`
    })
    tl.to(satelite1, {
        y: '-2rem',
    })
}


function planetRotate() {
    gsap.to(planet, {
        rotate: '-360deg',
        duration: 300,
        repeat: -1,
        ease: Linear.easeNone
    })
}
planetRotate()


async function printInfo() {
    infoText.textContent = ''
    switch (currentPlanet) {
        case 'earth': planetText = earth
            break
        case 'mars': planetText = mars
            break
        case 'moon': planetText = moon
            break
    }

    let text = planetText[currentState][0]
    infoHeading.textContent = planetText[currentState][1]

    for (let i = 0; i < text.length; i++) {
        let prevState = currentState
        let prevPlanet = currentPlanet
        await delay(10)
        infoText.textContent = infoText.textContent + text[i]
        if (prevState !== currentState || prevPlanet !== currentPlanet) {
            infoText.textContent = ''
            break
        }
    }
}
printInfo()


function delay(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

CustomEase.create('sateliteEase', 'M0,0,C0.498,0.014,0.492,1,1,1')


function sateliteHover() {
    gsap.to(satelites, {
        y: '100px',
        duration: 3,
        yoyo: 'true',
        repeat: -1,
        ease: 'sateliteEase'
    })
}
sateliteHover()


//Background parallax effect
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX) / 100
    const y = (window.innerHeight - e.pageY) / 100
    backgroundFront.style.transform = `translateX(${x}px) translateY(${y}px)`
})

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX) / 200
    const y = (window.innerHeight - e.pageY) / 200
    backgroundBack.style.transform = `translateX(${x}px) translateY(${y}px)`
})


//Shooting stars
function shootingStar() {
    body.insertAdjacentHTML('afterbegin', `
    <div class="shooting-star__container">
    <div class="shooting-star"></div>
    </div>
    `)

    const star = document.querySelector('.shooting-star')
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const top = randomInt(0, 20)
    const left = randomInt(40, 60)

    star.style.top = `${top}%`
    star.style.left = `${left}%`

    const shootingStars = [
        { rotation: 30, y: 2000, x: 3000 },
        { rotation: 45, y: 3000, x: 2800 },
        { rotation: 60, y: 3500, x: 1800 },
        { rotation: 160, y: 1000, x: -3000 },
        { rotation: 175, y: 200, x: -3000 },
        { rotation: 190, y: -500, x: -3000 },
        { rotation: 200, y: -1000, x: -3000 },
        { rotation: 220, y: -2000, x: -3000 },
        { rotation: 240, y: -3000, x: -2000 },
        { rotation: -100, y: -3000, x: -1000 },
        { rotation: -90, y: -3000, x: -500 },
        { rotation: -80, y: -3000, x: 100 },
        { rotation: -40, y: -2000, x: 2000 },
        { rotation: -20, y: -1000, x: 2000 },
        { rotation: 0, y: -100, x: 3000 },
        { rotation: 20, y: 1100, x: 3000 },
    ]

    const randomNum = Math.floor(Math.random() * shootingStars.length)

    gsap.fromTo(star, {
        rotation: shootingStars[randomNum].rotation,
        width: 1,
        height: 1,
    }, {
        duration: 2,
        y: shootingStars[randomNum].y,
        x: shootingStars[randomNum].x,
        width: 800,
        onComplete: () => star.parentElement.remove()
    })
}
setInterval(shootingStar, 10000);


//Timeline animations with lazy loading
function animateCards() {
    cardsLeft.forEach(card => {
        gsap.from(card, {
            x: -200,
            duration: .5,
            autoAlpha: 0,
            ease: 'back(1)',
            scrollTrigger: {
                trigger: card,
                start: 'top 70%',
            },
            onStart: () => {
                let src = card.querySelector('img').dataset.src
                card.querySelector('img').setAttribute('src', src) 
        },
            onComplete: () => animateText(card)
        })
    })

    cardsRight.forEach(card => {
        gsap.from(card, {
            x: 200,
            duration: .5,
            autoAlpha: 0,
            ease: 'back(1)',
            scrollTrigger: {
                trigger: card,
                start: 'top 70%',
            },
            onStart: () => {
                let src = card.querySelector('img').dataset.src
                card.querySelector('img').setAttribute('src', src) 
            },
            onComplete: () => animateText(card)
        })
    })
}
animateCards()


function animateText(card) {
    const text = card.nextElementSibling
    gsap.fromTo(text, {
        y: 20,
        opacity: 0,
        duration: 0.5
    },
        {
            y: 0,
            opacity: 1
        })
}


years.forEach(year => {
    gsap.to(year, {
        onStart: () => countUp(year),
        scrollTrigger: {
            trigger: year,
            start: 'top 90%'
        }
    })
})


async function countUp(year) {
    let x = +year.textContent
    year.style.opacity = 1

    for (let i = 0; i <= x; i += 31) {
        await delay(10)
        year.textContent = i
    }

    year.textContent = x
}


function delay(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}


function scrollToTopBtn() {
    gsap.to(scrollToTop, {
        opacity: 1,
        reversed: true,
        scrollTrigger: {
            trigger: scrollToTop,
            start: "bottom 99%",
            end: "bottom bottom",
            toggleActions: 'play none reset none'
        }
    })
}
scrollToTopBtn()



