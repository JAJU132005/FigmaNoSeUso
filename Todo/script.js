// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true
    });
    
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle && closeMenu && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
      });
      
      closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
      
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
        });
      });
    }
    
    // Slider de promociones
    const promoContainer = document.getElementById('promoContainer');
    const promoControls = document.querySelectorAll('.promo-control');
    
    if (promoContainer && promoControls.length) {
      promoControls.forEach((control, index) => {
        control.addEventListener('click', function() {
          scrollToPromo(index);
          updatePromoControls(index);
        });
      });
      
      // Inicializar el primer control como activo
      promoControls[0].classList.add('active');
      
      // Detectar scroll en el contenedor de promociones
      let isScrolling;
      promoContainer.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        
        isScrolling = setTimeout(function() {
          const scrollPosition = promoContainer.scrollLeft;
          const containerWidth = promoContainer.offsetWidth;
          const index = Math.round(scrollPosition / containerWidth);
          
          updatePromoControls(index);
        }, 100);
      });
      
      function scrollToPromo(index) {
        const promoCards = promoContainer.querySelectorAll('.promo-card');
        if (promoCards.length > index) {
          promoContainer.scrollTo({
            left: promoCards[index].offsetLeft - 20,
            behavior: 'smooth'
          });
        }
      }
      
      function updatePromoControls(activeIndex) {
        promoControls.forEach((control, index) => {
          if (index === activeIndex) {
            control.classList.add('active');
          } else {
            control.classList.remove('active');
          }
        });
      }
    }
    
    // Testimonios
    const testimonials = [
      {
        name: "María García",
        text: "Los mejores sandwiches que he probado. La calidad de los ingredientes es excepcional y el servicio es muy rápido.",
        rating: 5
      },
      {
        name: "Juan Pérez",
        text: "Me encanta la variedad de opciones. El sandwich 'El Supremo' es mi favorito, ¡no puedo dejar de pedirlo!",
        rating: 5
      },
      {
        name: "Ana Rodríguez",
        text: "Excelente relación calidad-precio. Las promociones son geniales para ir con amigos o familia.",
        rating: 4
      }
    ];
    
    const testimonialContainer = document.getElementById('testimonialContainer');
    const testimonialDots = document.getElementById('testimonialDots');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    
    if (testimonialContainer && testimonialDots && prevTestimonial && nextTestimonial) {
      let currentTestimonial = 0;
      
      // Crear los testimonios
      testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
        
        const testimonialContent = document.createElement('div');
        testimonialContent.className = 'testimonial-content';
        
        const avatar = document.createElement('div');
        avatar.className = 'testimonial-avatar';
        
        const textContent = document.createElement('div');
        textContent.className = 'testimonial-text';
        
        const stars = document.createElement('div');
        stars.className = 'testimonial-stars';
        
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('i');
          star.className = i < testimonial.rating ? 'fas fa-star' : 'far fa-star';
          stars.appendChild(star);
        }
        
        const quote = document.createElement('p');
        quote.className = 'testimonial-quote';
        quote.textContent = `"${testimonial.text}"`;
        
        const author = document.createElement('h3');
        author.className = 'testimonial-author';
        author.textContent = testimonial.name;
        
        textContent.appendChild(stars);
        textContent.appendChild(quote);
        textContent.appendChild(author);
        
        testimonialContent.appendChild(avatar);
        testimonialContent.appendChild(textContent);
        
        testimonialItem.appendChild(testimonialContent);
        testimonialContainer.appendChild(testimonialItem);
        
        // Crear los dots
        const dot = document.createElement('button');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => {
          showTestimonial(index);
        });
        
        testimonialDots.appendChild(dot);
      });
      
      // Navegación de testimonios
      prevTestimonial.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
      
      nextTestimonial.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
      
      // Auto rotación de testimonios
      let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }, 5000);
      
      // Detener auto rotación al interactuar
      [prevTestimonial, nextTestimonial, ...testimonialDots.querySelectorAll('.testimonial-dot')].forEach(el => {
        el.addEventListener('mouseenter', () => {
          clearInterval(testimonialInterval);
        });
        
        el.addEventListener('mouseleave', () => {
          testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
          }, 5000);
        });
      });
      
      function showTestimonial(index) {
        // Actualizar items
        const items = testimonialContainer.querySelectorAll('.testimonial-item');
        items.forEach((item, i) => {
          if (i === index) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        
        // Actualizar dots
        const dots = testimonialDots.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }
    
    // Animación de Sandwich
    const sandwichCanvas = document.getElementById('sandwichCanvas');
    if (sandwichCanvas) {
      const ctx = sandwichCanvas.getContext('2d');
      
      // Ajustar el tamaño del canvas
      function resizeCanvas() {
        sandwichCanvas.width = sandwichCanvas.parentElement.clientWidth;
        sandwichCanvas.height = 200;
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Ingredientes del sandwich
      const ingredients = [
        { color: '#f8c291', height: 30, name: 'Pan superior' },
        { color: '#78e08f', height: 10, name: 'Lechuga' },
        { color: '#e55039', height: 10, name: 'Tomate' },
        { color: '#fad390', height: 15, name: 'Queso' },
        { color: '#b71540', height: 20, name: 'Jamón' },
        { color: '#f8c291', height: 30, name: 'Pan inferior' }
      ];
      
      let offset = 0;
      const speed = 0.5;
      
      function drawSandwich() {
        ctx.clearRect(0, 0, sandwichCanvas.width, sandwichCanvas.height);
        
        let y = 50;
        
        ingredients.forEach((ingredient, index) => {
          // Calcular posición con efecto de onda
          const waveOffset = Math.sin(offset + index * 0.5) * 5;
          
          ctx.fillStyle = ingredient.color;
          ctx.beginPath();
          
          // Dibujar forma de pan para el primer y último ingrediente
          if (index === 0) {
            ctx.moveTo(sandwichCanvas.width * 0.2, y + waveOffset);
            ctx.bezierCurveTo(
              sandwichCanvas.width * 0.3, y - 20 + waveOffset,
              sandwichCanvas.width * 0.7, y - 20 + waveOffset,
              sandwichCanvas.width * 0.8, y + waveOffset
            );
            ctx.lineTo(sandwichCanvas.width * 0.8, y + ingredient.height + waveOffset);
            ctx.bezierCurveTo(
              sandwichCanvas.width * 0.7, y + ingredient.height + 5 + waveOffset,
              sandwichCanvas.width * 0.3, y + ingredient.height + 5 + waveOffset,
              sandwichCanvas.width * 0.2, y + ingredient.height + waveOffset
            );
            ctx.closePath();
          } else if (index === ingredients.length - 1) {
            ctx.moveTo(sandwichCanvas.width * 0.2, y + waveOffset);
            ctx.bezierCurveTo(
              sandwichCanvas.width * 0.3, y - 5 + waveOffset,
              sandwichCanvas.width * 0.7, y - 5 + waveOffset,
              sandwichCanvas.width * 0.8, y + waveOffset
            );
            ctx.lineTo(sandwichCanvas.width * 0.8, y + ingredient.height + waveOffset);
            ctx.bezierCurveTo(
              sandwichCanvas.width * 0.7, y + ingredient.height + 20 + waveOffset,
              sandwichCanvas.width * 0.3, y + ingredient.height + 20 + waveOffset,
              sandwichCanvas.width * 0.2, y + ingredient.height + waveOffset
            );
            ctx.closePath();
          } else {
            // Ingredientes normales
            ctx.rect(sandwichCanvas.width * 0.2, y + waveOffset, sandwichCanvas.width * 0.6, ingredient.height);
          }
          
          ctx.fill();
          
          // Añadir textura
          if (index === 2) { // Tomate
            for (let i = 0; i < 5; i++) {
              ctx.fillStyle = '#c23616';
              ctx.beginPath();
              ctx.arc(
                sandwichCanvas.width * (0.3 + i * 0.1),
                y + ingredient.height / 2 + waveOffset,
                3, 0, Math.PI * 2
              );
              ctx.fill();
            }
          }
          
          if (index === 3) { // Queso
            ctx.strokeStyle = '#f6b93b';
            ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++) {
              ctx.beginPath();
              ctx.moveTo(sandwichCanvas.width * 0.2, y + i * 4 + waveOffset);
              ctx.lineTo(sandwichCanvas.width * 0.8, y + i * 4 + waveOffset);
              ctx.stroke();
            }
          }
          
          y += ingredient.height;
        });
        
        offset += speed * 0.05;
        requestAnimationFrame(drawSandwich);
      }
      
      drawSandwich();
    }
    
    // Mapa de ubicación
    const mapCanvas = document.getElementById('mapCanvas');
    if (mapCanvas) {
      const ctx = mapCanvas.getContext('2d');
      
      // Ajustar el tamaño del canvas
      function resizeMapCanvas() {
        mapCanvas.width = mapCanvas.parentElement.clientWidth;
        mapCanvas.height = mapCanvas.parentElement.clientHeight;
      }
      
      resizeMapCanvas();
      window.addEventListener('resize', resizeMapCanvas);
      
      // Dibujar mapa
      function drawMap() {
        // Fondo del mapa
        ctx.fillStyle = '#242424';
        ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
        
        // Calles
        ctx.strokeStyle = '#3a3a3a';
        ctx.lineWidth = 8;
        
        // Calle horizontal
        ctx.beginPath();
        ctx.moveTo(0, mapCanvas.height / 2);
        ctx.lineTo(mapCanvas.width, mapCanvas.height / 2);
        ctx.stroke();
        
        // Calle vertical
        ctx.beginPath();
        ctx.moveTo(mapCanvas.width / 2, 0);
        ctx.lineTo(mapCanvas.width / 2, mapCanvas.height);
        ctx.stroke();
        
        // Marcador de ubicación y pulso animado
        let radius = 15;
        const maxRadius = 40;
        
        function animatePulse() {
          ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
          
          // Redibujar fondo
          ctx.fillStyle = '#242424';
          ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
          
          // Redibujar calles
          ctx.strokeStyle = '#3a3a3a';
          ctx.lineWidth = 8;
          
          ctx.beginPath();
          ctx.moveTo(0, mapCanvas.height / 2);
          ctx.lineTo(mapCanvas.width, mapCanvas.height / 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(mapCanvas.width / 2, 0);
          ctx.lineTo(mapCanvas.width / 2, mapCanvas.height);
          ctx.stroke();
          
          // Dibujar pulso
          ctx.fillStyle = 'rgba(254, 203, 0, 0.2)';
          ctx.beginPath();
          ctx.arc(mapCanvas.width / 2, mapCanvas.height / 2, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Dibujar marcador
          ctx.fillStyle = '#fecb00';
          ctx.beginPath();
          ctx.arc(mapCanvas.width / 2, mapCanvas.height / 2, 15, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          radius += 0.5;
          if (radius > maxRadius) {
            radius = 15;
          }
          
          requestAnimationFrame(animatePulse);
        }
        
        animatePulse();
      }
      
      drawMap();
    }
    
    // Año actual en el footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Efecto hover en tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });