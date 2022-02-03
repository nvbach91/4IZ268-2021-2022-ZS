import { useState, useEffect } from "react";
import ModalDialog from "../ModalDialog";
import { useAuth } from "../../hook/AuthContext";

const EditEventModal = ({ event, isOpen, closeModal, reloadEvents }) => {
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { gapiInstance } = useAuth();

  useEffect(() => {
    console.log(event);
    if (event) {
      setSummary(event.summary);
      setLocation(event.location);
      setDescription(event.description);
      setStart(event.start.date || event.start.dateTime);
      setEnd(event.end.date || event.end.dateTime);
    }
  }, [event]);
  const submitEvent = (e) => {
    e.preventDefault();

    const startDate = {
      date: start,
    };
    const endDate = {
      date: end,
    };

    const editedEvent = {
      summary: summary,
      location: location,
      description: description,
      start: startDate,
      end: endDate,
    };
    const req = gapiInstance.client.calendar.events.update({
      calendarId: "primary",
      eventId: event.id,
      resource: editedEvent,
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
  };

  const handleEnd = (e) => {
    setEnd(e.target.value);
  };
  if (event) {
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
            defaultValue={summary}
            required
          />
          <input
            type="text"
            onChange={handleLocation}
            placeholder="Location"
            defaultValue={location}
            className="p-3 border border-gray-500 rounded-md"
          />
          <textarea
            onChange={handleDescription}
            placeholder="Description"
            defaultValue={description}
            className="p-3 border border-gray-500 rounded-md"
          />
          <span>Start date</span>
          <div className="space-x-4">
            <input
              type="date"
              onChange={handleStart}
              placeholder={new Date()}
              defaultValue={start}
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
              defaultValue={end}
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
  }
  return <></>;
};

export default EditEventModal;
