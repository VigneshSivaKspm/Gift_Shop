import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  QueryConstraint,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase-config";
import {
  Product,
  User,
  Order,
  Category,
  Address,
  CartItem,
  InventoryLog,
  SiteContent,
  SiteSettings,
} from "../types";

// ========== USERS ==========

export async function createOrUpdateUserInFirestore(user: User): Promise<void> {
  try {
    const userRef = doc(firestore, "users", user.id);
    await setDoc(
      userRef,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        addresses: user.addresses || [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<User>,
): Promise<void> {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// ========== CUSTOMERS (Extended Profile) ==========

export async function createOrUpdateCustomerProfile(
  userId: string,
  customerData: Partial<User>,
): Promise<void> {
  try {
    const customerRef = doc(firestore, "customers", userId);
    await setDoc(
      customerRef,
      {
        id: userId,
        ...customerData,
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error creating/updating customer profile:", error);
    throw error;
  }
}

export async function getCustomerProfile(userId: string): Promise<User | null> {
  try {
    const customerRef = doc(firestore, "customers", userId);
    const customerSnap = await getDoc(customerRef);
    if (customerSnap.exists()) {
      return customerSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    return null;
  }
}

export async function isProfileComplete(userId: string): Promise<boolean> {
  try {
    const customerRef = doc(firestore, "customers", userId);
    const customerSnap = await getDoc(customerRef);

    if (!customerSnap.exists()) {
      return false;
    }

    const data = customerSnap.data() as User;
    // Check if required fields are present
    const requiredFields = [
      data.firstName,
      data.lastName,
      data.phone,
      data.dateOfBirth,
      data.addresses && data.addresses.length > 0,
    ];

    return requiredFields.every((field) => field);
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return false;
  }
}

// ========== PRODUCTS ==========

export async function getProducts(
  constraints: QueryConstraint[] = [],
): Promise<Product[]> {
  try {
    const q = query(collection(firestore, "products"), ...constraints);
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return getProducts();
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  try {
    const productRef = doc(firestore, "products", productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    const q = query(
      collection(firestore, "products"),
      where("category", "==", category),
    );
    return getProducts([where("category", "==", category)]);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    // Firestore doesn't support full-text search natively
    // This is a basic implementation - consider using Algolia for better search
    const q = query(collection(firestore, "products"));
    const querySnapshot = await getDocs(q);
    const results: Product[] = [];

    const lowerSearchTerm = searchTerm.toLowerCase();
    querySnapshot.forEach((doc) => {
      const product = doc.data() as Product;
      if (
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
      ) {
        results.push({ id: doc.id, ...product });
      }
    });

    return results;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

export async function createProduct(
  product: Omit<Product, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(collection(firestore, "products"), {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(
  productId: string,
  updates: Partial<Product>,
): Promise<void> {
  try {
    const productRef = doc(firestore, "products", productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, "products", productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// ========== CATEGORIES ==========

export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(firestore, "categories"));
    const querySnapshot = await getDocs(q);
    const categories: Category[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() } as Category);
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function createCategory(
  category: Omit<Category, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(collection(firestore, "categories"), {
      ...category,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(
  categoryId: string,
  updates: Partial<Category>,
): Promise<void> {
  try {
    const categoryRef = doc(firestore, "categories", categoryId);
    await updateDoc(categoryRef, updates);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, "categories", categoryId));
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// ========== ORDERS ==========

export async function createOrder(order: Omit<Order, "id">): Promise<string> {
  try {
    const docRef = await addDoc(collection(firestore, "orders"), {
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderRef = doc(firestore, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(firestore, "orders"),
      where("customerId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}

export async function getAllOrders(filters?: {
  status?: string;
  orderType?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<Order[]> {
  try {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

    if (filters?.status) {
      constraints.push(where("status", "==", filters.status));
    }

    if (filters?.orderType) {
      constraints.push(where("orderType", "==", filters.orderType));
    }

    const q = query(collection(firestore, "orders"), ...constraints);
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
): Promise<void> {
  try {
    const orderRef = doc(firestore, "orders", orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export async function updateOrder(
  orderId: string,
  updates: Partial<Order>,
): Promise<void> {
  try {
    const orderRef = doc(firestore, "orders", orderId);
    await updateDoc(orderRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

export async function deleteOrder(orderId: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, "orders", orderId));
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

// ========== CARTS ==========

export async function saveUserCart(
  userId: string,
  cartItems: CartItem[],
): Promise<void> {
  try {
    const cartRef = doc(firestore, "carts", userId);
    await setDoc(
      cartRef,
      {
        userId,
        items: cartItems,
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
}

export async function getUserCart(userId: string): Promise<CartItem[]> {
  try {
    const cartRef = doc(firestore, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function clearUserCart(userId: string): Promise<void> {
  try {
    const cartRef = doc(firestore, "carts", userId);
    await setDoc(cartRef, {
      userId,
      items: [],
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}

// ========== ADDRESSES ==========

export async function addUserAddress(
  userId: string,
  address: Address,
): Promise<string> {
  try {
    const addressRef = doc(firestore, "users", userId);
    await updateDoc(addressRef, {
      addresses: arrayUnion(address),
      updatedAt: Timestamp.now(),
    });
    return address.id;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
}

export async function updateUserAddress(
  userId: string,
  address: Address,
): Promise<void> {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const user = userSnap.data();
      const addresses = user.addresses || [];
      const updatedAddresses = addresses.map((addr: Address) =>
        addr.id === address.id ? address : addr,
      );
      await updateDoc(userRef, {
        addresses: updatedAddresses,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
}

export async function deleteUserAddress(
  userId: string,
  addressId: string,
): Promise<void> {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const user = userSnap.data();
      const addresses = user.addresses || [];
      const updatedAddresses = addresses.filter(
        (addr: Address) => addr.id !== addressId,
      );
      await updateDoc(userRef, {
        addresses: updatedAddresses,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}

// ========== INVENTORY LOGS ==========

export async function logInventoryChange(log: InventoryLog): Promise<string> {
  try {
    const docRef = await addDoc(collection(firestore, "inventoryLogs"), {
      ...log,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error logging inventory change:", error);
    throw error;
  }
}

export async function getInventoryLogs(
  productId?: string,
): Promise<InventoryLog[]> {
  try {
    const constraints: QueryConstraint[] = [orderBy("date", "desc")];

    if (productId) {
      constraints.push(where("productId", "==", productId));
    }

    const q = query(collection(firestore, "inventoryLogs"), ...constraints);
    const querySnapshot = await getDocs(q);
    const logs: InventoryLog[] = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() } as InventoryLog);
    });
    return logs;
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    throw error;
  }
}

// ========== REAL-TIME LISTENERS ==========

export function listenToProducts(callback: (products: Product[]) => void) {
  const q = query(collection(firestore, "products"));
  return onSnapshot(q, (querySnapshot) => {
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    callback(products);
  });
}

export function listenToUserOrders(
  userId: string,
  callback: (orders: Order[]) => void,
) {
  const q = query(
    collection(firestore, "orders"),
    where("customerId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (querySnapshot) => {
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    callback(orders);
  });
}

// ========== ANALYTICS & REPORTS ==========

export async function getOrderStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}> {
  try {
    const orders = await getAllOrders();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus: Record<string, number> = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      ordersByStatus[order.status]++;
    });

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      ordersByStatus,
    };
  } catch (error) {
    console.error("Error fetching order stats:", error);
    throw error;
  }
}

export async function getProductStats(): Promise<{
  totalProducts: number;
  lowStockProducts: number;
  topProducts: Product[];
  totalInventoryValue: number;
}> {
  try {
    const products = await getAllProducts();

    const lowStockProducts = products.filter((p) => p.stock < 10).length;
    const topProducts = products
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);

    const totalInventoryValue = products.reduce(
      (sum, product) => sum + product.retailPrice * product.stock,
      0,
    );

    return {
      totalProducts: products.length,
      lowStockProducts,
      topProducts,
      totalInventoryValue,
    };
  } catch (error) {
    console.error("Error fetching product stats:", error);
    throw error;
  }
}

// ========== SITE CONTENT ==========

export async function getSiteContent(
  pageId: string,
): Promise<SiteContent | null> {
  try {
    const docRef = doc(firestore, "pages", pageId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteContent;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching content for ${pageId}:`, error);
    throw error;
  }
}

export async function updateSiteContent(
  pageId: string,
  content: Partial<SiteContent>,
): Promise<void> {
  try {
    const docRef = doc(firestore, "pages", pageId);
    await setDoc(
      docRef,
      {
        ...content,
        lastUpdated: Timestamp.now(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error(`Error updating content for ${pageId}:`, error);
    throw error;
  }
}

// ========== SITE SETTINGS ==========

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(firestore, "settings", "general");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    throw error;
  }
}

export async function updateSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<void> {
  try {
    const docRef = doc(firestore, "settings", "general");
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
}
