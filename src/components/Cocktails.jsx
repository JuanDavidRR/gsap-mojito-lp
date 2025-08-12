import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cocktailLists, mockTailLists } from "../constants";

const Cocktails = () => {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from("#c-right-leaf", {
        x: 100,
        y: 100,
      });
  });

  return (
    <section 
      id="cocktails" 
      className="noisy"
      role="region"
      aria-labelledby="cocktails-heading"
      aria-describedby="cocktails-description"
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
      
      <div className="sr-only" id="cocktails-description">
        Featured cocktail and mocktail menu with our most popular drinks and their prices
      </div>

      <div className="list">
        <div className="popular">
          <h2 id="cocktails-heading">Most popular cocktails:</h2>

          <ul role="list" aria-label="Popular cocktails menu">
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name} role="listitem">
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p aria-label={`Origin: ${country}, Description: ${detail}`}>
                    {country} | {detail}
                  </p>
                </div>
                <span aria-label={`Price: ${price}`}>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul role="list" aria-label="Popular mocktails menu">
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name} role="listitem">
                <div className="me-28">
                  <h3>{name}</h3>
                  <p aria-label={`Origin: ${country}, Description: ${detail}`}>
                    {country} | {detail}
                  </p>
                </div>
                <span aria-label={`Price: ${price}`}>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
