//Acessando a lista de funcionários.
let employeesPromise = fetch('http://localhost:3000/employees');

employeesPromise.then(res => {
    res.json().then((employess) => {
        //console.log(employess)
        let rolesPromisse = fetch("http://localhost:3000/roles");
        rolesPromisse.then(res2 => {
            res2.json().then(roles => {
                let table = renderTable(employess, roles);
                document.getElementById('app').innerHTML = table;
            })
        })
        
    });
});

function renderTable(employees, roles){
    let rows = employees.map(employee => {
        let role = roles.find(role => role.id == employee.role_id );
        
        return `<tr><td>${employee.id}</td><td>${employee.name}</td> <td>${role.name}</td></tr>`
    });
    return `<table>${rows.join()}</table>`
}

//ENCADEAMENTO DE PROMISE
function solution2(){
    fetch('http://localhost:3000/employees')
        .then((r1) => {
            return r1.json();
        })
        .then((employees) => {
            fetch('http://localhost:3000/roles')
                .then((r2) => {
                    return r2.json();
                })
                .then((roles) => {
                    let table = renderTable(employees, roles);
                    document.getElementById("app").innerHTML = table;
                })
        })
}
//solution2();


//TERCEIRA SOLUÇÃO
function solution3(){
    fetchJson('http://localhost:3000/employees').then((employees) => {
        fetchJson('http://localhost:3000/roles').then((roles) => {
            let table = renderTable(employees, roles);
            document.getElementById("app").innerHTML = table;
        });
    });
}
//solution3();


//QUARTA SOLUÇÃO
function solution4(){
    let empPromise = fetchJson('http://localhost:3000/employees');
    let rolesPromise = fetchJson('http://localhost:3000/roles');
    Promise.all([empPromise, rolesPromise]).then((result) => {
        let employee = result[0];
        let roles = result[1];
        let table = renderTable(employees, roles);
        document.getElementById("app").innerHTML = table;
    })
}
//solution4();


//UTILIZANDO ASYNC E AWAIT
async function solution5(){
    //array de employes e roles
    let employees = await fetchJson('http://localhost:3000/employees');
    //fetchJson('http://localhost:3000/employees') é apenas uma PROMISE
    let role = await fetchJson('http://localhost:3000/roles');
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
}

