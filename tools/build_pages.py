"""Generate the static service and portfolio pages, plus sitemap.xml.

Run from the repo root:  python tools/build_pages.py
Edit page content in tools/data/services.json and tools/data/projects.json,
then re-run this script. Each page gets its own title, description, canonical
URL and structured data so Google can index it on its own.
"""
import datetime
import json
import os
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://cottle-construction.co.uk/'
PHONE_DISPLAY = '07776 879715'
EMAIL = 'cottleconstructionltd@hotmail.com'
REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ0T8C_CPYp48R0tAdXHtfnbQ'
OG_IMAGE = SITE + 'assets/img/og-image.jpg'
AREAS_HUB = 'index.html#areas'


def load(name):
    with open(os.path.join(ROOT, 'tools', 'data', name), encoding='utf-8') as f:
        return json.load(f)


def write(name, content):
    with open(os.path.join(ROOT, name), 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)


def e(text):
    return escape(text, quote=True)


def json_ld(data):
    return json.dumps(data, indent=4, ensure_ascii=False).replace('</', '<\\/')


def breadcrumb_ld(section_name, section_href, page_name, page_url):
    return {
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE},
            {'@type': 'ListItem', 'position': 2, 'name': section_name, 'item': SITE + section_href.replace('index.html', '')},
            {'@type': 'ListItem', 'position': 3, 'name': page_name, 'item': page_url},
        ],
    }


def head(title, description, url, header_image, structured_data):
    return f'''<!DOCTYPE html>
<html lang="en-GB">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="description" content="{e(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">

    <title>{e(title)}</title>

    <link rel="canonical" href="{url}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_GB">
    <meta property="og:site_name" content="Cottle Construction Ltd">
    <meta property="og:title" content="{e(title)}">
    <meta property="og:description" content="{e(description)}">
    <meta property="og:url" content="{url}">
    <meta property="og:image" content="{OG_IMAGE}">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="icon" type="image/png" href="assets/img/logo/cottle-icon.png">
    <link rel="preload" as="image" href="{header_image}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/all-fontawesome.min.css">
    <link rel="stylesheet" href="assets/css/animate.min.css">
    <link rel="stylesheet" href="assets/css/style.css?v=20261106a">
    <link rel="stylesheet" href="assets/css/cottle-brand.css?v=20261106a">

    <script type="application/ld+json">
{json_ld(structured_data)}
    </script>

    <script>
        (function () {{
            try {{
                if (sessionStorage.getItem('cottleSubpageEnter') === '1') {{
                    sessionStorage.removeItem('cottleSubpageEnter');
                    document.documentElement.classList.add('cottle-subpage-pending');
                }}
            }} catch (error) {{}}

            function clearSubpagePending() {{
                document.documentElement.classList.remove('cottle-subpage-pending');
            }}

            window.addEventListener('load', clearSubpagePending);
        }})();
    </script>

</head>

<body class="cottle-subpage">

    <a href="index.html" class="subpage-mobile-bar" aria-label="Back to home">
        <span class="subpage-mobile-bar-logo">
            <img src="assets/img/logo/cottle-logo.webp" alt="Cottle Construction Ltd">
        </span>
        <span class="subpage-mobile-bar-label"><i class="far fa-home"></i> Home</span>
    </a>

    <main class="main">
'''


def breadcrumb(element_id, header_image, section_name, section_href, page_name):
    return f'''
        <div class="site-breadcrumb site-breadcrumb-minimal" id="{element_id}" style="background-image: url({header_image})">
            <div class="container">
                <ul class="breadcrumb-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="{section_href}">{section_name}</a></li>
                    <li class="active">{e(page_name)}</li>
                </ul>
            </div>
        </div>
'''


def check_list(items):
    return '\n'.join(
        f'                                            <li><i class="far fa-check-double"></i>{e(item)}</li>'
        for item in items
    )


FOOTER = f'''
    </main>


    <footer class="footer-area">
        <div class="footer-shape" style="background-image: url(assets/img/shape/03.webp);"></div>
        <div class="footer-widget">
            <div class="container">
                <div class="footer-widget-wrap pt-100 pb-80">
                    <div class="row g-4 justify-content-center justify-content-lg-start">
                        <div class="col-lg-4">
                            <div class="footer-widget-box">
                                <h4 class="footer-widget-title">Get In Touch</h4>
                                <ul class="footer-contact">
                                    <li>
                                        <div class="icon">
                                            <i class="far fa-phone"></i>
                                        </div>
                                        <div class="content">
                                            <h6>Call Us</h6>
                                            <a href="tel:{PHONE_DISPLAY.replace(' ', '')}">{PHONE_DISPLAY}</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <i class="far fa-envelope"></i>
                                        </div>
                                        <div class="content">
                                            <h6>Mail Us</h6>
                                            <a href="mailto:{EMAIL}">{EMAIL}</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <i class="far fa-star"></i>
                                        </div>
                                        <div class="content">
                                            <h6>Review Us</h6>
                                            <a href="{REVIEW_URL}" target="_blank" rel="noopener">Leave a Google review</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright">
                <div class="row">
                    <div class="col-12 text-center text-lg-start">
                        <p class="copyright-text">
                            &copy; Copyright <span id="date"></span> <a href="index.html"> Cottle Construction Ltd </a> All Rights Reserved.
                            <span class="copyright-sep" aria-hidden="true"> &middot; </span>
                            <a href="privacy-policy.html">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <a href="#" id="scroll-top"><i class="far fa-arrow-up"></i></a>

    <script src="assets/js/jquery-3.7.1.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/jquery.appear.min.js"></script>
    <script src="assets/js/jquery.easing.min.js"></script>
    <script src="assets/js/wow.min.js"></script>
    <script src="assets/js/main.js?v=20261106a"></script>

</body>

</html>
'''


def service_page(key, service, services):
    url = SITE + service['file']
    structured = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                'name': service['title'],
                'serviceType': service['title'],
                'description': service['metaDescription'],
                'url': url,
                'image': SITE + service['image'],
                'provider': {'@id': SITE + '#business'},
                'areaServed': [
                    {'@type': 'AdministrativeArea', 'name': 'Merseyside'},
                    {'@type': 'City', 'name': 'Liverpool'},
                    {'@type': 'AdministrativeArea', 'name': 'Sefton'},
                    {'@type': 'AdministrativeArea', 'name': 'Knowsley'},
                    {'@type': 'AdministrativeArea', 'name': 'St Helens'},
                    {'@type': 'AdministrativeArea', 'name': 'Wirral'},
                ],
            },
            breadcrumb_ld('Services', 'index.html#services', service['title'], url),
        ],
    }

    sidebar = '\n'.join(
        '                                        <a href="{file}"{active}><i class="far fa-angle-double-right"></i>{title}</a>'.format(
            file=other['file'],
            active=' class="active" aria-current="page"' if other_key == key else '',
            title=e(other['title']),
        )
        for other_key, other in services.items()
    )

    title = e(service['title'])
    body = f'''
        <div class="service-single py-120">
            <div class="container">
                <div class="service-single-wrap">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4">
                            <div class="service-sidebar">
                                <div class="widget">
                                    <h4 class="title">All Services</h4>
                                    <div class="category">
{sidebar}
                                    </div>
                                </div>
                                <div class="widget project">
                                    <h4>Ready to start your project?</h4>
                                    <a href="index.html#contact" class="theme-btn2">Contact Now<i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="service-details">
                                <div class="mb-30 service-detail-hero">
                                    <img src="{service['image']}" alt="{title} by Cottle Construction in Merseyside">
                                </div>
                                <div class="content">
                                    <h1 class="mb-20 detail-title">{e(service['heading'])}</h1>
                                    <p class="mb-20">{e(service['intro1'])}</p>
                                    <p class="mb-20">{e(service['intro2'])}</p>
                                    <div class="row">
                                        <div class="col-md-6 mb-20 d-none d-md-block">
                                            <img src="{service['image']}" alt="{title} detail" loading="lazy">
                                        </div>
                                        <div class="col-12 col-md-6 mb-20">
                                            <img src="{service['secondaryImage']}" alt="{title} detail" loading="lazy">
                                        </div>
                                    </div>
                                    <p class="mb-20">{e(service['midText'])}</p>
                                    <div class="my-4">
                                        <div class="mb-3">
                                            <h2 class="mb-3">Our Work Process</h2>
                                            <p>{e(service['processText'])}</p>
                                        </div>
                                        <ul class="list">
{check_list(service['benefits'])}
                                        </ul>
                                    </div>
                                    <div class="mt-4">
                                        <h2 class="mb-3">Why Choose This Service?</h2>
                                        <p>{e(service['why'])}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
'''
    return (head(service['seoTitle'], service['metaDescription'], url, service['headerImage'], structured)
            + breadcrumb('service-breadcrumb', service['headerImage'], 'Services', 'index.html#services', service['title'])
            + body + FOOTER)


def project_page(project):
    url = SITE + project['file']
    structured = {
        '@context': 'https://schema.org',
        '@graph': [breadcrumb_ld('Portfolio', 'index.html#portfolio', project['title'], url)],
    }

    title = e(project['title'])
    body = f'''
        <div class="portfolio-single py-120">
            <div class="container">
                <div class="portfolio-single-wrap">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4">
                            <div class="portfolio-sidebar">
                                <div class="widget">
                                    <h4 class="title">Portfolio Info</h4>
                                    <ul class="list">
                                        <li>
                                            Category <span>{e(project['category'])}</span>
                                        </li>
                                        <li>
                                            Location <span>Merseyside, UK</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="widget project">
                                    <h4>Planning a similar project? Get a free, no-obligation quote.</h4>
                                    <a href="index.html#contact" class="theme-btn2">Contact Now<i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="portfolio-details">
                                <div class="mb-30 portfolio-detail-hero">
                                    <img src="{project['image']}" alt="{title} by Cottle Construction in Merseyside">
                                </div>
                                <div class="content">
                                    <h1 class="mb-20 detail-title">{title}</h1>
                                    <p class="mb-20">{e(project['intro1'])}</p>
                                    <p class="mb-20">{e(project['intro2'])}</p>
                                    <div class="row">
                                        <div class="col-md-6 mb-20 d-none d-md-block">
                                            <img src="{project['gallery'][0]}" alt="{title} detail" loading="lazy">
                                        </div>
                                        <div class="col-md-6 mb-20">
                                            <img src="{project['gallery'][1]}" alt="{title} detail" loading="lazy">
                                        </div>
                                    </div>
                                    <p class="mb-20">{e(project['midText'])}</p>
                                    <div class="my-4">
                                        <div class="mb-3">
                                            <h2 class="mb-3">Project Tips</h2>
                                            <p>{e(project['tipsText'])}</p>
                                        </div>
                                        <ul class="list">
{check_list(project['tips'])}
                                        </ul>
                                    </div>
                                    <div class="mt-4">
                                        <h2 class="mb-3">Overview &amp; Challenge</h2>
                                        <p>{e(project['overview'])}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
'''
    return (head(project['seoTitle'], project['metaDescription'], url, project['headerImage'], structured)
            + breadcrumb('portfolio-breadcrumb', project['headerImage'], 'Portfolio', 'index.html#portfolio', project['title'])
            + body + FOOTER)


def area_page(key, area, areas, services, projects):
    url = SITE + area['file']
    structured = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                'name': area['heading'],
                'url': url,
                'description': area['metaDescription'],
                'about': {'@id': SITE + '#business'},
            },
            breadcrumb_ld('Areas We Cover', AREAS_HUB, area['heading'], url),
        ],
    }

    sidebar = '\n'.join(
        '                                        <a href="{file}"{active}><i class="far fa-angle-double-right"></i>{name}</a>'.format(
            file=other['file'],
            active=' class="active" aria-current="page"' if other_key == key else '',
            name=e(other.get('menuLabel') or other['name'][0].upper() + other['name'][1:]),
        )
        for other_key, other in areas.items()
    )
    service_links = '\n'.join(
        f'                                            <li><i class="far fa-check-double"></i><a href="{s["file"]}">{e(s["title"])}</a> &ndash; {e(s["benefits"][0])}</li>'
        for s in services.values()
    )
    project_links = ', '.join(
        f'<a href="{p["file"]}">{e(p["title"].lower())}</a>' for p in list(projects.values())[:4]
    )
    local = '\n'.join(f'                                        <p class="mb-20">{e(text)}</p>' for text in area['local'])
    places = ', '.join(e(place) for place in area['places'])
    name = e(area['name'])
    photo = area['photo']

    body = f'''
        <div class="service-single py-120">
            <div class="container">
                <div class="service-single-wrap">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4">
                            <div class="service-sidebar">
                                <div class="widget">
                                    <h4 class="title">Areas We Cover</h4>
                                    <div class="category">
{sidebar}
                                    </div>
                                </div>
                                <div class="widget project">
                                    <h4>Need a builder in {name}? Get a free, no-obligation quote.</h4>
                                    <a href="index.html#contact" class="theme-btn2">Contact Now<i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="service-details">
                                <div class="mb-30 service-detail-hero area-photo">
                                    <img src="{area['image']}" alt="{e(photo['subject'])}">
                                </div>
                                <div class="content">
                                    <h1 class="mb-20 detail-title">{e(area['heading'])}</h1>
                                    <p class="mb-20">{e(area['intro1'])}</p>
                                    <p class="mb-20">{e(area['intro2'])}</p>
                                    <div class="my-4">
                                        <h2 class="mb-3">Our Services in {name}</h2>
                                        <ul class="list">
{service_links}
                                        </ul>
                                    </div>
                                    <div class="my-4">
                                        <h2 class="mb-3">{e(area['localTitle'])}</h2>
{local}
                                    </div>
                                    <div class="my-4">
                                        <h2 class="mb-3">Where We Work</h2>
                                        <p class="mb-20">We cover {places} and the surrounding areas. Not sure if we cover your street? Give us a call on <a href="tel:{PHONE_DISPLAY.replace(' ', '')}">{PHONE_DISPLAY}</a>.</p>
                                    </div>
                                    <div class="mt-4">
                                        <h2 class="mb-3">Why Choose Cottle Construction?</h2>
                                        <p class="mb-20">{e(area['why'])}</p>
                                        <p>See examples of our work across Merseyside, including {project_links}.</p>
                                    </div>
                                    <p class="area-photo-credit">Image credit: {e(photo['subject'])} by <a href="{photo['source']}" target="_blank" rel="noopener">{e(photo['artist'])}</a>, <a href="{photo['licenseUrl']}" target="_blank" rel="noopener">{photo['license']}</a>, resized.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
'''
    return (head(area['seoTitle'], area['metaDescription'], url, area['headerImage'], structured)
            + breadcrumb('service-breadcrumb', area['headerImage'], 'Areas We Cover', AREAS_HUB, area['heading'])
            + body + FOOTER)


def redirect_page(param, mapping, fallback):
    """Old ?service= / ?project= URLs forward to the new static pages."""
    links = '\n'.join(f'        <li><a href="{v}">{e(k)}</a></li>' for k, v in mapping.items())
    return f'''<!DOCTYPE html>
<html lang="en-GB">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cottle Construction Ltd</title>
    <script>
        (function () {{
            var pages = {json.dumps(mapping)};
            var key = new URLSearchParams(window.location.search).get('{param}');
            window.location.replace(pages[key] || '{fallback}');
        }})();
    </script>
</head>

<body>
    <p>This page has moved:</p>
    <ul>
{links}
    </ul>
</body>

</html>
'''


def sitemap(services, projects, areas):
    today = datetime.date.today().isoformat()
    entries = [(SITE, 'weekly', '1.0')]
    entries += [(SITE + s['file'], 'monthly', '0.8') for s in services.values()]
    entries += [(SITE + a['file'], 'monthly', '0.7') for a in areas.values()]
    entries += [(SITE + p['file'], 'monthly', '0.6') for p in projects.values()]
    entries.append((SITE + 'privacy-policy.html', 'yearly', '0.3'))
    urls = '\n'.join(f'''    <url>
        <loc>{loc}</loc>
        <lastmod>{today}</lastmod>
        <changefreq>{freq}</changefreq>
        <priority>{priority}</priority>
    </url>''' for loc, freq, priority in entries)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}
</urlset>
'''


def main():
    services = load('services.json')
    projects = load('projects.json')
    areas = load('areas.json')

    for key, service in services.items():
        write(service['file'], service_page(key, service, services))
    for project in projects.values():
        write(project['file'], project_page(project))
    for key, area in areas.items():
        write(area['file'], area_page(key, area, areas, services, projects))

    write('individual-service.html', redirect_page(
        'service', {k: v['file'] for k, v in services.items()}, next(iter(services.values()))['file']))
    write('portfolio-single.html', redirect_page(
        'project', {k: v['file'] for k, v in projects.items()}, next(iter(projects.values()))['file']))
    write('sitemap.xml', sitemap(services, projects, areas))

    print(f'Built {len(services)} service pages, {len(projects)} project pages, '
          f'{len(areas)} area pages and sitemap.xml')


if __name__ == '__main__':
    main()
