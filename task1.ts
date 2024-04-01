interface UserActivity {
    userId: string;
    devices: {
      deviceId: string;
      loggedIn: Date;
      loggedOut?: Date; 
      lastSeenAt: Date;
    }[];
  }
  
  type MonthlyStats = {
    [month: number]: number; 
  };
  
  function calculateMonthlyLoggedInUsers(data: UserActivity[]): MonthlyStats {
    const monthlyLoggedIn: MonthlyStats = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
      6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0,
    };
  
    for (const user of data) {
      for (const device of user.devices) {
        const loginMonth = device.loggedIn.getMonth();
        const logoutMonth = device.loggedOut?.getMonth() ?? loginMonth; 
  
        for (let month = loginMonth; month <= logoutMonth; month++) {
          monthlyLoggedIn[month]++;
        }
      }
    }
  
    return monthlyLoggedIn;
  }
  
  function calculateMonthlyActiveUsers(data: UserActivity[]): MonthlyStats {
    const monthlyActive: MonthlyStats = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
      6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0,
    };
  
    for (const user of data) {
      for (const device of user.devices) {
        const loginMonth = device.loggedIn.getMonth();
        const lastSeenMonth = device.lastSeenAt.getMonth();
  
        // Check activity across months between login and lastSeenAt
        for (let month = loginMonth; month <= lastSeenMonth; month++) {
          monthlyActive[month]++;
        }
      }
    }
  
    return monthlyActive;
  }
  
  const sampleData: UserActivity[] = [
    // ... your user activity data
  ];
  
  const monthlyLoggedInUsers = calculateMonthlyLoggedInUsers(sampleData);
  const monthlyActiveUsers = calculateMonthlyActiveUsers(sampleData);
  
  console.log("Monthly Logged In Users:", monthlyLoggedInUsers);
  console.log("Monthly Active Users:", monthlyActiveUsers);
  