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
    <section 
      id="menu" 
      className="px-5" 
      aria-labelledby="menu-heading"
      aria-describedby="menu-description"
      role="region"
    >
      <div id="menu-description" className="sr-only">
        Interactive cocktail carousel showing detailed recipes and information
      </div>

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation" role="tablist">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`cocktail-panel-${index}`}
              id={`cocktail-tab-${index}`}
              tabIndex={isActive ? 0 : -1}
              aria-label={`View ${cocktail.name} recipe`}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content" role="tabpanel" id={`cocktail-panel-${currentIndex}`} aria-labelledby={`cocktail-tab-${currentIndex}`}>
        <div className="arrows" role="group" aria-label="Carousel navigation">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
            aria-label={`Previous cocktail: ${prevCocktail.name}`}
            disabled={isAnimating}
          >
            <span aria-hidden="true">{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt=""
              aria-hidden="true"
              role="img"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
            aria-label={`Next cocktail: ${nextCocktail.name}`}
            disabled={isAnimating}
          >
            <span aria-hidden="true">{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt=""
              aria-hidden="true"
              role="img"
            />
          </button>
        </div>

        <div className="cocktail">
          <img 
            src={currentCocktail.image} 
            className="object-contain"
            alt={`${currentCocktail.name} cocktail`}
            role="img"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p aria-label="Recipe information label">Recipe for:</p>
            <p id="title" aria-live="polite">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2 aria-live="polite">{currentCocktail.title}</h2>
            <p aria-live="polite">{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
