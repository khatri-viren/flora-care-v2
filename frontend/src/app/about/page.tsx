/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import { FadeText } from "@/components/magicui/fade-text";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const team = [
  {
    name: "Viren Khatri",
    university: "MIT-WPU",
    degree: "BTech in Computer Science",
    job: "Incoming engineer @ Worqhat",
    interest: "Loves to solve real world problems with code",
    src: "https://firebasestorage.googleapis.com/v0/b/hydrobud-427708.appspot.com/o/viren.webp?alt=media&token=ec53d49d-c749-4575-8f8e-1f85e99b1636",
    alt: "viren image",
  },
  {
    name: "Manish Nair",
    university: "MIT-WPU",
    degree: "BBA in International Business & Entrepreneurship Dev",
    job: "Ex-Deutsche Bank",
    interest: "Loves fruits & startups",
    src: "https://firebasestorage.googleapis.com/v0/b/hydrobud-427708.appspot.com/o/manish.jpeg?alt=media&token=27dbed0c-0882-4393-bd94-9fb093de8925",
    alt: "manish image",
  },
  {
    name: "Nidhi Ochani",
    university: "MIT-AOE",
    degree: "BTech in Electronics & Telecommunication",
    job: "Incoming engineer @ TMEIC",
    interest: "Loves Embedded Systems & IoT",
    src: "https://firebasestorage.googleapis.com/v0/b/hydrobud-427708.appspot.com/o/nidhi.jpeg?alt=media&token=a93d0986-c483-4810-bf80-8da4ab4342d5",
    alt: "nidhi image",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <section className="my-12 md:my-36 w-3/4 mx-auto">
        {/* <h1 className="text-2xl font-bold mx-auto w-fit">About Us</h1> */}
        <div className=" mx-auto text-center mt-7">
          <FadeText
            className="text-2xl md:text-4xl lg:text-5xl text-primary font-medium font-zodiak"
            direction="down"
            framerProps={{
              show: { transition: { duration: 1 } },
            }}
            text="Grow Fresh Produce at Home with Zero Hassle"
          />
        </div>
        <div className="mx-auto text-center mt-7">
          <FadeText
            className="text-secondary-foreground md:text-lg"
            direction="down"
            framerProps={{
              show: { transition: { duration: 1 } },
            }}
            text="Hydrobud is on a mission to make fresh, homegrown fruits and vegetables accessible to every urban home. Our cutting-edge hydroponic and aeroponic solutions are designed to empower city dwellers to grow fresh produce right on their balconies, terraces, and walls—saving space, time, and the planet."
          />
        </div>
      </section>
      <section className="mt-24 w-11/12 mx-auto">
        <Separator className="my-7" />
        <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold font-zodiak">
          Our Goal
        </h2>
        <div className="my-2 space-y-1">
          <p>
            - To create a hyperlocal platform in Tier-1 cities of India for
            fresh, locally grown fruits and vegetables.
          </p>
          <p>
            - To bring organic, homegrown produce to urban spaces through
            innovative aeroponic towers.
          </p>
          <p>
            - To offer space-saving NFT wall-mounted hydroponic systems for
            modern homes.
          </p>
        </div>
      </section>
      <section className="my-12 w-11/12 mx-auto">
        <Separator className="my-7" />
        <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold font-zodiak">
          Our Vision
        </h2>
        <div className="my-2 space-y-1 md:w-3/4">
          <p>
            Our vision is to democratize agriculture and provide every urban
            household with the ability to grow their own fruits and vegetables.
            With modern agriculture contributing to global warming and
            environmental degradation, Hydrobud aims to reverse this trend by
            promoting eco-friendly, homegrown solutions that require minimal
            space and resources.
          </p>
        </div>
      </section>
      <section className="my-12 w-11/12 mx-auto">
        <Separator className="my-7" />
        <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold text-center font-zodiak">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 w-3/4 gap-y-5 gap-x-10 mx-auto mt-12">
          {team.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-1">
                <img
                  className="rounded-lg w-full max-h-60 object-cover mb-5"
                  src={member.src}
                  alt={member.alt}
                />
                <p>- University: {member.university}</p>
                <p>- {member.degree}</p>
                <p>- {member.job}</p>
                <p>- {member.interest}</p>
              </CardContent>
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
