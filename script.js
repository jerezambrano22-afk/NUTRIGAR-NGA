async function cargarProductos() {
  const res = await fetch("products.json");
  const productos = await res.json();

  // Configuración de Fuse.js
  const fuse = new Fuse(productos, {
    keys: ["nombre", "categoria", "descripcion"], // busca en varios campos
    threshold: 0.4 // tolerancia de errores (0 exacto, 1 muy permisivo)
  });

  // Mostrar todos al inicio
  mostrarProductos(productos);

  // Escuchar el buscador
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const texto = e.target.value;
    if (texto.trim() === "") {
      mostrarProductos(productos); // si está vacío, mostrar todo
    } else {
      const resultado = fuse.search(texto);
      mostrarProductos(resultado.map(r => r.item));
    }
  });
}

// Función para renderizar productos en la página
function mostrarProductos(lista) {
  const contenedor = document.getElementById("products");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `<p>No se encontraron productos</p>`;
    return;
  }

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p><strong>Precio:</strong> $${p.precio}</p>
        <p><em>${p.categoria || ""}</em></p>
        <p>${p.descripcion || ""}</p>
      </div>
    `;
  });
}

// Ejecutar
cargarProductos();
