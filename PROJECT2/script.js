document.addEventListener('DOMContentLoaded', function() {
    
    // ----------------------------------------------------
    // 1️⃣ تشغيل زر الوضع الداكن (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // فحص ما إذا كان المستخدم اختار الوضع الداكن سابقاً
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
    // 2️⃣ تشغيل قائمة الأسئلة الشائعة (Accordion)
    // ----------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqAnswer = this.nextElementSibling;

            // إغلاق أي إجابة أخرى مفتوحة
            document.querySelectorAll('.faq-answer').forEach(answer => {
                if (answer !== faqAnswer) {
                    answer.style.display = 'none';
                    if (answer.previousElementSibling) {
                        answer.previousElementSibling.textContent = answer.previousElementSibling.textContent.replace('➖', '➕');
                    }
                }
            });

            // فتح أو إغلاق الإجابة الحالية
            if (faqAnswer.style.display === 'block') {
                faqAnswer.style.display = 'none';
                this.textContent = this.textContent.replace('➖', '➕');
            } else {
                faqAnswer.style.display = 'block';
                this.textContent = this.textContent.replace('➕', '➖');
            }
        });
    });

});