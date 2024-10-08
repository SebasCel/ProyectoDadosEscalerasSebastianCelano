let totalSimulaciones = 0;
let escalerasEncontradas = 0;

function lanzarDados() {
    const dados = [];
    for (let i = 0; i < 5; i++) {
        dados.push(Math.floor(Math.random() * 6) + 1);
    }
    return dados.sort((a, b) => a - b);
}

function esEscalera(dados) {
    for (let i = 0; i < dados.length - 1; i++) {
        if (dados[i] + 1 !== dados[i + 1]) {
            return false;
        }
    }
    return true;
}

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

function actualizarResultados(resultado) {
    for (let i = 0; i < resultado.length; i++) {
        document.getElementById(`dado${i + 1}`).textContent = resultado[i];
    }
    document.getElementById('contador-simulaciones').textContent = totalSimulaciones;
}

function actualizarProbabilidad() {
    const probabilidad = (escalerasEncontradas / totalSimulaciones) * 100;
    document.getElementById('probabilidad-escalera').textContent = probabilidad.toFixed(2) + '%';
    actualizarGrafico();
}

function actualizarGrafico() {
    const canvas = document.getElementById('grafico-probabilidad');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const probabilidad = (escalerasEncontradas / totalSimulaciones) * 100;
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, canvas.height - probabilidad * 2, canvas.width, probabilidad * 2);
}

document.getElementById('simular-btn').addEventListener('click', () => {
    realizarSimulaciones(1);
});
