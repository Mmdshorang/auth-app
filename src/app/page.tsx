'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.scss';
import { useUserStore } from './stores/useUserStore';

const HomePage = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/auth');
      }
    }
  }, [user, router, isClient]);

  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <p>در حال انتقال...</p>
    </div>
  );
};

export default HomePage;