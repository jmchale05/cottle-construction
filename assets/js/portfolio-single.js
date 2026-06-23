(function ($) {
    'use strict';

    var projects = {
        brickwork: {
            title: 'Residential Building',
            category: 'Brickwork',
            image: 'assets/img/portfolio/01.jpeg',
            headerImage: 'assets/img/header/brickwork-header.png',
            gallery: ['assets/img/portfolio/01.jpeg', 'assets/img/portfolio/brickwork2.png'],
            intro1: 'This residential brickwork project in Merseyside focused on strong, clean masonry that ties in with the existing property. From the first site visit, we planned the work around safe access, weather protection, and keeping disruption to a minimum for the homeowner.',
            intro2: 'Our team carried out the brickwork in stages so each section could be checked, protected, and finished properly before moving on. Mortar mixes, coursing, and detailing were all matched to the surrounding build so the new work looks like it has always been part of the home.',
            midText: 'The client wanted a durable finish that would stand up to everyday use and local weather without needing constant upkeep. We kept the site tidy throughout, communicated progress clearly, and made sure every elevation was left neat, square, and ready for the next stage of the build.',
            tipsText: 'Good brickwork starts with solid preparation. Taking time to set out lines, protect existing surfaces, and plan deliveries makes a big difference to the finish and keeps the job running smoothly on site.',
            tips: [
                'Match brick type and mortar colour to existing work before work begins.',
                'Keep materials covered and protected from rain during the build.',
                'Check levels and coursing regularly as the wall rises.',
                'Plan scaffold and access so work can continue safely.',
                'Leave the site clean at the end of each day.'
            ],
            overview: 'The main challenge was blending new brickwork with the current structure while working in a lived-in residential setting. We solved this with careful setting out, consistent workmanship, and clear communication so the client always knew what was happening next. The result is a solid, tidy finish the homeowner was happy to recommend.'
        },
        'roof-lantern': {
            title: 'Roof Lantern',
            category: 'Architecture',
            image: 'assets/img/portfolio/02.jpeg',
            headerImage: 'assets/img/header/architecture-header.png',
            gallery: ['assets/img/portfolio/02.jpeg', 'assets/img/portfolio/roof-lantern2.jpeg'],
            intro1: 'This roof lantern installation was designed to bring more natural light into the room below and give the space a brighter, more open feel. We worked to the client\'s layout and finish requirements, making sure the lantern suited both the roof structure and the look of the property.',
            intro2: 'The installation included careful measuring, structural checks, and weatherproof detailing so the lantern would perform properly in all seasons. Our team fitted the unit with precision and sealed the surrounding area to protect against water ingress.',
            midText: 'Natural light makes a huge difference to how a room feels, but the fitting has to be done right. We focused on clean lines, secure fixings, and a finish that looks sharp inside and out, with minimal disruption while the work was carried out.',
            tipsText: 'A roof lantern needs to be planned as part of the whole roof, not just dropped in at the end. Getting the opening, supports, and weathering details right early saves time and avoids problems later.',
            tips: [
                'Confirm roof structure and load before cutting the opening.',
                'Choose a lantern size that suits the room below.',
                'Use quality flashings and sealants for long-term weather protection.',
                'Check internal finishes early so plasterwork and trims line up.',
                'Test for leaks before signing off the installation.'
            ],
            overview: 'The challenge here was fitting a modern lantern into an existing roof without compromising weather protection or the internal finish. We managed this with accurate setting out, careful installation, and attention to detail on all sealing points. The client was left with a bright, practical feature that looks great from inside and out.'
        },
        'bespoke-joinery': {
            title: 'Panelled Sink Unit',
            category: 'Interior',
            image: 'assets/img/portfolio/03.jpeg',
            headerImage: 'assets/img/header/bespoke-header.png',
            gallery: ['assets/img/portfolio/03.jpeg', 'assets/img/portfolio/panel-sink2.jpeg'],
            intro1: 'This bespoke joinery project was a custom panelled sink unit built to fit the room and fixed securely to the wall. Rather than a standard off-the-shelf vanity, we made a unit that suited the space, plumbing layout, and finish the client wanted.',
            intro2: 'Our joiners planned the panelling, carcass, and fixings so the unit sat flush to the wall with clean lines and a solid, built-in look. Every detail was measured on site to make sure the sink area worked practically and looked right in the room.',
            midText: 'A wall-connected sink unit needs to be level, secure, and finished properly around pipes and fittings. We took care with the panel detail, edges, and seal lines so the unit feels like part of the room rather than something dropped in at the end.',
            tipsText: 'A panelled sink unit works best when the wall fixing, plumbing positions, and finished sizes are planned early. That keeps the fit tight and avoids awkward gaps around the basin and worktop.',
            tips: [
                'Check wall structure and fixing points before building the unit.',
                'Confirm sink and tap positions before final panel sizes are cut.',
                'Allow access for plumbing maintenance behind or within the unit.',
                'Use moisture-resistant materials in wet areas.',
                'Protect walls and floors during fitting and finishing.'
            ],
            overview: 'The challenge was building a panelled sink unit that connected neatly to the wall while housing the basin and plumbing cleanly. We solved this with accurate site measurements, secure wall fixings, and careful finishing on the panels. The client was left with a smart, custom unit that looks built in and works well every day.'
        },
        'panel-wall': {
            title: 'Panel Wall',
            category: 'Interior',
            image: 'assets/img/portfolio/panel-wall.jpeg',
            headerImage: 'assets/img/header/panel-wall-header.png',
            gallery: ['assets/img/portfolio/panel-wall.jpeg', 'assets/img/portfolio/panel-wall2.jpeg'],
            intro1: 'This panel wall project created a standout interior feature with a clean, modern finish. The aim was to add character to the room while keeping the installation neat, secure, and in proportion with the space.',
            intro2: 'We prepared the wall surface, set out the panel layout, and fitted each section with care so joints, lines, and edges all looked intentional. The result is a sharp feature wall that lifts the whole room.',
            midText: 'Feature walls work best when the detail is right. We focused on alignment, fixing, and finish quality so the panels sit flat, look balanced, and stand up to everyday use in a busy home.',
            tipsText: 'Panel walls need a flat, sound base and a clear layout before fixing begins. Spending time on preparation makes the finished wall look far more polished.',
            tips: [
                'Check walls are level and dry before installation.',
                'Plan panel layout to avoid narrow cuts at edges.',
                'Use the right fixings for the wall substrate.',
                'Work from a central line to keep the pattern balanced.',
                'Fill and touch up carefully for a seamless finish.'
            ],
            overview: 'The challenge was turning a plain wall into a feature without making the room feel busy. We solved this with careful layout, precise fitting, and a finish that suits the rest of the interior. The client was left with a modern panel wall that looks great and feels well built.'
        },
        'interior-wall-tiling': {
            title: 'Wall Tiling',
            category: 'Interior',
            image: 'assets/img/portfolio/tiling.jpeg',
            headerImage: 'assets/img/header/tiling-header.png',
            gallery: ['assets/img/portfolio/tiling.jpeg', 'assets/img/portfolio/tiling2.png'],
            intro1: 'This interior wall tiling project focused on a clean, durable finish that suits the room and stands up to everyday use. The layout was planned carefully so lines, joints, and edges all looked balanced and intentional.',
            intro2: 'We prepared the wall surfaces, set out the tile pattern, and fitted each section with precision. The result is a neat, professional tiled wall that lifts the space and feels built to last.',
            midText: 'Wall tiling works best when the preparation and setting out are right from the start. We focused on level surfaces, accurate cuts, and tidy finishing so the completed wall looks sharp and performs well over time.',
            tipsText: 'Good wall tiling starts with a sound, flat surface and a clear layout. Taking time on preparation keeps the finished wall looking neat and helps the tiles stay secure.',
            tips: [
                'Check walls are level, dry, and suitable for tiling.',
                'Plan the tile layout before fixing begins.',
                'Use the right adhesive and grout for the room conditions.',
                'Keep grout lines consistent for a clean finish.',
                'Protect surrounding surfaces during installation.'
            ],
            overview: 'The challenge was tiling an interior wall with a finish that looked sharp and suited the rest of the room. We solved this with careful surface preparation, accurate setting out, and neat detailing on every edge. The client was left with a smart tiled wall they were happy with.'
        },
        plastering: {
            title: 'Ready for Decoration',
            category: 'Plastering',
            image: 'assets/img/portfolio/Plastering.jpeg',
            headerImage: 'assets/img/header/plastering-header.png',
            gallery: ['assets/img/portfolio/Plastering.jpeg', 'assets/img/portfolio/plastering2.jpeg'],
            intro1: 'This plastering and door project covered smooth wall and ceiling finishes and a fire door fitted ready for decoration. We prepared each surface carefully so the plasterwork went on cleanly and the new door sat neatly in its frame.',
            intro2: 'Our team worked through the plastering in stages — protecting the rest of the property, keeping dust under control, and finishing joints, angles, and reveals neatly around the new door.',
            midText: 'Good plastering is about flat surfaces, clean corners, and details that look right once painted — especially around door frames and new openings. We left this room smooth, secure, and ready for the next stage of decoration.',
            tipsText: 'A finish ready for decoration starts with sound preparation — particularly where walls have been altered or a new door has been fitted. Getting backgrounds flat and dry before skimming saves time later and gives a much better result.',
            tips: [
                'Check walls and ceilings are dry and stable before plastering.',
                'Plan door openings and frame sizes early in the project.',
                'Protect floors, woodwork, and fittings from splashes and dust.',
                'Finish corners and reveals neatly around the door frame.',
                'Allow proper drying time before decoration begins.'
            ],
            overview: 'The challenge was combining a new door installation with plasterwork that would look flawless once decorated. We solved this with careful preparation and consistent finishing on every wall, ceiling, and frame detail. The client was left with a room ready to decorate.'
        },
        'wall-removal': {
            title: 'New Door Opening',
            category: 'Wall Removal',
            image: 'assets/img/portfolio/wall-removal.jpeg',
            headerImage: 'assets/img/header/WALL-REMOVAL-HEADER.png',
            gallery: ['assets/img/portfolio/wall-removal.jpeg', 'assets/img/portfolio/wall-removal2.jpeg'],
            intro1: 'This wall removal project created a new opening between rooms, with the structural work planned and carried out safely from start to finish. We assessed the wall, installed temporary support, and removed the masonry in a controlled way to form the new doorway.',
            intro2: 'Our team worked in stages so the building stayed supported throughout, with dust sheets and protection in place for the rest of the property. Once the opening was formed, the area was left neat, secure, and ready for the next stage of the build.',
            midText: 'Removing a wall for a new door or passage needs proper planning — not just knocking through. We focused on safe support, clean removal, and a tidy finish so the opening was ready for framing, plastering, and the door to be fitted.',
            tipsText: 'Wall removal should always start with a clear understanding of what is structural and how the load will be supported. Getting props, lintels, and protection right keeps the job safe and avoids costly problems later.',
            tips: [
                'Confirm whether the wall is load-bearing before work begins.',
                'Install temporary support and props where required.',
                'Protect adjoining rooms from dust and debris.',
                'Remove masonry in a controlled sequence.',
                'Leave the opening clean and ready for the next trade.'
            ],
            overview: 'The challenge was forming a new doorway safely in a lived-in property without damaging surrounding finishes or compromising the structure. We solved this with careful support, staged removal, and clear communication throughout. The client was left with a secure opening ready for the follow-on work.'
        }
    };

    var key = new URLSearchParams(window.location.search).get('project') || 'brickwork';
    var project = projects[key] || projects.brickwork;

    if (project.headerImage) {
        $('#portfolio-breadcrumb').css('background-image', 'url(' + project.headerImage + ')');
    }

    document.title = project.title + ' | Cottle Construction Ltd';

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', project.title + ' — ' + project.intro1);
    }

    $('#portfolio-breadcrumb-active').text(project.title);
    $('#portfolio-detail-title').text(project.title);
    $('#portfolio-category').text(project.category);
    $('#portfolio-detail-image').attr({ src: project.image, alt: project.title + ' by Cottle Construction' });
    $('#portfolio-intro-1').text(project.intro1);
    $('#portfolio-intro-2').text(project.intro2);
    $('#portfolio-mid-text').text(project.midText);
    $('#portfolio-tips-text').text(project.tipsText);
    $('#portfolio-overview-text').text(project.overview);

    if (project.gallery && project.gallery.length >= 2) {
        $('#portfolio-gallery-1').attr({ src: project.gallery[0], alt: project.title + ' detail' });
        $('#portfolio-gallery-2').attr({ src: project.gallery[1], alt: project.title + ' detail' });

        var heroImage = project.image.split('/').pop();
        var galleryImage = project.gallery[0].split('/').pop();

        if (heroImage === galleryImage) {
            $('#portfolio-gallery-1').closest('.col-md-6').addClass('d-none d-md-block');
        } else {
            $('#portfolio-gallery-1').closest('.col-md-6').removeClass('d-none d-md-block');
        }
    }

    var $tipsList = $('#portfolio-tips-list').empty();
    project.tips.forEach(function (tip) {
        $tipsList.append(
            $('<li></li>').append(
                $('<i></i>').addClass('far fa-check-double'),
                document.createTextNode(tip)
            )
        );
    });
})(jQuery);
