import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App helper to reuse current instance safely
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
// Add required scope for Google Sheets
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");

// Target Spreadsheet ID provided by the user
export const TARGET_SPREADSHEET_ID = "1CLQRe_QjW56mf8tFZYc5olAl5hYLhGlySgJafaJDgeU";

// Cache Google OAuth access token in memory or localStorage for background tasks
let cachedAccessToken: string | null = null;

// Initialize cached token from localStorage if present
try {
  cachedAccessToken = localStorage.getItem("aura_sheets_access_token");
} catch (e) {
  console.warn("Failed to load sheets access token from storage", e);
}

export const setSheetsAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  if (token) {
    localStorage.setItem("aura_sheets_access_token", token);
  } else {
    localStorage.removeItem("aura_sheets_access_token");
  }
};

export const getSheetsAccessToken = (): string | null => {
  return cachedAccessToken;
};

/**
 * Sign in with Google Popup and obtain access token
 */
export const signInWithGoogleSheets = async (): Promise<{ user: User; token: string }> => {
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  if (!token) {
    throw new Error("Gagal memperoleh access token dari Google Provider.");
  }
  setSheetsAccessToken(token);
  return { user: result.user, token };
};

/**
 * Append row to Google Sheets via Sheets REST API
 */
export const appendRowToSheet = async (
  sheetName: string,
  rowValues: any[]
): Promise<boolean> => {
  const token = getSheetsAccessToken();
  if (!token) {
    console.warn(`[GSheets] Skip appending to "${sheetName}": GSheets Access Token is missing.`);
    return false;
  }

  try {
    // Attempt appending to specified sheet page using server-side endpoint proxy
    const range = `${sheetName}!A:Z`;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const response = await fetch(
      `${origin}/api/sheets/append`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          spreadsheetId: TARGET_SPREADSHEET_ID,
          range: range,
          valueInputOption: "USER_ENTERED",
          values: [rowValues]
        })
      }
    );

    if (response.status === 401) {
      console.warn("[GSheets] Unauthorized: Google Token expired.");
      setSheetsAccessToken(null);
      return false;
    }

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error(`[GSheets] Failed to append row to ${sheetName}:`, errorMsg);
      // Fallback: If named tab fails (e.g. doesn't exist), try to append to Sheet1 or generic range
      if (sheetName !== "Sheet1") {
        console.log("[GSheets] Retrying with Sheet1 fallback...");
        return await appendRowToSheet("Sheet1", [sheetName, ...rowValues]);
      }
      return false;
    }

    console.log(`[GSheets] Row successfully logged to Google Sheet: ${sheetName}`);
    return true;
  } catch (error) {
    console.error(`[GSheets] Exception trying to write to Sheet:`, error);
    return false;
  }
};

/**
 * Log new user / signup to Google Sheets database
 */
export const logUserToGoogleSheets = async (user: {
  id: string;
  name: string;
  emailOrPhone: string;
  provider: string;
  createdAt: string;
}): Promise<boolean> => {
  const row = [
    user.id,
    user.name,
    user.emailOrPhone,
    user.provider,
    new Date(user.createdAt).toLocaleString("id-ID")
  ];
  return await appendRowToSheet("Peserta", row);
};

/**
 * Log or record transaction report to Google Sheets
 */
export const logTransactionToGoogleSheets = async (tx: {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  paymentMethod: string;
  status: string;
  whatsappNumber: string;
  notes?: string;
  date: string;
}): Promise<boolean> => {
  const formattedAmount = tx.amount <= 1000 ? `$${tx.amount}` : `Rp ${tx.amount.toLocaleString("id-ID")}`;
  const row = [
    tx.id,
    tx.userId,
    tx.userName,
    tx.userEmail,
    tx.whatsappNumber,
    new Date(tx.date).toLocaleString("id-ID"),
    formattedAmount,
    tx.paymentMethod,
    tx.status,
    tx.notes || ""
  ];
  return await appendRowToSheet("Transaksi", row);
};
