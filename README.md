# Digital Wallet Dashboard

Requirements
La aplicación tiene los siguientes requisitos:
1. Agregue direcciones de billetera y muéstrelas.
2. Desde el conjunto de billeteras, el usuario debe poder seleccionar favoritos y
ordenar por ellos
3. Deberíamos tener una forma de saber si una billetera es vieja. Una billetera se
considera antigua si la primera transacción se realizó hace al menos un año.
4. El usuario debe poder realizar las siguientes acciones
a. Obtenga tipos de cambio de euros y dólares estadounidenses a ETH
(Ethereum), estos se pueden almacenar en la memoria o en cualquier base
de datos de su preferencia.
b. Edite el tipo de cambio de euro o dólar estadounidense a ETH.
5. Dada una moneda (euro o dólar estadounidense), el usuario debe tener el saldo de
ETH en la billetera en la moneda seleccionada utilizando las tasas de cambio del
paso 4.
Para API:
● Deberías usar NestJS
● Puede almacenar datos en la memoria, pero una base de datos es imprescindible.
Para UI:
● Implemente para los puntos finales anteriores una interfaz de tablero (React/VueJs)
utilizando los diseños adjuntos.
● Use redux/vuex si es necesario.
Tenga en cuenta: puede agregar cosas al diseño si es necesario.