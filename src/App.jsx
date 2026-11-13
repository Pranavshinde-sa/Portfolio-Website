import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const PROFILE = {
  name: "Pranav Shinde",
  role: "DevOps & Cloud Engineer",
  photo: "/photo.jpg", 
  phone: "+91 91195 87185",
  email: "pranav.shinde.sa@gmail.com",
  linkedin: "https://www.linkedin.com/in/pranavshinde3/",
  github: "https://github.com/Pranavshinde-sa",
};

// The first one (sky blue) is the default, paired with dark mode.
const THEMES = [
  { id: "sky", color: "#06b6d4" },
  { id: "lavender", color: "#8b7ff0" },
  { id: "mint", color: "#3fb89b" },
  { id: "peach", color: "#f29c6b" },
  { id: "rose", color: "#ec82a5" },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const HERO_TAGS = ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"];

const ABOUT = [
  {
    title: "Cloud Intern at AlgoAnalytics",
    text: "Working on AWS CI/CD automation and monitoring since August 2026.",
  },
  {
    title: "Building projects to learn",
    text: "I learn by building: containers, pipelines, Kubernetes and infrastructure as code.",
  },
  {
    title: "Diploma in Electrical Engineering",
    text: "Walchand College of Engineering, 91.22% with first class distinction. Ranked 1st in the final two semesters.",
  },
  {
    title: "BCA at YCMOU",
    text: "Admitted to the online Bachelor of Computer Applications programme, currently ongoing.",
  },
  {
    title: "DevOps training",
    text: "DevOps Zero to Hero (Udaan Batch 11) with TrainWithShubham, since May 2026.",
  },
];

const EXPERIENCE = [
  {
    title: "ECS health agent",
    text: "Python (boto3) agent in Docker that detects failed Amazon ECS tasks, fetches their CloudWatch logs and emails an alert with a JSON log attachment. A state file prevents duplicate alerts.",
  },
  {
    title: "CI/CD to ECR and EC2",
    text: "GitHub Actions pipelines that build Docker images and push them to Amazon ECR, plus a separate pipeline that deploys images to EC2 instances.",
  },
  {
    title: "Docker image optimization",
    text: "Reduced Docker image sizes for the team's services.", // TODO: add your real before/after numbers
  },
  {
    title: "Technical documentation",
    text: "Handover guide covering setup, read-only IAM permissions, test cases and known limitations. Tested in both development and production AWS accounts.",
  },
];

const PROJECTS = [
  {
    name: "Devboard",
    repo: "https://github.com/Pranavshinde-sa/Devboard",
    status: "",
    text: "A 3-tier web app with a full DevSecOps pipeline: Docker Compose setup, GitHub Actions builds with SHA-tagged images, Trivy and Gitleaks scans, and a Kubernetes (Kind) deployment with HPA scaling from 1 to 5 replicas.",
    tags: ["Docker", "GitHub Actions", "Kubernetes", "Trivy", "Gitleaks"],
  },
  {
    name: "Expenseflow",
    repo: "https://github.com/Pranavshinde-sa/ExpenseFlow",
    status: "",
    text: "A full-stack expense tracker with a React frontend, FastAPI backend and PostgreSQL, containerized and started with a single Docker Compose command.",
    tags: ["React", "FastAPI", "PostgreSQL", "Docker Compose"],
  },
  {
    name: "One-Eye",
    repo: "https://github.com/Pranavshinde-sa/One-Eye",
    status: "In progress",
    text: "Terraform modules that provision a three-node K3s cluster on AWS, with remote state in a versioned, encrypted S3 bucket and an Ansible playbook that bootstraps the cluster.",
    tags: ["Terraform", "Ansible", "AWS", "K3s"],
  },
];

const SKILLS = {
  "Cloud (AWS)": ["EC2", "VPC", "S3", "IAM", "ALB", "ECS", "ECR", "Lambda", "CloudWatch"],
  Containers: ["Docker", "Docker Compose", "Kubernetes (Kind)"],
  "CI/CD & Security": ["GitHub Actions", "Trivy", "Semgrep", "Gitleaks"],
  "Infrastructure as Code": ["Terraform", "Ansible"],
  "Scripting & OS": ["Linux", "Shell", "Python"],
  Monitoring: ["Grafana", "Prometheus", "Loki", "CloudWatch"],
};

/* =====================================================
   Helpers
   ===================================================== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, i = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <Reveal className="mb-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

function useTheme() {
  const [accent, setAccent] = useState(() => {
    try {
      const saved = localStorage.getItem("accent-v3");
      return THEMES.some((t) => t.color === saved) ? saved : THEMES[0].color;
    } catch {
      return THEMES[0].color;
    }
  });
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("mode-v3") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.setAttribute("data-mode", mode);
    try {
      localStorage.setItem("accent-v3", accent);
      localStorage.setItem("mode-v3", mode);
    } catch {
      /* storage unavailable */
    }
  }, [accent, mode]);

  return { accent, setAccent, mode, setMode };
}

/* =====================================================
   DevOps infinity loop diagram
   ===================================================== */
const LOOP_PATH =
  "M200 100 C240 30 360 30 360 100 C360 170 240 170 200 100 C160 30 40 30 40 100 C40 170 160 170 200 100 Z";

const LOOP_NODES = [
  { label: "Build", x: 295, y: 47, anchor: "middle", dy: -12 },
  { label: "Test", x: 360, y: 100, anchor: "start", dx: 10, dy: 4 },
  { label: "Release", x: 295, y: 153, anchor: "middle", dy: 22 },
  { label: "Deploy", x: 105, y: 47, anchor: "middle", dy: -12 },
  { label: "Operate", x: 40, y: 100, anchor: "end", dx: -10, dy: 4 },
  { label: "Monitor", x: 105, y: 153, anchor: "middle", dy: 22 },
];

function InfinityLoop() {
  return (
    <svg
      className="h-auto w-full"
      viewBox="-30 0 460 200"
      role="img"
      aria-label="DevOps lifecycle loop: build, test, release, deploy, operate, monitor"
    >
      <motion.path
        d={LOOP_PATH}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {LOOP_NODES.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.2 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="5" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <text
            x={n.x + (n.dx || 0)}
            y={n.y + (n.dy || 0)}
            textAnchor={n.anchor}
            fill="var(--muted)"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11 }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
      <circle r="4.5" fill="var(--accent)">
        <animateMotion dur="9s" repeatCount="indefinite" path={LOOP_PATH} />
      </circle>
    </svg>
  );
}

function Photo() {
  const [failed, setFailed] = useState(false);
  // No photo yet: render nothing. Add public/photo.jpg and it appears.
  if (failed) return null;
  return (
    <img
      className="h-36 w-36 rounded-full border-[3px] border-accent object-cover sm:h-44 sm:w-44"
      src={PROFILE.photo}
      alt={PROFILE.name}
      onError={() => setFailed(true)}
    />
  );
}

/* =====================================================
   Page
   ===================================================== */
export default function App() {
  const { accent, setAccent, mode, setMode } = useTheme();

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            pranav<span className="text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Sections">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5" aria-label="Theme controls">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setAccent(t.color)}
                aria-label={`${t.id} theme`}
                style={{ background: t.color }}
                className={`h-[18px] w-[18px] rounded-full border-2 transition-transform hover:scale-125 ${
                  accent === t.color ? "border-ink" : "border-transparent"
                }`}
              />
            ))}
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className="ml-2 rounded-full border border-line px-3 py-1 font-mono text-xs transition-colors hover:border-accent"
            >
              {mode === "light" ? "dark" : "light"}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <Photo />
              </motion.div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={1}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to work: DevOps, Cloud and SRE roles
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={2}
                className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
              >
                Pranav <span className="text-accent">Shinde</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={3}
                className="mt-3 font-display text-xl text-muted sm:text-2xl"
              >
                {PROFILE.role}
              </motion.p>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={4}
                className="mt-5 max-w-md text-muted"
              >
                I learn by building projects, then shipping them through real pipelines on AWS.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={5}
                className="mt-6 flex flex-wrap gap-2"
              >
                {HERO_TAGS.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </motion.div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={6}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#projects"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  View projects
                </a>
                <a
                  href="/resume.pdf"
                  download="Pranav_Shinde_Resume.pdf"
                  className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent"
                >
                  Download resume
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent"
                >
                  Get in touch
                </a>
              </motion.div>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={7}
                className="mt-8 flex items-center gap-2 font-mono text-xs text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Cloud Intern at AlgoAnalytics
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur"
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                The loop I work in
              </p>
              <InfinityLoop />
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20">
          <SectionHead eyebrow="About" title="Where I am right now" />
          <div className="grid gap-4 sm:grid-cols-2">
            {ABOUT.map((a, i) => (
              <Reveal key={a.title} i={i}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent">
                  <h3 className="mb-2 font-display text-lg font-semibold tracking-tight">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20">
          <SectionHead eyebrow="Experience" title="Cloud Intern" />
          <Reveal className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight">AlgoAnalytics</h3>
              <span className="font-mono text-sm text-muted">Aug 2026 — Present</span>
            </div>
          </Reveal>

          {/* Timeline: vertical line with a dot per item */}
          <div className="relative ml-[7px] border-l-2 border-line pl-8">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.title} i={i} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-bg">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <h4 className="font-display text-lg font-semibold tracking-tight">{e.title}</h4>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{e.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <SectionHead eyebrow="Projects" title="Things I've built" />
          <div className="grid gap-4">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} i={i}>
                <div className="grid gap-5 rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent sm:grid-cols-[48px_1fr]">
                  <span className="pt-1 font-mono text-sm text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {p.name}
                      {p.status && (
                        <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 align-middle font-mono text-[11px] font-normal text-accent">
                          {p.status}
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block font-mono text-sm text-accent transition-transform hover:translate-x-1"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-sm text-muted">Other work includes shell scripts and personal websites.</p>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20">
          <SectionHead eyebrow="Skills" title="Tools I work with" />
          <div className="grid gap-8 sm:grid-cols-2">
            {Object.entries(SKILLS).map(([group, items], i) => (
              <Reveal key={group} i={i}>
                <h3 className="mb-3 font-mono text-sm text-accent">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <SectionHead eyebrow="Contact" title="Let's work together" />
          <Reveal className="mb-8 max-w-xl">
            <p className="leading-relaxed text-muted">
              I'm open to entry-level DevOps, Cloud and SRE roles. If you're hiring, or want me to
              join your team, send me a message and I'll reply quickly.
            </p>
          </Reveal>
          <div className="grid max-w-md gap-3">
            {[
              { label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
              { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
              { label: "LinkedIn", value: "pranavshinde3", href: PROFILE.linkedin },
              { label: "GitHub", value: "Pranavshinde-sa", href: PROFILE.github },
              { label: "Resume", value: "Download PDF", href: "/resume.pdf" },
            ].map((c, i) => (
              <Reveal key={c.label} i={i}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4 text-sm transition-colors hover:border-accent"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">{c.label}</span>
                  <span>{c.value}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-7 text-center text-sm text-muted">
        © {new Date().getFullYear()} Pranav Shinde
      </footer>
    </>
  );
}
