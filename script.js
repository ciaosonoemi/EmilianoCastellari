/* ========================================
   FUNZIONI JAVASCRIPT PER INTERATTIVITÀ
   ======================================== */

// Smooth scroll per i link di navigazione
document.addEventListener('DOMContentLoaded', function() {
    // ======== NAVIGAZIONE SMOOTH SCROLL ========
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Rimuovi active da tutti i link
                navLinks.forEach(l => l.classList.remove('active'));
                // Aggiungi active al link cliccato
                this.classList.add('active');
                
                // Scroll verso la sezione
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======== AGGIORNAMENTO NAV LINK DURANTE LO SCROLL ========
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ======== ANIMAZIONE CARD AL SCROLL ========
    const cards = document.querySelectorAll('.content-card, .inspiration-item, .writing-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ======== HOVER EFFETTO SULLE CARD ========
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // ======== ANIMAZIONE HERO BUTTON ========
    const heroButton = document.querySelector('.btn-primary');
    if (heroButton) {
        heroButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.4)';
        });
        
        heroButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    }

    // ======== EFFETTO PARALLAX (OPZIONALE) ========
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // ======== FUNZIONE PER AGGIUNGERE DINAMICAMENTE NUOVE CARD ========
    window.addFilm = function(title, genre, description, tags = []) {
        const filmSection = document.querySelector('#film .content-grid');
        
        const newCard = document.createElement('div');
        newCard.className = 'content-card';
        newCard.style.opacity = '0';
        newCard.style.transform = 'translateY(20px)';
        
        const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        newCard.innerHTML = `
            <div class="card-image film-icon">🎬</div>
            <h3>${title}</h3>
            <p class="card-meta">${genre}</p>
            <p>${description}</p>
            <div class="card-tags">${tagsHTML}</div>
        `;
        
        filmSection.appendChild(newCard);
        
        // Anima l'ingresso
        setTimeout(() => {
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
            newCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 10);
    };

    window.addMusic = function(artist, genre, description, tags = []) {
        const musicSection = document.querySelector('#musica .content-grid');
        
        const newCard = document.createElement('div');
        newCard.className = 'content-card';
        newCard.style.opacity = '0';
        newCard.style.transform = 'translateY(20px)';
        
        const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        newCard.innerHTML = `
            <div class="card-image music-icon">🎵</div>
            <h3>${artist}</h3>
            <p class="card-meta">${genre}</p>
            <p>${description}</p>
            <div class="card-tags">${tagsHTML}</div>
        `;
        
        musicSection.appendChild(newCard);
        
        // Anima l'ingresso
        setTimeout(() => {
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
            newCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 10);
    };

    window.addBook = function(title, author, description, tags = []) {
        const booksSection = document.querySelector('#letture .content-grid');
        
        const newCard = document.createElement('div');
        newCard.className = 'content-card';
        newCard.style.opacity = '0';
        newCard.style.transform = 'translateY(20px)';
        
        const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        newCard.innerHTML = `
            <div class="card-image book-icon">📚</div>
            <h3>${title}</h3>
            <p class="card-meta">${author}</p>
            <p>${description}</p>
            <div class="card-tags">${tagsHTML}</div>
        `;
        
        booksSection.appendChild(newCard);
        
        // Anima l'ingresso
        setTimeout(() => {
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
            newCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 10);
    };

    window.addWriting = function(title, date, excerpt, tags = []) {
        const writingsSection = document.querySelector('#scritti .writings-list');
        
        const newArticle = document.createElement('article');
        newArticle.className = 'writing-item';
        newArticle.style.opacity = '0';
        newArticle.style.transform = 'translateX(-20px)';
        
        const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        newArticle.innerHTML = `
            <div class="writing-header">
                <h3>${title}</h3>
                <span class="writing-date">${date}</span>
            </div>
            <p class="writing-excerpt">${excerpt}</p>
            <div class="writing-tags">${tagsHTML}</div>
        `;
        
        writingsSection.appendChild(newArticle);
        
        // Anima l'ingresso
        setTimeout(() => {
            newArticle.style.opacity = '1';
            newArticle.style.transform = 'translateX(0)';
            newArticle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 10);
    };

    // ======== CONSOLE LOG DI ESEMPIO (DA ELIMINARE IN PRODUZIONE) ========
    console.log('Il tuo sito personale è pronto! 🚀');
    console.log('Usa questi comandi da console per aggiungere contenuti:');
    console.log('addFilm("Titolo", "Genere", "Descrizione", ["tag1", "tag2"])');
    console.log('addMusic("Artista", "Genere", "Descrizione", ["tag1", "tag2"])');
    console.log('addBook("Titolo", "Autore", "Descrizione", ["tag1", "tag2"])');
    console.log('addWriting("Titolo", "Data", "Estratto", ["tag1", "tag2"])');
});