document.addEventListener('DOMContentLoaded', () => {
    const HARDCODED_USER = 'demo@gozo.com';
    const HARDCODED_PASS = 'demo';

    // --- MOCK DATA SIMULADA DE GOZO (Integración Fluida) ---
    const MOCK_DATA = {
        userData: {
            // Datos personales
            nombreCompleto: "Juan Carlos Gómez",
            primerNombre: "Juan Carlos",
            correo: "demo@gozo.com",
            telefono: "+57 300 123 4567",
            // Datos demográficos
            edad: 35,
            genero: "Masculino",
            ciudad: "Barranquilla, Colombia",
            direccion: "Calle 80 #52-125, Buenavista",
            // Datos biométricos
            peso: 75.2,
            estatura: 178,
            ritmoCardiaco: 65,
            puntajeGozo: 85,
            recomendacionIA: "¡Excelente jornada! Te recomendamos consumir tu batido post-entreno y realizar tu rutina de tren inferior (17:00).",
            horarioAlimentacion: "Almuerzo (12:30 PM). Plato: Salmón al Grill con verduras. (Sugerido por IA)",
            membresiaGym: "SmartFit - Sede Buenavista. Sincronización automática de métricas.",
            todayReminder: "🏋️ Rutina de Tren Inferior a las 5:00 PM • 🥗 Almuerzo saludable a las 12:30 PM • 💧 Recuerda mantenerte hidratado (2L de agua hoy)"
        },
        paymentMethods: {
            nequi: { connected: true, accountNumber: "***4567" },
            daviplata: { connected: false, accountNumber: null },
            bancolombia: { connected: true, accountNumber: "***8901" },
            pse: { connected: false, accountNumber: null },
            tarjeta: { connected: true, accountNumber: "****1234" }
        },
        restaurantes: [
            { id: 1, nombre: "Healthy Bowls Gozo", distancia: "10 min", rating: 4.5, platoRecomendado: "Bowl Mediterráneo" },
            { id: 2, nombre: "Restaurante Saludable X", distancia: "5 min", rating: 4.8, platoRecomendado: "Lomo de Res con Quinoa" },
            { id: 3, nombre: "Smoothie Heaven", distancia: "15 min", rating: 4.3, platoRecomendado: "Batido de Proteína Post-Entreno" }
        ],
        gimnasios: [
            { id: 1, nombre: "SmartFit Buenavista", ubicacion: "Calle 80 #52-100", distancia: "2 km", rating: 4.8, clases: 25, miembros: 450, tipo: "Activo", features: ["Pesas", "Cardio", "Clases", "Spa"] },
            { id: 2, nombre: "Bodytech Centro", ubicacion: "Cra 53 #75-50", distancia: "3.5 km", rating: 4.9, clases: 40, miembros: 680, tipo: "Premium", features: ["Piscina", "Yoga", "CrossFit", "Nutrición"] },
            { id: 3, nombre: "FitZone Norte", ubicacion: "Calle 98 #48-20", distancia: "4 km", rating: 4.6, clases: 18, miembros: 320, tipo: "Activo", features: ["Funcional", "Box", "TRX", "Spinning"] },
            { id: 4, nombre: "Gimnasio Olímpico", ubicacion: "Calle 72 #56-30", distancia: "1.8 km", rating: 4.7, clases: 30, miembros: 520, tipo: "Premium", features: ["Halterofilia", "PowerLifting", "Cardio", "Masajes"] },
            { id: 5, nombre: "Urban Fitness", ubicacion: "Cra 51B #82-45", distancia: "2.5 km", rating: 4.5, clases: 22, miembros: 400, tipo: "Activo", features: ["HIIT", "Pilates", "Zumba", "Sauna"] }
        ],
        rutinas: [
            { id: 101, nombre: "Rutina de Tren Inferior", duracion: "45 min", tipo: "Peso Libre" },
            { id: 102, nombre: "Clase de Yoga Flow", duracion: "1 Hora", tipo: "Membresía" },
            { id: 103, nombre: "Cardio Intenso", duracion: "30 min", tipo: "Cardio" }
        ],
        pedidoEnCurso: {
            id: 'GOZO1234',
            restaurante: 'Restaurante Saludable X',
            tiempoEstimado: '12:15 PM',
            domiciliario: 'Juan Pérez',
            distanciaDomiciliario: '5 min'
        },
        socialPosts: [
            { user: 'Amiga Gozo', avatar: 'A', content: '🎉 ¡Hoy alcancé mi meta de 10k pasos! #GozoChallenge. La IA me ayudó a planear la ruta.', likes: 15, comments: 3 },
            { user: 'Coach Nutricional', avatar: 'C', content: 'Tip del día: La hidratación es clave para la quema de grasas. ¡A beber agua!', likes: 20, comments: 5 }
        ]
    };
    // --- FIN MOCK DATA ---

    // Elements
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const screenTitle = document.getElementById('screen-title');

    // Navigation Buttons
    const navButtons = document.querySelectorAll('.nav-button, .nav-icon');
    const screens = document.querySelectorAll('.app-screen');

    // --- Authentication Logic ---

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (email === HARDCODED_USER && password === HARDCODED_PASS) {
            // Successful Login
            loginScreen.style.display = 'none';
            mainApp.style.display = 'flex';
            loginError.style.display = 'none';
            loadMockData(); // Cargar la información al iniciar sesión
            navigateTo('dashboard-screen');
        } else {
            // Failed Login
            loginError.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        // Log out
        mainApp.style.display = 'none';
        loginScreen.style.display = 'flex';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        loginError.style.display = 'none';
    });

    // --- Social Login Buttons ---
    const btnGoogle = document.querySelector('.btn-google');
    const btnMeta = document.querySelector('.btn-meta');

    btnGoogle.addEventListener('click', () => {
        alert('Iniciando sesión con Google... (Funcionalidad en desarrollo)');
        // Aquí se integraría la autenticación real con Google OAuth
    });

    btnMeta.addEventListener('click', () => {
        alert('Iniciando sesión con Meta... (Funcionalidad en desarrollo)');
        // Aquí se integraría la autenticación real con Meta/Facebook OAuth
    });

    // --- Generate Greeting Based on Time ---
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return '¡Buenos días!';
        } else if (hour >= 12 && hour < 19) {
            return '¡Buenas tardes!';
        } else {
            return '¡Buenas noches!';
        }
    };

    // --- Data Loading Logic ---
    const loadMockData = () => {
        // 0. Saludo y Recordatorios
        document.getElementById('greeting-text').textContent = getGreeting();
        document.getElementById('user-name-display').textContent = MOCK_DATA.userData.primerNombre;
        document.getElementById('today-reminder-text').textContent = MOCK_DATA.userData.todayReminder;

        // 1. Dashboard / Recomendaciones
        document.getElementById('recommendation-text').textContent = MOCK_DATA.userData.recomendacionIA;

        // 2. Alimentación (Restaurantes)
        document.getElementById('food-plan-text').textContent = MOCK_DATA.userData.horarioAlimentacion;
        const restaurantsContainer = document.getElementById('restaurants-list');
        restaurantsContainer.innerHTML = ''; // Clear previous content
        MOCK_DATA.restaurantes.forEach(r => {
            const item = document.createElement('div');
            item.className = 'list-item restaurant';
            item.innerHTML = `
                <i class="fas fa-store"></i> 
                <div>
                    ${r.nombre} (${r.rating} <i class="fas fa-star"></i>)
                    <p class="plato-recomendado">${r.platoRecomendado}</p>
                </div>
                <span>${r.distancia}</span>
            `;
            restaurantsContainer.appendChild(item);
        });

        // 3. Ejercicios / Gimnasios Carrusel
        loadGymCarousel();
        
        // 4. Ejercicios / Rutinas
        document.getElementById('gym-membership-text').textContent = MOCK_DATA.userData.membresiaGym;
        const routinesContainer = document.getElementById('routines-list');
        routinesContainer.innerHTML = '';
        MOCK_DATA.rutinas.forEach(r => {
            const item = document.createElement('div');
            item.className = 'list-item routine';
            item.innerHTML = `
                <i class="fas fa-dumbbell"></i> 
                <div>
                    ${r.nombre} (${r.duracion})
                    <p class="plato-recomendado">Tipo: **${r.tipo}**</p>
                </div>
                ${r.tipo === 'Membresía' ? '<span class="routine-action">Reservar</span>' : ''}
            `;
            routinesContainer.appendChild(item);
        });

        // 4. Tamizaje - Datos Personales
        document.getElementById('data-nombre').textContent = MOCK_DATA.userData.nombreCompleto;
        document.getElementById('data-correo').textContent = MOCK_DATA.userData.correo;
        document.getElementById('data-telefono').textContent = MOCK_DATA.userData.telefono;

        // 5. Tamizaje - Datos Demográficos
        document.getElementById('data-edad-demo').textContent = `${MOCK_DATA.userData.edad} años`;
        document.getElementById('data-genero').textContent = MOCK_DATA.userData.genero;
        document.getElementById('data-ciudad').textContent = MOCK_DATA.userData.ciudad;
        document.getElementById('data-direccion').textContent = MOCK_DATA.userData.direccion;

        // 6. Tamizaje - Datos Biométricos
        document.getElementById('data-peso').textContent = MOCK_DATA.userData.peso;
        document.getElementById('data-estatura').textContent = MOCK_DATA.userData.estatura;
        document.getElementById('data-ritmo').textContent = MOCK_DATA.userData.ritmoCardiaco;
        document.getElementById('data-edad').textContent = MOCK_DATA.userData.edad;
        document.getElementById('data-puntaje').textContent = `${MOCK_DATA.userData.puntajeGozo}/100`;

        // 7. Métodos de Pago
        loadPaymentMethods();

        // 5. Tracking (Delivery)
        document.getElementById('tracking-id').textContent = MOCK_DATA.pedidoEnCurso.id;
        document.getElementById('tracking-restaurante').textContent = MOCK_DATA.pedidoEnCurso.restaurante;
        document.getElementById('tracking-eta').textContent = MOCK_DATA.pedidoEnCurso.tiempoEstimado;
        document.getElementById('tracking-domiciliario').textContent = MOCK_DATA.pedidoEnCurso.domiciliario;
        document.getElementById('tracking-distancia').textContent = MOCK_DATA.pedidoEnCurso.distanciaDomiciliario;

        // 6. Social Feed
        const socialContainer = document.getElementById('social-feed');
        socialContainer.innerHTML = '';
        MOCK_DATA.socialPosts.forEach(p => {
            const item = document.createElement('div');
            item.className = 'list-item social-post';
            item.innerHTML = `
                <div class="user-info">
                    <span class="avatar">${p.avatar}</span> <strong>${p.user}</strong>
                </div>
                <p class="post-text">${p.content}</p>
                <div class="post-image">
                    ${p.user === 'Amiga Gozo' ? 'Logro de 10K Pasos' : 'Imagen de Recomendación Nutricional'}
                </div>
                <div class="actions">
                    <i class="fas fa-heart"></i> ${p.likes} Me Gusta | <i class="fas fa-comment"></i> ${p.comments} Comentarios
                </div>
            `;
            socialContainer.appendChild(item);
        });
    };

    // --- Payment Methods Logic ---
    const loadPaymentMethods = () => {
        const methods = MOCK_DATA.paymentMethods;
        
        Object.keys(methods).forEach(method => {
            const button = document.querySelector(`.btn-payment.${method}`);
            const statusElement = document.getElementById(`${method}-status`);
            
            if (methods[method].connected) {
                button.classList.add('connected');
                statusElement.textContent = `Conectado ${methods[method].accountNumber}`;
            } else {
                statusElement.textContent = 'No conectado';
            }
            
            // Agregar evento click
            button.addEventListener('click', () => {
                if (methods[method].connected) {
                    alert(`${method.toUpperCase()}: Cuenta ${methods[method].accountNumber} conectada.\n\nPuedes gestionar o desconectar este método de pago.`);
                } else {
                    alert(`Conectando con ${method.toUpperCase()}...\n\n(Aquí se integraría el proceso de autenticación)`);
                }
            });
        });
    };

    // --- Gym Carousel Logic ---
    let currentGymIndex = 0;
    
    const loadGymCarousel = () => {
        const carouselTrack = document.getElementById('gym-carousel-track');
        carouselTrack.innerHTML = '';
        
        MOCK_DATA.gimnasios.forEach((gym, index) => {
            const card = document.createElement('div');
            card.className = 'gym-card';
            card.innerHTML = `
                <div class="gym-card-header">
                    <div class="gym-icon">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <span class="gym-badge ${gym.tipo === 'Premium' ? 'premium' : ''}">${gym.tipo}</span>
                </div>
                <div class="gym-name">${gym.nombre}</div>
                <div class="gym-location">
                    <i class="fas fa-map-marker-alt"></i> ${gym.ubicacion}
                </div>
                <div class="gym-features">
                    ${gym.features.map(f => `<span class="gym-feature"><i class="fas fa-check"></i> ${f}</span>`).join('')}
                </div>
                <div class="gym-stats">
                    <div class="gym-stat">
                        <span class="gym-stat-value">${gym.rating}</span>
                        <span class="gym-stat-label">Rating</span>
                    </div>
                    <div class="gym-stat">
                        <span class="gym-stat-value">${gym.clases}</span>
                        <span class="gym-stat-label">Clases</span>
                    </div>
                    <div class="gym-stat">
                        <span class="gym-stat-value">${gym.distancia}</span>
                        <span class="gym-stat-label">Distancia</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                alert(`Gimnasio: ${gym.nombre}\nUbicación: ${gym.ubicacion}\nDistancia: ${gym.distancia}\n\n¡Haz clic para ver más detalles o reservar!`);
            });
            
            carouselTrack.appendChild(card);
        });
        
        updateCarouselButtons();
        setupCarouselButtons();
    };
    
    const setupCarouselButtons = () => {
        const prevBtn = document.getElementById('gym-carousel-prev');
        const nextBtn = document.getElementById('gym-carousel-next');
        
        prevBtn.addEventListener('click', () => {
            if (currentGymIndex > 0) {
                currentGymIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxIndex = MOCK_DATA.gimnasios.length - 1;
            if (currentGymIndex < maxIndex) {
                currentGymIndex++;
                updateCarousel();
            }
        });
    };
    
    const updateCarousel = () => {
        const carouselTrack = document.getElementById('gym-carousel-track');
        const cardWidth = 295; // 280px card + 15px gap
        carouselTrack.style.transform = `translateX(-${currentGymIndex * cardWidth}px)`;
        updateCarouselButtons();
    };
    
    const updateCarouselButtons = () => {
        const prevBtn = document.getElementById('gym-carousel-prev');
        const nextBtn = document.getElementById('gym-carousel-next');
        const maxIndex = MOCK_DATA.gimnasios.length - 1;
        
        prevBtn.disabled = currentGymIndex === 0;
        nextBtn.disabled = currentGymIndex === maxIndex;
    };
    
    // --- Navigation Logic ---
    const getScreenName = (id) => {
        switch (id) {
            case 'dashboard-screen': return 'Dashboard';
            case 'food-screen': return 'Alimentación';
            case 'exercise-screen': return 'Rutinas y Gym';
            case 'tamizaje-screen': return 'Mi Tamizaje';
            case 'tracking-screen': return 'Delivery';
            case 'payments-screen': return 'Pagos';
            case 'social-screen': return 'Comunidad';
            default: return 'Gozo App';
        }
    };

    const navigateTo = (targetId) => {
        screens.forEach(screen => screen.classList.remove('active'));
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            screenTitle.textContent = getScreenName(targetId);
        }

        document.querySelectorAll('.nav-icon').forEach(icon => {
            if (icon.getAttribute('data-target') === targetId) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            navigateTo(target);

            if (target === 'tracking-screen') {
                alert('Activando GPS para la ruta del domiciliario. Ejemplo de Integración Fluida.');
            }
            if (target === 'tamizaje-screen') {
                alert('Acceso a Datos Sensibles. Recordatorio de cumplimiento de Habeas Data y Política de Privacidad.');
            }
        });
    });
});