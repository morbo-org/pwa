import React, { createContext, useContext, useReducer } from "react";

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

type Feeds = Feed[];

type FeedsAction =
  | { type: "add"; label: Feed["label"] }
  | { type: "delete"; id: Feed["id"] };

function feedsReducer(feeds: Feeds, action: FeedsAction): Feeds {
  switch (action.type) {
    case "add": {
      return [...feeds, new Feed(
        action.label,
        Math.random() < 0.5 ? "feed" : "directory",
        Math.floor(Math.random() * 121),
      )];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export type FeedsDispatch = React.Dispatch<FeedsAction>;

const FeedsContext = createContext<Feeds | null>(null);
const FeedsDispatchContext = createContext<FeedsDispatch | null>(null);

export function useFeeds() {
  return useContext(FeedsContext)!;
}

export function useFeedsDispatch() {
  return useContext(FeedsDispatchContext)!;
}

interface FeedsProviderProps {
  children: React.ReactElement[];
}

export function FeedsProvider({ children }: FeedsProviderProps) {
  const [feeds, dispatch] = useReducer(feedsReducer, []);

  return (
    <FeedsContext.Provider value={feeds}>
      <FeedsDispatchContext.Provider value={dispatch}>
        {children}
      </FeedsDispatchContext.Provider>
    </FeedsContext.Provider>
  );
}
