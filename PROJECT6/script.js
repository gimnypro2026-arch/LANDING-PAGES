document.addEventListener('DOMContentLoaded', function () {

    // 1️⃣ دالة إظهار الإشعارات المنبثقة (Toast Notification System)
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3500);
    }

    // 2️⃣ الساعة الحية داخل الداشبورد (Live Clock)
    function updateLiveClock() {
        const clockEl = document.getElementById('liveClock');
        if (clockEl) {
            const now = new Date();
            clockEl.textContent = now.toTimeString().split(' ')[0];
        }
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    // 3️⃣ التبديل بين تبويبات لوحة التحكم (Dashboard Tabs)
    const dashItems = document.querySelectorAll('.dash-item');
    const tabPanels = document.querySelectorAll('.dash-tab-panel');

    dashItems.forEach(item => {
        item.addEventListener('click', () => {
            dashItems.forEach(i => i.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetTab = item.getAttribute('data-tab');
            const activePanel = document.getElementById(`tab-${targetTab}`);
            
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // 4️⃣ حاسبة الأسعار التفاعلية الحية (Interactive Pricing Calculator)
    const calcSlider = document.getElementById('calcSlider');
    const requestsDisplay = document.getElementById('requestsDisplay');
    const starterPrice = document.getElementById('starterPrice');
    const proPrice = document.getElementById('proPrice');

    if (calcSlider) {
        calcSlider.addEventListener('input', function () {
            const val = parseInt(this.value);
            
            // تنسيق رقم الطلبات بفواصل
            requestsDisplay.textContent = val.toLocaleString();

            // معادلة حساب الأسعار الديناميكية بناءً على عدد الطلبات
            const calculatedStarter = Math.round((val / 10000) * 5 + 15);
            const calculatedPro = Math.round((val / 10000) * 12 + 35);

            starterPrice.innerHTML = `$${calculatedStarter}<span>/شهر</span>`;
            proPrice.innerHTML = `$${calculatedPro}<span>/شهر</span>`;
        });
    }

    // 5️⃣ الأسئلة الشائعة المطوية (FAQ Accordion)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(i => i.classList.remove('open'));

            // إذا لم يكن مفتوحاً، افتحه
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 6️⃣ تفاعلات الأزرار والتجربة المجانية
    // 6️⃣ التحكم في نافذة تسجيل الدخول (Login Modal Toggle)
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    // فتح النافذة عند الضغط على زر تسجيل الدخول
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    // إغلاق النافذة
    if (closeModalBtn && loginModal) {
        closeModalBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        // إغلاق عند الضغط في أي مكان خارج النافذة
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // محاكاة تقديم نموذج الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            showToast('⚡ تم تسجيل الدخول بنجاح! أهلاً بك مجدداً.');
        });
    }

    // أزرار التجربة المجانية الأخرى
    const startBtns = ['startFreeBtn', 'heroStartBtn'];
    startBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                showToast('✨ جاري تجهيز بيئة العمل المجانية لك...');
            });
        }
    });
    });