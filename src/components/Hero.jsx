import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  //Video reference for the hero section
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  //GSAP animation for the hero section
  useGSAP(() => {
    //Define the SplitText instances for the title and subtitle
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Apply text-gradient class once before animating
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    //Animations

    //Hero title
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.1,
      opacity: 0,
    });

    //Hero paragraphs
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.1,
      delay: 1.3,
    });

    //Scroll animation leafs
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { x: 100 }, 0)
      .to(".left-leaf", { x: -100 }, 0);

    //Video scroll animation
    // Adjust start and end values based on screen size
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "bottom top" : "bottom top";

    // Create a timeline animation for the video element
    let videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    // Set the video to play through its duration
    videoRef.current.onloadedmetadata = () => {
      videoTimeline.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);
  return (
    <>
      <section 
        id="hero" 
        className="noisy"
        role="banner"
        aria-labelledby="hero-title"
        aria-describedby="hero-description"
      >
        <h1 id="hero-title" className="title">MASTERTAIL</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="Decorative mint leaf on the left side"
          className="left-leaf"
          role="img"
          aria-hidden="true"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="Decorative mint leaf on the right side"
          className="right-leaf"
          role="img"
          aria-hidden="true"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p aria-label="Brand tagline">Cool. Crisp. Classic</p>
              <p className="subtitle" role="text">
                Sip the Spirit <br /> of summer
              </p>
            </div>
            <div className="view-cocktails">
              <p id="hero-description" className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a 
                href="#cocktails"
                role="button"
                aria-label="Navigate to cocktails menu section"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('cocktails')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View cocktails
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0" role="img" aria-label="Background video showing cocktail preparation">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          aria-label="Decorative background video of cocktail making process"
          role="img"
        >
          <track kind="captions" srcLang="en" label="English captions" />
          Your browser does not support the video tag. Please upgrade to a modern browser to view this content.
        </video>
      </div>
    </>
  );
};

export default Hero;
