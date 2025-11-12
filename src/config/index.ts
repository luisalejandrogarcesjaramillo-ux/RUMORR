// src/config/index.ts
// Centralized configuration - single source of truth for URLs, strings, animation values

export const API_ENDPOINTS = {
  LEADS: '/api/leads',
  INTERACTIONS: '/api/interactions', // Para futuro
}

export const UI_STRINGS = {
  HERO_TITLE: 'Rumorr',
  HERO_SUBTITLE: 'Un viaje interactivo 3D',
  CTA_BUTTON: 'Contacto',
  FORM_TITLE: 'Déjanos tus datos',
  FORM_NAME_PLACEHOLDER: 'Nombre',
  FORM_EMAIL_PLACEHOLDER: 'Email',
  FORM_SEND_BUTTON: 'Enviar',
  FORM_SENDING: 'Enviando...',
  FORM_CLOSE_BUTTON: 'Cerrar',
  FORM_SUCCESS: '¡Gracias! Te contactaré pronto.',
  FORM_ERROR: 'Error. Intenta de nuevo.',
  MODEL_LOADING: 'Cargando 3D...',
}

export const ANIMATION_CONFIG = {
  MODAL_SPRING: { stiffness: 300, damping: 25 },
  BUTTON_HOVER_SCALE: 1.05,
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
}
