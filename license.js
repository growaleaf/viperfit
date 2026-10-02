// CHASSIS: offline Pro-license verification, adapted for a static site (localStorage instead
// of chrome.storage.sync). Key format: "<PREFIX>.<base64url payload>.<base64url signature>"
// payload = JSON {e: purchaser email, t: unix seconds, p: PRODUCT_ID}
// Verified offline via WebCrypto ECDSA P-256/SHA-256 — no phoning home, ever.

const PUBLIC_KEY_SPKI_B64 = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEx7o7xlF6cL6bG65JVDoC9EH2K5JUfqhh1hx7IC1LK2YcOTMgmAeI3dbt7Z+CSd/alLqzlLyRODkO7ZzejngGQA==';
const PREFIX = 'VF1';
const PRODUCT_ID = 'viperfit-pro';
const STORAGE_KEY = PRODUCT_ID + '-license';

function b64ToBytes(b64) {
  const bin = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

let cachedKey = null;
async function publicKey() {
  if (!cachedKey) {
    cachedKey = await crypto.subtle.importKey(
      'spki', b64ToBytes(PUBLIC_KEY_SPKI_B64),
      { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  }
  return cachedKey;
}

async function verifyLicense(key) {
  try {
    const parts = (key || '').trim().split('.');
    if (parts.length !== 3 || parts[0] !== PREFIX) {
      return { ok: false, reason: `That doesn't look like a license key (it starts with ${PREFIX}.).` };
    }
    const payloadBytes = b64ToBytes(parts[1]);
    const sig = b64ToBytes(parts[2]);
    const valid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' }, await publicKey(), sig, payloadBytes);
    if (!valid) return { ok: false, reason: 'Invalid signature — check the key was copied completely.' };
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));
    if (payload.p !== PRODUCT_ID) return { ok: false, reason: 'This key is for a different product.' };
    return { ok: true, email: payload.e || '' };
  } catch {
    return { ok: false, reason: 'Could not read that key — check it was copied completely.' };
  }
}

async function loadStoredLicense() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const res = await verifyLicense(stored);
    return res.ok ? { key: stored, email: res.email } : null;
  } catch { return null; }
}

function storeLicense(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}
