import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../constants";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.1,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.35,
      })
  });
  return (
    <footer 
      id="contact"
      role="contentinfo"
      aria-labelledby="contact-heading"
      aria-describedby="contact-description"
    >
      <img 
        src="/images/cocktail-left-leaf.png" 
        alt="Decorative mint leaf on the left side" 
        id="c-left-leaf"
        role="img"
        aria-hidden="true"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="Decorative mint leaf on the right side"
        id="c-right-leaf"
        role="img"
        aria-hidden="true"
      />
      
      <div className="sr-only" id="contact-description">
        Contact information including location, phone, email, opening hours and social media links
      </div>
      <section className="content">
        <h2 id="contact-heading">Where to Find Us</h2>

        <div role="group" aria-labelledby="address-heading">
          <h3 id="address-heading">Visit Our Bar</h3>
          <address>
            <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
          </address>
        </div>

        <div role="group" aria-labelledby="contact-info-heading">
          <h3 id="contact-info-heading">Contact Us</h3>
          <p>
            <a href="tel:+15559876543" aria-label="Call us at (555) 987-6543">
              (555) 987-6543
            </a>
          </p>
          <p>
            <a href="mailto:hello@jsmcocktail.com" aria-label="Send email to hello@jsmcocktail.com">
              hello@jsmcocktail.com
            </a>
          </p>
        </div>

        <div role="group" aria-labelledby="hours-heading">
          <h3 id="hours-heading">Open Every Day</h3>
          <dl role="list" aria-label="Opening hours">
            {openingHours.map((time) => (
              <div key={time.day} role="listitem">
                <dt className="sr-only">{time.day}</dt>
                <dd>
                  <span aria-label={`${time.day} opening hours`}>
                    {time.day} : {time.time}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div role="group" aria-labelledby="social-heading">
          <h3 id="social-heading">Socials</h3>

          <nav className="flex-center gap-5" aria-label="Social media links">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.name} page (opens in new tab)`}
                tabIndex="0"
              >
                <img 
                  src={social.icon} 
                  alt={`${social.name} icon`}
                  role="img"
                />
              </a>
            ))}
          </nav>
        </div>
      </section>
    </footer>
  );
};

export default Contact;
