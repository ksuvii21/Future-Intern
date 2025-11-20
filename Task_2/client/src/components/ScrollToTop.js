import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth scrolling to avoid abrupt jumps that conflict with header animations.
    // This scrolls the top of the document into the viewport.
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;