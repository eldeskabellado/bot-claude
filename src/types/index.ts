import { BaileysProvider } from '@builderbot/provider-baileys'
import { MemoryDB } from '@builderbot/bot'

export type MyProvider = BaileysProvider
export type MyDatabase = MemoryDB

export interface UserState {
  name?: string
  email?: string
  phone?: string
  product?: string
  surveyAnswers?: {
    satisfaction?: number
    recommendation?: number
    feedback?: string
  }
  currentStep?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
}