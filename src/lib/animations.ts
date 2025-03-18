import { useEffect, useRef } from 'react';

export const useAnimateOnScroll = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, options);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    elementsRef.current = Array.from(animatedElements);
    
    elementsRef.current.forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      elementsRef.current.forEach(el => {
        observerRef.current?.unobserve(el);
      });
      observerRef.current?.disconnect();
    };
  }, []);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      
      if (href) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', handleClick);
    });
    
    return () => {
      smoothScrollLinks.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, []);
};
