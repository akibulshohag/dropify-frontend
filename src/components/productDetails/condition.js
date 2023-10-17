import React from "react";
import { BsBagCheck, BsFillHeartFill, BsHeart, BsDot } from "react-icons/bs";

const Condition = () => {
  return (
    <div>
      <div className="text-center py-3 text-[16px] font-semibold border-b">
        শর্ত সমুহ
      </div>
      <div className="px-2 py-2">
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1">
            সর্বনিম্ন ৩ পিস পণ্য অর্ডার করতে হবে।
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            সর্বনিম্ন ১০০০ টাকার পণ্য অর্ডার করতে হবে।
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            অর্ডার প্লেসের পরে আপনার সাপ্লায়ার থেকে আমাদের চায়না ওয়্যারহাউস
            পর্যন্ত প্রডাক্ট পৌছানোর ডেলিভারির চার্জ (চায়না লোকাল ডেলিভারি
            চার্জ) ধার্য হবে
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            উল্লেখিত পণ্যের ওজন সম্পূর্ণ সঠিক নয়, আনুমানিক মাত্র। বাংলাদেশে
            আসার পর পণ্যটির প্রকৃত ওজন মেপে শিপিং চার্জ হিসাব করা হবে।
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            পণ্যের ক্যাটাগরীর উপর নির্ভর করে শিপিং চার্জ নির্ধারণ করা হবে ৳ 650
            / 850 Per Kg
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            প্রোডাক্ট স্ট্যাটাস অন দ্যা ওয়ে টু ডেলিভারি ( বিডি লোকাল ) স্ট্যাটাস
            হবার পর থেকে পরবর্তী সাত দিনের মদ্ধ্যে আফটার সেলস সার্ভিসের জন্য
            আবেদন বা সাপোর্ট টিকেট ওপেন করতে হবে! অন্যথায় তা গ্রহনযোগ্য হবে না
          </span>
        </div>
        <div className="flex pb-2">
          <BsDot className="text-[20px]" />
          <span className="text-[14px] pl-1 text-justify w-[94%]">
            ভুল প্রোডাক্ট, রিজেক্ট বা নষ্ট প্রোডাক্ট অথবা প্রোডাক্ট মিসিং
            সংক্রান্ত সমস্যার সমাধানে আফটার সেলস সার্ভিসটি গ্রহন করে দ্রুত
            সমাধান পেতে পারেন।
          </span>
        </div>
      </div>
    </div>
  );
};

export default Condition;
