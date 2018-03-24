const data = {
  groups: [
    {id: 1, title: 'group 1', order: 0},
    {id: 2, title: 'group 2', order: 2},
    {id: 3, title: 'group 3', order: 3},
    {id: 4, title: 'group 4', order: 1},
  ],
  habits: [
    {id: 1, title: 'habit 1', groupId: null, order: 0},
    {id: 2, title: 'habit 2', groupId: 1, order: 1},
    {id: 3, title: 'habit 3', groupId: 1, order: 0},
    {id: 4, title: 'habit 4', groupId: 2, order: 1},
    {id: 5, title: 'habit 5', groupId: 3, order: 0},
    {id: 6, title: 'habit 6', groupId: 2, order: 0},
    {id: 7, title: 'habit 7', groupId: null, order: 1},
    {id: 8, title: 'habit 8', groupId: 4, order: 0},
    {id: 9, title: 'habit 9', groupId: null, order: 2},
  ],
  entries: [
    {id: 1, habitId: 1, date: new Date("February 13, 2018 11:13:00")},
    {id: 2, habitId: 2, date: new Date("February 13, 2018 11:13:00")},
    {id: 3, habitId: 1, date: new Date("February 14, 2018 11:13:00")},
    {id: 4, habitId: 2, date: new Date("February 14, 2018 11:13:00")},
    {id: 5, habitId: 3, date: new Date("February 15, 2018 11:13:00")},
    {id: 6, habitId: 3, date: new Date("February 16, 2018 11:13:00")},
    {id: 7, habitId: 4, date: new Date("February 16, 2018 11:13:00")},
    {id: 8, habitId: 2, date: new Date("February 17, 2018 11:13:00")},
    {id: 9, habitId: 1, date: new Date("February 17, 2018 11:13:00")},
    {id: 10, habitId: 4, date: new Date("February 18, 2018 11:13:00")},
    {id: 11, habitId: 5, date: new Date("February 18, 2018 11:13:00")},
    {id: 12, habitId: 6, date: new Date("February 19, 2018 11:13:00")},
    {id: 13, habitId: 1, date: new Date("February 20, 2018 11:13:00")},
    {id: 14, habitId: 2, date: new Date("February 19, 2018 11:13:00")},
    {id: 15, habitId: 1, date: new Date("February 19, 2018 11:13:00")},
    {id: 16, habitId: 2, date: new Date("February 20, 2018 11:13:00")},
    {id: 17, habitId: 4, date: new Date("February 20, 2018 11:13:00")},
    {id: 18, habitId: 5, date: new Date("February 20, 2018 11:13:00")},
    {id: 19, habitId: 3, date: new Date("February 14, 2018 11:13:00")},
    {id: 20, habitId: 4, date: new Date("February 13, 2018 11:13:00")},
    {id: 21, habitId: 2, date: new Date("February 16, 2018 11:13:00")},
  ]
};

export default data;
