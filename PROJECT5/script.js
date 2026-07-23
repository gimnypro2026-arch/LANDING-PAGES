document.addEventListener('DOMContentLoaded', function () {

    // 1️⃣ إعدادات رقم الواتساب (ضع رقمك كاملاً بمفتاح الدولة)
    const myWhatsAppNumber = "966500000000"; 

    // عناصر السلة والفلترة
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEl = document.getElementById('cartCount');
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');
    const filterTabs = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    let cart = [];

    // ----------------------------------------------------
    // 2️⃣ فتح وإغلاق السلة الجانبية (Cart Drawer)
    // ----------------------------------------------------
    cartToggle.addEventListener('click', () => cartDrawer.classList.add('open'));
    closeCart.addEventListener('click', () => cartDrawer.classList.remove('open'));

    // ----------------------------------------------------
    // 3️⃣ فلترة المنتجات حسب القسم (Category Filtering)
    // ----------------------------------------------------
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // إزالة التحديد عن باقي الأزرار
            filterTabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------
    // 4️⃣ إضافة المنتج للسلة (Add to Cart)
    // ----------------------------------------------------
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            // التحقق لو المنتج موجود مسبقاً في السلة
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ id, name, price, qty: 1 });
            }

            updateCartUI();
            cartDrawer.classList.add('open'); // فتح السلة تلقائياً لرؤية المنتج
        });
    });

    // ----------------------------------------------------
    // 5️⃣ تحديث واجهة السلة (Update Cart UI & Total)
    // ----------------------------------------------------
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">السلة فارغة حالياً</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.qty;
                totalCount += item.qty;

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>$${item.price} × ${item.qty}</small>
                    </div>
                    <div>
                        <strong>$${item.price * item.qty}</strong>
                        <button style="background:none; border:none; color:red; cursor:pointer; margin-right:10px;" onclick="removeItem(${index})">❌</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        cartTotalEl.textContent = `$${total}`;
        cartCountEl.textContent = totalCount;
    }

    // حذف عنصر من السلة
    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // ----------------------------------------------------
    // 6️⃣ إرسال تفاصيل السلة الكاملة للواتساب
    // ----------------------------------------------------
    sendWhatsAppBtn.addEventListener('click', function () {
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();

        if (cart.length === 0) {
            alert('السلة فارغة! يرجى إضافة منتجات أولاً.');
            return;
        }

        if (!name || !phone) {
            alert('يرجى كتابة الاسم ورقم الهاتف لتأكيد الطلب.');
            return;
        }

        let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // بناء نص الرسالة بأسلوب متناسق
        let rawMessage = `طلب جديد من متجر AURA 🌿:\n`;
        rawMessage += `*الاسم:* ${name}\n`;
        rawMessage += `*الهاتف:* ${phone}\n`;
        rawMessage += `-------------------------\n`;
        rawMessage += `*المنتجات المطلوبة:*\n`;

        cart.forEach(item => {
            rawMessage += `• ${item.name} (${item.qty}×) - $${item.price * item.qty}\n`;
        });

        rawMessage += `-------------------------\n`;
        rawMessage += `*الإجمالي:* $${total}\n`;

        const encodedMessage = encodeURIComponent(rawMessage);
        const waUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

        window.open(waUrl, '_blank');
    });

});