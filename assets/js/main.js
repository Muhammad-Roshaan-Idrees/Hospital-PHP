(function ($) {
    "use strict";

    // Existing initializations remain intact

    // Inject minimal CSS for interactive UI to avoid editing stylesheets
    (function injectStyles(){
        const css = `
        :root{--his-bg:#ffffff;--his-fg:#222222;--his-muted:#666666;--his-accent:#2c7be5;--his-surface:#f5f7fb}
        .dark-mode{--his-bg:#101317;--his-fg:#e6e6e6;--his-muted:#9aa4b2;--his-accent:#7ab3ff;--his-surface:#1a1f26}
        body{background-color:var(--his-bg);color:var(--his-fg)}
        /* Appearance polish */
        .single-feature,.patient-area .single-patient,.specialist-area .content-area,.blog_right_sidebar{border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.06)}
        .single-feature:hover,.patient-area .single-patient:hover,.specialist-area .content-area:hover{box-shadow:0 10px 24px rgba(0,0,0,0.12)}
        .template-btn{border-radius:10px;transition:transform .15s ease, filter .15s ease}
        .template-btn:hover{transform:translateY(-1px);filter:brightness(1.03)}
        #header.header-scrolled{backdrop-filter:saturate(1.1) blur(8px);background:rgba(249,249,253,0.7)}
        a{transition:color .15s ease, opacity .15s ease}
        a:hover{opacity:.9}
        /* Injected interactive UI */
        .his-floating-toggle{position:fixed;bottom:20px;right:20px;z-index:9999;border:none;background:var(--his-surface);color:var(--his-fg);box-shadow:0 6px 16px rgba(0,0,0,0.15);padding:10px 12px;border-radius:10px;cursor:pointer}
        .his-floating-toggle:hover{filter:brightness(1.05)}
        .his-back-to-top{position:fixed;bottom:20px;right:70px;z-index:9999;border:none;background:var(--his-accent);color:#fff;box-shadow:0 6px 16px rgba(0,0,0,0.15);padding:10px 12px;border-radius:10px;cursor:pointer}
        .his-back-to-top:hover{filter:brightness(1.05)}
        .his-toast{position:fixed;bottom:80px;right:20px;z-index:9999;background:var(--his-surface);color:var(--his-fg);border:1px solid rgba(0,0,0,0.08);box-shadow:0 6px 16px rgba(0,0,0,0.15);padding:10px 12px;border-radius:10px;opacity:0;transform:translateY(8px);transition:opacity .2s ease, transform .2s ease}
        .his-toast.show{opacity:1;transform:translateY(0)}
        .his-table-search-wrapper{display:flex;justify-content:flex-end;margin:10px 0}
        .his-table-search{max-width:260px;width:100%;background:var(--his-surface);color:var(--his-fg);border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:8px 10px}
        `;
        const style = document.createElement('style');
        style.setAttribute('data-his', 'interactive');
        style.textContent = css;
        document.head.appendChild(style);
    })();

    // 1) Dark Mode Toggle (injected, no HTML changes needed)
    const THEME_KEY = "his_theme";
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem(THEME_KEY);
    const effectiveDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    function applyTheme(dark) {
        document.documentElement.classList.toggle('dark-mode', dark);
        localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    }
    applyTheme(effectiveDark);

    function createThemeToggle() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.className = 'his-floating-toggle';
        btn.innerHTML = effectiveDark ? '☀️' : '🌙';
        btn.addEventListener('click', () => {
            const nowDark = !document.documentElement.classList.contains('dark-mode');
            applyTheme(nowDark);
            btn.innerHTML = nowDark ? '☀️' : '🌙';
            showToast(nowDark ? 'Dark mode enabled' : 'Light mode enabled');
        });
        document.body.appendChild(btn);
    }

    // 2) Back-to-top button (smooth scroll)
    function createBackToTop() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Back to top');
        btn.className = 'his-back-to-top';
        btn.textContent = '↑';
        btn.style.display = 'none';
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            const show = window.scrollY > 300;
            btn.style.display = show ? 'block' : 'none';
        });
    }

    // 3) Lightweight toast notifications
    let toastTimer;
    function showToast(message) {
        let toast = document.getElementById('his-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'his-toast';
            toast.className = 'his-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // 4) Auto-injected table search (filters visible rows)
    function injectTableSearch() {
        const tables = document.querySelectorAll('table');
        if (!tables.length) return;
        tables.forEach((table) => {
            // Skip if already has a search attached
            if (table.dataset.hisSearch === '1') return;
            table.dataset.hisSearch = '1';

            const wrapper = document.createElement('div');
            wrapper.className = 'his-table-search-wrapper';
            const input = document.createElement('input');
            input.type = 'search';
            input.placeholder = 'Search table…';
            input.className = 'his-table-search';
            wrapper.appendChild(input);
            table.parentNode.insertBefore(wrapper, table);

            const rows = Array.from(table.querySelectorAll('tbody tr'));
            input.addEventListener('input', () => {
                const q = input.value.trim().toLowerCase();
                rows.forEach((tr) => {
                    const text = tr.textContent.toLowerCase();
                    tr.style.display = text.includes(q) ? '' : 'none';
                });
            });
        });
    }

    // 5) Enhance existing anchors with smooth scroll if hash
    function enableSmoothAnchorScroll() {
        document.addEventListener('click', function (e) {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Initialize after DOM ready
    $(function () {
        createThemeToggle();
        createBackToTop();
        injectTableSearch();
        enableSmoothAnchorScroll();
    });
})(jQuery);
        // Initiate superfish on nav menu
        $('.nav-menu').superfish({
            animation: {
            opacity: 'show'
            },
            speed: 400
        });

        // Mobile Navigation
        if ($('#nav-menu-container').length) {
            var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
            });
            $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
            });
            $('body').append($mobile_nav);
            $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
            $('body').append('<div id="mobile-body-overly"></div>');
            $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

            $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
            });

            $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
            $('#mobile-body-overly').toggle();
            });

            $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
                $('#mobile-body-overly').fadeOut();
                }
            }
            });
        } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
            $("#mobile-nav, #mobile-nav-toggle").hide();
        }

        // Smooth scroll for the menu and links with .scrollto classes
        $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                top_space = $('#header').outerHeight();

                if( ! $('#header').hasClass('header-fixed') ) {
                    top_space = top_space;
                }
                }

                $('html, body').animate({
                scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
                $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
            }
        });


            $(document).ready(function() {

            $('html, body').hide();

                if (window.location.hash) {

                setTimeout(function() {

                $('html, body').scrollTop(0).show();

                $('html, body').animate({

                scrollTop: $(window.location.hash).offset().top

                }, 1000)

                }, 0);

                }

                else {

                $('html, body').show();

                }

            });
        

        // Header scroll class
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
            } else {
            $('#header').removeClass('header-scrolled');
            }
        });


        // Department Slider
        $('.department-slider').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            nav: false,
            dots: true,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });

        // Date Picker
        jQuery('#datepicker').datetimepicker({
            timepicker:false,
            format:'d.m.Y',
        });

        // // Nice Select
        $('select').niceSelect();
        

        // Google Map
        if ( $('#mapBox').length ){
            var $lat = $('#mapBox').data('lat');
            var $lon = $('#mapBox').data('lon');
            var $zoom = $('#mapBox').data('zoom');
            var $marker = $('#mapBox').data('marker');
            var $info = $('#mapBox').data('info');
            var $markerLat = $('#mapBox').data('mlat');
            var $markerLon = $('#mapBox').data('mlon');
            var map = new GMaps({
            el: '#mapBox',
            lat: $lat,
            lng: $lon,
            scrollwheel: false,
            scaleControl: true,
            streetViewControl: false,
            panControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            zoom: $zoom,
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dcdfe6"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "color": "#808080"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#dcdfe6"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "weight": 1.8
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d7d7d7"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ebebeb"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#a7a7a7"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#efefef"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#696969"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#737373"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d6d6d6"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {},
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    }
                ]
            });
        }

    });

    jQuery(window).on('load', function() {
        // WOW JS
        new WOW().init();
        // Preloader
		$('.preloader').fadeOut(500);
    });
})(jQuery);
