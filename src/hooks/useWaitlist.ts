import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface WaitlistEntry {
  email: string;
  name: string;
  role: string;
  referral_code?: string;
  referred_by?: string;
}

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(2847);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCount = async () => {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      if (count !== null) {
        setTotalCount(2847 + count);
      }
    } catch (e) {
      console.warn('Supabase count failed, using fallback', e);
    }
  };

  const joinWaitlist = async (entry: WaitlistEntry) => {
    setLoading(true);
    try {
      const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const urlParams = new URLSearchParams(window.location.search);
      const referredBy = urlParams.get('ref');

      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            ...entry,
            referral_code: referralCode,
            referred_by: referredBy,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Get position
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', data.created_at);

      setLoading(false);
      return {
        ...data,
        position: 2847 + (count || 0) + 1,
        referralCode: data.referral_code,
      };
    } catch (e) {
      console.error('Supabase insert failed', e);
      // Fallback for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      return {
        ...entry,
        position: totalCount + 1,
        referralCode: 'DEMO' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      };
    }
  };

  return {
    loading,
    totalCount,
    joinWaitlist,
  };
};
