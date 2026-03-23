// Load the desktop-enhanced global header with sticky shrinking nav support
fetch('header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        
        // NOW initialize the mobile navigation AFTER DOM is loaded
        console.log('🔧 Initializing enhanced navigation...');
        
        // Get all the elements
        const mobileToggle = document.getElementById('mobileToggle');
        const headerNav = document.getElementById('headerNav');
        const companyDropdown = document.getElementById('companyDropdown');
        const resourcesDropdown = document.getElementById('resourcesDropdown');
        
        console.log('Elements found:', {
            mobileToggle: !!mobileToggle,
            headerNav: !!headerNav,
            companyDropdown: !!companyDropdown,
            resourcesDropdown: !!resourcesDropdown
        });

        // Mobile menu toggle (hamburger)
        if (mobileToggle && headerNav) {
            mobileToggle.addEventListener('click', function(e) {
                console.log('🍔 Hamburger clicked');
                e.preventDefault();
                this.classList.toggle('active');
                headerNav.classList.toggle('active');
                document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Company dropdown
        if (companyDropdown) {
            const companyToggle = companyDropdown.querySelector('.dropdown-toggle');
            if (companyToggle) {
                companyToggle.addEventListener('click', function(e) {
                    console.log('🏢 Company dropdown clicked, window width:', window.innerWidth);
                    // Only on mobile
                    if (window.innerWidth <= 968) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close resources dropdown
                        if (resourcesDropdown) {
                            resourcesDropdown.classList.remove('mobile-open');
                        }
                        
                        // Toggle company dropdown
                        companyDropdown.classList.toggle('mobile-open');
                        console.log('Company dropdown is now:', companyDropdown.classList.contains('mobile-open') ? 'OPEN' : 'CLOSED');
                    }
                });
            }
        }

        // Resources dropdown
        if (resourcesDropdown) {
            const resourcesToggle = resourcesDropdown.querySelector('.dropdown-toggle');
            if (resourcesToggle) {
                resourcesToggle.addEventListener('click', function(e) {
                    console.log('📚 Resources dropdown clicked, window width:', window.innerWidth);
                    // Only on mobile
                    if (window.innerWidth <= 968) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close company dropdown
                        if (companyDropdown) {
                            companyDropdown.classList.remove('mobile-open');
                        }
                        
                        // Toggle resources dropdown
                        resourcesDropdown.classList.toggle('mobile-open');
                        console.log('Resources dropdown is now:', resourcesDropdown.classList.contains('mobile-open') ? 'OPEN' : 'CLOSED');
                    }
                });
            }
        }

        // Active page highlighting
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === 'index.html' && linkPage === 'index.html') ||
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index-desktop-enhanced.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });

        // Highlight dropdowns if on their sub-pages
        const companyPages = ['general-contracting.html', 'acquisitions.html', 'brokerage.html', 'development.html'];
        const resourcePages = ['education.html', 'community.html', 'blog.html'];
        
        if (companyPages.includes(currentPage)) {
            const companyToggle = document.querySelector('#companyDropdown .dropdown-toggle');
            if (companyToggle) companyToggle.classList.add('active');
        }
        
        if (resourcePages.includes(currentPage)) {
            const resourcesToggle = document.querySelector('#resourcesDropdown .dropdown-toggle');
            if (resourcesToggle) resourcesToggle.classList.add('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.site-header') && headerNav && headerNav.classList.contains('active')) {
                if (mobileToggle) mobileToggle.classList.remove('active');
                headerNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 968 && headerNav && headerNav.classList.contains('active')) {
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    headerNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 250);
        });
        
        console.log('✅ Enhanced navigation initialized successfully');
    })
    .catch(error => console.error('❌ Error loading header:', error));
