"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, Plus,
  Trash2, Edit2, Pin, Search, Check, X,
  Menu, Square, Copy, RefreshCw, ThumbsUp, ThumbsDown,
  PanelLeftClose, PanelLeft,
  MoreVertical
} from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isToday, isYesterday, subDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Helper to group conversations
const groupConversations = (conversations: any[], searchQuery: string) => {
  const filtered = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinned = filtered.filter(c => c.isPinned);
  const unpinned = filtered.filter(c => !c.isPinned);

  const today = unpinned.filter(c => isToday(new Date(c.updated_at)));
  const yesterday = unpinned.filter(c => isYesterday(new Date(c.updated_at)));
  const previous7Days = unpinned.filter(c => {
    const date = new Date(c.updated_at);
    return !isToday(date) && !isYesterday(date) && date >= subDays(new Date(), 7);
  });
  const older = unpinned.filter(c => {
    return new Date(c.updated_at) < subDays(new Date(), 7);
  });

  return { pinned, today, yesterday, previous7Days, older };
};

export default function CatGPTPage() {
  const { 
    conversations, messages, activeConversationId, 
    createConversation, addMessage, setActiveConversation, 
    deleteConversation, renameConversation, pinConversation,
    generateTitle 
  } = useChatStore();

  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // UI States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = messages.filter(m => m.conversation_id === activeConversationId);

  const suggestedPrompts = [
    { title: "Analyze profile", text: "Evaluate my current MBA profile and suggest improvements" },
    { title: "CAT roadmap", text: "Generate a 6-month preparation roadmap for CAT 2024" },
    { title: "Recommend colleges", text: "Suggest top IIMs based on my target percentile" },
    { title: "Weekly study plan", text: "Create a detailed DILR and VARC study schedule" }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeMessages.length, streamingMessageId]);

  const handleNewChat = () => {
    const newId = crypto.randomUUID();
    createConversation(newId);
    if (window.innerWidth < 768) setIsMobileSidebarOpen(false);
  };

  const handleSend = async (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = promptOverride || input;
    if (!textToSend.trim() || isGenerating) return;

    let convId = activeConversationId;
    if (!convId) {
      convId = crypto.randomUUID();
      createConversation(convId);
    }

    const userMsgId = crypto.randomUUID();
    addMessage({
      id: userMsgId,
      conversation_id: convId,
      role: "user",
      content: textToSend,
      created_at: new Date().toISOString()
    });
    setInput("");
    setIsGenerating(true);

    const isFirstMessage = messages.filter(m => m.conversation_id === convId).length === 0;
    if (isFirstMessage) {
      generateTitle(convId, textToSend);
    }

    setTimeout(() => {
      const aiMsgId = crypto.randomUUID();
      const fullResponse = "I can certainly help you with that. When preparing for your MBA, it's crucial to follow a structured approach.\n\n### Core Strategy\n1. **Identify Weaknesses**: Take a diagnostic mock test first.\n2. **Conceptual Clarity**: Focus on fundamentals before speed.\n3. **Consistent Practice**: Aim for 2-3 hours of focused study daily.\n\nWould you like me to dive deeper into any specific section like Quants, DILR, or VARC?";
      
      let currentText = "";
      setStreamingMessageId(aiMsgId);
      
      addMessage({
        id: aiMsgId,
        conversation_id: convId!,
        role: "ai",
        content: "",
        created_at: new Date().toISOString()
      });

      const words = fullResponse.split(" ");
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < words.length) {
          currentText += (i === 0 ? "" : " ") + words[i];
          useChatStore.getState().updateMessage(aiMsgId, currentText);
          i++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          setStreamingMessageId(null);
        }
      }, 30);
    }, 400);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteConversation(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleRenameSubmit = (id: string) => {
    if (editTitle.trim()) {
      renameConversation(id, editTitle);
    }
    setEditingId(null);
  };

  const grouped = groupConversations(conversations, searchQuery);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background/40 backdrop-blur-xl w-[280px] flex-shrink-0 border-r border-border/50 relative z-10">
      <div className="p-4 space-y-4">
        <button 
          onClick={handleNewChat}
          className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground hover:opacity-90 rounded-2xl transition-all font-medium shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Chat
          </div>
          <Edit2 className="h-4 w-4 opacity-70" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 pb-6 hide-scrollbar">
        {conversations.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground mt-10 font-medium">
            No history yet
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([groupName, groupConversations]) => {
              if (groupConversations.length === 0) return null;
              
              let label = groupName;
              if (groupName === 'previous7Days') label = "Previous 7 Days";
              if (groupName === 'pinned') label = "Pinned";
              if (groupName === 'today') label = "Today";
              if (groupName === 'yesterday') label = "Yesterday";
              if (groupName === 'older') label = "Older";
              
              return (
                <div key={groupName}>
                  <div className="text-[11px] font-bold text-muted-foreground/70 mb-1.5 px-3 uppercase tracking-wider">
                    {label}
                  </div>
                  <div className="space-y-0.5">
                    {groupConversations.map(c => (
                      <div 
                        key={c.id}
                        className={`group relative flex items-center w-full px-3 py-2.5 text-sm rounded-xl cursor-pointer transition-colors ${activeConversationId === c.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/60 text-foreground/80'}`}
                        onClick={() => {
                          if (editingId !== c.id) {
                            setActiveConversation(c.id);
                            if (window.innerWidth < 768) setIsMobileSidebarOpen(false);
                          }
                        }}
                      >
                        {editingId === c.id ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input 
                              autoFocus
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(c.id)}
                              className="flex-1 bg-background border border-primary/50 rounded px-2 py-1 outline-none text-sm text-foreground"
                            />
                            <button onClick={(e) => { e.stopPropagation(); handleRenameSubmit(c.id); }} className="text-primary hover:text-primary/80">
                              <Check className="h-4 w-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="text-muted-foreground hover:text-foreground">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1 truncate pr-8">{c.title}</div>
                            
                            {/* Hover Actions */}
                            <div className="absolute right-2 hidden group-hover:flex items-center gap-0.5">
                              <div className="flex items-center gap-0.5 bg-background border border-border/50 shadow-sm rounded-lg p-0.5">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); pinConversation(c.id, !c.isPinned); }}
                                  className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                  title={c.isPinned ? "Unpin" : "Pin"}
                                >
                                  <Pin className={`h-3 w-3 ${c.isPinned ? 'fill-current text-primary' : ''}`} />
                                </button>
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setEditingId(c.id); 
                                    setEditTitle(c.title);
                                  }}
                                  className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                  title="Rename"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(c.id); }}
                                  className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    // Replaced absolute inset-0 with a contained embedded layout
    <div className="flex h-[calc(100vh-8rem)] w-full relative rounded-[32px] overflow-hidden bg-card/60 backdrop-blur-2xl shadow-xl border border-white/20 dark:border-white/10 mt-2">
      
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm rounded-[32px]"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <div className={`absolute md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${!isSidebarOpen ? 'md:hidden' : 'md:block'}`}>
        <SidebarContent />
      </div>

      {/* Center Conversation Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-card/40 backdrop-blur-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 z-20 border-b border-border/30 bg-background/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }} 
              className="btn-icon-glass text-foreground shadow-sm"
            >
              {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </button>
            <div className="font-semibold text-lg text-foreground flex items-center gap-2 tracking-tight">
              CATGPT <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Beta</span>
            </div>
          </div>
          <button className="btn-icon-glass text-muted-foreground shadow-sm">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-40 scroll-smooth hide-scrollbar relative">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {!activeConversationId || activeMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[55vh] space-y-12 animate-in fade-in duration-700 pt-8">
                <div className="text-center space-y-5">
                  <div className="h-20 w-20 mx-auto rounded-[24px] bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
                    <Bot className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">How can I help you today?</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(undefined, prompt.text)}
                      className="glass-metric-card text-left flex flex-col gap-2 group cursor-pointer"
                    >
                      <div className="font-medium text-foreground flex items-center justify-between">
                        {prompt.title}
                        <div className="btn-icon-glass w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Send className="h-3.5 w-3.5 text-foreground" />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {prompt.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 py-8 pb-20">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-5 w-full group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {msg.role === "ai" && (
                      <div className="h-9 w-9 shrink-0 rounded-[12px] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-sm mt-1 border border-white/10">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-4 rounded-3xl ${
                        msg.role === 'user' 
                          ? 'bg-foreground text-background rounded-tr-sm shadow-md' 
                          : 'bg-transparent text-foreground shadow-none px-2'
                      }`}>
                        {msg.role === 'ai' ? (
                          <div className="prose prose-base dark:prose-invert max-w-none text-foreground leading-relaxed font-medium">
                            {msg.content === "" && msg.id === streamingMessageId ? (
                              <div className="flex gap-1.5 items-center h-6">
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                              </div>
                            ) : (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            )}
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                        )}
                      </div>

                      {/* AI Message Actions */}
                      {msg.role === "ai" && msg.content !== "" && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity px-2 pt-1">
                          <button onClick={() => navigator.clipboard.writeText(msg.content)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" title="Copy">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleSend(undefined, activeMessages[activeMessages.length - 2]?.content)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" title="Regenerate">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" title="Helpful">
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" title="Not Helpful">
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Floating Bottom Prompt Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/90 to-transparent pt-12 pb-6 px-4 md:px-8 z-20 pointer-events-none">
          <div className="max-w-3xl mx-auto w-full relative pointer-events-auto">
            <div className="relative shadow-apple-soft rounded-[32px] bg-background/80 backdrop-blur-2xl border border-border/60 flex flex-col focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask CATGPT anything..."
                className="w-full min-h-[60px] max-h-[200px] resize-none bg-transparent px-6 py-5 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none rounded-[32px]"
                rows={1}
                style={{ overflowY: 'auto' }}
              />
              <div className="flex justify-between items-center px-3 pb-3 pt-1">
                <div className="flex gap-2 px-2">
                  <button className="text-muted-foreground hover:text-foreground rounded-full h-8 w-8 flex items-center justify-center transition-colors hover:bg-muted/50">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {isGenerating ? (
                  <button
                    onClick={() => {
                      setIsGenerating(false);
                      setStreamingMessageId(null);
                    }}
                    className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity mr-1"
                  >
                    <Square className="h-4 w-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground mr-1 shadow-sm"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mt-4 text-xs font-medium text-muted-foreground/80">
              CATGPT can make mistakes. Verify important information.
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-md border-border bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Delete chat?</DialogTitle>
            <DialogDescription>
              This will permanently delete this conversation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} className="rounded-xl">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
