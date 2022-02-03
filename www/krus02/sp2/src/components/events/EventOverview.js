import { useAuth } from "../../hook/AuthContext";
import { useState, useEffect } from "react";
import Event from "./Event";
import EditEventModal from "./EditEventModal";
const getNextYearDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const c = new Date(year + 1, month, day);
  return c;
};
const EventOverview = ({ reloadEvents, setReloadEvents, isFilterOpen }) => {
  const { user, ready, gapiInstance } = useAuth();
  const [events, setEvents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const [dateFrom, setDateFrom] = useState(new Date().toISOString());
  const [dateTo, setDateTo] = useState(getNextYearDate().toISOString());

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setReloadEvents(true);
  };

  const handleOpenEdit = (index) => {
    setCurrentEvent(events[index]);
    console.log(events[index]);
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEventDeletion = (index) => {
    console.log("here");
    gapiInstance.client.calendar.events
      .delete({
        calendarId: "primary",
        eventId: events[index].id,
      })
      .then(() => setReloadEvents(true));
  };
  useEffect(() => {
    if (user && ready) {
      const getCalendarEvents = () => {
        gapiInstance.client.calendar.events
          .list({
            calendarId: "primary",
            timeMin: dateFrom,
            timeMax: dateTo,
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            const events = response.result.items.map((event) => event);
            setEvents(events);
          });
      };
      getCalendarEvents();
    }
  }, [user, ready, gapiInstance]);

  useEffect(() => {
    if (gapiInstance) {
      const getCalendarEvents = () => {
        gapiInstance.client.calendar.events
          .list({
            calendarId: "primary",
            timeMin: dateFrom,
            timeMax: dateTo,
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            const events = response.result.items.map((event) => event);
            setEvents(events);
          });
      };
      getCalendarEvents();
      setReloadEvents(false);
    }
  }, [reloadEvents, setReloadEvents, gapiInstance]);

  if (user) {
    return (
      <>
        {isFilterOpen && (
          <div className="border-b-2 border-blue-700">
            <span className="text-2xl mb-4">Filter events</span>
            <form
              onSubmit={handleFilterSubmit}
              className="flex flex-col md:flex-row items-center md:space-x-4 md:justify-between"
            >
              Date from
              <input
                type="date"
                defaultValue={dateFrom}
                className="p-4 border rounded-md border-gray-500"
                onChange={(e) =>
                  setDateFrom(new Date(e.target.value).toISOString())
                }
              />
              Date to
              <input
                type="date"
                defaultValue={dateTo}
                className="p-4 border rounded-md border-gray-500"
                onChange={(e) =>
                  setDateTo(new Date(e.target.value).toISOString())
                }
              />
              <input
                type="submit"
                className="my-2 px-4 py-2 text-white rounded-lg bg-blue-700 cursor-pointer"
                value="Apply filter"
              />
            </form>
          </div>
        )}
        <div>
          <h1 className="text-4xl pb-2">Your events</h1>
          <div className="grid grid-cols-2 gap-8">
            {events &&
              events.map((event, index) => (
                <>
                  <Event
                    event={event}
                    index={index}
                    edit={handleOpenEdit}
                    deleteEvent={handleEventDeletion}
                    key={JSON.stringify(event)}
                  />
                </>

              ))}
            </div>
          <EditEventModal
            event={currentEvent}
            isOpen={openEdit}
            closeModal={handleEditClose}
            reloadEvents={setReloadEvents}
          />
        </div>
      </>
    );
  }
};

export default EventOverview;
