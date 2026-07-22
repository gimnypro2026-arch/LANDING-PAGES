

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const phone = document.getElementById('phone').value.trim();

        // التحقق من أن رقم الهاتف لا يقل عن 9 أرقام
        if (phone.length < 9) {
            alert('الرجاء إدخال رقم هاتف صحيح لتأكيد الطلب!');
            return;
        }

        // إخفاء النموذج وإظهار رسالة النجاح
        orderForm.style.display = 'none';
        successMessage.style.display = 'block';
    });
});