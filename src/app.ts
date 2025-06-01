import { createBot, createProvider, createFlow, addKeyword, MemoryDB, EVENTS } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'

// Flujo de bienvenida simple (todo en un archivo)
const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('🎉 ¡Bienvenido a nuestro bot de WhatsApp!')
  .addAnswer([
    '¿En qué puedo ayudarte?',
    '',
    '📋 Escribe *menu* para ver opciones',
    '📞 Escribe *contacto* para información'
  ])

const menuFlow = addKeyword(['menu', 'opciones'])
  .addAnswer('📋 *MENÚ PRINCIPAL*')
  .addAnswer([
    '📞 *contacto* - Información de contacto',
    '🛍️ *productos* - Ver productos',
    '📊 *encuesta* - Dar opinión'
  ])

const contactFlow = addKeyword(['contacto'])
  .addAnswer('📞 *INFORMACIÓN DE CONTACTO*')
  .addAnswer([
    '🏢 **Mi Empresa**',
    '📧 Email: contacto@miempresa.com',
    '📱 Teléfono: +1234567890',
    '📍 Dirección: Calle Principal 123',
    '',
    '🕒 Lunes a Viernes: 9:00 AM - 6:00 PM'
  ])

const main = async (): Promise<void> => {
  try {
    const adapterDB = new MemoryDB()
    const adapterFlow = createFlow([welcomeFlow, menuFlow, contactFlow])
    const adapterProvider = createProvider(BaileysProvider)

    // Configurar eventos antes de crear el bot
    adapterProvider.on('ready', () => {
      console.log('✅ Bot conectado y listo!')
      console.log('📱 WhatsApp vinculado correctamente')
    })

    adapterProvider.on('qr', (qr) => {
      console.log('🔄 Código QR generado!')
      console.log('📱 Escanea este QR con WhatsApp:')
      console.log('👉 Ve al archivo bot.qr.png en la raíz del proyecto')
      console.log('👉 O busca el QR en la consola debajo de este mensaje')
    })

    adapterProvider.on('auth_failure', (error) => {
      console.error('❌ Error de autenticación:', error)
    })

    // Crear el bot sin servidor HTTP por ahora
    await createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    })

    console.log(`🚀 Bot iniciado correctamente`)
    
  } catch (error) {
    console.error('💥 Error:', error)
    console.error('Stack:', error.stack)
  }
}

main()