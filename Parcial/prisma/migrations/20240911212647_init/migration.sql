-- CreateTable
CREATE TABLE "Estudiante" (
    "numeroCarnet" INT8 NOT NULL,
    "nombre" STRING NOT NULL,
    "apellido" STRING NOT NULL,
    "correo" STRING NOT NULL,
    "curso" STRING NOT NULL,
    "numeroDocIdentidad" INT8 NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("numeroCarnet")
);
