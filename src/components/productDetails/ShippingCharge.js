import React from "react";

const ShippingCharge = () => {
  return (
    <div>
      <div className="text-center py-3 text-[16px] font-semibold border-b">
        শিপিং চার্জ
      </div>
      <div className="px-2 py-2">
        <div className="pb-3">
          <div className="text-[18px] font-bold">
            ক্যাটাগরিঃ এ - 650 টাকা প্রতি কেজি
          </div>
          <span className="text-[14px]">
            প্রতি কেজি জুতা, ব্যাগ, জুয়েলারী,যন্ত্রপাতি, স্টিকার, ইলেকট্রনিক্স,
            কম্পিউটার এক্সেসরীস, সিরামিক, ধাতব, চামরা, রাবার,প্লাস্টিক জাতীয়
            পন্য, ব্যাটারি ব্যাতিত খেলনা।
          </span>
        </div>
        <div className="pb-3">
          <div className="text-[18px] font-bold">
            ক্যাটাগরিঃ বি - 850 টাকা প্রতি কেজি
          </div>
          <span className="text-[14px]">
            ব্যাটারি জাতীয় যেকোণ পন্য, ড্রাই কসমেটিক্স, পাউডার, ডুপ্লিকেট
            ব্রান্ড বা কপিঁ পন্য, জীবন্ত উদ্ভিদ, বীজ,রাসায়নীক দ্রব্য,
            খাদ্য,নেটওয়ার্কিং আইটেম, ম্যাগনেট বা লেজার জাতীয় পন্য।
          </span>
        </div>
        <div className="pb-3">
          <div className="text-[18px] font-bold">ক্যাটাগরিঃ সি</div>
          <span className="text-[14px]">
            পোশাক বা যেকোন গার্মেন্টস আইটেম ৮০০ টাকা প্রতি কেজি। সানগ্লাস-১৫০০
            টাকা প্রতি কেজি, তরল বা লিকুইড পন্য ৮৮০ টাকা প্রতি কেজি, স্মার্ট
            ওয়াচ ১০০০ টাকা প্রতি কেজি, সাধারন ঘড়ি ৯০০ টাকা প্রতি কেজি। Bluetooth
            হেডফোন ৯০০ টাকা প্রতি কেজি।
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShippingCharge;
