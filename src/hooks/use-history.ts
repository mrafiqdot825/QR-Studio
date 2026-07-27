import { useHistoryState } from '@/contexts/history-context';

export const useHistory = () => {
  return useHistoryState();
};
