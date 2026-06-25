"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, Plus,
  Trash2, Edit2, Pin, Search, Check, X,
  Menu, Square, Copy, RefreshCw, ThumbsUp, ThumbsDown,
  PanelLeftClose, PanelLeft,
  MoreVertical, Sparkles
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
    { title: "Analyze profile", text: "Evaluate my current MBA profile and suggest improvements", icon: <Sparkles className="w-4 h-4 text-orange-500" /> },
    { title: "CAT roadmap", text: "Generate a 6-month preparation roadmap for CAT 2024", icon: <Bot className="w-4 h-4 text-blue-500" /> },
    { title: "Recommend colleges", text: "Suggest top IIMs based on my target percentile", icon: <Sparkles className="w-4 h-4 text-pink-500" /> },
    { title: "Weekly study plan", text: "Create a detailed DILR and VARC study schedule", icon: <Bot className="w-4 h-4 text-purple-500" /> }
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
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl w-[280px] flex-shrink-0 border-r border-slate-200 shadow-sm relative z-10">
      <div className="p-4 space-y-4">
        <button 
          onClick={handleNewChat}
          className="w-full flex items-center justify-between px-4 py-3 btn-primary-gradient rounded-xl shadow-md"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Chat
          </div>
          <Edit2 className="h-4 w-4 opacity-70" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            placeholder="Search chats..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-slate-700 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 pb-6 hide-scrollbar">
        {conversations.length === 0 ? (
          <div className="text-center text-sm text-slate-400 mt-10 font-medium">
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
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5 px-3 uppercase tracking-wider">
                    {label}
                  </div>
                  <div className="space-y-0.5">
                    {groupConversations.map(c => (
                      <div 
                        key={c.id}
                        className={`group relative flex items-center w-full px-3 py-2.5 text-sm rounded-xl cursor-pointer transition-colors ${activeConversationId === c.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}
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
                              className="flex-1 bg-white border border-blue-200 rounded px-2 py-1 outline-none text-sm text-slate-700 shadow-sm"
                            />
                            <button onClick={(e) => { e.stopPropagation(); handleRenameSubmit(c.id); }} className="text-blue-600 hover:text-blue-800">
                              <Check className="h-4 w-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="text-slate-400 hover:text-slate-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1 truncate pr-8">{c.title}</div>
                            
                            {/* Hover Actions */}
                            <div className="absolute right-2 hidden group-hover:flex items-center gap-0.5">
                              <div className="flex items-center gap-0.5 bg-white border border-slate-200 shadow-sm rounded-lg p-0.5">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); pinConversation(c.id, !c.isPinned); }}
                                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title={c.isPinned ? "Unpin" : "Pin"}
                                >
                                  <Pin className={`h-3 w-3 ${c.isPinned ? 'fill-current text-blue-600' : ''}`} />
                                </button>
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setEditingId(c.id); 
                                    setEditTitle(c.title);
                                  }}
                                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                  title="Rename"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(c.id); }}
                                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
    <div className="flex h-[calc(100vh-8rem)] w-full relative rounded-[32px] overflow-hidden bg-[#F8FAFC] shadow-apple-soft border border-slate-200/60 mt-2">
      
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/10 z-40 md:hidden backdrop-blur-sm rounded-[32px]"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <div className={`absolute md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${!isSidebarOpen ? 'md:hidden' : 'md:block'}`}>
        <SidebarContent />
      </div>

      {/* Center Conversation Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-[#F8FAFC]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 z-20 border-b border-slate-200/60 bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }} 
              className="btn-icon-glass text-slate-700 shadow-sm"
            >
              {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </button>
            <div className="font-semibold text-lg text-slate-800 flex items-center gap-2 tracking-tight">
              CATGPT <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest border border-blue-200">Beta</span>
            </div>
          </div>
          <button className="btn-icon-glass text-slate-500 shadow-sm">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-40 scroll-smooth hide-scrollbar relative liquid-bg">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {!activeConversationId || activeMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in fade-in duration-700 pt-8">
                <div className="text-center space-y-4">
                  <div className="h-24 w-24 mx-auto rounded-[28px] bg-white flex items-center justify-center shadow-apple-soft border border-slate-100 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-premium-gradient opacity-10" />
                    <Bot className="h-12 w-12 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-800">How can I help you today?</h2>
                  <p className="text-slate-500 max-w-md mx-auto">Get insights into your profile, practice questions, or ask for a study plan.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(undefined, prompt.text)}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-left flex flex-col gap-3 p-5 rounded-2xl group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {prompt.icon}
                          {prompt.title}
                        </div>
                        <div className="btn-icon-glass w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Send className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {prompt.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 py-8 pb-20">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 w-full group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {msg.role === "ai" && (
                      <div className="h-10 w-10 shrink-0 rounded-[14px] bg-white flex items-center justify-center shadow-sm border border-slate-200 mt-1">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                    )}

                    <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-4 rounded-[24px] ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-[8px] shadow-md' 
                          : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-[8px]'
                      }`}>
                        {msg.role === 'ai' ? (
                          <div className="prose prose-base max-w-none text-slate-700 leading-relaxed font-medium prose-p:my-2 prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-blue-600">
                            {msg.content === "" && msg.id === streamingMessageId ? (
                              <div className="flex gap-1.5 items-center h-6">
                                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
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
                          <button onClick={() => navigator.clipboard.writeText(msg.content)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Copy">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleSend(undefined, activeMessages[activeMessages.length - 2]?.content)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Regenerate">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Helpful">
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Not Helpful">
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pt-12 pb-6 px-4 md:px-8 z-20 pointer-events-none">
          <div className="max-w-3xl mx-auto w-full relative pointer-events-auto">
            <div className="relative shadow-apple-soft rounded-[28px] bg-white border border-slate-200 flex flex-col focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300">
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
                className="w-full min-h-[64px] max-h-[200px] resize-none bg-transparent px-6 py-5 text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none rounded-[28px]"
                rows={1}
                style={{ overflowY: 'auto' }}
              />
              <div className="flex justify-between items-center px-3 pb-3 pt-1">
                <div className="flex gap-2 px-2">
                  <button className="text-slate-400 hover:text-blue-600 rounded-full h-8 w-8 flex items-center justify-center transition-colors hover:bg-blue-50">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {isGenerating ? (
                  <button
                    onClick={() => {
                      setIsGenerating(false);
                      setStreamingMessageId(null);
                    }}
                    className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors mr-1"
                  >
                    <Square className="h-4 w-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-full btn-primary-gradient text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 mr-1 shadow-md"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mt-4 text-xs font-medium text-slate-400">
              CATGPT can make mistakes. Verify important information.
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-md border-slate-200 bg-white text-slate-900 rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete chat?</DialogTitle>
            <DialogDescription className="text-slate-500">
              This will permanently delete this conversation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700">Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} className="rounded-xl bg-red-600 hover:bg-red-700 text-white">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
