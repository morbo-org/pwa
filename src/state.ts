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
  feeds = new Feeds();
  apiUrl = ref("");

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
