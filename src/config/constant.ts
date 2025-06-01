export const COMPANY_INFO = {
    name: process.env.COMPANY_NAME || 'Mi Empresa',
    email: process.env.COMPANY_EMAIL || 'contacto@miempresa.com',
    phone: process.env.COMPANY_PHONE || '+1234567890',
    address: process.env.COMPANY_ADDRESS || 'Calle Principal 123',
    website: 'www.miempresa.com',
    schedule: 'Lunes a Viernes: 9:00 AM - 6:00 PM'
  }
  
  export const KEYWORDS = {
    MENU: ['menu', 'opciones', 'ayuda'],
    CONTACT: ['contacto', 'contactar', 'hablar'],
    PRODUCTS: ['productos', 'producto', 'catalogo', 'precios'],
    SURVEY: ['encuesta', 'opinion', 'feedback', 'evaluacion']
  }
  
  // src/flows/welcome.flow.ts
  import { addKeyword, EVENTS } from '@builderbot/bot'
  import { MyProvider, MyDatabase } from '../types'
  
  export const welcomeFlow = addKeyword<MyProvider, MyDatabase>(EVENTS.WELCOME)
    .addAnswer('🎉 ¡Bienvenido a nuestro servicio de WhatsApp!')
    .addAnswer([
      '¿En qué puedo ayudarte hoy?',
      '',
      '📋 Escribe *menu* para ver todas las opciones',
      '📞 Escribe *contacto* para información de contacto',
      '🛍️ Escribe *productos* para ver nuestro catálogo',
      '📊 Escribe *encuesta* para darnos tu opinión'
    ])
  
  export const menuFlow = addKeyword<MyProvider, MyDatabase>(['menu', 'opciones', 'ayuda'])
    .addAnswer('📋 *MENÚ PRINCIPAL*')
    .addAnswer([
      '¿Qué te gustaría hacer?',
      '',
      '📞 *contacto* - Información de contacto',
      '🛍️ *productos* - Ver catálogo de productos',
      '📊 *encuesta* - Compartir tu opinión',
      '🏠 *inicio* - Volver al inicio',
      '',
      'Simplemente escribe la palabra clave para continuar.'
    ])