import { createBot, createProvider, createFlow, addKeyword, MemoryDB, EVENTS } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

// Flujos del bot
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

const main = async () => {
  try {
    const adapterDB = new MemoryDB()
    const adapterFlow = createFlow([welcomeFlow, menuFlow, contactFlow])
    const adapterProvider = createProvider(BaileysProvider)

    // Configurar eventos
    adapterProvider.on('ready', () => {
      console.log('✅ Bot conectado y listo!')
      console.log('📱 WhatsApp vinculado correctamente')
    })

    adapterProvider.on('qr', (qr) => {
      console.log('🔄 Código QR generado!')
      console.log(`🌐 Ve a: http://localhost:${PORT} para escanear el QR`)
    })

    adapterProvider.on('auth_failure', (error) => {
      console.error('❌ Error de autenticación:', error)
    })

    // Crear el bot y obtener el httpServer
    const { httpServer } = await createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    })

    // Iniciar el servidor HTTP (esto mostrará automáticamente el QR)
    httpServer(+PORT)

    console.log(`🚀 Bot iniciado en puerto ${PORT}`)
    console.log(`🌐 Servidor QR: http://localhost:${PORT}`)
    console.log('📱 Ve al navegador para escanear el código QR')
    
  } catch (error) {
    console.error('💥 Error:', error)
  }
}

main()