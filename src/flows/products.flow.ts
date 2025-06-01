import { addKeyword } from '@builderbot/bot'
import { MyProvider, MyDatabase } from '../types'
import { products } from '../config/products'

export const productsFlow = addKeyword<MyProvider, MyDatabase>(['productos', 'producto', 'catalogo', 'precios'])
  .addAnswer('🛍️ *CATÁLOGO DE PRODUCTOS*')
  .addAnswer('Aquí tienes nuestros productos disponibles:')
  .addAction(async (ctx, { flowDynamic }) => {
    const productList = products.map((product, index) => {
      return [
        `${index + 1}. **${product.name}** - $${product.price}`,
        `   ${product.description}`,
        `   Categoría: ${product.category}`,
        ''
      ].join('\n')
    }).join('\n')
    
    await flowDynamic([
      productList,
      '📝 Para más información sobre un producto específico, responde con el número (1, 2, o 3)',
      '💬 O escribe *menu* para volver al menú principal'
    ])
  })
  .addAnswer(
    '¿Sobre qué producto te gustaría saber más?',
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      const option = ctx.body.trim()
      const productIndex = parseInt(option) - 1
      
      if (productIndex >= 0 && productIndex < products.length) {
        const product = products[productIndex]
        await state.update({ product: product.name })
        
        await flowDynamic([
          `🎯 **${product.name}**`,
          '',
          `💰 **Precio:** $${product.price}`,
          `📂 **Categoría:** ${product.category}`,
          `📝 **Descripción completa:**`,
          product.description,
          '',
          '✨ **Beneficios incluidos:**',
          '• Garantía de 1 año',
          '• Soporte técnico 24/7',
          '• Envío gratuito',
          '• Instalación incluida',
          '',
          '¿Te interesa este producto? Responde *si* para contactarnos o *menu* para ver más opciones.'
        ])
      } else {
        await flowDynamic([
          '❌ Por favor, selecciona un número válido (1, 2, o 3)',
          'O escribe *menu* para volver al menú principal'
        ])
      }
    }
  )
  .addAnswer(
    '¿Te interesa este producto?',
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      const response = ctx.body.toLowerCase()
      
      if (response === 'si' || response === 'sí') {
        const userState = state.getMyState()
        await flowDynamic([
          '🎉 ¡Excelente elección!',
          '',
          `Has mostrado interés en: **${userState.product}**`,
          '',
          '📞 Un especialista se pondrá en contacto contigo pronto para:',
          '• Resolver todas tus dudas',
          '• Ofrecerte el mejor precio',
          '• Coordinar la entrega',
          '',
          'Escribe *contacto* para dejarnos tus datos o *menu* para explorar más opciones.'
        ])
      } else {
        await flowDynamic([
          '👍 ¡No hay problema!',
          'Puedes explorar nuestros otros productos escribiendo *productos*',
          'O regresar al *menu* principal.'
        ])
      }
    }
  )