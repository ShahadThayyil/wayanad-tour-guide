// src/data/mockData.js

export const placesData = [
  {
    id: 1,
    name: "Edakkal Caves",
    description: "Ancient caves with prehistoric petroglyphs on top of Ambukuthi Hills.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f3KCPk8Iz9PJ_7I44lp8Xc5AQ3EF_YYjxw&s",
  },
  {
    id: 2,
    name: "Banasura Sagar Dam",
    description: "The largest earth dam in India and the second largest in Asia.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f3KCPk8Iz9PJ_7I44lp8Xc5AQ3EF_YYjxw&s", 
  },
  {
    id: 3,
    name: "Soochipara Waterfalls",
    description: "A three-tiered waterfall surrounded by deciduous, evergreen and montane forests.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f3KCPk8Iz9PJ_7I44lp8Xc5AQ3EF_YYjxw&s",
  }
];

export const guidesData = [
  { id: 101, name: "Rahul K.", experience: "5 Years", languages: ["Malayalam", "English"] },
  { id: 102, name: "Fatima S.", experience: "3 Years", languages: ["Malayalam", "Hindi"] },
  { id: 103, name: "Arjun M.", experience: "7 Years", languages: ["English", "Arabic"] },
];

export const myBookingsData = [
  { id: 1, place: "Edakkal Caves", guideName: "Rahul K.", date: "2026-02-10", status: "confirmed" },
  { id: 2, place: "Banasura Sagar Dam", guideName: "Fatima S.", date: "2026-02-15", status: "pending" },
  { id: 3, place: "Soochipara Waterfalls", guideName: "Arjun M.", date: "2026-01-20", status: "rejected" },
];
// src/data/mockData.js (Append this to the file)

export const guideRequestsData = [
  { 
    id: 1, 
    touristName: "Anjali Menon", 
    place: "Edakkal Caves", 
    date: "2026-02-12", 
    status: "pending",
    contact: "+91 9876543210"
  },
  { 
    id: 2, 
    touristName: "John Smith", 
    place: "Banasura Sagar Dam", 
    date: "2026-02-14", 
    status: "confirmed",
    contact: "+91 9988776655"
  },
  { 
    id: 3, 
    touristName: "David & Family", 
    place: "Soochipara Waterfalls", 
    date: "2026-02-10", 
    status: "rejected",
    contact: "Hidden"
  },
  { 
    id: 4, 
    touristName: "Priya P.", 
    place: "Edakkal Caves", 
    date: "2026-02-18", 
    status: "pending",
    contact: "+91 8877665544"
  }
];
// src/data/mockData.js (Append this)

export const allGuidesData = [
  { id: 101, name: "Rahul K.", email: "rahul@gmail.com", status: "Verified", joined: "2024-01-10" },
  { id: 102, name: "Fatima S.", email: "fatima@gmail.com", status: "Verified", joined: "2024-02-15" },
  { id: 103, name: "Arjun M.", email: "arjun@gmail.com", status: "Pending", joined: "2026-02-01" }, // New guide needing approval
  { id: 104, name: "Suresh P.", email: "suresh@gmail.com", status: "Pending", joined: "2026-02-02" },
];
export const allUsersData = [
  { id: 201, name: "Anjali Menon", email: "anjali@gmail.com", joined: "2024-01-12", bookings: 3, status: "Active" },
  { id: 202, name: "John Smith", email: "john.s@gmail.com", joined: "2024-02-18", bookings: 1, status: "Active" },
  { id: 203, name: "David Miller", email: "david.m@yahoo.com", joined: "2024-03-05", bookings: 0, status: "Inactive" },
  { id: 204, name: "Priya P.", email: "priya@gmail.com", joined: "2024-03-10", bookings: 5, status: "Active" },
];
export const allBookingsData = [
  { id: 301, touristName: "Anjali Menon", guideName: "Rahul K.", place: "Edakkal Caves", date: "2026-02-12", status: "confirmed", amount: "₹800" },
  { id: 302, touristName: "John Smith", guideName: "Fatima S.", place: "Banasura Sagar Dam", date: "2026-02-15", status: "pending", amount: "₹1200" },
  { id: 303, touristName: "David Miller", guideName: "Arjun M.", place: "Soochipara Waterfalls", date: "2026-02-10", status: "rejected", amount: "₹1000" },
  { id: 304, touristName: "Priya P.", guideName: "Rahul K.", place: "Pookode Lake", date: "2026-02-18", status: "confirmed", amount: "₹600" },
  { id: 305, touristName: "Anjali Menon", guideName: "Suresh P.", place: "Chembra Peak", date: "2026-03-01", status: "pending", amount: "₹1500" },
];