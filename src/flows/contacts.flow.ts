import { addKeyword } from '@builderbot/bot'
import { MyProvider, MyDatabase } from '../types'
import { COMPANY_INFO } from '../config/constants'

export const contactFlow = addKeyword<MyProvider, MyDatabase>(['contacto', 'contactar', 'hablar'])
  .addAnswer('📞 *INFORMACIÓN DE CONTACTO*')
  .addAnswer([
    `🏢 **${COMPANY_INFO.name}**`,
    '',
    `📧 Email: ${COMPANY_INFO.email}`,
    `📱 Teléfono: ${COMPANY_INFO.phone}`,
    `📍 Dirección: ${COMPANY_INFO.address}`,
    `🌐 Website: ${COMPANY_INFO.website}`,
    '',
    `🕒 **Horario de atención:**`,
    `${COMPANY_INFO.schedule}`,
    '',
    '¿Te gustaría que te contactemos? Responde *si* para continuar.'
  ])
  .addAnswer(
    '¿Cuál es tu nombre completo?',
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      const response = ctx.body.toLowerCase()
      
      if (response === 'si' || response === 'sí') {
        await state.update({ currentStep: 'contact_name' })
        return
      }
      
      if (response === 'no') {
        await flowDynamic('¡Perfecto! Si cambias de opinión, escribe *contacto* nuevamente.')
        return
      }
      
      // Si llegamos aquí, asumimos que es el nombre
      await state.update({ name: ctx.body })
      await flowDynamic(`Gracias ${ctx.body}! ¿Cuál es tu email?`)
    }
  )
  .addAnswer(
    'Perfecto, ahora necesito tu email:',
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      const email = ctx.body.toLowerCase()
      
      if (email.includes('@') && email.includes('.')) {
        await state.update({ email: ctx.body })
        await flowDynamic('¡Excelente! ¿Cuál es tu número de teléfono?')
      } else {
        await flowDynamic('Por favor, ingresa un email válido (ejemplo@correo.com):')
      }
    }
  )
  .addAnswer(
    '¿Cuál es tu número de teléfono?',
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      await state.update({ phone: ctx.body })
      const userState = state.getMyState()
      
      await flowDynamic([
        '✅ *¡Información registrada exitosamente!*',
        '',
        `📝 **Resumen de tu solicitud:**`,
        `👤 Nombre: ${userState.name}`,
        `📧 Email: ${userState.email}`,
        `📱 Teléfono: ${userState.phone}`,
        '',
        '🕒 Nos pondremos en contacto contigo dentro de las próximas 24 horas.',
        '',
        '¿Hay algo más en lo que pueda ayudarte? Escribe *menu* para ver las opciones.'
      ])
    }
  )