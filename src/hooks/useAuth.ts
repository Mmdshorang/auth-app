'use client';


import { useUserStore } from '@/app/stores/useUserStore';
import { fetchUser } from '../services/authRequest';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: fetchUser, 
    onSuccess: (data) => {
      setUser(data);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
    },
  });

  return mutation;
};

export default useAuth;
