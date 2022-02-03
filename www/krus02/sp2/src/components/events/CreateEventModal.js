import { useState } from "react";
import ModalDialog from "../ModalDialog";
import { useAuth } from "../../hook/AuthContext";

const CreateEventModal = ({ isOpen, closeModal, reloadEvents }) => {
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { gapiInstance } = useAuth();

  const submitEvent = (e) => {
    e.preventDefault();

    const startDate = {
      date: start,
    };
    const endDate = {
      date: end,
    };

    const event = {
      summary: summary,
      location: location,
      description: description,
      start: startDate,
      end: endDate,
    };
    const req = gapiInstance.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    req.execute(() => {
      closeModal();
      reloadEvents(true);
    });
  };

  const handleSummary = (e) => {
    setSummary(e.currentTarget.value);
  };

  const handleLocation = (e) => {
    setLocation(e.currentTarget.value);
  };

  const handleDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const handleStart = (e) => {
    setStart(e.target.value);
    console.log(e);
  };

  const handleEnd = (e) => {
    setEnd(e.target.value);
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      closeModal={closeModal}
      title="Create a new event"
    >
      <form onSubmit={submitEvent} className="flex flex-col space-y-2">
        <input
          type="text"
          onChange={handleSummary}
          placeholder="Summary"
          className="p-3 border border-gray-500 rounded-md"
          required
        />
        <input
          type="text"
          onChange={handleLocation}
          placeholder="Location"
          className="p-3 border border-gray-500 rounded-md"
        />
        <textarea
          onChange={handleDescription}
          placeholder="Description"
          className="p-3 border border-gray-500 rounded-md"
        />
        <span>Start date</span>
        <div className="space-x-4">
          <input
            type="date"
            onChange={handleStart}
            placeholder={new Date()}
            className="p-3 border border-gray-500 rounded-md w-56"
            required
          />
        </div>
        <span>End date</span>
        <div className="space-x-4">
          <input
            type="date"
            onChange={handleEnd}
            placeholder={new Date()}
            className="p-3 border border-gray-500 rounded-md w-56"
            required
          />
        </div>
        <div className="flex w-full justify-end">
          <input
            type="submit"
            className="px-4 py-2 text-white rounded-lg bg-blue-700 cursor-pointer"
            value="Create event"
          />
        </div>
      </form>
    </ModalDialog>
  );
};

export default CreateEventModal;
