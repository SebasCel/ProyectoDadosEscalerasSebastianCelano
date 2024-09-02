// Variables globales
let totalSimulaciones = 0;
let escalerasEncontradas = 0;

// Función para lanzar cinco dados
function lanzarDados() {
    const dados = [];
    for (let i = 0; i < 5; i++) {
        dados.push(Math.floor(Math.random() * 6) + 1);
    }
    return dados.sort((a, b) => a - b);
}

// Función para verificar si hay una escalera
function esEscalera(dados) {
    // Chequear si los números están en secuencia ascendente
    for (let i = 0; i < dados.length - 1; i++) {
        if (dados[i] + 1 !== dados[i + 1]) {
            return false;
        }
    }
    return true;
}

// Función para realizar simulaciones
function realizarSimulaciones(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        const resultado = lanzarDados();
        if (esEscalera(resultado)) {
            escalerasEncontradas++;
        }
        totalSimulaciones++;
        actualizarResultados(resultado);
    }
    actualizarProbabilidad();
}

// Función para actualizar la interfaz con los resultados
function actualizarResultados(resultado) {
    for (let i = 0; i < resultado.length; i++) {
        document.getElementById(`dado${i + 1}`).textContent = resultado[i];
    }
    document.getElementById('contador-simulaciones').textContent = totalSimulaciones;
}

// Función para actualizar la probabilidad en la interfaz
function actualizarProbabilidad() {
    const probabilidad = (escalerasEncontradas / totalSimulaciones) * 100;
    document.getElementById('probabilidad-escalera').textContent = probabilidad.toFixed(2) + '%';
    actualizarGrafico();
}

// Función para actualizar la gráfica
function actualizarGrafico() {
    const canvas = document.getElementById('grafico-probabilidad');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const probabilidad = (escalerasEncontradas / totalSimulaciones) * 100;
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, canvas.height - probabilidad * 2, canvas.width, probabilidad * 2);
}

// Event Listener para el botón de simulación
document.getElementById('simular-btn').addEventListener('click', () => {
    realizarSimulaciones(1);
});
