import { cn } from "@/shared/utils";
import { Button } from "@/shared/components";

export default function Home() {
  const headingClass = cn("text-foreground font-extrabold leading-tight mb-6");
  const paragraphClass = cn(
    "text-lg md:text-xl max-w-xl mx-auto text-muted-foreground"
  );

  const cardsText = [
    {
      title: "Visual Boards",
      description:
        "Drag and drop cards between lists to track progress in a satisfyingly simple way.",
    },
    {
      title: "Team Collaboration",
      description:
        "Invite your team, assign tasks, and leave comments to keep everyone in sync.",
    },
    {
      title: "Powerful & Simple",
      description:
        "All the features you expect: due dates, labels, attachments, and more, in a clean UI.",
    },
  ];

  return (
    <section className="py-20 md:py-32 text-center">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <h1 className={cn(headingClass, "text-4xl md:text-6xl")}>
            Organize your chaos.
            <br />
            Master your day.
          </h1>

          <p className={cn(paragraphClass, "mb-6")}>
            Kanbanly is the minimalist, flexible, and visual way to manage your
            projects and organize anything, with anyone.
          </p>

          <Button size="lg" className="font-bold text-xl">
            Get Started – It&apos;s Free
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className={cn(headingClass, "text-3xl md:text-4xl mb-4")}>
            Everything You Need to Be Productive
          </h2>

          <p className={cn(paragraphClass, "mb-16")}>
            Focus on the features that matter, without the clutter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardsText.map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 md:p-8 rounded-2xl text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-lg md:text-xl mb-2">
                  {item.title}
                </p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
