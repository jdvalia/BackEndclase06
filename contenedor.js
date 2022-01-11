const fs = require('fs')

class Contenedor {
  static id = 0;
  static archivos = [];
  constructor(filename) {
    this.id = Contenedor.id;
    this.filename = filename;
  }

  async save(obj) {
    obj.id = Contenedor.id;
    Contenedor.archivos.push(obj);
    try {
      Contenedor.id++;
      await fs.promises.writeFile(`./${this.filename}.txt`,JSON.stringify(Contenedor.archivos, null, 2));
      return (obj.id)
    } catch (e) {
      console.error(e);
    }
  }

  async getById(id) {
    const productos = await this.getAll();
    const producto = productos.find(productos => productos.id === id)
    return producto    
  }


  async getAll(){
    try {
      const utiles = await fs.promises.readFile("./productos.txt","utf-8");  
      return JSON.parse(utiles)
    } catch (error) {
      throw error
    }
  }

  async deleteAll(){
    try {
      await fs.promises.writeFile("./productos.txt",'');
      Contenedor.id = 0;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id){
    const productos = await this.getAll();
    const productosFiltrados = productos.filter(productos => productos.id != id)
    try {
      await fs.promises.writeFile("./productos.txt",JSON.stringify(productosFiltrados,null,2));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;