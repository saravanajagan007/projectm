# ProjectM — Web Design, Development & Digital Marketing Agency

A high-converting, single-page agency website built for **ProjectM**, specializing in custom web design/development and data-driven digital marketing (SEO, Google/Meta Ads).

Designed with a clean, **pure white background** (`#ffffff`), modern **emerald green** accents (`#059669`, `#10b981`), fluid typography, mobile-first touch optimization (44px+ hit targets), simple & neat minimal case studies, and shared webhosting compatibility.

---

## 🚀 Key Features

1. **Pure White & Emerald Green Design:**
   - Clean, modern, high-contrast light theme with pure white background (`#ffffff`).
   - Vibrant emerald primary styling (`#059669`) with subtle borders and shadows.
2. **Smooth Inline Animated Hero Headline:**
   - Text dynamically cycles through key agency capabilities (`Modern Websites`, `Digital Marketing`, `Targeted SEO`, `Paid Ads & PPC`, `Custom Web Apps`) seamlessly on the exact same line without breaking.
3. **Streamlined Services:**
   - Focused strictly on core agency offerings: Custom Web & SaaS Development, Conversion UI/UX, Technical & Content SEO, Google & Meta Paid Advertising, and High-Speed E-Commerce Systems.
   - Interactive tab filtering across All Services, Web Development, and Digital Marketing.
4. **Dark Textured Footer:**
   - Elegant dark textured background (`#080f0c`) featuring micro-dot radial grid patterns, emerald highlights, high-contrast typography, newsletter signup, and full social links.
5. **Interactive Contact & Sample Map:**
   - Interactive embedded sample location map.
   - Prominent **Direct Phone** and **WhatsApp Chat** buttons (`+91 88076 49359`).
   - Floating WhatsApp quick-connect trigger.
6. **Lightweight & Shared Hosting Compatible:**
   - 100% pure HTML5, vanilla CSS3, and JavaScript (ES6+).
   - Zero Node.js build dependencies or server daemon required.
   - Ready for instant deployment on any shared web hosting (cPanel, Apache, LiteSpeed, Nginx).

---

## 📁 Directory Structure

```
projectm/
├── index.html          # Semantic HTML5 single-page architecture (pure white light theme)
├── css/
│   └── style.css       # Clean white styling, emerald accents, fluid clamps, mobile-first
├── js/
│   ├── main.js         # Interactive navigation, inline dynamic hero rotator, FAQ, scroll effects
│   └── contact.js      # AJAX form handler, validation, rate limiting, and toast system
├── api/
│   └── contact.php     # Shared hosting PHP mailer with rate limiting and honeypot protection
├── assets/
│   ├── favicon.svg     # Geometric emerald monogram vector favicon
│   └── images/         # Asset placeholders
├── .htaccess           # Apache / LiteSpeed performance & security configuration
├── rules.md            # Project rules inheriting from global workspace standards
└── README.md           # Documentation
```

---

## 🛠️ Deployment on Shared Webhosting (cPanel / Apache)

1. Connect to your shared hosting account via **cPanel File Manager** or **FTP (FileZilla / WinSCP)**.
2. Navigate to your target web root folder (usually `public_html` or a subfolder / subdomain).
3. Upload all files from the `projectm` directory:
   - `index.html`
   - `css/`
   - `js/`
   - `api/`
   - `assets/`
   - `.htaccess`
4. In `api/contact.php`, update the `$to` variable to your preferred notification email address:
   ```php
   $to = 'your-email@yourdomain.com';
   ```
5. Test the contact form and interactions live in your browser.

---

## 📜 Rules & Standards
- Inherits from: [`P:\global-rules.md`](P:/global-rules.md) and [`projects/.agents/rules/global-rules.md`](../.agents/rules/global-rules.md).
