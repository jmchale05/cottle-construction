(function ($) {
    'use strict';

    var secondaryImageSlugs = {
        'building-structural': 'building',
        'interiors-installations': 'interiors',
        'renovations-maintenance': 'renovations',
        landscaping: 'landscaping'
    };

    var services = {
        'building-structural': {
            title: 'Building & Structural',
            image: 'assets/img/service/Building.png',
            intro1: 'Our building and structural work covers extensions, conversions, brickwork, and roofing — everything needed to expand and strengthen your home. We plan each job around safe access, clear timelines, and workmanship that matches the rest of your property.',
            intro2: 'From the first site visit, we talk through what you want to achieve, check the structure, and agree how the work will be staged. Our team keeps the site tidy, communicates progress clearly, and makes sure every stage is finished properly before moving on.',
            midText: 'Whether you are adding space with an extension or improving the fabric of your home with new brickwork or roofing, we focus on durable results and minimal disruption. You get honest advice, reliable tradespeople, and a finish you can trust for years to come.',
            processText: 'We start with a free consultation and site assessment, then provide a clear quote with no hidden extras. Once work begins, we manage deliveries, access, and safety on site, keeping you updated throughout. When the job is complete, we walk you through the finished work and leave the site clean and secure.',
            benefits: [
                'Extensions, conversions, and structural alterations.',
                'Quality brickwork and masonry to match existing builds.',
                'Roofing repairs and installations carried out safely.',
                'Fully planned site access and weather protection.',
                'Clear communication from quote to handover.'
            ],
            why: 'Homeowners across Merseyside choose us because we combine skilled trades with straightforward service. We do not overpromise — we assess properly, build safely, and deliver structural work that looks right and performs well. That is why clients come back to us for their next project.'
        },
        'interiors-installations': {
            title: 'Interiors & Installations',
            image: 'assets/img/service/interior-installation.png',
            intro1: 'Our interiors and installations service covers kitchens, bathrooms, home office conversions, carpentry, and plastering — all finished with care and precision. We work to your layout, style, and budget so the end result feels tailored to your home.',
            intro2: 'Good interior work depends on accurate measuring, solid fixing, and clean finishing. Our team coordinates each trade so plastering, joinery, and fittings come together smoothly without delays or rework.',
            midText: 'From a full kitchen refit to bespoke carpentry and neat plaster finishes, we focus on the details that make a room feel complete. We protect your home while we work, keep dust and disruption under control, and leave every space ready to use.',
            processText: 'After an initial discussion and site measure, we agree the scope, materials, and programme. Installation is planned in logical stages so each trade can work efficiently. We check finishes, seal lines, and fittings as we go, then hand over a space that is ready for everyday use.',
            benefits: [
                'Kitchen and bathroom design, supply, and installation.',
                'Home office and room conversion work.',
                'Skilled carpentry and bespoke joinery.',
                'Plastering and internal finishing to a high standard.',
                'Coordinated trades for a smoother project.'
            ],
            why: 'Interior projects need tradespeople who care about how a room looks and works day to day. We take time to get layouts, levels, and finishes right, and we stay in touch so you always know what is happening. The result is a space that feels well built and genuinely suits how you live.'
        },
        'renovations-maintenance': {
            title: 'Renovations & Maintenance',
            image: 'assets/img/service/renovation.png',
            intro1: 'Our renovations and maintenance service covers full property refurbishments, upgrades, and ongoing upkeep to keep your home in top condition. Whether you are refreshing one room or tackling a whole house, we plan the work to suit your priorities and budget.',
            intro2: 'Renovation work often involves several trades working in sequence. We coordinate the programme, manage access and protection, and make sure each stage is signed off before the next begins — so the job stays on track and the finish is consistent throughout.',
            midText: 'Maintenance matters as much as the big projects. We carry out reliable repair and upkeep work so small issues do not become expensive problems. From periodic maintenance to full refurbishments, you get the same professional approach every time.',
            processText: 'We begin by understanding what you want to improve and what condition the property is in today. A clear scope and quote follow, then we schedule work to minimise disruption. Throughout the project we keep the site safe and tidy, and we return promptly for snagging and maintenance call-outs when needed.',
            benefits: [
                'Full house and room renovations.',
                'Property upgrades and modernisation.',
                'Responsive maintenance and repair work.',
                'Careful protection of existing finishes.',
                'Honest advice on what is worth doing first.'
            ],
            why: 'Clients across Merseyside trust us for renovations because we are practical, reliable, and easy to deal with. We tell you what needs doing, what can wait, and how to get the best result for your budget. That honest, organised approach is what keeps homes in great shape.'
        },
        landscaping: {
            title: 'Landscaping',
            image: 'assets/img/service/landscaping.png',
            intro1: 'Our landscaping service transforms outdoor spaces with patios, decking, fencing, and garden improvements that are practical as well as attractive. We design and build areas you can actually use — not just look at.',
            intro2: 'Every garden is different, so we start by understanding how you want to use the space, the ground conditions, and drainage. That way the finished patio, deck, or boundary fencing is built to last and suits your home.',
            midText: 'Good landscaping should improve how you live outdoors — whether that is a level patio for entertaining, secure fencing for privacy, or decking that connects your home to the garden. We use quality materials and solid construction so the work stands up to the weather.',
            processText: 'We survey the site, discuss materials and layout, then provide a clear quote. Ground preparation and drainage are planned before any build begins. We keep the garden as tidy as possible during the work and leave you with a finished outdoor space ready to enjoy.',
            benefits: [
                'Patios and paving laid level and secure.',
                'Decking designed for durability and safety.',
                'Fencing and boundary work to suit your property.',
                'Garden transformations planned around your budget.',
                'Proper ground preparation and drainage considered.'
            ],
            why: 'Outdoor projects need the same care as indoor builds. We bring construction standards to landscaping across Merseyside — solid foundations, correct falls, and neat finishes — so your garden looks great and performs well through the seasons.'
        }
    };

    var key = new URLSearchParams(window.location.search).get('service') || 'building-structural';
    var service = services[key] || services['building-structural'];
    var headerImage = window.__cottleServiceHeader || (function () {
        var headerSlug = key === 'interiors-installations' ? 'interiors' : key;
        return 'assets/img/header/' + headerSlug + '-header.png';
    })();

    if (!$('#service-breadcrumb').css('background-image') ||
            $('#service-breadcrumb').css('background-image') === 'none') {
        $('#service-breadcrumb').css('background-image', 'url(' + headerImage + ')');
    }

    document.title = service.title + ' | Cottle Construction Ltd';

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', service.title + ' across Merseyside — ' + service.intro1);
    }

    $('#service-breadcrumb-active').text(service.title);
    $('#service-detail-title').text(service.title);
    $('#service-detail-image').attr({ src: service.image, alt: service.title + ' by Cottle Construction' });
    $('#service-intro-1').text(service.intro1);
    $('#service-intro-2').text(service.intro2);
    $('#service-mid-text').text(service.midText);
    $('#service-process-text').text(service.processText);
    $('#service-why-text').text(service.why);

    var secondarySlug = secondaryImageSlugs[key] || key;
    var secondaryImage = 'assets/img/service/' + secondarySlug + '2.png';
    $('#service-gallery-1').attr({ src: service.image, alt: service.title + ' detail' });
    $('#service-gallery-2').attr({ src: secondaryImage, alt: service.title + ' detail' });

    $('#service-sidebar-links a').removeClass('active').removeAttr('aria-current');
    $('#service-sidebar-links a[data-service="' + key + '"]')
        .addClass('active')
        .attr('aria-current', 'page');

    var $benefitsList = $('#service-benefits-list').empty();
    service.benefits.forEach(function (benefit) {
        $benefitsList.append(
            $('<li></li>').append(
                $('<i></i>').addClass('far fa-check-double'),
                document.createTextNode(benefit)
            )
        );
    });
})(jQuery);
