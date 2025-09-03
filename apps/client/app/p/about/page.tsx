import { Users, Target, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "AI enthusiast with 10+ years of experience in machine learning and natural language processing.",
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in creating intuitive user experiences with cutting-edge technology.",
    },
    {
      name: "Marcus Rivera",
      role: "AI Research Scientist",
      bio: "PhD in Computer Science focused on advancing conversational AI capabilities and ethics.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make advanced AI conversation accessible to everyone through affordable, reliable technology.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "We believe in ethical AI development, user privacy, and continuous innovation that serves human needs.",
    },
    {
      icon: Globe,
      title: "Our Vision",
      description:
        "A world where AI enhances human potential without compromising on accessibility or affordability.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            About ChatGPT Clone
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"We're"} making advanced AI conversation accessible to everyone
            through affordable, reliable technology.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-8 bg-primary"></div>
            <h2 className="text-xl font-semibold">Our Story</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              ChatGPT Clone was founded in 2023 with a simple mission: to make
              powerful AI conversation tools accessible to everyone, not just
              those with large budgets. We noticed that many AI services were
              becoming increasingly expensive, putting them out of reach for
              students, small businesses, and individuals around the world.
            </p>
            <p>
              Our team of AI researchers and developers came together to create
              an alternative that maintains high-quality conversation
              capabilities while keeping costs minimal. We believe that AI
              should empower people, not create financial barriers.
            </p>
            <p>
              Today, we serve thousands of users worldwide who rely on our
              affordable AI assistant for learning, creativity, and
              productivity. {"We're"} committed to continuously improving our
              technology while keeping it accessible to all.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-0.5 w-8 bg-primary"></div>
            <h2 className="text-xl font-semibold">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                >
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-0.5 w-8 bg-primary"></div>
            <h2 className="text-xl font-semibold">Our Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-muted/50 rounded-lg"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="font-semibold text-lg mb-6">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-muted-foreground text-sm">
                Satisfaction Rate
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-muted-foreground text-sm">Availability</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-muted-foreground text-sm">
                Countries Served
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
