async function cargarProductos() {
  const res = await fetch("products.json");
  const productos = await res.json();
  const contenedor = document.getElementById("productos");

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p><strong>$${p.precio}</strong></p>
      <button onclick="comprar('${p.nombre}')">Comprar</button>
    `;
    contenedor.appendChild(div);
  });
}

function comprar(nombre) {
  const mensaje = `Hola, quiero comprar: ${nombre}`;
  const telefono = "543871234567"; // tu número en formato internacional
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

cargarProductos();