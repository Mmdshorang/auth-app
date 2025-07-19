'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './auth.module.scss';
import { useUserStore } from '../stores/useUserStore';

const AuthPage = () => {
  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState('');
  const router = useRouter();
  const { user: existingUser } = useUserStore();
  
  const mutation = useAuth();
  useEffect(() => {
    if (existingUser) {
      router.replace('/dashboard');
    }
  }, [existingUser, router]);
  
  useEffect(() => {
    if (mutation.isError) {
        setValidationError('مشکلی در فرآیند ورود رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }, [mutation.isError]);

  const validatePhoneNumber = (number: string): boolean => {
    const iranPhoneRegex = /^09\d{9}$/;
    return iranPhoneRegex.test(number);
  };

  const handleLogin = () => {
    setValidationError(''); 
    if (!validatePhoneNumber(phone)) {
      setValidationError('شماره تلفن وارد شده معتبر نیست. (مثال: 09123456789)');
      return;
    }
    mutation.mutate();
  };
  
  if (mutation.isPending || existingUser) {
    return <div className={styles.loading}>در حال انتقال...</div>;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1 className={styles.title}>ورود به پنل کاربری</h1>
        <p className={styles.subtitle}>برای ادامه، لطفاً شماره تلفن خود را وارد کنید.</p>
        <div className={styles.form}>
          <Input
            name="phone"
            type="tel"
            placeholder="شماره تلفن (مثال: 09123456789)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={validationError} // نمایش خطای ولیدیشن یا خطای API
          />
          <Button onClick={handleLogin} disabled={mutation.isPending}>
            {mutation.isPending ? 'در حال ورود...' : 'ورود'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;