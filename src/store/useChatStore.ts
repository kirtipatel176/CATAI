import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "ai";
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  isPinned?: boolean;
}

interface ChatState {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  
  createConversation: (id: string, userId?: string) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, content: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  pinConversation: (id: string, isPinned: boolean) => void;
  setActiveConversation: (id: string | null) => void;
  generateTitle: (conversationId: string, firstMessage: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: [],
      activeConversationId: null,

      createConversation: (id, userId = "user-1") => {
        const now = new Date().toISOString();
        const newConv: Conversation = {
          id,
          user_id: userId,
          title: "New Chat",
          created_at: now,
          updated_at: now,
          isPinned: false,
        };
        set((state) => ({
          conversations: [newConv, ...state.conversations],
          activeConversationId: id,
        }));
      },

      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
          conversations: state.conversations.map((c) =>
            c.id === message.conversation_id
              ? { ...c, updated_at: new Date().toISOString() }
              : c
          ),
        }));
      },

      updateMessage: (id, content) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, content } : m
          ),
        }));
      },

      deleteConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          messages: state.messages.filter((m) => m.conversation_id !== id),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        }));
      },

      renameConversation: (id, newTitle) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title: newTitle, updated_at: new Date().toISOString() } : c
          ),
        }));
      },

      pinConversation: (id, isPinned) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, isPinned, updated_at: new Date().toISOString() } : c
          ),
        }));
      },

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },

      generateTitle: (conversationId, firstMessage) => {
        // Simple logic to generate title from first message
        const words = firstMessage.trim().split(" ");
        let title = words.slice(0, 5).join(" ");
        if (words.length > 5) title += "...";
        // Title-case it roughly
        title = title.charAt(0).toUpperCase() + title.slice(1);
        
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId ? { ...c, title } : c
          ),
        }));
      },
    }),
    {
      name: "catgpt-storage",
    }
  )
);
