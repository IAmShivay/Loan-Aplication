import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Badge, Paper, Typography, TextField } from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon, Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';

interface ChatComponentProps {
  applicationId: string | number;
  applicantName: string;
}

interface Message {
  text: string;
  sender: 'admin' | 'user';
  file?: File;
}

const ChatComponent: React.FC<ChatComponentProps> = ({  applicantName }) => {
  // applicationId,
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpen = (): void => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleSend = (): void => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'admin' }]);
      setNewMessage('');
      // Here you would typically send the message to your backend
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([...messages, { text: `File: ${file.name}`, sender: 'admin', file }]);
      // Here you would typically upload the file to your backend
    }
  };

  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#4CAF50',
          color: 'white',
          '&:hover': { backgroundColor: '#45a049' },
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <ChatIcon />
        </Badge>
      </IconButton>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ backgroundColor: '#4CAF50', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Chat with {applicantName}</Typography>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start', mb: 1 }}>
                <Paper sx={{ p: 1, backgroundColor: msg.sender === 'admin' ? '#E8F5E9' : '#FFFFFF' }}>
                  <Typography variant="body2">
                    {msg.file ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachFileIcon sx={{ mr: 1 }} />
                        {msg.text}
                      </Box>
                    ) : (
                      msg.text
                    )}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          <Box sx={{ p: 2, backgroundColor: '#F5F5F5', display: 'flex' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSend()}
              sx={{ mr: 1 }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <IconButton onClick={triggerFileInput} sx={{ mr: 1, backgroundColor: '#4CAF50', color: 'white', '&:hover': { backgroundColor: '#45a049' } }}>
              <AttachFileIcon />
            </IconButton>
            <IconButton onClick={handleSend} sx={{ backgroundColor: '#4CAF50', color: 'white', '&:hover': { backgroundColor: '#45a049' } }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatComponent;