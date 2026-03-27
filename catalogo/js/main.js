import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');
    const kidsLink = document.querySelector('.kids-link');
    const profileIcon = document.querySelector('.profile-icon');

    if (kidsLink && nomePerfil) kidsLink.textContent = nomePerfil;
    if (profileIcon && imagemPerfil) {
        const isRelativePath = !imagemPerfil.startsWith('/') && !imagemPerfil.includes(':');
        profileIcon.src = isRelativePath ? `../${imagemPerfil}` : imagemPerfil;
    }

    document.body.classList.add('profile-ready');

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
