'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './auth.module.scss';
import { useUserStore } from '../stores/useUserStore';

// تابع برای fetch کردن کاربر
const fetchUser = async () => {
  const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
  if (!response.ok) {
    throw new Error('خطا در برقراری ارتباط با سرور');
  }
  const data = await response.json();
  return data.results[0];
};

const AuthPage = () => {
  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState('');
  const router = useRouter();
  const { setUser, user: existingUser } = useUserStore();

  // اگر کاربر از قبل لاگین کرده بود، به داشبورد هدایت شود
  useEffect(() => {
    if (existingUser) {
      router.replace('/dashboard');
    }
  }, [existingUser, router]);

  // استفاده از useMutation برای مدیریت درخواست API
  const mutation = useMutation({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      // در صورت موفقیت، کاربر را در استور Zustand ذخیره کن
      setUser(data);
      // و به صفحه داشبورد هدایت کن
      router.push('/dashboard');
    },
    onError: (error) => {
      // نمایش خطا در صورت بروز مشکل در API
      console.error('Mutation Error:', error);
      setValidationError('مشکلی در فرآیند ورود رخ داد. لطفاً دوباره تلاش کنید.');
    },
  });

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
    // اجرای mutation
    mutation.mutate();
  };
  
  // اگر کاربر در حال لاگین بود یا از قبل لاگین کرده، چیزی نمایش نده
  if (mutation.isPending || existingUser) {
    return <div className={styles.loading}>در حال انتقال...</div>
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
            error={validationError || (mutation.isError ? mutation.error.message : '')}
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