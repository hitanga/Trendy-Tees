import { useState, useEffect } from 'react';
import { Inquiry, BespokeOrder, Appointment, UserProfile } from '../types';

// Real-time broadcast channel using storage events and custom events for multi-tab/multi-view sync
const BROADCAST_EVENT = 'bhairahawa_store_update';

function broadcastUpdate() {
  window.dispatchEvent(new CustomEvent(BROADCAST_EVENT));
}

// Initial dummy data to populate the app beautifully
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@nepal.com',
    serviceInterest: 'Bespoke Design',
    message: 'Looking for a custom charcoal blazer with traditional Nepalese inner lining for an upcoming wedding.',
    status: 'Reviewing',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'inq-2',
    name: 'Maya Henderson',
    email: 'maya@henderson.design',
    serviceInterest: 'Custom Printing',
    message: 'We want to collaborate on a limited run of organic cotton tees with screen print graphics representing modern Kathmandu.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

const INITIAL_ORDERS: BespokeOrder[] = [
  {
    id: 'order-1',
    userId: 'user-demo-id',
    style: 'Blazer',
    fabric: 'Himalayan Wool Blend (Charcoal)',
    color: '#1a1c1c',
    size: 'M',
    customMeasurements: { chest: 40, waist: 34, length: 30 },
    price: 340,
    status: 'Tailoring',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'order-2',
    userId: 'user-demo-id',
    style: 'Knitwear',
    fabric: 'Fine Mountain Cotton (Pure White)',
    color: '#f9f9f9',
    size: 'M',
    price: 180,
    status: 'Drafting',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    userId: 'user-demo-id',
    serviceType: 'Bespoke Design',
    date: '2026-06-15',
    time: '14:00',
    notes: 'In-person fitting at Kathmandu Studio (Road 7). Bring material swatches.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

// Seed initial values in LocalStorage if not present
if (!localStorage.getItem('bh_inquiries')) {
  localStorage.setItem('bh_inquiries', JSON.stringify(INITIAL_INQUIRIES));
}
if (!localStorage.getItem('bh_orders')) {
  localStorage.setItem('bh_orders', JSON.stringify(INITIAL_ORDERS));
}
if (!localStorage.getItem('bh_appointments')) {
  localStorage.setItem('bh_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
}

// Active user session store helper
const DEMO_USER: UserProfile = {
  id: 'user-demo-id',
  email: 'gopalzone2025@gmail.com',
  name: 'Gopal Thapa',
  mfaEnabled: false,
  theme: 'light',
  preferredStyle: 'Bespoke Design'
};

if (!localStorage.getItem('bh_user')) {
  // Save demo user by default to speed up navigation and testing, but allow logout / fresh login
  localStorage.setItem('bh_user', JSON.stringify(DEMO_USER));
}

// Global functions to read/write states
export const getActiveUser = (): UserProfile | null => {
  const data = localStorage.getItem('bh_user');
  return data ? JSON.parse(data) : null;
};

export const saveActiveUser = (user: UserProfile | null) => {
  if (user) {
    localStorage.setItem('bh_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('bh_user');
  }
  broadcastUpdate();
};

export const getInquiries = (): Inquiry[] => {
  const data = localStorage.getItem('bh_inquiries');
  return data ? JSON.parse(data) : [];
};

export const saveInquiries = (inqs: Inquiry[]) => {
  localStorage.setItem('bh_inquiries', JSON.stringify(inqs));
  broadcastUpdate();
};

export const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry => {
  const newInq: Inquiry = {
    ...inquiry,
    id: 'inq-' + Math.random().toString(36).substr(2, 9),
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  const list = getInquiries();
  list.unshift(newInq);
  saveInquiries(list);
  return newInq;
};

export const getBespokeOrders = (): BespokeOrder[] => {
  const data = localStorage.getItem('bh_orders');
  return data ? JSON.parse(data) : [];
};

export const saveBespokeOrders = (orders: BespokeOrder[]) => {
  localStorage.setItem('bh_orders', JSON.stringify(orders));
  broadcastUpdate();
};

export const addBespokeOrder = (order: Omit<BespokeOrder, 'id' | 'createdAt' | 'status' | 'userId'>): BespokeOrder => {
  const user = getActiveUser();
  const newOrder: BespokeOrder = {
    ...order,
    id: 'ord-' + Math.random().toString(36).substr(2, 9),
    userId: user ? user.id : 'anonymous',
    status: 'Drafting',
    createdAt: new Date().toISOString()
  };
  const list = getBespokeOrders();
  list.unshift(newOrder);
  saveBespokeOrders(list);
  return newOrder;
};

export const deleteBespokeOrder = (id: string) => {
  const list = getBespokeOrders();
  const updated = list.filter(o => o.id !== id);
  saveBespokeOrders(updated);
};

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem('bh_appointments');
  return data ? JSON.parse(data) : [];
};

export const saveAppointments = (apts: Appointment[]) => {
  localStorage.setItem('bh_appointments', JSON.stringify(apts));
  broadcastUpdate();
};

export const addAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'userId'>): Appointment => {
  const user = getActiveUser();
  const newApt: Appointment = {
    ...apt,
    id: 'apt-' + Math.random().toString(36).substr(2, 9),
    userId: user ? user.id : 'anonymous',
    status: 'Scheduled',
    createdAt: new Date().toISOString()
  };
  const list = getAppointments();
  list.unshift(newApt);
  saveAppointments(list);
  return newApt;
};

export const cancelAppointment = (id: string) => {
  const list = getAppointments();
  const updated = list.map(a => a.id === id ? { ...a, status: 'Cancelled' as const } : a);
  saveAppointments(updated);
};

// Custom reactivity hook to keep state synched across all components
export function useSharedStore() {
  const [user, setUser] = useState<UserProfile | null>(getActiveUser());
  const [inquiries, setInquiries] = useState<Inquiry[]>(getInquiries());
  const [orders, setOrders] = useState<BespokeOrder[]>(getBespokeOrders());
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments());

  useEffect(() => {
    const handleUpdate = () => {
      setUser(getActiveUser());
      setInquiries(getInquiries());
      setOrders(getBespokeOrders());
      setAppointments(getAppointments());
    };

    window.addEventListener(BROADCAST_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(BROADCAST_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    user,
    inquiries,
    orders,
    appointments,
    login: (email: string, name: string) => {
      const newUser: UserProfile = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        name,
        mfaEnabled: false,
        theme: 'light'
      };
      saveActiveUser(newUser);
      return newUser;
    },
    logout: () => {
      saveActiveUser(null);
    },
    updateUser: (updated: Partial<UserProfile>) => {
      const curr = getActiveUser();
      if (curr) {
        const next = { ...curr, ...updated };
        saveActiveUser(next);
      }
    }
  };
}
