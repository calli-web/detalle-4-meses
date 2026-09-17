/* =========================================================
   DETALLE 4 MESES
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    /* Cantidad de estrellas */

    stars: 100,


    /* Velocidad del efecto hacker */

    hackerSpeed: 30,


    /*
     * AQUÍ VAMOS A CAMBIAR
     * LAS FRASES DE TU HISTORIA.
     */

    messages: [

        "Hay historias que comienzan sin que nos demos cuenta.",

        "Personas que llegan a nuestra vida poco a poco...",

        "Y un día nos damos cuenta de que ya ocupan un lugar especial.",

        "Contigo me pasó algo así.",

        "No sabía exactamente qué iba a pasar.",

        "Tenía miedo de equivocarme, pero decidí arriesgarme.",

        "Y hoy, después de cuatro meses...",

        "solamente puedo decir que me alegra muchísimo haberlo hecho."

    ]

};


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const canvas =
    document.getElementById("spaceCanvas");

const ctx =
    canvas.getContext("2d");


const heroTitle =
    document.getElementById("heroTitle");


const startButton =
    document.getElementById("startButton");


const messagesSection =
    document.getElementById("messages");


const messageText =
    document.getElementById("messageText");


const memoryNumber =
    document.getElementById("memoryNumber");


const continueButton =
    document.getElementById("continueButton");


const memoriesSection =
    document.getElementById("memories");


const originButton =
    document.getElementById("originButton");


const originSection =
    document.getElementById("origin");


const videoButton =
    document.getElementById("videoButton");


const videoSection =
    document.getElementById("videoSection");


const letterButton =
    document.getElementById("letterButton");


const letterSection =
    document.getElementById("letterSection");


const envelope =
    document.getElementById("envelope");


const letter =
    document.getElementById("letter");


const finalButton =
    document.getElementById("finalButton");


const finalSection =
    document.getElementById("final");


const particlesContainer =
    document.getElementById("particles");


const music =
    document.getElementById("backgroundMusic");


const audioButton =
    document.getElementById("audioButton");


/* =========================================================
   ESTRELLAS
========================================================= */

let stars = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


/* =========================================================
   CREAR ESTRELLAS
========================================================= */

function createStars() {

    stars = [];


    for (
        let i = 0;
        i < CONFIG.stars;
        i++
    ) {

        stars.push({

            x:
                Math.random()
                * canvas.width,

            y:
                Math.random()
                * canvas.height,

            radius:
                Math.random()
                * 1.7
                + 0.3,

            speedX:
                (
                    Math.random()
                    - 0.5
                )
                * 0.15,

            speedY:
                Math.random()
                * 0.30
                + 0.03,

            opacity:
                Math.random()
                * 0.8
                + 0.2,

            twinkle:
                Math.random()
                * 0.025
                + 0.005

        });

    }

}


createStars();


/* =========================================================
   ANIMAR ESTRELLAS
========================================================= */

function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star => {

        star.x +=
            star.speedX;

        star.y +=
            star.speedY;


        /*
         * Parpadeo
         */

        star.opacity +=

            star.twinkle
            *
            (
                Math.random() > 0.5
                    ? 1
                    : -1
            );


        star.opacity =

            Math.max(
                0.1,
                Math.min(
                    1,
                    star.opacity
                )
            );


        /*
         * Reiniciar estrella
         */

        if (
            star.y >
            canvas.height + 5
        ) {

            star.y = -5;

            star.x =
                Math.random()
                * canvas.width;
        }


        if (
            star.x <
            -5
        ) {

            star.x =
                canvas.width + 5;
        }


        if (
            star.x >
            canvas.width + 5
        ) {

            star.x = -5;
        }


        /*
         * Dibujar estrella
         */

        ctx.beginPath();


        ctx.arc(

            star.x,

            star.y,

            star.radius,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =

            `rgba(
                255,
                255,
                255,
                ${star.opacity}
            )`;


        ctx.fill();

    });


    requestAnimationFrame(
        animateStars
    );

}


animateStars();


/* =========================================================
   EFECTO HACKER
========================================================= */

const hackerCharacters =
    "01!@#$%^&*()_+~|?:{}[]<>/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function hackerEffect(
    element,
    finalText,
    callback
) {

    let frame = 0;


    const totalFrames =
        finalText.length * 4;


    const interval =
        setInterval(() => {

            let output = "";


            for (
                let i = 0;
                i < finalText.length;
                i++
            ) {

                if (
                    i <
                    frame / 4
                ) {

                    output +=
                        finalText[i];

                } else {

                    output +=

                        hackerCharacters[
                            Math.floor(
                                Math.random()
                                *
                                hackerCharacters.length
                            )
                        ];

                }

            }


            element.textContent =
                output;


            frame++;


            if (
                frame >
                totalFrames
            ) {

                clearInterval(
                    interval
                );


                element.textContent =
                    finalText;


                if (
                    typeof callback ===
                    "function"
                ) {

                    callback();

                }

            }

        }, CONFIG.hackerSpeed);

}


/* =========================================================
   TITULO INICIAL
========================================================= */

hackerEffect(

    heroTitle,

    "UNA HISTORIA DE DOS"

);


/* =========================================================
   SECUENCIA DE MENSAJES
========================================================= */

let currentMessage = 0;


function showSection(
    section
) {

    section.classList.add(
        "visible"
    );


    setTimeout(() => {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}


function showMessage(index) {

    memoryNumber.textContent =

        String(index + 1)
        .padStart(3, "0");


    hackerEffect(

        messageText,

        CONFIG.messages[index]

    );

}


/* =========================================================
   BOTÓN INICIAR
========================================================= */

startButton.addEventListener(
    "click",
    () => {

        showSection(
            messagesSection
        );


        currentMessage = 0;


        setTimeout(() => {

            showMessage(
                currentMessage
            );

        }, 400);


        createParticles(10);

    }
);


/* =========================================================
   BOTÓN CONTINUAR
========================================================= */

continueButton.addEventListener(
    "click",
    () => {

        currentMessage++;


        /*
         * Todavía quedan mensajes
         */

        if (
            currentMessage <
            CONFIG.messages.length
        ) {

            showMessage(
                currentMessage
            );

            createParticles(4);

            return;
        }


        /*
         * Terminamos los mensajes
         */

        continueButton.disabled =
            true;

        continueButton.textContent =
            "[ MEMORIAS DESBLOQUEADAS ]";


        continueButton.style.opacity =
            "0.45";


        showSection(
            memoriesSection
        );


        createParticles(20);

    }
);


/* =========================================================
   TODO COMENZÓ AQUÍ
========================================================= */

originButton.addEventListener(
    "click",
    () => {

        showSection(
            originSection
        );


        createParticles(10);

    }
);


/* =========================================================
   VIDEO
========================================================= */

videoButton.addEventListener(
    "click",
    () => {

        showSection(
            videoSection
        );

    }
);


/* =========================================================
   CARTA
========================================================= */

letterButton.addEventListener(
    "click",
    () => {

        showSection(
            letterSection
        );

    }
);


/* =========================================================
   ABRIR CARTA
========================================================= */

envelope.addEventListener(
    "click",
    () => {

        envelope.style.display =
            "none";


        letter.classList.add(
            "open"
        );


        finalButton.classList.remove(
            "hidden-button"
        );


        createParticles(30);

    }
);


/* =========================================================
   FINAL
========================================================= */

finalButton.addEventListener(
    "click",
    () => {

        showSection(
            finalSection
        );


        createParticles(100);

    }
);


/* =========================================================
   PARTÍCULAS
========================================================= */

function createParticles(
    amount = 20
) {

    const symbols = [

        "♥",

        "❤",

        "♡",

        "✦",

        "✧",

        "★"

    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.textContent =

            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ];


        particle.style.left =

            Math.random()
            * 100
            + "%";


        particle.style.fontSize =

            Math.random()
            * 18
            + 10
            + "px";


        particle.style.animationDuration =

            Math.random()
            * 5
            + 5
            + "s";


        particle.style.setProperty(

            "--move",

            (
                Math.random()
                * 200
                - 100
            )
            + "px"

        );


        particle.style.color =

            Math.random() > 0.5

                ? "#ff007f"

                : "#8a2be2";


        particlesContainer.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            11000
        );

    }

}


/* =========================================================
   AUDIO
========================================================= */

let audioPlaying = false;


/*
 * Intentar autoplay.
 *
 * El navegador puede bloquearlo.
 */

window.addEventListener(
    "load",
    async () => {

        try {

            await music.play();

            audioPlaying = true;

            updateAudioButton();

        } catch (error) {

            audioPlaying = false;

            updateAudioButton();

        }

    }
);


/* =========================================================
   ACTUALIZAR BOTÓN AUDIO
========================================================= */

function updateAudioButton() {

    if (
        audioPlaying
    ) {

        audioButton.textContent =
            "🔊 AUDIO ON";

    } else {

        audioButton.textContent =
            "🔇 AUDIO OFF";

    }

}


/* =========================================================
   BOTÓN AUDIO
========================================================= */

audioButton.addEventListener(
    "click",
    async () => {

        try {

            if (
                music.paused
            ) {

                await music.play();

                audioPlaying = true;

            } else {

                music.pause();

                audioPlaying = false;

            }


            updateAudioButton();

        } catch (error) {

            console.error(
                "No se pudo reproducir el audio:",
                error
            );

        }

    }
);


/* =========================================================
   EVENTOS DEL AUDIO
========================================================= */

music.addEventListener(
    "play",
    () => {

        audioPlaying = true;

        updateAudioButton();

    }
);


music.addEventListener(
    "pause",
    () => {

        audioPlaying = false;

        updateAudioButton();

    }
);


/* =========================================================
   EFECTO 3D DE LAS TARJETAS
========================================================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


memoryCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =

                (
                    x /
                    rect.width
                    -
                    0.5
                )
                * 10;


            const rotateX =

                (
                    y /
                    rect.height
                    -
                    0.5
                )
                * -10;


            card.style.transform =

                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   METEORITOS
========================================================= */

function createMeteor() {

    const meteor = {

        x:
            Math.random()
            * canvas.width,

        y:
            Math.random()
            * canvas.height
            * 0.45,

        length:
            Math.random()
            * 70
            + 35,

        speed:
            Math.random()
            * 5
            + 5,

        life: 0,

        maxLife: 45

    };


    function drawMeteor() {

        meteor.x +=
            meteor.speed;

        meteor.y +=
            meteor.speed;


        meteor.life++;


        const opacity =

            1 -
            (
                meteor.life /
                meteor.maxLife
            );


        ctx.beginPath();


        ctx.moveTo(

            meteor.x,

            meteor.y

        );


        ctx.lineTo(

            meteor.x -
            meteor.length,

            meteor.y -
            meteor.length

        );


        ctx.strokeStyle =

            `rgba(
                255,
                255,
                255,
                ${opacity}
            )`;


        ctx.lineWidth = 1;


        ctx.stroke();


        if (
            meteor.life <
            meteor.maxLife
        ) {

            requestAnimationFrame(
                drawMeteor
            );

        }

    }


    drawMeteor();

}


/*
 * Meteoritos ocasionales.
 */

setInterval(
    () => {

        if (
            Math.random() >
            0.35
        ) {

            createMeteor();

        }

    },
    2500
);


/* =========================================================
   CLICK EN BOTONES
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.matches(
                ".cyber-button"
            )
        ) {

            createParticles(5);

        }

    }
);


/* =========================================================
   MENSAJE DE CONSOLA
========================================================= */

console.log(
    "%c♥ DETALLE 4 MESES ♥",
    "color:#ff007f;font-size:20px;font-weight:bold;"
);

console.log(
    "%cSistema iniciado correctamente.",
    "color:#00ff00;"
);