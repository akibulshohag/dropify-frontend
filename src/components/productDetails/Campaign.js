import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStatus } from "@/context/contextStatus";



const Campaign = () => {
  const {offerCampaign} = useStatus()

  const targetDate = new Date(`${offerCampaign?.time}`); // Change this to your target date
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
  return (
    <div className="bg-tahiti-300 p-2 rounded-lg">
      <div className="text-[18px] font-bold pb-2">{offerCampaign?.percent}% {offerCampaign?.name}</div>
      <div className="font-semibold text-[14px] text-tahiti-500">
        OFFER ENDS IN
      </div>
      <div className="flex space-x-4 py-2 xms:space-x-1 xs:space-x-0 items-center">
        <div className="bg-red-500 px-2 py-2 text-white text-sm font-semibold rounded-md font-serifs">
          {timeRemaining.days.toString().padStart(2, "0")} Days
        </div>
        <div className="bg-red-500 px-2 py-2 text-white text-sm font-semibold rounded-md font-serifs">
          {timeRemaining.hours.toString().padStart(2, "0")} Hours
        </div>

        <div className="bg-red-500 px-2 py-2 text-white text-sm font-semibold rounded-md font-serifs">
          {timeRemaining.minutes.toString().padStart(2, "0")} Min
        </div>
        <p className="bg-red-500 px-2 py-2 text-white text-sm font-semibold rounded-md font-serifs">
          {timeRemaining.seconds.toString().padStart(2, "0")} Sec
        </p>
      </div>
      {/* <div className=" py-1 text-red-500 text-[14px]">
        অফারটি চলবে ৩১ আগস্ট, ২০২৩ পর্যন্ত।
      </div> */}
      <div>
        <Image
          src={"/assets/footer/playstore.png"}
          width={150}
          height={60}
          alt={"playstore"}
        />
      </div>
    </div>
  );
};

export default Campaign;
