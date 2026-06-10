import { useState } from "react";
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", portfolio: "Portfolio", contact: "Contact", dashboard: "Dashboard" },
    hero: {
      greeting: "Hello, I'm",
      name: "ABDERRAHMANE NADJIB",
      title: "Full-Stack Developer & Software Engineer",
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
        { icon: "ti-world-www", name: "Custom Website", desc: "Responsive, SEO-optimized websites tailored to your brand identity.", price: "From  pages $200" },
        { icon: "ti-apps", name: "Web Application", desc: "Full-stack web apps with authentication, dashboards, and APIs.", price: "From pages $500" },
        { icon: "ti-device-desktop", name: "Desktop Application", desc: "Cross-platform desktop apps with modern UI and system integrations.", price: "From pages $400" },
        { icon: "ti-terminal-2", name: "Scripts & Automation", desc: "Custom scripts to automate repetitive tasks and workflows.", price: "From pages $80" },
        { icon: "ti-bug", name: "Bug Fixing & Support", desc: "Diagnose and fix issues in existing codebases, fast turnaround.", price: "From pages $50" },
        { icon: "ti-headset", name: "Ongoing Maintenance", desc: "Monthly support plans to keep your software running smoothly.", price: "From pages $100/mo" },
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
      budgets: ["< $100", "$100–$500", "$500–$2000", "$2000–$5000", "$5000+", "Let's discuss"],
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
    nav: { home: "Accueil", about: "À propos", services: "Services", portfolio: "Portfolio", contact: "Contact", dashboard: "Tableau de bord" },
    hero: {
      greeting: "Bonjour, je suis",
      name: "ABDERRAHMANE NADJIB",
      title: "Développeur Full-Stack & Ingénieur Logiciel",
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
        { icon: "ti-world-www", name: "Site web personnalisé", desc: "Sites responsive et optimisés SEO adaptés à votre marque.", price: "À partir de 200$" },
        { icon: "ti-apps", name: "Application web", desc: "Applications full-stack avec authentification, tableaux de bord et APIs.", price: "À partir de 500$" },
        { icon: "ti-device-desktop", name: "Application desktop", desc: "Applications desktop multiplateformes avec interface moderne.", price: "À partir de 400$" },
        { icon: "ti-terminal-2", name: "Scripts & Automatisation", desc: "Scripts personnalisés pour automatiser les tâches répétitives.", price: "À partir de 80$" },
        { icon: "ti-bug", name: "Correction de bugs", desc: "Diagnostic et correction rapide des problèmes dans votre code.", price: "À partir de 50$" },
        { icon: "ti-headset", name: "Maintenance continue", desc: "Plans de support mensuel pour garder votre logiciel opérationnel.", price: "À partir de 100$/mois" },
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
        { name: "Sarah M.", role: "Fondatrice de Startup", text: "NADJIB a livré notre MVP en 3 semaines. Code propre, dans les délais, excellente communication.", rating: 5 },
        { name: "Karim B.", role: "Propriétaire E-commerce", text: "La boutique qu'il a construite a doublé nos conversions le premier mois. Absolument professionnel.", rating: 5 },
        { name: "Fouad A.", role: "Directrice Marketing", text: "Notre nouveau site est magnifique. Il a immédiatement compris notre vision de marque.", rating: 5 },
        { name: "Ahmed T.", role: "Directeur des Opérations", text: "Les scripts d'automatisation nous ont économisé 20+ heures par semaine. Retour sur investissement incroyable.", rating: 5 },
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
      fields: { name: "Nom complet", email: "Adresse email", type: "Type de projet", budget: "Budget", desc: "Description du projet", submit: "Envoyer la demande" },
      types: ["Site web", "Application web", "Application desktop", "Script / Automatisation", "Correction de bug / Support", "Autre"],
      budgets: ["< 100$", "100$–500$", "500$–2000$", "2000$–5000$", "5000$+", "À discuter"],
      success: "Votre demande a été envoyée! Je vous répondrai dans les 24 heures.",
    },
    admin: {
      title: "Tableau de bord Admin",
      subtitle: "Demandes de projet des clients.",
      cols: ["Nom", "Email", "Type", "Budget", "Statut", "Date"],
      statuses: { pending: "En attente", reviewed: "Examiné", accepted: "Accepté", declined: "Refusé" },
      empty: "Aucune demande pour l'instant.",
      login: { title: "Connexion Admin", user: "Nom d'utilisateur", pass: "Mot de passe", btn: "Se connecter", error: "Identifiants invalides." },
    },
    status: { title: "Statut du projet", placeholder: "Entrez votre ID de projet...", check: "Vérifier", notFound: "Aucun projet trouvé avec cet ID." },
  },
  ar: {
    nav: { home: "الرئيسية", about: "عني", services: "الخدمات", portfolio: "أعمالي", contact: "تواصل", dashboard: "لوحة التحكم" },
    hero: {
      greeting: "مرحباً، أنا",
      name: "عبد الرحمن نجيب",
      title: "مطوّر ويب متكامل ومهندس برمجيات",
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
        { icon: "ti-world-www", name: "موقع إلكتروني مخصص", desc: "مواقع متجاوبة ومحسّنة لمحركات البحث تعكس هوية علامتك التجارية.", price: "يبدأ من 200$" },
        { icon: "ti-apps", name: "تطبيق ويب", desc: "تطبيقات متكاملة مع مصادقة ولوحات تحكم وواجهات برمجية.", price: "يبدأ من 500$" },
        { icon: "ti-device-desktop", name: "تطبيق سطح المكتب", desc: "تطبيقات متعددة المنصات بواجهة حديثة وتكاملات النظام.", price: "يبدأ من 400$" },
        { icon: "ti-terminal-2", name: "سكريبتات وأتمتة", desc: "سكريبتات مخصصة لأتمتة المهام المتكررة وتحسين سير العمل.", price: "يبدأ من 80$" },
        { icon: "ti-bug", name: "إصلاح الأخطاء والدعم", desc: "تشخيص وإصلاح سريع للمشاكل في الأكواد البرمجية الموجودة.", price: "يبدأ من 50$" },
        { icon: "ti-headset", name: "صيانة مستمرة", desc: "خطط دعم شهرية للحفاظ على تشغيل برمجياتك بسلاسة.", price: "يبدأ من 100$/شهر" },
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
        { name: "سارة م.", role: "مؤسسة شركة ناشئة", text: "سلّم نجيب منتجنا الأولي في 3 أسابيع. كود نظيف، في الموعد، تواصل ممتاز.", rating: 5 },
        { name: "كريم ب.", role: "صاحب متجر إلكتروني", text: "المتجر الذي بناه ضاعف تحويلاتنا في الشهر الأول. احترافية تامة.", rating: 5 },
        { name: "فؤاد أ.", role: "مديرة تسويق", text: "موقعنا الجديد رائع. فهم رؤيتنا للعلامة التجارية فوراً.", rating: 5 },
        { name: "أحمد ت.", role: "مدير العمليات", text: "سكريبتات الأتمتة وفّرت علينا أكثر من 20 ساعة أسبوعياً. عائد استثمار مذهل.", rating: 5 },
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
      fields: { name: "الاسم الكامل", email: "البريد الإلكتروني", type: "نوع المشروع", budget: "الميزانية", desc: "وصف المشروع", submit: "إرسال الطلب" },
      types: ["موقع ويب", "تطبيق ويب", "تطبيق سطح المكتب", "سكريبت / أتمتة", "إصلاح أخطاء / دعم", "أخرى"],
      budgets: ["أقل من 100$", "100$–500$", "500$–2000$", "2000$–5000$", "5000$+", "للنقاش"],
      success: "تم إرسال طلبك! سأرد عليك خلال 24 ساعة.",
    },
    admin: {
      title: "لوحة تحكم المشرف",
      subtitle: "طلبات المشاريع من العملاء.",
      cols: ["الاسم", "البريد الإلكتروني", "النوع", "الميزانية", "الحالة", "التاريخ"],
      statuses: { pending: "قيد الانتظار", reviewed: "مراجعة", accepted: "مقبول", declined: "مرفوض" },
      empty: "لا توجد طلبات بعد.",
      login: { title: "دخول المشرف", user: "اسم المستخدم", pass: "كلمة المرور", btn: "تسجيل الدخول", error: "بيانات اعتماد غير صالحة." },
    },
    status: { title: "حالة المشروع", placeholder: "أدخل معرّف مشروعك...", check: "تحقق", notFound: "لم يُعثر على مشروع بهذا المعرف." },
  },
};

const colorMap = {
  purple: { bg: "#000000", border: "#534AB7", text: "#3C3489", badge: "#534AB7" },
  teal:   { bg: "#000000", border: "#0F6E56", text: "#085041", badge: "#0F6E56" },
  coral:  { bg: "#000000", border: "#993C1D", text: "#712B13", badge: "#993C1D" },
  amber:  { bg: "#000000", border: "#854F0B", text: "#633806", badge: "#854F0B" },
  blue:   { bg: "#000000", border: "#185FA5", text: "#0C447C", badge: "#185FA5" },
  green:  { bg: "#000000", border: "#3B6D11", text: "#27500A", badge: "#3B6D11" },
};

const DEMO_REQUESTS = [
  { id: "PRJ-001", name: "Alice Johnson", email: "alice@example.com", type: "Web Application", budget: "$500–$2000", desc: "Need a booking system for my salon.", status: "accepted", date: "2025-01-10" },
  { id: "PRJ-002", name: "Mohamed Salim", email: "m.salim@mail.com", type: "Script / Automation", budget: "$100–$500", desc: "Automate daily CSV report sending.", status: "pending", date: "2025-01-14" },
  { id: "PRJ-003", name: "Nassim", email: "nassim@startup.io", type: "Website", budget: "$100–$500", desc: "Portfolio site for my design studio.", status: "reviewed", date: "2025-01-15" },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState("home");
  const [, setMenuOpen] = useState(false);
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ user: "", pass: "" });
  const [loginError, setLoginError] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", desc: "" });
  const [formSent, setFormSent] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusChecked, setStatusChecked] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  const scrollTo = (id) => {
    setSection(id);
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const submitForm = () => {
    if (!form.name || !form.email || !form.type) return;
    const newReq = {
      id: `PRJ-${String(requests.length + 1).padStart(3, "0")}`,
      ...form,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
    };
    setRequests([...requests, newReq]);
    setFormSent(true);
    setForm({ name: "", email: "", type: "", budget: "", desc: "" });
    setTimeout(() => setFormSent(false), 5000);
  };

  const checkStatus = () => {
    const found = requests.find(r => r.id.toLowerCase() === statusId.toLowerCase());
    setStatusResult(found || null);
    setStatusChecked(true);
  };

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleAdminLogin = () => {
    if (adminCreds.user === "nadjib" && adminCreds.pass === "admin123") {
      setAdminLoggedIn(true);
      setLoginError(false);
    } else setLoginError(true);
  };

  const navItems = ["home", "about", "services", "portfolio", "contact"];

  const styles = {
    page: { fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#303050", color: "#40408a", minHeight: "100vh", direction: isRTL ? "rtl" : "ltr" },
    nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 },
    logo: { fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" },
    logoAccent: { color: "#7f6af8" },
    navLinks: { display: "flex", gap: 4, alignItems: "center" },
    navLink: (active) => ({ background: active ? "rgba(127,106,248,0.15)" : "transparent", color: active ? "#9d8ef9" : "#aaa", border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: active ? 500 : 400, transition: "all 0.15s" }),
    langBtn: (active) => ({ background: active ? "#7f6af8" : "rgba(255,255,255,0.06)", color: active ? "#141414" : "#aaa", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }),
    section: { padding: "80px 24px", maxWidth: 1000, margin: "0 auto" },
    sectionAlt: { background: "rgba(255,255,255,0.015)" },
    badge: { display: "inline-block", background: "rgba(127,106,248,0.12)", color: "#9d8ef9", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 500, marginBottom: 16, border: "1px solid rgba(127,106,248,0.2)" },
    h2: { fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" },
    sub: { color: "#888", fontSize: 16, marginBottom: 48 },
    primaryBtn: { background: "#7f6af8", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
    ghostBtn: { background: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,0.15)", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px", transition: "all 0.2s" },
    input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "#1c1c1d", fontSize: 14, outline: "none", boxSizing: "border-box" },
    label: { display: "block", color: "#aaa", fontSize: 13, marginBottom: 6, fontWeight: 500 },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
    whatsapp: { position: "fixed", bottom: 90, right: 24, background: "#25D366", color: "#fff", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 200, boxShadow: "0 4px 20px rgba(37,211,102,0.3)", fontSize: 24 },
    emailFloat: { position: "fixed", bottom: 24, right: 24, background: "#EA4335", color: "#fff", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 200, boxShadow: "0 4px 20px rgba(234,67,53,0.3)", fontSize: 24 },
    
  };

  const statusColor = { pending: "#f59e0b", reviewed: "#3b82f6", accepted: "#22c55e", declined: "#ef4444" };
  const statusBg = { pending: "rgba(245,158,11,0.1)", reviewed: "rgba(59,130,246,0.1)", accepted: "rgba(34,197,94,0.1)", declined: "rgba(239,68,68,0.1)" };

  const filteredPortfolio = portfolioFilter === 0
    ? t.portfolio.items
    : t.portfolio.items.filter((_, i) => {
        const filterKey = TRANSLATIONS.en.portfolio.filters[portfolioFilter].toLowerCase();
        const itemCat = TRANSLATIONS.en.portfolio.items[i].cat.toLowerCase();
        return itemCat === filterKey;
      });

  return (
    <div style={styles.page}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>&lt;<span style={styles.logoAccent}>NADJIB</span>/&gt;</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={styles.navLinks}>
            {navItems.map(id => (
              <button key={id} style={styles.navLink(section === id)} onClick={() => scrollTo(id)}>
                {t.nav[id]}
              </button>
            ))}
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
      <section id="home" style={{ minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(127,106,248,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 720 }}>
          <p style={{ color: "#888", fontSize: 16, marginBottom: 8, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>{t.hero.greeting}</p>
          <h1 style={{ fontSize: "clamp(56px, 10vw, 96px)", fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-2px", lineHeight: 1 }}>
            {t.hero.name}
          </h1>
          <div style={{ height: 3, width: 80, background: "linear-gradient(90deg, #7f6af8, #a78bfa)", borderRadius: 2, margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 500, color: "#ccc", margin: "0 0 20px" }}>{t.hero.title}</h2>
          <p style={{ fontSize: 17, color: "#777", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>{t.hero.subtitle}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.primaryBtn} onClick={() => scrollTo("contact")}>{t.hero.cta}</button>
            <button style={styles.ghostBtn} onClick={() => scrollTo("portfolio")}>{t.hero.ctaSecondary}</button>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {["React", "Node.js", "Python", "PostgreSQL", "TypeScript"].map(tech => (
              <span key={tech} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "#888" }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.about.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <h2 style={styles.h2}>{t.about.title}</h2>
              <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: 16 }}>{t.about.p1}</p>
              <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: 32 }}>{t.about.p2}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button style={styles.primaryBtn} onClick={() => scrollTo("contact")}>{t.hero.cta}</button>
                <a href="mailto:nedjaoumnadjib@gmail.com" style={{ ...styles.ghostBtn, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="ti ti-mail" aria-hidden /> Email
                </a>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {t.about.vals.map((val, i) => (
                <div key={i} style={{ ...styles.card, textAlign: "center" }}>
                  <p style={{ fontSize: 40, fontWeight: 800, color: "#7f6af8", margin: "0 0 4px" }}>{val}</p>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{t.about.stats[i]}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Google Maps location placeholder */}
          <div style={{ marginTop: 48, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", height: 220, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <i className="ti ti-map-pin" style={{ fontSize: 32, color: "#7f6af8" }} aria-hidden />
            <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Oran, Algeria · Available worldwide</p>
            <p style={{ color: "#444", fontSize: 12, margin: 0 }}>— embed Google Maps iframe here with your coordinates —</p>
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
              <div key={i} style={{ ...styles.card, cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(127,106,248,0.4)"}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}>
                <i className={`ti ${svc.icon}`} style={{ fontSize: 28, color: "#7f6af8", display: "block", marginBottom: 14 }} aria-hidden />
                <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 16, margin: "0 0 8px" }}>{svc.name}</h3>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{svc.desc}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#7f6af8", fontWeight: 600, fontSize: 15 }}>{svc.price}</span>
                  <button style={{ background: "transparent", border: "1px solid rgba(127,106,248,0.3)", color: "#9d8ef9", borderRadius: 7, padding: "5px 12px", fontSize: 13, cursor: "pointer" }} onClick={() => scrollTo("contact")}>
                    {lang === "ar" ? "طلب" : lang === "fr" ? "Commander" : "Order"}
                  </button>
                </div>
              </div>
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
              <button key={i} style={{ background: portfolioFilter === i ? "#7f6af8" : "rgba(255,255,255,0.05)", color: portfolioFilter === i ? "#fff" : "#888", border: "1px solid " + (portfolioFilter === i ? "#7f6af8" : "rgba(255,255,255,0.1)"), borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontSize: 14 }}
                onClick={() => setPortfolioFilter(i)}>{f}</button>
            ))}
          </div>
          <div style={styles.grid3}>
            {filteredPortfolio.map((p, i) => {
              const c = colorMap[TRANSLATIONS.en.portfolio.items[i]?.color || p.color] || colorMap.purple;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ background: c.bg, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="ti ti-code" style={{ fontSize: 40, color: c.badge, opacity: 0.5 }} aria-hidden />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 15, margin: 0 }}>{p.title}</h3>
                      <span style={{ background: c.bg, color: c.text, fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{p.cat}</span>
                    </div>
                    <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tech.map(t2 => (
                        <span key={t2} style={{ background: "rgba(255,255,255,0.05)", color: "#aaa", fontSize: 11, padding: "2px 8px", borderRadius: 6 }}>{t2}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.section}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={styles.badge}>{t.testimonials.title}</div>
          <h2 style={styles.h2}>{t.testimonials.title}</h2>
          <div style={styles.grid2}>
            {t.testimonials.items.map((tm, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display: "flex", marginBottom: 12 }}>
                  {[...Array(tm.rating)].map((_, j) => <i key={j} className="ti ti-star-filled" style={{ color: "#f59e0b", fontSize: 14 }} aria-hidden />)}
                </div>
                <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{tm.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(127,106,248,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9d8ef9", fontWeight: 700, fontSize: 13 }}>
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 500, fontSize: 14, margin: 0 }}>{tm.name}</p>
                    <p style={{ color: "#666", fontSize: 12, margin: 0 }}>{tm.role}</p>
                  </div>
                </div>
              </div>
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
                  <p style={{ color: "#e8e8f0", fontWeight: 500, fontSize: 15, margin: 0, flex: 1 }}>{item.q}</p>
                  <i className={`ti ${openFaq === i ? "ti-chevron-up" : "ti-chevron-down"}`} style={{ color: "#7f6af8", fontSize: 18, marginLeft: 12 }} aria-hidden />
                </div>
                {openFaq === i && <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{item.a}</p>}
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
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 14, padding: 32, textAlign: "center" }}>
              <i className="ti ti-circle-check" style={{ fontSize: 48, color: "#22c55e", display: "block", marginBottom: 12 }} aria-hidden />
              <p style={{ color: "#22c55e", fontSize: 16, fontWeight: 500, margin: 0 }}>{t.contact.success}</p>
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
                  <select style={{ ...styles.input, cursor: "pointer" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">—</option>
                    {t.contact.types.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.contact.fields.budget}</label>
                  <select style={{ ...styles.input, cursor: "pointer" }} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option value="">—</option>
                    {t.contact.budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
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
                      <span style={{ color: "#666", fontSize: 14 }}>{k}</span>
                      <span style={{ color: "#ccc", fontSize: 14 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : <p style={{ color: "#ef4444", fontSize: 14 }}>{t.status.notFound}</p>
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
                {loginError && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{t.admin.login.error}</p>}
                <div style={{ height: 16 }} />
                <button style={{ ...styles.primaryBtn, width: "100%" }} onClick={handleAdminLogin}>{t.admin.login.btn}</button>
                <p style={{ color: "#555", fontSize: 12, textAlign: "center", marginTop: 12 }}>Demo: nadjib / admin123</p>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
                {Object.entries({ total: requests.length, pending: requests.filter(r => r.status === "pending").length, accepted: requests.filter(r => r.status === "accepted").length }).map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
                    <p style={{ color: "#888", fontSize: 13, margin: "0 0 4px", textTransform: "capitalize" }}>{k === "total" ? "Total Requests" : k === "pending" ? "Pending" : "Accepted"}</p>
                    <p style={{ color: "#fff", fontSize: 32, fontWeight: 700, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {["ID", ...t.admin.cols, "Actions"].map(col => (
                        <th key={col} style={{ textAlign: isRTL ? "right" : "left", padding: "10px 14px", color: "#666", fontWeight: 500, fontSize: 13 }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#555" }}>{t.admin.empty}</td></tr>
                    ) : requests.map(r => (
                      <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "12px 14px", color: "#7f6af8", fontWeight: 500 }}>{r.id}</td>
                        <td style={{ padding: "12px 14px", color: "#e8e8f0" }}>{r.name}</td>
                        <td style={{ padding: "12px 14px", color: "#888" }}>{r.email}</td>
                        <td style={{ padding: "12px 14px", color: "#ccc" }}>{r.type}</td>
                        <td style={{ padding: "12px 14px", color: "#ccc" }}>{r.budget}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: statusBg[r.status], color: statusColor[r.status], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                            {t.admin.statuses[r.status]}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px", color: "#666" }}>{r.date}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {["pending", "reviewed", "accepted", "declined"].map(s => (
                              <button key={s} onClick={() => updateStatus(r.id, s)}
                                style={{ background: r.status === s ? statusBg[s] : "transparent", color: r.status === s ? statusColor[s] : "#555", border: `1px solid ${r.status === s ? statusColor[s] + "44" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11 }}>
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
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <button style={{ background: "transparent", color: "#666", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => setAdminLoggedIn(false)}>
                  <i className="ti ti-logout" aria-hidden /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#555", fontSize: 14, margin: 0 }}>
          &lt;<span style={{ color: "#7f6af8" }}>NADJIB</span>/&gt; · Built with React · {new Date().getFullYear()} ·{" "}
          <a href="mailto:nedjaoumnadjib@gmail.com" style={{ color: "#7f6af8", textDecoration: "none" }}>nedjaoumnadjib@gmail.com</a>
        </p>
      </footer>

      {/* FLOATING BUTTONS */}
      <button style={styles.whatsapp} onClick={() => window.open("https://wa.me/213659673190", "_blank")} title="WhatsApp">
        <i className="ti ti-brand-whatsapp" aria-label="WhatsApp" />
      </button>
      <button style={styles.emailFloat} onClick={() => window.open("mailto:nedjaoumnadjib@gmail.com")} title="Email">
        <i className="ti ti-mail" aria-label="Email" />
      </button>
    </div>
  );
}
