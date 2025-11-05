'use client';

import Cookies from 'js-cookie';

// Type guard to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export const generateKey = async (): Promise<CryptoKey> => {
  if (!isBrowser) {
    throw new Error('generateKey can only be called in the browser');
  }

  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true, // Key is extractable (for storage)
    ["encrypt", "decrypt"]
  );
  
  // Export the key and store it in cookies
  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  Cookies.set("encryptionKey", keyBase64, { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  return key;
};

// Retrieve the stored key or generate a new one
export const getKey = async (): Promise<CryptoKey> => {
  if (!isBrowser) {
    throw new Error('getKey can only be called in the browser');
  }

  const storedKey = process.env.NEXT_PUBLIC_ENCRYPTED_KEY;
  if (!storedKey) return generateKey();

  const binaryString = atob(process.env.NEXT_PUBLIC_ENCRYPTED_KEY as string);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return crypto.subtle.importKey(
    "raw", 
    bytes,
    { name: "AES-GCM" }, 
    false, 
    ["encrypt", "decrypt"]
  );
};

// Convert text to a Uint8Array
const textToBuffer = (text: string): Uint8Array => 
  new TextEncoder().encode(text);

// Convert an ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => 
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

// Convert a Base64 string to a Uint8Array
const base64ToBuffer = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Encrypt function
export const encryptText = async (text: string): Promise<string> => {
  if (!isBrowser) {
    throw new Error('encryptText can only be called in the browser');
  }

  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    // @ts-expect-error type missing
    textToBuffer(text)
  );

  return `${arrayBufferToBase64(iv.buffer)}:${arrayBufferToBase64(encrypted)}`;
};

// Decrypt function
export const decryptText = async (cipherText: string): Promise<string> => {
  if (!isBrowser) {
    throw new Error('decryptText can only be called in the browser');
  }

  const key = await getKey();
  const [ivBase64, encryptedBase64] = cipherText.split(":");
  
  if (!ivBase64 || !encryptedBase64) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = base64ToBuffer(ivBase64);
  const encrypted = base64ToBuffer(encryptedBase64);

  const decrypted = await crypto.subtle.decrypt(
    // @ts-expect-error type missing
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
};