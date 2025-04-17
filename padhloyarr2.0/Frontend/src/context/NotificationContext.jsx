import { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from '../api/notificationService';

import notificationService from '../api/notificationService';
const NotificationContext = createContext();

// Initial state object
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: true,
  error: null
};

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const intervalRef = useRef();

  const fetchNotifications = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const [notificationsRes, countRes] = await Promise.all([
        getNotifications(),
        getUnreadCount()
      ]);
      
      setState({
        notifications: notificationsRes.data,
        unreadCount: countRes.data.count,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Notification fetch error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to load notifications'
      }));
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => 
          n._id === notificationId ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1)
      }));
    } catch (error) {
      console.error('Mark as read error:', error);
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to mark as read'
      }));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      }));
    } catch (error) {
      console.error('Mark all read error:', error);
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to mark all as read'
      }));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Setup polling with cleanup
    intervalRef.current = setInterval(fetchNotifications, 300000); // 5 minutes
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <NotificationContext.Provider 
      value={{
        ...state,
        markAsRead: handleMarkAsRead,
        markAllAsRead: handleMarkAllAsRead,
        refreshNotifications: fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};