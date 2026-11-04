/*========== configuração ==========*/
// Coloque aqui o e-mail que deve receber as mensagens do formulário de contato.
// Enquanto estiver vazio, o formulário avisa o visitante para usar o LinkedIn.
const CONTACT_EMAIL = '';


/*========== menu icon navbar ==========*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

function setMenu(open) {
    menuIcon.classList.toggle('bx-x', open);
    navbar.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', String(open));
    menuIcon.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

menuIcon.addEventListener('click', () => {
    setMenu(!navbar.classList.contains('active'));
});

// fecha o menu ao clicar em um link (no celular)
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});


/*========== scroll: link ativo + header fixo ==========*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');

function onScroll() {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            const id = sec.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });

    header.classList.toggle('sticky', top > 100);
}

window.addEventListener('scroll', () => {
    onScroll();
    setMenu(false);
}, { passive: true });
onScroll();


/*========== dark / light mode (lembra a escolha) ==========*/
const darkModeIcon = document.querySelector('#darkMode-icon');

function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    darkModeIcon.classList.toggle('bx-sun', dark);
    darkModeIcon.classList.toggle('bx-moon', !dark);
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) { }

applyTheme(savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches);

darkModeIcon.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    applyTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { }
});


/*========== formulário de contato ==========*/
const form = document.querySelector('#contact-form');
const formStatus = form.querySelector('.form-status');

form.addEventListener('submit', event => {
    event.preventDefault();

    if (!CONTACT_EMAIL) {
        formStatus.textContent = 'O formulário ainda não está configurado. Me chame pelo LinkedIn!';
        return;
    }

    const data = new FormData(form);
    const body =
        `Nome: ${data.get('nome')}\n` +
        `Email: ${data.get('email')}\n` +
        `Celular: ${data.get('celular') || '-'}\n\n` +
        `${data.get('mensagem')}`;

    window.location.href =
        `mailto:${CONTACT_EMAIL}` +
        `?subject=${encodeURIComponent(data.get('assunto'))}` +
        `&body=${encodeURIComponent(body)}`;

    formStatus.textContent = 'Abrindo seu aplicativo de e-mail...';
});


/*========== ano no rodapé ==========*/
document.querySelector('#year').textContent = new Date().getFullYear();


/*========== scroll reveal ==========*/
if (window.ScrollReveal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
}
