import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showNameForm, setShowNameForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate session ID
    const session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(session);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionId && isOpen && !showNameForm) {
      loadMessages();
    }
  }, [sessionId, isOpen, showNameForm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      const response = await axios.get(`${API}/chat/messages/${sessionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const messageData = {
        message: newMessage,
        user_name: userName || 'Visiteur',
        user_email: userEmail || null,
        session_id: sessionId
      };

      const response = await axios.post(`${API}/chat/message`, messageData);
      
      // Add message to local state
      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
      
      // Reload messages to get any auto-responses
      setTimeout(() => {
        loadMessages();
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = () => {
    if (!userName.trim()) return;
    setShowNameForm(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-12 -left-20 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
          💬 Besoin d'aide ?
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <h3 className="font-semibold">Support CASHTOK</h3>
            <p className="text-xs opacity-90">En ligne maintenant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex flex-col h-80">
          {showNameForm ? (
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="text-center mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Bonjour ! 👋</h4>
                <p className="text-gray-600 text-sm">
                  Comment souhaitez-vous qu'on vous appelle ?
                </p>
              </div>
              
              <div className="space-y-3">
                <Input
                  placeholder="Votre prénom"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartChat()}
                />
                <Input
                  placeholder="Email (optionnel)"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  onClick={handleStartChat}
                  className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  disabled={!userName.trim()}
                >
                  Commencer la conversation
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Tapez votre message ci-dessous
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.is_admin 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-gradient-to-r from-pink-500 to-blue-500 text-white'
                    }`}>
                      <div className="font-medium text-xs mb-1 opacity-75">
                        {message.user_name}
                      </div>
                      <div>{message.message}</div>
                      <div className="text-xs opacity-75 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;