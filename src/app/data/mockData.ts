/**
 * DEPRECATED: This file is no longer used!
 *
 * All mock data has been replaced with live Firebase backend services.
 *
 * Instead of using mockData, import from the Firebase services:
 *
 * - Authentication: import { signInWithEmail, signUpWithEmail } from '../services/auth-service'
 * - Firestore: import { getAllProducts, getOrdersByUserId, etc } from '../services/firestore-service'
 * - Storage: import { uploadProductImage, deleteProductImage } from '../services/storage-service'
 *
 * For complete setup instructions, see FIREBASE_SETUP.md in the project root.
 *
 * The AppContext now automatically loads data from Firebase instead of local state.
 */

import { Product, Category, Order } from '../types';

// Legacy mock data - LEFT FOR REFERENCE ONLY
// DO NOT USE IN NEW CODE

export const mockCategories: Category[] = [];
export const mockProducts: Product[] = [];
export const mockOrders: Order[] = [];

