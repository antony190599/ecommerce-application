import { useState, useEffect, useCallback, useRef } from "react";
import {
  CarouselWrapper,
  Slide,
  // ArrowButton,
  Dots,
  Dot,
  GradientOverlay,
} from "./styled";

interface BannerImage {
  src: string;
  alt?: string;
}

interface BannerCarouselProps {
  images: BannerImage[];
  autoplay?: boolean;
  interval?: number;
}

const BannerCarousel = ({
  images,
  autoplay = true,
  interval = 5000,
}: BannerCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = images.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrent((prevCurrent) => (prevCurrent === totalSlides - 1 ? 0 : prevCurrent + 1));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrent((prevCurrent) => (prevCurrent === 0 ? totalSlides - 1 : prevCurrent - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    
    if (autoplay && !isPaused) {
      timeoutRef.current = setTimeout(goToNext, interval);
    }
    
    return () => {
      resetTimeout();
    };
  }, [current, autoplay, isPaused, interval, goToNext, resetTimeout]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  }, [goToNext, goToPrev]);

  return (
    <CarouselWrapper
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Banner Carousel"
    >
      {images.map((image, index) => (
        <Slide
          key={index}
          isActive={index === current}
          role="group"
          aria-label={`Slide ${index + 1} of ${totalSlides}${image.alt ? ': ' + image.alt : ''}`}
          aria-hidden={index !== current}
        >
          <img src={image.src} alt={image.alt || `Banner ${index + 1}`} />
          <GradientOverlay />
        </Slide>
      ))}

      {/* <ArrowButton 
        direction="prev" 
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        &lt;
      </ArrowButton> */}
      
      {/* <ArrowButton 
        direction="next" 
        onClick={goToNext}
        aria-label="Next slide"
      >
        &gt;
      </ArrowButton> */}

      <Dots>
        {images.map((_, index) => (
          <Dot
            key={index}
            isActive={index === current}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current}
          />
        ))}
      </Dots>
    </CarouselWrapper>
  );
};

export default BannerCarousel;