document.addEventListener('DOMContentLoaded', function() {

    // Attiva link navigazione corrente
    const navLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Gestisce il caso di root

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Gestione Form Guida
    const guideForm = document.getElementById('guideForm');
    if (guideForm) {
        guideForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene l'invio standard del form

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const participants = document.getElementById('participants').value;
            const formMessage = document.getElementById('form-message');

            formMessage.style.display = 'block'; // Mostra il box del messaggio
            formMessage.className = ''; // Resetta classi precedenti

            if (!name || !email || !date || !participants) {
                formMessage.textContent = 'Per favore, compila tutti i campi obbligatori.';
                formMessage.classList.add('error');
                return;
            }

            if (!validateEmail(email)) {
                formMessage.textContent = 'Per favore, inserisci un indirizzo email valido.';
                formMessage.classList.add('error');
                return;
            }
            
            // Simulazione invio (in un progetto reale, qui ci sarebbe una chiamata AJAX)
            console.log('Dati del form inviati:');
            console.log({
                name,
                email,
                phone: document.getElementById('phone').value.trim(),
                date,
                participants,
                preferences: document.getElementById('preferences').value.trim()
            });

            formMessage.textContent = 'Grazie! La tua richiesta è stata inviata. Ti contatteremo presto.';
            formMessage.classList.add('success');
            guideForm.reset(); // Pulisce il form dopo l'invio
            
            // Nascondi messaggio dopo qualche secondo
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Opzionale: Animazione per le card quando entrano nel viewport (Intersection Observer)
// Per attivarla:
// 1. Decommenta il codice JS qui sotto.
// 2. Aggiungi al CSS (dentro style.css) per .destination-card:
//    opacity: 0;
//    transform: translateY(30px);
//    /* La transizione è già definita in .destination-card, ma assicurati che ci sia: */
//    /* transition: opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease; */
/*
document.addEventListener('DOMContentLoaded', function() {
    // ... (codice esistente per navigazione e form)

    const cards = document.querySelectorAll('.destination-card');

    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // rispetto al viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger quando il 10% dell'elemento è visibile
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Smetti di osservare dopo l'animazione
                }
            });
        };

        const cardObserver = new IntersectionObserver(observerCallback, observerOptions);
        cards.forEach(card => {
            // Imposta lo stato iniziale per l'animazione (da fare prima che l'observer lo veda)
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            cardObserver.observe(card);
        });
    } else if (cards.length > 0) {
        // Fallback per browser senza IntersectionObserver (rende visibili subito)
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
});
*/