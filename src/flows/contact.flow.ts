import { createBot, createProvider, createFlow, MemoryDB } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'
import { config } from 'dotenv'

// Importar solo los flujos que tienes
import { welcomeFlow, menuFlow } from './flows/welcome.flow'
import { contactFlow } from './flows/contact.flow'

// Cargar variables de entorno
config()

const PORT = process.env.PORT || 3000

const main = async (): Promise<void> => {
  try {
    // Crear adaptadores
    const adapterDB = new MemoryDB()
    const adapterFlow = createFlow([
      welcomeFlow,
      menuFlow,
      contactFlow
      // Puedes agregar más flujos después: productsFlow, surveyFlow
    ])
    const adapterProvider = createProvider(BaileysProvider)

    // Configurar eventos del proveedor
    adapterProvider.on('ready', () => {
      console.log('✅ Bot conectado y listo!')
      console.log('📱 Escanea el código QR para vincular tu WhatsApp')
    })

    adapterProvider.on('auth_failure', (error) => {
      console.error('❌ Error de autenticación:', error)
    })

    adapterProvider.on('qr', (qr) => {
      console.log('🔄 Nuevo código QR generado')
      console.log('📱 Escanea el código QR con tu WhatsApp')
    })

    // Inicializar servidor HTTP
    adapterProvider.initHttpServer(Number(PORT))

    // Crear el bot
    await createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    })

    console.log(`🚀 Servidor HTTP iniciado en puerto ${PORT}`)
    console.log('🤖 Bot de WhatsApp con BuilderBot iniciado correctamente')
    
  } catch (error) {
    console.error('💥 Error al inicializar el bot:', error)
    process.exit(1)
  }
}

// Manejar errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

// Iniciar la aplicación
main()