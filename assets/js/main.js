/* Cottle Construction — site scripts */


(function ($) {
    
    "use strict";

    (function initSubpageTransitions() {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        var subpageFiles = {
            'individual-service.html': true,
            'portfolio-single.html': true
        };

        function getPageName(pathname) {
            var parts = pathname.split('/');
            return parts[parts.length - 1] || '';
        }

        function isSubpageLink(href) {
            if (!href || href.charAt(0) === '#') {
                return false;
            }

            if (/^(mailto:|tel:|javascript:)/i.test(href)) {
                return false;
            }

            var url;

            try {
                url = new URL(href, window.location.href);
            } catch (error) {
                return false;
            }

            if (url.origin !== window.location.origin) {
                return false;
            }

            return !!subpageFiles[getPageName(url.pathname)];
        }

        function revealSubpage() {
            if (!document.documentElement.classList.contains('cottle-subpage-pending')) {
                return;
            }

            document.documentElement.classList.remove('cottle-subpage-pending');

            if (reduceMotion || !document.body.classList.contains('cottle-subpage')) {
                return;
            }

            window.requestAnimationFrame(function () {
                document.body.classList.add('cottle-subpage-reveal');
                window.setTimeout(function () {
                    document.body.classList.remove('cottle-subpage-reveal');
                }, 320);
            });
        }

        window.addEventListener('pageshow', function (event) {
            if (event.persisted) {
                document.body.classList.remove('cottle-page-exit');
            }
            revealSubpage();
        });

        if (document.body.classList.contains('cottle-subpage')) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', revealSubpage, { once: true });
            } else {
                revealSubpage();
            }
        }

        if (reduceMotion) {
            return;
        }

        $(document).on('click', 'a[href]', function (event) {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            if (this.target && this.target !== '_self') {
                return;
            }

            var href = $(this).attr('href');
            if (!isSubpageLink(href)) {
                return;
            }

            var targetUrl = new URL(href, window.location.href);
            var currentPage = getPageName(window.location.pathname);
            var targetPage = getPageName(targetUrl.pathname);
            var sameDocument = targetPage === currentPage &&
                targetUrl.search === window.location.search;

            if (sameDocument) {
                return;
            }

            event.preventDefault();
            document.body.classList.add('cottle-page-exit');

            try {
                sessionStorage.setItem('cottleSubpageEnter', '1');
            } catch (error) {}

            window.setTimeout(function () {
                window.location.href = targetUrl.href;
            }, 260);
        });
    })();

    // multi level dropdown menu
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass('show');
        });
        return false;
    });


    // data-background    
    $(document).on('ready', function () {
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    });


    // wow init
    new WOW().init();


    if ($.fn.owlCarousel) {
    // service-slider — swipe carousel on mobile/tablet, static row on desktop
    if ($('.service-slider').length) {
    $('.service-slider').owlCarousel({
        margin: 15,
        autoplay: false,
        smartSpeed: 450,
        navText: [
            "<i class='far fa-arrow-left'></i>",
            "<i class='far fa-arrow-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                loop: true,
                nav: false,
                dots: true,
                stagePadding: 20,
                mouseDrag: true,
                touchDrag: true,
                pullDrag: true
            },
            992: {
                items: 4,
                loop: false,
                nav: false,
                dots: false,
                stagePadding: 0,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
                freeDrag: false
            }
        }
    });

    function refreshServiceSlider() {
        $('.service-slider').trigger('refresh.owl.carousel');
    }

    $('.service-slider').on('initialized.owl.carousel', refreshServiceSlider);
    $(window).on('load resize', refreshServiceSlider);
    }


    // portfolio-slider — swipe carousel on mobile/tablet, static row on desktop
    if ($('.portfolio-slider').length) {
    $('.portfolio-slider').owlCarousel({
        margin: 15,
        autoplay: false,
        smartSpeed: 450,
        navText: [
            "<i class='far fa-arrow-left'></i>",
            "<i class='far fa-arrow-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                loop: true,
                nav: false,
                dots: true,
                stagePadding: 20,
                mouseDrag: true,
                touchDrag: true,
                pullDrag: true
            },
            992: {
                items: 4,
                loop: false,
                nav: false,
                dots: false,
                stagePadding: 0,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
                freeDrag: false
            }
        }
    });

    function refreshPortfolioSlider() {
        $('.portfolio-slider').trigger('refresh.owl.carousel');
    }

    $('.portfolio-slider').on('initialized.owl.carousel', refreshPortfolioSlider);
    $(window).on('load resize', refreshPortfolioSlider);
    }


    // testimonial-slider
    if ($('.testimonial-slider').length) {
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    }
    }


    // fun fact counter
    if ($.fn.countTo) {
    $('.counter').countTo();
    if ($('.counter-box').length) {
    $('.counter-box').appear(function () {
        $('.counter').countTo();
    }, {
        accY: -100
    });
    }
    }


    // progress bar
    $(document).ready(function () {
        var progressBar = $('.progress');
        if (progressBar.length) {
            progressBar.each(function () {
                var Self = $(this);
                Self.appear(function () {
                    var progressValue = Self.data('value');
                    Self.find('.progress-bar').animate({
                        width: progressValue + '%'
                    }, 1000);
                });
            })
        }
    });



    // scroll to top
    $(window).scroll(function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $("#scroll-top").addClass('active');
        } else {
            $("#scroll-top").removeClass('active');
        }

        $('.subpage-mobile-bar').toggleClass(
            'is-visible',
            $(window).scrollTop() > 120
        );
    });

    $("#scroll-top").on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });

    if ($('.subpage-mobile-bar').length) {
        function updateSubpageMobileBar() {
            $('.subpage-mobile-bar').toggleClass('is-visible', $(window).scrollTop() > 120);
        }

        $(window).on('scroll', updateSubpageMobileBar);
        updateSubpageMobileBar();
    }

    // navbar — transparent on hero, navy when scrolled
    function updateNavbarOnScroll() {
        if (!$('.header').length) {
            return;
        }

        $('.header').toggleClass('is-scrolled', $(window).scrollTop() > 80);
    }

    $(window).on('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll();

    $(window).on('load pageshow', function () {
        updateNavbarOnScroll();
    });


    // header nav — smooth scroll to page sections
    var navSections = ['#home', '#about', '#services', '#portfolio', '#contact'];

    function getHeaderOffset() {
        return ($('.navbar').outerHeight() || 80) + 16;
    }

    function setActiveNavLink(hash) {
        $('.navbar-nav .nav-link').removeClass('active');
        $('.navbar-nav .nav-link[href="' + hash + '"]').addClass('active');
    }

    function getActiveSectionHash() {
        var scrollPos = $(window).scrollTop() + getHeaderOffset() + 20;
        var current = navSections[0];

        navSections.forEach(function (hash) {
            var $section = $(hash);
            if ($section.length && $section.offset().top <= scrollPos) {
                current = hash;
            }
        });

        return current;
    }

    function updateActiveNavOnScroll() {
        if (isNavScrolling) {
            return;
        }

        setActiveNavLink(getActiveSectionHash());
    }

    var isNavScrolling = false;

    function scrollToSection(hash, duration) {
        var $target = $(hash);
        if (!$target.length) {
            return;
        }

        isNavScrolling = true;
        var scrollTop = Math.max(0, $target.offset().top - getHeaderOffset());

        if (duration === 0) {
            window.scrollTo(0, scrollTop);
            isNavScrolling = false;
            setActiveNavLink(hash);
            updateNavbarOnScroll();
            return;
        }

        $('html, body').stop(true).animate({
            scrollTop: scrollTop
        }, duration || 800, function () {
            isNavScrolling = false;
            setActiveNavLink(hash);
        });
    }

    function closeMobileNav() {
        var offcanvasEl = document.getElementById('offcanvasNavbar');
        if (!offcanvasEl) {
            return;
        }

        var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) {
            offcanvas.hide();
        }

        $('.mobile-menu-icon').blur();
    }

    $('#offcanvasNavbar').on('hidden.bs.offcanvas', function () {
        $('.mobile-menu-icon').blur();
    });

    $('.navbar-nav .nav-link[href^="#"], .navbar-brand[href^="#"], .offcanvas-brand[href^="#"], .hero-btn a[href^="#"], .about-area a[href^="#"]').on('click', function (e) {
        var hash = $(this).attr('href');
        if (!hash || hash === '#') {
            return;
        }

        e.preventDefault();
        scrollToSection(hash);
        closeMobileNav();

        if ($(this).hasClass('nav-link') || navSections.indexOf(hash) !== -1) {
            setActiveNavLink(hash);
        }
    });

    if (window.location.hash && navSections.indexOf(window.location.hash) !== -1) {
        setActiveNavLink(window.location.hash);
    }

    updateNavbarOnScroll();
    updateActiveNavOnScroll();

    $(window).on('scroll', updateActiveNavOnScroll);


    // copywrite date
    let date = new Date().getFullYear();
    $("#date").html(date);


    // quote modal
    var cachedScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    function getScrollbarWidth() {
        var width = window.innerWidth - document.documentElement.clientWidth;
        return width > 0 ? width : cachedScrollbarWidth;
    }

    function setModalScrollbarCompensation(enable) {
        var width = getScrollbarWidth();
        var padding = enable && width > 0 ? width + 'px' : '';
        $('.header, #scroll-top').css('padding-right', padding);
    }

    $('.quote-modal-trigger').on('click', function () {
        var offcanvasEl = document.getElementById('offcanvasNavbar');
        if (offcanvasEl) {
            var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (offcanvas) {
                offcanvas.hide();
            }
        }
    });

    $('#quoteModal').on('show.bs.modal', function () {
        setModalScrollbarCompensation(true);
    });

    var QUOTE_EMAIL = 'cottlecnstructionltd@hotmail.com';
    var FORMSUBMIT_EMAIL = 'cottlecnstructionltd@hotmail.com';

    function getQuoteFormFields($form) {
        var fields = {};
        $form.serializeArray().forEach(function (item) {
            fields[item.name] = item.value;
        });
        return fields;
    }

    function showQuoteFeedback($feedback, type, message) {
        $feedback.removeClass('is-success is-error')
            .addClass(type === 'success' ? 'is-success' : 'is-error')
            .text(message)
            .show();
    }

    function submitQuoteViaMailto($form, $feedback, $submit) {
        var fields = getQuoteFormFields($form);
        var subject = 'Quote Request from ' + (fields.name || 'website');
        var body = [
            'Name: ' + (fields.name || ''),
            'Email: ' + (fields.email || ''),
            'Phone: ' + (fields.phone || ''),
            'Service: ' + (fields.service || ''),
            '',
            'Message:',
            fields.message || ''
        ].join('\n');

        window.location.href = 'mailto:' + QUOTE_EMAIL +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);

        showQuoteFeedback(
            $feedback,
            'success',
            'Your email app should open. Send the message to complete your quote request.'
        );
        $submit.prop('disabled', false);
    }

    function submitQuoteViaFormSubmit($form, $feedback, $submit) {
        var fields = getQuoteFormFields($form);

        $.ajax({
            url: 'https://formsubmit.co/ajax/' + encodeURIComponent(FORMSUBMIT_EMAIL),
            type: 'POST',
            data: {
                name: fields.name,
                email: fields.email,
                phone: fields.phone,
                service: fields.service,
                message: fields.message,
                _subject: 'New Quote Request from ' + (fields.name || 'website'),
                _template: 'table',
                _captcha: 'false'
            },
            dataType: 'json',
            success: function (response) {
                if (response && (response.success === 'true' || response.success === true)) {
                    showQuoteFeedback($feedback, 'success', 'Your quote request was sent successfully!');
                    $form[0].reset();
                } else {
                    submitQuoteViaMailto($form, $feedback, $submit);
                }
            },
            error: function () {
                submitQuoteViaMailto($form, $feedback, $submit);
            },
            complete: function () {
                $submit.prop('disabled', false);
            }
        });
    }

    function submitQuoteViaPhp($form, $feedback, $submit) {
        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function (response) {
                if (response && response.status === 'success') {
                    showQuoteFeedback($feedback, 'success', response.msg);
                    $form[0].reset();
                    $submit.prop('disabled', false);
                    return;
                }

                showQuoteFeedback(
                    $feedback,
                    'error',
                    (response && response.msg) ? response.msg : 'Your quote request could not be sent.'
                );
                $submit.prop('disabled', false);
            },
            error: function () {
                submitQuoteViaFormSubmit($form, $feedback, $submit);
            }
        });
    }

    function isGitHubPagesHost() {
        var host = window.location.hostname;
        return host.slice(-10) === 'github.io' ||
            host === 'cottle-construction.co.uk' ||
            host === 'www.cottle-construction.co.uk';
    }

    function isFormSubmitAction($form) {
        var action = $form.attr('action') || '';
        return action.indexOf('formsubmit.co') !== -1;
    }

    $('.quote-request-form').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var $feedback = $form.find('.quote-form-feedback');
        var $submit = $form.find('.quote-modal-submit, .quote-request-submit');

        $feedback.removeClass('is-success is-error').hide().text('');
        $submit.prop('disabled', true);

        if (window.location.protocol === 'file:') {
            submitQuoteViaMailto($form, $feedback, $submit);
            return;
        }

        if (isGitHubPagesHost() || isFormSubmitAction($form)) {
            submitQuoteViaFormSubmit($form, $feedback, $submit);
            return;
        }

        submitQuoteViaPhp($form, $feedback, $submit);
    });

    $('#quoteModal').on('hidden.bs.modal', function () {
        setModalScrollbarCompensation(false);
        var $form = $('#quoteModalForm');
        $form[0].reset();
        $form.find('.quote-form-feedback').removeClass('is-success is-error').hide().text('');
    });


    // auth password view
    $('.password-view').on('click', function(){
        var pwd = document.getElementById('password');
        if (pwd.type === "password") {
            pwd.type = "text";
            $(this).addClass('show');
        } else {
            pwd.type = "password";
            $(this).removeClass('show');
        }
    })


     // location map
    $(".location-map").find(".location-item").on("mouseenter", function () {
        $(".location-map").find(".location-item").removeClass("active"),
        $(this).addClass("active");
    });


    // bootstrap tooltip enable
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })


})(jQuery);










