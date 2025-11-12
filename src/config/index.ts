// src/config/index.ts
// Centralized configuration - single source of truth for URLs, strings, animation values
import { cubicBezier } from 'framer-motion';
import { THEME_COLOR } from './seo';

export const API_ENDPOINTS = {
  LEADS: '/api/leads',
  INTERACTIONS: '/api/interactions', // Para futuro
}

export const UI_STRINGS = {
  HERO_TITLE: 'RUMOR.RED',
  HERO_SUBTITLE: 'Una experiencia para despertar.',
  CTA_BUTTON: 'Desconectar',
  FORM_TITLE: 'Cruza el Umbral',
  FORM_NAME_PLACEHOLDER: 'Tu Identidad',
  FORM_EMAIL_PLACEHOLDER: 'Tu Conexión',
  FORM_SEND_BUTTON: 'Ofrecer Valor',
  FORM_SENDING: 'Sincronizando...',
  FORM_CLOSE_BUTTON: 'Volver a la Simulación',
  FORM_SUCCESS: 'El Oráculo ha recibido tu eco. Espera la señal.',
  FORM_ERROR: 'La señal se ha perdido. Inténtalo de nuevo.',
  MODEL_LOADING: 'Materializando la realidad...',
}

export const ANIMATION_CONFIG = {
  MODAL_SPRING: { stiffness: 300, damping: 25 },
  BUTTON_HOVER_SCALE: 1.05, // Escala sutil para micro-validación (Bernays)
  MOTION_CURVES: [0.65, 0, 0.35, 1], // Custom cubic-bezier para continuidad y calma (Gestalt)
  BUTTON_CLICK_DURATION: 1500, // ms
}

export const PERFORMANCE_THRESHOLDS = {
  MIN_FPS_MOBILE: 30,
  MIN_FPS_DESKTOP: 50,
  MODEL_MAX_SIZE_MB: 3,
}

export const THREE_D_CONFIG = {
  CAMERA_Z_DESKTOP: 5,
  CAMERA_Z_MOBILE: 3,
  CAMERA_FOV: 50,
  AMBIENT_LIGHT_INTENSITY: 0.4,
  DIRECTIONAL_LIGHT_INTENSITY: 1,
  MODEL_SCALE_DEFAULT: [1, 1, 1],
  ORBIT_CONTROLS_MIN_DISTANCE: 2,
  ORBIT_CONTROLS_MAX_DISTANCE: 10,
};

export { THEME_COLOR };

}
