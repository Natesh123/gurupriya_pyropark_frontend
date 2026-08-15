"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    cartOriginalTotal,
    cartDiscountableOriginalTotal,
    cartSavings,
    isCartOpen,
    setCartOpen,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);
  const [errors, setErrors] = useState({ name: false, phone: false, email: false, city: false, address: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minOrderValue, setMinOrderValue] = useState(0);

  useEffect(() => {
    if (isCartOpen) {
      setCurrentStep(1);
      const fetchMinOrderValue = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
          const res = await fetch(`${apiUrl}/api/settings/min-order-value/get`);
          if (res.ok) {
            const data = await res.json();
            setMinOrderValue(Number(data.value) || 0);
          }
        } catch (e) {}
      };
      fetchMinOrderValue();
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleConfirmOrder = async () => {
    const newErrors = {
      name: !customerName.trim(),
      phone: !customerPhone.trim(),
      email: customerEmail.trim() !== "" ? !customerEmail.includes('@') : false,
      city: !customerCity.trim(),
      address: !customerAddress.trim(),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        customer_city: customerCity,
        customer_address: customerAddress,
        total_amount: cartTotal,
        total_savings: cartSavings,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          originalPrice: item.originalPrice,
          quantity: item.quantity
        }))
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      setConfirmedOrderId(responseData.orderId);
      setErrors({ name: false, phone: false, email: false, city: false, address: false });
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was a problem submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const overallDiscountPercent = cartDiscountableOriginalTotal > 0 
    ? Math.round((cartSavings / cartDiscountableOriginalTotal) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-['Outfit']">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      ></div>

      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-[2rem] text-slate-800 flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        
        {isSubmitting && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#A31621] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-800 text-lg animate-pulse tracking-wide">Placing Your Order...</p>
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl grayscale opacity-70">🛒</span>
            <h2 className="text-xl font-bold tracking-wider flex items-center gap-2">
              <span className="text-[#1B124C]">YOUR</span>
              <span className="text-[#FF6B00]">CART</span>
            </h2>
            <span className="text-[10px] font-bold text-[#D4AF37] bg-[#FFF9E6] border border-[#FFE8A1] px-3 py-1 rounded-full whitespace-nowrap ml-2 uppercase tracking-wide">
              {cartCount} ITEMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="w-10 h-10 rounded-full border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                title="Clear Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 bg-[#FCFAFA] relative z-10">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10">
              <span className="text-4xl grayscale opacity-50 mb-2">🛒</span>
              <h3 className="text-slate-800 font-semibold uppercase tracking-wider text-lg">
                Your cart is empty
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Add some fireworks to light up your celebrations!
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 px-8 py-3 rounded-xl bg-[#2A1E5C] text-white font-semibold uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B124C] text-white flex items-center justify-center font-bold text-sm">
                    {currentStep}
                  </div>
                  <h3 className="text-lg font-bold text-[#1B124C] tracking-wide">
                    {currentStep === 1 ? "REVIEW PRODUCTS" : "DELIVERY DETAILS"}
                  </h3>
                </div>
                <div className="border border-gray-200 bg-white px-3 py-1 rounded text-sm font-semibold text-slate-500">
                  Step {currentStep} of 2
                </div>
              </div>

              {currentStep === 1 && (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const discountPercent = item.originalPrice > 0 ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
                    return (
                      <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-sm items-center">
                        <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          <img src={item.image || "/assets/images/placeholder.png"} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-base font-bold text-slate-800 leading-snug">{item.name}</h4>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">{item.category}</span>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-slate-900">₹{item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-slate-400 line-through font-semibold">₹{item.originalPrice}</span>
                            )}
                            {discountPercent > 0 && (
                              <span className="text-[10px] font-bold text-emerald-600 ml-1">{discountPercent}% Off</span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-50 text-lg font-medium">−</button>
                              <div className="w-10 h-8 flex items-center justify-center font-bold text-slate-800 text-sm border-x border-gray-200 bg-gray-50/50">{item.quantity}</div>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-50 text-lg font-medium">+</button>
                            </div>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 bg-red-50 w-8 h-8 rounded-md flex items-center justify-center transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => { setCustomerName(e.target.value); if(errors.name) setErrors({...errors, name: false}); }}
                        placeholder="e.g. John Doe"
                        className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2A1E5C] focus:ring-1 focus:ring-[#2A1E5C] transition-colors placeholder:text-gray-400`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Contact Number</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => { setCustomerPhone(e.target.value); if(errors.phone) setErrors({...errors, phone: false}); }}
                        placeholder="e.g. 9894116131"
                        className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2A1E5C] focus:ring-1 focus:ring-[#2A1E5C] transition-colors placeholder:text-gray-400`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => { setCustomerEmail(e.target.value); if(errors.email) setErrors({...errors, email: false}); }}
                        placeholder="e.g. name@example.com"
                        className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2A1E5C] focus:ring-1 focus:ring-[#2A1E5C] transition-colors placeholder:text-gray-400`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Full Delivery Address</label>
                      <textarea
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => { setCustomerAddress(e.target.value); if(errors.address) setErrors({...errors, address: false}); }}
                        placeholder="e.g. Street Name, Area, Pincode"
                        className={`w-full bg-white border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2A1E5C] focus:ring-1 focus:ring-[#2A1E5C] transition-colors placeholder:text-gray-400 resize-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Delivery City/Town</label>
                      <input
                        type="text"
                        value={customerCity}
                        onChange={(e) => { setCustomerCity(e.target.value); if(errors.city) setErrors({...errors, city: false}); }}
                        placeholder="e.g. Sivakasi"
                        className={`w-full bg-white border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2A1E5C] focus:ring-1 focus:ring-[#2A1E5C] transition-colors placeholder:text-gray-400`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white px-6 py-6 border-t border-gray-100 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="mb-5 flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="text-[#64748B] font-bold uppercase tracking-widest text-sm">TOTAL:</span>
                <span className="text-3xl font-bold text-[#2A1E5C]">₹{cartTotal}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#059669] font-bold text-sm">Savings: ₹{cartSavings}</span>
                {overallDiscountPercent > 0 && (
                  <span className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {overallDiscountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {currentStep === 1 ? (
                <>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-4 rounded-xl border-2 border-[#2A1E5C] text-[#2A1E5C] bg-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg leading-none">+</span> ADD MORE
                  </button>
                  {minOrderValue > 0 && cartTotal < minOrderValue ? (
                    <div className="w-full py-4 rounded-xl bg-orange-50 text-orange-800 font-bold text-sm border border-orange-200 flex flex-col items-center justify-center text-center">
                      <span>Min Order: ₹{minOrderValue} (Add ₹{minOrderValue - cartTotal} more)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-4 rounded-xl bg-[#2A1E5C] text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1B124C] transition-colors"
                    >
                      DELIVERY DETAILS →
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-4 rounded-xl border border-gray-300 text-slate-600 bg-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    ← BACK TO CART
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full py-4 rounded-xl bg-[#A31621] text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#8A121A] transition-colors shadow-md"
                  >
                    ✨ CONFIRM ORDER
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-['Outfit']">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
            <div className="relative bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-fadeIn">
              <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#A7F3D0]">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-[#2A1E5C] uppercase tracking-wider mb-2">Order Confirmed</h3>
              <p className="text-slate-600 font-medium mb-8 text-sm">
                Your order no is <span className="font-bold text-[#059669]">{confirmedOrderId ? String(confirmedOrderId).padStart(4, '0') : ''}</span>. We will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  clearCart();
                  setCartOpen(false);
                }}
                className="w-full py-4 rounded-xl bg-[#059669] text-white font-bold uppercase tracking-wider hover:bg-[#047857] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
