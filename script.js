function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

function Page1Animation() {
  gsap.to(".textBox", {
    scrollTrigger: {
      trigger: ".textBox",
      scroller: "#main ",
      start: "top 30%",
      end: "top -35%",
      pin: true,
    },
  });

  gsap.to("#workButton", {
    y: "305%",
    scrollTrigger: {
      trigger: "#workButton",
      scroller: "#main",
      start: "top 85%",
      end: "bottom 60%",
      scrub: true,
    },
  });
}
Page1Animation();

function Page2Animation() {
  var tl = gsap.timeline();
  tl.to("#page3", {
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "top top",
      pin: true,
      end: "bottom -200%",
    },
  })
    .from(".aboutBox-1", {
      y: "100%",
      rotate: "5deg",
      scrollTrigger: {
        trigger: ".aboutBox-1",
        scroller: "#main",
        start: "top 100%",
        end: "bottom 80%",
        scrub: true,
      },
    })
    .from(".box2", {
      y: "200%",
      rotate: "-5deg",
      scrollTrigger: {
        trigger: ".box2",
        scroller: "#main",
        start: "top 100%",
        end: "bottom 50%",
        scrub: true,
      },
    })
    .from(".box3", {
      y: "300%",
      rotate: "5deg",
      scrollTrigger: {
        trigger: ".box3",
        scroller: "#main",
        start: "top 100%",
        end: "bottom 50%",
        scrub: true,
      },
    })
    .from(".box4", {
      y: "400%",
      rotate: "-5deg",
      scrollTrigger: {
        trigger: ".box4",
        scroller: "#main",
        start: "top 100%",
        end: "bottom 50%",
        scrub: true,
      },
    });
}

Page2Animation();

function cardFlip() {
  var cards = document.querySelectorAll(".flip-box-inner-skill");

  if (cards.length > 0) {
    cards.forEach((card) => {
      card.addEventListener('click', function() {
        card.classList.toggle('is-flipped');
      });
    });
  } else {
    console.error("No elements found with the class '.flip-box-inner-skill'");
  }
}  

cardFlip()

function Page4BoxPin(){
  gsap.to('.back-3D-Box',{
    scrollTrigger:{
      trigger:'.back-3D-Box',
      scroller:'#main',
      start:'top 20%',
      end:'bottom -300%',
      pin:true
    }
  })
}
// Page4BoxPin()

function pinningService() {
  const details = gsap.utils.toArray(".service-about");
  const photos = gsap.utils.toArray(".left-photos");
  
  // Initially hide all photos except the first one
  gsap.set(photos.slice(1), { yPercent: 101 });
  
  let mm = gsap.matchMedia();
  
  mm.add("(min-width: 600px)", () => {
    // Pinning the left photos container
    gsap.to('.left-pin', {
      scrollTrigger: {
        trigger: '.left-pin',
        scroller: '#main',
        start: 'top 20%',
        end: 'bottom -750%',
        pin: true,
        pinSpacing: false,
      }
    });

    // Loop through each service-about section to set up individual animations
    details.forEach((detail, index) => {
      if (index === 0) return; // Skip the first one as it's the initial visible state
      
      let animation = gsap.timeline()
        .to(photos[index], { yPercent: 0 }) // Bring in the next photo
        .to(photos[index - 1], { autoAlpha: 0 }, 0); // Fade out the previous photo

      ScrollTrigger.create({
        trigger: detail,
        start: "top 80%",
        end: "bottom 80%",
        animation: animation,
        scroller: '#main',
        scrub: true,
      });
    });

    return () => {
      console.log("Mobile setup");
    };
  });
}

pinningService();

