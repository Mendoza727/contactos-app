import { Contact } from "../models/contact.model";
import { Storage } from "@/storage/asyncStorage";
import initialData from "@/data/contacts.json";

const STORAGE_KEY = "contacts";

export const ContactsServices = {
  /**
   * Obtiene la colección completa de contactos desde el storage persistente.
   *
   * Flujo:
   * 1. Intenta recuperar los datos asociados a STORAGE_KEY.
   * 2. Si existen registros persistidos, los retorna directamente.
   * 3. Si no existen (primer arranque o storage vacío),
   *    inicializa el storage con un dataset base (initialData)
   *    y retorna dicho dataset.
   *
   * @returns Promise<Contact[]> Lista completa de contactos.
   */
  async getAll(): Promise<Contact[]> {
    const stored = await Storage.get<Contact[]>(STORAGE_KEY);

    // Caso 1: existen datos persistidos → se retornan sin modificación
    if (stored) return stored;

    // Caso 2: storage vacío → se inicializa con datos base
    await Storage.set(STORAGE_KEY, initialData);

    // Se retorna el dataset inicial garantizando el tipo esperado
    return initialData as Contact[];
  },

  /**
   * Persiste la colección completa de contactos en el storage.
   *
   * Sobrescribe el estado actual almacenado bajo STORAGE_KEY
   * con el nuevo arreglo recibido.
   *
   * @param contacts Lista completa de contactos a persistir.
   */
  async saveAll(contacts: Contact[]) {
    await Storage.set(STORAGE_KEY, contacts);
  },

  /**
   * Agrega un nuevo contacto a la colección existente.
   *
   * Flujo:
   * 1. Obtiene el estado actual desde storage.
   * 2. Genera una nueva colección inmutable agregando el nuevo contacto.
   * 3. Persiste la colección actualizada.
   *
   * @param contact Contacto a agregar.
   * @returns Promise<Contact[]> Colección actualizada.
   */
  async add(contact: Contact) {
    const contacts = await this.getAll();

    // Se crea un nuevo arreglo para mantener inmutabilidad
    const updated = [...contacts, contact];

    await this.saveAll(updated);

    return updated;
  },

  /**
   * Actualiza un contacto existente identificado por su id.
   *
   * Flujo:
   * 1. Recupera la colección actual.
   * 2. Reemplaza el elemento cuyo id coincida.
   * 3. Persiste la nueva colección.
   *
   * Nota: Si no existe coincidencia por id,
   * la colección se mantiene sin cambios.
   *
   * @param updatedContact Contacto con la información actualizada.
   * @returns Promise<Contact[]> Colección resultante.
   */
  async update(updatedContact: Contact) {
    const contacts = await this.getAll();

    // Se utiliza map para mantener el patrón inmutable
    const updated = contacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c,
    );

    await this.saveAll(updated);

    return updated;
  },

  /**
   * Elimina un contacto de la colección a partir de su identificador.
   *
   * Flujo:
   * 1. Recupera la colección actual desde storage.
   * 2. Genera una nueva colección excluyendo el contacto cuyo id coincida.
   * 3. Persiste la colección resultante.
   *
   * Nota:
   * - Si el id no existe, la colección se mantiene sin cambios.
   * - Se utiliza filter para mantener inmutabilidad del arreglo.
   *
   * @param id Identificador único del contacto a eliminar.
   * @returns Promise<Contact[]> Colección actualizada.
   */
  async delete(id: string) {
    const contacts = await this.getAll();

    // Se crea una nueva colección excluyendo el id indicado
    const updated = contacts.filter((c) => c.id !== id);

    await this.saveAll(updated);

    return updated;
  },
};
