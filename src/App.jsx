import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseEnabled } from "./supabaseClient";
import ElectricBorder from "./ElectricBorder";
import GhostCursor from "./GhostCursor";
import profileLogo from "./assets/nadjib-web-solutions.svg";



function GmailIcon({ title }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" fill="rgba(127,106,248,0.08)" stroke="#B9A9FF" strokeWidth="1.5"/>
      <path d="M4 6L12 13L20 6" stroke="#B9A9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18V8.1L12 14.5L20 8.1V18" stroke="#B9A9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatsAppIcon({ title }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.0706 2.55016 16.0444 3.53623 17.7468L2 22L6.40272 20.4506C7.97712 21.3571 9.90541 21.8667 12 21.8667C17.5228 21.8667 22 17.3895 22 11.8667C22 6.34394 17.5228 2 12 2Z" fill="rgba(127,106,248,0.08)" stroke="#B9A9FF" strokeWidth="1.5"/>
      <path d="M8.5 14.5C8.5 14.5 9.8 13.6 10.4 13.4C10.9 13.3 11.6 13.5 12.4 14.2C12.9 14.7 13.7 15.3 14.3 15.4C14.8 15.5 15.3 15.5 15.7 15.4C16 15.3 16.4 15.1 16.7 14.8C17 14.5 17.3 14.1 17.4 13.7C17.5 13.2 17.3 12.7 16.9 12.2C16.5 11.7 15.9 11 15.1 10.5C14.6 10.2 13.9 9.9 13.5 9.8C13.1 9.7 12.6 9.7 12.2 9.8C11.9 9.9 11.5 10.1 11.2 10.3L10.9 10.5C10.6 10.7 10.3 11 10.1 11.3C9.7 11.8 9.4 12.4 9.3 12.9C9.2 13.4 9.3 13.9 9.5 14.2C9.6 14.4 9.6 14.5 9.7 14.5H8.5Z" fill="#B9A9FF"/>
    </svg>
  );
}

function BlurText({ as: Tag = "span", text, className = "", style, delay = 0, step = 0.045 }) {
  const words = String(text).split(" ");

  return (
    <Tag className={`blur-text ${className}`.trim()} style={style} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="blur-text-word"
          aria-hidden="true"
          style={{ animationDelay: `${delay + index * step}s` }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

function ProfileCard({ image, onContact }) {
  const cardRef = useRef(null);

  const setPointerVars = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const fromLeft = x / rect.width;
    const fromTop = y / rect.height;
    const fromCenter = Math.min(
      1,
      Math.hypot(fromLeft - 0.5, fromTop - 0.5) / 0.707
    );

    card.style.setProperty("--pointer-x", `${fromLeft * 100}%`);
    card.style.setProperty("--pointer-y", `${fromTop * 100}%`);
    card.style.setProperty("--pointer-from-left", fromLeft.toFixed(3));
    card.style.setProperty("--pointer-from-top", fromTop.toFixed(3));
    card.style.setProperty("--pointer-from-center", fromCenter.toFixed(3));
    card.style.setProperty("--rotate-x", `${(fromLeft - 0.5) * 14}deg`);
    card.style.setProperty("--rotate-y", `${(0.5 - fromTop) * 12}deg`);
    card.style.setProperty("--background-x", `${35 + fromLeft * 30}%`);
    card.style.setProperty("--background-y", `${35 + fromTop * 30}%`);
  };

  const resetPointerVars = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--pointer-from-left", "0.5");
    card.style.setProperty("--pointer-from-top", "0.5");
    card.style.setProperty("--pointer-from-center", "0");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--background-x", "50%");
    card.style.setProperty("--background-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      className="pc-card-wrapper"
      onPointerMove={setPointerVars}
      onPointerLeave={resetPointerVars}
    >
      <div className="pc-behind" />
      <article className="pc-card" aria-label="Nadjib profile card">
        <div className="pc-inside" />
        <div className="pc-photo-layer">
          <img className="pc-photo" src={image} alt="ABDERRAHMANE NADJIB" />
        </div>
        <div className="pc-shine" />
        <div className="pc-glare" />
        <div className="pc-content">
          <div className="pc-details">
            <h3>NADJIB</h3>
            <p>Full-stack creator</p>
          </div>
        </div>
        <div className="pc-user-info">
          <div className="pc-user-details">
            <div className="pc-mini-avatar">
              <img src={image} alt="" />
            </div>
            <div className="pc-user-text">
              <a className="pc-handle" href="mailto:nedjaoumnadjib@gmail.com">nedjaoumnadjib@gmail.com</a>
              <span className="pc-status">Available for projects</span>
            </div>
          </div>
          <button className="pc-contact-btn" type="button" onClick={onContact}>
            Contact
          </button>
        </div>
      </article>
    </div>
  );
}

const TRANSLATIONS = {
  en: {
    nav: { home: "Home", rating: "Rating", about: "About", services: "Services", portfolio: "Portfolio", contact: "Contact", dashboard: "Dashboard" },
    hero: {
      greeting: "Hello, I'm",
      name: "ABDERRAHMANE NADJIB",
      title: "IM JUST MAN CAN DO WHAT THEY CANT DO",
      subtitle: "I build custom websites, web apps, desktop software, and automation scripts — tailored precisely to your needs.",
      cta: "Start a Project",
      ctaSecondary: "View My Work",
    },
    about: {
      title: "About Me",
      p1: "I'm a passionate software developer with deep expertise in building scalable, modern digital solutions. From elegant landing pages to complex enterprise systems, I bring ideas to life with clean code and thoughtful design.",
      p2: "Based in Oran, Algeria — serving clients worldwide. I specialize in end-to-end product development, from database architecture to polished user interfaces.",
      stats: ["Projects Completed", "Happy Clients", "Years Experience", "Technologies"],
      vals: ["50+", "30+", "5+", "20+"],
    },
    services: {
      title: "Services & Pricing",
      subtitle: "Transparent pricing, professional results.",
      items: [
        { icon: "ti-world-www", name: "Custom Website", desc: "Responsive, SEO-optimized websites tailored to your brand identity.", price: "From 2000 DZD" },
        { icon: "ti-apps", name: "Web Application", desc: "Full-stack web apps with authentication, dashboards, and APIs.", price: "From 5000 DZD" },
        { icon: "ti-device-desktop", name: "Desktop Application", desc: "Cross-platform desktop apps with modern UI and system integrations.", price: "From 4000 DZD" },
        { icon: "ti-terminal-2", name: "Scripts & Automation", desc: "Custom scripts to automate repetitive tasks and workflows.", price: "From 800 DZD" },
        { icon: "ti-bug", name: "Bug Fixing & Support", desc: "Diagnose and fix issues in existing codebases, fast turnaround.", price: "From 500 DZD" },
        { icon: "ti-headset", name: "Ongoing Maintenance", desc: "Monthly support plans to keep your software running smoothly.", price: "From 1000 DZD/mo" },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Recent projects I'm proud of.",
      filters: ["All", "Web", "App", "Desktop", "Script"],
      items: [
        { title: "E-Commerce Platform", cat: "Web", desc: "Full-featured online store with inventory management and Stripe payments.", tech: ["React", "Node.js", "PostgreSQL"], color: "purple" },
        { title: "HR Management System", cat: "App", desc: "Employee tracking, payroll automation, and performance reviews.", tech: ["Vue", "Express", "MongoDB"], color: "teal" },
        { title: "Stock Tracker Desktop", cat: "Desktop", desc: "Real-time stock data visualization with alerts and portfolio analysis.", tech: ["Electron", "Python", "SQLite"], color: "coral" },
        { title: "Invoice Automation Bot", cat: "Script", desc: "Auto-generates and emails PDF invoices from Google Sheets data.", tech: ["Python", "Selenium", "SMTP"], color: "amber" },
        { title: "Restaurant Booking App", cat: "Web", desc: "Online reservations, table management, and SMS confirmations.", tech: ["Next.js", "Prisma", "Twilio"], color: "blue" },
        { title: "File Organizer Tool", cat: "Script", desc: "Intelligent file sorting and duplicate detection for large archives.", tech: ["Python", "Tkinter"], color: "green" },
      ],
    },
    testimonials: {
      title: "What Clients Say",
      items: [
        { name: "Sarah M.", role: "Startup Founder", text: "NADJIB delivered our MVP in 3 weeks. Clean code, on time, great communication. Will hire again.", rating: 5 },
        { name: "Karim B.", role: "E-commerce Owner", text: "The web store he built doubled our conversions in the first month. Absolutely professional.", rating: 5 },
        { name: "Fouad A.", role: "Marketing Director", text: "Our new website looks stunning. He understood our brand vision immediately.", rating: 5 },
        { name: "Ahmed T.", role: "Operations Manager", text: "The automation scripts saved us 20+ hours per week. An incredible return on investment.", rating: 5 },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How long does a typical project take?", a: "Simple websites take 1–2 weeks. Full web apps typically take 4–8 weeks depending on complexity. I'll give you a precise timeline after reviewing your requirements." },
        { q: "Do you offer revisions?", a: "Yes — all projects include at least 2 revision rounds. I aim to get it right the first time, but your satisfaction is guaranteed." },
        { q: "How do payments work?", a: "I typically work with 50% upfront and 50% upon delivery. For larger projects, milestone-based payments can be arranged." },
        { q: "Will I own the code?", a: "Absolutely. Once payment is complete, you own all the source code and intellectual property outright." },
        { q: "Do you provide ongoing support?", a: "Yes, I offer monthly maintenance plans. I also provide 2 weeks of free post-launch support for any bugs." },
        { q: "Can you work with an existing codebase?", a: "Definitely. I frequently step into existing projects for refactoring, bug fixes, or feature additions." },
      ],
    },
    contact: {
      title: "Start a Project",
      subtitle: "Tell me about your project and I'll get back to you within 24 hours.",
      fields: { name: "Full Name", email: "Email Address", type: "Project Type", budget: "Budget", desc: "Project Description", submit: "Send Request" },
      types: ["Website", "Web Application", "Desktop App", "Script / Automation", "Bug Fix / Support", "Other"],
      budgets: ["< 1000 DZD", "1000–5000 DZD", "5000–20000 DZD", "20000–50000 DZD", "50000+ DZD", "Let's discuss"],
      success: "Your request has been sent! I'll reply within 24 hours.",
    },
    admin: {
      title: "Admin Dashboard",
      subtitle: "Project requests from clients.",
      cols: ["Name", "Email", "Type", "Budget", "Status", "Date"],
      statuses: { pending: "Pending", reviewed: "Reviewed", accepted: "Accepted", declined: "Declined" },
      empty: "No requests yet.",
      login: { title: "Admin Login", user: "Username", pass: "Password", btn: "Sign In", error: "Invalid credentials." },
    },
    status: { title: "Project Status", placeholder: "Enter your project ID...", check: "Check Status", notFound: "No project found with that ID." },
  },
  fr: {
    nav: { home: "Accueil", rating: "Avis", about: "À propos", services: "Services", portfolio: "Portfolio", contact: "Contact", dashboard: "Tableau de bord" },
    hero: {
      greeting: "Bonjour, je suis",
      name: "ABDERRAHMANE NADJIB",
      title: "IM JUST MAN CAN DO WHAT THEY CANT DO",
      subtitle: "Je crée des sites web, des applications web, des logiciels desktop et des scripts d'automatisation — sur mesure pour vos besoins.",
      cta: "Démarrer un projet",
      ctaSecondary: "Voir mes travaux",
    },
    about: {
      title: "À propos de moi",
      p1: "Développeur passionné avec une expertise approfondie dans la création de solutions numériques modernes et évolutives. Des pages d'atterrissage aux systèmes d'entreprise complexes, je donne vie aux idées avec un code propre.",
      p2: "Basé à Oran, Algérie — au service de clients dans le monde entier. Je me spécialise dans le développement de produits de bout en bout.",
      stats: ["Projets réalisés", "Clients satisfaits", "Ans d'expérience", "Technologies"],
      vals: ["50+", "30+", "5+", "20+"],
    },
    services: {
      title: "Services & Tarifs",
      subtitle: "Tarification transparente, résultats professionnels.",
      items: [
        { icon: "ti-world-www", name: "Site web personnalisé", desc: "Sites responsive et optimisés SEO adaptés à votre marque.", price: "À partir de 2000 DZD" },
        { icon: "ti-apps", name: "Application web", desc: "Applications full-stack avec authentification, tableaux de bord et APIs.", price: "À partir de 5000 DZD" },
        { icon: "ti-device-desktop", name: "Application desktop", desc: "Applications desktop multiplateformes avec interface moderne.", price: "À partir de 4000 DZD" },
        { icon: "ti-terminal-2", name: "Scripts & Automatisation", desc: "Scripts personnalisés pour automatiser les tâches répétitives.", price: "À partir de 800 DZD" },
        { icon: "ti-bug", name: "Correction de bugs", desc: "Diagnostic et correction rapide des problèmes dans votre code.", price: "À partir de 500 DZD" },
        { icon: "ti-headset", name: "Maintenance continue", desc: "Plans de support mensuel pour garder votre logiciel opérationnel.", price: "À partir de 1000 DZD/mois" },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Projets récents dont je suis fier.",
      filters: ["Tous", "Web", "App", "Desktop", "Script"],
      items: [
        { title: "Plateforme E-Commerce", cat: "Web", desc: "Boutique en ligne complète avec gestion des stocks et paiements Stripe.", tech: ["React", "Node.js", "PostgreSQL"], color: "purple" },
        { title: "Système RH", cat: "App", desc: "Suivi des employés, automatisation de la paie et évaluations.", tech: ["Vue", "Express", "MongoDB"], color: "teal" },
        { title: "Tracker Boursier Desktop", cat: "Desktop", desc: "Visualisation des données boursières en temps réel avec alertes.", tech: ["Electron", "Python", "SQLite"], color: "coral" },
        { title: "Bot de Facturation", cat: "Script", desc: "Génération et envoi automatique de factures PDF depuis Google Sheets.", tech: ["Python", "Selenium", "SMTP"], color: "amber" },
        { title: "App Réservation Restaurant", cat: "Web", desc: "Réservations en ligne, gestion des tables et confirmations SMS.", tech: ["Next.js", "Prisma", "Twilio"], color: "blue" },
        { title: "Organisateur de Fichiers", cat: "Script", desc: "Tri intelligent et détection de doublons pour grandes archives.", tech: ["Python", "Tkinter"], color: "green" },
      ],
    },
    testimonials: {
      title: "Ce que disent les clients",
      items: [
        { name: "Sarah M.", role: "Fondatrice de Startup", text: "Livraison parfaite — le MVP est sorti à temps et le code était propre. La communication est restée claire du début à la fin.", rating: 5 },
        { name: "Karim B.", role: "Propriétaire E-commerce", text: "Nos ventes ont rapidement progressé après le lancement. La boutique est aboutie et facile à gérer.", rating: 5 },
        { name: "Fouad A.", role: "Directrice Marketing", text: "La refonte du site a parfaitement capturé notre marque. C'était rapide, fiable et exactement ce dont nous avions besoin.", rating: 5 },
        { name: "Ahmed T.", role: "Directeur des Opérations", text: "L'automatisation nous a fait gagner du temps chaque semaine. La solution était pratique, bien construite et livrée vite.", rating: 5 },
      ],
    },
    faq: {
      title: "Questions Fréquentes",
      items: [
        { q: "Combien de temps dure un projet typique?", a: "Les sites simples prennent 1 à 2 semaines. Les applications web complètes prennent généralement 4 à 8 semaines selon la complexité." },
        { q: "Proposez-vous des révisions?", a: "Oui, tous les projets incluent au moins 2 cycles de révision. Je m'efforce de bien faire du premier coup, mais votre satisfaction est garantie." },
        { q: "Comment fonctionnent les paiements?", a: "Je travaille généralement avec 50% à l'avance et 50% à la livraison. Pour les projets plus importants, des paiements par jalons peuvent être organisés." },
        { q: "Serai-je propriétaire du code?", a: "Absolument. Une fois le paiement effectué, vous êtes propriétaire de tout le code source et de la propriété intellectuelle." },
        { q: "Proposez-vous un support continu?", a: "Oui, je propose des plans de maintenance mensuelle. Je fournis également 2 semaines de support post-lancement gratuit." },
        { q: "Pouvez-vous travailler sur une base de code existante?", a: "Absolument. J'interviens fréquemment dans des projets existants pour des refactorisations, corrections de bugs ou ajout de fonctionnalités." },
      ],
    },
    contact: {
      title: "Démarrer un projet",
      subtitle: "Parlez-moi de votre projet et je vous répondrai dans les 24 heures.",
      fields: { name: "Nom complet", email: "Adresse email", type: "Type de projet", budget: "Budget", desc: "Description du projet", rating: "Note", review: "Avis", submit: "Envoyer la demande" },
      reviewRole: "Client",
      types: ["Site web", "Application web", "Application desktop", "Script / Automatisation", "Correction de bug / Support", "Autre"],
      budgets: ["< 1000 DZD", "1000–5000 DZD", "5000–20000 DZD", "20000–50000 DZD", "50000+ DZD", "À discuter"],
      success: "Votre demande a été envoyée! Je vous répondrai dans les 24 heures.",
    },
    admin: {
      title: "Tableau de bord Admin",
      subtitle: "Surveillez les demandes de projet client et leur avancée depuis un espace sécurisé.",
      cols: ["Nom", "Email", "Type", "Budget", "Statut", "Date"],
      statuses: { pending: "En attente", reviewed: "Examiné", accepted: "Accepté", declined: "Refusé" },
      empty: "Aucune demande pour l'instant.",
      login: { title: "Connexion Admin", user: "Nom d'utilisateur", pass: "Mot de passe", btn: "Se connecter", error: "Identifiants invalides." },
    },
    status: { title: "Statut du projet", placeholder: "Entrez votre ID de projet...", check: "Vérifier", notFound: "Aucun projet trouvé avec cet ID." },
  },
  ar: {
    nav: { home: "الرئيسية", rating: "التقييم", about: "عني", services: "الخدمات", portfolio: "أعمالي", contact: "تواصل", dashboard: "لوحة التحكم" },
    hero: {
      greeting: "مرحباً، أنا",
      name: "عبد الرحمن نجيب",
      title: "IM JUST MAN CAN DO WHAT THEY CANT DO",
      subtitle: "أبني مواقع إلكترونية، تطبيقات ويب، برامج سطح المكتب وسكريبتات الأتمتة — مُصمَّمة خصيصاً لاحتياجاتك.",
      cta: "ابدأ مشروعك",
      ctaSecondary: "استعرض أعمالي",
    },
    about: {
      title: "عني",
      p1: "مطوّر برمجيات متحمس بخبرة عميقة في بناء حلول رقمية حديثة وقابلة للتوسع. من الصفحات البسيطة إلى الأنظمة المعقدة، أحوّل الأفكار إلى واقع بكود نظيف وتصميم مدروس.",
      p2: "مقيم في وهران، الجزائر — أخدم عملاء حول العالم. متخصص في تطوير المنتجات من الألف إلى الياء.",
      stats: ["مشروع مكتمل", "عميل راضٍ", "سنوات خبرة", "تقنية"],
      vals: ["50+", "30+", "5+", "20+"],
    },
    services: {
      title: "الخدمات والأسعار",
      subtitle: "أسعار شفافة، نتائج احترافية.",
      items: [
        { icon: "ti-world-www", name: "موقع إلكتروني مخصص", desc: "مواقع متجاوبة ومحسّنة لمحركات البحث تعكس هوية علامتك التجارية.", price: "يبدأ من 2000 DZD" },
        { icon: "ti-apps", name: "تطبيق ويب", desc: "تطبيقات متكاملة مع مصادقة ولوحات تحكم وواجهات برمجية.", price: "يبدأ من 5000 DZD" },
        { icon: "ti-device-desktop", name: "تطبيق سطح المكتب", desc: "تطبيقات متعددة المنصات بواجهة حديثة وتكاملات النظام.", price: "يبدأ من 4000 DZD" },
        { icon: "ti-terminal-2", name: "سكريبتات وأتمتة", desc: "سكريبتات مخصصة لأتمتة المهام المتكررة وتحسين سير العمل.", price: "يبدأ من 800 DZD" },
        { icon: "ti-bug", name: "إصلاح الأخطاء والدعم", desc: "تشخيص وإصلاح سريع للمشاكل في الأكواد البرمجية الموجودة.", price: "يبدأ من 500 DZD" },
        { icon: "ti-headset", name: "صيانة مستمرة", desc: "خطط دعم شهرية للحفاظ على تشغيل برمجياتك بسلاسة.", price: "يبدأ من 1000 DZD/شهر" },
      ],
    },
    portfolio: {
      title: "أعمالي",
      subtitle: "مشاريع حديثة أعتز بها.",
      filters: ["الكل", "ويب", "تطبيق", "سطح المكتب", "سكريبت"],
      items: [
        { title: "منصة تجارة إلكترونية", cat: "ويب", desc: "متجر إلكتروني متكامل مع إدارة المخزون ومدفوعات Stripe.", tech: ["React", "Node.js", "PostgreSQL"], color: "purple" },
        { title: "نظام إدارة الموارد البشرية", cat: "تطبيق", desc: "تتبع الموظفين، أتمتة الرواتب وتقييمات الأداء.", tech: ["Vue", "Express", "MongoDB"], color: "teal" },
        { title: "تطبيق تتبع الأسهم", cat: "سطح المكتب", desc: "عرض بيانات الأسهم في الوقت الفعلي مع تنبيهات وتحليلات.", tech: ["Electron", "Python", "SQLite"], color: "coral" },
        { title: "بوت الفوترة التلقائية", cat: "سكريبت", desc: "إنشاء وإرسال فواتير PDF تلقائياً من بيانات Google Sheets.", tech: ["Python", "Selenium", "SMTP"], color: "amber" },
        { title: "تطبيق حجوزات المطاعم", cat: "ويب", desc: "حجوزات أونلاين وإدارة الطاولات وتأكيدات SMS.", tech: ["Next.js", "Prisma", "Twilio"], color: "blue" },
        { title: "أداة تنظيم الملفات", cat: "سكريبت", desc: "فرز ذكي للملفات وكشف المكررات للأرشيفات الكبيرة.", tech: ["Python", "Tkinter"], color: "green" },
      ],
    },
    testimonials: {
      title: "ماذا يقول العملاء",
      items: [
        { name: "سارة م.", role: "مؤسسة شركة ناشئة", text: "التسليم كان ممتازاً — المنتج الأولي خرج في الوقت المحدد والكود كان مرتباً. التواصل كان واضحاً منذ البداية.", rating: 5 },
        { name: "كريم ب.", role: "صاحب متجر إلكتروني", text: "المبيعات ارتفعت سريعاً بعد الإطلاق. المتجر أصبح محترف وسهل الإدارة.", rating: 5 },
        { name: "فؤاد أ.", role: "مديرة تسويق", text: "التصميم الجديد عكس علامتنا تماماً. كان سريعاً وموثوقاً وقدمنا ما نحتاجه." , rating: 5 },
        { name: "أحمد ت.", role: "مدير العمليات", text: "الأتمتة وفرت لنا وقتاً حقيقياً كل أسبوع. الحل كان عملياً ومبني جيداً وسُلم بسرعة.", rating: 5 },
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "كم يستغرق المشروع النموذجي؟", a: "المواقع البسيطة تستغرق 1-2 أسابيع. تطبيقات الويب الكاملة تستغرق عادةً 4-8 أسابيع حسب التعقيد." },
        { q: "هل تقدم تعديلات؟", a: "نعم، جميع المشاريع تشمل جولتين للتعديل على الأقل. أسعى لإنجاز العمل بشكل صحيح من المرة الأولى." },
        { q: "كيف تعمل المدفوعات؟", a: "أعمل عادةً بنظام 50% مقدماً و50% عند التسليم. للمشاريع الكبيرة يمكن ترتيب دفعات على مراحل." },
        { q: "هل سأكون مالكاً للكود؟", a: "بالطبع. بمجرد اكتمال الدفع، تمتلك كامل الكود المصدري وحقوق الملكية الفكرية." },
        { q: "هل تقدم دعماً مستمراً؟", a: "نعم، أقدم خطط صيانة شهرية. كما أقدم أسبوعين من الدعم المجاني بعد الإطلاق." },
        { q: "هل يمكنك العمل على قاعدة كود موجودة؟", a: "بالتأكيد. أتدخل بشكل متكرر في مشاريع قائمة لإعادة الهيكلة أو إصلاح الأخطاء أو إضافة ميزات." },
      ],
    },
    contact: {
      title: "ابدأ مشروعك",
      subtitle: "أخبرني عن مشروعك وسأرد عليك خلال 24 ساعة.",
      fields: { name: "الاسم الكامل", email: "البريد الإلكتروني", type: "نوع المشروع", budget: "الميزانية", desc: "وصف المشروع", rating: "التقييم", review: "مراجعة", submit: "إرسال الطلب" },
      reviewRole: "عميل",
      types: ["موقع ويب", "تطبيق ويب", "تطبيق سطح المكتب", "سكريبت / أتمتة", "إصلاح أخطاء / دعم", "أخرى"],
      budgets: ["أقل من 1000 DZD", "1000–5000 DZD", "5000–20000 DZD", "20000–50000 DZD", "50000+ DZD", "للنقاش"],
      success: "تم إرسال طلبك! سأرد عليك خلال 24 ساعة.",
    },
    admin: {
      title: "لوحة تحكم المشرف",
      subtitle: "راقب طلبات مشاريع العملاء وحالتها في لوحة آمنة واحدة.",
      cols: ["الاسم", "البريد الإلكتروني", "النوع", "الميزانية", "الحالة", "التاريخ"],
      statuses: { pending: "قيد الانتظار", reviewed: "مراجعة", accepted: "مقبول", declined: "مرفوض" },
      empty: "لا توجد طلبات بعد.",
      login: { title: "دخول المشرف", user: "اسم المستخدم", pass: "كلمة المرور", btn: "تسجيل الدخول", error: "بيانات اعتماد غير صالحة." },
    },
    status: { title: "حالة المشروع", placeholder: "أدخل معرّف مشروعك...", check: "تحقق", notFound: "لم يُعثر على مشروع بهذا المعرف." },
  },
};

const colorMap = {
  purple: { bg: "linear-gradient(135deg, #30206f 0%, #5943fc 100%)", border: "#7f6af8", text: "#e7e3ff", badge: "#7f6af8" },
  teal:   { bg: "linear-gradient(135deg, #0f4f4a 0%, #2bb29f 100%)", border: "#30d4b4", text: "#e8fffb", badge: "#30d4b4" },
  coral:  { bg: "linear-gradient(135deg, #8f3226 0%, #ff7d4b 100%)", border: "#ff9a5c", text: "#fff0eb", badge: "#ff9a5c" },
  amber:  { bg: "linear-gradient(135deg, #a05d0f 0%, #f4b84c 100%)", border: "#fbbf24", text: "#fff8e6", badge: "#fbbf24" },
  blue:   { bg: "linear-gradient(135deg, #1b3678 0%, #3d73f7 100%)", border: "#4f9eff", text: "#e9f1ff", badge: "#4f9eff" },
  green:  { bg: "linear-gradient(135deg, #196a32 0%, #66c175 100%)", border: "#59d38f", text: "#effff1", badge: "#59d38f" },
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const isApiEnabled = Boolean(API_BASE_URL);

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || "Request failed");
  }

  return payload.data ?? payload;
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState("home");
  const [, setMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [adminCreds, setAdminCreds] = useState({ user: "", pass: "" });
  const [loginError, setLoginError] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [backendError, setBackendError] = useState("");
  <button disabled={loadingRequests}>
  Submit
</button>
{backendError && <p>{backendError}</p>}
  const [portfolioFilter, setPortfolioFilter] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", desc: "", rating: "", review: "" });
  const [formSent, setFormSent] = useState(false);
  const [ratingSent, setRatingSent] = useState(false);
  const [submittedTestimonials, setSubmittedTestimonials] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusChecked, setStatusChecked] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";
  const showPrices = false; // toggle to show/hide service prices

  const scrollTo = (id) => {
    setSection(id);
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const submitForm = async () => {
    if (!form.name || !form.email || !form.type) return;
    const newReq = {
      id: `PRJ-${String(requests.length + 1).padStart(3, "0")}`,
      ...form,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
    };

    setRequests(prev => [...prev, newReq]);
    setFormSent(true);
    setForm({ name: "", email: "", type: "", budget: "", desc: "", rating: "", review: "" });

    if (isApiEnabled) {
      try {
        await apiRequest("/requests", {
          method: "POST",
          body: JSON.stringify(newReq),
        });
      } catch (error) {
        setBackendError(`Failed to save request: ${error.message}`);
      }
    } else if (isSupabaseEnabled) {
      const { error } = await supabase.from("requests").insert([{ ...newReq }]);
      if (error) setBackendError(`Failed to save request: ${error.message}`);
    }

    if (form.review || form.rating) {
      const newTestimonial = {
        request_id: newReq.id,
        name: form.name || "Client",
        role: t.contact.reviewRole,
        text: form.review || "Great experience.",
        rating: Number(form.rating) || 5,
        created_at: new Date().toISOString(),
      };
      setSubmittedTestimonials(prev => [...prev, newTestimonial]);
      if (isApiEnabled) {
        try {
          await apiRequest("/testimonials", {
            method: "POST",
            body: JSON.stringify(newTestimonial),
          });
        } catch (error) {
          setBackendError(`Failed to save testimonial: ${error.message}`);
        }
      } else if (isSupabaseEnabled) {
        const { error } = await supabase.from("testimonials").insert([{ ...newTestimonial }]);
        if (error) setBackendError(`Failed to save testimonial: ${error.message}`);
      }
    }

    setTimeout(() => setFormSent(false), 5000);
  };

  const submitRating = async () => {
    if (!form.name || !form.rating || !form.review) return;
    const newTestimonial = {
      name: form.name,
      role: t.contact.reviewRole,
      text: form.review,
      rating: Number(form.rating),
      created_at: new Date().toISOString(),
    };
    setSubmittedTestimonials(prev => [...prev, newTestimonial]);
    setRatingSent(true);
    setForm({ ...form, name: "", rating: "", review: "" });

    if (isApiEnabled) {
      try {
        await apiRequest("/testimonials", {
          method: "POST",
          body: JSON.stringify(newTestimonial),
        });
      } catch (error) {
        setBackendError(`Failed to save testimonial: ${error.message}`);
      }
    } else if (isSupabaseEnabled) {
      const { error } = await supabase.from("testimonials").insert([{ ...newTestimonial }]);
      if (error) setBackendError(`Failed to save testimonial: ${error.message}`);
    }

    setTimeout(() => setRatingSent(false), 5000);
  };

  const fetchRequests = async () => {
    if (!isApiEnabled && !isSupabaseEnabled) return;
    setLoadingRequests(true);

    if (isApiEnabled) {
      try {
        const data = await apiRequest("/requests");
        if (Array.isArray(data)) setRequests(data);
      } catch (error) {
        setBackendError(`Failed to load requests: ${error.message}`);
      } finally {
        setLoadingRequests(false);
      }
      return;
    }

    const { data, error } = await supabase.from("requests").select("*").order("date", { ascending: false });
    setLoadingRequests(false);

    if (error) {
      setBackendError(`Failed to load requests: ${error.message}`);
    } else if (Array.isArray(data)) {
      setRequests(data);
    }
  };

  const fetchTestimonials = async () => {
    if (!isApiEnabled && !isSupabaseEnabled) return;
    if (isApiEnabled) {
      try {
        const data = await apiRequest("/testimonials");
        if (Array.isArray(data)) setSubmittedTestimonials(data);
      } catch (error) {
        setBackendError(`Failed to load testimonials: ${error.message}`);
      }
      return;
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("request_id, name, role, text, rating, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setBackendError(`Failed to load testimonials: ${error.message}`);
    } else if (Array.isArray(data)) {
      setSubmittedTestimonials(data);
    }
  };

 // Intentional: run once on mount to load initial data (ignore exhaustive-deps)
 useEffect(() => {
  const loadData = async () => {
    if (isApiEnabled || isSupabaseEnabled) {
      await fetchRequests();
      await fetchTestimonials();
    }
  };

  loadData();
}, []);

// Real-time updates: subscribe to Supabase changes so admin sees new orders/ratings immediately
// `isSupabaseEnabled` is a static module-level flag; omit from deps to avoid re-subscribing.
useEffect(() => {
  if (!isSupabaseEnabled) return;

  const reqChannel = supabase
    .channel('public:requests')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'requests' }, (payload) => {
      const newRow = payload.new;
      setRequests(prev => [newRow, ...prev]);
      if (adminLoggedIn) {
        const msg = `New order: ${newRow.id} — ${newRow.name}`;
        const id = Date.now();
        setToasts(prev => [{ id, msg, kind: 'order' }, ...prev]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 6000);
      }
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'requests' }, (payload) => {
      const newRow = payload.new;
      setRequests(prev => prev.map(r => (r.id === newRow.id ? newRow : r)));
    })
    .subscribe();

  const testChannel = supabase
    .channel('public:testimonials')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonials' }, (payload) => {
      const newRow = payload.new;
      setSubmittedTestimonials(prev => [newRow, ...prev]);
      if (adminLoggedIn) {
        const msg = `New rating: ${newRow.name} — ${newRow.rating}★`;
        const id = Date.now() + 1;
        setToasts(prev => [{ id, msg, kind: 'rating' }, ...prev]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 6000);
      }
    })
    .subscribe();

  return () => {
    try {
      supabase.removeChannel(reqChannel);
      supabase.removeChannel(testChannel);
    } catch {
      // ignore cleanup errors
    }
  };
}, [adminLoggedIn]);

// Polling fallback: refresh requests and testimonials periodically while admin is logged in
useEffect(() => {
  if (!adminLoggedIn) return;
  let active = true;

  const refresh = async () => {
    if (!active) return;
    try {
      await fetchRequests();
      await fetchTestimonials();
    } catch {
      // ignore
    }
  };

  // initial refresh
  refresh();

  const timer = setInterval(refresh, 5000);
  return () => {
    active = false;
    clearInterval(timer);
  };
}, [adminLoggedIn]);

  const checkStatus = () => {
    const found = requests.find(r => r.id.toLowerCase() === statusId.toLowerCase());
    setStatusResult(found || null);
    setStatusChecked(true);
  };

  const updateStatus = async (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (isApiEnabled) {
      try {
        await apiRequest(`/requests/${encodeURIComponent(id)}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (error) {
        setBackendError(`Failed to update status: ${error.message}`);
      }
      return;
    }
    if (!isSupabaseEnabled) return;
    const { error } = await supabase.from("requests").update({ status: newStatus }).eq("id", id);
    if (error) setBackendError(`Failed to update status: ${error.message}`);
  };

  const handleAdminLogin = () => {
    if (adminCreds.user === "nadjib" && adminCreds.pass === "admin123") {
      setAdminLoggedIn(true);
      setLoginError(false);
    } else setLoginError(true);
  };

  const navItems = ["home", "rating", "about", "services", "portfolio", "contact"];

  const styles = {
    page: { fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "transparent", color: "#d9d1ff", minHeight: "100vh", direction: isRTL ? "rtl" : "ltr" },
    nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(5,7,17,0.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(141,154,255,0.16)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 },
    logo: { fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" },
    logoAccent: { color: "#b9a9ff" },
    navLinks: { display: "flex", gap: 4, alignItems: "center" },
    navLink: (active) => ({ background: active ? "rgba(127,106,248,0.17)" : "transparent", color: active ? "#d5c8ff" : "#cfc6ff", border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: active ? 500 : 400, transition: "all 0.15s" }),
    langBtn: (active) => ({ background: active ? "#7f6af8" : "rgba(127,106,248,0.12)", color: active ? "#141414" : "#cfc6ff", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }),
    section: { padding: "80px 24px", maxWidth: 1000, margin: "0 auto" },
    sectionAlt: { background: "rgba(8,12,26,0.46)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025), inset 0 -1px 0 rgba(255,255,255,0.02)" },
    badge: { display: "inline-block", background: "rgba(127,106,248,0.18)", color: "#d8d0ff", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 500, marginBottom: 16, border: "1px solid rgba(127,106,248,0.3)" },
    h2: { fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" },
    sub: { color: "#cfc6ff", fontSize: 16, marginBottom: 48 },
    primaryBtn: { background: "#7f6af8", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
    ghostBtn: { background: "transparent", color: "#d9d1ff", border: "1px solid rgba(127,106,248,0.28)", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" },
    card: { background: "rgba(10,14,30,0.72)", border: "1px solid rgba(141,154,255,0.18)", borderRadius: 14, padding: "24px", transition: "all 0.2s", boxShadow: "0 22px 46px rgba(0,0,0,0.18)" },
    input: { width: "100%", background: "rgba(9,12,27,0.72)", border: "1px solid rgba(141,154,255,0.22)", borderRadius: 8, padding: "10px 14px", color: "#f0ebff", fontSize: 14, outline: "none", boxSizing: "border-box" },
    label: { display: "block", color: "#c8c4e5", fontSize: 13, marginBottom: 6, fontWeight: 500 },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
    whatsapp: { position: "fixed", bottom: 90, right: 24, background: "linear-gradient(135deg, #7f6af8, #5a51d1)", color: "#fff", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 200, boxShadow: "0 14px 28px rgba(127,106,248,0.28)", fontSize: 24 },
    emailFloat: { position: "fixed", bottom: 24, right: 24, background: "linear-gradient(135deg, #5a51d1, #7f6af8)", color: "#fff", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 200, boxShadow: "0 14px 28px rgba(127,106,248,0.28)", fontSize: 24 },
    
  };

  const statusColor = { pending: "#d8c8ff", reviewed: "#c3b0ff", accepted: "#9d86ff", declined: "#f5b4ff" };
  const statusBg = { pending: "rgba(167,137,255,0.16)", reviewed: "rgba(159,131,255,0.16)", accepted: "rgba(157,134,255,0.16)", declined: "rgba(249,184,255,0.18)" };

  const filteredPortfolio = portfolioFilter === 0
    ? t.portfolio.items
    : t.portfolio.items.filter((_, i) => {
        const filterKey = TRANSLATIONS.en.portfolio.filters[portfolioFilter].toLowerCase();
        const itemCat = TRANSLATIONS.en.portfolio.items[i].cat.toLowerCase();
        return itemCat === filterKey;
      });
  const activeNavIndex = navItems.includes(section) ? navItems.indexOf(section) : 0;
  const activeNavOpacity = navItems.includes(section) ? 1 : 0;

  return (
    <div style={styles.page}>
      <GhostCursor global />

      {/* Toast container for admin notifications */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }} aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} style={{ minWidth: 240, background: t.kind === 'order' ? '#22163a' : '#163a22', color: '#fff', padding: '10px 14px', borderRadius: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <strong style={{ display: 'block', marginBottom: 6 }}>{t.kind === 'order' ? 'New order received' : 'New rating received'}</strong>
            <div style={{ fontSize: 13 }}>{t.msg}</div>
          </div>
        ))}
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>&lt;<span style={styles.logoAccent}>NADJIB</span>/&gt;</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            className="gooey-nav"
            style={{
              "--active-index": activeNavIndex,
              "--active-opacity": activeNavOpacity,
              "--item-count": navItems.length,
            }}
          >
            {navItems.map(id => (
              <button
                key={id}
                className={`gooey-nav-item${section === id ? " is-active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                <span className="gooey-nav-label">{t.nav[id] || id}</span>
              </button>
            ))}
          </div>
          <div style={styles.navLinks}>
            <button style={styles.navLink(section === "status")} onClick={() => { setSection("status"); scrollTo("status"); }}>
              <i className="ti ti-radar" aria-hidden />
            </button>
            <button style={styles.navLink(section === "dashboard")} onClick={() => { setSection("dashboard"); scrollTo("dashboard"); }}>
              <i className="ti ti-layout-dashboard" aria-hidden />
            </button>
          </div>
          <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
            {["en", "fr", "ar"].map(l => (
              <button key={l} style={styles.langBtn(lang === l)} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-stage" style={{ minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(5,7,17,0.38) 0%, rgba(8,10,24,0.74) 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.035), transparent 34%, rgba(0,0,0,0.24))", pointerEvents: "none" }} />
        <div className="hero-shape hero-shape-large" style={{ top: "8%", left: "-8%" }} />
        <div className="hero-shape hero-shape-medium" style={{ bottom: "8%", right: "-10%" }} />
        <div className="hero-shape hero-shape-small" style={{ top: "24%", right: "18%" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
          <BlurText
            as="p"
            text={t.hero.greeting}
            className="hero-subtext"
            delay={0.04}
            style={{ color: "#b5aee8", fontSize: 14, marginBottom: 16, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600 }}
          />
          <BlurText
            as="h1"
            text={t.hero.name}
            className="hero-title variable-proximity"
            delay={0.16}
            style={{ fontSize: "clamp(46px, 7.5vw, 72px)", fontWeight: 900, color: "#fff", margin: "0 0 18px", letterSpacing: "-0.9px", lineHeight: 1.02 }}
          />
          <div className="hero-divider" style={{ height: 3, width: 96, background: "linear-gradient(90deg, #7f6af8, #a78bfa)", borderRadius: 2, margin: "18px auto" }} />
          <BlurText
            as="h2"
            text={t.hero.title}
            className="hero-subtitle"
            delay={0.28}
            style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 500, color: "#c2c0d8", margin: "0 0 26px" }}
          />
          <BlurText
            as="p"
            text={t.hero.subtitle}
            className="hero-copy"
            delay={0.38}
            step={0.025}
            style={{ fontSize: 17, color: "#d0c7ff", lineHeight: 1.75, marginBottom: 40, maxWidth: 620, margin: "0 auto 40px" }}
          />
          <div className="hero-actions" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.primaryBtn} onClick={() => scrollTo("contact")}>{t.hero.cta}</button>
            <button style={styles.ghostBtn} onClick={() => scrollTo("portfolio")}>{t.hero.ctaSecondary}</button>
          </div>
          <div className="hero-skills" style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {["React", "Node.js", "Python", "PostgreSQL", "TypeScript"].map((tech, i) => (
              <span
                key={tech}
                className="skill-badge"
                style={{
                  background: "rgba(10,14,30,0.74)",
                  border: "1px solid rgba(141,154,255,0.22)",
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontSize: 13,
                  color: "#d8d0ff",
                  animationDelay: `${0.48 + i * 0.08}s`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* RATING */}
      <section id="rating" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={styles.badge}>Rating</div>
            <h2 style={styles.h2}>Rate My Work</h2>
            <p style={{ color: "#cfc6ff", fontSize: 15, lineHeight: 1.8, margin: "0 auto", maxWidth: 620 }}>
              Share a short review and rating so future clients can see your real feedback.
            </p>
          </div>
          <div style={{ ...styles.card, padding: 24 }}>
            {ratingSent && (
              <p style={{ color: "#b9a9ff", marginBottom: 16, fontWeight: 600 }}>Thank you! Your rating was added.</p>
            )}
            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>{t.contact.fields.name}</label>
                <input style={styles.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div>
                <label style={styles.label}>{t.contact.fields.rating}</label>
                <select style={{ ...styles.input, cursor: "pointer", color: "#f8f4ff", background: "rgba(127,106,248,0.16)" }} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
                  <option value="" style={{ color: "#8887b7", background: "rgba(18, 15, 41, 1)" }}>—</option>
                  {[5, 4, 3, 2, 1].map(value => (
                    <option key={value} value={value} style={{ color: "#f8f4ff", background: "rgba(18, 15, 41, 1)" }}>{value} ★</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ height: 16 }} />
            <div>
              <label style={styles.label}>{t.contact.fields.review}</label>
              <textarea style={{ ...styles.input, minHeight: 120, resize: "vertical" }} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} placeholder="Share a short review of my work..." />
            </div>
            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button style={styles.primaryBtn} onClick={submitRating} disabled={!form.name || !form.rating || !form.review}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.about.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="about-copy">
              <h2 className="section-heading" style={styles.h2}>{t.about.title}</h2>
              <p style={{ color: "#d0c7ff", lineHeight: 1.8, marginBottom: 16 }}>{t.about.p1}</p>
              <p style={{ color: "#d0c7ff", lineHeight: 1.8, marginBottom: 32 }}>{t.about.p2}</p>
              <div className="about-cta-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button style={styles.primaryBtn} onClick={() => scrollTo("contact")}>{t.hero.cta}</button>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=nedjaoumnadjib@gmail.com&su=Project%20Request&body=Hello%20Nadjib%2C%0A%0AI%20would%20like%20to%20hire%20you%20for%20a%20project.%0A%0A" target="_blank" rel="noreferrer" style={{ ...styles.ghostBtn, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  // eslint-disable-next-line no-undef
                  <GmailIcon title="Email" /> Email
                </a>
              </div>
            </div>
            <div className="about-profile-column">
              <ProfileCard image={profileLogo} onContact={() => scrollTo("contact")} />
              <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {t.about.vals.map((val, i) => (
                  <div key={i} className="profile-stat profile-stat-compact" style={{ ...styles.card, textAlign: "center", animationDelay: `${0.24 + i * 0.08}s` }}>
                    <p style={{ fontSize: 28, fontWeight: 800, color: "#b9a9ff", margin: "0 0 4px" }}>{val}</p>
                    <p style={{ fontSize: 12, color: "#d8d0ff", margin: 0 }}>{t.about.stats[i]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Google Maps location placeholder */}
          <div className="about-location" style={{
            marginTop: 48,
            background: "rgba(10, 9, 21, 0.96)",
            backgroundImage: 'linear-gradient(rgba(10, 9, 21, 0.72), rgba(10, 9, 21, 0.72)), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 240%27%3E%3Crect width=%27400%27 height=%27240%27 fill=%23101a30/%3E%3Cpath d=%27M18 34h364M18 78h364M18 122h364M18 166h364M18 210h364%27 stroke=%23314769 stroke-width=%279%27/%3E%3Cpath d=%27M56 0v240M128 0v240M200 0v240M272 0v240M344 0v240%27 stroke=%23253457 stroke-width=%279%27/%3E%3Cpath d=%27M50 52l52 42 44-34 54 24 42-20 60 38%27 fill=%22none%22 stroke=%235981c9 stroke-width=%228%27 opacity=%270.27%27/%3E%3Ccircle cx=%27276%27 cy=%27118%27 r=%2724%27 fill=%23f9f0ff opacity=%270.18%27/%3E%3C/svg%3E")',
            border: "1px solid rgba(127,106,248,0.28)",
            borderRadius: 22,
            overflow: "hidden",
            height: 240,
            padding: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 32px 90px rgba(0,0,0,0.24)",
            animationDelay: "0.4s",
            position: "relative",
            color: "#e3defb",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 45%, rgba(0,0,0,0.15))" }} />
            <div style={{ position: "absolute", top: 22, left: 22, display: "flex", alignItems: "center", gap: 8, background: "rgba(8, 7, 18, 0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "6px 12px", color: "#dcd9ff", fontSize: 11, zIndex: 1 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8f7cff" }} />
              Oran, Algeria
            </div>
            <div style={{ position: "absolute", top: 26, right: 22, textAlign: "right", color: "#aaa6d5", fontSize: 11, zIndex: 1 }}>
              <div>35.6928° N</div>
              <div>0.6337° W</div>
            </div>
            <div style={{ position: "absolute", top: 98, left: 118, width: 12, height: 12, borderRadius: 999, background: "#ffd2d8", boxShadow: "0 0 0 6px rgba(255,210,216,0.18)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 96, left: 130, transform: "translate(-50%, -100%)", zIndex: 1 }}>
              <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "12px solid #ffd2d8" }} />
            </div>
            <div style={{ width: 60, height: 60, borderRadius: 20, background: "linear-gradient(135deg, #7f6af8, #5a51d1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset", zIndex: 1 }}>
              <span style={{ color: "#ffffff", fontSize: 22, fontWeight: 800, letterSpacing: "-0.05em" }}>N</span>
            </div>
            <p style={{ color: "#eef0ff", fontSize: 14, margin: 0, fontWeight: 600, zIndex: 1 }}>Oran, Algeria · Available worldwide</p>
            <p style={{ color: "#c6c1e4", fontSize: 13, margin: 0, textAlign: "center", maxWidth: 280, lineHeight: 1.6, zIndex: 1 }}>
              Remote-first developer available for international projects, with local support and optional in-person meetings by appointment.
            </p>
            <a href="https://www.google.com/maps/place/Oran,+Algeria" target="_blank" rel="noreferrer" style={{ color: "#cdb9ff", fontSize: 12, textDecoration: "underline", marginTop: 4, zIndex: 1 }}>
              View on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.section}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.services.title}</div>
          <h2 style={styles.h2}>{t.services.title}</h2>
          <p style={styles.sub}>{t.services.subtitle}</p>
          <div style={styles.grid3}>
            {t.services.items.map((svc, i) => (
              <ElectricBorder key={i} className="service-border" color="#7f6af8" borderRadius={20} speed={1.1} chaos={0.15}>
                <div style={{ ...styles.card, cursor: "default", border: "none", background: "rgba(18, 15, 41, 0.9)" }}>
                  <i className={`ti ${svc.icon}`} style={{ fontSize: 28, color: "#b9a9ff", display: "block", marginBottom: 14 }} aria-hidden />
                  <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 16, margin: "0 0 8px" }}>{svc.name}</h3>
                  <p style={{ color: "#d0c7ff", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{svc.desc}</p>
                  <div style={{ borderTop: "1px solid rgba(127,106,248,0.24)", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#7f6af8", fontWeight: 600, fontSize: 15 }}>{showPrices ? svc.price : null}</span>
                    <button style={{ background: "transparent", border: "1px solid rgba(127,106,248,0.3)", color: "#9d8ef9", borderRadius: 7, padding: "5px 12px", fontSize: 13, cursor: "pointer" }} onClick={() => scrollTo("contact")}>
                      {lang === "ar" ? "طلب" : lang === "fr" ? "Commander" : "Order"}
                    </button>
                  </div>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.portfolio.title}</div>
          <h2 style={styles.h2}>{t.portfolio.title}</h2>
          <p style={styles.sub}>{t.portfolio.subtitle}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {t.portfolio.filters.map((f, i) => (
              <button key={i} style={{ background: portfolioFilter === i ? "#7f6af8" : "rgba(127,106,248,0.12)", color: portfolioFilter === i ? "#fff" : "#d8d0ff", border: "1px solid " + (portfolioFilter === i ? "#7f6af8" : "rgba(127,106,248,0.26)"), borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontSize: 14 }}
                onClick={() => setPortfolioFilter(i)}>{f}</button>
            ))}
          </div>
          <div style={styles.grid3}>
            {filteredPortfolio.map((p, i) => {
              const c = colorMap[p.color] || colorMap.purple;
              return (
                <div key={i} style={{ background: "rgba(127,106,248,0.12)", border: "1px solid rgba(127,106,248,0.24)", borderRadius: 14, overflow: "hidden" }}>
                  <div className="portfolio-card-image" style={{ background: c.bg, height: 150, position: "relative", overflow: "hidden" }}>
                    <div className="portfolio-card-spark" style={{ top: 16, left: 18, background: c.badge, width: 56, height: 56 }} />
                    <div className="portfolio-card-spark" style={{ top: 28, right: 20, background: "rgba(167,137,255,0.18)", width: 30, height: 30, animationDuration: "5.5s" }} />
                    <div className="portfolio-card-spark" style={{ bottom: 18, left: 36, background: "rgba(167,137,255,0.14)", width: 18, height: 18, animationDuration: "9s" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 72%)" }} />
                    <div style={{ position: "absolute", width: "78%", height: "62%", top: "18%", left: "11%", borderRadius: 20, background: "rgba(127,106,248,0.08)", border: "1px solid rgba(127,106,248,0.14)", boxShadow: "inset 0 0 0 1px rgba(127,106,248,0.06)" }} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 15, margin: 0 }}>{p.title}</h3>
                      <span style={{ background: c.bg, color: c.text, fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{p.cat}</span>
                    </div>
                    <p style={{ color: "#d0c7ff", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tech.map(t2 => (
                        <span key={t2} style={{ background: "rgba(127,106,248,0.16)", color: "#d8d0ff", fontSize: 11, padding: "2px 8px", borderRadius: 6 }}>{t2}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredPortfolio.length === 0 && (
              <div style={{ ...styles.card, gridColumn: "1 / -1", textAlign: "center", padding: 36, background: "rgba(127,106,248,0.14)", border: "1px solid rgba(127,106,248,0.22)" }}>
                <p style={{ color: "#d0c7ff", fontSize: 15, marginBottom: 8 }}>No projects match this filter yet.</p>
                <p style={{ color: "#b8b2e4", fontSize: 13, margin: 0 }}>Try a different category or check back soon for new case studies.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ ...styles.section, position: "relative", overflow: "hidden" }}>
        <GhostCursor style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.24, mixBlendMode: "screen" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <span className="section-pill">What Clients Say</span>
          </div>
          <h2 style={styles.h2}>{t.testimonials.title}</h2>
          <p style={{ color: "#cfc6ff", maxWidth: 700, margin: "0 auto 32px", fontSize: 15, lineHeight: 1.8 }}>Trusted by growing teams and entrepreneurs for polished products that launch quickly and scale cleanly.</p>
          <div style={styles.grid2}>
            {[...t.testimonials.items, ...submittedTestimonials].map((tm, i) => (
              <ElectricBorder key={i} color="#7f6af8" borderRadius={20} speed={1.2} chaos={0.18}>
                <div className="testimonial-card" style={{ animationDelay: `${i * 120}ms`, border: "none", background: "rgba(88, 64, 179, 0.18)" }}>
                  <div style={{ display: "flex", marginBottom: 14 }}>
                    {[...Array(tm.rating)].map((_, j) => <i key={j} className="ti ti-star-filled" style={{ color: "#fbbf24", fontSize: 14 }} aria-hidden />)}
                  </div>
                  <p style={{ color: "#d0c7ff", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>&quot;{tm.text}&quot;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: "rgba(127,106,248,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9d8ef9", fontWeight: 700, fontSize: 13 }}>
                      {tm.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>{tm.name}</p>
                      <p style={{ color: "#cfc6ff", fontSize: 12, margin: 0 }}>{tm.role}</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={styles.badge}>{t.faq.title}</div>
            <h2 style={styles.h2}>{t.faq.title}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.faq.items.map((item, i) => (
              <div key={i} style={{ ...styles.card, cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ color: "#f0ebff", fontWeight: 500, fontSize: 15, margin: 0, flex: 1 }}>{item.q}</p>
                  <i className={`ti ${openFaq === i ? "ti-chevron-up" : "ti-chevron-down"}`} style={{ color: "#7f6af8", fontSize: 18, marginLeft: 12 }} aria-hidden />
                </div>
                {openFaq === i && <p style={{ color: "#d0c7ff", fontSize: 14, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST FORM */}
      <section id="contact" style={styles.section}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={styles.badge}>{t.contact.title}</div>
            <h2 style={styles.h2}>{t.contact.title}</h2>
            <p style={styles.sub}>{t.contact.subtitle}</p>
          </div>
          {formSent ? (
            <div style={{ background: "rgba(127,106,248,0.16)", border: "1px solid rgba(127,106,248,0.32)", borderRadius: 14, padding: 32, textAlign: "center" }}>
              <i className="ti ti-circle-check" style={{ fontSize: 48, color: "#b9a9ff", display: "block", marginBottom: 12 }} aria-hidden />
              <p style={{ color: "#b9a9ff", fontSize: 16, fontWeight: 500, margin: 0 }}>{t.contact.success}</p>
            </div>
          ) : (
            <div style={styles.card}>
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.contact.fields.name} *</label>
                  <input style={styles.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div>
                  <label style={styles.label}>{t.contact.fields.email} *</label>
                  <input style={styles.input} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" />
                </div>
              </div>
              <div style={{ height: 16 }} />
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.contact.fields.type} *</label>
                  <select style={{ ...styles.input, cursor: "pointer", color: "#f8f4ff", background: "rgba(127,106,248,0.16)" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="" style={{ color: "#8887b7", background: "rgba(18, 15, 41, 1)" }}>—</option>
                    {t.contact.types.map(tp => <option key={tp} value={tp} style={{ color: "#f8f4ff", background: "rgba(18, 15, 41, 1)" }}>{tp}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.contact.fields.budget}</label>
                  <select style={{ ...styles.input, cursor: "pointer", color: "#f8f4ff", background: "rgba(127,106,248,0.16)" }} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option value="" style={{ color: "#8887b7", background: "rgba(18, 15, 41, 1)" }}>—</option>
                    {t.contact.budgets.map(b => <option key={b} value={b} style={{ color: "#f8f4ff", background: "rgba(18, 15, 41, 1)" }}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ height: 16 }} />
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.contact.fields.rating}</label>
                  <select style={{ ...styles.input, cursor: "pointer", color: "#f8f4ff", background: "rgba(127,106,248,0.16)" }} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
                    <option value="" style={{ color: "#8887b7", background: "rgba(18, 15, 41, 1)" }}>—</option>
                    {[5, 4, 3, 2, 1].map(value => <option key={value} value={value} style={{ color: "#f8f4ff", background: "rgba(18, 15, 41, 1)" }}>{value} ★</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.contact.fields.review}</label>
                  <textarea style={{ ...styles.input, minHeight: 120, resize: "vertical" }} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} placeholder="Share a short review of my work..." />
                </div>
              </div>
              <div style={{ height: 16 }} />
              <div>
                <label style={styles.label}>{t.contact.fields.desc}</label>
                <textarea style={{ ...styles.input, minHeight: 120, resize: "vertical" }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Describe your project..." />
              </div>
              <div style={{ marginTop: 20 }}>
                <button style={{ ...styles.primaryBtn, width: "100%", opacity: (!form.name || !form.email || !form.type) ? 0.5 : 1 }} onClick={submitForm} disabled={!form.name || !form.email || !form.type}>
                  <i className="ti ti-send" aria-hidden /> {t.contact.fields.submit}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PROJECT STATUS */}
      <section id="status" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={styles.badge}>{t.status.title}</div>
          <h2 style={styles.h2}>{t.status.title}</h2>
          <div style={{ display: "flex", gap: 10, marginTop: 32, marginBottom: 20 }}>
            <input style={{ ...styles.input, flex: 1 }} value={statusId} onChange={e => setStatusId(e.target.value)} placeholder={t.status.placeholder} onKeyDown={e => e.key === "Enter" && checkStatus()} />
            <button style={styles.primaryBtn} onClick={checkStatus}>{t.status.check}</button>
          </div>
          {statusChecked && (
            statusResult ? (
              <div style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>{statusResult.id}</span>
                  <span style={{ background: statusBg[statusResult.status], color: statusColor[statusResult.status], fontSize: 13, padding: "4px 12px", borderRadius: 20, fontWeight: 500 }}>
                    {t.admin.statuses[statusResult.status]}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["Name", statusResult.name], ["Type", statusResult.type], ["Budget", statusResult.budget], ["Date", statusResult.date]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#d8d0ff", fontSize: 14 }}>{k}</span>
                      <span style={{ color: "#b8b2e4", fontSize: 14 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : <p style={{ color: "#f8b4ff", fontSize: 14 }}>{t.status.notFound}</p>
          )}
        </div>
      </section>

      {/* ADMIN DASHBOARD */}
      <section id="dashboard" style={styles.section}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.admin.title}</div>
          <h2 style={styles.h2}>{t.admin.title}</h2>
          <p style={styles.sub}>{t.admin.subtitle}</p>

          {!adminLoggedIn ? (
            <div style={{ maxWidth: 360, margin: "0 auto" }}>
              <div style={styles.card}>
                <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: 20, textAlign: "center" }}>{t.admin.login.title}</h3>
                <label style={styles.label}>{t.admin.login.user}</label>
                <input style={{ ...styles.input, marginBottom: 12 }} value={adminCreds.user} onChange={e => setAdminCreds({ ...adminCreds, user: e.target.value })} placeholder="nadjib" />
                <label style={styles.label}>{t.admin.login.pass}</label>
                <input style={{ ...styles.input, marginBottom: 4 }} type="password" value={adminCreds.pass} onChange={e => setAdminCreds({ ...adminCreds, pass: e.target.value })} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleAdminLogin()} />
                {loginError && <p style={{ color: "#f8b4ff", fontSize: 13, marginBottom: 12 }}>{t.admin.login.error}</p>}
                <div style={{ height: 16 }} />
                <button style={{ ...styles.primaryBtn, width: "100%" }} onClick={handleAdminLogin}>{t.admin.login.btn}</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
                {Object.entries({ total: requests.length, pending: requests.filter(r => r.status === "pending").length, accepted: requests.filter(r => r.status === "accepted").length }).map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(127,106,248,0.16)", border: "1px solid rgba(127,106,248,0.28)", borderRadius: 12, padding: "20px 24px" }}>
                    <p style={{ color: "#d8d0ff", fontSize: 13, margin: "0 0 4px", textTransform: "capitalize" }}>{k === "total" ? "Total Requests" : k === "pending" ? "Pending" : "Accepted"}</p>
                    <p style={{ color: "#fff", fontSize: 32, fontWeight: 700, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, padding: "24px 0 0 0" }}>
                <GhostCursor style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.72, mixBlendMode: "screen" }} />
                <div style={{ overflowX: "auto", position: "relative", zIndex: 1 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "rgba(18, 15, 41, 0.88)" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(127,106,248,0.24)" }}>
                        {["ID", ...t.admin.cols, "Actions"].map(col => (
                          <th key={col} style={{ textAlign: isRTL ? "right" : "left", padding: "10px 14px", color: "#d8d0ff", fontWeight: 500, fontSize: 13 }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length === 0 ? (
                        <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#d8d0ff" }}>{t.admin.empty}</td></tr>
                      ) : requests.map(r => (
                        <tr key={r.id} style={{ borderBottom: "1px solid rgba(127,106,248,0.18)" }}>
                          <td style={{ padding: "12px 14px", color: "#7f6af8", fontWeight: 500 }}>{r.id}</td>
                          <td style={{ padding: "12px 14px", color: "#f8f4ff" }}>{r.name}</td>
                          <td style={{ padding: "12px 14px", color: "#d0c7ff" }}>{r.email}</td>
                          <td style={{ padding: "12px 14px", color: "#d8d0ff" }}>{r.type}</td>
                          <td style={{ padding: "12px 14px", color: "#d8d0ff" }}>{r.budget}</td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{ background: statusBg[r.status], color: statusColor[r.status], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                              {t.admin.statuses[r.status]}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px", color: "#cfc6ff" }}>{r.date}</td>
                          <td style={{ padding: "12px 14px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              {["pending", "reviewed", "accepted", "declined"].map(s => (
                                <button key={s} onClick={() => updateStatus(r.id, s)}
                                  style={{ background: r.status === s ? statusBg[s] : "transparent", color: r.status === s ? statusColor[s] : "#b8b2e4", border: `1px solid ${r.status === s ? statusColor[s] + "44" : "rgba(127,106,248,0.24)"}`, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11 }}>
                                  {s.charAt(0).toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <button style={{ background: "transparent", color: "#d8d0ff", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => setAdminLoggedIn(false)}>
                  <i className="ti ti-logout" aria-hidden /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(127,106,248,0.24)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#cfc6ff", fontSize: 14, margin: 0 }}>
          &lt;<span style={{ color: "#b9a9ff" }}>NADJIB</span>/&gt; · Built with React · {new Date().getFullYear()} ·{" "}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=nedjaoumnadjib@gmail.com&su=Project%20Request&body=Hello%20Nadjib%2C%0A%0AI%20would%20like%20to%20hire%20you%20for%20a%20project.%0A%0A" target="_blank" rel="noreferrer" style={{ color: "#b9a9ff", textDecoration: "none" }}>nedjaoumnadjib@gmail.com</a>
        </p>
      </footer>

      {/* FLOATING BUTTONS */}
      <button style={styles.whatsapp} onClick={() => window.open("https://wa.me/213659673190", "_blank")} title="WhatsApp">
        <WhatsAppIcon title="WhatsApp" />
      </button>
      <button style={styles.emailFloat} onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=nedjaoumnadjib@gmail.com&su=Project%20Request&body=Hello%20Nadjib%2C%0A%0AI%20would%20like%20to%20hire%20you%20for%20a%20project.%0A%0A", "_blank")} title="Email">
        <GmailIcon title="Email" />
      </button>
    </div>
  );
  
}
