import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, window.scrollY);
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
