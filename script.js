document.addEventListener('DOMContentLoaded', () => {
    // Dynamic 'Vagas Restantes' simulator
    const updateVagas = () => {
        const statusText = document.querySelector('.status');
        if (statusText) {
            let currentVagas = 23;
            const interval = setInterval(() => {
                if (currentVagas > 3) {
                    currentVagas -= Math.floor(Math.random() * 2);
                    statusText.innerHTML = `<span class="dot"></span> Online - ${currentVagas} vagas restantes`;
                } else {
                    clearInterval(interval);
                }
            }, 15000); // Updates every 15 seconds
        }
    };

    updateVagas();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .step, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Tracking for TikTok (Example)
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source');
    if (source === 'tiktok') {
        console.log('User came from TikTok - applying specific optimizations if needed');
    }
    
    // Notifications System
    const notifications = [
        { title: 'Novo Cupom!', text: 'Cupom de 20% OFF na Shopee detectado!', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg' },
        { title: 'Oferta Relâmpago!', text: 'iPhone 15 com R$ 1.500 de desconto na Amazon!', img: 'https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg' },
        { title: 'Bug de Preço!', text: 'Smart TV 55" por R$ 1.200 no Mercado Livre!', img: 'https://logopng.com.br/logos/mercado-livre-88.png' },
        { title: 'Novo Membro!', text: 'Ricardo Santos acaba de entrar no grupo VIP!', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
        { title: 'Cupom Secreto!', text: 'Liberado cupom de frete grátis sem valor mínimo!', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { title: 'Oferta Detectada!', text: 'Fraldas Pampers com 50% de desconto na Shopee!', img: 'https://images.tcdn.com.br/img/img_prod/697722/fralda_pampers_confort_sec_pacotao_g_60_unidades_2115_1_20200925144824.jpg' }
    ];

    const showNotification = () => {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const rand = notifications[Math.floor(Math.random() * notifications.length)];
        const el = document.createElement('div');
        el.className = 'notification';
        el.style.cursor = 'pointer';
        el.innerHTML = `
            <div class="notification-img-wrapper">
                <img src="${rand.img}" alt="Icon" class="notification-img" onerror="this.src='logo-removebg-preview.png'">
            </div>
            <div class="notification-content">
                <b>${rand.title}</b>
                <span>${rand.text}</span>
            </div>
        `;

        // Click interaction
        el.addEventListener('click', () => {
            const modal = document.getElementById('promo-modal');
            modal.classList.add('active');
        });

        container.appendChild(el);

        // Remove from DOM after animation
        setTimeout(() => {
            if (el.parentNode) el.remove();
        }, 5000);

        // Schedule next notification
        setTimeout(showNotification, Math.random() * 5000 + 5000);
    };

    // Close Modal Logic
    const modal = document.getElementById('promo-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Start notifications after a small delay
    setTimeout(showNotification, 3000);
});
