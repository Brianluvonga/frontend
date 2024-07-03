import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiArchive, FiAlertCircle, FiSearch, FiBarChart2, FiMessageSquare } from 'react-icons/fi';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('inbox');
    const [activityLogs, setActivityLogs] = useState([]);
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        fetchMessages();
        fetchUnreadCount();
        fetchMetrics();
        fetchActivityLogs();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/messages/api/');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/unread_count/');
            setUnreadCount(response.data.unread_count);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    const fetchMetrics = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/messages/api/metrics/');
            setMetrics(response.data);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    // Add this function
    const fetchActivityLogs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/messages/api/activity_logs/');
            setActivityLogs(response.data);
        } catch (error) {
            console.error('Error fetching activity logs:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/messages/api/${id}/mark_as_read/`);
            fetchMessages();
            fetchUnreadCount();
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const handleEscalate = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/messages/api/${id}/escalate/`, { escalated_to: 1 });
            fetchMessages();
        } catch (error) {
            console.error('Error escalating message:', error);
        }
    };

    const handleArchive = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/messages/api/${id}/archive/`);
            fetchMessages();
        } catch (error) {
            console.error('Error archiving message:', error);
        }
    };

    const filteredMessages = messages.filter(message =>
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const Sidebar = () => (
        <div className="w-1/4 bg-gray-100 p-4">
            <button onClick={() => setView('inbox')} className="block w-full text-left py-2 px-4 hover:bg-gray-200">
                Inbox ({unreadCount})
            </button>
            <button onClick={() => setView('escalations')} className="block w-full text-left py-2 px-4 hover:bg-gray-200">
                Escalations
            </button>
            <button onClick={() => setView('activity')} className="block w-full text-left py-2 px-4 hover:bg-gray-200">
                Activity Log
            </button>
            <button onClick={() => setView('metrics')} className="block w-full text-left py-2 px-4 hover:bg-gray-200">
                Metrics
            </button>
        </div>
    );

    const Inbox = () => {
        // Sort messages from latest to oldest
        const sortedMessages = [...filteredMessages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return (
            <div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                {sortedMessages.map((message) => (
                    <div key={message.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h3 className="text font-semibold">{message.subject}</h3>
                        <p className="text-gray-600 mb-2">{message.body.substring(0, 100)}...</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-gray-500">From: {message.sender}</p>
                                <p className="text-xs text-gray-500">Status: {message.status}</p>
                                <p className="text-xs text-gray-500">Priority: {message.priority}</p>
                            </div>
                            <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="mt-2">
                            <button
                                onClick={() => setSelectedMessage(message)}
                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
                            >
                                <FiMessageSquare className="inline-block mr-1" /> Conversation
                            </button>
                            {message.status === 'NEW' && (
                                <button
                                    onClick={() => handleMarkAsRead(message.id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 text-sm"
                                >
                                    <FiMail className="inline-block mr-1" /> Mark as Read
                                </button>
                            )}
                            <button
                                onClick={() => handleEscalate(message.id)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 text-sm"
                            >
                                <FiAlertCircle className="inline-block mr-1" /> Escalate
                            </button>
                            <button
                                onClick={() => handleArchive(message.id)}
                                className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                            >
                                <FiArchive className="inline-block mr-1" /> Archive
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const ConversationView = () => (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">{selectedMessage.subject}</h3>
            <p className="text-gray-600 mb-4">{selectedMessage.body}</p>
            <p className="text-sm text-gray-500">From: {selectedMessage.sender}</p>
            <p className="text-sm text-gray-500">Status: {selectedMessage.status}</p>
            <button onClick={() => setSelectedMessage(null)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Back to Inbox
            </button>
        </div>
    );

    const ActivityLog = ({ logs }) => (
        <div>
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <div className="space-y-4">
                {logs.map((log) => (
                    <div key={log.id} className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">{log.user}</span>
                            <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700">{log.action}</p>
                        {log.message && (
                            <div className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold">Message:</span> {log.message}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const Escalations = ({ messages }) => {
        const escalatedMessages = messages.filter(message => message.status === 'ESCALATED');

        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Escalations</h2>
                <div className="space-y-4">
                    {escalatedMessages.map((message) => (
                        <div key={message.id} className="bg-white shadow-md rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{message.subject}</span>
                                <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{message.body.substring(0, 100)}...</p>
                            <div className="flex justify-between items-center text-sm">
                                <span>From: {message.sender}</span>
                                <span>Escalated to: {message.escalated_to}</span>
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={() => setSelectedMessage(message)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
                                >
                                    <FiMessageSquare className="inline-block mr-1" /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const Metrics = () => (
        <div>
            <h2 className="text-xl font-semibold mb-4">Metrics</h2>
            <p>Total Messages: {metrics.total_messages}</p>
            <p>Unread Messages: {metrics.unread_messages}</p>
            <p>Escalated Messages: {metrics.escalated_messages}</p>
            {/* Add more metrics as needed */}
        </div>
    );

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                {view === 'inbox' && !selectedMessage && <Inbox />}
                {view === 'inbox' && selectedMessage && <ConversationView />}
                {view === 'activity' && <ActivityLog logs={activityLogs} />}
                {view === 'escalations' && <Escalations messages={messages} />}
                {view === 'metrics' && <Metrics />}
            </div>
        </div>
    );
};

export default Messages;