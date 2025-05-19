'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Importa los estilos

const RouteLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 600);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default RouteLoader;
