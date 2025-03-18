// Array para almacenar los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    // Obtener el valor del input
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el nombre no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingresa un nombre válido');
        return;
    }
    
    // Añadir el amigo al array
    amigos.push(nombreAmigo);
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
    
    // Actualizar la lista en el DOM
    actualizarListaAmigos();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        // Crear el elemento de la lista
        const itemAmigo = document.createElement('li');
        itemAmigo.className = 'amigo-item';
        
        // Añadir el nombre del amigo
        const nombreElement = document.createElement('span');
        nombreElement.textContent = amigo;
        itemAmigo.appendChild(nombreElement);
        
        // Añadir el botón para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '×';
        btnEliminar.className = 'button-delete';
        btnEliminar.setAttribute('aria-label', `Eliminar a ${amigo} de la lista`);
        btnEliminar.onclick = () => eliminarAmigo(index);
        
        itemAmigo.appendChild(btnEliminar);
        listaAmigos.appendChild(itemAmigo);
    });
    
    // Actualizar estado del botón de sorteo
    actualizarBotonSorteo();
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

// Función para actualizar el estado del botón de sorteo
function actualizarBotonSorteo() {
    const btnSorteo = document.querySelector('.button-draw');
    btnSorteo.disabled = amigos.length < 2;
    
    if (amigos.length < 2) {
        btnSorteo.classList.add('disabled');
        btnSorteo.title = 'Se necesitan al menos 2 personas para realizar el sorteo';
    } else {
        btnSorteo.classList.remove('disabled');
        btnSorteo.title = 'Hacer sorteo de amigo secreto';
    }
}

// Función para realizar el sorteo de amigo secreto
function sortearAmigo() {
    // Verificar que haya suficientes amigos
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 personas para realizar el sorteo');
        return;
    }
    
    // Seleccionar un amigo aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSeleccionado = amigos[indiceAleatorio];
    
    // Mostrar resultado en la página
    mostrarResultado(amigoSeleccionado);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(amigoSeleccionado) {
    const resultadoElement = document.getElementById('resultado');
    
    // Limpiar resultados anteriores
    resultadoElement.innerHTML = '';
    
    // Crear elemento para mostrar el resultado
    const mensajeResultado = document.createElement('li');
    mensajeResultado.className = 'resultado-sorteo';
    mensajeResultado.innerHTML = `<strong>¡${amigoSeleccionado}</strong> es el amigo secreto seleccionado!`;
    
    // Añadir a la lista de resultados
    resultadoElement.appendChild(mensajeResultado);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Añadir funcionalidad de presionar Enter para agregar amigo
    document.getElementById('amigo').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // Inicializar el estado del botón de sorteo
    actualizarBotonSorteo();
});