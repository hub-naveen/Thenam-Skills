export const getRelativeTime = (dateInput: any): string => {
  if (!dateInput) return 'Just now';

  let date: Date;

  // Handle Firebase Timestamp format { _seconds: number, _nanoseconds: number }
  if (typeof dateInput === 'object' && '_seconds' in dateInput) {
    date = new Date(dateInput._seconds * 1000);
  } else if (typeof dateInput === 'object' && 'seconds' in dateInput) {
    date = new Date(dateInput.seconds * 1000);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    // If it's already a string like "2 hours ago" or "Just now", return it
    if (typeof dateInput === 'string') return dateInput;
    return 'Just now';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} w${diffInWeeks > 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} mo${diffInMonths > 1 ? 's' : ''} ago`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} yr${diffInYears > 1 ? 's' : ''} ago`;
};
