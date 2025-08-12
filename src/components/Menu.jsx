import React, { useState } from "react";
import { allCocktails } from "../constants";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const timelineRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    if (isAnimating) return;
    
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  useGSAP(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsAnimating(true);

    timelineRef.current = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    gsap.set("#title", { opacity: 0 });
    gsap.set(".cocktail img", { y: -100, opacity: 0 });
    gsap.set(".details h2", { yPercent: 100, opacity: 0 });
    gsap.set(".details p", { yPercent: 100, opacity: 0 });

    timelineRef.current
      .to("#title", {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".cocktail img", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      }, 0)
      .to(".details h2", {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      }, 0)
      .to(".details p", {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      }, 0.5);
  }, [currentIndex]);

  return (
    <section id="menu" className="px-5" aria-labelledby="menu-heading">

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
