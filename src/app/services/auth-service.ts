import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as firebaseDeleteUser,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { User } from "../types";
import {
  createOrUpdateUserInFirestore,
  createOrUpdateCustomerProfile,
  getCustomerProfile,
  getUserById,
} from "./firestore-service";

// Sign up with email and password
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  role: "customer" | "reseller" | "admin" = "customer",
): Promise<User> {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const firebaseUser = userCredential.user;

    // Update profile with name
    await updateProfile(firebaseUser, { displayName: name });

    // Create user document in Firestore
    const user: User = {
      id: firebaseUser.uid,
      name: name,
      email: email,
      role: role,
      phone: "",
      addresses: [],
      profileComplete: false,
    };

    await createOrUpdateUserInFirestore(user);

    // Also create customer profile (incomplete)
    await createOrUpdateCustomerProfile(firebaseUser.uid, {
      id: firebaseUser.uid,
      name: name,
      email: email,
      role: role,
      phone: "",
      addresses: [],
      profileComplete: false,
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Sign in with email and password
export async function signInWithEmail(
  email: string,
  password: string,
): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const firebaseUser = userCredential.user;

    // Fetch user data from Firestore
    const user = await getUserFromAuth(firebaseUser);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Sign in with Google
export async function signInWithGoogle(
  userRole: "customer" | "reseller" = "customer",
): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Create or update user in Firestore
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "User",
      email: firebaseUser.email || "",
      role: userRole,
      phone: firebaseUser.phoneNumber || "",
      addresses: [],
      profileComplete: false,
    };

    await createOrUpdateUserInFirestore(user);

    // Check if customer profile exists, if not create incomplete one
    const existingProfile = await getCustomerProfile(firebaseUser.uid);
    if (!existingProfile) {
      await createOrUpdateCustomerProfile(firebaseUser.uid, {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: userRole,
        phone: firebaseUser.phoneNumber || "",
        addresses: [],
        profileComplete: false,
      });
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Get current user
export function getCurrentUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const user = await getUserFromAuth(firebaseUser);
        callback(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}

// Internal: Get user from Firebase
async function getUserFromAuth(firebaseUser: FirebaseUser): Promise<User> {
  try {
    // First try to fetch the user from Firestore to get the actual role and data
    const firestoreUser = await getUserById(firebaseUser.uid);

    if (firestoreUser) {
      return firestoreUser;
    }

    // Fallback: If user doesn't exist in Firestore yet, create basic user object
    // This shouldn't happen in normal flow, but keeping as safety net
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "User",
      email: firebaseUser.email || "",
      role: "customer",
      phone: firebaseUser.phoneNumber || "",
      addresses: [],
    };
    return user;
  } catch (error) {
    console.error("Error fetching user from Firestore:", error);
    // Fallback user object if Firestore fetch fails
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "User",
      email: firebaseUser.email || "",
      role: "customer",
      phone: firebaseUser.phoneNumber || "",
      addresses: [],
    };
  }
}

// Sign out
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Reset password
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Update user email
export async function updateUserEmail(newEmail: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateEmail(user, newEmail);
      // Fetch current user data from Firestore to preserve role and other data
      const firestoreUser = await getUserById(user.uid);
      if (firestoreUser) {
        await createOrUpdateUserInFirestore({
          ...firestoreUser,
          email: newEmail,
        });
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Update user password
export async function updateUserPassword(newPassword: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Delete user account
export async function deleteUserAccount(password: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (user && user.email) {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Delete user
      await firebaseDeleteUser(user);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Check if user is authenticated
export function isUserAuthenticated(): boolean {
  return auth.currentUser !== null;
}

// Get current user ID
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}
