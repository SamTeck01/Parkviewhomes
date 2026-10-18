import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updates } from "@/data/updates";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

const UpdatesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 md:pt-36 section-pad pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Latest updates</p>
          <h1 className="text-display text-3xl md:text-5xl">News from Parkview</h1>
        </div>
        <div className="divide-y divide-border">
          {updates.map((u) => (
            <article key={u.id} className="py-8">
              <time className="text-xs uppercase tracking-wider text-muted-foreground">{formatDate(u.date)}</time>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 mb-3">{u.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{u.excerpt}</p>
              {u.link && (
                <Link to={u.link} className="inline-block mt-4 text-sm font-semibold text-accent underline underline-offset-4">
                  Learn more →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default UpdatesPage;
