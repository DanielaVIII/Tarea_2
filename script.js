// Condiciones para validación de formulario
function validarFormulario(){
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;

    if(nombre == ""){
        alert("El nombre es Requerido 😞");
        return false;
    }

    if(edad == ""){
        alert("La edad es requerida");
        return false;
    }
    else if(edad < 18){
        alert("La edad debe ser mayor o igual a 18 😞")
        return false
    }
    else if(edad > 65){
        alert("La edad no debe superar los 65 😞")
        return false
    }

    if(direccion == ""){
        alert("La dirección es Requerida 😞");
        return false;
    }

    if(email == ""){
        alert("El E-mail es requerido 😞");
        return false;
    }
    else if(!email.includes("@")) {
        alert ("E-mail invalido 😞");
        return false;
    }

    return true;
}
// Condiciones para mostrar datos
function mostrarDatos(){
    let listado;
    if(localStorage.getItem("listado") == null){
        listado = []
    }
    else{
        listado = JSON.parse(localStorage.getItem("listado"));
    }
    let html = "";

    listado.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.edad + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
        '<td><button onclick="deleteData(' +
        index +
        ')" class="btn btn-danger mb-1 ms-1">Borrar</button><button onclick="updateData('+
        index +
        ')" class="btn btn-warning mb-1 ms-1">Editar</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = 
    html;
}

document.onload = mostrarDatos();

// Condición para agregar datos
function addData(){
    if(validarFormulario() == true){
        let nombre = document.getElementById("nombre").value;
        let edad = document.getElementById("edad").value;
        let direccion = document.getElementById("direccion").value;
        let email = document.getElementById("email").value;

        let listado;
        if(localStorage.getItem("listado") == null){
            listado = []
        }
        else{
            listado = JSON.parse(localStorage.getItem("listado"));
        }
        listado.push({
            nombre : nombre,
            edad : edad,
            direccion : direccion,
            email : email,
        });
        localStorage.setItem("listado", JSON.stringify(listado));
        mostrarDatos();
        document.getElementById("nombre").value="";
        document.getElementById("edad").value="";
        document.getElementById("direccion").value="";
        document.getElementById("email").value="";

    }
}

// Condición para borrar datos
function deleteData(index){
    let listado;
    if (localStorage.getItem("listado")==null) {
        listado = [];
    }else {
            listado = JSON.parse(localStorage.getItem("listado"));
        }
      
    listado.splice(index,1);
    localStorage.setItem("listado", JSON.stringify(listado));
    mostrarDatos();
    
}

// Condición para editar datos
function updateData(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let listado;
    if (localStorage.getItem("listado")==null){
        listado = [];
    } else {
        listado = JSON.parse(localStorage.getItem("listado"));
    }

    document.getElementById("nombre").value=listado[index].nombre;
    document.getElementById("edad").value=listado[index].edad;
    document.getElementById("direccion").value=listado[index].direccion;
    document.getElementById("email").value=listado[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validarFormulario()== true){
            listado[index].nombre = document.getElementById("nombre").value;
            listado[index].edad = document.getElementById("edad").value;
            listado[index].direccion = document.getElementById("direccion").value;
            listado[index].email = document.getElementById("email").value;

            localStorage.setItem("listado", JSON.stringify(listado));

            mostrarDatos();

            document.getElementById("nombre").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }

}

