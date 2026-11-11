
export type Receta = {
  id: string;
  nombre: string;
  descripcion: string;
  emoji: string;
  tiempo: number;
  porciones: number;
  ingredientes: {
    nombre: string;
    cantidad: string;
  }[];
  preparacion: string[];
};

export const recetasIniciales: Receta[] = [
  {
    id: '1',
    nombre: 'Tortilla de papa',
    descripcion: 'Una receta clásica, sencilla y rendidora.',
    emoji: '🥔',
    tiempo: 35,
    porciones: 1,
    ingredientes: [
      { nombre: 'Papa', cantidad: '1 unidad' },
      { nombre: 'Huevo', cantidad: '1 unidad' },
      { nombre: 'Cebolla', cantidad: '1/2 unidad' },
      { nombre: 'Aceite', cantidad: '1 cucharada' },
      { nombre: 'Sal', cantidad: 'A gusto' },
    ],
    preparacion: [
      'Pelar y cortar la papa en rodajas finas.',
      'Cocinar la papa y la cebolla en una sartén con aceite.',
      'Batir el huevo y agregar una pizca de sal.',
      'Incorporar la papa y la cebolla al huevo.',
      'Volcar la mezcla en la sartén y cocinar de ambos lados.',
    ],
  },
  {
    id: '2',
    nombre: 'Arroz con verduras',
    descripcion: 'Una opción práctica para cualquier comida.',
    emoji: '🍚',
    tiempo: 25,
    porciones: 1,
    ingredientes: [
      { nombre: 'Arroz', cantidad: '1/2 taza' },
      { nombre: 'Zanahoria', cantidad: '1/2 unidad' },
      { nombre: 'Cebolla', cantidad: '1/2 unidad' },
      { nombre: 'Morron', cantidad: '1/4 unidad' },
      { nombre: 'Aceite', cantidad: '1 cucharada' },
    ],
    preparacion: [
      'Lavar y cortar las verduras.',
      'Saltear la cebolla, la zanahoria y el morrón.',
      'Agregar el arroz y mezclar.',
      'Incorporar agua y cocinar hasta que el arroz esté listo.',
    ],
  },
  {
    id: '3',
    nombre: 'Omelette de queso',
    descripcion: 'Una comida rápida con pocos ingredientes.',
    emoji: '🍳',
    tiempo: 10,
    porciones: 1,
    ingredientes: [
      { nombre: 'Huevo', cantidad: '2 unidades' },
      { nombre: 'Queso', cantidad: '50 gramos' },
      { nombre: 'Sal', cantidad: 'A gusto' },
    ],
    preparacion: [
      'Batir los huevos con una pizca de sal.',
      'Calentar una sartén antiadherente.',
      'Agregar los huevos batidos.',
      'Incorporar el queso y doblar el omelette.',
      'Cocinar hasta que el huevo esté listo.',
    ],
  },
  {
    id: '4',
    nombre: 'Ensalada completa',
    descripcion: 'Una alternativa fresca y fácil de preparar.',
    emoji: '🥗',
    tiempo: 15,
    porciones: 1,
    ingredientes: [
      { nombre: 'Tomate', cantidad: '1 unidad' },
      { nombre: 'Lechuga', cantidad: '2 o 3 hojas' },
      { nombre: 'Huevo', cantidad: '1 unidad' },
      { nombre: 'Zanahoria', cantidad: '1/2 unidad' },
      { nombre: 'Aceite', cantidad: 'A gusto' },
    ],
    preparacion: [
      'Lavar bien las verduras.',
      'Cocinar el huevo y dejarlo enfriar.',
      'Cortar el tomate, la lechuga y la zanahoria.',
      'Agregar el huevo cortado.',
      'Condimentar y servir.',
    ],
  },
  {
    id: '5',
    nombre: 'Fideos con salsa',
    descripcion: 'Un plato tradicional y fácil de hacer.',
    emoji: '🍝',
    tiempo: 20,
    porciones: 1,
    ingredientes: [
      { nombre: 'Fideos', cantidad: '100 gramos' },
      { nombre: 'Tomate', cantidad: '1 unidad' },
      { nombre: 'Cebolla', cantidad: '1/2 unidad' },
      { nombre: 'Aceite', cantidad: '1 cucharada' },
      { nombre: 'Sal', cantidad: 'A gusto' },
    ],
    preparacion: [
      'Hervir agua con sal.',
      'Cocinar los fideos según el tiempo indicado en el paquete.',
      'Picar la cebolla y el tomate.',
      'Preparar la salsa en una sartén con un poco de aceite.',
      'Escurrir los fideos y servir con la salsa.',
    ],
  },
];
