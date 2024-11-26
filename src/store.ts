/**
 * Copyright (C) 2024 Pavel Sobolev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ref, watch } from "vue";

import { state } from "@/state";

class Database {
  dbName = "morbo";
  version = 2;
  stores = ["auth", "state"];

  async open() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        for (const store of this.stores) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        }
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(new Error(request.error?.message ?? `[IndexedDB] Failed to open a connection`));
      };
    });
  }
}

const database = new Database();

class AuthStore {
  storeName = "auth";
  sessionTokenKey = "sessionToken";

  async checkLoginStatus() {
    try {
      const sessionToken = await this.getSessionToken();
      state.isLoggedIn.value = !!sessionToken;
    } catch (error) {
      console.error(error);
      state.isLoggedIn.value = false;
    }
  }

  async putSessionToken(sessionToken: string) {
    const db = await database.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(sessionToken, this.sessionTokenKey);

      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(new Error(
          request.error?.message ?? `[IndexedDB] [${this.storeName}] Failed to put the session token`,
        ));
      };
    });
  }

  async getSessionToken() {
    const db = await database.open();
    return new Promise<string>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(this.sessionTokenKey);

      request.onsuccess = () => {
        const value: unknown = request.result;
        if (value !== undefined && typeof value === "string") {
          resolve(value);
        } else {
          resolve("");
        }
      };
      request.onerror = () => {
        reject(new Error(
          request.error?.message ?? `[IndexedDB] [${this.storeName}] Failed to get the session token`,
        ));
      };
    });
  }

  async deleteSessionToken() {
    const db = await database.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(this.sessionTokenKey);

      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(new Error(
          request.error?.message ?? `[IndexedDB] [${this.storeName}] Failed to delete the session token`,
        ));
      };
    });
  }
}

class StateStore {
  storeName = "state";
  readyPromise = this.init();
  ready = ref(false);

  async init() {
    await this.loadState();
    this.setupWatchers();
  };

  private async loadState() {
    const db = await database.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);

      let pending = 0;

      for (const [ref, property] of state) {
        pending++;

        const request = store.get(property);
        request.onsuccess = () => {
          const value: unknown = request.result;
          if (value !== undefined && typeof value === typeof ref.value) {
            ref.value = value;
          } else {
            void this.putState(ref.value, property);
          }

          pending--;
          if (pending === 0) {
            resolve();
            this.ready.value = true;
          }
        };
        request.onerror = () => {
          reject(new Error(request.error?.message ?? `[IndexedDB] [${this.storeName}] Failed to get state`));
        };
      }
    });
  }

  private setupWatchers() {
    for (const [ref, property] of state) {
      watch(ref, () => {
        void this.putState(ref.value, property);
      });
    }
  }

  private async putState(value: unknown, property: string) {
    const db = await database.open();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(value, property);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(new Error(request.error?.message ?? `[IndexedDB] [${this.storeName}] Failed to put state`));
      };
    });
  }
}

export const authStore = new AuthStore();
export const stateStore = new StateStore();
