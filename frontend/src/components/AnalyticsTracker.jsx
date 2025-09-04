import { useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Generate session ID
const generateSessionId = () => {
  const existing = sessionStorage.getItem('cashtok_session_id');
  if (existing) return existing;
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('cashtok_session_id', sessionId);
  return sessionId;
};

// Get device type
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

class AnalyticsTracker {
  constructor() {
    this.sessionId = generateSessionId();
    this.deviceType = getDeviceType();
    this.startTime = Date.now();
    this.hasTrackedPageView = false;
  }

  async track(eventType, section = null, additionalData = {}) {
    try {
      await axios.post(`${API}/analytics/track`, {
        event_type: eventType,
        page: window.location.pathname,
        section,
        device_type: this.deviceType,
        session_id: this.sessionId,
        referrer: document.referrer || null,
        additional_data: {
          ...additionalData,
          url: window.location.href,
          timestamp: Date.now()
        }
      });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  }

  async trackPageView() {
    if (this.hasTrackedPageView) return;
    this.hasTrackedPageView = true;
    await this.track('page_view', 'page_load');
  }

  async trackSectionView(sectionName) {
    await this.track('section_view', sectionName);
  }

  async trackCTAClick(ctaName, section) {
    await this.track('cta_click', section, { cta_name: ctaName });
  }

  async trackScroll(percentage) {
    if (percentage >= 25 && percentage < 50) {
      await this.track('scroll_25', 'page_scroll', { percentage });
    } else if (percentage >= 50 && percentage < 75) {
      await this.track('scroll_50', 'page_scroll', { percentage });
    } else if (percentage >= 75 && percentage < 90) {
      await this.track('scroll_75', 'page_scroll', { percentage });
    } else if (percentage >= 90) {
      await this.track('scroll_90', 'page_scroll', { percentage });
    }
  }

  async trackTimeSpent() {
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    await this.track('time_spent', 'page_exit', { seconds: timeSpent });
  }
}

// Global analytics instance
const analytics = new AnalyticsTracker();

// React component for automatic tracking
const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Track initial page view
    analytics.trackPageView();

    // Track scroll events
    let lastScrollPercentage = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.round((scrollTop / scrollHeight) * 100);
      
      if (percentage > lastScrollPercentage) {
        analytics.trackScroll(percentage);
        lastScrollPercentage = percentage;
      }
    };

    // Track time spent on page
    const handleBeforeUnload = () => {
      analytics.trackTimeSpent();
    };

    // Track visibility changes (tab switches)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        analytics.trackTimeSpent();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return children;
};

// Hook for manual tracking in components
export const useAnalytics = () => {
  const trackSectionView = (sectionName) => {
    analytics.trackSectionView(sectionName);
  };

  const trackCTAClick = (ctaName, section) => {
    analytics.trackCTAClick(ctaName, section);
  };

  const trackCustomEvent = (eventType, section, data) => {
    analytics.track(eventType, section, data);
  };

  return {
    trackSectionView,
    trackCTAClick,
    trackCustomEvent
  };
};

export default AnalyticsProvider;