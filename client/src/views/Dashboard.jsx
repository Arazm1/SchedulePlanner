import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);


// Placeholder shifts — replace with real API data later
const mockEvents = [
  {
    title: "Morning shift – Job 1",
    start: new Date(2026, 5, 17, 8, 0),
    end: new Date(2026, 5, 17, 16, 0),
    color: "#6366f1",
  },
  {
    title: "Evening shift – Job 2",
    start: new Date(2026, 5, 19, 16, 0),
    end: new Date(2026, 5, 19, 22, 0),
    color: "#f59e0b",
  },
];

const Dashboard = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState(mockEvents);

    
    const handleSelectSlot = ({start, end}) => {
        setSelectedDate({ start, end });
        console.log("Opening modal..")
    };


    // Color each event based on company
    const eventStyleGetter = (event) => ({
        style: {
        backgroundColor: event.color,
        borderRadius: "6px",
        border: "none",
        color: "#fff",
        fontSize: "12px",
        padding: "2px 6px",
        },
    });


    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        {/* Top section */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#13131a]">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            </div>
            <h1 className="font-semibold tracking-tight">ShiftsPlanner</h1>
            </div>
            <button className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
            Sign out
            </button>
        </div>

        {/* Main section */}
        <div className="flex flex-1 overflow-hidden">
            {/* Left sidebar */}
            <div className="w-72 border-r border-white/5 bg-[#13131a] flex flex-col p-6 gap-6">

            {/* Add shift */}
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add shift
            </button>

            {/* Jobs */}
            <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-3">Your jobs</span>
                <div className="flex flex-col gap-2">
                {[
                    { name: "Job 1", color: "#6366f1" },
                    { name: "Job 2", color: "#f59e0b" },
                ].map((job) => (
                    <div key={job.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: job.color }} />
                    <span className="text-sm text-white/70">{job.name}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Delete shift */}
            <div className="mt-auto">
                <button className="w-full border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 transition-colors text-red-400/60 hover:text-red-400 text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                </svg>
                Delete shift
                </button>
            </div>
            </div>

            {/* Right side — calendar */}
            <div className="flex-1 p-6 overflow-auto">
            <style>{`
                .rbc-calendar { background: transparent; color: #fff; }
                .rbc-header { background: #13131a; border-color: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); font-size: 12px; padding: 10px 0; }
                .rbc-month-view, .rbc-time-view { border-color: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; }
                .rbc-day-bg { background: #13131a; }
                .rbc-day-bg:hover { background: #1c1c28; }
                .rbc-off-range-bg { background: #0f0f18; }
                .rbc-today { background: rgba(99,102,241,0.08) !important; }
                .rbc-date-cell { color: rgba(255,255,255,0.5); font-size: 13px; padding: 4px 8px; }
                .rbc-date-cell.rbc-now { color: #6366f1; font-weight: 600; }
                .rbc-month-row { border-color: rgba(255,255,255,0.05); }
                .rbc-day-bg + .rbc-day-bg { border-color: rgba(255,255,255,0.05); }
                .rbc-toolbar { margin-bottom: 16px; }
                .rbc-toolbar button { color: rgba(255,255,255,0.5); background: #13131a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 6px 14px; font-size: 13px; cursor: pointer; transition: all 0.15s; }
                .rbc-toolbar button:hover { background: #1c1c28; color: #fff; }
                .rbc-toolbar button.rbc-active { background: #6366f1; color: #fff; border-color: #6366f1; }
                .rbc-toolbar-label { color: #fff; font-weight: 600; font-size: 16px; }
                .rbc-show-more { color: #6366f1; font-size: 12px; }
            `}</style>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 120px)" }}
                selectable
                onSelectSlot={handleSelectSlot}
                eventPropGetter={eventStyleGetter}
                views={["month", "week", "day"]}
                defaultView="month"
            />
            </div>
        </div>
        </div>
    );
    };

export default Dashboard;