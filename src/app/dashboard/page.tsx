'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './dashboard.module.scss';
import { useUserStore } from '../stores/useUserStore';

const DashboardPage = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    
    if (isClient && !user) {
      router.replace('/auth');
    }
  }, [user, router, isClient]);

  const handleLogout = () => {
    clearUser();
  };

  if (!isClient || !user) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <img src={user.picture.large} alt="User Avatar" className={styles.avatar} />
        <h1 className={styles.welcomeMessage}>
          {`خوش آمدید، ${user.name.first} ${user.name.last}!`}
        </h1>
        <p className={styles.info}>شما با موفقیت به داشبورد وارد شدید.</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          خروج از حساب
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
