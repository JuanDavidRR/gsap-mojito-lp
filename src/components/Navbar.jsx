import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, []);
  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      id="main-navigation"
    >
      <div>
        <a 
          href="#home" 
          className="flex items-center gap-2"
          aria-label="Velvet Pour home page"
          role="link"
        >
          <img 
            src="/images/logo.png" 
            alt="Velvet Pour cocktail bar logo" 
            role="img"
          />
          <p aria-hidden="true">Velvet Pour</p>
        </a>
        <ul role="menubar" aria-label="Main menu">
          {navLinks.map((link) => (
            <li key={link.id} role="none">
              <a 
                href={`#${link.id}`}
                role="menuitem"
                aria-label={`Navigate to ${link.title} section`}
                tabIndex="0"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
