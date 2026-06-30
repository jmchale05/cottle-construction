const SECURITY_HEADERS = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://formsubmit.co; form-action 'self' https://formsubmit.co mailto:; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
    'X-XSS-Protection': '0'
};

export default {
    async fetch(request) {
        const response = await fetch(request);
        const headers = new Headers(response.headers);

        Object.entries(SECURITY_HEADERS).forEach(function (entry) {
            headers.set(entry[0], entry[1]);
        });

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
        });
    }
};
