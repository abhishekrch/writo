import { CloudRain } from "lucide-react";
import { FastForward } from 'lucide-react';
import { Lock } from 'lucide-react';
import { User } from 'lucide-react';

const features = [
  {
    name: "Sign up for free",
    description:
      "Join a growing community of writers, creators, and storytellers. Set up your account in seconds and start sharing your thoughts with the world—all for free.",
    icon: User,
  },
  {
    name: "Balzing fast",
    description:
      "Your blog loads instantly and performs like a charm. We use modern web technology to ensure your content reaches your audience without delay.",
    icon: FastForward,
  },
  {
    name: "Super secure with Kinde",
    description:
      "our blog and personal data are protected with industry-leading authentication powered by Kinde. Focus on writing while we handle the security.",
    icon: Lock,
  },
  {
    name: "Easy to use",
    description:
      "Whether you're a beginner or a pro, our platform is designed to make blogging a breeze. From drafting to publishing, every step is clear and simple.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Right here you can create a blog in minutes. We make it easy for you
          to create a blog in minutes. The blog is very fast and easy to create.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}