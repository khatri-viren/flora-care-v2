/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="md:grid md:grid-cols-2 md:mx-12 lg:mx-24 text-udark my-24">
      <div className="leftSide mx-auto space-y-4 my-auto w-3/4">
        <div className="text-4xl font-semibold font-zodiak">
          Start Growing Smarter with FloraCare Today
        </div>
        <div className="text-sm font-light">
          Experience faster crop growth and effortless control with FloraCare's
          smart hydroponic automation—perfect for anyone to grow fresh produce
          at home.
        </div>
        <div className="space-x-4">
          <Button> Contact </Button>
          <Button variant="outline"> Learn More </Button>
        </div>
      </div>
      <div className="hidden md:block rightSide mx-auto">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/floracare-db9d6.firebasestorage.app/o/CTA1.jpeg?alt=media&token=8400b2cb-9924-4dd4-8af8-aeb0a6f5f9b8"
          alt=""
          className="rounded-md"
        />
      </div>
    </section>
  );
};

export default CTA;
