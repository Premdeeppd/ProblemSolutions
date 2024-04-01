interface User {
    logged_in: Date;
    logged_out?: Date;
    lastSeenAt: Date;
}

const users: User[] = [
    {
        logged_in: new Date('2023-01-05'),
        logged_out: new Date('2023-01-20'),
        lastSeenAt: new Date('2023-01-20')
    },
    {
        logged_in: new Date('2023-02-10'),
        logged_out: new Date('2023-02-15'),
        lastSeenAt: new Date('2023-02-15')
    },
    {
        logged_in: new Date('2023-03-01'),
        lastSeenAt: new Date('2023-03-10')
    }
];

function initializeMonthlyMap(): Map<number, number> {
    const monthlyMap = new Map<number, number>();
    for (let i = 1; i <= 12; i++) {
        monthlyMap.set(i, 0);
    }
    return monthlyMap;
}

function updateMonthlyLoggedInUsers(monthlyMap: Map<number, number>, user: User) {
    const { logged_in, logged_out } = user;
    const startMonth = logged_in.getMonth() + 1;
    const endMonth = (logged_out ?? new Date()).getMonth() + 1;

    for (let month = startMonth; month <= endMonth; month++) {
        monthlyMap.set(month, monthlyMap.get(month)! + 1);
    }
}

function updateMonthlyActiveUsers(monthlyMap: Map<number, number>, user: User) {
    const { logged_in, lastSeenAt } = user;
    const startMonth = logged_in.getMonth() + 1;
    const endMonth = lastSeenAt.getMonth() + 1;

    for (let month = startMonth; month <= endMonth; month++) {
        monthlyMap.set(month, monthlyMap.get(month)! + 1);
    }
}

const monthlyLoggedInUsersMap = initializeMonthlyMap();
for (const user of users) {
    updateMonthlyLoggedInUsers(monthlyLoggedInUsersMap, user);
}

const monthlyActiveUsersMap = initializeMonthlyMap();
for (const user of users) {
    updateMonthlyActiveUsers(monthlyActiveUsersMap, user);
}

console.log('Monthly Logged In Users:');
console.log(Array.from(monthlyLoggedInUsersMap.entries()));
console.log('\nMonthly Active Users:');
console.log(Array.from(monthlyActiveUsersMap.entries()));
