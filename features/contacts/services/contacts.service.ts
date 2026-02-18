import { Contact } from "../models/contact.model";
import { Storage } from "@/storage/asyncStorage";
import initialData from "@/data/contacts.json";

const STORAGE_KEY = "contacts";

async function getAll(): Promise<Contact[]> {
  console.log("📦 getAll() llamado");

  const stored = await Storage.get<Contact[]>(STORAGE_KEY);

  if (stored) {
    console.log("📦 getAll() → datos existentes:", stored.length);
    return stored;
  }

  console.log("📦 getAll() → inicializando con initialData");

  await Storage.set(STORAGE_KEY, initialData);

  return initialData as Contact[];
}

async function saveAll(contacts: Contact[]) {
  console.log("💾 saveAll() → guardando total:", contacts.length);
  await Storage.set(STORAGE_KEY, contacts);
}

async function add(contact: Contact) {
  console.log("➕ add() → contacto recibido:", contact);

  const contacts = await getAll();
  console.log("➕ add() → contactos actuales:", contacts.length);

  const updated = [contact, ...contacts];

  await saveAll(updated);

  console.log("✅ add() → contactos después de guardar:", updated.length);

  return updated;
}

async function update(updatedContact: Contact) {
  console.log("✏️ update() → contacto recibido:", updatedContact);

  const contacts = await getAll();

  const updated = contacts.map((c) =>
    c.id === updatedContact.id ? updatedContact : c,
  );

  await saveAll(updated);

  console.log("✅ update() → contactos actualizados:", updated.length);

  return updated;
}

async function remove(id: string) {
  console.log("🗑 delete() → id:", id);

  const contacts = await getAll();

  const updated = contacts.filter((c) => c.id !== id);

  await saveAll(updated);

  console.log("✅ delete() → contactos restantes:", updated.length);

  return updated;
}

export const ContactsServices = {
  getAll,
  add,
  update,
  delete: remove,
};