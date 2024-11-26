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

import { ref, shallowReactive } from "vue";

type FeedItemType = "directory" | "feed";

export class Feed {
  id = crypto.randomUUID();
  label: string;
  type: FeedItemType;
  counter: number;

  constructor(label: Feed["label"], type: Feed["type"], counter: Feed["counter"]) {
    this.label = label;
    this.type = type;
    this.counter = counter;
  }
}

class Feeds {
  value: Feed[] = [];

  constructor() {
    return shallowReactive(this);
  }

  add(label: string, type: FeedItemType, counter: number) {
    this.value = [...this.value, new Feed(label, type, counter)];
  }
}

class State {
  apiUrl = ref("");
  username = ref("");
  isLoggedIn = ref(false);

  feeds = new Feeds();

  * [Symbol.iterator]() {
    for (const property in this) {
      const ref = this[property as keyof this];
      if (ref && typeof ref === "object" && "value" in ref) {
        yield [ref, property] as const;
      }
    }
  }
}

export const state = new State();
