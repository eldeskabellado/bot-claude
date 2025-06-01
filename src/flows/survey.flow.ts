import { addKeyword } from '@builderbot/bot'
import { MyProvider, MyDatabase } from '../types'

export const surveyFlow = addKeyword<MyProvider, MyDatabase>(['encuesta', 'opinion', 'feedback', 'evaluacion'])
  .addAnswer('📊 *ENCUESTA DE SATISFACCIÓN*')
  .addAnswer([
    '¡Tu opinión es muy importante para nosotros!',
    '',
    'Te haremos algunas preguntas rápidas para mejorar nuestro servicio.',
    '',
    '⏱️ *Tiempo estimado: 2 minutos*'
  ])
  .addAnswer(
    '1️⃣ **¿Cómo calificarías nuestro servicio?**\n\nEscribe un número del 1 al 10:\n• 1-3: Malo\n• 4-6: Regular\n• 7-8: Bueno\n• 9-10: Excelente',
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      const rating = parseInt(ctx.body)
      
      if (rating >= 1 && rating <= 10) {
        await state.update({ 
          surveyAnswers: { satisfaction: rating }
        })
        
        let message = `✅ Has calificado nuestro servicio con ${rating}/10`
        
        if (rating <= 6) {
          message += '\n\n😔 Lamentamos que tu experiencia no haya sido la mejor. Nos ayudarás a mejorar.'
        } else if (rating <= 8) {
          message += '\n\n😊 ¡Gracias! Nos alegra saber que tuviste una buena experiencia.'
        } else {
          message += '\n\n🎉 ¡Excelente! Nos encanta saber que superamos tus expectativas.'
        }
        
        await flowDynamic(message)
      } else {
        await flowDynamic('❌ Por favor, ingresa un número válido del 1 al 10:')
      }
    }
  )
  .addAnswer(
    '2️⃣ **¿Recomendarías nuestros servicios?**\n\nEscribe un número del 1 al 10:\n• 1-6: No recomendaría\n• 7-8: Tal vez\n• 9-10: Definitivamente sí',
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      const recommendation = parseInt(ctx.body)
      
      if (recommendation >= 1 && recommendation <= 10) {
        const currentAnswers = state.getMyState().surveyAnswers || {}
        await state.update({ 
          surveyAnswers: { 
            ...currentAnswers, 
            recommendation 
          }
        })
        
        let message = `✅ Probabilidad de recomendación: ${recommendation}/10`
        
        if (recommendation <= 6) {
          message += '\n\n📝 Entendemos tus reservas. Tu feedback nos ayudará a mejorar.'
        } else if (recommendation <= 8) {
          message += '\n\n👍 ¡Gracias! Trabajaremos para que nos recomiendes con más confianza.'
        } else {
          message += '\n\n🌟 ¡Increíble! Eres nuestro mejor promotor.'
        }
        
        await flowDynamic(message)
      } else {
        await flowDynamic('❌ Por favor, ingresa un número válido del 1 al 10:')
      }
    }
  )
  .addAnswer(
    '3️⃣ **¿Tienes algún comentario adicional?**\n\n💬 Cuéntanos qué podemos mejorar o qué te gustó más:\n\n(Escribe tu respuesta o "saltar" para omitir)',
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      const feedback = ctx.body.toLowerCase()
      
      if (feedback !== 'saltar') {
        const currentAnswers = state.getMyState().surveyAnswers || {}
        await state.update({ 
          surveyAnswers: { 
            ...currentAnswers, 
            feedback: ctx.body 
          }
        })
      }
      
      const userState = state.getMyState()
      const answers = userState.surveyAnswers || {}
      
      await flowDynamic([
        '🎊 **¡ENCUESTA COMPLETADA!**',
        '',
        '📋 **Resumen de tus respuestas:**',
        `⭐ Satisfacción del servicio: ${answers.satisfaction}/10`,
        `🔄 Probabilidad de recomendación: ${answers.recommendation}/10`,
        feedback !== 'saltar' ? `💬 Comentario: "${answers.feedback}"` : '💬 Sin comentarios adicionales',
        '',
        '🙏 **¡Muchas gracias por tu tiempo!**',
        'Tu opinión nos ayuda a brindar un mejor servicio.',
        '',
        '🎁 Como agradecimiento, próximamente recibirás un descuento especial.',
        '',
        'Escribe *menu* para explorar más opciones.'
      ])
    }
  )
