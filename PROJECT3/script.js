document.addEventListener('DOMContentLoaded', function() {

    // ----------------------------------------------------
    // 1️⃣ حاسبة التوفير التفاعلية (Interactive Calculator)
    // ----------------------------------------------------
    const ordersSlider = document.getElementById('ordersSlider');
    const ordersValue = document.getElementById('ordersValue');
    const hoursSaved = document.getElementById('hoursSaved');
    const moneySaved = document.getElementById('moneySaved');

    function calculateSavings() {
        const orders = parseInt(ordersSlider.value);
        
        // حساب التوفير التقديري:
        // نقتبص مثال: كل 100 معاملة توفر 5 ساعات عمل و 150 دولار
        const hours = Math.round((orders / 100) * 5);
        const money = Math.round((orders / 100) * 150);

        // تحديث الأرقام في الصفحة
        ordersValue.textContent = orders.toLocaleString('ar-EG');
        hoursSaved.textContent = hours.toLocaleString('ar-EG');
        moneySaved.textContent = money.toLocaleString('ar-EG');
    }

    // تشغيل الحساب فور تحريك السلايدر
    ordersSlider.addEventListener('input', calculateSavings);


    // ----------------------------------------------------
    // 2️⃣ زر الوضع الداكن (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ الوضع الفاتح';
    }

    themeToggleBtn.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙 الوضع الداكن';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️ الوضع الفاتح';
        }
    });


    // ----------------------------------------------------
    // 3️⃣ معالجة نموذج التواصل (Contact Form)
    // ----------------------------------------------------
    const leadForm = document.getElementById('leadForm');
    const formStatus = document.getElementById('formStatus');

    leadForm.addEventListener('submit', function(e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        const name = document.getElementById('userName').value;

        // إظهار رسالة شكر تفاعلية
        formStatus.textContent = `شكراً لك يا ${name}! تم استلام طلبك بنجاح وسنتواصل معك قريباً. 🎉`;
        
        // تفريغ الحقول
        leadForm.reset();
    });

});