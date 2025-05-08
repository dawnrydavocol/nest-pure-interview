'use client';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../context/pure-interview/agent';
import { Input } from '~/app/components/ui/input';
import { Button } from '~/app/components/ui/button';

const Form: React.FC = () => {
  const { agents, fetchNotes, createAgent } = useApi();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateNote = () => {
    createAgent({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobileNumber: form.mobileNumber,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 min-w-[320px]">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={handleChange}
        />
        <Button
          className="bg-blue-600 text-white p-2 rounded-md mt-2 cursor-pointer"
          onClick={handleCreateNote}
        >
          Submit
        </Button>
        <div>
          {agents.map((agent, index) => (
            <div key={index} className="p-2 border rounded-md mb-1 overflow-scroll">
              <p>{`ID: ${agent.id}`}</p>
              <h3>{`${agent.firstName} ${agent.lastName}`}</h3>
              <p>{`Email: ${agent.email}`}</p>
              <p>{`Mobile: ${agent.mobileNumber}`}</p>
              <p>{`Updated At: ${agent.updatedAt}`}</p>{' '}
              <p>{`Created At: ${agent.createdAt}`}</p>{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
