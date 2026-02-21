/**
 * Admin Service
 * 
 * Provides admin-specific operations for managing products, users, and inventory.
 * All operations check for admin authentication.
 */

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
  getProductStats,
  getInventoryLogs,
  logInventoryChange,
  createOrUpdateUserInFirestore,
  getUserById,
  getSiteContent,
  updateSiteContent,
  getSiteSettings,
  updateSiteSettings
} from './firestore-service';
import {
  uploadProductImage,
  uploadCategoryImage,
  uploadProductImageWithProgress
} from './storage-service';
import { Product, Category, Order, InventoryLog, SiteContent, SiteSettings } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase-config';

// ========== ADMIN AUTHENTICATION ==========

export async function isUserAdmin(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  
  try {
    // Check Firestore for admin role as a backup/alternative to custom claims
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (userDoc.exists() && userDoc.data().role === 'admin') {
      return true;
    }

    // Also check custom claims if available
    const idTokenResult = await user.getIdTokenResult(true);
    return idTokenResult.claims.admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function requireAdminAccess(): Promise<void> {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    throw new Error('Admin access required');
  }
}

// ========== PRODUCT MANAGEMENT ==========

export async function adminCreateProduct(
  product: Omit<Product, 'id'>,
  imageFile?: File
): Promise<string> {
  await requireAdminAccess();
  
  try {
    let imageUrl = product.image;
    
    // Upload image if provided
    if (imageFile) {
      // Create temporary product ID for storage path
      const tempId = `temp-${Date.now()}`;
      imageUrl = await uploadProductImage(tempId, imageFile);
    }
    
    const productWithImage = { ...product, image: imageUrl };
    const productId = await createProduct(productWithImage);
    
    return productId;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function adminCreateProductWithProgress(
  product: Omit<Product, 'id'>,
  imageFile: File,
  onProgress: (progress: number) => void
): Promise<string> {
  await requireAdminAccess();
  
  try {
    const tempId = `temp-${Date.now()}`;
    const imageUrl = await uploadProductImageWithProgress(tempId, imageFile, onProgress);
    
    const productWithImage = { ...product, image: imageUrl };
    const productId = await createProduct(productWithImage);
    
    return productId;
  } catch (error) {
    console.error('Error creating product with progress:', error);
    throw error;
  }
}

export async function adminUpdateProduct(
  productId: string,
  updates: Partial<Product>,
  newImage?: File
): Promise<void> {
  await requireAdminAccess();
  
  try {
    let updateData = { ...updates };
    
    // Upload new image if provided
    if (newImage) {
      const imageUrl = await uploadProductImage(productId, newImage);
      updateData.image = imageUrl;
    }
    
    await updateProduct(productId, updateData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function adminDeleteProduct(productId: string): Promise<void> {
  await requireAdminAccess();
  
  try {
    await deleteProduct(productId);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function adminGetAllProducts(): Promise<Product[]> {
  await requireAdminAccess();
  return getAllProducts();
}

// ========== CATEGORY MANAGEMENT ==========

export async function adminCreateCategory(
  category: Omit<Category, 'id'>,
  imageFile?: File
): Promise<string> {
  await requireAdminAccess();
  
  try {
    let imageUrl = category.image;
    
    if (imageFile) {
      const tempId = `temp-${Date.now()}`;
      imageUrl = await uploadCategoryImage(tempId, imageFile);
    }
    
    const categoryWithImage = { ...category, image: imageUrl };
    const categoryId = await createCategory(categoryWithImage);
    
    return categoryId;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function adminUpdateCategory(
  categoryId: string,
  updates: Partial<Category>,
  newImage?: File
): Promise<void> {
  await requireAdminAccess();
  
  try {
    let updateData = { ...updates };
    
    if (newImage) {
      const imageUrl = await uploadCategoryImage(categoryId, newImage);
      updateData.image = imageUrl;
    }
    
    await updateCategory(categoryId, updateData);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function adminDeleteCategory(categoryId: string): Promise<void> {
  await requireAdminAccess();
  await deleteCategory(categoryId);
}

// ========== ORDER MANAGEMENT ==========

export async function adminGetAllOrders(filters?: {
  status?: string;
  orderType?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<Order[]> {
  await requireAdminAccess();
  return getAllOrders(filters);
}

export async function adminUpdateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  await requireAdminAccess();
  
  try {
    await updateOrderStatus(orderId, status);
    
    // Log the status change
    const order = await (async () => {
      const orders = await getAllOrders();
      return orders.find(o => o.id === orderId);
    })();
    
    if (order) {
      // Could add inventory adjustments here if needed
      console.log(`Order ${orderId} status updated to ${status}`);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// ========== INVENTORY MANAGEMENT ==========

export async function adminLogInventoryChange(
  productId: string,
  productName: string,
  type: 'in' | 'out',
  quantity: number,
  notes?: string
): Promise<string> {
  await requireAdminAccess();
  
  try {
    const log: InventoryLog = {
      id: '',
      productId,
      productName,
      type,
      quantity,
      date: new Date(),
      notes
    };
    
    return await logInventoryChange(log);
  } catch (error) {
    console.error('Error logging inventory change:', error);
    throw error;
  }
}

export async function adminGetInventoryLogs(productId?: string): Promise<InventoryLog[]> {
  await requireAdminAccess();
  return getInventoryLogs(productId);
}

// ========== ANALYTICS & REPORTS ==========

export async function adminGetOrderStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}> {
  await requireAdminAccess();
  return getOrderStats();
}

export async function adminGetProductStats(): Promise<{
  totalProducts: number;
  lowStockProducts: number;
  topProducts: Product[];
  totalInventoryValue: number;
}> {
  await requireAdminAccess();
  return getProductStats();
}

export async function adminGetDashboardStats(): Promise<{
  orders: any;
  products: any;
  topSellingProducts: Product[];
  recentOrders: Order[];
  lowStockAlerts: Product[];
}> {
  await requireAdminAccess();
  
  try {
    const [orderStats, productStats, allOrders, allProducts] = await Promise.all([
      getOrderStats(),
      getProductStats(),
      getAllOrders({ status: 'delivered' }),
      getAllProducts()
    ]);
    
    // Sort products by rating to get top sellers
    const topSellingProducts = [...allProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
    
    // Get recent orders (last 10)
    const recentOrders = [...allOrders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
    
    // Get low stock products
    const lowStockAlerts = allProducts.filter(p => p.stock < 10);
    
    return {
      orders: orderStats,
      products: productStats,
      topSellingProducts,
      recentOrders,
      lowStockAlerts
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

// ========== USER MANAGEMENT ==========

export async function adminGetUser(userId: string): Promise<any> {
  await requireAdminAccess();
  return getUserById(userId);
}

export async function adminUpdateUserRole(userId: string, role: 'customer' | 'reseller' | 'admin'): Promise<void> {
  await requireAdminAccess();
  
  try {
    const user = await getUserById(userId);
    if (user) {
      await createOrUpdateUserInFirestore({ ...user, role });
      console.log(`User ${userId} role updated to ${role}`);
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

export async function adminDisableUser(userId: string): Promise<void> {
  await requireAdminAccess();
  
  // This would require Firebase Admin SDK on the backend
  // For now, mark user as disabled in Firestore
  try {
    const user = await getUserById(userId);
    if (user) {
      await createOrUpdateUserInFirestore({
        ...user,
        // Add disabled flag - you can add this to User type
        disabled: true
      });
    }
  } catch (error) {
    console.error('Error disabling user:', error);
    throw error;
  }
}

// ========== SITE CONTENT & SETTINGS ==========

export async function adminGetSiteContent(pageId: string): Promise<SiteContent | null> {
  await requireAdminAccess();
  return getSiteContent(pageId);
}

export async function adminUpdateSiteContent(pageId: string, content: Partial<SiteContent>): Promise<void> {
  await requireAdminAccess();
  await updateSiteContent(pageId, content);
}

export async function adminGetSiteSettings(): Promise<SiteSettings | null> {
  await requireAdminAccess();
  return getSiteSettings();
}

export async function adminUpdateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  await requireAdminAccess();
  await updateSiteSettings(settings);
}
