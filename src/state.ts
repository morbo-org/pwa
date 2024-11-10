import { shallowReactive } from "vue";

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

  add() {
    this.value = [...this.value, new Feed(
      "Label",
      Math.random() < 0.5 ? "feed" : "directory",
      Math.floor(Math.random() * 121),
    )];
  }
}

class State {
  feeds = new Feeds();
}

export const state = new State();
