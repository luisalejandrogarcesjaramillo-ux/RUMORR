import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FeedbackMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

declare global {
  interface Window {
    showFeedback?: (message: Omit<FeedbackMessage, 'id'>) => void;
  }
}

export function FeedbackSystem() {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);

  const addMessage = useCallback((message: Omit<FeedbackMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setMessages((prev) => [...prev, { ...message, id }]);

    if (message.duration !== 0) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, message.duration || 3000);
    }
  }, []);

  // Guardar función globalmente para acceso desde otros componentes
  if (typeof window !== 'undefined') {
    window.showFeedback = addMessage;
  }

  return (
    <AnimatePresence>
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed bottom-4 left-4 z-50 p-4 rounded-lg text-white font-medium ${
            msg.type === 'success'
              ? 'bg-green-500'
              : msg.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          }`}
        >
          {msg.message}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export function useFeedback() {
  const addMessage = useCallback((message: Omit<FeedbackMessage, 'id'>) => {
    if (typeof window !== 'undefined' && window.showFeedback) {
      window.showFeedback(message);
    }
  }, []);

  return { addMessage };
}
