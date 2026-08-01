export type UserRole = 'passenger' | 'operator' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface RouteItem {
  id: string;
  origin: string;
  destination: string;
  departure_time: string;
  total_seats: number;
  available_seats: number;
  status: 'scheduled' | 'in_transit' | 'completed' | 'delayed';
  created_at: string;
}

export interface Reservation {
  id: string;
  user_id: string;
  route_id: string;
  seat_number: number;
  qr_code: string;
  status: 'confirmed' | 'checked_in' | 'cancelled';
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      routes: {
        Row: RouteItem;
        Insert: Omit<RouteItem, 'id' | 'created_at'>;
        Update: Partial<Omit<RouteItem, 'id' | 'created_at'>>;
      };
      reservations: {
        Row: Reservation;
        Insert: Omit<Reservation, 'id' | 'created_at'>;
        Update: Partial<Omit<Reservation, 'id' | 'created_at'>>;
      };
    };
  };
};
