import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface WaitlistEntry {
  email?: string;
  name: string;
  role: string;
  country: string;
  referral_code?: string;
  referred_by?: string;
  created_at?: string;
}

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(2847);
  const [realSignups, setRealSignups] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    fetchCount();
    fetchRecentSignups();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('public:waitlist')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'waitlist' },
        (payload) => {
          const newEntry = payload.new as WaitlistEntry;
          setRealSignups(prev => [newEntry, ...prev.slice(0, 19)]);
          setTotalCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
      console.warn('Supabase count failed', e);
    }
  };

  const fetchRecentSignups = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('name, country, role, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      if (data) setRealSignups(data as WaitlistEntry[]);
    } catch (e) {
      console.warn('Failed to fetch recent signups', e);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const joinWaitlist = async (entry: { email: string; name: string; country: string; role: string }) => {
    setLoading(true);
    try {
      const referralCode = generateReferralCode();
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

      // Calculate position
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
      console.error('Supabase join failed', e);
      setLoading(false);
      throw e;
    }
  };

  return {
    loading,
    totalCount,
    realSignups,
    joinWaitlist,
  };
};
