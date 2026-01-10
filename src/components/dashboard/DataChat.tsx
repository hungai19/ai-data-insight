"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, MessageSquare, Trash2, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { chatWithData } from "@/app/actions/gemini";
import { useData } from "@/context/DataContext";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "model";
    content: string;
}

export default function DataChat() {
    const { data, activeSheet, fileName } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        // Prepare context
        const headers = data.length > 0 ? Object.keys(data[0]) : [];
        const sampleSize = 15;
        const sampleData = data.slice(0, sampleSize);

        const context = `
            File: ${fileName || "Chưa có tên"}
            Sheet: ${activeSheet || "Chưa chọn sheet"}
            Tổng số dòng: ${data.length}
            Danh sách cột: ${headers.join(", ")}
            Dữ liệu mẫu (${sampleSize} dòng đầu):
            ${JSON.stringify(sampleData, null, 2)}
        `;

        // Prepare history for API
        const apiHistory = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        try {
            const response = await chatWithData(userMessage, context, apiHistory);
            setMessages((prev) => [...prev, { role: "model", content: response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [...prev, { role: "model", content: "Đã có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    // Clear chat when data changes significantly
    useEffect(() => {
        if (!activeSheet) {
            setMessages([]);
        }
    }, [activeSheet]);

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-blue-500 active:scale-95"
                    title="Trò chuyện với dữ liệu"
                >
                    <MessageSquare size={24} />
                    {messages.length > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                            {messages.length}
                        </span>
                    )}
                </button>
            )}

            {/* Chat Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-zinc-950 sm:w-96 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold dark:text-white">Data AI Assistant</h3>
                            <p className="text-[10px] text-zinc-500">Đang phân tích: {activeSheet || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={clearChat}
                            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-900"
                            title="Xóa lịch sử"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div
                    ref={scrollRef}
                    className="flex h-[calc(100vh-140px)] flex-col gap-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
                >
                    {messages.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
                            <Bot size={48} className="mb-4" />
                            <p className="text-sm">Hãy đặt các câu hỏi như:<br />"Tổng doanh thu là bao nhiêu?"<br />"So sánh A và B?"</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`flex max-w-[85%] gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <div
                                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${msg.role === "user" ? "bg-zinc-200 dark:bg-zinc-800" : "bg-blue-600 text-white"
                                        }`}
                                >
                                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div
                                    className={`rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                                        }`}
                                >
                                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
                                        <ReactMarkdown
                                            components={{
                                                table: ({ ...props }) => <div className="overflow-x-auto my-2"><table className="border-collapse border border-zinc-300 dark:border-zinc-700 w-full text-xs" {...props} /></div>,
                                                th: ({ ...props }) => <th className="border border-zinc-300 dark:border-zinc-700 p-1 bg-zinc-200 dark:bg-zinc-800" {...props} />,
                                                td: ({ ...props }) => <td className="border border-zinc-300 dark:border-zinc-700 p-1" {...props} />,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-2">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <Bot size={14} />
                                </div>
                                <div className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-900">
                                    <Loader2 size={16} className="animate-spin text-blue-600" />
                                    <span className="text-xs text-zinc-500">AI đang suy nghĩ...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 w-full border-t bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Hỏi về dữ liệu của bạn..."
                            disabled={isLoading || !data.length}
                            className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-blue-600 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || !data.length}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:bg-zinc-300 dark:disabled:bg-zinc-800"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
