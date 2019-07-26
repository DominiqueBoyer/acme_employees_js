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

function findEmployeeByName (string, arr){
  return arr.filter((person)=> person.name === string)[0];
}
spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')


function findManagerFor (employee, arr) {
  let idManager = employee.managerId;
  return arr.filter((person)=> person.id === idManager)[0]
}
spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')


function findCoworkersFor(employee, arr){
  let idManager = employee.managerId;
  let employeeName = employee.name;
  return arr.filter(person => person.managerId=== idManager && person.name !==employeeName)
}
spacer('findCoworkersFor Larry')
//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/
spacer('');


function findManagementChainForEmployee(employee, arr){
  let chain =[];
  //i want to use a whie loop for this to keep finding managers until managerId === undefined
  //can i do that
  if(employee.managerId){
    let manager = findManagerFor(employee, arr);
    chain.push(manager);
    if(manager.managerId){
      let manager2 = findManagerFor(manager,arr);
      chain.push(manager2);
      if(manager2.managerId){
        let manager3 = findManagerFor(manager2,arr);
        chain.push(manager3);
      }
    }
  }
  return chain.reverse();
}
spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');
spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


function generateManagementTree (arr){
 //added the reports property to each employee
  for (let i=0; i<arr.length; i++){
   let person = arr[i];
   if(person.reports===undefined){
     person.reports=[];
   }
 }
 return arr;
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

// {"id": 1,"name": "moe","reports":
//   [
//     {"id": 2,"name": "larry","managerId": 1,"reports": [
//         {"id": 4, "name": "shep", "managerId": 2, "reports": [
//             {"id": 8, "name": "shep Jr.", "managerId": 4, "reports": []}]}]},
//     {
//       "id": 3, "name": "curly", "managerId": 1, "reports": [
//         {"id": 5, "name": "groucho", "managerId": 3, "reports": [
//             {"id": 6, "name": "harpo", "managerId": 5, "reports": []}]}]},
//     {
//       "id": 99, "name": "lucy","managerId": 1,"reports": []}
//   ]
// }

spacer('');


function displayManagementTree(employeeTree){
  let tree=[];
  tree.push(employeeTree.name);
  let getName = function(obj){
    tree.push(obj.name);
  }
  let team = employeeTree.reports;
  for (let i=0; i<team.length; i++){
    let person = team[i];
    getName(person);
    if(person.reports){
      getName(person.reports);
    }
  }



  for (let i=0; i<tree.length; i++){
    console.log(tree[i]);
  }
}

spacer('displayManagementTree');
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
