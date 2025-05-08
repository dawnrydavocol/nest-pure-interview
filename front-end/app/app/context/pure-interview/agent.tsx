import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../../api/base-api'; // Ensure this points to your base API file

// Define types for Notes and Agents
interface Note {
  id?: string;
  agentID: string;
  propertyId: string;
  content: string;
}

interface Agent {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the context value type
interface ApiContextType {
  notes: Note[];
  agents: Agent[];
  fetchNotes: () => Promise<void>;
  fetchAgents: () => Promise<void>;
  createNote: (note: Note) => Promise<void>;
  updateNote: (id: string, note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  createAgent: (agent: Agent) => Promise<void>;
  updateAgent: (id: string, agent: Agent) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider component
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Fetch all agents
  const fetchAgents = async () => {
    try {
      const response = await api.get('/agent');
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  // Create a note
  const createNote = async (note: Note) => {
    try {
      await api.post('/notes', note);
      await fetchNotes(); // Refresh notes
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Update a note
  const updateNote = async (id: string, note: Note) => {
    try {
      await api.put(`/notes/${id}`, note);
      await fetchNotes(); // Refresh notes
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      await fetchNotes(); // Refresh notes
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Create an agent
  const createAgent = async (agent: Agent) => {
    console.log('Creating agent:', agent);
    try {
      await api.post('/agent', agent);
      await fetchAgents(); // Refresh agents
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  const updateAgent = async (id: string, agent: Agent) => {
    try {
      await api.put(`/agent/${id}`, agent);
      await fetchAgents(); // Refresh agents
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  // Delete an agent
  const deleteAgent = async (id: string) => {
    try {
      await api.delete(`/agent/${id}`);
      await fetchAgents(); // Refresh agents
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  useEffect(() => {
      fetchAgents();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        notes,
        agents,
        fetchNotes,
        fetchAgents,
        createNote,
        updateNote,
        deleteNote,
        createAgent,
        updateAgent,
        deleteAgent,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the ApiContext
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
