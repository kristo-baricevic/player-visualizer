import { gsap } from "gsap";

export const createStarburst = (numberOfLines: number, staggerTime: number) => {
  try {
    const container = document.getElementById("starburst");
    if (!container) throw new Error("Starburst container not found");

    for (let i = 0; i < numberOfLines; i++) {
      const line = document.createElement("div");
      line.className = "line";
      line.style.transform = `rotate(${(360 / numberOfLines) * i}deg)`;
      line.style.backgroundColor = getRandomColor() as string;

      container.appendChild(line);

      gsap.fromTo(
        line,
        { width: 0, opacity: 0 },
        {
          duration: 2,
          width: "50%",
          opacity: 0.25,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * staggerTime,
        }
      );
    }
  } catch (error) {
    console.error("Error in createStarburst:", error);
  }
};

export const getRandomColor = () => {
  try {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color || "#FFFFFF";
  } catch (error) {
    console.error("Error in getRandomColor:", error);
  }
};

export const createSky = () => {
  try {
    const nightSky = document.getElementById("night-sky");
    const numberOfStars = 300;
    const skyColor = getRandomColor();
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Random size from 1px to 3px
      const starSize = Math.random() * 2 + 1;
      star.style.width = `${starSize}px`;
      star.style.height = `${starSize}px`;
      star.style.backgroundColor = skyColor as string;

      // Random position within the container
      if (nightSky) {
        const posX = Math.random() * nightSky.offsetWidth;
        const posY = Math.random() * nightSky.offsetHeight;
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;

        nightSky.appendChild(star);
      }

      //animation
      gsap.to(star, {
        opacity: Math.random(),
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  } catch (error) {
    console.error("error in createSky: ", error);
  }
};

export const animationForSong = (
  bpm: number | null,
  analysisData1: number,
  analysisData2: number
) => {
  try {
    clearAnimations();
    // Use BPM to set animation duration
    if (!bpm) {
      return null;
    }

    const durationBasedOnBPM = 60 / bpm;

    // Use spectral centroid to set color
    const colorBasedOnCentroid = `hsl(${analysisData1 % 360}, 100%, 50%)`;

    // Use spectral rolloff to set Y-axis movement
    const yMovementBasedOnRolloff = analysisData2 / 1000;

    gsap.to(".box", {
      rotate: 360,
      y: yMovementBasedOnRolloff,
      duration: durationBasedOnBPM,
    });

    gsap.fromTo(
      ".sample-info h3",
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 2 }
    );

    gsap.fromTo(
      ".sample-info p",
      { opacity: 0 },
      { opacity: 1, duration: 2.5, delay: 2.15 }
    );

    gsap.to(".letter", {
      color: colorBasedOnCentroid,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      delay: 1,
      stagger: 0.5,
      repeatDelay: 0.5,
    });

    // Adjust the starburst parameters based on the analysis data
    createStarburst(100, durationBasedOnBPM);
    createSky();
  } catch (error) {
    console.error("error in createSongAnimation:", error);
  }
};

export const clearAnimations = () => {
  try {
    // Clear GSAP animations
    gsap.killTweensOf(".box, .letter, .star, .line");

    // Clear existing stars and lines
    const starburstContainer = document.getElementById("starburst");
    const nightSkyContainer = document.getElementById("night-sky");
    if (starburstContainer) {
      starburstContainer.innerHTML = "";
    }
    if (nightSkyContainer) {
      nightSkyContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("error in clearAnimations:", error);
  }
};
