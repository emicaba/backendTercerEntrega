const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async save(objeto) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      if (archivoGuardado.length === 0) {
        objeto.id = 1;
        await fs.promises.writeFile(this.archivo, JSON.stringify([objeto]));
      } else {
        archivoGuardado = JSON.parse(archivoGuardado);
        objeto.id = archivoGuardado.length + 1;
        archivoGuardado.push(objeto);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(archivoGuardado)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      let objetoEncontrado = archivoGuardado.find(
        (producto) => producto.id === id
      );
      if (objetoEncontrado) {
        console.log(objetoEncontrado);
        return objetoEncontrado;
      } else {
        console.log(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      console.log(archivoGuardado);
      return archivoGuardado;
    } catch (error) {
      console.log(error);
    }
  }
  async deletById(id) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      archivoGuardado = archivoGuardado.filter((producto) => producto.id != id);
      fs.writeFileSync(this.archivo, JSON.stringify(archivoGuardado));
      console.log(archivoGuardado);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFileSync(this.archivo, "");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
