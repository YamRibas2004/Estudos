import { useState, useEffect, useCallback } from "react";

interface WeeklyMinutes {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

interface WeekHistory {
  week: number;
  minutes: number;
  date: string;
}

interface StudyTrackerState {
  currentWeek: number;
  weeklyMinutes: WeeklyMinutes;
  weekHistory: WeekHistory[];
  monthlyMinutes: number;
  lastResetMonth: number;
}

const DAILY_GOAL_MINUTES = 360; // 6 hours
const WEEKLY_GOAL_MINUTES = 720; // 12 hours
const MONTHLY_GOAL_MINUTES = 2880; // 48 hours

const initialState: StudyTrackerState = {
  currentWeek: 1,
  weeklyMinutes: {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  },
  weekHistory: [],
  monthlyMinutes: 0,
  lastResetMonth: new Date().getMonth(),
};

export function useStudyTracker() {
  const [state, setState] = useState<StudyTrackerState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("study-tracker-state");
      if (saved) {
        try {
          const parsedState = JSON.parse(saved);
          // Check if we need to reset for a new month
          const currentMonth = new Date().getMonth();
          if (parsedState.lastResetMonth !== currentMonth) {
            return {
              ...parsedState,
              monthlyMinutes: 0,
              lastResetMonth: currentMonth,
            };
          }
          return parsedState;
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("study-tracker-state", JSON.stringify(state));
    }
  }, [state]);

  // Check for monthly reset on mount and periodically
  useEffect(() => {
    const checkMonthlyReset = () => {
      const currentMonth = new Date().getMonth();
      if (state.lastResetMonth !== currentMonth) {
        setState(prev => ({
          ...prev,
          monthlyMinutes: 0,
          lastResetMonth: currentMonth,
        }));
      }
    };

    checkMonthlyReset();
    const interval = setInterval(checkMonthlyReset, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [state.lastResetMonth]);

  const formatTime = useCallback((minutes: number): string => {
    if (minutes === 0) return '0min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h${mins}`;
  }, []);

  const getWeeklyTotal = useCallback((): number => {
    return Object.values(state.weeklyMinutes).reduce((sum, minutes) => sum + minutes, 0);
  }, [state.weeklyMinutes]);

  const addTime = useCallback((day: keyof WeeklyMinutes) => {
    setState(prev => ({
      ...prev,
      weeklyMinutes: {
        ...prev.weeklyMinutes,
        [day]: prev.weeklyMinutes[day] + 30,
      },
      monthlyMinutes: prev.monthlyMinutes + 30,
    }));
  }, []);

  const nextWeek = useCallback(() => {
    const weekTotal = getWeeklyTotal();
    const newHistoryItem: WeekHistory = {
      week: state.currentWeek,
      minutes: weekTotal,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    };

    setState(prev => {
      const newHistory = [newHistoryItem, ...prev.weekHistory];
      // Keep only last 2 weeks
      if (newHistory.length > 2) {
        newHistory.pop();
      }

      return {
        ...prev,
        currentWeek: prev.currentWeek + 1,
        weeklyMinutes: {
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
          sunday: 0,
        },
        weekHistory: newHistory,
      };
    });
  }, [state.currentWeek, getWeeklyTotal]);

  const createNewWeek = useCallback(() => {
    nextWeek();
  }, [nextWeek]);

  const resetAllWeeks = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentWeek: 1,
      weeklyMinutes: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      weekHistory: [],
    }));
  }, []);

  const getCurrentMonth = useCallback((): string => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[new Date().getMonth()];
  }, []);

  const getDayProgress = useCallback((day: keyof WeeklyMinutes): number => {
    return (state.weeklyMinutes[day] / DAILY_GOAL_MINUTES) * 100;
  }, [state.weeklyMinutes]);

  const getWeeklyProgress = useCallback((): number => {
    return (getWeeklyTotal() / WEEKLY_GOAL_MINUTES) * 100;
  }, [getWeeklyTotal]);

  const getMonthlyProgress = useCallback((): number => {
    return (state.monthlyMinutes / MONTHLY_GOAL_MINUTES) * 100;
  }, [state.monthlyMinutes]);

  return {
    state,
    formatTime,
    getWeeklyTotal,
    addTime,
    nextWeek,
    createNewWeek,
    resetAllWeeks,
    getCurrentMonth,
    getDayProgress,
    getWeeklyProgress,
    getMonthlyProgress,
    DAILY_GOAL_MINUTES,
    WEEKLY_GOAL_MINUTES,
    MONTHLY_GOAL_MINUTES,
  };
}
