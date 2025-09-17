import React from "react";
import "./HomePage.css";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countersRef.current.forEach((counter) => {
              const updateCounter = () => {
                const target = +counter.getAttribute("data-counter-to");
                const current = +counter.innerText.replace("+", "");
                const increment = Math.ceil(target / 200);

                if (current < target) {
                  counter.innerText = `${current + increment}+`;
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = `${target}+`;
                }
              };
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (countersRef.current[0]) {
      observer.observe(countersRef.current[0].parentNode.parentNode);
    }

    return () => observer.disconnect();
  }, []);

  const defaultCategories = [
    {
      image: "/book-cover.png",
      title: "Book Cover Designing",
      desc: "Eye-catching book covers designed to attract readers and reflect your story.",
    },
    {
      image: "/ghost.png",
      title: "Ghostwriting",
      desc: "Professional ghostwriters bring your ideas to life with engaging words.",
    },
    {
      image: "/TRANSLATION-ICON.png",
      title: "Translation",
      desc: "Accurate, culturally relevant translations across multiple languages.",
    },
    {
      image: "/LITERARY.png",
      title: "Literary Representation",
      desc: "Get connected with trusted literary agents to publish and promote your work.",
    },
    {
      image: "/amazon.png",
      title: "Amazon Marketing Services (AMS)",
      desc: "Boost your book’s visibility and sales with expert Amazon marketing strategies.",
    },
    {
      image: "/ILLUSTRATION.png",
      title: "Illustrations",
      desc: "Custom illustrations that add depth, creativity, and appeal to your projects.",
    },
    {
      image: "/VOICOVER.png",
      title: "Voice Over",
      desc: "Professional voice artists deliver clear, expressive, and impactful narration.",
    },
    {
      image: "/VIDEO-EDITING.png",
      title: "Video Editing",
      desc: "High-quality editing to make your videos engaging, polished, and impactful.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countersRef.current.forEach((counter) => {
              const updateCounter = () => {
                const target = +counter.getAttribute("data-counter-to");
                const current = +counter.innerText.replace("+", "");
                const increment = Math.ceil(target / 200);

                if (current < target) {
                  counter.innerText = `${current + increment}+`;
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = `${target}+`;
                }
              };
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (countersRef.current[0]) {
      observer.observe(countersRef.current[0].parentNode.parentNode);
    }

    return () => observer.disconnect();
  }, []);

  // ========= SLIDER-ONLY CODE (kept scoped here) =========
  const categories = defaultCategories;

  function getSlidesToShow() {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 900) return 2;
    if (w < 1200) return 3;
    return 4;
  }

  const total = categories.length;

  // Responsive slides (use React.* to avoid changing imports)
  const [slidesToShow, setSlidesToShow] = React.useState(getSlidesToShow);
  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clones for seamless loop
  const extended = React.useMemo(
    () => [
      ...categories.slice(-slidesToShow),
      ...categories,
      ...categories.slice(0, slidesToShow),
    ],
    [categories, slidesToShow]
  );

  // Start at first real slide
  const [index, setIndex] = React.useState(slidesToShow);
  const [transitionOn, setTransitionOn] = React.useState(true);
  const trackRef = useRef(null);

  // Re-center when slidesToShow changes (e.g., on resize)
  useEffect(() => {
    setTransitionOn(false);
    setIndex(slidesToShow);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTransitionOn(true))
    );
  }, [slidesToShow]);

  const nextCategorySlide = () => transitionOn && setIndex((i) => i + 1);
  const prevCategorySlide = () => transitionOn && setIndex((i) => i - 1);

  // Looping logic
  useEffect(() => {
    const onTransitionEnd = () => {
      // Jump forward (from cloned tail to real head)
      if (index >= total + slidesToShow) {
        setTransitionOn(false);
        setIndex(slidesToShow);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTransitionOn(true))
        );
      }
      // Jump backward (from cloned head to real tail)
      else if (index <= 0) {
        setTransitionOn(false);
        setIndex(total);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTransitionOn(true))
        );
      }
    };
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [index, total, slidesToShow]);

  // % shift per slide
  const shift = 100 / slidesToShow;
  // ========= END SLIDER-ONLY CODE =========''

  const gallery = [
    {
      src: "/s1.png",
      alt: "The Prince of Redemption",
    },
    {
      src: "/s2.png",
      alt: "Wings of Thought",
    },
    { src: "/s3.png", alt: "Hi Babe" },
    {
      src: "/s4.png",
      alt: "Money Talks",
    },
    {
      src: "/s5.png",
      alt: "Voyage",
    },

    {
      src: "/s6.png",
      alt: "Dracula",
    },

    {
      src: "/s7.png",
      alt: "FrankEnstien",
    },
    {
      src: "/s8.png",
      alt: "Jane Eyre",
    },
    {
      src: "/s9.png",
      alt: "The Jungle Book",
    },
    {
      src: "/s10.png",
      alt: "The Upanishads",
    },
  ];

  const columns = [0, 1, 2].map((col) =>
    gallery.filter((_, i) => i % 3 === col)
  );

  const steps = [
    {
      id: 1,
      image: "/call2.png",
      title: "Consultation call",
      description:
        "Our dedicated sales team reaches out to understand your specific needs and project goals.",
    },
    {
      id: 2,
      image: "/pp2.png",
      title: "Project Brief",
      description:
        "Authors post detailed project requirements on the platform, outlining their specific needs and expectations.",
    },
    {
      id: 3,
      image: "/fa2.png",
      title: "Freelancers Apply",
      description:
        "Qualified service providers submit proposals after carefully reviewing your project requirements.",
    },
    {
      id: 4,
      image: "/pp2.png",
      title: "Project Process",
      description:
        "Our targeted matching system ensures authors connect with the ideal service providers, after which secure payment processing enables the work to get underway.",
    },
  ];

  const progressRef = useRef(null);

  useEffect(() => {
    // Scroll progress bar
    const onScroll = () => {
      const doc = document.documentElement;
      const winScroll = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (winScroll / height) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    onScroll(); // set once
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Fade-in items as they enter viewport
    const items = Array.from(document.querySelectorAll(".snpr-mmg-item"));

    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("snpr-mmg-fade-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = [
    {
      title: "Total Timepass",
      src: "/tt1.png",
      alt: "Mountain landscape",
      hoverSrc: "/tt2.png",
    },
    {
      title: "Sun Sakeena",
      src: "/12.jpeg", // ✅ leading slash
      hoverSrc: "/12-1.png",
      alt: "Modern architecture",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Dear Remembrance",
      src: "/dear-front.png", // ✅
      hoverSrc: "/dear-back.png",
      alt: "Waterfall",
      creditHref: "https://unsplash.com",
    },
    {
      title: "⁠The Tiger that crashed my wedding",
      src: "/11.jpeg", // ✅
      hoverSrc: "/11-2.png",
      alt: "Nature landscape",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Harmonia",
      src: "/ikigai-front.png", // ✅
      hoverSrc: "/ikigai-back.png",
      alt: "Mountain sunset",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Kalyuga 2",
      src: "/kal-front.png", // ✅
      hoverSrc: "/kal-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Guilt Trip",
      src: "/guilt-front.png", // ✅
      hoverSrc: "/guilt-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "⁠Financial Literacy",
      src: "/financial.jpg", // ✅
      hoverSrc: "/financial-back.jpg",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "The Curse of Wildflower",
      src: "/wild-front.png", // ✅
      hoverSrc: "/wild-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Ekaki",
      src: "/ek1.png", // ✅
      hoverSrc: "/ek2.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Rise of Immortal",
      src: "/rise2-front.png", // ✅
      hoverSrc: "/rise2-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Price of Redemption",
      src: "/s1.png", // ✅
      hoverSrc: "/ss2.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Crown Blood",
      src: "/crown-front.png", // ✅
      hoverSrc: "/crown-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Daggers of Treason",
      src: "/dragger-front.png", // ✅
      hoverSrc: "/dragger-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Dracula",
      src: "/dracul2-front.png", // ✅
      hoverSrc: "/dracula2-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
  ];

  const [current, setCurrent] = React.useState(0);
  const [animationClass, setAnimationClass] = React.useState("");

  // Go to next/prev with slide direction
  const handleNext = () => {
    setAnimationClass("snpr-slide-right");
    setTimeout(() => setCurrent((p) => (p + 1) % testimonials.length), 50);
  };
  const handlePrev = () => {
    setAnimationClass("snpr-slide-left");
    setTimeout(
      () => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1)),
      50
    );
  };

  const testimonials = [
    {
      image: "/pranav.jpeg",
      stars: 5,
      text: "Really, I must congratulate the team for designing such a marvelous and thoughtful cover! It's unanimously liked! The cover is so effective!, that I gained 2000 followers on Insta in 5 days, by boosting a reel based on the cover alone! My fullest appreciation for the professional involved in making the cover. I was always a little doubtful as to how a story with a tiger could be marketed in our country. There you proved me wrong.",
      name: "Pranav Mishra",
      title: "The Tiger That Crashed My Wedding",
      color: "var(--themeColor)",
    },
    {
      image: "/t2.jpg",
      stars: 4,
      text: "Dolor sit amet consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.",
      name: "Laura White",
      title: "Design Director at Bright",
      color: "var(--themeColor)",
    },
    {
      image: "/t3.jpg",
      stars: 5,
      text: "Amazing team! Really helped streamline our workflow and project delivery. Couldn’t recommend more.",
      name: "Mohit Sharma",
      title: "CEO at TechWay",
      color: "var(--themeColor)",
    },
  ];

  // Clear animation class after it plays
  React.useEffect(() => {
    const t = setTimeout(() => setAnimationClass(""), 500);
    return () => clearTimeout(t);
  }, [current]);

  // current testimonial
  const { image, stars, text, name, title, color } = testimonials[current];

  return (
    <div>
      <section className="sniper-hero" aria-label="Hero: Snipers Landing">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
          aria-hidden="true"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 className="sniper-title">We will take it from here!</h1>

        <p className="sniper-subtitle">
          Connect with book service professionals who are committed to
          delivering flawless results. From cover design to marketing campaigns,
          we hit the target every time.
        </p>

        <div className="sniper-search-section" />

        <div className="sniper-buttons">
          <a to="/signup" className="btn-black">
            Hire a Sniper
          </a>
          <a to="/signup" className="btn-white">
            Be a Sniper
          </a>
        </div>
      </section>

      <section className="number-stats" id="about">
        <div className="about__stats">
          {[
            { num: 1200, label: "Authors & Publishers Served" },
            { num: 900, label: "Pro Freelancers Onboarded" },
            { num: 1500, label: "Book Covers & Illustrations Delivered" },
            { num: 2200, label: "Manuscripts Edited & Proofread" },
            { num: 1100, label: "5-Star Client Reviews" },
          ].map((stat, i) => (
            <div className="stat" key={i}>
              <div
                className="stat__num"
                data-counter-to={stat.num}
                ref={(el) => (countersRef.current[i] = el)}
              >
                0+
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="snpr-integration" aria-label="Showcase">
        <div className="snpr-integration-df">
          <div className="snpr-integration-left">
            {["up", "down", "up"].map((direction, colIdx) => (
              <div
                key={colIdx}
                className={`snpr-integration-list ${direction}`}
              >
                <div className="snpr-integration-inner">
                  {[...columns[colIdx], ...columns[colIdx]].map((item, idx) => (
                    <div key={idx} className="snpr-integration-card">
                      {item.href ? (
                        <a
                          href={item.href}
                          aria-label={item.alt}
                          className="snpr-integration-card-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="snpr-integration-img-wrap">
                            <img
                              src={item.src}
                              alt={item.alt}
                              width={185}
                              height={240}
                              className="snpr-integration-img"
                              loading="eager"
                            />
                          </div>
                          <h3 className="snpr-integration-title">{item.alt}</h3>
                        </a>
                      ) : (
                        <>
                          <div className="snpr-integration-img-wrap">
                            <img
                              src={item.src}
                              alt={item.alt}
                              width={185}
                              height={240}
                              className="snpr-integration-img"
                              loading="eager"
                            />
                          </div>
                          <h3 className="snpr-integration-title">{item.alt}</h3>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="snpr-integration-right">
            <h1>Yours can be next!</h1>
            <p>
              Impactful book designs, publishing assets, and campaigns that
              helped authors reach more readers and build lasting brands.
            </p>

            <a href="/gallery-section">
              <button className="snpr-cta-button" id="snpr-integration-btn">
                Explore our work
                <span className="snpr-arrow-wrapper">
                  <span className="snpr-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Vetting Section */}
      <section className="snpr-vetting">
        <div className="snpr-vetting-wrapper">
          <div className="snpr-vetting-container">
            <div className="snpr-vetting-text">
              <h2>Your Journey with Hubhawks Live</h2>
              <p>
                Our talented professionals are ready to bring your ideas to
                life. To go live, start here. Every author begins with an idea —
                a story, a message, a vision waiting to be shared. At Hubhawks
                Live, we help transform that spark into a clear, structured
                journey.
              </p>
              <p>
                From shaping your first draft to refining details and preparing
                for publication, our process ensures your words grow into a
                masterpiece that reaches the readers it deserves.
              </p>
              <p>
                A spark of imagination that deserves to shine. At Hubhawks Live,
                we turn that spark into a structured path, supporting you
                through writing, editing, design, and launch. Our author-first
                approach ensures your story not only comes alive but also
                reaches the right audience, leaving a lasting impact in the
                world of readers.
              </p>

              <div className="snpr-vetting-buttons">
                <button className="snpr-vetting-hire-btn">
                  Hire freelancer
                </button>
                <button className="snpr-vetting-learn-btn">Learn more</button>
              </div>

              {/* Trust icons */}
              <div className="snpr-vetting-trust">
                {/* Award-winning (medal + star) */}
                <div
                  className="snpr-trust-item"
                  role="img"
                  aria-label="Award-Winning Designers"
                >
                  <svg
                    id="award"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Medal icon"
                  >
                    <defs>
                      <linearGradient
                        id="medalGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#FFC44D" />
                        <stop offset="100%" stopColor="#FF9F1C" />
                      </linearGradient>
                      <filter
                        id="softShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="1.2"
                          stdDeviation="1.2"
                          floodOpacity="0.25"
                        />
                      </filter>
                    </defs>

                    <path
                      d="M16 10 L32 30"
                      stroke="#586CFF"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M64 10 L48 30"
                      stroke="#7A8CFF"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />

                    <circle cx="40" cy="50" r="18" fill="url(#medalGrad)" />
                    <circle
                      cx="40"
                      cy="50"
                      r="18"
                      fill="none"
                      stroke="#E58A00"
                      strokeWidth="2"
                    />

                    <polygon
                      points="
                  40,35
                  43.8,44.6
                  54.8,44.6
                  45.9,51.4
                  49.0,61
                  40,55.3
                  31.0,61
                  34.1,51.4
                  25.2,44.6
                  36.2,44.6"
                      fill="#FFFFFF"
                      filter="url(#softShadow)"
                    />
                  </svg>
                  <span>Award-Winning Designers</span>
                </div>

                {/* Author-first (open book + quill) */}
                <div
                  className="snpr-trust-item"
                  role="img"
                  aria-label="Author-First Process"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-book">
                    <path
                      d="M8 14c8-4 16-4 24 0v36c-8-4-16-4-24 0V14z"
                      fill="#A066FF"
                    />
                    <path
                      d="M32 14c8-4 16-4 24 0v36c-8-4-16-4-24 0V14z"
                      fill="#6AD1E3"
                    />
                    <path
                      d="M40 20l-8 10 14-6"
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 20h8"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Author-First Process</span>
                </div>

                {/* Fast turnaround (calendar + check) */}
                <div
                  className="snpr-trust-item"
                  role="img"
                  aria-label="Fast Turnaround"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-calendar">
                    <rect
                      x="8"
                      y="12"
                      width="48"
                      height="40"
                      rx="8"
                      fill="#FF6B6B"
                    />
                    <path d="M16 22h32" stroke="#fff" strokeWidth="3" />
                    <path
                      d="M22 34l6 6 14-14"
                      stroke="#fff"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="12" r="4" fill="#fff" />
                    <circle cx="44" cy="12" r="4" fill="#fff" />
                  </svg>
                  <span>Fast Turnaround</span>
                </div>

                {/* Rights-safe (shield + ©) */}
                <div
                  className="snpr-trust-item"
                  role="img"
                  aria-label="Rights-Safe & Secure"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-shield">
                    <path
                      d="M32 6l18 6v14c0 13-8 22-18 26-10-4-18-13-18-26V12l18-6z"
                      fill="#00C853"
                    />
                    <circle cx="32" cy="30" r="10" fill="#fff" />
                    <text
                      x="32"
                      y="34"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="#00C853"
                    >
                      ©
                    </text>
                  </svg>
                  <span>Rights-Safe & Secure</span>
                </div>
              </div>
            </div>

            <div className="snpr-vetting-scrollable">
              {steps.map((step) => (
                <div className="snpr-vetting-card" key={step.id}>
                  <div className="snpr-vetting-image">
                    <img
                      src={step.image}
                      width={350}
                      height={220}
                      alt={step.title}
                    />
                  </div>
                  <div className="snpr-vetting-info">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="snpr-team-section">
        <div className="snpr-team-container">
          <div className="snpr-team-content">
            <div className="snpr-team-text" id="meet-title">
              <h2 className="snpr-team-title">Meet Our Team</h2>
              <p className="snpr-team-description">
                Passionate professionals dedicated to delivering excellence Our
                diverse team brings together years of experience, creativity,
                and innovation to every project. We believe in collaboration,
                continuous learning, and pushing boundaries to achieve
                remarkable results.
              </p>

              <div className="snpr-team-stats" id="team-stats">
                <div className="snpr-team-stat">
                  <h3>50+</h3>
                  <p>Team Members</p>
                </div>
                <div className="snpr-team-stat">
                  <h3>10+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="snpr-team-stat">
                  <h3>200+</h3>
                  <p>Projects Completed</p>
                </div>
              </div>

              <div className="snpr-team-values">
                <h3>Our Core Values</h3>
                <ul>
                  <li>Innovation and creativity in everything we do</li>
                  <li>Commitment to quality and excellence</li>
                  <li>Collaborative spirit and teamwork</li>
                  <li>Continuous learning and growth</li>
                </ul>
              </div>

              <div className="snpr-team-btn">
                <button>Know More</button>
              </div>
            </div>

            <div className="snpr-team-image-content">
              <div className="snpr-team-image-wrapper">
                <img
                  src="/team.png"
                  alt="team-img"
                  className="snpr-team-image"
                  width="0"
                  height="0"
                />
                <div className="snpr-team-image-overlay">
                  <p>Together we achieve more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="snpr-logos-slider">
        <h1>Our Partners</h1>
        <div className="snpr-logos-track">
          <div className="snpr-logos-item">
            <img src="/Audible2.png" alt="Audible" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Bhari2.png" alt="Bhari" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Bloom2.png" alt="Bloom" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Crosswor2.png" alt="Crossword" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Fingerprint2.png" alt="Finger" loading="lazy" />
          </div>

          <div className="snpr-logos-item">
            <img src="/harper2.png" alt="Harper" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/higgino2.png" alt="Higgino" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/iroc2.png" alt="IROC" loading="lazy" />
          </div>

          <div className="snpr-logos-item">
            <img src="/Kunzum2.png" alt="Kunzum" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/om2.png" alt="OM" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/oxford2.png" alt="Oxford" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/red2.png" alt="Red" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/sapna2.png" alt="Sapna" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/scholastic2.png" alt="Scholastic" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/simon2.png" alt="Simon" loading="lazy" />
          </div>
          <div className="snpr-logos-item" id="background">
            <img src="/Jaico2.png" alt="Jaico" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/tara2.png" alt="Tara" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/title2.png" alt="Tara" loading="lazy" />
          </div>

          {/* Repeat for seamless scroll */}
          <div className="snpr-logos-item">
            <img src="/Audible2.png" alt="Audible" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Bhari2.png" alt="Bhari" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Bloom2.png" alt="Bloom" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Crosswor2.png" alt="Crossword" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Fingerprint2.png" alt="Finger" loading="lazy" />
          </div>

          <div className="snpr-logos-item">
            <img src="/Harper2.png" alt="Harper" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/Higgino2.png" alt="Higgino" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/iroc2.png" alt="IROC" loading="lazy" />
          </div>

          <div className="snpr-logos-item">
            <img src="/Kunzum2.png" alt="Kunzum" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/om2.png" alt="OM" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/oxford2.png" alt="Oxford" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/red2.png" alt="Red" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/sapna2.png" alt="Sapna" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/scholastic2.png" alt="Scholastic" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/simon2.png" alt="Simon" loading="lazy" />
          </div>
          <div className="snpr-logos-item" id="background">
            <img src="/jaico2.png" alt="Jaico" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/tara2.png" alt="Tara" loading="lazy" />
          </div>
          <div className="snpr-logos-item">
            <img src="/title2.png" alt="Tara" loading="lazy" />
          </div>
        </div>
      </div>

      <section className="snpr-hero">
        <div className="snpr-hero-overlay"></div>
        <div className="snpr-hero-content">
          <div className="snpr-hero-container">
            <div className="snpr-hero-text">
              <h1>Experience freelance talent like never before</h1>
              <p>
                Partnering with top freelancers can elevate your projects and
                drive results. Our platform connects you with skilled
                professionals ready to tackle your unique challenges.
              </p>
              <div className="snpr-hero-buttons">
                <button className="snpr-hero-primary-btn">Post a Job</button>
                <a href="#" className="snpr-hero-browse-link">
                  Browse Freelancers →
                </a>
              </div>
            </div>
          </div>

          <div className="snpr-hero-cards">
            <div className="snpr-hero-card">
              <h3>Diverse Talent Pool</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Browse Freelancers →</a>
            </div>
            <div className="snpr-hero-card">
              <h3>Easily post Jobs</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Post a Job →</a>
            </div>
            <div className="snpr-hero-card">
              <h3>Manage Contracts</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Sign up →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Projects with Masonry Gallery Section ===== */}
      <div className="snpr-projects-section">
        <h2 className="snpr-projects-title">How Far We Have Come</h2>
        <p className="snpr-projects-subtitle">
          Our snipers have delivered exceptional results for authors across
          genres. See some of our recent cover design projects.
        </p>

        <div className="snpr-mmg-root">
          <div ref={progressRef} className="snpr-mmg-scroll-indicator" />

          <div className="snpr-mmg-container">
            <div className="snpr-mmg-gallery">
              {items.map((item, idx) => (
                <article
                  key={item.id ?? idx}
                  id={`grid-${idx + 1}`}
                  className="snpr-mmg-item"
                  style={{ ["--delay"]: String(idx + 1) }}
                >
                  <div className="snpr-mmg-item-inner">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="snpr-mmg-img snpr-default-img"
                      loading="lazy"
                    />

                    {item.hoverSrc && (
                      <img
                        src={item.hoverSrc}
                        alt={`${item.alt} (hover)`}
                        className="snpr-mmg-img snpr-hover-img"
                        loading="lazy"
                      />
                    )}

                    <div className="snpr-mmg-overlay">
                      <h2 className="snpr-mmg-card-title">{item.title}</h2>
                      {item.desc && (
                        <p className="snpr-mmg-card-desc">{item.desc}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <span>
          <a href="/gallery-section">
            <button className="snpr-view-btn">View All</button>
          </a>
        </span>
      </div>

      <section className="snpr-testimonial">
        <div className="snpr-testimonial-wrapper">
          <div className="snpr-testimonial-left">
            <h2>Here’s what our great customers say.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed
              accumsan ultrices aliquam nibh lectus non feugiat placerat ut
              facilisis velit neque.
            </p>

            <div className="snpr-testimonial-buttons">
              <button onClick={handlePrev} aria-label="Previous testimonial">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button onClick={handleNext} aria-label="Next testimonial">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={`snpr-testimonial-card ${animationClass}`}>
            <div className="snpr-testimonial-photo">
              <img src={image} alt={name} />
            </div>

            <div className="snpr-testimonial-content">
              <div className="snpr-testimonial-stars">
                {"★".repeat(stars)}
                {"☆".repeat(5 - stars)}
              </div>
              <p className="snpr-testimonial-text">{text}</p>
              <h4>{name}</h4>
              <p className="snpr-testimonial-title" style={{ color }}>
                {title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="snpr-support-df">
        <div className="snpr-support-section">
          <div className="snpr-support-icon">
            <a href="/">
              <img
                src="/hub-white.png"
                className="snpr-support-logo"
                width="55"
                height="55"
                alt="logo"
              />
            </a>
          </div>

          <h2 className="snpr-support-title">Our Freelancers Have Got You</h2>

          <p className="snpr-support-desc">
            Join thousands of authors who trust HubHawks Live for their
            publishing needs. From cover design to marketing campaigns, our
            expert freelancer deliver results with precision.
          </p>

          <div className="snpr-support-cta">
            <button className="snpr-support-btn snpr-support-btn--primary">
              Join Us
            </button>
            <button
              className="snpr-support-btn snpr-support-btn--outline"
              id="snpr-post"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
