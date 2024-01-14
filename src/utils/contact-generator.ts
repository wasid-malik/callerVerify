const firstNames = [
    'Aarav', 'Aanya', 'Advait', 'Aishwarya', 'Arjun', 'Bhavya', 'Chirag', 'Diya', 'Divya', 'Esha',
    'Farhan', 'Gaurav', 'Ishaan', 'Jasmine', 'Kabir', 'Kavya', 'Lakshya', 'Mehak', 'Neha', 'Om',
    'Prisha', 'Qureshi', 'Rahul', 'Ritika', 'Sahil', 'Sanika', 'Tanvi', 'Utkarsh', 'Vanya',
    'Yash', 'Zara', 'Aditya', 'Bharat', 'Chitra', 'Dhruv', 'Ekta', 'Faisal', 'Gitanjali', 'Harsh',
    'Ishita', 'Jatin', 'Kirti', 'Lavanya', 'Mohan', 'Nandini', 'Omkar', 'Pallavi', 'Quinton',
    'Rahila', 'Samar', 'Tanisha', 'Upendra', 'Vedika', 'Yuvan', 'Zainab', 'Aryan', 'Bhavana',
    'Chetan', 'Deepika', 'Eshan', 'Fatima', 'Gautam', 'Hansa', 'Ibrahim', 'Juhi', 'Kabira',
    'Lalita', 'Mayank', 'Naina', 'Ojas', 'Parul', 'Qamar', 'Ruchi', 'Sachin', 'Tanmay', 'Uma',
    'Vedant', 'Yamini', 'Zubair'
  ];
  
  const lastNames = [
    'Agarwal', 'Bansal', 'Chopra', 'Dutta', 'Eswaran', 'Fernandes', 'Gupta', 'Hegde', 'Iyer', 'Jha',
    'Kapoor', 'Lal', 'Mehra', 'Nair', 'Oberoi', 'Pillai', 'Qureshi', 'Rao', 'Sinha', 'Tyagi',
    'Unnikrishnan', 'Varma', 'Walia', 'Xavier', 'Yadav', 'Zaveri', 'Ahmed', 'Bose', 'Chandra',
    'Das', 'Fadnavis', 'Gandhi', 'Hussain', 'Iqbal', 'Jain', 'Khanna', 'Lamba', 'Mukherjee',
    'Nanda', 'Ojha', 'Pandey', 'Qazi', 'Raj', 'Saxena', 'Tripathi', 'Ullal', 'Verma', 'Wadhwa',
    'Xalxo', 'Yadav', 'Zaidi', 'Ansari', 'Bhat', 'Chauhan', 'Dixit', 'Firoz', 'Gill', 'Hooda',
    'Ismail', 'Joshi', 'Kumar', 'Lulla', 'Malik', 'Nagpal', 'Oswal', 'Pathak', 'Quazi', 'Rastogi',
    'Sharma', 'Tiwari', 'Usman', 'Vaidya', 'Wadhwa', 'Xess', 'Yusuf', 'Zaheer'
  ];
  
  export const getRandomContacts = (total = 100) => {
      console.log('Adding random generated contacts to the database');
  
      const contacts = [];
  
      for (let i = 0; i < total; i++) {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const fullName = lastName ? `${firstName} ${lastName}` : firstName;
          const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Random 10-digit phone number
  
          contacts.push({ name: fullName, phone: phoneNumber });
      }  
      return contacts;
  };
  