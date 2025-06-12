import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="font-headline text-3xl md:text-4xl text-neon-primary">About Nexus Esports</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your ultimate destination for competitive gaming.
        </p>

        <div className="flex justify-center">
          <Image
            src="/about.png"
            alt="Nexus Esports Logo"
            width={600}
            height={300}
            className="rounded-lg shadow-md"
            data-ai-hint="nexus esports logo"
          />
        </div>
        <p className="text-gray-200 leading-relaxed text-left">
          Nexus Esports is dedicated to fostering a vibrant and competitive gaming community. We organize thrilling tournaments and practice scrims, primarily focusing on popular mobile titles like Free Fire. Our mission is to provide a platform for players of all skill levels to compete, improve, and connect with fellow gamers.
        </p>
        <p className="text-gray-200 leading-relaxed text-left">
          Founded by passionate gamers, we understand the excitement and camaraderie that esports brings. We strive to create fair, engaging, and well-managed events that gamers can look forward to. Whether you're an aspiring pro or just looking for some friendly competition, Nexus Esports has something for you.
        </p>
        <p className="text-gray-200 leading-relaxed text-left">
          Join us and become a part of the Nexus!
        </p>
      </div>
    </div>
  );
}
