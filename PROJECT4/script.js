document.addEventListener('DOMContentLoaded', function () {

    // 1️⃣ إعدادات رقم الواتساب الخاص بك (اكتب رقمك كاملاً بـ رمز الدولة بدون + أو أصفار)
    // مثال: 966500000000 أو 201000000000
    const myWhatsAppNumber = "966565269599"; 

    // العناصر الرئيسية في الصفحة
    const checkoutForm = document.getElementById('checkoutForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const formStatus = document.getElementById('formStatus');

    // 2️⃣ تفاعل كارت الـ 3D مع حركة الماوس (Tilt Effect)
    const card = document.getElementById('productCard');
    
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            card.style.transform = `rotateY(${x / 15}deg) rotateX(${-y / 15}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // 3️⃣ عند الضغط على زر "اطلب عبر الواتساب"
    // 3️⃣ عند الضغط على زر "اطلب عبر الواتساب"
    whatsappBtn.addEventListener('click', function () {
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const packageChoice = document.getElementById('productPackage').value;
        const notes = document.getElementById('custNotes').value.trim();

        // التحقق من إدخال البيانات الأساسية
        if (!name || !phone) {
            formStatus.style.color = '#ef4444';
            formStatus.textContent = '⚠️ يُرجى كتابة الاسم ورقم الهاتف أولاً.';
            return;
        }

        // بناء نص الرسالة بأسلوب متناسق
        let rawMessage = `مرحباً، أود الحصول على طلب جديد:\n`;
        rawMessage += `*الاسم:* ${name}\n`;
        rawMessage += `*الهاتف:* ${phone}\n`;
        rawMessage += `*الباقة:* ${packageChoice}\n`;
        
        if (notes) {
            rawMessage += `*ملاحظات:* ${notes}\n`;
        }

        // تشفير النص كاملاً بشكل صحيح لروابط الـ URL
        const encodedMessage = encodeURIComponent(rawMessage);

        // بناء رابط الواتساب المباشر
        const waUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

        formStatus.style.color = '#25d366';
        formStatus.textContent = '🔄 جاري تحويلك إلى الواتساب...';

        // فتح الواتساب في نافذة جديدة
        setTimeout(() => {
            window.open(waUrl, '_blank');
            formStatus.textContent = '';
        }, 1000);
    });

    // 4️⃣ التعامل مع إرسال النموذج للإيميل (عبر Formspree)
    checkoutForm.addEventListener('submit', function (e) {
        formStatus.style.color = '#3b82f6';
        formStatus.textContent = '⏳ جاري إرسال الطلب إلى الإيميل...';
    });

});