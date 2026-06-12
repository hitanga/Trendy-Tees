import { motion } from 'motion/react';
import {
  FileText,
  Clock,
  Shirt,
  Calendar,
  Settings,
  XCircle,
  Plus,
  Compass,
  Sparkles,
  Inbox,
  Workflow
} from 'lucide-react';
import { useSharedStore, deleteBespokeOrder, cancelAppointment } from '../lib/store';

interface DashboardProps {
  setTab: (tab: string) => void;
  setSelectedStyleInBuilder: (style: 'Blazer' | 'T-Shirt' | 'Knitwear') => void;
}

export default function Dashboard({ setTab, setSelectedStyleInBuilder }: DashboardProps) {
  const { user, inquiries, orders, appointments } = useSharedStore();

  const handleStartCustomItem = (style: 'Blazer' | 'T-Shirt' | 'Knitwear') => {
    setSelectedStyleInBuilder(style);
    setTab('builder');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
      case 'Drafting':
      case 'Scheduled':
        return 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200/50';
      case 'Reviewing':
      case 'Reviewing':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200/50';
      case 'Contacted':
      case 'Confirmed':
      case 'Tailoring':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200/50';
      case 'Completed':
        return 'text-zinc-600 bg-zinc-50 dark:bg-zinc-800/20 dark:text-zinc-300 border-zinc-200/50';
      case 'Cancelled':
        return 'text-red-500 bg-red-50 dark:bg-red-950/10 dark:text-red-400 border-red-200/50';
      default:
        return 'text-zinc-500 bg-zinc-50 dark:bg-zinc-800/10 border-zinc-200/50';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
        
        {/* Header Greeting Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-md">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Welcome Back Account Holder
            </span>
            <h1 className="font-serif text-3xl font-bold mt-1 text-zinc-900 dark:text-white capitalize flex items-center gap-2">
              <span>Namaste, {user?.name || 'Gopal Thapa'}</span>
              <Sparkles className="w-5 h-5 text-orange-600" />
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Currently securely logging transactions as <strong className="font-semibold text-orange-600">{user?.email}</strong>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab('settings')}
              className="px-4 py-2 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-orange-600 hover:text-orange-600 cursor-pointer flex items-center gap-1 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Security Settings</span>
            </button>
            <button
              onClick={() => setTab('landing')}
              className="px-4 py-2 text-xs font-semibold rounded bg-black dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white cursor-pointer flex items-center gap-1 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Back To Main Showroom</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">
                Logged Inquiries
              </span>
              <span className="text-3xl font-serif text-zinc-900 dark:text-white font-bold block mt-1">
                {inquiries.length}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-1 leading-none">
                Reactive submit logs
              </span>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 rounded-full">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">
                Bespoke Order Drafts
              </span>
              <span className="text-3xl font-serif text-zinc-900 dark:text-white font-bold block mt-1">
                {orders.length}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-1 leading-none">
                Bespoke Studio outlines
              </span>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-full">
              <Shirt className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">
                Fitting appointments
              </span>
              <span className="text-3xl font-serif text-zinc-900 dark:text-white font-bold block mt-1">
                {appointments.filter(a => a.status !== 'Cancelled').length}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-1 leading-none">
                Studio visits reserved
              </span>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Bespoke Orders list (Left - 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Shirt className="w-5 h-5 text-orange-600" />
                    <span>Active Bespoke Outlines</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Customize premium Himalayan outerwear dynamically. Spun locally.
                  </p>
                </div>
                <button
                  onClick={() => handleStartCustomItem('Blazer')}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white rounded flex items-center gap-1 cursor-pointer transition-colors shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Piece</span>
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <Inbox className="w-10 h-10 text-zinc-300 mx-auto" />
                  <p className="text-xs font-mono">No custom drafts in this workspace session.</p>
                  <button
                    onClick={() => handleStartCustomItem('Blazer')}
                    className="text-orange-600 hover:underline text-xs"
                  >
                    Launch Design Studio Outliner
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-zinc-100 dark:border-zinc-800 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-200">
                            {order.style} Outfit Draft
                          </span>
                          <span className={`text-[9px] uppercase font-bold px-2 py-0.5 border rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <ul className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 space-y-1 font-mono">
                          <li><strong>Fabric:</strong> {order.fabric}</li>
                          <li><strong>Size:</strong> {order.size}</li>
                          {order.customMeasurements && (
                            <li>
                              <strong>Measures:</strong> Chest {order.customMeasurements.chest}", Waist {order.customMeasurements.waist}", Torso {order.customMeasurements.length}"
                            </li>
                          )}
                          {order.printedText && <li><strong>Collar Badge:</strong> "{order.printedText}"</li>}
                          <li className="text-[10px] text-zinc-400 mt-2">
                            Created {new Date(order.createdAt).toLocaleString()}
                          </li>
                        </ul>
                      </div>

                      <div className="text-right flex sm:flex-col items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 block sm:inline mr-1">Price:</span>
                          <span className="text-lg font-serif font-bold text-zinc-900 dark:text-white">
                            ${order.price}
                          </span>
                        </div>
                        {order.status === 'Drafting' && (
                          <button
                            onClick={() => deleteBespokeOrder(order.id)}
                            className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20 px-2 py-1 rounded mt-2 select-none transition-all"
                            title="Discard Design Proposal"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inquiries list */}
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-md">
              <h3 className="font-serif text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span>Saved Inquiry Submissions</span>
              </h3>

              {inquiries.length === 0 ? (
                <p className="text-xs text-zinc-400 py-6 text-center">No inquiry history found.</p>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-800/60 rounded-lg text-xs"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">
                          {inq.serviceInterest}
                        </span>
                        <span className={`text-[8px] uppercase font-bold px-2 py-0.5 border rounded-full ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300 italic mb-2">
                        "{inq.message}"
                      </p>
                      <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                        <span>Submitted by {inq.name} ({inq.email})</span>
                        <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Roster & Quick Actions (Right - 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Consultation appointments list */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-emerald-500" />
                <span>Appointments</span>
              </h3>

              {appointments.length === 0 ? (
                <p className="text-xs text-zinc-400 py-4 text-center">No studio fit appointments scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/60 rounded flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide">
                            {apt.serviceType}
                          </span>
                          <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 border rounded-full ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-650 dark:text-zinc-300 mt-2 font-mono">
                          <span className="block">📅 {apt.date}</span>
                          <span className="block mt-0.5">⏰ {apt.time} Slot</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-2 leading-normal">
                          {apt.notes}
                        </p>
                      </div>

                      {apt.status === 'Confirmed' || apt.status === 'Scheduled' ? (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="w-full text-center text-[10px] py-1.5 font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-200 dark:hover:border-red-900 rounded cursor-pointer transition-colors"
                        >
                          Cancel Slot
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Designer shortcuts */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-zinc-800 dark:text-zinc-100 text-sm">
                Bespoke Quick Links
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleStartCustomItem('Blazer')}
                  className="w-full text-left p-3 rounded bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>Coat & Outerwear customizer</span>
                  <span className="text-xs">🧥</span>
                </button>
                <button
                  onClick={() => handleStartCustomItem('T-Shirt')}
                  className="w-full text-left p-3 rounded bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>Heavyweight Tee Customizer</span>
                  <span className="text-xs">👕</span>
                </button>
                <button
                  onClick={() => handleStartCustomItem('Knitwear')}
                  className="w-full text-left p-3 rounded bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>Hand frame Yak Knitwear Customizer</span>
                  <span className="text-xs">🧶</span>
                </button>
              </div>
            </div>

            {/* Real-time event notifications info box */}
            <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200/30 dark:border-indigo-900/40 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-[10px]">
                <Workflow className="w-4 h-4" />
                <span>SUPABASE REALTIME SYNC</span>
              </div>
              <p className="leading-relaxed">
                Persistent storage state channel registers instant events across tabs. If a Supabase client gets provisioned, this layer binds directly to tables!
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
