const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}


 function generateManagementTree (arr){
  let tree = {};
  let clone = JSON.parse(JSON.stringify(arr))
  for (let i=0; i<clone.length; i++){
    let item = clone[i];
    item.reports=[]
  }

  for (let i=0; i<clone.length; i++){
    let person = clone[i];
    if(person.managerId===undefined){
      tree = person;
    }
    // console.log(person);
    let staff = clone.filter((employee)=> employee.managerId===person.id)
    // console.log(staff);
    person.reports = staff;
  }
  return tree;
}

 spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
