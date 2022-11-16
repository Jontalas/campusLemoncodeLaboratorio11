// Datos de entrada comunes a los casos 1 y 2
const reservas = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

// Clase generada para el caso 1.
// Caso básico para un particular.
// La clase se ha creado sin tener en cuenta que se crearia una segunda clase que dependeria de ella
// Por eso no se han incluido propiedades como el descuento y el calculo se hace con valores fijos para precios
class CalculosHotel {
  constructor(reservas) {
    this._reservas = reservas;
    this._subtotal = 0;
    this._total = 0;
  }

  calculaTotales = () => {
    this._subtotal = this._reservas.reduce((result, item) => {
      if (item.tipoHabitacion == "standard") {
        result += this.calculaHabitacion(item, 100);
      }
      if (item.tipoHabitacion == "suite") {
        result += this.calculaHabitacion(item, 150);
      }
      result += this.calculaPaxAdicional(item, 40);
      return result;
    }, 0);
    this._total = this.calculaIVA(21);
  };

  calculaHabitacion = (item, precio) => item.pax * item.noches * precio;
  calculaPaxAdicional = (item, precio) => (item.pax - 1) * precio;
  calculaIVA = (porcentaje) => this._subtotal * (1 + porcentaje / 100);

  resultados = (titulo) => {
    this.calculaTotales();
    console.log(titulo, ":");
    console.log("- Subtotal: ", this.subtotal, "€");
    console.log("- Total   : ", this.total, "€");
  };

  get subtotal() {
    return this._subtotal.toFixed(2);
  }

  get total() {
    return this._total.toFixed(2);
  }
}

// Datos de entrada extra de la clase para el caso 2
const configTourOperador = {
  suite: 100,
  descuento: 15,
};

// Clase generada para el caso 2.
// Hereda de la clase del caso 1. Se puede configurar para cambiar cualquier parametro usado en los calculos.
// El metodo de calculo se ha sobrescrito para tener ahora en cuenta los valores de la configuracion.
class CalculosHotelCustom extends CalculosHotel {
  constructor(reservas, config) {
    super(reservas);
    // configuracion por defecto
    this._config = {
      standard: 100,
      suite: 150,
      IVA: 21,
      paxAdicional: 40,
      descuento: 0,
    };
    if (config !== undefined) {
      this.config = config;
    }
  }

  calculaTotales = () => {
    this._subtotal = this._reservas.reduce((result, item) => {
      if (item.tipoHabitacion == "standard") {
        result += this.calculaHabitacion(item, this._config.standard);
      }
      if (item.tipoHabitacion == "suite") {
        result += this.calculaHabitacion(item, this._config.suite);
      }
      result += this.calculaPaxAdicional(item, this._config.paxAdicional);
      return result;
    }, 0);
    this._subtotal *= this.factorDescuento(this._config.descuento);
    this._total = this.calculaIVA(this._config.IVA);
  };

  factorDescuento = (descuento) => 1 - descuento / 100;

  set config(value) {
    if (value.standard !== undefined) {
      this.standard = value.standard;
    }
    if (value.suite !== undefined) {
      this.suite = value.suite;
    }
    if (value.IVA !== undefined) {
      this.IVA = value.IVA;
    }
    if (value.paxAdicional !== undefined) {
      this.paxAdicional = value.paxAdicional;
    }
    if (value.descuento !== undefined) {
      this.descuento = value.descuento;
    }
  }

  set standard(value) {
    this._config.standard = value;
  }

  set suite(value) {
    this._config.suite = value;
  }

  set IVA(value) {
    this._config.IVA = value;
  }

  set paxAdicional(value) {
    this._config.paxAdicional = value;
  }

  set descuento(value) {
    this._config.descuento = value;
  }
}

// Datos de entrada extra de la clase para el caso 2
const tarifasParticular = {
  standard: 100,
  suite: 150,
};
const tarifasTourOperador = {
  standard: 100,
  suite: 100,
};

// Clase base para el ejercicio de desafio
// Se ha creado sabiendo que existirian clases que heredarian de ella.
// Por ello existe el parametro _config que sera lo que defina en general las diferencias entre clases hijas
class CalculosDesafioBase {
  constructor(reservas, tarifas) {
    this._reservas = reservas;
    // configuracion por defecto
    this._config = {
      standard:
        tarifas !== undefined
          ? tarifas.standard !== undefined
            ? tarifas.standard
            : 0
          : 0,
      suite:
        tarifas !== undefined
          ? tarifas.suite !== undefined
            ? tarifas.suite
            : 0
          : 0,
      IVA: 21,
      paxAdicional: 0,
      descuento: 0,
    };
    this._subtotal = 0;
    this._total = 0;
  }

  calculaTotales = () => {
    this._subtotal = this._reservas.reduce((result, item) => {
      if (item.tipoHabitacion == "standard") {
        result += this.calculaHabitacion(item, this._config.standard);
      }
      if (item.tipoHabitacion == "suite") {
        result += this.calculaHabitacion(item, this._config.suite);
      }
      result += this.calculaPaxAdicional(item, this._config.paxAdicional);
      return result;
    }, 0);
    this._subtotal *= this.factorDescuento(this._config.descuento);
    this._total = this.calculaIVA(this._config.IVA);
  };

  calculaHabitacion = (item, precio) => item.pax * item.noches * precio;
  calculaPaxAdicional = (item, precio) => (item.pax - 1) * precio;
  factorDescuento = (descuento) => 1 - descuento / 100;
  calculaIVA = (porcentaje) => this._subtotal * (1 + porcentaje / 100);

  resultados = (titulo) => {
    this.calculaTotales();
    console.log(titulo, ":");
    console.log("- Subtotal: ", this.subtotal, "€");
    console.log("- Total   : ", this.total, "€");
  };

  get subtotal() {
    return this._subtotal.toFixed(2);
  }

  get total() {
    return this._total.toFixed(2);
  }
}

// Clase hija del particular para el ejercicio de desafio
class CalculosDesafioParticular extends CalculosDesafioBase {
  constructor(reservas, tarifas) {
    super(reservas, tarifas);
    this._config.paxAdicional = 40;
    this._subtotal = 0;
    this._total = 0;
  }
}

// Clase hija del touroperador para el ejercicio de desafio
class CalculosDesafioTouroperador extends CalculosDesafioBase {
  constructor(reservas, tarifas) {
    super(reservas, tarifas);
    this._config.paxAdicional = 40;
    this._config.descuento = 15;
    this._subtotal = 0;
    this._total = 0;
  }
}

// Ejercicio adicional
// Para este ejercicio se ha entendido que las clases a modificar han de ser las de los casos 1 y 2
// Datos de entrada comunes a los casos 1 y 2
const reservasDesayuno = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

// Clase para el particular
class CalculosAdicional {
  constructor(reservas) {
    this._reservas = reservas;
    this._subtotal = 0;
    this._total = 0;
  }

  calculaTotales = () => {
    this._subtotal = this._reservas.reduce((result, item) => {
      if (item.tipoHabitacion == "standard") {
        result += this.calculaHabitacion(item, 100);
      }
      if (item.tipoHabitacion == "suite") {
        result += this.calculaHabitacion(item, 150);
      }
      result += this.calculaPaxAdicional(item, 40);
      result += this.calculaDesayuno(item, 15);
      return result;
    }, 0);
    this._total = this.calculaIVA(21);
  };

  calculaHabitacion = (item, precio) => item.pax * item.noches * precio;
  calculaPaxAdicional = (item, precio) => (item.pax - 1) * precio;
  calculaDesayuno = (item, precio) =>
    item.desayuno ? item.pax * item.noches * precio : 0;
  calculaIVA = (porcentaje) => this._subtotal * (1 + porcentaje / 100);

  resultados = (titulo) => {
    this.calculaTotales();
    console.log(titulo, ":");
    console.log("- Subtotal: ", this.subtotal, "€");
    console.log("- Total   : ", this.total, "€");
  };

  get subtotal() {
    return this._subtotal.toFixed(2);
  }

  get total() {
    return this._total.toFixed(2);
  }
}

// Datos de entrada extra de la clase para el caso 2
const configTourOperadorAdicional = {
  suite: 100,
  descuento: 15,
};

// Clase generada para el caso 2.
// Hereda de la clase del caso 1. Se puede configurar para cambiar cualquier parametro usado en los calculos.
// El metodo de calculo se ha sobrescrito para tener ahora en cuenta los valores de la configuracion.
class CalculosAdicionalCustom extends CalculosAdicional {
  constructor(reservas, config) {
    super(reservas);
    // configuracion por defecto
    this._config = {
      standard: 100,
      suite: 150,
      IVA: 21,
      paxAdicional: 40,
      descuento: 0,
      desayuno: 15,
    };
    if (config !== undefined) {
      this.config = config;
    }
  }

  calculaTotales = () => {
    this._subtotal = this._reservas.reduce((result, item) => {
      if (item.tipoHabitacion == "standard") {
        result += this.calculaHabitacion(item, this._config.standard);
      }
      if (item.tipoHabitacion == "suite") {
        result += this.calculaHabitacion(item, this._config.suite);
      }
      result += this.calculaPaxAdicional(item, this._config.paxAdicional);
      result += this.calculaDesayuno(item, this._config.desayuno);
      return result;
    }, 0);
    this._subtotal *= this.factorDescuento(this._config.descuento);
    this._total = this.calculaIVA(this._config.IVA);
  };

  factorDescuento = (descuento) => 1 - descuento / 100;

  set config(value) {
    if (value.standard !== undefined) {
      this.standard = value.standard;
    }
    if (value.suite !== undefined) {
      this.suite = value.suite;
    }
    if (value.IVA !== undefined) {
      this.IVA = value.IVA;
    }
    if (value.paxAdicional !== undefined) {
      this.paxAdicional = value.paxAdicional;
    }
    if (value.descuento !== undefined) {
      this.descuento = value.descuento;
    }
    if (value.desayuno !== undefined) {
      this.desayuno = value.desayuno;
    }
  }

  set standard(value) {
    this._config.standard = value;
  }

  set suite(value) {
    this._config.suite = value;
  }

  set IVA(value) {
    this._config.IVA = value;
  }

  set paxAdicional(value) {
    this._config.paxAdicional = value;
  }

  set descuento(value) {
    this._config.descuento = value;
  }

  set desayuno(value) {
    this._config.desayuno = value;
  }
}

// Proceso principal con declaraciones y ejecuciones
console.log(
  "\n***********************",
  "\n CASO 1",
  "\n***********************"
);
const particular = new CalculosHotel(reservas);
particular.resultados("Particular");
console.log(
  "\n***********************",
  "\n CASO 2",
  "\n***********************"
);
const touroperador = new CalculosHotelCustom(reservas, configTourOperador);
touroperador.resultados("Touroperador");
console.log(
  "\n***********************",
  "\n DESAFIO",
  "\n***********************"
);
const particularDesafio = new CalculosDesafioParticular(
  reservas,
  tarifasParticular
);
const touroperadorDesafio = new CalculosDesafioTouroperador(
  reservas,
  tarifasTourOperador
);
particularDesafio.resultados("Particular");
touroperadorDesafio.resultados("Touroperador");
console.log(
  "\n***********************",
  "\n ADICIONAL",
  "\n***********************"
);
const particularAdicional = new CalculosAdicional(reservasDesayuno);
const touroperadorAdicional = new CalculosAdicionalCustom(
  reservasDesayuno,
  configTourOperadorAdicional
);
particularAdicional.resultados("Particular");
touroperadorAdicional.resultados("Touroperador");
