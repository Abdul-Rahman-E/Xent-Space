const generateRandomEmployeeData = () => {
  const departments = ["Engineering", "HR", "Marketing", "Sales", "Finance"];
  const positions = [
    "Software Engineer",
    "HR Manager",
    "Marketing Executive",
    "Financial Analyst",
    "DevOps Engineer",
    "Recruitment Lead",
    "Sales Representative",
    "Content Strategist",
    "Frontend Developer",
    "Backend Developer",
    "Sales Manager",
    "HR Executive",
  ];
  const cities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Singapore",
    "Rome",
    "Madrid",
  ];

  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generatePhone = () =>
    `${Math.floor(Math.random() * 9000000000) + 1000000000}`;

  const generateSalary = () => `${Math.floor(Math.random() * 900000) + 10000}`;

  const employee = {
    key: `${Math.floor(Math.random() * 1000)}`,
    name: `${randomElement([
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Helen",
      "Ian",
      "Jack",
    ])} ${randomElement([
      "Johnson",
      "Smith",
      "Davis",
      "Peters",
      "Green",
      "White",
      "Black",
      "Brown",
      "Turner",
      "Adams",
    ])}`,
    department: randomElement(departments),
    position: randomElement(positions),
    email: `${randomElement([
      "alice",
      "bob",
      "charlie",
      "diana",
      "evan",
      "fiona",
      "george",
      "hannah",
      "ian",
      "julia",
    ])}.${randomElement([
      "j@example.com",
      "s@example.com",
      "d@example.com",
      "p@example.com",
      "g@example.com",
      "w@example.com",
    ])}`,
    salary: generateSalary(),
    phone: generatePhone(),
    salary: Math.floor(Math.random() * (100000 - 60000) + 60000),
    performanceScore: Math.floor(Math.random() * (100 - 60) + 60),
    projectsCompleted: Math.floor(Math.random() * 10),
    salesNumbers: Math.floor(Math.random() * 50),
    customerSatisfaction: Math.floor(Math.random() * (100 - 70) + 70),
    activeUsers: Math.random() < 0.5,
    newUsers: Math.random() < 0.5,
    assignedTasks: Math.floor(Math.random() * 7),
    taskStatus: randomElement(["progress", "completed", "pending"]),
  };

  return employee;
};

const employeesData = Array.from({ length: 100 }, generateRandomEmployeeData);

export default employeesData;

