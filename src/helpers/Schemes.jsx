import * as v from "valibot";

// Esquema para registro de usuario
export const RegisterScheme = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Nombre' no puede estar vacío"),
      v.minLength(3, "El nombre debe contener más de 3 caracteres")
    ),
    lastName: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Apellido' no puede estar vacío"),
      v.minLength(5, "El apellido debe de tener más de 5 caracteres")
    ),
    email: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Email' no puede estar vacío"),
      v.email("Ingrese un email válido"),
      v.maxLength(30, "El email es demasiado largo")
    ),
    birthday: v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      v.date("El campo 'Fecha de nacimiento' no puede estar vacío "),
      v.maxValue(new Date("2007-01-01"), "Tienes que ser mayor de edad")
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Contraseña' no puede estar vacío"),
      v.minLength(8, "La contraseña debe tener más de 8 caracteres"),
      v.maxLength(20, "La contraseña no debe exceder de los 20 caracteres"),
      v.regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener letras, números y un carácter especial"
      )
    ),
    confPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confPassword"]],
      (input) => input.password === input.confPassword,
      "Las contraseñas no coinciden"
    ),
    ["confPassword"]
  )
);

//Esquema para la autenticacion de usuario
export const LoginScheme = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("El campo 'Email' no puede estar vacio"),
    v.email("Ingrese un email valido"),
    v.maxLength(30, "El email es demasiado largo")
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("El campo 'Contraseña' no puede estar vacio")
  ),
});

//Esquema para la actualizacion de usuario
export const ProfileScheme = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Nombre' no puede estar vacío"),
      v.minLength(3, "El nombre debe contener más de 3 caracteres")
    ),
    lastName: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Apellido' no puede estar vacío"),
      v.minLength(5, "El apellido debe de tener más de 5 caracteres")
    ),
    email: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Email' no puede estar vacío"),
      v.email("Ingrese un email válido"),
      v.maxLength(30, "El email es demasiado largo")
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Contraseña' no puede estar vacío"),
      v.minLength(8, "La contraseña debe tener más de 8 caracteres"),
      v.maxLength(20, "La contraseña no debe exceder de los 20 caracteres"),
      v.regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener letras, números y al menos un carácter especial"
      )
    ),
    confPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confPassword"]],
      (input) => input.password === input.confPassword,
      "Las contraseñas no coinciden"
    ),
    ["confPassword"]
  )
);

//Esquema para la creacion de flats.
export const FlatScheme = v.pipe(
  v.transform((input) => ({
    ...input,
    streetNumber: parseInt(input.streetNumber),
    areaSize: parseInt(input.areaSize),
    yearBuilt: parseInt(input.yearBuilt),
    rentPrice: parseInt(input.rentPrice),
    hasAc: input.hasAc === "on",
  })),
  v.object({
    city: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Ciudad' no puede estar vacío"),
      v.minLength(5, "La ciudad debe tener más de 5 caracteres")
    ),
    streetName: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Nombre de la calle' no puede estar vacío"),
      v.minLength(4, "La calle debe tener más de 4 caracteres")
    ),
    streetNumber: v.pipe(
      v.number("El campo 'Número de la calle' no puede estar vacío")
    ),
    areaSize: v.pipe(
      v.number("El campo 'Tamaño de area' no puede estar vacío")
    ),
    hasAc: v.pipe(
      v.boolean(),
      v.nonEmpty("El campo '¿Tiene aire acondicionado?' no puede estar vacío")
    ),
    yearBuilt: v.pipe(
      v.number("El campo 'Año de construcción' no puede estar vacío")
    ),
    rentPrice: v.pipe(
      v.number("El campo 'Precio de renta' no puede estar vacío")
    ),
    dateAvailable: v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      v.date("El campo 'Fecha de disponibilidad' no puede estar vacío")
    ),
  })
);

//Esquema para la edicion de flats.
export const FlatUpdateScheme = v.pipe(
  v.transform((input) => ({
    ...input,
    streetNumber: parseInt(input.streetNumber),
    areaSize: parseInt(input.areaSize),
    yearBuilt: parseInt(input.yearBuilt),
    rentPrice: parseInt(input.rentPrice),
    hasAc: input.hasAc == "on" ? true : false,
  })),
  v.object({
    city: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Ciudad' no puede estar vacio"),
      v.minLength(5, "La ciudad debe de tener mas de 5 caracteres")
    ),

    streetName: v.pipe(
      v.string(),
      v.nonEmpty("El campo 'Nombre de la calle' no puede estar vacio"),
      v.minLength(4, "La calle debe de tener mas de 4 caracteres")
    ),

    streetNumber: v.pipe(
      v.number("El campo 'Número de la calle' no puede estar vacio")
    ),

    areaSize: v.pipe(
      v.number("El campo 'Tamaño de area' no puede estar vacio")
    ),

    hasAc: v.pipe(
      v.boolean(),
      v.nonEmpty("El campo '¿Tiene aire acondicionado?' no puede estar vacio")
    ),

    yearBuilt: v.pipe(
      v.number("El campo 'Año de construcción' no puede estar vacio")
    ),

    rentPrice: v.pipe(
      v.number("El campo 'Precio de renta' no puede estar vacio")
    ),

    dateAvailable: v.pipe(
      v.string(),
      v.transform((input) => {
        console.log("dateAvailable");
        console.log(input);
        console.log(typeof input);
        return new Date(input);
      }),
      v.date("El campo 'Fecha de disponibilidad' no puede estar vacio")
    ),
  })
);
