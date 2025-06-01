import { addKeyword, EVENTS } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'
import { MemoryDB } from '@builderbot/bot'

// Tipos para el bot
type MyProvider = BaileysProvider
type MyDatabase = MemoryDB

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