const data = {
  groups: [
    {id: 1, title: 'group 1', habits: []},
    {id: 2, title: 'group 2', habits: []},
    {id: 3, title: 'group 3', habits: []},
    {id: 4, title: 'group 4', habits: []},
  ],
  habits: [
    {id: 1, title: 'habit 1', entries: [], groupId: null},
    {id: 2, title: 'habit 2', entries: [], groupId: 1},
    {id: 3, title: 'habit 3', entries: [], groupId: 1},
    {id: 4, title: 'habit 4', entries: [], groupId: 2},
    {id: 5, title: 'habit 5', entries: [], groupId: 3},
    {id: 6, title: 'habit 6', entries: [], groupId: 2},
    {id: 7, title: 'habit 7', entries: [], groupId: null},
    {id: 8, title: 'habit 8', entries: [], groupId: 4},
    {id: 9, title: 'habit 9', entries: [], groupId: null},
  ],
  entries: [
    {id: 1, habitId: 1, date: new Date("January 13, 2018 11:13:00")},
    {id: 2, habitId: 2, date: new Date("January 13, 2018 11:13:00")},
    {id: 3, habitId: 1, date: new Date("January 14, 2018 11:13:00")},
    {id: 4, habitId: 2, date: new Date("January 14, 2018 11:13:00")},
    {id: 5, habitId: 3, date: new Date("January 15, 2018 11:13:00")},
    {id: 6, habitId: 3, date: new Date("January 16, 2018 11:13:00")},
    {id: 7, habitId: 4, date: new Date("January 16, 2018 11:13:00")},
    {id: 8, habitId: 2, date: new Date("January 17, 2018 11:13:00")},
    {id: 9, habitId: 1, date: new Date("January 17, 2018 11:13:00")},
    {id: 10, habitId: 4, date: new Date("January 18, 2018 11:13:00")},
    {id: 11, habitId: 5, date: new Date("January 18, 2018 11:13:00")},
    {id: 12, habitId: 6, date: new Date("January 19, 2018 11:13:00")},
    {id: 13, habitId: 1, date: new Date("January 20, 2018 11:13:00")},
    {id: 14, habitId: 2, date: new Date("January 19, 2018 11:13:00")},
    {id: 15, habitId: 1, date: new Date("January 19, 2018 11:13:00")},
    {id: 16, habitId: 2, date: new Date("January 20, 2018 11:13:00")},
    {id: 17, habitId: 4, date: new Date("January 20, 2018 11:13:00")},
    {id: 18, habitId: 5, date: new Date("January 20, 2018 11:13:00")},
    {id: 19, habitId: 3, date: new Date("January 14, 2018 11:13:00")},
    {id: 20, habitId: 4, date: new Date("January 13, 2018 11:13:00")},
    {id: 21, habitId: 2, date: new Date("January 16, 2018 11:13:00")},
  ]
};

export default data;
